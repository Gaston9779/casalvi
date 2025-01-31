import React, { useCallback, useEffect, useRef, useState } from "react";
import { Host_Grotesk } from "next/font/google";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from './Modal';

const italiana = Host_Grotesk( { subsets: [ "latin" ], weight: [ "800" ] } );

const CalcoloBagno = () =>
{
    const [ inputs, setInputs ] = useState( [
        { name: "LARGHEZZA", value: 0, edit: true, disabled: false },
        { name: "LUNGHEZZA", value: 0, edit: true, disabled: false },
        { name: "ALTEZZA", value: 0, edit: true, disabled: false },
        { name: "costoPiastrelle", value: 80, edit: false, disabled: true },
        { name: "costoDemolizionePiastrelle", value: 10, edit: false, disabled: true },
        { name: "costoDemolizioneMassetto", value: 15, edit: false, disabled: true },
        { name: "costoRifacimentoMassetto", value: 100, edit: false, disabled: true },
        { name: "costoDemolizioneIntonaci", value: 15, edit: false, disabled: true },
        { name: "percentualeDemolizioneIntonaci", value: 0, edit: true, disabled: false },
        { name: "costoRifacimentoIntonaci", value: 20, edit: false, disabled: true },
        { name: "numeroSanitari", value: 0, edit: true, disabled: false },
        { name: "costoSanitario", value: 400, edit: false, disabled: true },
        { name: "numeroDoccia", value: 0, edit: true, disabled: false },
        { name: "costoPiattodoccia", value: 900, edit: false, disabled: true },
        { name: "numeroVasca", value: 0, edit: true, disabled: false },
        { name: "costoVasca", value: 600, edit: false, disabled: true },
        { name: "numeroLavatrice", value: 0, edit: true, disabled: false },
        { name: "costoLavatrice", value: 250, edit: false, disabled: true },
        { name: "costoRimozioneSanitario", value: 15, edit: false, disabled: true },
        { name: "costoBox", value: 900, edit: false, disabled: true },
        { name: "numeroPuntiLuce", value: 0, edit: true, disabled: false },
        { name: "costoPuntoLuce", value: 30, edit: false, disabled: true },
        { name: "numeroPuntiComando", value: 0, edit: true, disabled: false },
        { name: "costoPuntiComando", value: 45, edit: false, disabled: true },
        { name: "numeroPuntiPresa", value: 0, edit: true, disabled: false },
        { name: "costoPuntiPresa", value: 50, edit: false, disabled: true },
        { name: "costoImpiantoIdraulico", value: 3000, edit: false, disabled: true },
        { name: "costoImpiantoElettrico", value: 500, edit: false, disabled: true },
        { name: "mobileBase", value: 0, edit: true, disabled: false },
        { name: "costomobileBase", value: 800, edit: false, disabled: true },
        { name: "mobileMedio", value: 0, edit: true, disabled: false },
        { name: "costomobileMedio", value: 1500, edit: false, disabled: true },
        { name: "mobileExtra", value: 0, edit: true, disabled: false },
        { name: "costomobileExtra", value: 2500, edit: false, disabled: true },
        { name: "costoSmaltimento", value: 30, edit: false, disabled: true },
        { name: "costoManodopera", value: 26, edit: false, disabled: true }
    ] );

    const [ selected, setSelected ] = useState( false );
    const [ error, setError ] = useState( false );
    const [ results, setResults ] = useState( { costoTotale: 0 } );
    const videoRef = useRef( null );
    const videoRefMob = useRef( null );
    const [ isMobile, setIsMobile ] = useState( false );
    const checkWidth = useCallback( () =>
    {
        setIsMobile( window.screen.width < 600 );
    }, [] );

    const openModal = () => setSelected( true );
    const closeModal = () => setSelected( false );

    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        const parsedValue = value === '' ? 0 : parseFloat( value );
        setInputs( ( prevState ) =>
            prevState.map( ( input ) =>
                input.name === name ? { ...input, value: parsedValue } : input
            )
        );
    };

    const calcolaCosto = () =>
    {
        const {
            LARGHEZZA, LUNGHEZZA, ALTEZZA, costoPiastrelle, costoDemolizionePiastrelle,
            costoDemolizioneMassetto, costoRifacimentoMassetto, costoDemolizioneIntonaci,
            percentualeDemolizioneIntonaci, costoRifacimentoIntonaci, numeroSanitari, costoSanitario,
            numeroDoccia, costoPiattodoccia, numeroVasca, costoVasca, numeroLavatrice, costoLavatrice,
            costoRimozioneSanitario, costoBox, numeroPuntiLuce, costoPuntoLuce, numeroPuntiComando,
            costoPuntiComando, numeroPuntiPresa, costoPuntiPresa, costoImpiantoIdraulico,
            costoImpiantoElettrico, mobileBase, costomobileBase, mobileMedio, costomobileMedio,
            mobileExtra, costomobileExtra, costoSmaltimento, costoManodopera
        } = inputs.reduce( ( acc, { name, value } ) => ( {
            ...acc,
            [ name ]: parseFloat( value ) || 0
        } ), {} );

        // Calcola le aree
        const areaPareti = ( LARGHEZZA * ALTEZZA * 2 ) + ( LUNGHEZZA * ALTEZZA * 2 ); // Aree delle pareti (2x larghezza e 2x lunghezza)
        const areaPavimento = LARGHEZZA * LUNGHEZZA; // Area del pavimento
        const areaDemolizioneIntonaci = areaPareti * ( percentualeDemolizioneIntonaci / 100 ); // Percentuale di demolizione intonaci

        /*  const demolizioni = areaPareti * costoDemolizionePiastrelle + areaPavimento * costoDemolizioneMassetto + areaDemolizioneIntonaci * costoDemolizioneIntonaci + ( areaPareti * 0.02 + areaPavimento * 0.1 + areaDemolizioneIntonaci * 0.02 ) * 2 * costoSmaltimento;
         const idraulico = ( numeroSanitari * costoSanitario ) + ( numeroSanitari * costoRimozioneSanitario ) + ( numeroDoccia * ( costoPiattodoccia + costoBox ) ) + ( numeroVasca * costoVasca ) + ( numeroLavatrice * costoLavatrice ) + costoImpiantoIdraulico */
        // Calcola il costo totale
        const costoTotale =
            ( areaPareti + areaPavimento ) * 1.1 * ( costoPiastrelle + costoManodopera ) +
            areaPareti * costoDemolizionePiastrelle +
            areaPavimento * costoDemolizioneMassetto +
            areaPavimento * costoRifacimentoMassetto +
            areaDemolizioneIntonaci * costoDemolizioneIntonaci +
            areaDemolizioneIntonaci * costoRifacimentoIntonaci +
            numeroSanitari * ( costoSanitario + costoRimozioneSanitario ) +
            numeroDoccia * ( costoPiattodoccia + costoBox ) +
            numeroVasca * costoVasca +
            numeroLavatrice * costoLavatrice +
            numeroPuntiLuce * costoPuntoLuce +
            numeroPuntiComando * costoPuntiComando +
            numeroPuntiPresa * costoPuntiPresa +
            costoImpiantoIdraulico +
            costoImpiantoElettrico +
            mobileBase * costomobileBase +
            mobileMedio * costomobileMedio +
            mobileExtra * costomobileExtra +
            ( areaPareti * 0.02 + areaPavimento * 0.1 + areaDemolizioneIntonaci * 0.02 ) * 2 * costoSmaltimento;

        if ( ALTEZZA && LARGHEZZA && ALTEZZA && percentualeDemolizioneIntonaci && numeroSanitari )
        {

            // Imposta il risultato e apri il modal
            setResults( { costoTotale } );

            openModal();
        } else {
            setError('Devi inserire tutti i campi tranne quelli a 0')
        }
    };

    function formatToEuro ( amount )
    {
        if ( typeof amount !== "number" )
        {
            throw new Error( "L'importo deve essere un numero" );
        }
        // Converti il numero in una stringa formattata
        return amount
            .toFixed( 2 ) // Aggiungi sempre due decimali
            .replace( /\d(?=(\d{3})+\.)/g, "$&." ) // Aggiungi punti come separatore delle migliaia
            .replace( ".", "," ); // Sostituisci il punto dei decimali con la virgola
    }


    useEffect( () =>
    {
        checkWidth();
        window.addEventListener( "resize", checkWidth );
        return () => window.removeEventListener( "resize", checkWidth );
    }, [ checkWidth ] );


    return (
        <div
        className="gradient2"
        style={ {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: '100vh'
        } }
    >
        <div className='gradient3'></div>
            <div className={ italiana.className } style={ { display: "flex", flexDirection: "column", marginTop: 30, gap: 20 } }>
                <div style={ {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    zIndex: -1,
                } }>
                    <video
                        src="/video/particles.mp4"
                        muted
                        autoPlay
                        loop
                        preload="auto"
                        className='videoResponsive'
                        ref={ videoRef }
                        style={ {
                            width: '100%',
                            objectFit: 'cover',
                            opacity: 0.1,
                            height: '100vh',
                            opacity: 0.1
                        } }
                    />
                    { isMobile && <video
                        src="/video/particles2.mp4"
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        ref={ videoRefMob }
                        className='videoRes'
                        style={ {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.1
                        } }
                    /> }
                </div>
                <div style={ { width: '95%', zIndex: 10 } } className="divCalc">
                    <div style={ { padding: 30, margin: 0, marginTop: 0, backgroundColor: 'rgba(255, 255, 255, 0.593)', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset', borderRadius: 20 } }>
                        <h1 style={ { paddingBottom: 10, paddingLeft: 10, color: '#333' } }>Calcola Rifacimento Bagno</h1>
                        <Box
                            component="form"
                            sx={ { "& .MuiTextField-root": { m: 1, width: "30vh" } } }
                            noValidate
                            autoComplete="off"
                        >

                            { inputs.filter( input => !input.disabled ).map( ( { name, value, edit } ) => (
                                <TextField
                                    key={ name }
                                    label={ name }
                                    name={ name }
                                    size="small"
                                    value={ value === 0 ? '' : value }  // Gestisce il caso in cui il valore è 0, per non mostrarlo come zero
                                    onChange={ handleChange }
                                    disabled={ false }
                                    id="outlined-required"
                                    fullWidth
                                    InputProps={ {
                                        readOnly: !edit,
                                    } }
                                    type="number"  // Forza il tipo numero per supportare i decimali
                                />
                            ) ) }




                        </Box>
                        { error && <p style={{color:'red', fontWeight:'600', paddingLeft:10}}>{error}</p>}
                        <button style={ { width: '210px', margin: 9, padding: 10, borderRadius: 5, border: '1px solid #333', cursor: 'pointer' } } onClick={ calcolaCosto }>Calcola</button>
                    </div>
                </div>
            </div>
            { selected &&

                <Modal isOpen={ openModal } closeModal={ closeModal }>
                    <div className={ italiana.className } style={ { padding: 20 } }>
                        <p style={ { fontWeight: 900, fontSize: 30 } }>Calcolo Bagno</p>
                        <p style={ { fontWeight: 900, fontSize: 40, color: 'lightgreen' } }>{ formatToEuro( results.costoTotale ) } €</p>
                        <a style={ { fontWeight: '300', textDecoration: 'underline' } }>Scopri come viene calcolato il totale!</a>
                    </div>
                </Modal>

            }
        </div>

    );
};

export default CalcoloBagno;
