import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingModal: false,
  roomImgModal: false,
  calenderModal: { startDate: false, endDate: false },
};

export const modalStateSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    setBookingModalShow: state => {
      state.bookingModal = true;
    },
    setBookingModalHide: state => {
      state.bookingModal = false;
    },
    roomImgModalShow: state => {
      state.roomImgModal = true;
    },
    roomImgModalHide: state => {
      state.roomImgModal = false;
    },

    calenderModalShow: (state, action) => {
      if (action.payload === "start") {
        state.calenderModal.startDate = true;
      }
      if (action.payload === "end") {
        state.calenderModal.endDate = true;
      }
    },
    calenderModalHide: (state, action) => {
      if (action.payload === "start") {
        state.calenderModal.startDate = false;
      }
      if (action.payload === "end") {
        state.calenderModal.endDate = false;
      }
    },
  },
});

export const {
  setBookingModalShow,
  setBookingModalHide,
  roomImgModalShow,
  roomImgModalHide,
  calenderModalShow,
  calenderModalHide,
} = modalStateSlice.actions;

export const selectBookingModalState = state => {
  return state.modalState.bookingModal;
};

export const selectRoomImgModalState = state => {
  return state.modalState.roomImgModal;
};

export const selectCalenderModalState = state => {
  return {
    startDateModal: state.modalState.calenderModal.startDate,
    endDateModal: state.modalState.calenderModal.endDate,
  };
};

export default modalStateSlice.reducer;
