import { useCallback, useEffect, useRef, useState } from 'react';
import ParallaxCard from '../component/ParallaxCard'
import { Host_Grotesk, Poppins } from 'next/font/google';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Tilt from 'react-parallax-tilt';
import Modal from '../component/Modal';

const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
} );




const listina = [
    { id: 0, title: 'Idraulico', subtitle: 'Bla bla', sub: 'idraaa' },
    { id: 1, title: 'Elettricista', subtitle: 'Bla IDAS', sub: 'eleee' },
    { id: 2, title: 'Muratori', subtitle: 'Bla bla', sub: 'muraaa' },
    { id: 3, title: 'Fotovoltaici', subtitle: 'Bla IDAS', sub: 'Fotovoltaici' },
    { id: 4, title: 'Cappotti', subtitle: 'Bla bla', sub: 'caaap' },
    { id: 5, title: 'Pannelli', subtitle: 'Bla IDAS', sub: 'paaa' },
];

const ServicePages = () =>
{
    const videoRef = useRef( null );
    const videoRefMob = useRef( null );
    const [ isMobile, setIsMobile ] = useState( false );
    const [ selected, setSelected ] = useState( null )
    const [ name, setName ] = useState( '' )
    const [ text, setText ] = useState( '' )
    const checkWidth = useCallback( () =>
    {
        setIsMobile( window.screen.width < 600 );
    }, [] );

    useEffect( () =>
    {

        checkWidth()
        AOS.init( {
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        } );
        AOS.refresh();

    }, [] );

    const openModal = ( e ) =>
    {
        setSelected( true )
        setText( `Trasformiamo la complessità in un processo chiaro ed efficace. Dalla costruzione del Capitolato Speciale di Appalto alla firma del contratto, gestiamo ogni fase con precisione: valutiamo i costi, indiciamo il bando sulla piattaforma Casavi, raccogliamo e analizziamo le offerte, fino alla formalizzazione dell’accordo.

        Non ci fermiamo qui: pianifichiamo, coordiniamo e monitoriamo ogni aspetto del progetto, garantendo il rispetto di budget e scadenze, mitigando i rischi e fornendo report costanti.

        💰 Compenso: generalmente tra il 5% e il 15% del valore del progetto.

        Affidati a noi per una gestione senza intoppi. 🚀`)
    }
    const closeModal = () =>
    {
        setSelected( false )
        setName( '' )
        setText( '' )
    }


    return (
        <div
            className="gradient2"
            style={ {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%'
            } }
        >
            <div className='gradient3'></div>
            <div

                className={ italiana.className }
                style={ {
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 30,
                    gap: 20

                } }
            >
                <div style={ {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: 0,
                } }>
                    <video
                        src="/video/particles.mp4"
                        muted
                        autoPlay
                        loop
                        preload="auto"
                        className='videoResponsive'
                        ref={ videoRef }
                        style={ {
                            width: '100%',
                            objectFit: 'cover',
                            opacity: 0.1,
                            height: '100vh',
                            opacity: 0.1
                        } }
                    />
                    { isMobile && <video
                        src="/video/particles2.mp4"
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        ref={ videoRefMob }
                        className='videoRes'
                        style={ {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.1
                        } }
                    /> }
                </div>

                <Tilt
                    tiltMaxAngleX={ 4 }  // Movimenti delicati
                    tiltMaxAngleY={ 4 }
                    scale={ 1.01 }      // Leggero ingrandimento all'hover
                    transitionSpeed={ 250 }  // Transizione fluida
                >
                    <div data-aos={ 'zoom-in' } className='divService'>
                        <div style={ { display: 'flex', justifyContent: 'flex-start', gap: 40, height: '100%', display: 'flex' } }>

                            <div className='img_res'>

                                <Tilt tiltMaxAngleX={ 4 }  // Movimenti delicati
                                    tiltMaxAngleY={ 4 }
                                    scale={ 1.01 }    // Leggero ingrandimento all'hover
                                    transitionSpeed={ 250 } // Transizione fluida
                                    style={ { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', borderRadius: 20, height: '100%', background: 'linear-gradient(83deg, rgba(245, 113, 208, 0.311) 0%, rgb(251, 251, 251) 44%, rgba(27, 229, 189, 0.526) 100%)', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', } }>

                                    <img loading="lazy" src="/images/facility.png" width={ '270px' } style={ { transform: 'scale(1.1)', overflow: 'auto', zIndex: 20, top: -15, marginBottom: '15px' } } height={ '100%' } alt="" />

                                </Tilt>
                            </div>
                            <div className='w100' style={ { width: '70%', padding: 30, background: 'linear-gradient(83deg, rgba(245, 113, 208, 0.111) 0%, rgb(251, 251, 251, 0.5) 44%, rgba(27, 229, 189, 0.226) 100%)', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', overflow: 'hidden', margin: '0 auto', zIndex: 1, borderRadius: 20, marginTop: 0, display: 'flex', justifyContent: 'space-between' } }>

                                <div style={ { display: 'flex', gap: 10, padding: 10, flexDirection: 'column', justifyContent: 'space-between' } }>
                                    <p style={ { fontSize: '30px', color: '#333', fontWeight: 'bold' } }>Casavi facility managment</p>
                                    <p style={ { width: '100%', fontSize: 16, color: '#333' } }>Stai pensando di costruire casa o di fare una ristrutturazione massiccia? Vorresti una persona che si prenda la responsabilità e si occupi di creare e gestire un team adatto alle tue esigenze?</p>
                                    <div onClick={ openModal } style={ { width: '100%' } } className='buttonStyle'>
                                        <p>Costruisci la tua squadra</p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </Tilt>

                <div data-aos={ 'zoom-in' } style={ { marginTop: -110 } }>
                    <ParallaxCard />
                </div>

            </div >

            {
                selected && <Modal title={ 'Cosa facciamo' } text={ text } closeModal={ closeModal } isOpen={ openModal } >
                    <button onClick={ () => window.location.href = 'mailto:info@studiostv.eu' } className='buttonStyle' style={ { display: 'inline', marginTop: 20 } }>Contattaci</button>
                </Modal>
            }


        </div >
    );
};

export default ServicePages;
