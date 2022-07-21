import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import React, { useEffect } from "react";
import styles from '../../styles/pages/worker/nearby/nearby.module.css';

export default function WorkerNearBy() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=eae4fdb3238bf6475dfe051af85741d5&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        var el = document.getElementById("KakaoMap");
        var options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        var map = new kakao.maps.Map(el, options);
      });
    };
  }, []);

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
