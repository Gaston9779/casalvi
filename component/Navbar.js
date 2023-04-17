import Image from 'next/image';
import Logo from '../assets/casalvi.png'
import Link from 'next/link'
import { selectSlice, setService } from '../redux/ServiceSlice';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { store } from '../store';
import { useCallback, useEffect, useMemo, useState } from 'react';




const Navbar = () =>
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
        if ( text === 'chisiamo' )
        {
            listNavbar.chisiamo = true
            listNavbar.bonus = false
            listNavbar.service = false
            listNavbar.project = false
            listNavbar.contact = false
            listNavbar.workus = false
        }
        if ( text === '/' )
        {
            listNavbar.chisiamo = false
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

    useEffect( () =>
    {
        console.log(listNavbar,'list')
    }, [listNavbar] )

    return (

        <div className='navbar'>
            <Link className='logoDimension' href='/'><Image priority=''onClick={ handle( '/' ) } alt='logo' src={ Logo } /></Link>
            <div className='hamburger' style={ { width: '100%', } }>
                <div className='dropdown-content' style={ { display: 'flex' } }>
                    <div className="dropdown">
                        <Link href='/chisiamo' onClick={ handle( 'chisiamo' ) } className={ listNavbar.chisiamo ? 'selectedText' : 'hoverableText' }>Chi siamo</Link>
                    </div>
                    <Link href="/project" onClick={ handle( 'project' ) } className={ listNavbar.project ? 'selectedText' : 'hoverableText' }>Realizzazioni</Link>
                    <Link href="/bonus" onClick={ handle( 'bonus' ) } className={ listNavbar.bonus ? 'selectedText' : 'hoverableText' }>Superbonus</Link>
                    <div className="dropdown">
                        <button className={ listNavbar.service ? "dropbtnSelected" : "dropbtn" }>Servizi</button>
                        <div className="dropdown-content">
                            <Link onClick={ handle( 'service' ) } href="/service/ristrutturazioneresidenziale">Ristrutturazione residenziale</Link>
                            <Link onClick={ handle( 'service' ) } href="/service/ristrutturazionecommerciale">Ristrutturazione commerciale</Link>
                            <Link onClick={ handle( 'service' ) } href="/service/progettazione">Progettazione</Link>
                            <Link onClick={ handle( 'service' ) } href="/service/impianti">Impianti</Link>
                        </div>
                    </div>
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