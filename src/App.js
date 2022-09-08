import React from "react";
import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import style from "./App.module.css";

import Rooms from "./components/Rooms";
import AutoplayBG, { AutoplayPagination } from "./components/AutoplayBG";

function App() {
  const backgroundStyle = gbImg => ({
    display: `block`,
    width: `100%`,
    height: `100%`,
    backgroundSize: `cover`,
    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${gbImg})`,
  });

  return (
    <div>
      <AutoplayBG></AutoplayBG>
      <div className={style.homePage}>
        <div className={style.container}>
          <div className={style.logo}></div>
          <Rooms></Rooms>
          <div className={style.textInfo}>
            <p className={style.textInfo__title}>好室旅店。HOUSE HOTEL</p>
            <p className={style.textInfo__info}>花蓮縣花蓮市國聯一路1號</p>
            <p className={style.textInfo__info}>03-8321155</p>
            <p className={style.textInfo__info}>HOUSE@HOTEL.COM</p>
            <AutoplayPagination></AutoplayPagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
