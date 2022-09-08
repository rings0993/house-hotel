import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./AutoplayBG.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import bg2 from "../img/bg2.png";
import bg3 from "../img/bg3.png";
import bg4 from "../img/bg4.png";
import bg6 from "../img/bg6.png";

export default function AutoplayBG() {
  const backgroundStyle = gbImg => ({
    display: `block`,
    width: `100%`,
    height: `100%`,
    backgroundSize: `cover`,
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${gbImg})`,
  });

  return (
    <>
      <Swiper
        spaceBetween={0}
        allowTouchMove={false}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".indexBgSwiperPagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class=${className}></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div style={backgroundStyle(bg2)}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={backgroundStyle(bg3)}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={backgroundStyle(bg4)}></div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={backgroundStyle(bg6)}></div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export function AutoplayPagination() {
  return <div className="indexBgSwiperPagination"></div>;
}
