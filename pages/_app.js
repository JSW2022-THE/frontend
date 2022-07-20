import '../styles/globals.css'
import { Reset } from "styled-reset";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Reset />
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
