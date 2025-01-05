import { useState, useEffect } from 'react';
import Modal from '../component/Modal';
import Link from 'next/link';
import { setLogged } from '../redux/ServiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

export default function LoginPage ( { listNavbar, isMobile } )
{
    const [ username, setUsername ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ error, setError ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ selected, setSelected ] = useState( false );
    const [ isClient, setIsClient ] = useState( false ); // Stato per identificare il client
    const logged = useSelector( ( state ) => state.service.log );
    const dispatch = useDispatch();

    const openModal = () => setSelected( true );
    const closeModal = () => setSelected( false );
    const Icon = dynamic( () => import( '@iconify/react' ).then( ( mod ) => mod.Icon ), { ssr: false } );

    // Ritarda il rendering lato client
    useEffect( () =>
    {
        setIsClient( true );
    }, [] );

    const handleSubmit = async ( event ) =>
    {
        event.preventDefault();
        setIsLoading( true );

        try
        {
            const response = await fetch( '/api/login', {
                method: 'POST',
                body: JSON.stringify( { username, password } ),
                headers: {
                    'Content-Type': 'application/json',
                },
            } );

            const data = await response.json();

            if ( response.ok )
            {
                localStorage.setItem( 'role', data.username );
                dispatch( setLogged( data.username ) );
                closeModal();
                setTimeout( () =>
                {
                    window.location.reload(); // Ricarica la pagina
                    // Oppure usa router.push() per navigare
                    // router.push('/dashboard'); // Sostituisci '/dashboard' con la tua destinazione
                }, 300 );
            } else
            {
                setError( data.message );
            }
        } catch ( error )
        {
            setError( 'An error occurred' );
        } finally
        {
            setIsLoading( false );
        }
    };

    useEffect( () =>
    {
        if ( isClient )
        {
            const storedRole = localStorage.getItem( 'role' );
            if ( storedRole && logged === '' )
            {
                dispatch( setLogged( storedRole ) );
            }
        }
    }, [ isClient, dispatch, logged ] );

    return (
        <div>
            {/* Ritarda il rendering fino a quando non siamo nel client */ }
            { isClient && logged.includes( 'casavi' ) ? (
              isClient && logged.includes( 'read' ) ? <div style={{border:'1px solid', display:'flex', justifyContent:'center', alignItems:'center', padding:10, borderRadius:100, background:'white'}}> <Icon icon={'icon-park:read-book'}/></div> :  <div style={{border:'1px solid', display:'flex', justifyContent:'center', alignItems:'center', padding:10, borderRadius:100, background:'white'}}> <Icon icon={'eos-icons:admin-outlined'}/></div> 
            ) : (
                <Link
                    href={ '/' }
                    onClick={ () => setSelected( true ) }
                    className={ listNavbar ? 'selectedText' : 'hoverableText' }
                    style={ { color: 'white', fontSize: isMobile ?  30 : 16 } }
                >
                    Login
                </Link>
            ) }

            { selected && (
                <Modal isOpen={ selected } closeModal={ closeModal }>
                    <form
                        style={ { display: 'flex', flexDirection: 'column', gap: 10 } }
                        onSubmit={ handleSubmit }
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            className="inputStyle"
                            value={ username }
                            onChange={ ( e ) => setUsername( e.target.value ) }
                        />
                        <input
                            type="password"
                            className="inputStyle"
                            placeholder="Password"
                            value={ password }
                            onChange={ ( e ) => setPassword( e.target.value ) }
                        />
                        <button
                            style={ { color: '#333', borderColor: '#333' } }
                            className="borderLight"
                            type="submit"
                            disabled={ isLoading }
                        >
                            { isLoading ? 'Logging in...' : 'Login' }
                        </button>
                    </form>
                </Modal>
            ) }

            { error && <div>{ error }</div> }
        </div>
    );
}
