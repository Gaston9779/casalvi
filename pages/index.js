import Head from 'next/head'
import Image from 'next/image'
/* import { Inter } from '@next/font/google' */
import Back from '../assets/villa.jpg'
import { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { setService } from '../redux/ServiceSlice'
import { useDispatch } from 'react-redux'
import { Italiana, Kode_Mono } from 'next/font/google';

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'], 
});

const kodeMono = Kode_Mono({
  subsets: ['latin'],
  weight: ['400'], 
});



export default function Home ()
{
  const [ isHovered, setIsHovered ] = useState( false );

  const handleMouseOver = () => setIsHovered( true );
  const handleMouseOut = () => setIsHovered( false );

  const FullScreenBackground = () =>
  {
    const backgroundStyle = {// Cambia il percorso con il tuo
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
    };

    const titleStyle = {
      fontSize: '3rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    };



    return (


      <Image src={ Back } style={ { objectFit: 'cover', position: 'fixed', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />

    );
  };

  const FullscreenVideo = () => {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1
      }}>
        <video
          src="/video/video.mp4" // Assicurati che il percorso sia corretto
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    );
  };

  const ButtonComponent = () =>
  {
    return (
      <div>
        <button onMouseOver={ () => setIsHovered( true ) } onMouseOut={ () => setIsHovered( false ) }>
          Cliccami
        </button>
        <button onMouseOver={ () => setIsHovered( true ) } onMouseOut={ () => setIsHovered( false ) }>
          Cliccami anche
        </button>
      </div>
    );
  };

  useEffect( () =>
  {
    AOS.init();
    AOS.refresh();
  }, [] );


  return (
    <div className={italiana.className} style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' } }>
    <div style={ { display: 'flex', alignItems: 'center', position: 'absolute', justifyContent: 'center', width: '100vw', height: '100vh', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,0,0,1) 100%)', opacity: '40%', mixBlendMode: 'multiply' } }>
      </div>
      <FullscreenVideo />
  
      <p className='animatedHome'>Sogni condivisi, soluzioni collettive</p>
      <div style={ { position: 'absolute', top: '57vh', display: 'flex', justifyContent: 'center', width: '100%', gap: 40 } }>
        <div className='borderLight'>Scopri la nostra rete di imprese</div>
      </div>



    </div>
  )
}
