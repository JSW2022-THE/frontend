import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/worker/nearby/nearby.module.css";
import { useRouter } from "next/router";

import { FaComment, FaHeart } from "react-icons/fa";
import axios from "axios";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function WorkerNearBy() {
  const router = useRouter();
  const [store, setStore] = useState([]);
  const [selectedStore, setSelectedStore] = useState();
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
            var positions = [];
            axios({
              method: "get",
              url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/store/getNearBy",
              withCredentials: true,
              params: {
                lat: lat,
                lon: lon,
              },
            }).then((r) => {
              //console.log(r.data);
              let _data = [];
              for (let i = 0; i < r.data.length; i++) {
                positions.push({
                  title: r.data[i].name,
                  latlng: new kakao.maps.LatLng(r.data[i].lat, r.data[i].lon),
                });
                _data.push(r.data[i]);
              }
              setStore(_data);
              for (var i = 0; i < positions.length; i++) {
                var imageSize = new kakao.maps.Size(30, 30);
                var imageSrc =
                  "https://cdn.discordapp.com/attachments/952627326762512467/1009408359994245200/map_marker_blue.png";
                var markerImage = new kakao.maps.MarkerImage(
                  imageSrc,
                  imageSize
                );
                var marker = new kakao.maps.Marker({
                  map: map,
                  position: positions[i].latlng,
                  title: positions[i].title,
                  image: markerImage,
                  zIndex: 1,
                });
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
            });

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

  const createChatRoom = (_target_uuid) => {
    return axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/chat/createChatRoom",
      data: { target_uuid: _target_uuid },
      withCredentials: true,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
            {store.map((_data) => {
              return (
                <StoreItem
                  data={_data}
                  setSelectedStore={setSelectedStore}
                  key={_data.store_uuid}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* -------------Bottom Sheet------------- */}
      <BottomSheet
        open={selectedStore ? true : false}
        onDismiss={() => {
          setSelectedStore(null);
        }}
        header={
          <header className="font-bold">
            {selectedStore ? selectedStore.name : null}
          </header>
        }
        footer={
          <footer className="flex justify-between">
            <button
              onClick={() => {
                setSelectedStore(null);
                createChatRoom(selectedStore.owner_uuid).then((_data) => {
                  router.push("/chat/" + _data);
                });
              }}
              className="w-full h-12 mx-2 text-green-700 bg-green-300 rounded-3xl"
            >
              채팅하기
            </button>
            <button
              onClick={() => {}}
              className="w-full h-12 mx-2 bg-slate-200 rounded-3xl"
            >
              이력서 제출
            </button>
          </footer>
        }
      >
        <div className="px-4 pb-8">
          <header className="mt-6 text-xl font-bold ">
            {selectedStore ? selectedStore.name : null}
          </header>
          <div className="flex items-center">
            <FaHeart className="w-[12px] h-[12px] text-rose-600" />
            <p className="ml-1 text-sm text-rose-600">
              {selectedStore ? selectedStore.heart : null}
            </p>
          </div>
          <div className="mt-1">
            <div className="flex text-[15px] items-center ">
              <p className="mr-2 text-gray-400">주소</p>
              <p>{selectedStore ? selectedStore.address : null}</p>
            </div>
            <div className="flex text-[15px] items-center">
              <p className="mr-2 text-gray-400">전화번호</p>
              <p>{selectedStore ? selectedStore.phone_number : null}</p>
            </div>
            <div className="flex text-[15px] items-center">
              <p className="mr-2 text-gray-400">소개</p>
              <p>{selectedStore ? selectedStore.description : null}</p>
            </div>
          </div>
          <header className="mt-6 text-xl font-bold ">모집 정보</header>
          <div className="mt-1">
            <div className="flex text-[15px] items-center ">
              <p className="mr-2 text-gray-400">상태</p>
              <p>모집중</p>
            </div>
            <div className="flex text-[15px] r">
              <p className="w-10 h-4 mr-2 text-gray-400 ">소개글</p>
              <p>{selectedStore ? selectedStore.collect_desc : null}</p>
            </div>
            <div className="flex text-[15px] items-center">
              <p className="mr-2 text-gray-400">시급</p>
              <p>{selectedStore ? selectedStore.collect_money : null}</p>
            </div>
            <div className="flex text-[15px] items-center">
              <p className="mr-2 text-gray-400">포지션</p>
              <p>{selectedStore ? selectedStore.collect_position : null}</p>
            </div>
            <div className="flex text-[15px] items-center">
              <p className="mr-2 text-gray-400">근무시간</p>
              <p>{selectedStore ? selectedStore.collect_time : null}</p>
            </div>
            <div className="flex text-[15px] items-center">
              <p className="mr-2 text-gray-400">모집인원</p>
              <p>{selectedStore ? selectedStore.collect_person_cnt : null}</p>
            </div>
          </div>
        </div>
      </BottomSheet>
      <BottomNavigation isWorker={true} />
    </>
  );
}

function StoreItem(props) {
  return (
    <div
      onClick={() => {
        props.setSelectedStore(props.data);
      }}
      className={styles.list_store_box}
    >
      <div className={styles.list_store_image}></div>
      <div className={styles.list_store_info_box}>
        <div className={styles.list_store_name}>{props.data.name}</div>
        <div className={styles.list_store_address}>{props.data.address}</div>
        <div className={styles.list_store_sectors}>{props.data.type}</div>
      </div>
    </div>
  );
}
