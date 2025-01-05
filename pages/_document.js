import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../component/Navbar'

export default function Document ()
{
  return (
    <Html lang="en">
      <Head >
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          defer
          src={ `https://maps.googleapis.com/maps/api/js?key=AIzaSyB7TAZQUqFdUqI0Xlo5tgaXYnPxI36YSWM&libraries=places` }
        ></script>
        <link rel="icon" href="/images/fav.png" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
