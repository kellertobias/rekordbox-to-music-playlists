// Alters the Tracks in rekordboxTracks

import { buildCommonId } from "./common-track-hash"
import { getTimer, MAX_PLAYLIST_DEPTH, PL_DESCR_SLUG, PLAYLIST_PATH_SEP, startTimer, TRASH_FOLDER_NAME } from "./constants"

const music = Application('Music')

export const loadTracks = (rekordboxTracks: Record<CommonTrackId, CommonTrack>) => {
    startTimer()
    console.log("[MUSIC]: Loading Music Tracks")
    const musicTracks : Record<CommonTrackId, MusicTrack> = {}
    const missingTrackIds : CommonTrackId[] = []
    // Load all Music Tracks
    let count = 0
    music.tracks().forEach(t => {
        count = count + 1
        // Build Common Track Id and add to musicTracks
        const commonId = buildCommonId({
            title: t.name(),
            artist: t.artist(),
            duration: t.duration()
        })

        musicTracks[commonId] = t
    })
    console.log(`[MUSIC]: ${count} tracks loaded`)

    console.log("[MUSIC]: Matching for Rekordbox Tracks")
    Object.keys(rekordboxTracks).forEach(commonKey => {
        const musicTrack = musicTracks[commonKey]
        const track = rekordboxTracks[commonKey]
        if(!musicTrack) {
            missingTrackIds.push(commonKey)
            // console.log(` - Missing: ${commonKey}`)
            return
        }

        if(!track) {
            return
        }

        // Add Apple Music Track Info to common track
        track.musicRef = musicTrack
    })

    console.log(`[MUSIC]: ${missingTrackIds.length} tracks missing or not matchable in music`)
    console.log(`[MUSIC]: Loading Playlists took ${getTimer()} seconds`)
    return missingTrackIds
}


const buildPlaylistPath = (p: MusicPlaylist, depth = 0): string[] => {
    if(p === null) return [];
    if(depth > MAX_PLAYLIST_DEPTH) return []
    let parentPath : string[]
    try {
        parentPath = buildPlaylistPath(p.parent(), depth + 1)
    } catch(e) {
        return [p.name()]
    }

    return [...parentPath, p.name()]
}

export const loadPlaylists = () => {
    startTimer()
    console.log("[MUSIC]: Loading Playlists")
    const playlists : Record<CommonPlaylistPath, AugmentedMusicPlaylist> = {}
    const trash: AugmentedMusicPlaylist[] = []
    let count = 0;
    let matchCount = 0;
    music.playlists().forEach(p => {
        count = count + 1
        const playlistPath = buildPlaylistPath(p)

        if(playlistPath.length > 1 && playlistPath[0] == TRASH_FOLDER_NAME) {
            trash.push({playlist: p, path: playlistPath})
            return
        }

        if(!`${p.description()}`.includes(PL_DESCR_SLUG)) {
            return
        }
        matchCount = matchCount + 1
        
        playlists[playlistPath.join(PLAYLIST_PATH_SEP)] = {playlist: p, path: playlistPath}
    })

    console.log(`[MUSIC]: ${matchCount}/${count} playlists are managed by Rekordbox`)
    console.log(`[MUSIC]: Loading Playlists took ${getTimer()} seconds`)

    return {playlists, trash}
}