import React, { useRef, useEffect } from "react";

import {
  selectBookingModalState,
  selectCalenderModalState,
  calenderModalHide,
  calenderModalShow,
} from "../features/modalState/modalStateSlice";

import { useSelector, useDispatch } from "react-redux";
/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref) {
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(calenderModalHide("start"));
        dispatch(calenderModalHide("end"));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
