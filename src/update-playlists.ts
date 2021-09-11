import { PLAYLIST_PATH_SEP, PL_DESCR_SLUG } from "./constants"
import { loadPlaylists } from "./load-music";

const updateSinglePlaylist = (
    pnode: AugmentedMusicPlaylist,
    tracks: MusicTrack[]
) => {
    console.log(`[UPDATE] ${pnode.playlist.name()}`)
    // Find and Delete Tracks in Music but not in RB
    pnode.playlist.tracks().filter(tIn => {
        const id = tIn.databaseID();
        return tracks.find(tLib => tLib && tLib.databaseID() == id)
    }).forEach(t => t.delete())

    // Add Track in RB but not in Music
    const currentTracks = pnode.playlist.tracks().map(t => t.databaseID())
    let count = 0;
    tracks.filter(t => t !== undefined && currentTracks.indexOf(t.databaseID()) === -1).forEach(t => {
        // @ts-ignore
        t.duplicate({to: pnode.playlist})
        count += 1
    })
    console.log(`         -> Added ${count} Tracks`)
}

const music = Application('Music')


const createTree = (tree: string[]): MusicPlaylist | null => {
    if(tree.length <= 1) {
        return null
    }

}

export const updatePlaylists = (
    rbPlaylists: Record<CommonPlaylistPath, RekordboxPlaylist>,
    musicPlaylits: Record<CommonPlaylistPath, AugmentedMusicPlaylist>,
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
        const playlist = music.UserPlaylist().make()
        playlist.name = path.join(PLAYLIST_PATH_SEP)
        playlist.description = PL_DESCR_SLUG
        if(folder) {
            playlist.move({to: folder})
        }
    })

    // Refetch Playlists to also get the newly created ones
    const {playlists} = loadPlaylists()

    console.log("Updating Tracks in Playlists")
    // Update Tracks of playlist
    Object.keys(playlists).forEach(key => {
        const mp = playlists[key]
        const rb = rbPlaylists[key]
        // console.log(JSON.stringify({key, mp, rb}, null, 2))
        const tracks = rb.tracks.map((t: CommonTrack | null) => t?.musicRef).filter(ref => ref !== null)
        updateSinglePlaylist(mp, tracks)
    })
}
