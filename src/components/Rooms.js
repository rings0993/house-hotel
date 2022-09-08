import { useEffect, useState, useCallback } from "react";
import { API_KEY } from "../config/config";
import styles from "./Rooms.module.css";
import slugify from "react-slugify";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Rooms(props) {
  // const [roomStyle, setRoomStyle] = useState({});

  const [roomUrls, setRoomUrls] = useState();
  const [roomNames, setRoomNames] = useState();
  const [roomIds, setRoomIds] = useState();

  //   const url = "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms";
  const url = "https://alex-house-hotel-api.herokuapp.com/rooms";
  const requestOptions = {
    method: "Get",
    headers: new Headers({
      //   Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "appliroomion/json",
    }),
  };

  const getroom = useCallback(() => {
    let roomImageUrlList = [];
    let roomNameList = [];
    let roomIdList = [];
    // fetch http request
    fetch(url, requestOptions)
      .then(res => res.json()) //gives data in json
      .then(rooms => {
        console.log("rooms: ", rooms.items);
        // setBackgroundImage();
        console.log(rooms.items);
        for (let i = 0; i < rooms.items.length; i++) {
          roomImageUrlList.push(rooms.items[i].imageUrl);
          roomNameList.push(rooms.items[i].name);
          roomIdList.push(rooms.items[i].id);
        }

        setRoomUrls(roomImageUrlList);
        setRoomNames(roomNameList);
        setRoomIds(roomIdList);
        localStorage.setItem("roomNames", roomNameList);
        localStorage.setItem("roomUrls", roomImageUrlList);
        localStorage.setItem("roomIds", roomIdList);
      })
      .catch(error => {
        console.log("Error: ", error);
      });
  }, [roomUrls]);

  useEffect(() => {
    console.log("Loading your feline friends....");
    const storageRoomNames = localStorage.getItem("roomNames");
    const storageRoomUrls = localStorage.getItem("roomUrls");
    const storageRoomIds = localStorage.getItem("roomIds");
    if (!storageRoomNames || !storageRoomUrls || !storageRoomIds) {
      getroom();
    } else {
      setRoomUrls(storageRoomUrls.split(","));
      setRoomNames(storageRoomNames.split(","));
      setRoomIds(storageRoomIds.split(","));
    }
  }, []);

  const roomStyle = urls => {
    return {
      backgroundImage: `url(${urls})`,
    };
  };

  //   return <>{rooms ? <img src={roomUrls[0]} alt={""} /> : <p>Loading</p>}</>;
  return (
    <>
      {roomUrls ? (
        roomUrls.map((urls, index) => (
          <div className={styles.rooms} style={roomStyle(urls)} key={urls}>
            <Link
              className={styles.rooms__name}
              to={`/room/${slugify(roomIds[index])}`}
            >
              {roomNames[index]}
            </Link>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
