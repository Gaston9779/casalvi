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
  weight: [ '300' ],
} );
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

    e.preventDefault()
    if ( !form.current )
    {
      toast.error( "Errore: il form non è definito!" );
      return;
    }
    const formData = new FormData( form.current );

    emailjs.sendForm( 'service_ail7z6h', 'template_srcpq6u', form.current, 'tWlhoCbuaXEAnriQ3' )
      .then( ( result ) =>
      {

        toast.success( 'Email inviata' )
        refreshForms()
      }, ( error ) =>
      {

        console.error( "Errore nell'invio:", error );
        toast.error( `Errore: ${ error.text || "Impossibile inviare l'email" }` );
      } );

  };


  const refreshForms = () =>
  {
    setForm( {
      ...formState,
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







  return (
    <div className={ italiana.className }>
      <ToastContainer />
      <div className='formStyle' style={ { height: '70vh' } }>
        <p style={ { marginLeft: '3%', fontSize: 30, fontWeight: 'bold', marginTop: 0, color: '#333' } }>Lavora con Noi(Professionista)</p>
        <p style={ { marginLeft: '3%', fontSize: 16, marginTop: 10 } }>Inviaci questi dati per essere contattato!</p>
        <hr style={ { border: '0.5px solid #333 ', width: '90%', marginTop: 30 } }></hr>
        <form ref={ form } onSubmit={ sendEmail } style={ { width: '90%', borderRadius: 10, marginTop: 0, marginBottom: 50 } } >
          <div className='userFormGrid' >

            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Nome e cognome:</label>
              <input value={ formState.nomeCognome } defaultValue={ formState.nomeCognome } onChange={ ( e ) => { setForm( { ...formState, nomeCognome: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', border: '1px solid #46464a', backgroundColor: 'transparent' } } name="nomeCognome" />
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Email</label>
              <input value={ formState.email } defaultValue={ formState.email } onChange={ ( e ) => { setForm( { ...formState, email: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', border: '1px solid #46464a', backgroundColor: 'transparent' } } name="email" />
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Telefono</label>

              <input value={ formState.telefono } defaultValue={ formState.telefono } onChange={ ( e ) => { setForm( { ...formState, telefono: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', border: '1px solid #46464a', backgroundColor: 'transparent' } } name="telefono" />
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Specializzazioni:</label>
              <Select value={ formState.specializzazioni ?? '' } onChange={ ( e ) => { setForm( { ...formState, specializzazioni: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="specializzazioni" >
                <MenuItem value='Termotecnico'>Termotecnico</MenuItem>
                <MenuItem value='Strutturista'>Strutturista</MenuItem>
                <MenuItem value='Architettura'>Architettura</MenuItem>
                <MenuItem value='Elettronica'>Elettronica</MenuItem>
                <MenuItem value='Estimatore'>Estimatore</MenuItem>
              </Select>
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Da quanto tempo fai questo lavoro?</label>
              <Select value={ formState.esercito_da ?? '' } onChange={ ( e ) => { setForm( { ...formState, esercito_da: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', } } name="esercito_da" >
                <MenuItem value='1Anno'>1Anno</MenuItem>
                <MenuItem value='5Anni'>5Anni</MenuItem>
                <MenuItem value='10Anni'>10Anni</MenuItem>
                <MenuItem value='10Anni+'>10anni o +</MenuItem>
              </Select>
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Polizza assicurativa?</label>
              <Select value={ formState.assicurato ?? '' } onChange={ ( e ) => { setForm( { ...formState, assicurato: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="assicurato" >
                <MenuItem value='si'>Si</MenuItem>
                <MenuItem value='no'>No</MenuItem>
                <MenuItem value='in corso'>Lo sto facendo</MenuItem>
              </Select>
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Disposto ad andare fuori regione?</label>
              <Select value={ formState.fuori_regione ?? '' } onChange={ ( e ) => { setForm( { ...formState, fuori_regione: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="fuori_regione" >
                <MenuItem value='SI'>SI</MenuItem>
                <MenuItem value='NO'>NO</MenuItem>

              </Select>
            </div>

            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Automunito</label>
              <Select value={ formState.automunito ?? '' } onChange={ ( e ) => { setForm( { ...formState, automunito: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="automunito" >
                <MenuItem value='si'>Si</MenuItem>
                <MenuItem value='no'>No</MenuItem>
              </Select>
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Software Grafico</label>
              <Select value={ formState.software ?? '' } onChange={ ( e ) => { setForm( { ...formState, software: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="software" >
                <MenuItem value='AutoCAD'>AutoCAD</MenuItem>
                <MenuItem value='Altro'>Altro</MenuItem>
                <MenuItem value='Altro2'>Altro2</MenuItem>
              </Select>
            </div>
            <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
              <label style={ { color: '#333' } }>Assevero</label>
              <Select value={ formState.assevero ?? '' } onChange={ ( e ) => { setForm( { ...formState, assevero: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="assevero" >
                <MenuItem value='SI'>Si</MenuItem>
                <MenuItem value='NO'>No</MenuItem>
              </Select>
            </div>

            <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'flex-end' } }>

              <input className='borderLight' style={ { width: '100%', border: '2px solid #333 ', color: '#333 ' } } value='Invia' type='submit'></input>
            </div>


          </div>


        </form>
      </div>
    </div>

  )


}

export default FormProfessional;


