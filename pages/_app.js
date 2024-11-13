import Navbar from '../component/Navbar';
import { store } from '../store';
import '../styles/globals.css';
import { Provider } from "react-redux";
import CustomCursor from '../component/CustomCursor';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import Footer from '../component/Footer'
import Loader from '../component/Loader';

export default function App({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(false); // Inizializza a true per il caricamento iniziale
    const [navbarDark, setNavbarDark] = useState(false);
    const router = useRouter();

    // Funzione per controllare se tutte le immagini sono caricate
    const checkAllResourcesLoaded = useCallback(() => {
        const images = document.querySelectorAll('img');
        const allLoaded = Array.from(images).every((img) => img.complete);

        if (allLoaded) {
            setIsLoading(false);
        } else {
            setTimeout(checkAllResourcesLoaded, 100); // Riprova ogni 100ms finché tutte le immagini non sono caricate
        }
    }, []);

    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true); // Avvia il caricamento all'inizio del cambio di rotta
        };

        const handleComplete = () => {
            checkAllResourcesLoaded(); // Controlla le risorse al termine del cambio di rotta
        };

        // Aggiunge un listener per il caricamento completo della pagina al refresh
        const handlePageLoad = () => {
            setIsLoading(false);
        };

        // Listener per il refresh completo della pagina
        window.addEventListener('load', handlePageLoad);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        // Pulizia degli event listeners al dismontaggio del componente
        return () => {
            window.removeEventListener('load', handlePageLoad);
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router, checkAllResourcesLoaded]);

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

    return (
        <Provider store={store}>
            {isLoading && <Loader />} {/* Mostra il loader finché `isLoading` è `true` */}
            <Navbar navbarDark={navbarDark} />
            <CustomCursor />
            <Component {...pageProps} />
            <Footer/>
        </Provider>
    );
}
