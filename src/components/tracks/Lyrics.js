import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import {
  getLyricsURL,
  getAlbumURL,
  getTrackURL,
} from "../../helpers/urlhelpers";

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      lyrics: {},
      album: {},
    };
  }

  render() {
    const { track, lyrics, album } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0 ||
      Object.keys(album).length === 0
    ) {
      return <Spinner />;
    } else {
      const music_genre =
        album.primary_genres.music_genre_list.length > 0
          ? album.primary_genres.music_genre_list[0]
          : {};

      const genre =
        Object.keys(music_genre).length > 0
          ? music_genre?.music_genre?.music_genre_name
          : null;

      return (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-4">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Song Genre</strong>: {genre}
            </li>
            <li className="list-group-item">
              <strong>Explicit words</strong>:{" "}
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="list-group-item">
              <strong>Release Date</strong>:
              <Moment format="MM/DD/YYYY">{album.album_release_date}</Moment>
            </li>
          </ul>
        </>
      );
    }
  }
  componentDidMount() {
    const TRACK_ID = this.props.match.params.id;
    axios
      .get(getLyricsURL(TRACK_ID))
      .then((res) => {
        this.setState({
          lyrics: res.data.message.body.lyrics,
        });
        return axios.get(getTrackURL(TRACK_ID));
      })
      .then((res) => {
        this.setState({
          track: res.data.message.body.track,
        });
        return axios.get(getAlbumURL(res.data.message.body.track.album_id));
      })
      .then((res) => {
        this.setState({
          album: res.data.message.body.album,
        });
        console.log(res.data.message.body.album);
      })
      .catch((error) => console.error(error));
  }
}
export default Lyrics;
