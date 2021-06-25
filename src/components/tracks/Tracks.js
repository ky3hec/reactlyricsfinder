import React, { Component } from "react";
import { Consumer } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

export const Tracks1 = () => {};
const TrackList = ({ trackList, heading }) => {
  return (
    <>
      <h3 className="text-center mb-4">{heading}</h3>
      <div className="row">
        {trackList.map(({ track }) => (
          <Track key={track.track_id} track={track} />
        ))}
      </div>
    </>
  );
};
class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { track_list, heading } = value;
          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else {
            return <TrackList trackList={track_list} heading={heading} />;
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
