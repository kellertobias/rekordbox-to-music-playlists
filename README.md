# Rekordbox Playlists to Apple Music on Mac

This projects goal is to get your playlists, ratings and BPM analysis from Rekordbox back to Apple Music

## Run

Download the Release from the releases page and execute the app.

The app will do the following:

- Ask you where your rekordbox.xml file is located (you need to export that file from rekordbox)
- read and analyze the rekordbox XML as well as the current Music library (this may take a while)
- Update the Rating and BPM of your tracks in apple music based on the data from Rekordbox
- Update all playlists that have noted in the description "managed by rekordbox". This will:
  - Delete playlists no longer in Rekordbox (only if the have the description "Imported from Rekordbox.")
  - Add new playlists not yet in music
  - update the contents of the playlists present in both
  - Ignore Playlists starting with an underscore (\_)

These operations might take a while depending on how many songs you have (and how long the playlists are). Sadly this is not possible to be more efficient as apple script (which the app is based on) simulates klicks in the UI to do the stuff.

## Example Log

```
[EXECUTING SCRIPT]
Library File: /Users/keller/Desktop/library.xml
[RB]: Loading Rekordbox Tracks
[RB] Loaded 4264 Tracks from Rekordbox Library
- Ignoring Playlist _Next Tracks in Path _Next Tracks - starts with '_'
- Adding Playlist Crates in Path Crates
- Adding Playlist Own Music in Path Crates/Own Music
- Adding Playlist Animation in Path Crates/Animation
- Adding Playlist Stream Waiting Music in Path Crates/Stream Waiting Music
- Adding Playlist Bachata in Path Crates/Bachata
- Adding Playlist All Bachata in Path Crates/Bachata/All Bachata
- Adding Playlist Fusion in Path Crates/Bachata/Fusion
- Adding Playlist EDM in Path Crates/EDM
...
- Ignoring Playlist _WORKFLOW in Path _WORKFLOW - starts with '_'
[RB] Loading Rekordbox Library took 2.363 seconds
[MUSIC]: Loading Music Tracks
[MUSIC]: 10658 tracks loaded
[MUSIC]: Matching for Rekordbox Tracks
[MUSIC]: 110 tracks missing or not matchable in music
[MUSIC]: Loading Playlists took 59.426 seconds
[UPDATE] Updating Tracks BPM, Rating and Tonality in Music. Library has 4250 Tracks
- Update Rating of Ryo -- {"rb":40,"music":60}
- Update Rating of The Power -- {"rb":80,"music":100}
- Update Rating of Downtown -- {"rb":60,"music":80}
- Update Rating of Via -- {"rb":80,"music":100}
- Update Rating of Échale Madera (feat. Jimmy Bosch) -- {"rb":80,"music":100}
- Update Rating of Muñeca -- {"rb":80,"music":100}
- Update Rating of La Cura -- {"rb":60,"music":80}
- Update Rating of Candela -- {"rb":60,"music":80}
- Update Rating of Pobrecita -- {"rb":80,"music":100}
[UPDATE] Updating Tracks in Music took 15.066 seconds
[MUSIC]: Loading Playlists
[MUSIC]: 48/76 playlists are managed by Rekordbox
[MUSIC]: Loading Playlists took 0.852 seconds
[TRASH]: Deleting 0 Playlists in Trash Folder
------------ FINAL STAGE ------------
Deleting 0 Playlists not in RB
Creating 18 Playlists not in Music
 -> IN Crates/EDM CREATE EDM - Mixins
...
[MUSIC]: Loading Playlists
[MUSIC]: 66/94 playlists are managed by Rekordbox
[MUSIC]: Loading Playlists took 1.089 seconds
Updating Tracks in Playlists
[UPDATE] All Bachata

```

The Part until "FINAL STAGE" might be quick (around 1-5 Minutes). The part afterwards will be horribly slow (longer playlists (500-1500 tracks) might take up to 30 Minutes (per playlist) to sync and apple music might freeze during that time)

## Develop

this project is writting in typescript and compiles to javascript which is then evaluated as applescript.

To Execute the build run `npm run execute`
