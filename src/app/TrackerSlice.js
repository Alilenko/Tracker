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
      state.trackerArr[
        state.trackerArr.findIndex((item) => item.id === action.payload.id)
      ].active = false;
      state.trackerArr[
        state.trackerArr.findIndex((item) => item.id === action.payload.id)
      ].stopTime = action.payload.stopTime;

      state.trackerArr[
        state.trackerArr.findIndex((item) => item.id === action.payload.id)
      ].workTime =
        state.trackerArr[
          state.trackerArr.findIndex((item) => item.id === action.payload.id)
        ].stopTime -
        state.trackerArr[
          state.trackerArr.findIndex((item) => item.id === action.payload.id)
        ].startTime +
        state.trackerArr[
          state.trackerArr.findIndex((item) => item.id === action.payload.id)
        ].workTime;
    },
    startCounting: (state, action) => {
      state.trackerArr[
        state.trackerArr.findIndex((item) => item.id === action.payload.id)
      ].active = true;
      state.trackerArr[
        state.trackerArr.findIndex((item) => item.id === action.payload.id)
      ].startTime = action.payload.startTime;
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
