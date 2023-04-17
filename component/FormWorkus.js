import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import countries from '../component/menu/countries.json'
import { MenuItem, Select } from '@mui/material'
import emailjs, { send } from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'
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


    emailjs.sendForm( 'service_b7x350v', 'template_65sl4xj', form.current, 'ClL6E4q_ZPJZoHoP1' )
      .then( ( result ) =>
      {
        console.log( result.text, 'OK' );
        toast.success( 'OK' )
      }, ( error ) =>
      {
        console.log( error.text, 'error' );
        toast.error( 'NO' )
      } );
    console.log( formState, 'eem', e, form.current )
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
    console.log( step, 'step' )
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
    console.log( formState.aggiornamenti, 'use', formState.language )
  }, [ formState, step ] )

  return (
    <div style={ { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
      <p style={ { marginLeft: '3%', fontSize: 30, fontWeight: 'bold', marginTop: 10 } }>Lavora con Noi(Consulente)</p>
      <p style={ { marginLeft: '3%', fontSize: 16, marginTop: 10 } }>Scrivici una mail allegando le tue competenze e il CV a questo indirizzo:</p>
      <hr style={ { border: '0.5px solid lightgrey ', width: '90%', marginTop: 30 } }></hr>
      <p style={ { marginLeft: '3%', fontSize: 25, color:'orange', marginTop: 30 } }>tecnico@casalvi.it</p>
    </div>

  )


}

export default FormWorkUs;
