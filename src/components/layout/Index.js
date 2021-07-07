import React, { useRef, useEffect } from "react";
import Tracks from "../tracks/Tracks.js";
import Search from "../tracks/Search.js";

const Index = () => {
  const searchInputRef = useRef();
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focusOnForm();
    }
  }, []);
  return (
    <>
      <Search ref={searchInputRef} />
      <Tracks />
    </>
  );
};
export default Index;
