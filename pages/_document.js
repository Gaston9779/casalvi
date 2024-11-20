import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../component/Navbar'

export default function Document ()
{
  return (
    <Html lang="en">
      <Head >
        <script
          async
          defer
          src={ `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7TAZQUqFdUqI0Xlo5tgaXYnPxI36YSWM&libraries=places` }
        ></script>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
