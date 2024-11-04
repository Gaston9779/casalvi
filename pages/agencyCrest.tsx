import { Italiana, Kode_Mono } from 'next/font/google';
import animationData from '../public/images/jsonbuild.json';
import animatBack from '../public/images/backgroundL.json';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const italiana = Italiana( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );


const AgencyCrest = () =>
{
    const Lottie = dynamic( () => import( 'lottie-react' ), { ssr: false } );
    const [ isClient, setIsClient ] = useState( false );

    useEffect( () =>
    {
        // Indica che il codice viene eseguito lato client
        setIsClient( true );
    }, [] );
    return (
        <div className='gradient2' style={ { height: '100vh', position: 'fixed', overflowY: 'auto', width: '100%' } }>
            <div className={ italiana.className } >
            </div>
            <Image width={1920} height={1080}  layout='responsive' objectFit='cover' style={ { width: '100vw', opacity: '80%', height: '100vh', top: 0, position: 'fixed', overflow: 'hidden', zIndex: -2, mixBlendMode: 'luminosity' } } src={ '/images/bg-prof.jpg' } alt='' />
            {/*   { isClient && <Lottie style={ {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                mixBlendMode:'multiply',
                zIndex: -2,
            } } animationData={ animatBack } loop={ true } /> } */}
            <div>
                <div style={ { display: 'flex', opacity: '100%', width: '100%', height: '84vh', zIndex: 4000, marginTop: 30, paddingLeft: 45 } }>
                    <div style={ { display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', gap: 30 } }>
                        <p style={ { fontSize: '70px', color: 'white' } }>Cosa fa Casavi</p>

                        <p style={ { color: 'whitesmoke', lineHeight: '24px', letterSpacing: '1px', opacity: '100%' } }>Casavi nasce da Graziano Viola, geometra con una lunga esperienza in edilizia e immobiliare. Dopo aver fondato EDILVIOLA con il fratello, si specializza in progetti di sviluppo immobiliare e collabora con Gau Arena e RECONSULT per la progettazione di stadi. Nel 2019, fonda CASAVI, una rete d imprese che unisce artigiani e professionisti per offrire soluzioni sinergiche e complete nel settore immobiliare trentino e altoatesino.Casavi nasce da Graziano Viola, geometra con una lunga esperienza in edilizia e immobiliare. Dopo aver fondato EDILVIOLA con il fratello, si specializza in progetti di sviluppo immobiliare e collabora con Gau Arena e RECONSULT per la progettazione di stadi. Nel 2019, fonda CASAVI, una rete d imprese che unisce artigiani e professionisti per offrire soluzioni sinergiche e complete nel settore immobiliare trentino e altoatesino.</p>
{/*                         { <main>
                            <div className='cardina'></div>
                        </main> } */}
                    </div>

                    <div style={ { width: '100%' } }>
                        { isClient && <Lottie animationData={ animationData } loop={ true } /> }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AgencyCrest;