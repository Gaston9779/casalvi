import Navbar from '../component/Navbar';
import { store } from '../store';
import '../styles/globals.css';
import { Provider } from "react-redux";
import CustomCursor from '../component/CustomCursor';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../component/Loader';

export default function App({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(false);
    const [navbarDark, setNavbarDark] = useState(false);
    const router = useRouter();

    // Funzione per monitorare lo stato di caricamento delle risorse
    const checkAllResourcesLoaded = () => {
        // Seleziona tutte le immagini e controlla se sono caricate
        const images = document.querySelectorAll('img');
        const allLoaded = Array.from(images).every((img) => img.complete);
        if (allLoaded) {
            setIsLoading(false);
        } else {
            setTimeout(checkAllResourcesLoaded, 100); // Riprova ogni 100ms
        }
    };

    useEffect(() => {
        // Aggiunge l'evento per l'inizio e la fine della navigazione tra le pagine
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => checkAllResourcesLoaded();

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    // Funzione per cambiare colore alla navbar durante lo scroll
    useEffect(() => {
        const handleScroll = () => {
            const threshold = 0; // Soglia di scroll
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
        </Provider>
    );
}
