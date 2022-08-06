import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { IoSend } from "react-icons/io5";
import { FaUserCircle, FaCircle } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

import classNames from "classnames";
import axios from "axios";

export default function ChatRoom() {
  const router = useRouter();
  const socket = io("10.0.74.11:2000");
  const roomId = router.query.chatRoomId;

  const [chatData, setChatData] = useState([]);
  const textareaRef = useRef();
  const [textareaValue, setTextareaValue] = useState("");

  const [loggedinUserUUID, setLoggedinUserUUID] = useState("");

  const [connected, setConnected] = useState(false);
  const [onLoading, setOnLoading] = useState(true);
  useEffect(() => {
    if (router.isReady) {
      //소켓에 연결되었을때
      socket.on("connect", () => {
        setConnected(true);
        socket.emit("joinRoom", roomId);
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
    }
  }, [router.isReady]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [chatData]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:2000/api/auth/getLoggedInUserUUID",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        setLoggedinUserUUID(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        router.push("/auth/login");
      });
  }, []);

  //채팅 전송 로직
  const sendMessage = () => {
    socket.emit("msgSend", {
      room_id: roomId,
      msg: textareaValue,
      sender_id: loggedinUserUUID,
    });
    setTextareaValue("");
  };

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
      <header className="fixed top-0 left-0 flex items-center w-full h-16 px-12 bg-white">
        <div className="flex mt-1">
          <FaUserCircle className="w-8 h-8 text-gray-300" />
          <div className="ml-3 ">
            <h1 className="font-semibold ">이름이 들어갈 위치</h1>
            <div className="flex items-center mt-[1px]">
              <FaCircle className="w-3 h-3 text-green-300" />
              <p className="px-1 text-sm font-light text-gray-400">
                현재 접속 중
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full h-full pb-16 overflow-auto ">
        {chatData.map((_data) => {
          return (
            <div
              key={_data.chat_id}
              className={classNames(
                "flex w-full  py-[5px] px-5",
                _data.sender_id === loggedinUserUUID
                  ? "justify-end"
                  : "justify-start"
              )}
            >
              <pre
                className={classNames(
                  "w-fit px-4 py-[6px]  text-lg rounded-2xl",
                  _data.sender_id === loggedinUserUUID
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
