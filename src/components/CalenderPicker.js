import { DateRange, Calendar } from "react-date-range";

import { useSelector, useDispatch } from "react-redux";
import {
  setStartDate,
  setEndDate,
  setWorkingDays,
  setHolidayDays,
  resetBookingDays,
  addWorkingDays,
  addHolidayDays,
  selectBookingDays,
  selectStartAndEndDate,
  selectTotalDays,
  selectWeekdays,
} from "../features/bookingDays/bookingDaysSlice";

import { calenderModalHide } from "../features/modalState/modalStateSlice";
import { useState, useEffect } from "react";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";

import "./CalenderPicker.css";
import styles from "./CalenderPicker.module.css";

export default function CalenderPicker(props) {
  const bookingDays = useSelector(selectStartAndEndDate);
  const totalDays = useSelector(selectTotalDays);
  const weekdays = useSelector(selectWeekdays);
  const { startDate, endDate } = useSelector(selectStartAndEndDate);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const disabledDatesList = [];
  let disabledList = [];
  if (Array.isArray(props.bookingData)) {
    props.bookingData.map(el => {
      disabledDatesList.push(...el.date);
    });
    disabledList = disabledDatesList.map(el => new Date(el));
  }

  const onChangeHandlers = event => {
    dispatch(setStartDate(event.range1.startDate.toDateString()));
    dispatch(setEndDate(event.range1.endDate.toDateString()));
  };
  const minDate = new Date(new Date());
  minDate.setDate(minDate.getDate() - 1);

  return (
    <>
      <DateRange
        editableDateInputs={true}
        minDate={minDate}
        onChange={onChangeHandlers}
        moveRangeOnFirstSelection={false}
        showDateDisplay={false}
        // ranges={selected}
        ranges={[
          {
            startDate: new Date(startDate),
            endDate: new Date(endDate),
          },
        ]}
        months={props.numOfMonth}
        direction="horizontal"
        className={styles.calender}
        rangeColors={["#38470B"]}
        disabledDates={disabledList}
      />
    </>
  );
}

export function SingleDayCalenderPicker(props) {
  const bookingDays = useSelector(selectStartAndEndDate);
  const totalDays = useSelector(selectTotalDays);
  const weekdays = useSelector(selectWeekdays);
  const { startDate, endDate } = useSelector(selectStartAndEndDate);
  const dispatch = useDispatch();
  const minDate = new Date(new Date());

  const disabledDatesList = [];
  let disabledList = [];
  if (Array.isArray(props.bookingData)) {
    props.bookingData.map(el => {
      disabledDatesList.push(...el.date);
    });
    disabledList = disabledDatesList.map(el => new Date(el));
  }

  const onChangeHandlers = event => {
    console.log(event);
    // ;
    props.dateType === "start"
      ? dispatch(setStartDate(event.toDateString()))
      : dispatch(setEndDate(event.toDateString()));

    dispatch(calenderModalHide("start"));
    dispatch(calenderModalHide("end"));
  };

  minDate.setDate(minDate.getDate() - 1);

  console.log("🎁🎁🎁", startDate, endDate);

  return (
    <>
      <Calendar
        minDate={minDate}
        onChange={onChangeHandlers}
        showDateDisplay={false}
        showMonthAndYearPickers={false}
        ranges={
          props.dataType === "start"
            ? [startDate, startDate]
            : [endDate, endDate]
        }
        className={styles.calender}
        rangeColors={["#38470B"]}
        disabledDates={disabledList}
      />
    </>
  );
}
