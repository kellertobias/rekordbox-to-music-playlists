import { buildCommonId } from "./common-track-hash"
import { getTimer, startTimer } from "./constants"

export const loadRekordbox = (libraryFile: string): {
    tracks: Record<CommonTrackId, RekordboxTrack>,
    playlists: Record<CommonPlaylistPath, RekordboxPlaylist>
} => {
    startTimer()
    console.log("Loading Rekordbox Tracks")
    const tracksRB : Record<RekordboxTrackId, RekordboxTrack> = {}
    const tracks : Record<CommonTrackId, RekordboxTrack> = {}
    const playlists : Record<CommonPlaylistPath, RekordboxPlaylist> = {}

    const sys = Application('System Events')
    // buildCommonId()

    console.log(`[RB] Loading Rekordbox Library took ${getTimer()} seconds`)
    return {
        tracks: {},
        playlists: {}
    }
}