const updateSinglePlaylist = (
    rb: RekordboxPlaylist,
    music: MusicPlaylist,
    library: Record<RekordboxTrackId, CommonTrack>
) => {
    console.log("Updating a Single Playlist")
    // Find and Delete Tracks in Music but not in RB
    // Add Track in RB but not in Music
}

const createTree = (tree: string[]): void => {

}

export const updatePlaylists = (
    rbPlaylists: Record<CommonPlaylistPath, RekordboxPlaylist>,
    musicPlaylits: Record<CommonPlaylistPath, MusicPlaylist>,
    library: Record<RekordboxTrackId, CommonTrack>
): void => {
    console.log("Deleting Playlists not in RB")
    // List and Delete Playlists in Music but not in RB

    console.log("Creating Playlists not in Music")
    // Create Playlists in RB but not in Music

    console.log("Updating Tracks in Playlists")
    // Update Tracks of playlist
}
