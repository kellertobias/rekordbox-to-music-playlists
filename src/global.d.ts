type get<T> = () => T
type getter<T> = (() => T)

interface FileLocation {
    toString: get<string>
}

interface MusicObject {
    class: get<unknown>;
    container: get<unknown>;
    id: get<number>;
    index: get<number>;
    get name(): getter<string>;
    set name(value: string | (() => string));
    persistentID: get<string>;
    properties: get<Record<string, unknown>>;
    delete: () => void;
}

interface MusicTrack extends MusicObject {
    get album(): getter<string>; //the album name of the track
    set album(value: string | (() => string)); //the album name of the track
    get albumArtist(): getter<string>; //the album artist of the track
    set albumArtist(value: string | (() => string)); //the album artist of the track
    get albumDisliked(): getter<boolean>;// is the album for this track disliked?
    set albumDisliked(value: boolean | (() => boolean));// is the album for this track disliked?
    get albumLoved(): getter<boolean>;// is the album for this track loved?
    set albumLoved(value: boolean | (() => boolean));// is the album for this track loved?
    get albumRating(): getter<number>; // the rating of the album for this track (0 to 100)
    set albumRating(value: number | (() => number)); // the rating of the album for this track (0 to 100)
    albumRatingKind: get<'user' | 'computed'>; // the rating kind of the album rating for this track
    get artist(): getter<string>; //the artist/source of the track
    set artist(value: string | (() => string)); //the artist/source of the track
    bitRate: get<number>; // the bit rate of the track (in kbps)
    bookmark: get<number>; // the bookmark time of the track in seconds
    get bookmarkable(): getter<boolean>;// is the playback position for this track remembered?
    set bookmarkable(value: boolean | (() => boolean));// is the playback position for this track remembered?
    get bpm(): getter<number>; // the tempo of this track in beats per minute
    set bpm(value: number | (() => number)); // the tempo of this track in beats per minute
    get category(): getter<string>; //the category of the track
    set category(value: string | (() => string)); //the category of the track
    cloudStatus: get<'unknown' | 'purchased' | 'matched' | 'uploaded' | 'ineligible' | 'removed' | 'error' | 'duplicate' | 'subscription' | 'no longer available' | 'not uploaded'>; // the iCloud status of the track
    get comment(): getter<string>; //freeform notes about the track
    set comment(value: string | (() => string)); //freeform notes about the track
    get compilation(): getter<boolean>;// is this track from a compilation album?
    set compilation(value: boolean | (() => boolean));// is this track from a compilation album?
    get composer(): getter<string>; //the composer of the track
    set composer(value: string | (() => string)); //the composer of the track
    databaseID: get<number>; // the common, unique ID for this track. If two tracks in different playlists have the same database ID, they are sharing the same data.
    dateAdded: get<Date>; // the date the track was added to the playlist
    get description(): getter<string>; //the description of the track
    set description(value: string | (() => string)); //the description of the track
    get discCount(): getter<number>; // the total number of discs in the source album
    set discCount(value: number | (() => number)); // the total number of discs in the source album
    get discNumber(): getter<number>; // the index of the disc containing this track on the source album
    set discNumber(value: number | (() => number)); // the index of the disc containing this track on the source album
    get disliked(): getter<boolean>;// is this track disliked?
    set disliked(value: boolean | (() => boolean));// is this track disliked?
    downloaderAppleID: get<string>;// the Apple ID of the person who downloaded this track
    downloaderName: get<string>;// the name of the person who downloaded this track
    duration: get<number>; // the length of the track in seconds
    get enabled(): getter<boolean>;// is this track checked for playback?
    set enabled(value: boolean | (() => boolean));// is this track checked for playback?
    get episodeID(): getter<string>; //the episode ID of the track
    set episodeID(value: string | (() => string)); //the episode ID of the track
    get episodeNumber(): getter<number>; // the episode number of the track
    set episodeNumber(value: number | (() => number)); // the episode number of the track
    get eq(): getter<string>; //the name of the EQ preset of the track
    set eq(value: string | (() => string)); //the name of the EQ preset of the track
    get finish(): getter<number>;// the stop time of the track in seconds
    set finish(value: number | (() => number));// the stop time of the track in seconds
    get gapless(): getter<boolean>;// is this track from a gapless album?
    set gapless(value: boolean | (() => boolean));// is this track from a gapless album?
    get genre(): getter<string>; //the music/audio genre (category) of the track
    set genre(value: string | (() => string)); //the music/audio genre (category) of the track
    get grouping(): getter<string>; //the grouping (piece) of the track. Generally used to denote movements within a classical work.
    set grouping(value: string | (() => string)); //the grouping (piece) of the track. Generally used to denote movements within a classical work.
    kind: get<string>;// a text description of the track
    get longDescription(): getter<string>; //the long description of the track
    set longDescription(value: string | (() => string)); //the long description of the track
    get loved(): getter<boolean>;// is this track loved?
    set loved(value: boolean | (() => boolean));// is this track loved?
    get lyrics(): getter<string>; //the lyrics of the track
    set lyrics(value: string | (() => string)); //the lyrics of the track
    mediaKind: get<'song'|'music video'|'unknown'>; // the media kind of the track
    modificationDate: get<Date>; // the modification date of the content of this track
    get movement(): getter<string>; //the movement name of the track
    set movement(value: string | (() => string)); //the movement name of the track
    get movementCount(): getter<number>; // the total number of movements in the work
    set movementCount(value: number | (() => number)); // the total number of movements in the work
    get movementNumber(): getter<number>; // the index of the movement in the work
    set movementNumber(value: number | (() => number)); // the index of the movement in the work
    get playedCount(): getter<number>; // number of times this track has been played
    set playedCount(value: number | (() => number)); // number of times this track has been played
    get playedDate(): getter<Date>; // the date and time this track was last played
    set playedDate(value: Date | (() => Date)); // the date and time this track was last played
    purchaserAppleID: get<string>;// the Apple ID of the person who purchased this track
    purchaserName: get<string>;// the name of the person who purchased this track
    get rating(): getter<number>; // the rating of this track (0 to 100)
    set rating(value: number | (() => number)); // the rating of this track (0 to 100)
    ratingKind: get<'user'|'computed'>; //: the rating kind of this track
    releaseDate: get<Date>; // the release date of this track
    sampleRate: get<number>; // the sample rate of the track (in Hz)
    get seasonNumber(): getter<number>; // the season number of the track
    set seasonNumber(value: number | (() => number)); // the season number of the track
    get shufflable(): getter<boolean>;// is this track included when shuffling?
    set shufflable(value: boolean | (() => boolean));// is this track included when shuffling?
    get skippedCount(): getter<number>; // number of times this track has been skipped
    set skippedCount(value: number | (() => number)); // number of times this track has been skipped
    get skippedDate(): getter<Date>; // the date and time this track was last skipped
    set skippedDate(value: Date | (() => Date)); // the date and time this track was last skipped
    get show(): getter<string>; //the show name of the track
    set show(value: string | (() => string)); //the show name of the track
    get sortAlbum(): getter<string>; //override string to use for the track when sorting by album
    set sortAlbum(value: string | (() => string)); //override string to use for the track when sorting by album
    get sortArtist(): getter<string>; //override string to use for the track when sorting by artist
    set sortArtist(value: string | (() => string)); //override string to use for the track when sorting by artist
    get sortAlbumArtist(): getter<string>; //override string to use for the track when sorting by album artist
    set sortAlbumArtist(value: string | (() => string)); //override string to use for the track when sorting by album artist
    get sortName(): getter<string>; //override string to use for the track when sorting by name
    set sortName(value: string | (() => string)); //override string to use for the track when sorting by name
    get sortComposer(): getter<string>; //override string to use for the track when sorting by composer
    set sortComposer(value: string | (() => string)); //override string to use for the track when sorting by composer
    get sortShow(): getter<string>; //override string to use for the track when sorting by show name
    set sortShow(value: string | (() => string)); //override string to use for the track when sorting by show name
    size: get<number>; //: the size of the track (in bytes)
    get start(): getter<number>;// the start time of the track in seconds
    set start(value: number | (() => number));// the start time of the track in seconds
    time: get<string>;// the length of the track in MM:SS format
    get trackCount(): getter<number>; // the total number of tracks on the source album
    set trackCount(value: number | (() => number)); // the total number of tracks on the source album
    get trackNumber(): getter<number>; // the index of the track on the source album
    set trackNumber(value: number | (() => number)); // the index of the track on the source album
    get unplayed(): getter<boolean>;// is this track unplayed?
    set unplayed(value: boolean | (() => boolean));// is this track unplayed?
    get volumeAdjustment(): getter<number>; // relative volume adjustment of the track (-100% to 100%)
    set volumeAdjustment(value: number | (() => number)); // relative volume adjustment of the track (-100% to 100%)
    get work(): getter<string>; //the work name of the track
    set work(value: string | (() => string)); //the work name of the track
    get year(): getter<number>; // the year the track was recorded/released
    set year(value: number | (() => number)); // the year the track was recorded/released
    location?: get<FileLocation>;
}

