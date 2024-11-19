import { useEffect } from 'react';
import ParallaxCard from '../component/ParallaxCard'
import { Host_Grotesk, Poppins } from 'next/font/google';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Tilt from 'react-parallax-tilt';

const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
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
        
        
            AOS.init({
                duration: 1000,
                easing: 'ease-in-out',
                once: true,
              });
            AOS.refresh();
        
    }, [] );


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

            <div
               
                className={ italiana.className }
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
                    <div data-aos={ 'zoom-in' } className='divService'>
                        <div  style={ { display: 'flex', justifyContent: 'flex-start', gap: 40, height: '100%', display: 'flex' } }>

                            <div className='img_res'>

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
                                    <p style={ { width: '100%', fontSize: 16,  color: '#333' } }>Stai pensando di costruire casa o di fare una ristrutturazione massiccia? Vorresti una persona che si prenda la responsabilità e si occupi di creare e gestire un team adatto alle tue esigenze?</p>
                                    <div style={ { width: '100%' } } className='buttonStyle'>
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



        </div >
    );
};

export default ServicePages;
