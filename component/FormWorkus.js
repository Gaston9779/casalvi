import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import countries from '../component/menu/countries.json'
import { MenuItem, Select } from '@mui/material'
import emailjs, { send } from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'
import { Host_Grotesk, Poppins } from 'next/font/google';
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );
export const FormWorkUs = () =>
{
  const [ step, setStep ] = useState( 1 )
  const form = useRef();
  const [ confirmed, setConfirmed ] = useState( false )
  const [ formState, setForm ] = useState( {
    nomeCognome: '',
    email: '',
    telefono: '',
    titolo: '',
    specializzazioni: '',
    automunito: '',
    software: '',
  } )


  const exportWS = () =>
  {


    const myFile = "myFile.xlsx";
    const myWorkSheet = XLSX.utils.json_to_sheet( [ formState ] );
    const myWorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet( myWorkBook, myWorkSheet, "myWorkSheet" );
    XLSX.writeFile( myWorkBook, myFile );

    setConfirmed( true )
    setStep( 10 )
    setForm( {
      ...formState, nomeCognome: '',
      nomeCognome: '',
      email: '',
      telefono: '',
      titolo: '',
      automunito: '',
      software: '',
      specializzazioni: ''
    } )



  }

  const sendEmail = ( e ) =>
  {


    emailjs.sendForm( 'service_ail7z6h', 'template_srcpq6u', form.current, 'tWlhoCbuaXEAnriQ3' )
      .then( ( result ) =>
      {
     
        toast.success( 'OK' )
      }, ( error ) =>
      {
       
        toast.error( 'NO' )
      } );
   
  };


  // Proceed to next step
  const nextStep = () =>
  {
    if ( step < 5 )
    {
      setStep(
        step + 1
      );
    }
  };

  // Go back to prev step
  const prevStep = () =>
  {
    if ( step > 1 )
    {
      setStep(
        step - 1
      );
    }
  };

  // Handle fields change
  const handleChange = input => e =>
  {
    setForm( { [ input ]: e.target.value } );
  };

  const listNaztion = useMemo( () =>
  {
    let list = countries
    let arr = [ '' ]
    for ( const [ key, value ] of Object.entries( list ) )
    {

      arr.push( value.italian_country_name_1 )
    }
    return arr.filter( item => item !== undefined )
  }, [] )

  useEffect( () =>
  {
    formState.language
  }, [ formState, step ] )

  return (
    <div className={italiana.className} style={ { zIndex:10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', height:'100vh' } }>
      <p style={ { marginLeft: '3%', fontSize: 30, fontWeight: 'bold', marginTop: 0, color:'#333' } }>Lavora con Noi(Consulente)</p>
      <p style={ { marginLeft: '3%', fontSize: 16, marginTop: 10, fontWeight:300, textAlign:'center' } }>Scrivici una mail allegando le tue competenze e il CV a questo indirizzo:</p>
      <hr style={ { border: '0.5px solid #333 ', width: '90%', marginTop: 30 } }></hr>
      <p style={ { marginLeft: '3%', fontSize: 25, color:'#333', marginTop: 30 } }>info@studiostv.eu</p>
    </div>

  )


}

export default FormWorkUs;
