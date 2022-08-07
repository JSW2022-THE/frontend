import "../styles/globals.css";
import { Reset } from "styled-reset";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Head from "next/head";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function MyApp({ Component, pageProps }) {
  const THEME = createTheme({
    typography: {
      fontFamily: "pretendard",
      fontSize: 16,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  useEffect(() => {
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
  }, []);
  return (
    <>
      <Reset />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={THEME}>
        <div className="container">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Component {...pageProps} />
          </LocalizationProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
