import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  deleteTracker,
  stopCounting,
  startCounting,
} from "../../app/TrackerSlice";
import "./trackerItem.scss";

const TrackerItem = ({ item }) => {
  const { active, title, id, time, stopTime, workTime, startTime } = item;
  const [timer, setTimer] = useState("00:00:00");
  const dispatch = useDispatch();

  function myTimer() {
    let currentTime;
    if (stopTime === 0) {
      currentTime = new Date() - time;
    }
    if (stopTime !== 0) {
      currentTime = Date.now() - startTime + workTime;
    }
    const t = moment(currentTime).utcOffset(0).format("HH:mm:ss");
    setTimer(t);
  }

  let intervalId;

  useEffect(() => {
    if (active) {
      intervalId = setInterval(myTimer, 100);
    }
    if (!active) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [active]);

  const handleClick = (id) => {
    if (active) {
      const stopItem = {
        id,
        stopTime: Date.now(),
      };
      dispatch(stopCounting(stopItem));
    } else {
      const startItem = {
        id,
        startTime: Date.now(),
      };
      dispatch(startCounting(startItem));
    }
  };

  const deleteItem = (id) => {
    dispatch(deleteTracker(id));
  };

  return (
    <div
      className="tracker__item"
      style={{
        backgroundColor: active ? "#00800014" : "transparent",
      }}
    >
      <div className="item__title">{title}</div>
      <div className="item__info">
        <div>{timer}</div>
        <button className="item__icon black" onClick={() => handleClick(id)}>
          {active ? (
            <span className="material-symbols-outlined">pause</span>
          ) : (
            <span className="material-symbols-outlined">play_arrow</span>
          )}
        </button>
        <button className="item__icon red" onClick={() => deleteItem(id)}>
          <span className="material-symbols-outlined">remove</span>
        </button>
      </div>
    </div>
  );
};

export default TrackerItem;
