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

    const handleSidebar = ( ( item, index ) =>
    {
        console.log( 'we' )
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
            <div
                style={ { display: 'flex', alignItems: 'center', position: 'absolute', top: 0, justifyContent: 'center', width: '100vw', height: '200vh', background: 'linear-gradient(83deg, rgba(52,59,59,1) 0%, rgba(34,193,195,1) 48%, rgba(49,53,54,1) 100%)', opacity: '50%', mixBlendMode: 'multiply' } }
            />

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
