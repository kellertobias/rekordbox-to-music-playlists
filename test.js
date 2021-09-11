const music = Application('Music')
const params = {name: 'My New Playlist', description: 'My Playlist Description'}
const node = music.playlists().find(p => {
    console.log(p.name())
    return p.name() === 'Situations'
})


const playlist = music.UserPlaylist().make({at: node})
playlist.name = "My New Playlist"
// root.add(playlist)
// music.make({new: music.UserPlaylist, at: pl, withProperties: params})

// music.add(track, {to: playlist})