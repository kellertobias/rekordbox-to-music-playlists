import { getTimer, startTimer } from './constants';

const music = Application("Music");

export const updateTracks = (tracks: Record<CommonTrackId, CommonTrack>) => {
  startTimer();
  console.log(
    `[UPDATE] Updating Tracks BPM, Rating and Tonality in Music. Library has ${
      Object.keys(tracks).length
    } Tracks`
  );
  Object.keys(tracks).forEach((ctid) => {
    const track = tracks[ctid];
    const { rbRef, musicRef } = track;

    if (!musicRef) {
      return;
    }

    // Compare Rating & Update
    if (rbRef.Rating != musicRef.rating()) {
      console.log(
        `- Update Rating of ${rbRef.Name} -- ${JSON.stringify({
          rb: rbRef.Rating,
          music: musicRef.rating(),
        })}`
      );
      try {
        musicRef.rating = rbRef.Rating;
      } catch (err: any) {
        console.log(`  -> Could not update ${rbRef.Name}`, err);
      }
    }

    // Compare BPM & Update
    if (Math.round(rbRef.AverageBpm) != Math.round(musicRef.bpm())) {
      console.log(
        `- Update BPM of ${rbRef.Name} -- ${JSON.stringify({
          rb: rbRef.AverageBpm,
          music: musicRef.bpm(),
        })}`
      );
      try {
        musicRef.bpm = rbRef.AverageBpm;
      } catch (err: any) {
        console.log(`  -> Could not update ${rbRef.Name}`, err);
      }
    }

    // Compare Tonality // Grouping & Update
    // Compare Genre & Update ???
  });
  console.log(`[UPDATE] Updating Tracks in Music took ${getTimer()} seconds`);
};
