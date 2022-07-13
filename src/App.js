import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Tracker from "./components/tracker/Tracker";
import { getTrackers } from "./app/TrackerSlice";

function App() {
  const { trackerArr } = useSelector((state) => state.tracker);
  const dispatch = useDispatch();

  const tracker = JSON.parse(localStorage.getItem("tracker")) || [];

  useEffect(() => {
    dispatch(getTrackers(tracker));
  }, []);

  useEffect(() => {
    localStorage.setItem("tracker", JSON.stringify(trackerArr));
  }, [trackerArr]);

  return (
    <div className="container">
      <Tracker />
    </div>
  );
}

export default App;
