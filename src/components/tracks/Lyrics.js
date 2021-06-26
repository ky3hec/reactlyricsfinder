import React, { useState, useEffect } from "react";
import Spinner from "../layout/Spinner";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  getLyricsURL,
  getAlbumURL,
  getTrackURL,
} from "../../helpers/urlhelpers";

const LyricsCard = ({ children }) => {
  return <div className="card">{children}</div>;
};

const LyricsCardHeader = ({ trackName, artistName }) => {
  return (
    <h5 className="card-header">
      {trackName} by <span className="text-secondary">{artistName}</span>
    </h5>
  );
};

const LyricsCardBody = ({ lyricsBody }) => {
  return (
    <div className="card-body">
      <pre className="pre-scrollable">{lyricsBody}</pre>
    </div>
  );
};

const LyricsDetail = ({ children }) => {
  return <ul className="list-group mt-4">{children}</ul>;
};
const LyricsDetailItem = ({ label = "empty", data = null }) => {
  return (
    <li className="list-group-item">
      <strong>{label}</strong>: {data}
    </li>
  );
};

const Lyrics = () => {
  const [trackName, setTrackName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [explicit, setExplicit] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [genre, setGenre] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { id: TRACK_ID } = useParams();
  useEffect(() => {
    axios
      .get(getLyricsURL(TRACK_ID))
      .then((res) => {
        setLyrics(res.data.message.body.lyrics.lyrics_body);
      })
      .catch((error) => console.error(error));
  }, [TRACK_ID]);

  useEffect(() => {
    axios
      .get(getTrackURL(TRACK_ID))
      .then((res) => {
        const { track } = res.data.message.body;
        setTrackName(track.track_name);
        setArtistName(track.artist_name);
        setExplicit(track.explicit);
        setAlbumId(track.album_id);
        return axios.get(getAlbumURL(track.album_id));
      })
      .then((res) => {
        const { album } = res.data.message.body;
        console.log(album);
        const music_genre =
          album.primary_genres?.music_genre_list.length > 0
            ? album.primary_genres.music_genre_list[0]
            : {};
        const genre =
          Object.keys(music_genre).length > 0
            ? music_genre?.music_genre?.music_genre_name
            : null;
        setGenre(genre);
        setReleaseDate(album.album_release_date);
        setLoaded(true);
      })
      .catch((error) => console.error(error));
  }, [TRACK_ID]);

  if (!loaded) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go back
        </Link>
        <LyricsCard>
          <LyricsCardHeader trackName={trackName} artistName={artistName} />
          <LyricsCardBody lyricsBody={lyrics} />
        </LyricsCard>
        <LyricsDetail>
          <LyricsDetailItem label="Album ID" data={albumId} />
          <LyricsDetailItem label="Song Genre" data={genre} />
          <LyricsDetailItem
            label="Explicit words"
            data={explicit === 0 ? "No" : "Yes"}
          />
          <LyricsDetailItem
            label="Release Date"
            data={<Moment format="MM/DD/YYYY">{releaseDate}</Moment>}
          />
        </LyricsDetail>
      </>
    );
  }
};
export default Lyrics;
