import axios from "axios";
import { io } from "socket.io-client";

export const onlineChecker = () => {
  axios({
    method: "GET",
    url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/getLoggedInUserUUID",
    withCredentials: true,
  })
    .then((res) => {
      const userUuid = res.data;
      const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
      encrypt(process.env.NEXT_PUBLIC_SOCKET_SECRET)(socket);

      socket.on("connect", () => {
        socket.emit("onlineChecker", userUuid);
      });
    })
    .catch((err) => {
      console.log("로그인이 안 되어 있는 상태임");
    });
};
