import { Host_Grotesk, Montserrat } from 'next/font/google';
import { useCallback, useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AnimatedProcess from '../component/animatedProcess';
import Image from 'next/image';
import MyDoughnutChart from '../component/MyDoughnutChart';
import ColumnChart from '../component/ColumnsChart.tsx';
import { selectSlice, setHoverText } from "../redux/ServiceSlice"
import { useSelector } from 'react-redux';
import Counter from '../component/Counter.js';


const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
} );
const kode = Montserrat( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );

const AgencyCrest = () =>
{

    const indice = useSelector( ( state ) => state.service.indice );
    const videoRef = useRef( null );
    const videoRefMob = useRef( null );
    const [ isMobile, setIsMobile ] = useState( false );
    const checkWidth = useCallback( () =>
    {
        setIsMobile( window.screen.width < 600 );
    }, [] );
    useEffect( () =>
    {
        checkWidth()
        AOS.init();
        AOS.refresh()
    }, [ checkWidth ] )

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
            {/* <div className='backDiv'/>
            <img className='backImg' src='/images/bg-prof.jpg' alt=''/> */}
            <div
                className={ italiana.className }
                style={ {
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 0,
                    width: '100vw',
                    flexDirection: 'column',
                    justifyContent: 'space-between',

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

                <div data-aos={ 'fade-right' } >
                    <Tilt
                        tiltMaxAngleX={ 3 }  // Movimenti delicati
                        tiltMaxAngleY={ 3 }
                        scale={ 1.01 }      // Leggero ingrandimento all'hover
                        transitionSpeed={ 250 }  // Transizione fluida
                    >
                        <div style={ { width: '100%', justifyContent: 'flex-start', display: 'flex' } }>
                            <div className='cardCrestLeft' style={ { margin: 40 } }>
                                <div style={ { display: 'flex', justifyContent: 'flex-start', gap: 40, height: '100%', display: 'flex', } }>

                                    <div className='img_responsive'>
                                        <Tilt tiltMaxAngleX={ 4 }  // Movimenti delicati
                                            tiltMaxAngleY={ 4 }
                                            scale={ 1.01 }      // Leggero ingrandimento all'hover
                                            transitionSpeed={ 250 }  // Transizione fluida
                                            className='tiltCard '>

                                            <Image width={ 500 } height={ 300 } loading="lazy" src='/images/graz.png' style={ { transform: 'scale(1)', width: '100%', maxHeight: 260, zIndex: 20 } } alt='' />

                                        </Tilt>
                                    </div>


                                    <div className='width100'>

                                        <div style={ { display: 'flex', flexDirection: 'column', gap: 20 } }>
                                            <p style={ { fontSize: '30px', color: '#333', fontWeight: 'bold' } }>Chi siamo</p>
                                            <p className='font100' style={ { width: '100%', fontSize: 16, fontWeight: '100', color: '#333' } }>Casavi è una rete di artigiani uniti dalla visione del fondatore, Viola Graziano, che ha adottato un
                                                modello di Facility Manager per gestire le commesse dei clienti. Questo approccio implica che
                                                Casavi si occupi di ogni aspetto del progetto, dalla selezione di fornitori di eccellenza fino al
                                                coordinamento delle attività, assumendosi la responsabilità completa.</p>

                                        </div>

                                    </div>

                                </div>


                            </div>
                        </div>
                    </Tilt>
                </div>
                <div data-aos={ 'fade-left' } style={ { width: '100%' } }>
                    <Tilt
                        tiltMaxAngleX={ 6 }
                        tiltMaxAngleY={ 3 }
                        scale={ 1.01 }
                        transitionSpeed={ 250 }
                    >
                        <div style={ { width: '100%', justifyContent: 'flex-end', display: 'flex' } }> {/* Contenitore per controllare la larghezza del Tilt esterno */ }

                            <div className='cardCrestRight'  >
                                <div style={ { display: 'flex', justifyContent: 'flex-start', gap: 40, height: '100%' } }>

                                    <div className='cardIntoDiv'>

                                        <div style={ { display: 'flex', flexDirection: 'column', gap: 20 } }>
                                            <p style={ { fontSize: '30px', color: '#333', fontWeight: 'bold' } }>Perchè scegliere Casavi?</p>
                                            <p className='font100' style={ { width: '90%', fontSize: 16, color: '#333' } }>Centralizzando le operazioni, Casavi garantisce un elevato standard di qualità e una personalizzazione
                                                del servizio. Questo modello ottimizza le risorse disponibili e migliora l`&apos;`efficienza complessiva,
                                                permettendo di offrire soluzioni su misura che rispondono alle esigenze specifiche di ogni cliente. In
                                                questo modo, Casavi non è solo un fornitore, ma un partner affidabile nel realizzare progetti di alta
                                                qualità.</p>
                                        </div>

                                    </div>
                                    <div className='img_responsive' style={ {
                                        width: '30%',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end',
                                        borderRadius: 20,
                                        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                                    } }>
                                        <Tilt
                                            tiltMaxAngleX={ 4 }
                                            tiltMaxAngleY={ 4 }
                                            scale={ 1.01 }
                                            transitionSpeed={ 250 }
                                            className='tiltCard '
                                            style={ { overflow: 'visible', height: '100%' } }

                                        >
                                            <Image width={ 270 } height={ 300 } loading="lazy" className='img_responsive' src='/images/h.png' style={ { filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.3))', position: 'absolute', marginTop: -10, transform: 'scale(1)', overflow: 'auto', zIndex: 20 } } alt='' />
                                        </Tilt>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </Tilt>
                </div>
                <div style={ { display: 'flex', width: '100%', justifyContent: 'center', paddingBottom: 0 } }>
                    <Counter />
                </div>
                <div className='columnTempl'>

                    <div className='cardCrestLeftDown'  >
                        <div style={ { display: 'flex', justifyContent: 'flex-start', gap: 40, height: '100%', display: 'flex', } }>

                            <Tilt
                                tiltMaxAngleX={ 4 }
                                tiltMaxAngleY={ 4 }
                                scale={ 1.01 }
                                transitionSpeed={ 250 }

                            >
                                {/* <input className='inputCardPrinc' type='button' style={ {zIndex:10, width: '30%', alignSelf: 'flex-end', height: 40 } } value={ 'Scopri' } /> */ }


                                <div style={ {
                                    width: '100%', padding: 30,
                                    background: 'linear-gradient(83deg, rgba(255, 242, 251, 0.411) 0%, rgb(251, 251, 251, 0.3) 44%, rgba(201, 244, 235, 0.226) 100%)', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                                    overflow: 'hidden', margin: '0 auto', zIndex: 1, borderRadius: 20, marginTop: 0, display: 'flex', justifyContent: 'space-between'
                                } }>

                                    <div style={ { display: 'flex', flexDirection: 'column', gap: 20 } }>
                                        <p style={ { fontSize: '30px', color: '#333', fontWeight: 'bold' } }>Come funziona</p>
                                        <p className='font100' style={ { width: '100%', fontSize: 16, color: '#333' } }>Attraverso il “gestionale Casavi”, i contatti vengono messi in “match” per intercettare interessi
                                            commerciali, promuovere le richieste e veicolare il loro business all’interno delle commesse ricevute.
                                            Il cantiere viene organizzato e seguito in tutte le sue fasi. Anche il Committente, così come tutti gli
                                            artigiani, riceve un`&apos;`apposita app, funzionante sia su smartphone che su PC. In questo modo, il
                                            processo viene monitorato in tutte le sue fasi e il Committente può interagire sia con i tecnici che con
                                            gli artigiani.</p>

                                    </div>

                                </div>
                            </Tilt>
                        </div>


                    </div>


                    <div style={ { display: 'flex', flexDirection: 'column', width: '90%', gap: 20, zIndex: 10, alignItems: 'flex-start', height: '100%' } }>

                        <ColumnChart />
                        <div style={ { padding: 15, background: 'linear-gradient(83deg, rgba(253, 240, 249, 0.631) 0%, rgba(255, 255, 255, 0.937) 44%, rgba(230, 255, 250, 0.591) 100%)', zIndex: 10, borderRadius: 10, boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' } }>
                            <p style={ { lineHeight: 1.2, textAlign: 'left' } }>
                                { indice.includes( 'Match' ) && 'Connettere aziende complementari per collaborazioni su progetti, ottimizando risorse, competenze e risultati operativi.' }
                                { indice.includes( 'Intere' ) && 'Le imprese mirano a sinergie strategiche, condivisione di risorse, riduzione dei costi e aumento della competitività.' }
                                { indice.includes( 'Collabo' ) && 'Le imprese favoriscono sinergie strategiche, condivisione di competenze, innovazione, ottimizzazione dei costi e crescita comune.' }
                                { indice.includes( 'Tempi' ) && 'Imprese che collaborano nella coordinazione dei progetti, rispettando scadenze ed efficenza operativa.' }
                                { !indice && 'Scorri sui bottoni per capire gli step!' }
                            </p>
                        </div>
                    </div>


                </div>

                <div data-aos={ 'zoom-in' } style={ { display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 30 } }>
                    <div style={ { width: '100%', marginRight: 80 } }> {/* Contenitore per controllare la larghezza del Tilt esterno */ }
                        <Tilt
                            tiltMaxAngleX={ 6 }
                            tiltMaxAngleY={ 3 }
                            scale={ 1.01 }
                            transitionSpeed={ 250 }
                        >
                            <div style={ {
                                width: '100%',
                                padding: 30,
                                background: 'whitesmoke',
                                /* background: 'linear-gradient(83deg, rgba(245, 113, 208, 0.011) 0%, rgb(251, 251, 251, 0.55) 44%, rgba(27, 229, 189, 0.026) 100%)', */
                                boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',

                                margin: 40,
                                alignContent: 'center',
                                zIndex: -1,
                                borderRadius: 20,
                                marginTop: 20
                            } }>
                                <div className="scroll-container">
                                    <div className="scroll-content">
                                        <Image width={ 500 } height={ 50 } loading="lazy" src="/images/frame.png" alt="" className="scroll-image" />
                                        <Image width={ 500 } height={ 50 } loading="lazy" src="/images/frame.png" alt="" className="scroll-image" />
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    </div>
                </div>

                {/*    
                <div>
                    <AnimatedProcess/>
                </div> */}


            </div >



        </div >
    )
}
export default AgencyCrest;