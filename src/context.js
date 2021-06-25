import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { getTracksURL } from "./helpers/urlhelpers";

const TRACKS_URL = getTracksURL();
const TracksContext = React.createContext();
const SEARCH = "SEARCH_TRACKS";
const LOAD = "LOAD_TRACKS";

export const useTracks = () => {
  return useContext(TracksContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEARCH: {
      return {
        ...state,
        track_list: action.payload,
        heading: "Search Results",
      };
    }
    case LOAD:
      return {
        ...state,
        track_list: action.payload,
        heading: "Top 10 tracks",
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
  const search = (payload) => dispatch({ type: SEARCH, payload: payload });
  const load = (payload) => dispatch({ type: LOAD, payload: payload });
  useEffect(() => {
    axios
      .get(TRACKS_URL)
      .then((res) => {
        load(res.data.message.body.track_list);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <TracksContext.Provider
      value={{
        track_list: state.track_list,
        heading: state.heading,
        search,
        load,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};
// export class Provider extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       track_list: [],
//       heading: "Top 10 tracks",
//       dispatch: (action) => this.setState((state) => reducer(state, action)),
//     };
//   }

//   componentDidMount() {}
//   render() {
//     return (
//       <Context.Provider value={this.state}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
// }
// export const Consumer = Context.Consumer;
