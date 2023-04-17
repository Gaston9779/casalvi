import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import countries from '../component/menu/countries.json'
import { MenuItem, Select } from '@mui/material'
import emailjs, { send } from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'
export const FormProfessional = () =>
{
  const [ step, setStep ] = useState( 1 )
  const form = useRef();
  const [ confirmed, setConfirmed ] = useState( false )
  const [ formState, setForm ] = useState( {
    nomeCognome: '',
    email: '',
    telefono: '',
    specializzazioni: '',
    esercito_da: '',
    aggiornamenti: '',
    fuori_regione: '',
    automunito: '',
    assicurato: '',
    software: '',
    assevero: '',
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
      specializzazioni: '',
      esercito_da: '',
      aggiornamenti: '',
      fuori_regione: '',
      automunito: '',
      assicurato: '',
      software: '',
      assevero: '',
    } )



  }

  const sendEmail = ( e ) =>
  {


    emailjs.sendForm( 'service_b7x350v', 'template_0dqj8li', form.current, 'ClL6E4q_ZPJZoHoP1' )
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
      <p style={ { marginLeft: '3%', fontSize: 30, fontWeight: 'bold', marginTop: 10 } }>Lavora con Noi(Professionista)</p>
      <p style={ { marginLeft: '3%', fontSize: 16, marginTop: 10 } }>Inviaci questi dati per essere contattato!</p>
      <hr style={ { border: '0.5px solid lightgrey ', width: '90%', marginTop: 30 } }></hr>
      <form ref={ form } onSubmit={ sendEmail } style={ { width: '90%', borderRadius: 10, marginTop: 0, marginBottom: 50 } } >
        <div className='userFormGrid' >

          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Nome e cognome:</label>
            <input defaultValue={ formState.nomeCognome } onChange={ ( e ) => { setForm( { ...formState, nomeCognome: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', border: '1px solid lightgrey' } } name="nomeCognome" />
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Email</label>
            <input defaultValue={ formState.email } onChange={ ( e ) => { setForm( { ...formState, email: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', border: '1px solid lightgrey' } } name="email" />
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Telefono</label>

            <input defaultValue={ formState.telefono } onChange={ ( e ) => { setForm( { ...formState, telefono: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', border: '1px solid lightgrey' } } name="telefono" />
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Specializzazioni:</label>
            <Select value={ formState.specializzazioni ?? '' } onChange={ ( e ) => { setForm( { ...formState, specializzazioni: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="specializzazioni" >
              <MenuItem value='Termotecnico'>Termotecnico</MenuItem>
              <MenuItem value='Strutturista'>Strutturista</MenuItem>
              <MenuItem value='Architettura'>Architettura</MenuItem>
              <MenuItem value='Elettronica'>Elettronica</MenuItem>
              <MenuItem value='Estimatore'>Estimatore</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Da quanto tempo fai questo lavoro?</label>
            <Select value={ formState.esercito_da ?? '' } onChange={ ( e ) => { setForm( { ...formState, esercito_da: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', } } name="esercito_da" >
              <MenuItem value='1Anno'>1Anno</MenuItem>
              <MenuItem value='5Anni'>5Anni</MenuItem>
              <MenuItem value='10Anni'>10Anni</MenuItem>
              <MenuItem value='10Anni+'>10anni o +</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Polizza assicurativa?</label>
            <Select value={ formState.assicurato ?? '' } onChange={ ( e ) => { setForm( { ...formState, assicurato: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="assicurato" >
              <MenuItem value='si'>Si</MenuItem>
              <MenuItem value='no'>No</MenuItem>
              <MenuItem value='in corso'>Lo sto facendo</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Disposto ad andare fuori regione?</label>
            <Select value={ formState.fuori_regione ?? '' } onChange={ ( e ) => { setForm( { ...formState, fuori_regione: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="fuori_regione" >
              <MenuItem value='SI'>SI</MenuItem>
              <MenuItem value='NO'>NO</MenuItem>

            </Select>
          </div>
          
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Automunito</label>
            <Select value={ formState.automunito ?? '' } onChange={ ( e ) => { setForm( { ...formState, automunito: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="automunito" >
              <MenuItem value='si'>Si</MenuItem>
              <MenuItem value='no'>No</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Software Grafico</label>
            <Select value={ formState.software ?? '' } onChange={ ( e ) => { setForm( { ...formState, software: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="software" >
              <MenuItem value='AutoCAD'>AutoCAD</MenuItem>
              <MenuItem value='Altro'>Altro</MenuItem>
              <MenuItem value='Altro2'>Altro2</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Assevero</label>
            <Select value={ formState.assevero ?? '' } onChange={ ( e ) => { setForm( { ...formState, assevero: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="assevero" >
              <MenuItem value='SI'>Si</MenuItem>
              <MenuItem value='NO'>No</MenuItem>
            </Select>
          </div>

          <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'flex-end' } }>

            <input style={ { backgroundColor: 'orange', cursor: 'pointer', width: '400px', padding: 10, height: 40, borderRadius: 10, textAlign: 'center', border: 'none' } } value='Invia' type='submit'></input>
          </div>


        </div>


      </form>
    </div>

  )


}

export default FormProfessional;


