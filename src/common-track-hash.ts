export const buildCommonId = ({title, artist, duration}) => {
    return `${title}---${artist}---${duration}`
}