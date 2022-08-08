import "../styles/globals.css";
import { Reset } from "styled-reset";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Head from "next/head";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useEffect } from "react";
import { onlineChecker } from "../modules/socket/onlineChecker";

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
    onlineChecker();
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
