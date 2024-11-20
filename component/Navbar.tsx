import Image from 'next/image';
import Link from 'next/link';
import { selectSlice, setService } from '../redux/ServiceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { Host_Grotesk, Kanit } from 'next/font/google';

const Icon = dynamic( () => import( '@iconify/react' ).then( ( mod ) => mod.Icon ), { ssr: false } );


type Props = {
    navbarDark: boolean;
};
const kanit = Kanit( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
} );

const Navbar = ( { navbarDark }: Props ) =>
{
    const dispatch = useDispatch();
    const selector = useSelector( selectSlice );
    const [ mobile, setMobile ] = useState( false );
    const [ menuMobile, setMenuMobile ] = useState( false );
    const [ selected, setSelected ] = useState( null );
    const [ listNavbar, setNavbarMenu ] = useState( {
        chisiamo: false,
        project: false,
        bonus: false,
        service: false,
        workus: false,
        contact: false
    } );


    const handle = useCallback(
        async ( e ) =>
        {
            await ( selectedNavbar( e ) )
            await ( dispatch( setService( e ) ) )
            setMenuMobile( false )
        },
        []
    );
    useEffect(() => {
        if (menuMobile) {
          // Disabilita lo scroll quando il menu è aperto
          document.body.style.overflow = 'hidden';
          // Aggiungi un overlay invisibile sopra il contenuto
          document.body.style.position = 'fixed';
          document.body.style.width = '100%'; // Impedisce lo scroll laterale
        } else {
          // Ripristina lo scroll quando il menu è chiuso
          document.body.style.overflow = 'auto';
          document.body.style.position = ''; // Ripristina la posizione originale
        }
    
        // Pulizia: ripristina lo scroll quando il componente viene smontato
        return () => {
          document.body.style.overflow = 'auto';
          document.body.style.position = '';
        };
      }, [menuMobile]);



    const selectedNavbar = useCallback( ( text ) =>
    {
        setNavbarMenu( {
            chisiamo: text === 'chisiamo',
            project: text === 'project',
            bonus: text === 'bonus',
            service: text === 'service',
            workus: text === 'workus',
            contact: text === 'contact'
        } );
    }, [] );

    useEffect( () =>
    {

        if ( window.screen.width < 600 )
        {
            setMobile( true );
        }
    }, [] );
    const refreshing = useCallback( () =>
    {
        const urlSegments = window.location.pathname.split( '/' );
        const key = urlSegments[ urlSegments.length - 1 ];
        const allFieldsFalse = Object.values( listNavbar ).every( value => value === false );
        if ( allFieldsFalse )
        {
            handle( key.replace( /\s+/g, '' ) )
        }
    }, [] )

    useEffect( () =>
    {
        
        refreshing()
    }, [] )
    return (
        <div className={ navbarDark ? 'navbarScroll' : 'navbar' }>
            <div className={ italiana.className}>
                <div className="logoDimension">
                    <Link href="/" onClick={ () => handle( '/' ) }>
                        {/* <p style={ { color: 'white' } } className="logoNavbar">CASAVI</p> */}
                        <img style={{width:'100%', height:'110px'}} src='/images/loghetto.png' alt='' />
                    </Link>
                </div>
                <div className="hamburger" style={ { width: '100%', marginTop: -5 } }>
                    <div className="dropdown-content" style={ { display: 'flex' } }>
                        <Link href="/chisiamo" onClick={ () => handle( 'chisiamo' ) } className={ listNavbar.chisiamo ? 'selectedText' : 'hoverableText' } style={ { color: 'white' } }>Chi siamo</Link>
                        <Link href="/project" onClick={ () => handle( 'project' ) } className={ listNavbar.project ? 'selectedText' : 'hoverableText' } style={ { color: 'white' } }>Realizzazioni</Link>
                        <Link href="/service" onClick={ () => handle( 'service' ) } className={ listNavbar.service ? 'selectedText' : 'hoverableText' } style={ { color: 'white' } }>Servizi</Link>
                        <Link href="/workus" onClick={ () => handle( 'workus' ) } className={ listNavbar.workus ? 'selectedText' : 'hoverableText' } style={ { color: 'white' } }>Lavora con noi</Link>

                        <Link href="/contact" onClick={ () => handle( 'contact' ) } className={ listNavbar.contact ? 'selectedText' : 'hoverableText' } style={ { color: 'white' } }>Contatti</Link>
                    </div>
                </div>
                { mobile && (
                    <div className="burgerone">
                        <Link href="/" onClick={ () => handle( '/' ) }>
                        <img src='/images/loghetto.png' alt='' />
                    </Link>
                        <Icon onClick={ () => setMenuMobile( !menuMobile ) } icon="lets-icons:menu" />
                    </div>
                ) }
                {
                    menuMobile && <div className='mobileMenu'>

                        <div style={ { marginTop: -5, width: '100vw', height: '100vh', zIndex: 101 } }>
                            <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 40 } }>
                                <Link style={ { fontSize: 30, color: 'white' } } href="/chisiamo" onClick={ () => handle( 'chisiamo' ) } className={ listNavbar.chisiamo ? 'selectedText' : 'hoverableText' }>Chi siamo</Link>
                                <Link style={ { fontSize: 30, color: 'white' } } href="/project" onClick={ () => handle( 'project' ) } className={ listNavbar.project ? 'selectedText' : 'hoverableText' }>Realizzazioni</Link>
                                <Link style={ { fontSize: 30, color: 'white' } } href="/service" onClick={ () => handle( 'service' ) } className={ listNavbar.service ? 'selectedText' : 'hoverableText' }>Servizi</Link>
                                <Link style={ { fontSize: 30, color: 'white' } } href="/workus" onClick={ () => handle( 'workus' ) } className={ listNavbar.workus ? 'selectedText' : 'hoverableText' }>Lavora con noi</Link>
                                <Link style={ { fontSize: 30, color: 'white' } } href="/contact" onClick={ () => handle( 'contact' ) } className={ listNavbar.contact ? 'selectedText' : 'hoverableText' }>Contatti</Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
