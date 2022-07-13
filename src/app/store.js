import { configureStore } from "@reduxjs/toolkit";
import tracker from "./TrackerSlice";

export const store = configureStore({
  reducer: {
    tracker,
  },
  devTools: process.env.NODE_ENV !== "production",
});
