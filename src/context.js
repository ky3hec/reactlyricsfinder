import React, { Component } from "react";
import axios from "axios";
import { getTracksURL } from "./helpers/urlhelpers";

const Context = React.createContext();

const TRACKS_URL = getTracksURL();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_TRACKS": {
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results",
      };
    }
    default:
      return state;
  }
};

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track_list: [],
      heading: "Top 10 tracks",
      dispatch: (action) => this.setState((state) => reducer(state, action)),
    };
  }

  componentDidMount() {
    axios
      .get(TRACKS_URL)
      .then((res) => {
        this.setState({
          track_list: res.data.message.body.track_list,
        });
      })
      .catch((error) => console.error(error));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
