import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import countries from '../component/menu/countries.json'
import { MenuItem, Select } from '@mui/material'
import emailjs, { send } from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'
export const UserFormLib = () =>
{
  const [ step, setStep ] = useState( 1 )
  const form = useRef();
  const [ confirmed, setConfirmed ] = useState( false )
  const [ formState, setForm ] = useState( {
    nomeCognome: '',
    email: '',
    città: '',
    language: '',
    tempoLavoro: '',
    aggiornamenti: '',
    qualificaCappotti: '',
    personale: '',
    mezziECapitali: '',
    assicurato: '',
    magazzini: '',
    CCNL: '',
    SOA: '',
    importoSOA: '',
    categoriaSOA: '',
    scontoFattura: ''
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
      email: '',
      città: '',
      language: '',
      tempoLavoro: '',
      aggiornamenti: '',
      qualificaCappotti: '',
      personale: '',
      mezziECapitali: '',
      assicurato: '',
      magazzini: '',
      CCNL: '',
      SOA: '',
      importoSOA: '',
      categoriaSOA: '',
      scontoFattura: ''
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
      <p style={ { marginLeft: '3%', fontSize: 30, fontWeight: 'bold', marginTop: 10 } }>Lavora con Noi(Artigiano)</p>
      <p style={ { marginLeft: '3%', fontSize: 16, marginTop: 10 } }>Inviaci questi dati per essere contattato!</p>
      <hr style={{border:'0.5px solid lightgrey ', width:'90%', marginTop:30}}></hr>
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
            <label>Città</label>

            <input defaultValue={ formState.città } onChange={ ( e ) => { setForm( { ...formState, città: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', border: '1px solid lightgrey' } } name="citta" />
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Lingua:</label>
            <Select value={ formState.language ?? '' } onChange={ ( e ) => { setForm( { ...formState, language: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="language" >
              {
                listNaztion ? listNaztion.map( ( item, index ) =>
                {
                  return <MenuItem style={ { borderBottom: '0.1px solid lightgrey' } } value={ item } key={ index }>{ item }</MenuItem>
                } ) : null
              }
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Da quanto tempo fai questo lavoro?</label>
            <Select value={ formState.tempoLavoro ?? '' } onChange={ ( e ) => { setForm( { ...formState, tempoLavoro: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none', } } name="tempoLavoro" >
              <MenuItem value='Più di 4 anni'>Più di 4 anni</MenuItem>
              <MenuItem value='Meni di 4 anni'>Meni di 4 anni</MenuItem>
              <MenuItem value='Da quando c è il Superbonus 110%'>Da quando c è il Superbonus 110%</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Da quanto personale assunto ti avvali?</label>
            <Select value={ formState.personale ?? '' } onChange={ ( e ) => { setForm( { ...formState, personale: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="personale" >
              <MenuItem value='nessuno'>Nessuno</MenuItem>
              <MenuItem value='1-2'>Da 1 a 2</MenuItem>
              <MenuItem value='3-5'>Da 3 a 5</MenuItem>
              <MenuItem value='5-10'>Da 5 a 10</MenuItem>
              <MenuItem value='10+'>Oltre i 10</MenuItem>
              <MenuItem value='imprese'>Mi appoggio ad altre imprese</MenuItem>
              <MenuItem value='ATI'>Opero in ATI (associaione temporanea imprese)</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Hai mezzi e capitali propri?</label>
            <Select value={ formState.mezziECapitali ?? '' } onChange={ ( e ) => { setForm( { ...formState, mezziECapitali: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="mezziECapitali" >
              <MenuItem value='10k'>Si per lavori fino a 10.000€</MenuItem>
              <MenuItem value='20k'>Si per lavori fino a 20.000€</MenuItem>
              <MenuItem value='30k'>Si per lavori fino a 30.000€</MenuItem>
              <MenuItem value='50k'>Si per lavori fino a 50.000€</MenuItem>
              <MenuItem value='80k'>Si per lavori fino a 80.000€</MenuItem>
              <MenuItem value='100k'>Si per lavori fino a 100.000€</MenuItem>
              <MenuItem value='100k+'>Si per lavori oltre a 100.000€</MenuItem>

            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Cosa fai per tenerti aggiornato?</label>

            <Select value={ formState.aggiornamenti ?? '' } onChange={ ( e ) => { setForm( { ...formState, aggiornamenti: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="aggiornamenti" >
              <MenuItem value='Frequento corsi con periodi di pratica della durata di un anno'>Frequento corsi con periodi di pratica della durata di un anno</MenuItem>
              <MenuItem value='Leggo manuale CORTEXA'>Leggo manuale CORTEXA</MenuItem>
              <MenuItem value='Sto valutando di fare un corso per certificare la mia azienda'>Sto valutando di fare un corso per certificare la mia azienda</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Hai l iscrizione SOA?</label>
            <Select value={ formState.SOA ?? '' } onChange={ ( e ) => { setForm( { ...formState, SOA: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="SOA" >
              <MenuItem value='si'>Si</MenuItem>
              <MenuItem value='no'>No</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Se sì per quale importo?</label>
            <input disabled={ formState.SOA === 'si' ? false : true } onChange={ ( e ) => { setForm( { ...formState, importoSOA: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: '1px solid lightgrey' } } name="importoSOA" />
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Se sì per quale categoria?</label>

            <Select value={ formState.categoriaSOA ?? '' } onChange={ ( e ) => { setForm( { ...formState, categoriaSOA: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="categoriaSOA" >
              <MenuItem value='OG1'>OG 1 EDIFICI CIVILI E INDUSTRIALI</MenuItem>
              <MenuItem value='OG2'>OG 2 RESTAURO E MANUTENZIONE DEI BENI IMMOBILI SOTTOPOSTI A TUTELA AI SENSI DELLE DISPOSIZIONI IN MATERIA DI BENI CULTURALI AMBIENTALI</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Sei qualificato posatore cappotti (ETICS)?</label>
            <Select value={ formState.qualificaCappotti ?? '' } onChange={ ( e ) => { setForm( { ...formState, qualificaCappotti: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="qualificaCappotti" >
              <MenuItem value='si'>Si</MenuItem>
              <MenuItem value='no'>No</MenuItem>
              <MenuItem value='Sto facendo il corso accreditato ACCREDIA'>Sto facendo il corso accreditato ACCREDIA</MenuItem>
              <MenuItem value='Sono interessato a qualificarmi'>Sono interessato a qualificarmi</MenuItem>
              <MenuItem value='Altro'>Altro</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Sei assicurato?</label>
            <Select value={ formState.assicurato ?? '' } onChange={ ( e ) => { setForm( { ...formState, assicurato: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="assicurato" >
              <MenuItem value='si'>Si</MenuItem>
              <MenuItem value='no'>No</MenuItem>
              <MenuItem value='in corso'>Lo sto facendo</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Con quali magazzini usualmente lavori?</label>
            <input placeholder='magazzini' onChange={ ( e ) => { setForm( { ...formState, magazzini: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: '1px solid lightgrey' } } type="email" name="magazzini" />
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Sei soggetto all attestazione CCNL?</label>

            <Select value={ formState.CCNL ?? '' } onChange={ ( e ) => { setForm( { ...formState, CCNL: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="CCNL" >
              <MenuItem value='si'>Si</MenuItem>
              <MenuItem value='no'>No ma sono disponibile a inviare la dichiarazione</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <label>Sei interessato allo sconto in fattura?</label>
            <Select value={ formState.scontoFattura ?? '' } onChange={ ( e ) => { setForm( { ...formState, scontoFattura: e.target.value } ) } } style={ { height: 40, width: '100%', padding: 10, borderRadius: 10, border: 'none' } } name="scontoFattura" >
              <MenuItem value='totale'>Si per la totale commessa</MenuItem>
              <MenuItem value='da concordare'>Si per una quota da concordare</MenuItem>
              <MenuItem value='no'>No</MenuItem>
            </Select>
          </div>
          <div style={ { display: 'flex', gap: 10, alignItems: 'center', flexDirection: 'column' } }>
            <p style={{visibility:'hidden'}}>.</p>
            <input style={ { backgroundColor: 'orange', cursor: 'pointer', width: '100%', marginBottom:40, padding: 10, height: 40, borderRadius: 10, textAlign: 'center', border: 'none' } } value='Invia' type='submit'></input>
          </div>


        </div>


      </form>
    </div>

  )


}

export default UserFormLib;