interface MusicPlaylist extends MusicObject {
    databaseID: get<number>;
    visible: get<boolean>;
    get description(): getter<string>;
    set description(value: string | (() => string));
    specialKind: get<'none'|'folder'|'Genius'|'Library'|'Music'|'Purchased Music'>;
    time: get<string>; //MM:SS format
    duration: get<number>; //seconds
    get loved(): getter<boolean>;
    set loved(value: boolean | (() => boolean));
    get disloked(): getter<boolean>
    set disloked(value: boolean | (() => boolean))
    get parent(): getter<MusicPlaylist>;
    set parent(value: MusicPlaylist | (() => MusicPlaylist));
    tracks: get<MusicTrack[]>;
    playlistPath?: string[];
    add: (param?: any) => void;
    make: (param?: any) => void;
    move: (param: {to: MusicPlaylist}) => void;
}

interface ApplicationMusic {
    tracks: () => MusicTrack[];
    playlists: () => MusicPlaylist[];
    stop: () => void;
    resume: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
    pause: () => void;
    UserPlaylist: (args?: {name: string, description: string}) => {make: (args?: any) => MusicPlaylist}
}

interface AugmentedMusicPlaylist {
    playlist: MusicPlaylist;
    path: string[]
}

interface ApplicationSystemEvents {
    open: (path: string) => unknown;
    save: () => unknown;
    close: () => unknown;

}

