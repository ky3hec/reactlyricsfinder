import React, { Component } from "react";
import { Consumer } from "../../context";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { track_list } = value;
          console.log(track_list);
          if (track_list === undefined || track_list.length === 0) {
            return <div>Spinner</div>;
          } else {
            return (
              <div>
                <h1>Tracks loaded</h1>
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
