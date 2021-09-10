import { buildCommonId } from "./common-track-hash"
import { getTimer, startTimer } from "./constants"
import * as parser from 'fast-xml-parser';

const app = Application.currentApplication()
app.includeStandardAdditions = true

const readFile = (path: string) => {
    const file = Path(path)
    return app.read(file)
}

function stringify(val, depth, replacer, space) {
    depth = isNaN(+depth) ? 1 : depth;
    function _build(key, val, depth, o?:any, a?:any) { // (JSON.stringify() has it's own rules, which we respect here by using it for property iteration)
        return !val || typeof val != 'object' ? val : (a=Array.isArray(val), JSON.stringify(val, function(k,v){ if (a || depth > 0) { if (replacer) v=replacer(k,v); if (!k) return (a=Array.isArray(v),val=v); !o && (o=a?[]:{}); o[k] = _build(k, v, a?depth:depth-1); } }), o||(a?[]:{}));
    }
    return JSON.stringify(_build('', val, depth), null, space);
}

export const loadRekordbox = (libraryFile: string): {
    tracks: Record<CommonTrackId, RekordboxTrack>,
    playlists: Record<CommonPlaylistPath, RekordboxPlaylist>
} => {
    startTimer()
    console.log("[RB]: Loading Rekordbox Tracks")
    const path = Path(libraryFile)

    const tracksRB : Record<RekordboxTrackId, RekordboxTrack> = {}
    const tracks : Record<CommonTrackId, RekordboxTrack> = {}
    const playlists : Record<CommonPlaylistPath, RekordboxPlaylist> = {}

    const sys = Application('System Events')
    
    const xmlString = readFile(libraryFile)
    const library = parser.parse(xmlString, {
        attributeNamePrefix : "",
        attrNodeName: 'attr',
        ignoreAttributes: false
    })?.DJ_PLAYLISTS;

    // Load and Match Tracks
    let count = 0
    library.COLLECTION.TRACK.forEach((trackNode: RBLibraryTrackNode) => {
        const track = trackNode.attr
        const {Name, Artist, TotalTime, TrackID} = track
        const commonId = buildCommonId({
            title: Name,
            artist: Artist,
            duration: TotalTime
        })
        tracksRB[TrackID] = track
        tracks[commonId] = track
        count += 1
    })
    console.log(`[RB] Loaded ${count} Tracks from Rekordbox Library`)

    // Iterate over Playlists
    const iteratePlaylists = (node: RBLibraryPlaylistNode, parentPath: string[] = []) => {
        if(!node) {
            console.log("Playlist Node not set")
            return
        }

        const {attr, TRACK, NODE} = node
        if(!attr) {
            console.log("Attributes Node not set", node)
            return
        }

        const {Name, Type} = attr
        const path = [...parentPath, Name]
        if(Type == 0) {
            const playlist : RekordboxPlaylist = {
                name: Name,
                path,
                tracks: (Array.isArray(TRACK) ? TRACK : [TRACK]).map(t => {
                    if(!t || !t.attr) {
                        console.log("Track Node not set", t)
                        return
                    }
                    const rbid = t.attr.Key
                    return tracksRB[rbid] || null
                })
            }
            playlists[path.join('/')] = playlist
        } else {
            (Array.isArray(NODE) ? NODE : [NODE]).map(nextNode => {
                iteratePlaylists(nextNode, path)
            })
        }
    }

    iteratePlaylists(library.PLAYLISTS.NODE, [])


    console.log(`[RB] Loading Rekordbox Library took ${getTimer()} seconds`)
    return {
        tracks: {},
        playlists: {}
    }
}