#!/usr/bin/env python3

import xmltodict
import os.path
import sys
from pprint import pprint
import glob
import eyed3
from logging import getLogger
import pathlib
import codecs

getLogger().setLevel('ERROR')

paths = {
    'rb': os.path.expanduser('~/Desktop/library.xml'),
    'music': os.path.expanduser('~/Music/Music'),
    'out': os.path.expanduser('~/Desktop/out/'),
}

library = None
tracksById = {}
tracksByMeta = {}
playlists = []

replacements = {
    'artist': {
        'tobisk': 'tobisk',
        'tobias keller': 'tobisk',
        'tobias s. keller': 'tobisk',
    }
}

def makeTrackKey(title="", artist="", time=""):
    title = ("%s" % title).lower().strip()
    artist = ("%s" % artist).lower().strip()

    for search in replacements['artist']:
        replacement = replacements['artist'][search]
        if artist.startswith(search):
            artist = replacement
            break;

    return "{title}@-@-@{artist}@-@-@{time}".format(
        title=title,
        artist=artist,
        time="123"
    )

def readMusicFolder():
    print("*** Getting all iTunes Tracks ***")
    for r, d, f in os.walk(paths['music']):
        for file in f:
            filePath = os.path.join(r, file)
            if not filePath.endswith('.mp3'):
                continue
            audiofile = eyed3.load(filePath)
            if not audiofile or not audiofile.tag:
                continue

            key = makeTrackKey(title=audiofile.tag.title, artist=audiofile.tag.artist, time=123)
            track = tracksByMeta.get(key, False)
            if not track:
                track = {'itunesPath': filePath, 'itunesPathsAll': []}
            
            track['itunesPathsAll'].append(filePath)

            tracksByMeta[key] = track

def matchRekordboxTracks():
    print("*** Getting all Rekordbox Tracks and Matching them ***")
    for obj in library['DJ_PLAYLISTS']['COLLECTION']['TRACK']:
        key = makeTrackKey(title=obj['@Name'], artist=obj['@Artist'], time=obj['@TotalTime'])
        track = tracksByMeta.get(key, False)
        if not track:
            track = {}
            track['id'] = obj['@TrackID']
            if obj['@Kind'] in ['WAV File', 'M4A File']:
                track['missing'] = obj['@Kind']
                continue
            
        track['id'] = obj['@TrackID']
        track['title'] = obj['@Name']
        track['artist'] = obj['@Artist']
        track['size'] = obj['@Size']
        track['time'] = obj['@TotalTime']
        track['tone'] = obj['@Tonality']
        track['bpm'] = obj['@AverageBpm']
        track['genre'] = obj['@Genre']
        track['album'] = obj['@Album']
        track['file'] = obj['@Location']
        track['rating'] = obj['@Rating']
        
        tracksById[obj['@TrackID']] = track

def getXmlList(input):
        if type(input) == list:
            return input
        return [input]

def addLevelPlaylists(folderPath, level):
    global playlists
    folderPath = "%s > %s" % (folderPath, level['@Name']) if folderPath != ' > ROOT' else level['@Name']
    folderPath = folderPath.replace('/', '&')
    if level['@Name'] in ['WORKFLOW', '_', 'OLD']:
        return

    if level['@Type'] == '0':
        for node in getXmlList(level['NODE']):
            addLevelPlaylists(folderPath, node)
    else:
        addPlaylist(folderPath, level)

def addPlaylist(folderPath, node):
    playlist = {
        'name': node['@Name'],
        'path': folderPath,
        'tracks': [],
    }
    for trackNode in getXmlList(node['TRACK']):
        trackId = trackNode.get('@Key', False)
        track = tracksById.get("%s" % trackId, False)
        if not track:
            continue
        
        playlist['tracks'].append(track)

    playlists.append(playlist)

def getTracks():
    with open(paths['rb'], 'r') as file:
        libraryString = file.read()
        library = xmltodict.parse(libraryString)

    if library is None:
        return None  

    readMusicFolder()
    matchRekordboxTracks()

    return tracksById


def getTargetPlaylists():
    print("*** Read Rekordbox Playlists ***")
    addLevelPlaylists('', library['DJ_PLAYLISTS']['PLAYLISTS']['NODE'])

    print("*** Build Playlists ***")
    missingTracks = {}
    for playlist in playlists:
        filePath = pathlib.Path("%s/%s.m3u8" % (paths['out'], playlist['path']))
        
        print("=== PLAYLIST: %s ===" % playlist['path'])
        missing = 0
        playlist['files'] = []
        for track in playlist['tracks']:
            itunesPath = track.get('itunesPath', False)
            if not itunesPath:
                missingTracks[track['id']] = track
                if missing == 0:
                    print("    Missing:")
                print("     -  %s -- %s (%s)" % (track['title'], track['artist'], track.get('missing', 'unknown reason')))
                missing += 1
                continue
            playlist['files'].append(itunesPath)
        if missing > 0:
            print("    => Missing %s Tracks in iTunes\n" % missing)
        else:
            print("")

    print("*** Done ***")
    print("Missing Tracks in Playlists: %s" % (len(missingTracks.keys())))

    return playlists

def writeTargetPlaylists(playlists_in):
    for playlist in playlists_in:
        filePath = pathlib.Path("%s/%s.m3u8" % (paths['out'], playlist['path']))
        pathlib.Path(filePath.parent).mkdir(parents=True, exist_ok=True)
        print("=== PLAYLIST: %s ===" % playlist['path'])
        missing = 0
        with codecs.open(filePath, 'w', "utf-8") as file:
            for itunesPath in playlist['files']:
                file.write("%s\n" % itunesPath)
