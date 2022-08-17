import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import React, {useEffect, useState} from "react";
import styles from "../../styles/pages/worker/nearby/nearby.module.css";
import { useRouter } from "next/router";

import { FaComment } from "react-icons/fa";
import axios from "axios";

export default function WorkerNearBy() {
  const router = useRouter();
  const [store, setStore] = useState([])
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=eae4fdb3238bf6475dfe051af85741d5&autoload=false";
    const link = document.createElement("link");
    link.href = "/kakao_map.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        var el = document.getElementById("KakaoMap");
        var options = {
          center: new kakao.maps.LatLng(36.6072, 127.508),
          level: 5,
        };
        var map = new kakao.maps.Map(el, options);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
            // api
            var positions = []
            axios({
              method: 'get',
              url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/store/getNearBy",
              withCredentials: true,
              params: {
                lat: lat,
                lon: lon
              },
            })
                .then(r=>{
                  console.log(r.data)
                  let _data = [];
                  for (let i=0;i<r.data.length;i++){
                    positions.push({
                      title: r.data[i].name,
                      latlng: new kakao.maps.LatLng(r.data[i].lat, r.data[i].lon)
                    })
                    _data.push(r.data[i])
                  }
                  setStore(_data)
                  for (var i = 0; i < positions.length; i ++) {
                    var imageSize = new kakao.maps.Size(30, 30);
                    var imageSrc = 'https://cdn.discordapp.com/attachments/952627326762512467/1009408359994245200/map_marker_blue.png'
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                    var marker = new kakao.maps.Marker({
                      map: map,
                      position: positions[i].latlng,
                      title : positions[i].title,
                      image : markerImage,
                      zIndex: 1,
                    })
                    var message =
                        '<div style="margin-bottom: 20px" id="kakaomap_store" class="box blue">' +
                        `<div class="text">${r.data[i].name}</div>` +
                        "</div>";
                    var iwContent = message,
                        iwRemoveable = false;
                    var overlay = new kakao.maps.CustomOverlay({
                      content: iwContent,
                      map: map,
                      position: marker.getPosition(),
                    });
                    var _store = document.getElementById("kakaomap_store");
                    var _width = _store.clientWidth;
                    _store.style.left = `-${_width / 2}px`;
                  }
                })

            var locPosition = new kakao.maps.LatLng(lat, lon),
              message =
                '<div id="kakaomap_me" class="box green">' +
                '<div class="text">나</div>' +
                "</div>";
            displayMarker(locPosition, message);
            var me = document.getElementById("kakaomap_me");
            var width = me.clientWidth;
            me.style.left = `-${width / 2}px`;

            var circle = new kakao.maps.Circle({
              center: new kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
              radius: 1000, // 미터 단위의 원의 반지름입니다
              strokeWeight: 2, // 선의 두께입니다
              strokeColor: "rgba(33,128,0,0.7)", // 선의 색깔입니다
              strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle: "solid", // 선의 스타일 입니다
              fillColor: "rgb(204,255,179)", // 채우기 색깔입니다
              fillOpacity: 0.35, // 채우기 불투명도 입니다
            });
            circle.setMap(map);
          });
        } else {
          var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
            message = "위치를 찾을 수 없습니다. 위치를 허용해주세요.";
          displayMarker(locPosition, message);
        }
        function displayMarker(locPosition, message) {
          var marker_url =
            "https://cdn.discordapp.com/attachments/952627326762512467/1002637037729497149/map_marker.png";
          var markerImage = new kakao.maps.MarkerImage(
            marker_url,
            new kakao.maps.Size(30, 30),
            { offset: new kakao.maps.Point(15, 15) }
          );
          var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: markerImage,
            zIndex: 0,
          });
          var iwContent = message,
            iwRemoveable = false;
          var overlay = new kakao.maps.CustomOverlay({
            content: iwContent,
            map: map,
            position: marker.getPosition(),
          });
          map.setCenter(locPosition);
        }
      });
    };

    if (!router.isReady) return;
  }, [router.isReady]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          `현재 좌표: [위도] ${position.coords.latitude} | [경도] ${position.coords.longitude}`
        );
        return {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
      });
    }
  };

  return (
    <>
      <Header />
      <FaComment
        onClick={() => {
          router.push("/worker/chat");
        }}
        className="absolute w-6 h-6 top-4 right-8"
      />
      <div className={styles.map_container}>
        <div className={styles.map_box}>
          <div id="KakaoMap" className={styles.map} />
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.list_title}>
          <div className={styles.list_title_text}>내 주변 🧭</div>
        </div>
        <div className={styles.list_title_guard} />
        <div className={styles.list_store_group}>
          <div className={styles.list_store_container}>
            {console.log(store)}
            {store.map(data=>{
              return (
                  <div key={data.store_uuid} className={styles.list_store_box}>
                    <div className={styles.list_store_image}></div>
                    <div className={styles.list_store_info_box}>
                      <div className={styles.list_store_name}>{data.name}</div>
                      <div className={styles.list_store_address}>
                        {data.address}
                      </div>
                      <div className={styles.list_store_sectors}>{data.type}</div>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
      </div>

      <BottomNavigation isWorker={true} />
    </>
  );
}
