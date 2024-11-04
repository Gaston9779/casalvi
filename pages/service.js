import { useEffect } from 'react';
import MiniSidebar from '../component/MiniSidebar';
import ParallaxCard from '../component/ParallaxCard'
import { Icon } from '@iconify/react'
import { Italiana, Kode_Mono } from 'next/font/google';

const italiana = Italiana( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );

const kodeMono = Kode_Mono( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );


const listina = [
    { id: 0, title: 'Idraulico', subtitle: 'Bla bla', sub: 'idraaa' },
    { id: 1, title: 'Elettricista', subtitle: 'Bla IDAS', sub: 'eleee' },
    { id: 2, title: 'Muratori', subtitle: 'Bla bla', sub: 'muraaa' },
    { id: 3, title: 'Tetti', subtitle: 'Bla IDAS', sub: 'tettiii' },
    { id: 4, title: 'Cappotti', subtitle: 'Bla bla', sub: 'caaap' },
    { id: 5, title: 'Pannelli', subtitle: 'Bla IDAS', sub: 'paaa' },
];

const ServicePages = ( { serviceLabel } ) =>
{

  

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
            <img style={{width:'100vw', opacity:'80%', height:'100vh', top:0, position:'fixed', overflow:'hidden', zIndex:1, mixBlendMode:'luminosity' }} src={'/images/bg-prof.jpg'} alt=''/>

            {/* Heading Section */ }
            <div
                className={ italiana.className }
                style={ {
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 50,
                } }
            >
                <p
                    style={ {
                        fontSize: 50,
                        fontWeight: '900',
                        color: 'white',
                        zIndex: 1,
                        textAlign: 'center'
                    } }
                >
                    Professionalità e innovazione,
                </p>
                <p
                    style={ {
                        fontSize: 80,
                        fontWeight: '900',
                        color: '#fadbb6',
                        zIndex: 1,
                        textAlign: 'center'
                    } }
                >
                    tutto in un unico team
                </p>
                <div style={ { zIndex: 50 } } className='inputStyle'>
                    <div className='input'>
                        <input style={ { backgroundColor: 'transparent', border: 'none', color: 'white', width: '100%' } } placeholder='Cosa stai cercando?'></input>
                        <Icon style={ { fontSize: 20, color: 'white' } } icon={ 'lsicon:search-outline' } />
                    </div>


                </div>
                <div style={ { marginTop: -110} }>
                    <ParallaxCard />
                </div>

            </div>

            {/* Sidebar Items */ }
            {/* <div style={ { zIndex: 1000, top: 200, right: 0, position: 'absolute', display: 'flex', flexDirection: 'column', gap: 40 } }>

                <MiniSidebar
                    list={ listina }
                    active={ false } // Impostiamo un valore predefinito per active
                />

            </div> */}

        </div>
    );
};

export default ServicePages;
