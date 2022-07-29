import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import React, { useEffect } from "react";
import styles from '../../styles/pages/worker/nearby/nearby.module.css';
import {useRouter} from "next/router";

export default function WorkerNearBy() {
  const router = useRouter()
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=eae4fdb3238bf6475dfe051af85741d5&autoload=false";
    const link = document.createElement("link");
    link.href = "/kakao_map.css"
    link.rel = "stylesheet"
    link.type = "text/css"
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
          navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            var locPosition = new kakao.maps.LatLng(lat, lon),
                message = '<div id="kakaomap_me" class="box">' +
                    '<div class="text">나</div>' +
                    '</div>'
            displayMarker(locPosition, message);
            var me = document.getElementById("kakaomap_me")
            var width = me.clientWidth;
            me.style.left = `-${width/2}px`;
          });
        } else {
          var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
              message = '위치를 찾을 수 없습니다. 위치를 허용해주세요.'
          displayMarker(locPosition, message);
        }
        function displayMarker(locPosition, message) {
          var marker_url = 'https://cdn.discordapp.com/attachments/952627326762512467/1002637037729497149/map_marker.png'
          var markerImage = new kakao.maps.MarkerImage(marker_url, new kakao.maps.Size(30,30), {offset: new kakao.maps.Point(15, 15)})
          var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
            image: markerImage
          });
          var iwContent = message,
              iwRemoveable = false;
          var overlay = new kakao.maps.CustomOverlay({
            content: iwContent,
            map: map,
            position: marker.getPosition()
          });
          map.setCenter(locPosition);
        }
      });

    };

    if(!router.isReady) return;

  }, []);

  const getLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position => {
        console.log(`현재 좌표: [위도] ${position.coords.latitude} | [경도] ${position.coords.longitude}`)
        return {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
      }))
    }
  }

  return (
    <>
      <Header />
      <div className={styles.map_container}>
        <div className={styles.map_box}>
          <div id="KakaoMap" className={styles.map} />
        </div>
      </div>
      <BottomNavigation isWorker={true} />
    </>
  );
}
