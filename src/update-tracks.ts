export const updateTracks = (tracks: Record<CommonTrackId, CommonTrack>) => {
    console.log("Updating Tracks BPM, Rating and Tonality in Music")
    Object.keys(tracks).forEach(ctid => {
        const track = tracks[ctid]

        // Compare BPM & Update
        // Compare Rating & Update
        // Compare Tonality // Grouping & Update
        // Compare Genre & Update ???
    })
    
}