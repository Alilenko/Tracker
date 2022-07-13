import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { addNewTracker } from "../../app/TrackerSlice";
import TrackerItem from "../trackerItem/TrackerItem";

import "./tracker.scss";

const Tracker = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { trackerArr } = useSelector((state) => state.tracker);

  const addNewItem = (e) => {
    e.preventDefault();
    const newItem = {
      title: input ? input : Date.now(),
      id: uuidv4(),
      time: Date.now(),
      active: true,
      stopTime: 0,
      workTime: 0,
      startTime: Date.now(),
    };
    dispatch(addNewTracker(newItem));
    setInput("");
  };

  return (
    <div className="tracker">
      <h1>Tracker</h1>
      <form className="trecker__field" onSubmit={(e) => addNewItem(e)}>
        <input
          className="trecker__input"
          placeholder="Enter tracker name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="trecker__icon">
          <span className="material-symbols-outlined">play_arrow</span>
        </button>
      </form>
      {trackerArr.map((item) => (
        <TrackerItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Tracker;
