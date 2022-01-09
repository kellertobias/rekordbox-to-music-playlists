import { PLAYLIST_PATH_SEP, PL_DESCR_SLUG } from "./constants"
import { createFolder } from "./create-tree";
import { loadPlaylists } from "./load-music";
import notify from "./notify";
import { ProgressBar } from "./progress";

const updateSinglePlaylist = (
    pnode: AugmentedMusicPlaylist,
    tracks: MusicTrack[],
    notifySuffix: string
) => {
    const name = pnode.playlist.name()
    console.log(`[UPDATE] ${name}`)
    let count = 0
    // Find and Delete Tracks in Music but not in RB
    const deletionCandidates = pnode.playlist.tracks()
    ProgressBar.setText({
        title: `Scanning Playlist ${notifySuffix}: ${name}`, 
        subtitle: `Check ${deletionCandidates.length} Tracks in Music Playlist if they need to be removed from the playlist.`
    })
    ProgressBar.setTotal(deletionCandidates.length)
    ProgressBar.setCount(0)
    const tracksToDelete = deletionCandidates.filter(tIn => {
        count += 1
        ProgressBar.setCount(count)
        const id = tIn.databaseID();
        return tracks.find(tLib => tLib && tLib.databaseID() == id)
    })
    
    ProgressBar.setText({
        title: `Update Playlist ${notifySuffix}: ${name}`,
        subtitle: `Delete ${tracksToDelete.length} Tracks in Music Playlists that were not in the Rekordbox Playlist.`
    })
    ProgressBar.setTotal(deletionCandidates.length)
    ProgressBar.setCount(0)
    count = 0
    tracksToDelete.forEach((t) => {
        t.delete()
        count += 1
        ProgressBar.setCount(count)
    })

    count = 0
    // Add Track in RB but not in Music
    const currentTracks = pnode.playlist.tracks().map(t => t.databaseID())
    const copyTracks = tracks.filter((t) => {
        return t !== undefined && currentTracks.indexOf(t.databaseID()) === -1
    })
    ProgressBar.setText({
        title: `Update Playlist ${notifySuffix}: ${name}`, 
        subtitle: `Add ${copyTracks.length} Tracks in Music Playlists that are not in Music`
    })
    ProgressBar.setTotal(copyTracks.length)
    ProgressBar.setCount(0)
    copyTracks.forEach(t => {
        // @ts-ignore
        t.duplicate({to: pnode.playlist})
        count += 1
        ProgressBar.setCount(count)
    })
    console.log(`         -> Added ${count} Tracks`)
}

const music = Application('Music')

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
    ProgressBar.setText({
        title: `Update Playlist Tree`, 
        subtitle: `Delete ${deletePlaylists.length} Playlists that are not in Rekordbox anymore`
    })
    ProgressBar.setTotal(deletePlaylists.length)
    ProgressBar.setCount(0)
    deletePlaylists.forEach(({path, playlist}) => {
        playlist.delete()
        ProgressBar.incCount()
    })

    // Create Playlists in RB but not in Music
    console.log(`Creating ${createPlaylists.length} Playlists not in Music`)
    ProgressBar.setText({
        title: `Update Playlist Tree`, 
        subtitle: `Delete ${createPlaylists.length} Playlists that are not in Rekordbox anymore`
    })
    ProgressBar.setTotal(createPlaylists.length)
    ProgressBar.setCount(0)
    createPlaylists.forEach(({name, path}) => {
        console.log(` -> IN ${path.slice(0,-1).join('/')} CREATE ${name}`)
        // Create Folder Tree
        const folder = createFolder(path.slice(0,-1))
        
        // Create actual Playlist on correct position
        const playlist = music.UserPlaylist().make()
        playlist.name = name
        playlist.description = PL_DESCR_SLUG
        if(folder) {
            playlist.move({to: folder})
        }
        ProgressBar.incCount()
    })

    // Refetch Playlists to also get the newly created ones
    const {playlists} = loadPlaylists()

    console.log("Updating Tracks in Playlists")

    // Update Tracks of playlist
    const playlistKeys = Object.keys(playlists)
    let count = 0
    playlistKeys.forEach(key => {
        count += 1
        const mp = playlists[key]
        const rb = rbPlaylists[key]
        if(!rb) {
            console.log(`Playlist ${key} was in Music but not in rekordbox. Cannot update.`)
            return
        }
        // console.log(JSON.stringify({key, mp, rb}, null, 2))
        const tracks = rb.tracks.map((t: CommonTrack | null) => t?.musicRef).filter(ref => ref !== null)
        updateSinglePlaylist(mp, tracks, `${count}/${playlistKeys.length}`)
    })
}
