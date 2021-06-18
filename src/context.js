import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();
const TRACKS_URL =
  `${process.env.REACT_APP_CHART_TRACKS_URL}` +
  `chart_name=top` +
  "&page=1" +
  "&page_size=10" +
  "&country=us" +
  "&f_has_lyrics=1" +
  `&apikey=${process.env.REACT_APP_MM_KEY}`;
export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track_list: [],
      heading: "Top 10 tracks",
    };
  }

  componentDidMount() {
    axios
      .get(TRACKS_URL)
      .then((res) => {
        // console.log(res.data);
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
