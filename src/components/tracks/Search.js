import React, { useState } from "react";
import axios from "axios";
import { useTracksDispatch } from "../../context";
import { getSearchURL } from "../../helpers/urlhelpers";

const Search = () => {
  const [trackTitle, setTrackTitle] = useState("");
  const { loadTracks } = useTracksDispatch();

  const submitHandler = (loadTracks, e) => {
    e.preventDefault();
    axios
      .get(getSearchURL(trackTitle))
      .then((res) => {
        loadTracks(res.data.message.body.track_list, "Search Results");
      })
      .catch((error) => {
        console.error(error);
      });
    setTrackTitle("");
  };
  return (
    <div className="card card-body mb-4 p-4">
      <h1 className="display-4 text-center">
        Search For A Song <i className="fas fa-music" />
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form onSubmit={(e) => submitHandler(loadTracks, e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg mb-2"
            name="trackTitle"
            placeholder="Song title..."
            value={trackTitle}
            onChange={(e) => setTrackTitle(e.target.value)}
          />
          <button
            className="btn form-control btn-lg btn-primary mb-5"
            type="submit"
          >
            Get Track Lyrics
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
