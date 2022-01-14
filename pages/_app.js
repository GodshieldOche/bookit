import '../styles/globals.css'
import { wrapper } from '../redux/store'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      < Component {...pageProps} />
    </>
  ) 
}

export default wrapper.withRedux(MyApp)
