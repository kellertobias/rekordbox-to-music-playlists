import { PLAYLIST_PATH_SEP, PL_DESCR_SLUG } from "./constants"

const updateSinglePlaylist = (
    pnode: AugmentedMusicPlaylist,
    tracks: MusicTrack[]
) => {
    console.log("Updating a Single Playlist")
    // Find and Delete Tracks in Music but not in RB
    pnode.playlist.tracks().filter(tIn => {
        const id = tIn.databaseID();
        return tracks.find(tLib => tLib.databaseID() == id)
    }).forEach(t => t.delete())

    // Add Track in RB but not in Music
    const currentTracks = pnode.playlist.tracks().map(t => t.databaseID())
    tracks.filter(t => currentTracks.indexOf(t.databaseID()) === -1).forEach(t => {
        pnode.playlist.add(t)
    })
}

const music = Application('Music')


const createTree = (tree: string[]): MusicPlaylist => {
    if(tree.length <= 1) {
        return music as unknown as MusicPlaylist
    }

}

export const updatePlaylists = (
    rbPlaylists: Record<CommonPlaylistPath, RekordboxPlaylist>,
    musicPlaylits: Record<CommonPlaylistPath, AugmentedMusicPlaylist>,
    library: Record<RekordboxTrackId, CommonTrack>
): void => {
    console.log("------------ FINAL STAGE ------------")
    const rbPlaylistKeys = Object.keys(rbPlaylists)
    const musicPlaylistKeys = Object.keys(musicPlaylits)
    
    const deletePlaylists : AugmentedMusicPlaylist[] = musicPlaylistKeys.filter(
        mp => rbPlaylistKeys.indexOf(mp) === -1
    ).map(key => musicPlaylits[key])
    const createPlaylists : RekordboxPlaylist[] = rbPlaylistKeys.filter(
        mp => musicPlaylistKeys.indexOf(mp) === -1
    ).map(key => rbPlaylists[key])
          
    // List and Delete Playlists in Music but not in RB
    console.log(`Deleting ${deletePlaylists.length} Playlists not in RB`)
    deletePlaylists.forEach(({path, playlist}) => {
        playlist.delete()
    })

    // Create Playlists in RB but not in Music
    console.log(`Creating ${createPlaylists.length} Playlists not in Music`)
    createPlaylists.forEach(({name, path}) => {
        // Create Folder Tree
        const folder = createTree(path)
        
        // Create actual Playlist on correct position
        const playlist = music.UserPlaylist({name, description: PL_DESCR_SLUG})
        
        // Add new Playlist to list of Playlists
        musicPlaylits[path.join(PLAYLIST_PATH_SEP)] = {playlist, path} as AugmentedMusicPlaylist
    })

    // console.log("Updating Tracks in Playlists")
    // // Update Tracks of playlist
    // Object.keys(musicPlaylits).forEach(key => {
    //     const mp = musicPlaylits[key]
    //     const rb = rbPlaylists[key]
    //     const tracks = rb.tracks.map((t: CommonTrack) => t.musicRef).filter(x => x !== null)
    //     updateSinglePlaylist(mp, tracks)
    // })
}
