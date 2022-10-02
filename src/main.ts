import { createFolder } from './create-tree';
import { emptyTrashPlaylistFolder } from './delete-trash-folder';
import { loadPlaylists, loadTracks } from './load-music';
import { loadRekordbox } from './load-rekordbox';
import notify, { dialog } from './notify';
import { updatePlaylists } from './update-playlists';
import { updateTracks } from './update-tracks';
import { writeFile } from './write-file';

var app = Application.currentApplication();
app.includeStandardAdditions = true;

dialog(
  "This script will sync the Rating, BPM and Playlists from Rekordbox to Apple Music. Please do not use Apple Music while this script is running.\n\nNow select your XML Library File exported from Rekordbox."
);
const libraryFilePath = app
  .chooseFile({
    ofType: "xml",
    withPrompt: "Please select your Rekordbox Library",
  })
  .toString();
// const libraryFilePath = '/Users/keller/Desktop/library.xml'
console.log(`Library File: ${libraryFilePath}`);

notify("Library is Selected", `Selected Library: ${libraryFilePath}`);
delay(1);
notify(
  "Rekordbox Library",
  `Loading Tracks and Playlists... \nThis might take some time`
);
const { tracks, playlists: rbPlaylists } = loadRekordbox(libraryFilePath);

notify("Apple Music Library", `Loading Tracks... \nThis might take some time`);
delay(1);
// Will update Tracks in `tracks` with references to apple music tracks
const missingTrackRbIds = loadTracks(tracks);
notify(
  "Apple Music Library",
  `Apple Music Tracks Loaded. ${
    missingTrackRbIds.length
  } Tracks could not be matched from Rekordbox. This is the start of the list: \n${missingTrackRbIds
    .slice(0, 10)
    .map((t) => ` - ${t}`)
    .join("\n")}`
);
writeFile(missingTrackRbIds.join("\n"), `${libraryFilePath}.missing.txt`, {
  overwriteExistingContent: true,
});
delay(10);

notify(
  "Apple Music Library",
  `Update Music Track Rating and BPM from Rekordbox`
);
delay(1);
// Will update track records in music
updateTracks(tracks);

notify(
  "Apple Music Library",
  `Loading Playlists... \nThis might take some time`
);
delay(1);
// Now we are loading and syncing playlists
const { playlists: musicPlaylists, trash: trashPlaylists } = loadPlaylists();
notify(
  "Apple Music Library",
  `Empty Playlist Trash folder... \nThis might take some time`
);
delay(1);
emptyTrashPlaylistFolder(trashPlaylists);

notify("Rekordbox to Apple Music", `Starting Playlist Sync...`);
delay(1);
// Will update playlist records in music
updatePlaylists(rbPlaylists, musicPlaylists);
