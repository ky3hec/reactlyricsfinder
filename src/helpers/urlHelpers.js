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
