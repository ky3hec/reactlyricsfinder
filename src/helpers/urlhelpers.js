export function getTracksURL() {
  return (
    `${process.env.REACT_APP_CHART_TRACKS_GET}` +
    `chart_name=top` +
    "&page=1" +
    "&page_size=10" +
    "&country=us" +
    "&f_has_lyrics=1" +
    `&apikey=${process.env.REACT_APP_MM_KEY}`
  );
}

export function getLyricsURL(id) {
  return (
    // `${process.env.REACT_APP_MM_API_ROOT_URL}` +
    `${process.env.REACT_APP_TRACK_LYRICS_GET}` +
    `track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
  );
}

export function getTrackURL(id) {
  return (
    `${process.env.REACT_APP_TRACK_GET}` +
    `track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
  );
}

export function getAlbumURL(id) {
  return (
    `${process.env.REACT_APP_ALBUM_GET}` +
    `album_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
  );
}

export function getSearchURL(trackTitle) {
  return (
    `${process.env.REACT_APP_TRACK_SEARCH}` +
    `q_track=${trackTitle}` +
    `&page_size=10&page=1&s_track_rating=desc` +
    `&apikey=${process.env.REACT_APP_MM_KEY}`
  );
}
