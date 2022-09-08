import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const todayDate = new Date().toISOString();

const initialState = {
  startDate: todayDate,
  endDate: todayDate,
  workingDays: 0,
  holidayDays: 0,
  status: "idle",
};

export const bookingDaysSlice = createSlice({
  name: "bookingDays",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },

    setWorkingDays: (state, action) => {
      state.workingDays = action.payload;
    },
    setHolidayDays: (state, action) => {
      state.holidayDays = action.payload;
    },
    addWorkingDays: (state, action) => {
      state.workingDays += action.payload;
    },
    addHolidayDays: (state, action) => {
      state.holidayDays += action.payload;
    },

    resetBookingDays: state => {
      state.workingDays = 0;
      state.holidayDays = 0;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setWorkingDays,
  setHolidayDays,
  resetBookingDays,
  addWorkingDays,
  addHolidayDays,
} = bookingDaysSlice.actions;

export const selectBookingDays = state => {
  return {
    workingDays: state.bookingDays.workingDays,
    holidayDays: state.bookingDays.holidayDays,
  };
};
export const selectStartAndEndDate = state => {
  return {
    startDate: state.bookingDays.startDate,
    endDate: state.bookingDays.endDate,
  };
};

export const selectFormatedStartAndEndDate = state => {
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  }

  return {
    formatedStartDate: formatDate(state.bookingDays.startDate),
    formatedEndDate: formatDate(state.bookingDays.endDate),
  };
};

export const selectTotalDays = state => {
  const date = new Date(state.bookingDays.startDate);
  const dates = [];
  while (date <= new Date(state.bookingDays.endDate)) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  const totalDays = dates.length === 1 ? 1 : dates.length - 1;
  return {
    totalDays,
  };
};

export const selectWeekdays = state => {
  const date = new Date(state.bookingDays.startDate);
  let workdaysCount = 0;
  let holidaysCount = 0;

  if (state.bookingDays.startDate === state.bookingDays.endDate) {
    while (date <= new Date(state.bookingDays.endDate)) {
      new Date(date).getDay() === 0 ||
      new Date(date).getDay() === 5 ||
      new Date(date).getDay() === 6
        ? (holidaysCount += 1)
        : (workdaysCount += 1);
      date.setDate(date.getDate() + 1);
    }
  } else {
    while (date < new Date(state.bookingDays.endDate)) {
      new Date(date).getDay() === 0 ||
      new Date(date).getDay() === 5 ||
      new Date(date).getDay() === 6
        ? (holidaysCount += 1)
        : (workdaysCount += 1);
      date.setDate(date.getDate() + 1);
    }
  }

  return {
    workdaysCount,
    holidaysCount,
  };
};

export default bookingDaysSlice.reducer;
