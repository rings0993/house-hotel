import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./RoomAutoplayBG.css";
import styles from "./RoomAutoplayBG.module.css";
import Modal from "../Modal/Modal";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function RoomAutoplayBg(props) {
  const imgUrlList = props.imgUrl;
  const [swiper, setSwiper] = React.useState(null);
  const [swiper3, setSwiper3] = React.useState(null);
  const [modalState, setModalState] = useState(false);
  const syncSlideTo = page => {
    swiper.slideTo(page);
  };
  return (
    <>
      <Swiper
        spaceBetween={0}
        onSwiper={s => {
          setSwiper(s);
        }}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".roomBgSwiperPagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class=${className}></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        className={styles.mySwiper2}
      >
        {imgUrlList.map(imgUrl => {
          return (
            <SwiperSlide
              className={styles.mySwiperSlide}
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 25%, rgba(255,255,255,0) 100%),url(${imgUrl})`,
              }}
              key={imgUrl}
              onClick={() => {
                setModalState(true);
              }}
            ></SwiperSlide>
          );
        })}
      </Swiper>
      {modalState ? (
        <>
          <Swiper
            loopFillGroupWithBlank={false}
            spaceBetween={0}
            onSwiper={s => {
              console.log("initialize 3", s);
              setSwiper3(s);
            }}
            centeredSlides={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className={styles.mySwiper3}
          >
            {imgUrlList.map(imgUrl => {
              return (
                <SwiperSlide
                  className={styles.mySwiperSlide3}
                  style={{
                    backgroundImage: `url(${imgUrl})`,
                  }}
                  key={imgUrl}
                ></SwiperSlide>
              );
            })}
          </Swiper>
          <div
            className={styles.btn__closeModal}
            onClick={() => {
              syncSlideTo(swiper3.activeIndex);
              setModalState(false);
            }}
          ></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export function RoomAutoplayPagination(props) {
  return (
    <div className="roomBgSwiperPagination" id="roomBgSwiperPagination"></div>
  );
}
