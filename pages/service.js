import { useEffect } from 'react';
import ParallaxCard from '../component/ParallaxCard'
import { Italiana, Poppins } from 'next/font/google';
import Image from 'next/image';
import AOS from 'aos';
import Tilt from 'react-parallax-tilt';
import AgencyCrest from './agencyCrest';

const italiana = Italiana( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );

const kodeMono = Poppins( {
    subsets: [ 'latin' ],
    weight: [ '900' ],
} );


const listina = [
    { id: 0, title: 'Idraulico', subtitle: 'Bla bla', sub: 'idraaa' },
    { id: 1, title: 'Elettricista', subtitle: 'Bla IDAS', sub: 'eleee' },
    { id: 2, title: 'Muratori', subtitle: 'Bla bla', sub: 'muraaa' },
    { id: 3, title: 'Tetti', subtitle: 'Bla IDAS', sub: 'tettiii' },
    { id: 4, title: 'Cappotti', subtitle: 'Bla bla', sub: 'caaap' },
    { id: 5, title: 'Pannelli', subtitle: 'Bla IDAS', sub: 'paaa' },
];

const ServicePages = () =>
{


    useEffect( () =>
    {
        if ( typeof window !== 'undefined' )
        {
            AOS.init( {
                duration: 1000, // Durata dell'animazione
                once: true, // Esegui l'animazione solo una volta
            } );
        }
        AOS.refresh()
    }, [] )


    return (
        <div
            className="gradient2"
            style={ {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center'
            } }
        >
            {/* Background Gradient Overlay */ }
            {/*  <Image className='mobileNone' width={ 1920 } height={ 1080 } layout='responsive' objectFit='cover' style={ { opacity: '0%', top: 0, position: 'fixed', overflow: 'hidden', zIndex: -1 } } src={ '/images/bg-prof.jpg' } alt='' /> */ }

            {/* Heading Section */ }
            <div
                className={ italiana.className }
                data-aos={ 'zoom-in' }
                style={ {
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 30,
                    gap: 20

                } }
            >


                <Tilt
                    tiltMaxAngleX={ 4 }  // Movimenti delicati
                    tiltMaxAngleY={ 4 }
                    scale={ 1.01 }      // Leggero ingrandimento all'hover
                    transitionSpeed={ 250 }  // Transizione fluida
                >
                    <div className='divService'>
                        <div style={ { display: 'flex', justifyContent: 'flex-start', gap: 40, height: '100%', display: 'flex' } }>

                            <div className='img_res'>
                                {/* <input className='inputCardPrinc' type='button' style={ {zIndex:10, width: '30%', alignSelf: 'flex-end', height: 40 } } value={ 'Scopri' } /> */ }
                                <Tilt tiltMaxAngleX={ 4 }  // Movimenti delicati
                                    tiltMaxAngleY={ 4 }
                                    scale={ 1.01 }    // Leggero ingrandimento all'hover
                                    transitionSpeed={ 250 } // Transizione fluida
                                    style={ { display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', borderRadius: 20, height: '100%', background: 'linear-gradient(83deg, rgba(245, 113, 208, 0.311) 0%, rgb(251, 251, 251) 44%, rgba(27, 229, 189, 0.526) 100%)', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', } }>

                                    <img src='/images/facility.png' width={ '270px' } style={ { transform: 'scale(1.1)', overflow: 'auto', zIndex: 20, top: -15, marginBottom: '15px' } } height={ '100%' } alt='' />

                                </Tilt>
                            </div>
                            <div className='w100' style={ { width: '70%', padding: 30, background: 'linear-gradient(83deg, rgba(245, 113, 208, 0.111) 0%, rgb(251, 251, 251, 0.5) 44%, rgba(27, 229, 189, 0.226) 100%)', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', overflow: 'hidden', margin: '0 auto', zIndex: 1, borderRadius: 20, marginTop: 0, display: 'flex', justifyContent: 'space-between' } }>

                                <div style={ { display: 'flex', gap: 10, padding: 10, flexDirection: 'column', justifyContent: 'space-between' } }>
                                    <p style={ { fontSize: '30px', color: '#333', fontWeight: 'bold' } }>Casavi facility managment</p>
                                    <p style={ { width: '100%', fontSize: 16, fontWeight: '900', color: '#333' } }>Stai pensando di costruire casa o di fare una ristrutturazione massiccia? Vorresti una persona che si prenda la responsabilità e si occupi di creare e gestire un team adatto alle tue esigenze?</p>
                                    <div style={ { width: '100%' } } className='buttonStyle'>
                                        <p>Costruisci la tua squadra</p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </Tilt>
                {/*              <p style={{textAlign:'center', marginTop:30, color:'white'}}>Se invece stai cercando piccoli interventi edilizi</p>
 */}
                <div style={ { marginTop: -110 } }>
                    <ParallaxCard />
                </div>

            </div >

            {/* Sidebar Items */ }
            {/* <div style={ { zIndex: 1000, top: 200, right: 0, position: 'absolute', display: 'flex', flexDirection: 'column', gap: 40 } }>

                <MiniSidebar
                    list={ listina }
                    active={ false } // Impostiamo un valore predefinito per active
                />

            </div> */}

        </div >
    );
};

export default ServicePages;
