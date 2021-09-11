import { loadPlaylists, loadTracks } from "./load-music"
import { loadRekordbox } from "./load-rekordbox"
import { updateTracks } from './update-tracks';
import { updatePlaylists } from './update-playlists';
import { emptyTrashPlaylistFolder } from "./delete-trash-folder";
import { createFolder } from "./create-tree";

var app = Application.currentApplication()
app.includeStandardAdditions = true

// const libraryFilePath = app.chooseFile({ofType: 'xml', withPrompt: 'Please select your Rekordbox Library'}).toString()
const libraryFilePath = '/Users/keller/Desktop/library.xml'
console.log(`Library File: ${libraryFilePath}`)

const {tracks, playlists: rbPlaylists} = loadRekordbox(libraryFilePath)

// Will update Tracks in `tracks` with references to apple music tracks
const missingTrackRbIds = loadTracks(tracks)

// Will update track records in music
updateTracks(tracks)

// Now we are loading and syncing playlists
const {playlists: musicPlaylists, trash: trashPlaylists} = loadPlaylists()
emptyTrashPlaylistFolder(trashPlaylists)


// Will update playlist records in music
updatePlaylists(rbPlaylists, musicPlaylists)