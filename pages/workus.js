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
import 'aos/dist/aos.css';

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
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
          });
        AOS.refresh()
    }, [] )


    return (
        <div className='gradient2' style={ {display: 'flex', alignItems: 'center', paddingTop: '100px', gap:0, height: '100%', minHeight: '100vh', width: '100%', justifyContent: 'center'} }>
           {/*  <div className='backDiv'/>
            <img className='backImg' src='/images/bg-prof.jpg' alt=''/> */}
            <div className='hidden'>
           
            { <div data-aos={ 'fade-right' } className={italiana.className} style={ { display: 'flex', width: '100%', zIndex:10, flexDirection:'column', justifyContent: 'space-around', gap: 10, margin: 40 } }>
                <div data-name='art' onClick={ ( e ) => openModal( e ) } style={ { width: '100%', fontWeight:300, fontSize:15} } className={name === 'art' ? 'borderLight2' : 'borderLight'}>Artigiani</div>
                <div data-name='prof' onClick={ ( e ) => openModal( e ) } style={ { width: '100%', fontWeight:300, fontSize:15 } } className={name === 'prof' ? 'borderLight2' : 'borderLight'}>Professionisti</div>
                <div data-name='noi' onClick={ ( e ) => openModal( e ) } style={ { width: '100%' , fontWeight:300, fontSize:15} } className={name === 'noi' ? 'borderLight2' : 'borderLight'}>Lavora con noi</div>
            </div> }
            </div>
            <div className='hiddenMobile'>
           
            { <div data-aos={ 'fade-right' } className={italiana.className} style={ { display: 'flex', width: '90%', zIndex:10, justifyContent: 'space-around', gap: 20, margin: 40 } }>
                <div data-name='art' onClick={ ( e ) => openModal( e ) } style={ { width: '100%', fontWeight:900, fontSize:20} } className={name === 'art' ? 'borderLight2' : 'borderLight'}>Artigiani</div>
                <div data-name='prof' onClick={ ( e ) => openModal( e ) } style={ { width: '100%', fontWeight:900, fontSize:20 } } className={name === 'prof' ? 'borderLight2' : 'borderLight'}>Professionisti</div>
                <div data-name='noi' onClick={ ( e ) => openModal( e ) } style={ { width: '100%' , fontWeight:900, fontSize:20} } className={name === 'noi' ? 'borderLight2' : 'borderLight'}>Lavora con noi</div>
            </div> }
            </div>
           
            {
                selected && name === 'art' ? <UserFormLib /> : null
            }
            {
                selected && name === 'prof' ? <FormProfessional /> : null
            }
            {
                selected && name === 'noi' ? <FormWorkUs /> : null
            }
    
        </div>
    );
};
export default ContactUs;