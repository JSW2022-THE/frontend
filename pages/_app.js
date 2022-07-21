import '../styles/globals.css'
import { Reset } from "styled-reset";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Reset />
      <div className='container'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Component {...pageProps} />
          </LocalizationProvider>
      </div>
    </>
  )
}

export default MyApp
