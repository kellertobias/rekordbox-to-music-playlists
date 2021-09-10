import { loadPlaylists, loadTracks } from "./load-music"
import { loadRekordbox } from "./load-rekordbox"
import { updateTracks } from './update-tracks';
import { updatePlaylists } from './update-playlists';
import { emptyTrashPlaylistFolder } from "./delete-trash-folder";

const {tracks, playlists: rbPlaylists} = loadRekordbox('')

// Will update Tracks in `tracks`
const {playlists: musicPlaylists, trash: trashPlaylists} = loadPlaylists()
emptyTrashPlaylistFolder(trashPlaylists)

// const missingTrackRbIds = loadTracks(tracks)

// // Will update track records in music
// updateTracks(tracks)

// // Will update playlist records in music
// updatePlaylists(rbPlaylists, musicPlaylists, tracks)