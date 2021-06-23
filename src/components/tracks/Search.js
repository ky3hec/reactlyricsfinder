import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

function getSearchURL(trackTitle) {
  return (
    `${process.env.REACT_APP_TRACK_SEARCH}` +
    `q_track=${trackTitle}` +
    `&page_size=10&page=1&s_track_rating=desc` +
    `&apikey=${process.env.REACT_APP_MM_KEY}`
  );
}
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTitle: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(getSearchURL(this.state.trackTitle))
      .then((res) => {
        // console.dir(res.data.message.body);
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });
        this.setState({ trackTitle: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music">Search For A Song</i>
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg mb-2"
                    name="trackTitle"
                    placeholder="Song title..."
                    value={this.state.trackTitle}
                    onChange={this.onChange}
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
        }}
      </Consumer>
    );
  }
}
export default Search;
