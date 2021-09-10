type get<T> = () => T
type getSet<T> = ((newValue?: T) => T)
interface FileLocation {
    toString: get<string>
}

interface MusicObject {
    class: get<unknown>;
    container: get<unknown>;
    id: get<number>;
    index: get<number>;
    name: getSet<string>;
    persistentID: get<string>;
    properties: get<Record<string, unknown>>;
    delete: () => void;
}

interface MusicTrack extends MusicObject {
    album: getSet<string>; //the album name of the track
    albumArtist: getSet<string>; //the album artist of the track
    albumDisliked: getSet<boolean>;// is the album for this track disliked?
    albumLoved: getSet<boolean>;// is the album for this track loved?
    albumRating: getSet<number>; // the rating of the album for this track (0 to 100)
    albumRatingKind: get<'user' | 'computed'>; // the rating kind of the album rating for this track
    artist: getSet<string>; //the artist/source of the track
    bitRate: get<number>; // the bit rate of the track (in kbps)
    bookmark: get<number>; // the bookmark time of the track in seconds
    bookmarkable: getSet<boolean>;// is the playback position for this track remembered?
    bpm: getSet<number>; // the tempo of this track in beats per minute
    category: getSet<string>; //the category of the track
    cloudStatus: get<'unknown' | 'purchased' | 'matched' | 'uploaded' | 'ineligible' | 'removed' | 'error' | 'duplicate' | 'subscription' | 'no longer available' | 'not uploaded'>; // the iCloud status of the track
    comment: getSet<string>; //freeform notes about the track
    compilation: getSet<boolean>;// is this track from a compilation album?
    composer: getSet<string>; //the composer of the track
    databaseID: get<number>; // the common, unique ID for this track. If two tracks in different playlists have the same database ID, they are sharing the same data.
    dateAdded: get<Date>; // the date the track was added to the playlist
    description: getSet<string>; //the description of the track
    discCount: getSet<number>; // the total number of discs in the source album
    discNumber: getSet<number>; // the index of the disc containing this track on the source album
    disliked: getSet<boolean>;// is this track disliked?
    downloaderAppleID: get<string>;// the Apple ID of the person who downloaded this track
    downloaderName: get<string>;// the name of the person who downloaded this track
    duration: get<number>; // the length of the track in seconds
    enabled: getSet<boolean>;// is this track checked for playback?
    episodeID: getSet<string>; //the episode ID of the track
    episodeNumber: getSet<number>; // the episode number of the track
    eq: getSet<string>; //the name of the EQ preset of the track
    finish: getSet<number>;// the stop time of the track in seconds
    gapless: getSet<boolean>;// is this track from a gapless album?
    genre: getSet<string>; //the music/audio genre (category) of the track
    grouping: getSet<string>; //the grouping (piece) of the track. Generally used to denote movements within a classical work.
    kind: get<string>;// a text description of the track
    longDescription: getSet<string>; //the long description of the track
    loved: getSet<boolean>;// is this track loved?
    lyrics: getSet<string>; //the lyrics of the track
    mediaKind: get<'song'|'music video'|'unknown'>; // the media kind of the track
    modificationDate: get<Date>; // the modification date of the content of this track
    movement: getSet<string>; //the movement name of the track
    movementCount: getSet<number>; // the total number of movements in the work
    movementNumber: getSet<number>; // the index of the movement in the work
    playedCount: getSet<number>; // number of times this track has been played
    playedDate: getSet<Date>; // the date and time this track was last played
    purchaserAppleID: get<string>;// the Apple ID of the person who purchased this track
    purchaserName: get<string>;// the name of the person who purchased this track
    rating: getSet<number>; // the rating of this track (0 to 100)
    ratingKind: get<'user'|'computed'>; //: the rating kind of this track
    releaseDate: get<Date>; // the release date of this track
    sampleRate: get<number>; // the sample rate of the track (in Hz)
    seasonNumber: getSet<number>; // the season number of the track
    shufflable: getSet<boolean>;// is this track included when shuffling?
    skippedCount: getSet<number>; // number of times this track has been skipped
    skippedDate: getSet<Date>; // the date and time this track was last skipped
    show: getSet<string>; //the show name of the track
    sortAlbum: getSet<string>; //override string to use for the track when sorting by album
    sortArtist: getSet<string>; //override string to use for the track when sorting by artist
    sortAlbumArtist: getSet<string>; //override string to use for the track when sorting by album artist
    sortName: getSet<string>; //override string to use for the track when sorting by name
    sortComposer: getSet<string>; //override string to use for the track when sorting by composer
    sortShow: getSet<string>; //override string to use for the track when sorting by show name
    size: get<number>; //: the size of the track (in bytes)
    start: getSet<number>;// the start time of the track in seconds
    time: get<string>;// the length of the track in MM:SS format
    trackCount: getSet<number>; // the total number of tracks on the source album
    trackNumber: getSet<number>; // the index of the track on the source album
    unplayed: getSet<boolean>;// is this track unplayed?
    volumeAdjustment: getSet<number>; // relative volume adjustment of the track (-100% to 100%)
    work: getSet<string>; //the work name of the track
    year: getSet<number>; // the year the track was recorded/released
    location?: get<FileLocation>;
}

interface MusicPlaylist extends MusicObject {
    databaseID: get<number>;
    visible: get<boolean>;
    description: getSet<string>;
    specialKind: get<'none'|'folder'|'Genius'|'Library'|'Music'|'Purchased Music'>;
    time: get<string>; //MM:SS format
    duration: get<number>; //seconds
    loved: getSet<boolean>;
    disloked: getSet<boolean>
    parent: getSet<MusicPlaylist>;
    tracks: get<MusicTrack[]>;
    playlistPath?: string[]
}

interface ApplicationMusic {
    tracks: () => MusicTrack[];
    playlists: () => MusicPlaylist[];
    stop: () => void;
    resume: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
    pause: () => void;

}

interface AugmentedMusicPlaylist {
    playlist: MusicPlaylist;
    path: string[]
}

interface ApplicationSystemEvents {
    open: () => unknown;
    save: () => unknown;
    close: () => unknown;

}

declare type RekordboxTrackId = string


declare interface RekordboxTrack {
    rbId: RekordboxTrackId
}

declare interface RekordboxPlaylist {
    tracks: RekordboxTrack[]
}

declare interface CommonTrack extends RekordboxTrack {
    musicRef?: MusicTrack
}

declare type CommonTrackId = string
declare type CommonPlaylistPath = string
declare function Application(a: 'Music'): ApplicationMusic
declare function Application(a: 'System Events'): ApplicationSystemEvents