import { configureStore } from "@reduxjs/toolkit";
import bookingDaysReducer from "../features/bookingDays/bookingDaysSlice";
import modalStateReducer from "../features/modalState/modalStateSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    bookingDays: bookingDaysReducer,
    modalState: modalStateReducer,
  },
});