declare type RekordboxTrackId = string


declare interface RekordboxTrackNodeAttributes {
    TrackID: string
    Name: string
    Artist: string
    Composer: string
    Album: string
    Grouping: string
    Genre: string
    Kind: string
    Size: number
    TotalTime: number
    DiscNumber: number
    TrackNumber: number
    Year: string
    AverageBpm: number
    DateAdded: string
    BitRate: string
    SampleRate: string
    Comments: string
    PlayCount: string
    Rating: number
    Location: string
    Remixer: string
    Tonality: string
    Label: string
    Mix: string
}

declare interface RekordboxTrack {
    rbRef: RekordboxTrackNodeAttributes
}

declare interface RekordboxPlaylist {
    path: string[];
    name: string;
    tracks: RekordboxTrack[]
}

declare interface CommonTrack extends RekordboxTrack {
    musicRef?: MusicTrack
}

declare type RBLibraryTrackNode = {
    attr: RekordboxTrackNodeAttributes
}

type RBLibraryPlaylistLeafNode = {
    Type: 0;
    Count: number;
    Name: string;
}

type RBLibraryPlaylistFolderNode = {
    Type: 1;
    Name: string;
    Entries: number;
}

type RBLibraryTrackRefNode = {
    attr: {
        Key: string;
    }
}

declare type RBLibraryPlaylistNode = {
    attr: RBLibraryPlaylistFolderNode;
    NODE: RBLibraryPlaylistNode | RBLibraryPlaylistNode[]
    TRACK: []
} | {
    attr: RBLibraryPlaylistLeafNode;
    TRACK: RBLibraryTrackRefNode | RBLibraryTrackRefNode[];
    NODE: []
}

declare function Application(a: 'Music'): ApplicationMusic
declare function Application(a: 'System Events'): ApplicationSystemEvents
declare namespace Application {
    function currentApplication(): {
        includeStandardAdditions: boolean;
        pathTo: (path: string) => FileLocation;
        read: (path: FileLocation, options?: any) => string;
        chooseFile: (params: {
            ofType: string;
            withPrompt?: string;
        }) => FileLocation
    }
}

declare type CommonTrackId = string
declare type CommonPlaylistPath = string
declare function Path(path: string): FileLocation

declare namespace ObjC {
    const unwrap: (str: any) => string
}

declare namespace $ {
    const NSUTF8StringEncoding: any
    const NSFileManager: {
        defaultManager: {
            contentsAtPath: (path: string) => any
        }
    };
    const NSString: {
        alloc: {
            initWithDataEncoding: (data: any, encoding: number) => any
        }
    }
}