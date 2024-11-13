import Head from 'next/head'
import Image from 'next/image'
/* import { Inter } from '@next/font/google' */
import Back from '../assets/villa.jpg'
import { useCallback, useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { setService } from '../redux/ServiceSlice'
import { useDispatch } from 'react-redux'
import { Italiana, Kode_Mono } from 'next/font/google';

const italiana = Italiana( {
  subsets: [ 'latin' ],
  weight: [ '400' ],
} );

const kodeMono = Kode_Mono( {
  subsets: [ 'latin' ],
  weight: [ '400' ],
} );



export default function Home ()
{
  const [ isMobile, setIsMobile ] = useState( false );

  const handleMouseOver = () => setIsHovered( true );
  const handleMouseOut = () => setIsHovered( false );



  const FullscreenVideo = () =>
  {
    return (
      <div style={ {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
      } }>

        <video
          src="/video/video.mp4" // Assicurati che il percorso sia corretto
          muted
          autoPlay
          loop
          playsInline preload="auto"
          className='videoResponsive'
          style={ {
            width: '100%',
            height: '100%',
            objectFit: 'cover',

          } }
        />
        <video
          src="/video/video.mp4" // Assicurati che il percorso sia corretto
          muted
          autoPlay
          loop
          playsInline preload="auto"
          className='videoRes'
          style={ {
            width: '100%',
            height: '100%',
            objectFit: 'cover',

          } }
        />
      </div>
    );
  };



  const checkWidth = useCallback( () =>
  {
    if ( window.screen.width < 600 )
    {
      setIsMobile( true )
    }
  }, [] )
  useEffect( () =>
  {
    checkWidth()
    AOS.init();
    AOS.refresh();
  }, [ checkWidth ] );


  return (
    <div className={ italiana.className } style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', overflow: 'hidden' } }>
      <div style={ { display: 'flex', alignItems: 'center', position: 'fixed', justifyContent: 'center', width: '100vw', height: '100vh', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,0,0,1) 100%)', opacity: '20%', mixBlendMode: 'multiply' } }>
      </div>
      <FullscreenVideo />

      { !isMobile && <p data-aos={ 'zoom-in' } className='animatedHome'>Sogni condivisi, soluzioni collettive</p> }
      { !isMobile && <div data-aos={ 'zoom-in' } style={ { position: 'absolute', top: '57vh', display: 'flex', justifyContent: 'center', width: '100%', gap: 40 } }>
        <div className='borderLight'>Scopri la nostra rete di imprese</div>
      </div> }
      { isMobile && <div>
        <p style={ { fontSize: 80, color: 'white', textAlign: 'center', opacity: '80%' } }>CASAVI</p>
        <p data-aos={ 'zoom-in' } className='animatedHome'>Sogni condivisi, soluzioni collettive</p>
        <div style={ { display: 'flex', justifyContent: 'center' } } data-aos={ 'zoom-in' }>
          <div className='borderLight'>Scopri la nostra rete di imprese</div>
        </div>
      </div> }




    </div>
  )
}
