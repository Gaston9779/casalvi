import Image from 'next/image';
import Link from 'next/link';
import { selectSlice, setService } from '../redux/ServiceSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

const Icon = dynamic( () => import( '@iconify/react' ).then( ( mod ) => mod.Icon ), { ssr: false } );


type Props = {
    navbarDark: boolean;
};

const Navbar = ( { navbarDark }: Props ) =>
{
    const dispatch = useDispatch();
    const selector = useSelector( selectSlice );
    const [ mobile, setMobile ] = useState( false );
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
        ( e ) =>
        {
            call( e );
            selectedNavbar( e );
            dispatch( setService( e ) );
        },
        [ dispatch ]
    );

    const call = useCallback(
        ( e ) =>
        {
            setSelected( e );
            console.log( selector, 'sele' );
        },
        [ selector ]
    );

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

    return (
        <div className={ navbarDark ? 'navbarScroll' : 'navbar' }>
            <div className="logoDimension">
                <Link href="/" onClick={ () => handle( '/' ) }>
                    <p className="logoNavbar">CASAVI</p>
                </Link>
            </div>
            <div className="hamburger" style={ { width: '100%', marginTop: -5 } }>
                <div className="dropdown-content" style={ { display: 'flex' } }>
                    <Link href="/chisiamo" onClick={ () => handle( 'chisiamo' ) } className={ listNavbar.chisiamo ? 'selectedText' : 'hoverableText' }>Chi siamo</Link>
                    <Link href="/project" onClick={ () => handle( 'project' ) } className={ listNavbar.project ? 'selectedText' : 'hoverableText' }>Realizzazioni</Link>
                    <Link href="/service" onClick={ () => handle( 'service' ) } className={ listNavbar.service ? 'selectedText' : 'hoverableText' }>Servizi</Link>
                    <div className="dropdown">
                        <button className={ listNavbar.workus ? "dropbtnSelected" : "dropbtn" }>Lavora con noi</button>
                        <div className="dropdown-content">
                            <Link href="/workus/artigiani" onClick={ () => handle( 'workus' ) }>Artigiano</Link>
                            <Link href="/workus/prof" onClick={ () => handle( 'workus' ) }>Professionista</Link>
                            <Link href="/workus/noi" onClick={ () => handle( 'workus' ) }>Lavorare da Casalvi</Link>
                        </div>
                    </div>
                    <Link href="/contact" onClick={ () => handle( 'contact' ) } className={ listNavbar.contact ? 'selectedText' : 'hoverableText' }>Contatti</Link>
                </div>
            </div>
            { mobile && (
                <div className="burgerone">
                    <Icon icon="lets-icons:menu" />
                </div>
            ) }
        </div>
    );
};

export default Navbar;
