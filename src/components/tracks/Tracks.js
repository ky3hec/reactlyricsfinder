import React from "react";
import { useTracksState } from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

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

export const Tracks = () => {
  const { track_list, heading } = useTracksState();
  if (track_list === undefined || track_list.length === 0) {
    return <Spinner />;
  } else {
    return <TrackList trackList={track_list} heading={heading} />;
  }
};

export default Tracks;
