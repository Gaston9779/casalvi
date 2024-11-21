import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Host_Grotesk, Kode_Mono } from 'next/font/google';
import Link from 'next/link';

const italiana = Host_Grotesk( {
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
  const videoRef = useRef( null );
  const videoRefMob = useRef( null );
  const [ isVideoPlaying, setIsVideoPlaying ] = useState( false );  // Stato per il controllo del video

  const checkWidth = useCallback( () =>
  {
    setIsMobile( window.screen.width < 600 );
  }, [] );

  useEffect( () =>
  {
    checkWidth();
    AOS.init();
    AOS.refresh();
  }, [ checkWidth ] );

  useEffect( () =>
  {
    const video = videoRef.current;

    const handlePlay = () =>
    {
      if ( video && !isVideoPlaying )
      {
        video.play().catch( ( error ) =>
        {
          console.error( "Autoplay error:", error );
        } );
        setIsVideoPlaying( true );
      }
    };

    if ( video )
    {
      video.addEventListener( "click", handlePlay ); // Rende il video cliccabile se l’autoplay non parte
    }

    return () =>
    {
      if ( video )
      {
        video.removeEventListener( "click", handlePlay );
      }
    };
  }, [ isVideoPlaying ] );

  const handleScroll = () =>
  {
    const video = videoRef.current;
    if ( video && !isVideoPlaying )
    {
      video.play();
      setIsVideoPlaying( true ); // Imposta che il video è in riproduzione
    }
  };
  useEffect( () =>
  {
    const video = videoRef.current;

    const handlePlay = () =>
    {
      if ( video && !isVideoPlaying )
      {
        video.play().catch( ( error ) =>
        {
          console.error( "Autoplay error:", error );
        } );
        setIsVideoPlaying( true );
      }
    };

    if ( video )
    {
      video.addEventListener( "click", handlePlay ); // Rende il video cliccabile se l’autoplay non parte
    }

    return () =>
    {
      if ( video )
      {
        video.removeEventListener( "click", handlePlay );
      }
    };
  }, [ isVideoPlaying ] );
  // Aggiungi l'event listener per lo scroll
  useEffect( () =>
  {
    window.addEventListener( 'scroll', handleScroll );

    return () =>
    {
      window.removeEventListener( 'scroll', handleScroll );
    };
  }, [ isVideoPlaying ] );

  return (
    <div className={ italiana.className } style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', overflow: 'hidden' } }>
      <div style={ {
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,0,0,1) 100%)',
        opacity: '0.2',
        mixBlendMode: 'multiply',
        zIndex: 2,
      } } />

      {/* Video fullscreen */ }
      <div style={ {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1,
      } }>
        <video
          src="/video/video3.mp4"
          muted
          autoPlay
          loop
          preload="auto"
          ref={ videoRef }
          className='videoResponsive'
          style={ {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          } }
        />
        { isMobile && <video
          src="/video/video2.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          ref={ videoRefMob }
          className='videoRes'
          style={ {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          } }
        /> }
      </div>

      {/* Contenuti */ }
      { !isMobile && (
        <p data-aos={ 'zoom-in' } className='animatedHome'>Sogni condivisi, soluzioni collettive</p>
      ) }
      { !isMobile && (
        <div data-aos={ 'zoom-in' } style={ { position: 'absolute', zIndex: 4, top: '57vh', display: 'flex', justifyContent: 'center', width: '100%', gap: 40 } }>
          <div className='borderLight'><Link href='/chisiamo'>Scopri la nostra rete di imprese</Link></div>
        </div>
      ) }
      { isMobile && (
        <div data-aos={ 'zoom-in' } style={ { zIndex: 4, display: 'flex', flexDirection: 'column', gap: 10 } }>
          <p className='mobileNone' style={ { fontSize: 80, color: 'white', textAlign: 'center', opacity: '80%' } }>CASAVI</p>
          <p className='animatedHome'>Sogni condivisi, soluzioni collettive!</p>
          <div style={ { display: 'flex', justifyContent: 'center' } } data-aos={ 'zoom-in' }>
            <div className='borderLight'> <Link href="/chisiamo" >Scopri la nostra rete di imprese</Link> </div>
          </div>
        </div>
      ) }

    </div>
  );
}
