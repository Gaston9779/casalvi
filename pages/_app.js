import Navbar from '../component/Navbar';
import { store } from '../store';
import '../styles/globals.css';
import { Provider } from "react-redux";
import CustomCursor from '../component/CustomCursor';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Footer from '../component/Footer'
import Loader from '../component/Loader';

export default function App ( { Component, pageProps } )
{
    const [ isLoading, setIsLoading ] = useState( false ); // Inizializza a true per il caricamento iniziale
    const [ navbarDark, setNavbarDark ] = useState( false );
    const router = useRouter();


    // Funzione per controllare se tutte le immagini sono caricate
    const checkAllResourcesLoaded = useCallback( () =>
    {
        const images = document.querySelectorAll( 'img' );
        const allLoaded = Array.from( images ).every( ( img ) => img.complete );

        if ( allLoaded )
        {
            setIsLoading( false );
        } else
        {
            setTimeout( checkAllResourcesLoaded, 100 ); // Riprova ogni 100ms finché tutte le immagini non sono caricate
        }
    }, [] );

    useEffect( () =>
    {
        const handleStart = () =>
        {
            setIsLoading( true ); // Mostra il loader all'inizio del cambio di rotta
        };

        const handleComplete = () =>
        {
            checkAllResourcesLoaded(); // Controlla se tutte le risorse sono caricate
        };

        const checkAllResourcesLoaded = () =>
        {
            const images = Array.from( document.querySelectorAll( 'img' ) );
            const video = document.querySelector( 'video' );

            // Array di promesse per ogni immagine e video
            const mediaPromises = [
                ...images.map( img => new Promise( resolve =>
                {
                    if ( img.complete )
                    {
                        resolve();
                    } else
                    {
                        img.onload = resolve;
                        img.onerror = resolve;
                    }
                } ) ),
                new Promise( resolve =>
                {
                    if ( video && video.readyState >= 3 )
                    { // ReadyState 3 indica che il video è caricato
                        resolve();
                    } else if ( video )
                    {
                        video.oncanplaythrough = resolve;
                        video.onerror = resolve;
                    } else
                    {
                        resolve(); // Risolve subito se non c'è alcun video
                    }
                } )
            ];

            // Una volta caricate tutte le risorse, nasconde il loader
            Promise.all( mediaPromises ).then( () =>
            {
                setIsLoading( false );
            } );
        };

        // Listener per il caricamento della pagina iniziale
        window.addEventListener( 'load', checkAllResourcesLoaded );

        // Listener per le modifiche della rotta
        router.events.on( 'routeChangeStart', handleStart );
        router.events.on( 'routeChangeComplete', handleComplete );
        router.events.on( 'routeChangeError', handleComplete );

        // Pulizia degli event listeners al dismontaggio del componente
        return () =>
        {
            window.removeEventListener( 'load', checkAllResourcesLoaded );
            router.events.off( 'routeChangeStart', handleStart );
            router.events.off( 'routeChangeComplete', handleComplete );
            router.events.off( 'routeChangeError', handleComplete );
        };
    }, [ router ] );
    const [ cursorStyle, setCursorStyle ] = useState( 'default' );  // Stato per lo stile del cursore

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

    // Funzione per cambiare lo stile del cursore
    const handleCursorEnter = () => setCursorStyle( 'hover' );  // Cambia lo stile del cursore quando si entra
    const handleCursorLeave = () => setCursorStyle( 'default' );  // Ritorna allo stile originale

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



    return (
        <Provider store={ store }>
            { isLoading && <Loader /> } {/* Mostra il loader finché `isLoading` è `true` */ }
            <Navbar navbarDark={ navbarDark } />
           
            <CustomCursor />
            <div />
            <Component { ...pageProps } />
            <Footer />
        </Provider>
    );
}
