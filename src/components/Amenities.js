import React from "react";
import styles from "./Amenities.module.css";
import { useEffect } from "react";

import iconWifi from "../img/icon-wifi.svg";
import iconBreakfast from "../img/icon-breakfast.svg";
import iconPets from "../img/icon-pets.svg";
import iconMiniBar from "../img/icon-poolside-bar.svg";
import iconChildren from "../img/icon-children.svg";
import iconCoach from "../img/icon-coach.svg";
import iconFrig from "../img/icon-frig.svg";
import iconNoSmoke from "../img/icon-no-smoke.svg";
import iconPhone from "../img/icon-phone.svg";
import iconRoomService from "../img/icon-room-service.svg";
import iconView from "../img/icon-view.svg";
import iconAirShaft from "../img/icon-air-shaft.svg";
import iconCancel from "../img/icon-cancel.svg";
import iconOk from "../img/icon-ok.svg";

export default function Amenities(props) {
  //   console.log("🈶🈶🈶", Object.keys(props.data));
  const showAllAmenities = props.all;
  const createAmenity = (amenityName, amenityIcon, amenityStatus) => {
    return {
      amenityName: amenityName,
      amenityicon: amenityIcon,
      amenityStatus: amenityStatus,
    };
  };

  let amenityList = [];

  amenityList.push(
    createAmenity("早餐", iconBreakfast, props?.data["Breakfast"] || false)
  );
  amenityList.push(
    createAmenity("Mini Bar", iconMiniBar, props?.data["迷你酒吧"] || false)
  );
  amenityList.push(
    createAmenity(
      "客房服務",
      iconRoomService,
      props?.data["Room-Service"] || false
    )
  );
  amenityList.push(
    createAmenity("Wifi", iconWifi, props?.data["Wi-Fi"] || false)
  );
  amenityList.push(
    createAmenity(
      "適合兒童",
      iconChildren,
      props?.data["Child-Friendly"] || false
    )
  );
  amenityList.push(
    createAmenity("電話", iconPhone, props?.data["Television"] || false)
  );
  amenityList.push(
    createAmenity("漂亮的視野", iconView, props?.data["Great-View"] || false)
  );
  amenityList.push(
    createAmenity("冰箱", iconFrig, props?.data["Refrigerator"] || false)
  );
  amenityList.push(
    createAmenity("沙發", iconCoach, props?.data["Sofa"] || false)
  );
  amenityList.push(
    createAmenity("寵物友善", iconPets, props?.data["Pet-Friendly"] || false)
  );
  amenityList.push(
    createAmenity("全面禁菸", iconNoSmoke, props?.data["Smoke-Free"] || false)
  );
  amenityList.push(
    createAmenity("空調", iconAirShaft, props?.data["Air-Conditioner"] || false)
  );

  const amenity = (amenityObj, showAllAmenities) => {
    let reactComponent = (
      <div
        className={
          amenityObj?.amenityStatus === true
            ? styles.amenity
            : styles.amenityDisabled
        }
        key={amenityObj?.amenityName}
      >
        <div className={styles.icon}>
          <img
            className={styles.icon__name}
            src={amenityObj?.amenityicon}
            alt=""
          />
          <img
            className={styles.icon__status}
            src={amenityObj?.amenityStatus === true ? iconOk : iconCancel}
            alt=""
          />
        </div>
        <p className={styles.amenity__name}>{amenityObj?.amenityName}</p>
      </div>
    );

    return showAllAmenities
      ? reactComponent
      : amenityObj?.amenityStatus === true
      ? reactComponent
      : null;
  };

  const elementList = amenityList.map(el => {
    return amenity(el, showAllAmenities);
  });

  return (
    <div className={styles.container}>
      {elementList.length === 12 ? elementList : <></>}
    </div>
  );
}
