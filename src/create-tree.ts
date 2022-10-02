import { PL_DESCR_SLUG } from './constants';
import { buildPlaylistPath } from './load-music';

const music = Application("Music");

export const createFolder = (path: string[]): MusicPlaylist | null => {
  if (path.length < 1) {
    return null;
  }

  music.playlists().forEach;

  const levelExists = (path: string[], name: string): null | MusicPlaylist => {
    const existingPlaylists = music
      .playlists()
      .filter((p) => p && p.name() === name);
    if (existingPlaylists.length === 0) {
      return null;
    }
    const found = existingPlaylists
      .map((p) => {
        return {
          node: p,
          path: buildPlaylistPath(p).slice(0, -1),
        };
      })
      .find((p) => {
        return JSON.stringify(p.path) == JSON.stringify(path);
      });
    if (!found) {
      return null;
    }

    return found?.node || null;
  };

  // if node does not exist
  let childNode: MusicPlaylist = null;
  let existingPath = [];
  for (let name of path) {
    const lastChildNode = childNode;
    const existingPlaylist = levelExists(existingPath, name);
    if (existingPlaylist) {
      childNode = existingPlaylist;
    } else {
      console.log(`Creating ${existingPath.join("/")}/${name}`);
      childNode = music.FolderPlaylist().make();
      childNode.name = name;

      if (lastChildNode) {
        console.log(` -> Moving to Parent Folder`);
        childNode.move({ to: lastChildNode });
      }
    }
    existingPath.push(name);
  }
  return childNode;
};
