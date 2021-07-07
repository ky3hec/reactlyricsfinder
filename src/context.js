import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { getTracksURL } from "./helpers/urlhelpers";

const TRACKS_URL = getTracksURL();
const TracksContext = React.createContext();
const TracksDispatch = React.createContext();
const LOAD = "LOAD_TRACKS";

export const useTracksState = () => {
  const context = useContext(TracksContext);
  if (context === undefined) {
    throw new Error("useTracksState must be used within TracksProvider");
  }
  return context;
};
export const useTracksDispatch = () => {
  const context = useContext(TracksDispatch);
  if (context === undefined) {
    throw new Error("");
  }
  return context;
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        track_list: action.payload,
        heading: action.heading,
      };
    default:
      return state;
  }
};

const initialState = {
  track_list: [],
  heading: "",
};

export const TracksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const loadTracks = (payload, heading) =>
    dispatch({ type: LOAD, payload: payload, heading: heading });
  useEffect(() => {
    axios
      .get(TRACKS_URL)
      .then((res) => {
        loadTracks(res.data.message.body.track_list, "Top 10 Tracks");
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <TracksContext.Provider value={state}>
      <TracksDispatch.Provider value={loadTracks}>
        {children}
      </TracksDispatch.Provider>
    </TracksContext.Provider>
  );
};
