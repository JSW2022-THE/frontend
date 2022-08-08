import axios from "axios";
import { io } from "socket.io-client";

export const onlineChecker = () => {
  axios({
    method: "GET",
    url: "http://localhost:2000/api/auth/getLoggedInUserUUID",
    withCredentials: true,
  })
    .then((res) => {
      const userUuid = res.data;
      const socket = io("http://localhost:2000");

      socket.on("connect", () => {
        socket.emit("onlineChecker", userUuid);
      });
    })
    .catch((err) => {
      console.log("로그인이 안 되어 있는 상태임");
    });
};
