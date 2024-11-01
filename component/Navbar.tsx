import Image from 'next/image';
import Link from 'next/link'
import { selectSlice, setService } from '../redux/ServiceSlice';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { store } from '../store';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
    navbarDark:Boolean;
}


const Navbar = ({navbarDark}:Props) =>
{
    const dispatch = useDispatch()
    const selector = useSelector( selectSlice )
    const [ selected, setSelected ] = useState( null )
    const [ burger, setBurger ] = useState( null )
    const [ listNavbar, setNavbarMenu ] = useState( {
        chisiamo: false,
        project: false,
        bonus: false,
        service: false,
        workus: false,
        contact: false
    } );


    const handle = ( e ) => async () =>
    {
        call( e )
        selectedNavbar( e )
        await dispatch( setService( e ) )
    }

    const call = useCallback( ( e ) =>
    {
        setSelected( e )
        console.log( selector, 'sele' )
    }, [ selector ] )

    const selectedNavbar = useCallback( ( text ) =>
    {

        if ( text === '/' )
        {
            listNavbar.chisiamo = false
            listNavbar.bonus = false
            listNavbar.service = false
            listNavbar.project = false
            listNavbar.contact = false
            listNavbar.workus = false
        }
        if ( text === 'chisiamo' )
        {
            listNavbar.chisiamo = true
            listNavbar.bonus = false
            listNavbar.service = false
            listNavbar.project = false
            listNavbar.contact = false
            listNavbar.workus = false
        }
        if ( text === 'project' )
        {
            listNavbar.chisiamo = false
            listNavbar.bonus = false
            listNavbar.service = false
            listNavbar.project = true
            listNavbar.contact = false
            listNavbar.workus = false
        }
        if ( text === 'service' )
        {
            listNavbar.chisiamo = false
            listNavbar.bonus = false
            listNavbar.service = true
            listNavbar.project = false
            listNavbar.contact = false
            listNavbar.workus = false
        }
        if ( text === 'bonus' )
        {
            listNavbar.chisiamo = false
            listNavbar.bonus = true
            listNavbar.service = false
            listNavbar.project = false
            listNavbar.contact = false
            listNavbar.workus = false
        }
        if ( text === 'workus' )
        {
            listNavbar.chisiamo = false
            listNavbar.bonus = false
            listNavbar.service = false
            listNavbar.project = false
            listNavbar.contact = false
            listNavbar.workus = true
        }
        if ( text === 'contact' )
        {

            listNavbar.chisiamo = false
            listNavbar.bonus = false
            listNavbar.service = false
            listNavbar.project = false
            listNavbar.contact = true
            listNavbar.workus = false
        }
        return setNavbarMenu( listNavbar )

    }, [ listNavbar ] )


    useEffect(()=> {
        console.log(window?.scrollY,'DD')
    },[])

    return (

        <div className={ navbarDark ? 'navbarScroll' : 'navbar' }>
            <div className='logoDimension' >
                <Link onClick={ handle( '/' ) } href='/'>
                    {/* <Image priority='' onClick={ handle( '/' ) } alt='logo' src={ Logo } /> */ }
                    <p style={ { color: 'white', zIndex: 1000, opacity: '100%', paddingTop: 50, marginLeft: 80, fontSize: 100 } }>CASAVI</p>
                </Link>
            </div>
            <div className='hamburger' style={ { width: '100%', marginTop: -5 } }>
                <div className='dropdown-content' style={ { display: 'flex' } }>

                    <Link href='/chisiamo' onClick={ handle( 'chisiamo' ) } className={ listNavbar.chisiamo ? 'selectedText' : 'hoverableText' }>Chi siamo</Link>

                    <Link href="/project" onClick={ handle( 'project' ) } className={ listNavbar.project ? 'selectedText' : 'hoverableText' }>Realizzazioni</Link>
                    {/*                     <Link href="/bonus" onClick={ handle( 'bonus' ) } className={ listNavbar.bonus ? 'selectedText' : 'hoverableText' }>Superbonus</Link> */ }

                    <Link href='/service' onClick={ handle( 'service' ) } className={ listNavbar.service ? 'selectedText' : 'hoverableText' }>Servizi</Link>

                    <div className="dropdown">
                        <button className={ listNavbar.workus ? "dropbtnSelected" : "dropbtn" }>Lavora con noi</button>
                        <div className="dropdown-content">
                            <Link onClick={ handle( 'workus' ) } href="/workus/artigiani">Artigiano</Link>
                            <Link onClick={ handle( 'workus' ) } href="/workus/prof">Professionista</Link>
                            <Link onClick={ handle( 'workus' ) } href="/workus/noi">Lavorare da Casalvi</Link>

                        </div>
                    </div>
                    <Link onClick={ handle( 'contact' ) } href="/contact" className={ listNavbar.contact ? 'selectedText' : 'hoverableText' }>Contatti</Link>
                </div>
            </div>

        </div>

    )
}
export default Navbar;