import { func } from 'prop-types';
import Navbar from '../component/Navbar';
import { setService } from '../redux/ServiceSlice';
import { store } from '../store';
import '../styles/globals.css'
import { Provider, useDispatch } from "react-redux";
import CustomCursor from '../component/CustomCursor'

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

    return (
        <Provider store={ store }>

            <Navbar />
            <CustomCursor />

            <Component { ...pageProps } />

        </Provider> )
}


