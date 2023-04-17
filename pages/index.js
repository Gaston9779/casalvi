import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import HomeWork from '../assets/work.jpeg'
import Background from '../assets/isometric.png'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from "lottie-react";
import lottiefile from '../assets/lottie.json'
import { setService } from '../redux/ServiceSlice'
import { useDispatch } from 'react-redux'
const inter = Inter( { subsets: [ 'latin' ] } )

export default function Home ()
{
  useEffect( () =>
  {
    AOS.init();
    AOS.refresh();
  }, [] );


  return (
    <div>

      {/* <Image src={ Background } style={ { width: '100%', height:'90vh', opacity: '90%', marginTop:80 } } alt='' />
       */}
      {/* <div className="backS"></div>

      <Lottie className="backLottie" animationData={ lottiefile } /> */}
      <div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: '3%', height: '100vh' } }>
        <div style={ { display: 'flex', flexDirection: 'column', gap: 40 } }>
          <h1 style={ { fontSize: '7.5vw', fontWeight: '100', color: '#27292A', fontFamily: 'Geometos Rounded' } } >CASALVI</h1>
          <p style={ { fontSize: 16, fontFamily: 'Montserrat', lineHeight: 2, } }>Nasce con l'obiettivo di AGGREGARE tramite partnership e stabili collaborazioni,<br /> società della filiera edilizia (professionisti, artigiani, commercianti)<br /> che operano sul mercato con proprie reti commerciali.</p>
          <button style={ { width: '50%', cursor:'pointer', height: 40, border: 'none', backgroundColor: '#27292A', color: 'white', borderRadius: 10 } }>VAI QUI</button>
        </div>
        <Image src={ Background } style={ { objectFit: 'contain', paddingTop: '7%', width: '100%', height: '80vh', } } alt='' />
      </div>
      {/* <div style={ { backgroundColor: '#27292A', marginTop: -5, width: '100%', display: 'grid', gridTemplateRows: '50% 50%', flexDirection: 'column' } }>
        <div style={ { display: 'flex', alignItems: 'center', height: 400, justifyContent: 'center' } }>
          <p style={ { color: 'white', fontWeight: 300, fontSize: 22, fontStyle: 'italic', textAlign: 'center' } }>Frase figa per far capire che siete <br /> un azienda  seria ma allo stesso tempo etica</p>
        </div>

      </div>
      <div style={ { backgroundColor: '#27292A', marginTop: -5, width: '100%', display: 'grid', gridTemplateRows: '50% 50%', flexDirection: 'column' } }>
        <div style={ { display: 'flex', alignItems: 'center', height: 400, justifyContent: 'center' } }>
          <p style={ { color: 'white', fontWeight: 300, fontSize: 22, fontStyle: 'italic', textAlign: 'center' } }>FOOTER</p>
        </div>

      </div> */}


    </div>
  )
}
