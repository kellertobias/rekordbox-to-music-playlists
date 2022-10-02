const entities = {
  amp: "&",
  apos: "'",
  "#x27": "'",
  "#x2F": "/",
  "#39": "'",
  "#47": "/",
  lt: "<",
  gt: ">",
  nbsp: " ",
  quot: '"',
};

export const decodeHTMLEntities = (text) => {
  return text.replace(/&([^;]+);/gm, function (match, entity) {
    return entities[entity] || match;
  });
};

export const buildCommonId = ({
  title,
  artist,
  duration,
}: {
  title: string;
  artist: string;
  duration: number;
}) => {
  return JSON.stringify({
    title: decodeHTMLEntities(title.trim()).toLowerCase(),
    artist: decodeHTMLEntities(artist.trim()).toLowerCase(),
    duration: Math.round(Math.floor(duration) / 5) * 5,
  })
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); //.replace(/[^\-A-Za-z0-9{}:"_+,;#&.()'\/\ ]/g, '');
};
