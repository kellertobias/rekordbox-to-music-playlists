export const MAX_PLAYLIST_DEPTH = 10
export const MUSIC_IMPORTED_PLAYLIST_DESCRIPTION_SLUG = 'Imported from Rekordbox.'
export const TRASH_FOLDER_NAME = 'DELETE'
let timerStart = 0

export const startTimer = () => {
    timerStart = (new Date()).getTime()
}

export const getTimer = () => {
    const timerStop = (new Date()).getTime()
    const duration = (timerStop - timerStart) / 1000
    timerStart = 0
    return duration
}