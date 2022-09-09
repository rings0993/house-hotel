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
                姓名
              </label>
              <br />
              <input type="text" className={styles.inputText} />
            </span>
            <span>
              <label htmlFor="" className={styles.inputLabel}>
                手機號碼
              </label>
              <br />
              <input type="text" className={styles.inputText} />
            </span>
            <span>
              <label htmlFor="" className={styles.inputLabel}>
                入住日期
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
                退房日期
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
            {totalDays.totalDays + 1}天
            {weekdays.workdaysCount >= 1
              ? `，${weekdays.workdaysCount}晚平日`
              : ""}
            {weekdays.holidaysCount >= 1
              ? `，${weekdays.holidaysCount}晚假日`
              : ""}
          </p>
          <div className={styles.dash}></div>
          <p className={styles.totalTitle}>總計</p>
          <p className={styles.totalPrice}>${price}</p>
          <button className={styles.btnSubmit}> 確認送出</button>
          <p className={styles.footNote}>
            此預約系統僅預約功能，並不會對您進行收費
          </p>
        </div>
        <div className={styles.roomInfo}>
          <div className={styles.infoTitle}>
            <p className={styles.infoTitle__Text}>{roomData.name}</p>
            <div className={styles.dash__green}></div>
          </div>
          <div className={styles.summaryInfo}>
            <p>
              {roomData.descriptionShort.GuestMax}人・ 單人床・附早餐・ 衛浴
              {roomData.descriptionShort["Private-Bath"]}間・
              {roomData.descriptionShort.Footage}平方公尺{" "}
            </p>
            <p>
              平日（一～四）價格：{roomData.normalDayPrice} /
              假日（五〜日）價格：
              {roomData.holidayPrice}
            </p>
          </div>

          <Amenities data={roomData.amenities} all={false}></Amenities>
          <div className={styles.infoTitle}>
            <p className={styles.infoTitle__Text}>訂房資訊</p>

            <div className={styles.dash__green}></div>
          </div>
          <ul>
            <li>
              入住時間：最早{roomData.checkInAndOut.checkInEarly}，最晚
              {roomData.checkInAndOut.checkInLate}
              ；退房時間：{roomData.checkInAndOut.checkOut}
              ，請自行確認行程安排。
            </li>
            <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
            <li>好室旅店全面禁止吸菸。</li>
            <li>
              若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 -
              18:00 )。
            </li>
          </ul>

          <div className={styles.infoTitle}>
            <p className={styles.infoTitle__Text}>預約流程</p>

            <div className={styles.dash__green}></div>
          </div>
          <div className={styles.reservationProcess}>
            <div className={styles.processStep}>
              <div className={styles.processStep__img}>
                <img src={processStep1} alt="" />
              </div>
              <p className={styles.processStep__text}>送出線上預約單</p>
            </div>
            <img src={rightArrow} alt="" className={styles.rightArrow} />
            <div className={styles.processStep}>
              <div className={styles.processStep__img}>
                <img src={processStep2} alt="" />
              </div>
              <p className={styles.processStep__text}>
                系統立即回覆是否預訂成功 並以簡訊發送訂房通知
                (若未收到簡訊請來電確認)
              </p>
            </div>
            <img src={rightArrow} alt="" className={styles.rightArrow} />
            <div className={styles.processStep}>
              <div className={styles.processStep__img}>
                <img src={processStep3} alt="" />
              </div>
              <p className={styles.processStep__text}>
                入住當日憑訂房通知 以現金或刷卡付款即可 (僅接受VISA, JCB,
                銀聯卡)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
