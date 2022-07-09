import '../styles/globals.css'
import {Reset} from "styled-reset";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Reset />
        <Component {...pageProps} />
      </>
  )
}

export default MyApp
