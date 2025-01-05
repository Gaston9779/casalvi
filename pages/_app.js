import Navbar from '../component/Navbar';
import { store } from '../store';
import '../styles/globals.css';
import { Provider } from "react-redux";
import CustomCursor from '../component/CustomCursor';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Footer from '../component/Footer';
import Loader from '../component/Loader';
import AOS from 'aos';
import CookieConsent from 'react-cookie-consent';
import Cookies from 'js-cookie';
import 'aos/dist/aos.css';
import { Host_Grotesk, Poppins } from 'next/font/google';
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
} );


export default function App ( { Component, pageProps } )
{
    const [ isLoading, setIsLoading ] = useState( true ); // Inizializza a true per mostrare il loader all'inizio
    const [ navbarDark, setNavbarDark ] = useState( false );
    const [ consentGiven, setConsentGiven ] = useState( false );
    const router = useRouter();
    const hasConsented = Cookies.get('cookie-consent');
    

    const handleConsent = () =>
    {
        // Imposta il cookie quando l'utente accetta
        Cookies.set( 'cookie-consent', 'accepted', { expires: 365 } );
        setConsentGiven( true ); // Imposta lo stato per non mostrare più il banner
    };

    // Controlla se il consenso è già stato dato (se il cookie esiste)

    // Funzione per controllare se tutte le risorse (immagini, video) sono caricate
    const checkAllResourcesLoaded = useCallback( () =>
    {
        const images = document.querySelectorAll( 'img' );
        const video = document.querySelector( 'video' );

        const mediaPromises = [
            ...Array.from( images ).map( ( img ) =>
                new Promise( ( resolve ) =>
                {
                    if ( img.complete )
                    {
                        resolve();
                    } else
                    {
                        img.onload = resolve;
                        img.onerror = resolve;
                    }
                } )
            ),
            new Promise( ( resolve ) =>
            {
                if ( video && video.readyState >= 3 )
                {
                    resolve();
                } else if ( video )
                {
                    video.oncanplaythrough = resolve;
                    video.onerror = resolve;
                } else
                {
                    resolve(); // Risolve subito se non c'è alcun video
                }
            } ),
        ];

        // Fallback: Timeout per sbloccare il loader se le risorse non sono caricate in tempo
        const timeout = new Promise( ( resolve ) => setTimeout( resolve, 3500 ) ); // 5 secondi di timeout

        Promise.race( [ Promise.all( mediaPromises ), timeout ] ).then( () =>
        {
            setIsLoading( false ); // Nasconde il loader quando tutte le risorse sono caricate o il timeout scade
        } );
    }, [setIsLoading] );

    useEffect( () =>
    {
        // Gestisci il ciclo di navigazione su Next.js
        const handleStart = () =>
        {
            setIsLoading( true ); // Mostra il loader all'inizio della navigazione
        };

        const handleComplete = () =>
        {
            checkAllResourcesLoaded(); // Controlla se tutte le risorse sono caricate
        };

        // Ascolta gli eventi di navigazione
        router.events.on( 'routeChangeStart', handleStart );
        router.events.on( 'routeChangeComplete', handleComplete );
        router.events.on( 'routeChangeError', handleComplete );

        // Chiamata iniziale per la pagina corrente
        checkAllResourcesLoaded();

        return () =>
        {
            router.events.off( 'routeChangeStart', handleStart );
            router.events.off( 'routeChangeComplete', handleComplete );
            router.events.off( 'routeChangeError', handleComplete );
        };
    }, [ router, checkAllResourcesLoaded ] );


    const [ cursorStyle, setCursorStyle ] = useState( 'default' ); // Stato per lo stile del cursore

    useEffect( () =>
    {
        const cursor = document.querySelector( '.custom-cursor' );
        const updateCursorPosition = ( e ) =>
        {
            cursor.style.left = `${ e.clientX }px`;
            cursor.style.top = `${ e.clientY }px`;
        };

        // Aggiungi un evento per muovere il cursore
        window.addEventListener( 'mousemove', updateCursorPosition );

        return () =>
        {
            window.removeEventListener( 'mousemove', updateCursorPosition );
        };
    }, [] );


    
    useEffect( () =>
    {
        const handleScroll = () =>
        {
            const threshold = 0;
            const scrollTop = window.scrollY;
            setNavbarDark( scrollTop > threshold );
        };

        window.addEventListener( 'scroll', handleScroll );
        return () =>
        {
            window.removeEventListener( 'scroll', handleScroll );
        };
    }, [] );
    useEffect( () =>
    {
        // Inizializzazione di AOS
        AOS.init( {
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        } );

        // Aggiungi un listener per il cambio di rotta
        const handleRouteChange = () =>
        {
            AOS.refresh(); // Refresh per attivare correttamente le animazioni dopo il cambio di rotta
        };

        // Event listener per il cambio di rotta in Next.js
        router.events.on( 'routeChangeComplete', handleRouteChange );

        return () =>
        {
            router.events.off( 'routeChangeComplete', handleRouteChange ); // Pulizia del listener
        };
    }, [ router ] );

    return (
        <Provider store={ store }>
            { isLoading && <Loader /> } {/* Mostra il loader finché `isLoading` è `true` */ }
            <Navbar navbarDark={ navbarDark } />
            <CustomCursor />
            <div />
            <Component { ...pageProps } />
            <CookieConsent

                location="bottom"
                buttonText="Accetto"
                onAccept={ handleConsent }
                cookieName="user-consent"
                style={ { background: "#2B373B" } }
                buttonStyle={ {
                    color: "#4e503b",
                    fontSize: "13px",
                    background: "#E9CF4B",
                    borderRadius: "5px",
                    padding: "5px 10px",
                } }
                expires={ 365 }
            >
                <p className={ italiana.className }>Questo sito utilizza i cookie per migliorare l esperienza dell utente.</p>
                <span className={ italiana.className } style={ { fontSize: "10px" } }>Leggi la nostra <a href="/privacy-policy">privacy policy</a></span>
            </CookieConsent>
            <Footer />
        </Provider>
    );
}
