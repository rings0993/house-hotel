import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import bookingDaysReducer from "../features/bookingDays/bookingDaysSlice";
import modalStateReducer from "../features/modalState/modalStateSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    bookingDays: bookingDaysReducer,
    modalState: modalStateReducer,
  },
});
