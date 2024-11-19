import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import FormArtesan from '../component/FormArtesan';
import FormProfessional from '../component/FormProfessional';
import FormWorkUs from '../component/FormWorkus';
import UserFormLib from '../component/UserForm';
import Modal from '../component/Modal';
import { width } from '@mui/system';
import { Host_Grotesk } from 'next/font/google';
import AOS from 'aos';

const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );


const ContactUs = ( { type } ) =>
{
    const [ eMail, setMail ] = useState( 'tecnico@casavi.it' )
    const [ eMailBy, setByMail ] = useState( '' )
    const [ message, setMessage ] = useState( '' )
    const [ selected, setSelected ] = useState( null )
    const [ name, setName ] = useState( '' )
    /*   const openModal = () => setSelected( true );  // Funzione per aprire il modal */

    const form = useRef();

    const openModal = ( e ) =>
    {
        setSelected( true )
        setName( e.target.getAttribute('data-name') )
    }
    const closeModal = () =>
    {
        setSelected( false )
        setName( '' )
    }

    useEffect(()=> {
        setName('art')
        setSelected(true)
    },[])
    useEffect( () =>
    {
        AOS.init();
        AOS.refresh()
    }, [] )


    return (
        <div className='gradient2' style={ { display: 'flex', alignItems: 'center', paddingTop: '100px', height: '100%', minHeight: '100vh', width: '100%', justifyContent: 'center', } }>
            <div className={ type === 'prof' ? 'backgroundColorProf' : 'backgroundColor' }></div>
            { <div data-aos={ 'fade-right' } className={italiana.className} style={ { display: 'flex', width: '90%', justifyContent: 'space-around', gap: 20, margin: 40 } }>
                <div data-name='art' onClick={ ( e ) => openModal( e ) } style={ { width: '100%', fontWeight:900, fontSize:20} } className={name === 'art' ? 'borderLight2' : 'borderLight'}>Artigiani</div>
                <div data-name='prof' onClick={ ( e ) => openModal( e ) } style={ { width: '100%', fontWeight:900, fontSize:20 } } className={name === 'prof' ? 'borderLight2' : 'borderLight'}>Professionisti</div>
                <div data-name='noi' onClick={ ( e ) => openModal( e ) } style={ { width: '100%' , fontWeight:900, fontSize:20} } className={name === 'noi' ? 'borderLight2' : 'borderLight'}>Lavora con noi</div>
            </div> }
           {/*  {
                selected && name === 'art' ? <UserFormLib /> : null
            }
            {
                selected && name === 'prof' ? <FormProfessional /> : null
            }
            {
                selected && name === 'noi' ? <FormWorkUs /> : null
            } */}
        </div>
    );
};
export default ContactUs;