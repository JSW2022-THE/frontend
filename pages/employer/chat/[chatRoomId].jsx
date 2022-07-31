import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function ChatRoom() {
  const router = useRouter();
  const socket = io("localhost:2000");

  const [connected, setConnected] = useState(false);
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      console.log(socket.id);
    });
    socket.on("disconnect", () => {
      setConnected(false);
      console.log(socket.id);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("testSend", "나의 ID는 '" + socket.id + "'이야");
  };

  return (
    <div>
      {router.query.chatRoomId}의 채팅룸 연결상태 :{" "}
      {connected ? "연결됨" : "연결끊김"}
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        전송
      </button>
    </div>
  );
}
