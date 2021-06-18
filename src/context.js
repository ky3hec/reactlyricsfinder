import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track_list: [
        { track: { track_name: "abc" } },
        { track: { track_name: "123" } },
        { track: { track_name: "456" } },
      ],
      heading: "Top 10 tracks",
    };
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
