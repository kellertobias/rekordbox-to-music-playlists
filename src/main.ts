import { loadPlaylists, loadTracks } from "./load-music"
import { loadRekordbox } from "./load-rekordbox"
import { updateTracks } from './update-tracks';
import { updatePlaylists } from './update-playlists';
import { emptyTrashPlaylistFolder } from "./delete-trash-folder";

var app = Application.currentApplication()
app.includeStandardAdditions = true

// const libraryFilePath = app.chooseFile({ofType: 'xml', withPrompt: 'Please select your Rekordbox Library'}).toString()
const libraryFilePath = '/Users/keller/Desktop/library.xml'
console.log(`Library File: ${libraryFilePath}`)

const {tracks, playlists: rbPlaylists} = loadRekordbox(libraryFilePath)

// Will update Tracks in `tracks`
// const {playlists: musicPlaylists, trash: trashPlaylists} = loadPlaylists()
// emptyTrashPlaylistFolder(trashPlaylists)

// const missingTrackRbIds = loadTracks(tracks)

// // Will update track records in music
// updateTracks(tracks)

// // Will update playlist records in music
// updatePlaylists(rbPlaylists, musicPlaylists, tracks)