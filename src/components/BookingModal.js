import styles from "./BookingModal.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setBookingModalHide } from "../features/modalState/modalStateSlice";
import Amenities from "../components/Amenities";
import CalenderPicker, {
  SingleDayCalenderPicker,
} from "../components/CalenderPicker";
import { useRef, useState } from "react";
import { useOutsideAlerter } from "../hooks/useOutsideAlerter";

import { numberWithCommas } from "../helper/helperFuncitons";
import {
  setStartDate,
  setEndDate,
  selectTotalDays,
  selectWeekdays,
  selectFormatedStartAndEndDate,
} from "../features/bookingDays/bookingDaysSlice";

import {
  selectBookingModalState,
  selectCalenderModalState,
  calenderModalHide,
  calenderModalShow,
} from "../features/modalState/modalStateSlice";

import processStep1 from "../img/process-step1.svg";
import processStep2 from "../img/process-step2.svg";
import processStep3 from "../img/process-step3.svg";
import rightArrow from "../img/right-arrow.svg";

export default function BookingModal(props) {
  const totalDays = useSelector(selectTotalDays);
  const weekdays = useSelector(selectWeekdays);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const startDateRef = useRef();
  const { formatedStartDate, formatedEndDate } = useSelector(
    selectFormatedStartAndEndDate
  );

  const modalState = useSelector(selectBookingModalState);
  const { startDateModal, endDateModal } = useSelector(
    selectCalenderModalState
  );
  const dispatch = useDispatch();

  const roomData = JSON.parse(localStorage.getItem("roomData"));
  const roomBooking = JSON.parse(localStorage.getItem("bookingData"));

  const normalDayPrice = roomData?.normalDayPrice || 0;
  const holidayPrice = roomData?.holidayPrice || 0;
  const price = `${numberWithCommas(
    weekdays.workdaysCount * normalDayPrice +
      weekdays.holidaysCount * holidayPrice
  )}`;

  const defaultStartDate = "2022-09-08";
  // console.log("Console", formatedStartDate);
  console.log(
    "current Selected Date state",
    formatedStartDate,
    formatedEndDate
  );
  console.log("current Modal state", startDateModal, endDateModal);
  return (
    <div
      className={styles.backdrop}
      style={props.show ? { display: `flex` } : { display: `none` }}
    >
      <div className={styles.modal}>
        <div
          className={styles.btn__closeModal}
          onClick={() => {
            dispatch(setBookingModalHide());
          }}
        ></div>

        <div className={styles.bookingForm}>
          <form action="" className={styles.formBody}>
            <span>
              <label htmlFor="" className={styles.inputLabel}>
                ??????
              </label>
              <br />
              <input type="text" className={styles.inputText} />
            </span>
            <span>
              <label htmlFor="" className={styles.inputLabel}>
                ????????????
              </label>
              <br />
              <input type="text" className={styles.inputText} />
            </span>
            <span>
              <label htmlFor="" className={styles.inputLabel}>
                ????????????
              </label>
              <br />
              <input
                type="date"
                className={styles.inputDate}
                defaultValue={formatedStartDate}
                key={formatedStartDate}
                onChange={e => {
                  e.preventDefault();
                  dispatch(setStartDate(e.target.value));
                }}
                onClick={e => {
                  e.preventDefault();
                  dispatch(calenderModalShow("start"));
                }}
              />
              {startDateModal ? (
                <div ref={wrapperRef} className={styles.calenderHolder}>
                  {
                    <div>
                      <SingleDayCalenderPicker
                        bookingData={roomBooking}
                        dateType={"start"}
                      ></SingleDayCalenderPicker>
                    </div>
                  }
                </div>
              ) : null}
            </span>
            <span>
              <label htmlFor="" className={styles.inputLabel}>
                ????????????
              </label>
              <br />
              <input
                type="date"
                className={styles.inputDate}
                defaultValue={formatedEndDate}
                key={formatedEndDate}
                onChange={e => {
                  e.preventDefault();
                  dispatch(setEndDate(e.target.value));
                }}
                onClick={e => {
                  e.preventDefault();
                  dispatch(calenderModalShow("end"));
                }}
              />
              {endDateModal ? (
                <div ref={wrapperRef} className={styles.calenderHolder}>
                  {
                    <div>
                      <SingleDayCalenderPicker
                        bookingData={roomBooking}
                        dateType={"end"}
                      ></SingleDayCalenderPicker>
                    </div>
                  }
                </div>
              ) : null}
            </span>
          </form>
          <p className={styles.summaryDays}>
            {" "}
            {totalDays.totalDays + 1}???
            {weekdays.workdaysCount >= 1
              ? `???${weekdays.workdaysCount}?????????`
              : ""}
            {weekdays.holidaysCount >= 1
              ? `???${weekdays.holidaysCount}?????????`
              : ""}
          </p>
          <div className={styles.dash}></div>
          <p className={styles.totalTitle}>??????</p>
          <p className={styles.totalPrice}>${price}</p>
          <button className={styles.btnSubmit}> ????????????</button>
          <p className={styles.footNote}>
            ????????????????????????????????????????????????????????????
          </p>
        </div>
        <div className={styles.roomInfo}>
          <div className={styles.infoTitle}>
            <p className={styles.infoTitle__Text}>{roomData.name}</p>
            <div className={styles.dash__green}></div>
          </div>
          <div className={styles.summaryInfo}>
            <p>
              {roomData.descriptionShort.GuestMax}?????? ???????????????????????? ??????
              {roomData.descriptionShort["Private-Bath"]}??????
              {roomData.descriptionShort.Footage}????????????{" "}
            </p>
            <p>
              ??????????????????????????????{roomData.normalDayPrice} /
              ??????????????????????????????
              {roomData.holidayPrice}
            </p>
          </div>

          <Amenities data={roomData.amenities} all={false}></Amenities>
          <div className={styles.infoTitle}>
            <p className={styles.infoTitle__Text}>????????????</p>

            <div className={styles.dash__green}></div>
          </div>
          <ul>
            <li>
              ?????????????????????{roomData.checkInAndOut.checkInEarly}?????????
              {roomData.checkInAndOut.checkInLate}
              ??????????????????{roomData.checkInAndOut.checkOut}
              ?????????????????????????????????
            </li>
            <li>???????????????????????????????????????????????????????????????????????????</li>
            <li>?????????????????????????????????</li>
            <li>
              ???????????????????????????????????? 03-8321155 ( ???????????? ??????????????? 10:00 -
              18:00 )???
            </li>
          </ul>

          <div className={styles.infoTitle}>
            <p className={styles.infoTitle__Text}>????????????</p>

            <div className={styles.dash__green}></div>
          </div>
          <div className={styles.reservationProcess}>
            <div className={styles.processStep}>
              <div className={styles.processStep__img}>
                <img src={processStep1} alt="" />
              </div>
              <p className={styles.processStep__text}>?????????????????????</p>
            </div>
            <img src={rightArrow} alt="" className={styles.rightArrow} />
            <div className={styles.processStep}>
              <div className={styles.processStep__img}>
                <img src={processStep2} alt="" />
              </div>
              <p className={styles.processStep__text}>
                ???????????????????????????????????? ??????????????????????????????
                (?????????????????????????????????)
              </p>
            </div>
            <img src={rightArrow} alt="" className={styles.rightArrow} />
            <div className={styles.processStep}>
              <div className={styles.processStep__img}>
                <img src={processStep3} alt="" />
              </div>
              <p className={styles.processStep__text}>
                ??????????????????????????? ?????????????????????????????? (?????????VISA, JCB,
                ?????????)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
