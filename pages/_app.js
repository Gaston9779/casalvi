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
import 'aos/dist/aos.css'; 

export default function App({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(true); // Inizializza a true per mostrare il loader all'inizio
    const [navbarDark, setNavbarDark] = useState(false);
    const router = useRouter();

    // Funzione per controllare se tutte le risorse (immagini, video) sono caricate
    const checkAllResourcesLoaded = useCallback(() => {
        const images = document.querySelectorAll('img');
        const video = document.querySelector('video');

        // Crea un array di promesse per ogni immagine
        const mediaPromises = [
            ...Array.from(images).map((img) =>
                new Promise((resolve) => {
                    if (img.complete) {
                        resolve();
                    } else {
                        img.onload = resolve;
                        img.onerror = resolve; // Risolvi anche in caso di errore
                    }
                })
            ),
            // Promessa per il video
            new Promise((resolve) => {
                if (video && video.readyState >= 3) {
                    resolve();
                } else if (video) {
                    video.oncanplaythrough = resolve;
                    video.onerror = resolve; // Risolvi in caso di errore
                } else {
                    resolve(); // Risolve subito se non c'è alcun video
                }
            }),
        ];

        // Usa Promise.all() per attendere che tutte le promesse siano risolte
        Promise.all(mediaPromises).then(() => {
            setIsLoading(false); // Nasconde il loader quando tutte le risorse sono caricate
        });
    }, []);

    useEffect(() => {
        // Gestisce gli eventi di cambio rotta per Next.js
        const handleStart = () => {
            setIsLoading(true); // Mostra il loader all'inizio della navigazione
        };

        const handleComplete = () => {
            checkAllResourcesLoaded(); // Controlla se tutte le risorse sono caricate
        };

        // Ascolta gli eventi di navigazione
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        // Chiamata iniziale per la pagina corrente
        checkAllResourcesLoaded();

        // Cleanup: rimuovi gli event listener
        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router, checkAllResourcesLoaded]);

    const [cursorStyle, setCursorStyle] = useState('default'); // Stato per lo stile del cursore

    useEffect(() => {
        const cursor = document.querySelector('.custom-cursor');
        const updateCursorPosition = (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        // Aggiungi un evento per muovere il cursore
        window.addEventListener('mousemove', updateCursorPosition);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
        };
    }, []);

    // Funzione per cambiare lo stile del cursore
    const handleCursorEnter = () => setCursorStyle('hover');
    const handleCursorLeave = () => setCursorStyle('default');

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 0;
            const scrollTop = window.scrollY;
            setNavbarDark(scrollTop > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        // Inizializzazione di AOS
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
        });
    
        // Aggiungi un listener per il cambio di rotta
        const handleRouteChange = () => {
          AOS.refresh(); // Refresh per attivare correttamente le animazioni dopo il cambio di rotta
        };
    
        // Event listener per il cambio di rotta in Next.js
        router.events.on('routeChangeComplete', handleRouteChange);
    
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange); // Pulizia del listener
        };
      }, [router]);

    return (
        <Provider store={store}>
            {isLoading && <Loader />} {/* Mostra il loader finché `isLoading` è `true` */}
            <Navbar navbarDark={navbarDark} />
            <CustomCursor />
            <div />
            <Component {...pageProps} />
            <Footer />
        </Provider>
    );
}
