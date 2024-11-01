import { func } from 'prop-types';
import Navbar from '../component/Navbar';
import { setService } from '../redux/ServiceSlice';
import { store } from '../store';
import '../styles/globals.css'
import { Provider, useDispatch } from "react-redux";
import CustomCursor from '../component/CustomCursor'
import { useEffect, useState } from 'react';

const FullScreenBackground = () =>
{
    const backgroundStyle = {
        backgroundImage: 'url(path/to/your/image.jpg)', // Cambia il percorso con il tuo
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
        <div style={ backgroundStyle }>
            <h1 style={ titleStyle }>Benvenuto nella tua app!</h1>
        </div>
    );
};
export default function App ( { Component, pageProps } )
{
    const [ navbarDark, setNavbarDark ] = useState( false );
    useEffect( () =>
    {
        const handleScroll = () =>
        {
            // Definisci una soglia fissa per il cambiamento di colore della navbar
            const threshold = 0; // Cambia il valore secondo le tue esigenze

            // Usa window.scrollY per ottenere la distanza dalla parte superiore
            const scrollTop = window.scrollY;

            // Verifica se il valore supera la soglia specificata
            if ( scrollTop > threshold )
            {
                setNavbarDark( true );
            } else
            {
                setNavbarDark( false );
            }
        };
        console.log( window?.scrollY, 'Y' )

        // Aggiungi e rimuovi l'event listener allo scroll
        window.addEventListener( 'scroll', handleScroll );
        return () =>
        {
            window.removeEventListener( 'scroll', handleScroll );
        };

    }, [] );
    return (
        <Provider store={ store }>

            <Navbar navbarDark={navbarDark}/>
            <CustomCursor />

            <Component { ...pageProps } />

        </Provider> )
}


