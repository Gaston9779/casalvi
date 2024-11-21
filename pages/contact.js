import { useRef } from 'react';
import GoogleMapComponent from '../component/GoogleMapComponent'
import { Host_Grotesk, Poppins } from 'next/font/google';
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
} );
const Contact = () =>
{
    const videoRef = useRef( null );
    return (
        <div
            className="gradient2"
            style={ {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%',
            } }
        >
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
                    src="/video/particles.mp4"
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
                        zIndex: -1,
                        opacity: 0.1,
                    } }
                />
            </div>
            <div style={ { height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', padding: 40 } }>
                <GoogleMapComponent />

                <div style={ { padding: 30, display: 'flex', flexDirection: 'column', gap: 20 } }>
                    <p className={ italiana.className } style={ { textAlign: 'center', color: 'white', } }>Via della Zarga, 42, Lavis 38015</p>
                    <a href={ `tel:0461 1821559` } target="_blank" rel="noopener noreferrer" className={ italiana.className } style={ { textAlign: 'center', color: 'white', textDecoration:'underline'  } }>Tel: 0461 1821559</a>
                    <a className={ italiana.className } style={ { textAlign: 'center', color: 'white', textDecoration:'underline' } } href={ `mailto:info@casavi.it` } target="_blank" rel="noopener noreferrer">
                        Mail: info@casavi.it
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Contact;