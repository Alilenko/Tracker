import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackerArr: [],
};

export const trackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    addNewTracker: (state, action) => {
      state.trackerArr.unshift(action.payload);
    },
    getTrackers: (state, action) => {
      state.trackerArr = action.payload;
    },
    deleteTracker: (state, action) => {
      state.trackerArr.splice(
        state.trackerArr.findIndex((item) => item.id === action.payload),
        1
      );
    },
    stopCounting: (state, action) => {
      const id = state.trackerArr.findIndex(
        (item) => item.id === action.payload.id
      );
      state.trackerArr[id].active = false;
      state.trackerArr[id].stopTime = action.payload.stopTime;

      state.trackerArr[id].workTime =
        state.trackerArr[id].stopTime -
        state.trackerArr[id].startTime +
        state.trackerArr[id].workTime;
    },
    startCounting: (state, action) => {
      const id = state.trackerArr.findIndex(
        (item) => item.id === action.payload.id
      );
      state.trackerArr[id].active = true;
      state.trackerArr[id].startTime = action.payload.startTime;
    },
  },
});

const { actions, reducer } = trackerSlice;
export default reducer;
export const {
  addNewTracker,
  getTrackers,
  deleteTracker,
  stopCounting,
  startCounting,
} = actions;
