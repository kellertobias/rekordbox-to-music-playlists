export const emptyTrashPlaylistFolder = (trash: AugmentedMusicPlaylist[]) => {
  console.log(`[TRASH]: Deleting ${trash.length} Playlists in Trash Folder`);
  trash.forEach((p) => {
    console.log(`[TRASH]: - ${p.path.join(" > ")}`);
    p.playlist.delete();
  });
};
