import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
const encrypt = require("socket.io-encrypt");
import { IoSend } from "react-icons/io5";
import { FaUserCircle, FaCircle, FaChevronLeft } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

import moment from "moment";
import "moment/locale/ko";

import classNames from "classnames";
import axios from "axios";
let socket;
//Interval Object
let onlineChecker;

export default function ChatRoom() {
  const router = useRouter();

  const [roomId, setRoomId] = useState();

  const [chatData, setChatData] = useState([]);
  const textareaRef = useRef();
  const [textareaValue, setTextareaValue] = useState("");

  const [userUuid, setUserUuid] = useState();

  const [connected, setConnected] = useState(false);
  const [onLoading, setOnLoading] = useState(true);

  const [isOnline, setIsOnline] = useState(false);
  const [lastOnlineFromNow, setLastOnlineFromNow] = useState(null);

  useEffect(() => {
    return () => {
      //ChatRoom Unmount시 인터벌 Clear
      clearInterval(onlineChecker);
    };
  }, []);

  // next js 의 라우터가 ready 되었을 때 roomId Set
  useEffect(() => {
    if (router.isReady) {
      setRoomId(router.query.chatRoomId);
    }
  }, [router.isReady]);

  // roomId가 존재한다는 것은 router 가 ready 되었다는 뜻 이므로, userUuid를 api GET
  useEffect(() => {
    if (roomId) {
      axios({
        method: "GET",
        url: "http://localhost:2000/api/auth/getLoggedInUserUUID",
        withCredentials: true,
      })
        .then((res) => {
          setUserUuid(res.data);
          onlineChecker = setInterval(() => {
            axios({
              method: "POST",
              url: "http://localhost:2000/api/chat/getChatRoomOnlineStatus",
              withCredentials: true,
              data: { room_id: roomId },
            })
              .then((res) => {
                setIsOnline(res.data.data[0].is_online);
                setLastOnlineFromNow(
                  moment(res.data.data[0].last_online).fromNow()
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
          router.push("/auth/login");
        });
    }
  }, [roomId]);

  //userUuid 가 준비되었을 때 이제 소켓연결 시작, 소켓에 대한 코드들
  useEffect(() => {
    if (userUuid) {
      socket = io("localhost:2000");
      encrypt(process.env.NEXT_PUBLIC_SOCKET_SECRET)(socket);

      socket.on("connect", () => {
        setConnected(true);
        socket.emit("joinRoom", {
          room_id: roomId,
          user_uuid: userUuid,
        });
      });
      //소켓에서 연결이 끊어졌을때
      socket.on("disconnect", () => {
        setConnected(false);
      });
      //소켓 연결후 기존 채팅 데이터 로드
      socket.on("getChatData", (_data) => {
        setChatData(_data);
        setOnLoading(false);
        window.scrollTo(0, document.body.scrollHeight);
      });
      //다른 소켓으로 부터 채팅을 받아올때
      socket.on("msgSend", (_data) => {
        setChatData((current) => [...current, _data]);
      });

      socket.on("errorHandler", (_err) => {
        alert(_err.message);
        router.back();
      });
    }
  }, [userUuid]);

  //채팅 전송 로직
  const sendMessage = () => {
    socket.emit("msgSend", {
      room_id: roomId,
      msg: textareaValue,
      sender_id: userUuid,
    });
    setTextareaValue("");
  };
  //chatData State에 메세지가 변동(ex.메세지 도착)이 있을때 마다 스크롤을 하단으로.
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatData]);

  return (
    <div className="font-pretendard">
      {onLoading ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between h-32">
            <CircularProgress
              size="80px"
              className=""
              style={{ color: "#86efac" }}
            />
            <p className="font-semibold">채팅을 불러오는 중...</p>
          </div>
        </div>
      ) : null}
      {!onLoading && !connected ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="flex flex-col items-center justify-between h-32">
            <CircularProgress
              size="80px"
              className=""
              style={{ color: "#86efac" }}
            />
            <div className="flex flex-col items-center">
              <p className="font-semibold">네트워크 연결이 끊어졌습니다...</p>
              <p className="mt-1 font-semibold">연결 재시도 중...</p>
            </div>
          </div>
        </div>
      ) : null}
      <header className="fixed top-0 left-0 flex items-center w-full h-16 bg-white">
        <div className="flex items-center h-full ">
          <FaChevronLeft
            onClick={() => {
              router.back();
            }}
            className="w-6 h-6 mx-2 text-gray-500 cursor-pointer"
          />
          <FaUserCircle className="w-8 h-8 text-gray-300" />
          <div className="flex flex-col justify-between h-full py-4 ml-3">
            <h1 className="font-semibold ">이름이 들어갈 위치(props)</h1>
            {isOnline ? (
              <div className="flex items-center ">
                <FaCircle className="w-2 h-2 text-green-300" />
                <p className="px-1 text-sm font-light text-gray-400">
                  현재 접속 중
                </p>
              </div>
            ) : (
              <p className="text-sm font-light text-gray-400">
                최근 접속 : {lastOnlineFromNow ? lastOnlineFromNow : "정보없음"}
              </p>
            )}
          </div>
        </div>
      </header>
      <div className="w-full h-full pt-20 pb-16 overflow-auto ">
        {chatData.map((_data) => {
          return (
            <div
              key={_data.chat_id}
              className={classNames(
                "flex w-full  py-[5px] px-5",
                _data.sender_id === userUuid ? "justify-end" : "justify-start"
              )}
            >
              <pre
                className={classNames(
                  "w-fit px-4 py-[6px]  text-lg rounded-2xl",
                  _data.sender_id === userUuid
                    ? " bg-green-400 text-white"
                    : "bg-gray-200"
                )}
              >
                {_data.msg}
              </pre>
            </div>
          );
        })}
      </div>
      <div className="w-full px-4 h-16 fixed bottom-0  left-[50%] -translate-x-1/2 flex items-center bg-[#f4f4f4]">
        <textarea
          ref={textareaRef}
          value={textareaValue}
          onChange={(e) => {
            setTextareaValue(e.target.value);
          }}
          className="w-full h-10 px-5 py-3 bg-gray-200 rounded-full resize-none focus:caret-blue-500 focus:outline-none "
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <IoSend onClick={sendMessage} className="m-2 text-gray-300 w-7 h-7" />
      </div>
    </div>
  );
}
