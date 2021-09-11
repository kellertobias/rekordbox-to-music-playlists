import { buildCommonId, decodeHTMLEntities } from "./common-track-hash"
import { getTimer, PLAYLIST_PATH_SEP, startTimer } from "./constants"
import * as parser from 'fast-xml-parser';
import { readFile } from "./load-file";

export const loadRekordbox = (libraryFile: string): {
    tracks: Record<CommonTrackId, RekordboxTrack>,
    playlists: Record<CommonPlaylistPath, RekordboxPlaylist>
} => {
    startTimer()
    console.log("[RB]: Loading Rekordbox Tracks")
    const path = Path(libraryFile)

    const tracksRB : Record<RekordboxTrackId, RekordboxTrack> = {}
    const tracks : Record<CommonTrackId, RekordboxTrack> = {}
    const playlists : Record<CommonPlaylistPath, RekordboxPlaylist> = {}

    const sys = Application('System Events')
    
    const xmlString = readFile(libraryFile)

    const library = parser.parse(xmlString, {
        attributeNamePrefix : "",
        attrNodeName: 'attr',
        ignoreAttributes: false
    })?.DJ_PLAYLISTS;

    // Load and Match Tracks
    let count = 0
    library.COLLECTION.TRACK.forEach((trackNode: RBLibraryTrackNode) => {
        const node = trackNode.attr
        if(['MP3 File'].indexOf(node.Kind) === -1) {
            return
        }
        const track = {rbRef: {
            ...node,
            Size: Number(node.Size),
            TotalTime: Number(node.TotalTime),
            DiscNumber: Number(node.DiscNumber),
            TrackNumber: Number(node.TrackNumber),
            AverageBpm: Math.round(Number(node.AverageBpm)),
            Rating: Math.round(Number(node.Rating) * 100 / 255),
        }}
        const {Name, Artist, TotalTime, TrackID} = trackNode.attr
        const commonId = buildCommonId({
            title: Name,
            artist: Artist,
            duration: TotalTime
        })

        tracksRB[TrackID] = track
        tracks[commonId] = track
        count += 1
    })

    console.log(`[RB] Loaded ${count} Tracks from Rekordbox Library`)

    // Iterate over Playlists
    const iteratePlaylists = (node: RBLibraryPlaylistNode, parentPath: string[] = []) => {
        if(!node) {
            console.log("     -> Playlist Node not set")
            return
        }

        const {attr, TRACK, NODE} = node
        if(!attr) {
            console.log("     -> Attributes Node not set", JSON.stringify(node))
            return
        }
        const {Name, Type} = attr
        const name = decodeHTMLEntities(Name)
        const path = [...parentPath, name]
        console.log(`- Adding Playlist ${name} in Path ${path.join('/')}`)

        if(Type == 1) {
            const playlist : RekordboxPlaylist = {
                name,
                path,
                tracks: (Array.isArray(TRACK) ? TRACK : [TRACK]).map(t => {
                    if(!t || !t.attr) {
                        console.log("     -> Track Node not set", JSON.stringify(t))
                        return
                    }
                    const rbid = t.attr.Key
                    return tracksRB[rbid] || null
                })
            }
            playlists[path.join(PLAYLIST_PATH_SEP)] = playlist
        } else {
            (Array.isArray(NODE) ? NODE : [NODE]).map(nextNode => {
                iteratePlaylists(nextNode, path)
            })
        }
    }

    library.PLAYLISTS.NODE.NODE.forEach(node => {
        iteratePlaylists(node, [])
    })


    console.log(`[RB] Loading Rekordbox Library took ${getTimer()} seconds`)
    return {
        tracks,
        playlists
    }
}