import { Routes, Route, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../helper/helperFuncitons";
import { useSelector, useDispatch } from "react-redux";
import {
  setWorkingDays,
  setHolidayDays,
  selectBookingDays,
  selectTotalDays,
  selectWeekdays,
} from "../features/bookingDays/bookingDaysSlice";

import {
  setBookingModalShow,
  setBookingModalHide,
  selectBookingModalState,
} from "../features/modalState/modalStateSlice";

import { useEffect, useState, useCallback } from "react";
import { API_KEY } from "../config/config";
import styles from "./Room.module.css";
import RoomAutoplayBg, {
  RoomAutoplayPagination,
} from "../components/RoomAutoplayBG";
import Amenities from "../components/Amenities";
import CalenderPicker from "../components/CalenderPicker";
import BookingModal from "../components/BookingModal";
import LeftArrow from "../img/left_arrow.svg";

const bg2 = "../img/bg2.png";
const bg3 = "../img/bg3.png";
const bg4 = "../img/bg4.png";

export default function Room(props) {
  const bookingModal = useSelector(selectBookingModalState);
  const bookingDays = useSelector(selectBookingDays);
  const totalDays = useSelector(selectTotalDays);
  const weekdays = useSelector(selectWeekdays);
  const dispatch = useDispatch();

  new Date().getDay() === 0 || new Date().getDay() === 7
    ? dispatch(setHolidayDays(1))
    : dispatch(setWorkingDays(1));

  let params = useParams();
  const roomId = params.roomId;
  const url = `https://alex-house-hotel-api.herokuapp.com/room/${roomId}`;

  const requestOptions = {
    method: "Get",
    headers: new Headers({
      //   Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "appliroomion/json",
    }),
  };

  const [roomData, setRoomData] = useState({});
  const [roomBooking, setRoomBooking] = useState({});
  const [modalState, setModalState] = useState(false);

  let imgList = [];
  let roomName = "";

  const getroominfo = useCallback(() => {
    let roomImageUrlList = [];
    let roomNameList = [];
    let roomIdList = [];
    // fetch http request
    fetch(url, requestOptions)
      .then(res => res.json()) //gives data in json
      .then(data => {
        console.log("data laoded:", data);
        setRoomData(data.room[0]);
        setRoomBooking(data.booking);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, [roomBooking, roomData]);

  useEffect(() => {
    getroominfo();
  }, []);

  let normalDayPrice = undefined;
  let holidayPrice = undefined;
  let description = undefined;
  let descriptionList = [];
  let checkInEarly = undefined;
  let checkInLate = undefined;
  let checkOut = undefined;
  let price = undefined;
  let days = undefined;
  let amenitiesData = {};
  let bookingData = {};

  let guestMax = undefined;
  let bed = undefined;
  let footage = undefined;
  let bath = undefined;

  if (Object.keys(roomData).length > 0) {
    imgList = roomData.imageUrl;
    roomName = roomData.name;
    normalDayPrice = roomData.normalDayPrice;
    holidayPrice = roomData.holidayPrice;
    description = roomData.description;
    descriptionList = description.split(". ");
    checkInEarly = roomData.checkInAndOut.checkInEarly;
    checkInLate = roomData.checkInAndOut.checkInLate;
    checkOut = roomData.checkInAndOut.checkOut;

    guestMax = roomData.descriptionShort.GuestMax;
    bed = roomData.descriptionShort.Bed;
    footage = roomData.descriptionShort.Footage;
    bath = roomData.descriptionShort["Private-Bath"];

    price = `${numberWithCommas(
      weekdays.workdaysCount * normalDayPrice +
        weekdays.holidaysCount * holidayPrice
    )}`;
    days = ` / ${totalDays.totalDays}晚`;
    amenitiesData = roomData.amenities;

    localStorage.setItem("roomData", JSON.stringify(roomData));
    localStorage.setItem("bookingData", JSON.stringify(roomBooking));
  }

  return (
    <div className={styles.container}>
      <div className={styles.roomImage}>
        <RoomAutoplayBg imgUrl={imgList}></RoomAutoplayBg>

        <div>
          <Link to={`/`} className={styles.btn__mainPage}>
            <img
              className={styles.btn__mainPage__arrow}
              src={LeftArrow}
              alt=""
            />
            <span className={styles.btn__mainPage__text}>查看其他房型</span>
          </Link>
        </div>
        <p className={styles.totalPrice}>
          <p className={styles.price}>{price}</p>
          <p className={styles.totalDays}>{days}</p>
        </p>

        <div
          className={styles.btn__booking}
          onClick={() => {
            dispatch(setBookingModalShow());
          }}
        >
          Booking Now
        </div>

        <RoomAutoplayPagination
          className={styles.pagination}
        ></RoomAutoplayPagination>
      </div>
      <div className={styles.roomInfo}>
        <div className={styles.roomInfo__title}>
          <div className={styles.roomInfo__roomName}>{roomName}</div>
          <div className={styles.roomInfo__brifInfo}>
            {guestMax}人・附早餐・{bed?.join("+")}・衛浴{bath}間・{footage}
            平方公尺
          </div>
        </div>

        <div className={styles.roomInfo__info}>
          <ul>
            <li>
              平日（一～四）價格：{normalDayPrice} / 假日（五〜日）價格：
              {holidayPrice}
            </li>
            <li>
              入住時間：{checkInEarly}（最早）/ {checkInLate}（最晚）
            </li>
            <li>退房時間：{checkOut}</li>
          </ul>
        </div>
        <div className={styles.roomInfo__EnglishNotice}>
          <ul>
            {descriptionList.map((element, index) => {
              return <li key={index}>{element}</li>;
            })}
          </ul>
        </div>
        <div className={styles.roomInfo__amenities}>
          <Amenities data={amenitiesData} all={true}></Amenities>
        </div>
        <div className={styles.datepicker__title}>空房狀態查詢</div>
        <div className={styles.datepicker__selector}>
          <CalenderPicker
            bookingData={roomBooking}
            numOfMonth={2}
          ></CalenderPicker>
        </div>
      </div>
      <BookingModal show={bookingModal}></BookingModal>
    </div>
  );
}
