import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AOS from 'aos';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Host_Grotesk } from 'next/font/google';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import Modal from '../component/Modal';
import { CSSProperties } from "react";
import emailjs, { send } from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLogged } from '../redux/ServiceSlice';

const hostGrotesk = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );

// Stile personalizzato per le celle della tabella
const StyledTableCell = styled( TableCell )( ( { theme } ) => ( {
    [ `&.${ tableCellClasses.head }` ]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [ `&.${ tableCellClasses.body }` ]: {
        fontSize: 14,
    },
} ) );

const StyledTableRow = styled( TableRow )( ( { theme } ) => ( {
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
} ) );

function createData ( idPrev, nomeClient, descWork, importoOfferto, scadAsta, status, note, pdf, )
{
    return { idPrev, nomeClient, descWork, importoOfferto, scadAsta, status, note, pdf, };
}

const Preventivi = () =>
{
    const [ rows, setRows ] = useState( [] );
    const [ isMobile, setIsMobile ] = useState( false );
    const [ modal, setOpen ] = useState( false );
    const [ modalEdit, setOpenEdit ] = useState( false );
    const [ modalCanc, setOpenCanc ] = useState( false );
    const [ modalPrev, setOpenPrev ] = useState( false );
    const [ row, setRow ] = useState( {
        idPrev: null,
        nomeClient: '',
        descWork: '',
        importoOfferto: '',
        scadAsta: '',
        status: false,
        note: '',
        pdf: null,
    } )
    const [ isClient, setIsClient ] = useState( false ); // Stato per identificare il client
    const logged = useSelector( ( state: any ) => state.service.log );
    const [ formState, setForm ] = useState( {
        idPrev: null,
        nomeClient: '',
        descWork: '',
        importoOfferto: '',
        scadAsta: '',
        status: false,
        note: '',
        pdf: null,
    } );

    // Funzione per recuperare i dati
    const fetchData = async () =>
    {
        try
        {
            const response = await fetch( '/api/quotes', {
                method: 'GET',
                headers: {
                    'x-role': 'admin', // Passa il ruolo nel header
                },
            } );
            // Verifica se la risposta è JSON
            const contentType = response.headers.get( "Content-Type" );

            if ( !response.ok )
            {
                console.error( `Errore HTTP: ${ response.status } ${ response.statusText }` );
                return;
            }

            // Se il tipo di contenuto è JSON, parse it
            if ( contentType && contentType.includes( "application/json" ) )
            {
                const data = await response.json();
                const formattedData = Array.isArray( data ) ? data.map( item =>
                    createData(
                        item.idPrev,
                        item.nomeClient,
                        item.descWork,
                        item.importoOfferto,
                        item.scadAsta,
                        item.status,
                        item.note,
                        item.pdf
                    )
                ) : [];
                setRows( formattedData );
            } else
            {
                // Gestisci caso in cui il contenuto non è JSON
                console.error( 'La risposta non è in formato JSON', await response.text() );
            }
        } catch ( error )
        {
            console.error( 'Errore nel fetch dei dati:', error );
        }
    };


    const checkWidth = useCallback( () =>
    {
        setIsMobile( window.innerWidth < 600 ); // corrected to window.innerWidth
    }, [] );

    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );
    const openModalPrev = () => setOpenPrev( true );
    const closeModalPrev = () => setOpenPrev( false );
    const openModalCanc = () => setOpenCanc( true );
    const closeModalCanc = () =>
    {
        setOpenCanc( false )
        setForm( {
            idPrev: null,
            nomeClient: '',
            descWork: '',
            importoOfferto: '',
            scadAsta: '',
            status: false,
            note: '',
            pdf: null,
        } )
    }
    const openModalEdit = () => setOpenEdit( true );
    const closeModalEdit = () =>
    {
        setOpenEdit( false )
        setForm( {
            idPrev: null,
            nomeClient: '',
            descWork: '',
            importoOfferto: '',
            scadAsta: '',
            status: false,
            note: '',
            pdf: null,
        } )
    }

    const downloadPDF = async ( id ) =>
    {
        try
        {
            const response = await fetch( `/api/quotes?id=${ id }`, {
                method: 'GET',
            } );

            if ( !response.ok )
            {
                throw new Error( 'Errore durante il download del PDF' );
            }

            // Ottieni i dati specifici
            const quotes = await response.json();
            const quote = quotes.find( ( item ) => item.idPrev === id );

            if ( !quote || !quote.pdf )
            {
                throw new Error( 'PDF non disponibile per questa quote' );
            }

            // Percorso completo del PDF
            let pdfUrl = quote.pdf;

            // Converti URL relativo in assoluto (se necessario)
            if ( !pdfUrl.startsWith( 'http' ) )
            {
                pdfUrl = `${ window.location.origin }/${ pdfUrl }`;
            }

            console.log( "URL generato per il download:", pdfUrl );

            // Effettua una nuova richiesta per ottenere il file
            const fileResponse = await fetch( pdfUrl );
            if ( !fileResponse.ok )
            {
                throw new Error( "Errore durante l'accesso al file PDF" );
            }

            const blob = await fileResponse.blob();

            // Ottieni il nome originale del file senza prefisso numerico
            const fileName = pdfUrl.split( '/' ).pop().replace( /^\d+/, '' );

            // Crea un URL temporaneo per il download
            const tempUrl = URL.createObjectURL( blob );

            // Crea l'elemento `<a>` per il download
            const link = document.createElement( 'a' );
            link.href = tempUrl;
            link.download = fileName;
            document.body.appendChild( link );
            link.click();

            // Pulisci l'URL temporaneo
            URL.revokeObjectURL( tempUrl );
            link.remove();
        } catch ( error )
        {
            console.error( error );
            alert( 'Errore durante il download del PDF' );
        }
    };




    const editPrev = async ( event ) =>
    {
        event.preventDefault(); // Per evitare che il form venga inviato in modo tradizionale

        const updatedPrev = {
            nomeClient: formState.nomeClient,
            descWork: formState.descWork,
            importoOfferto: formState.importoOfferto,
            scadAsta: formState.scadAsta,
            status: formState.status,
            note: formState.note,
            pdf: formState.pdf // se necessario (anche se sembra disabilitato)
        };

        try
        {
            const response = await fetch( `/api/quotes/${ formState.idPrev }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( updatedPrev ),
            } );
            const url = `/api/quotes?id=${ formState.idPrev }`;
            console.log( "Fetching URL: ", url );

            if ( response.ok )
            {
                // Successo, puoi chiudere la modale e aggiornare la lista dei preventivi
                alert( 'Preventivo aggiornato con successo!' );
                closeModalEdit(); // Chiudi la modale dopo l'aggiornamento
                fetchData()
                // Aggiungi qui la logica per aggiornare lo stato della lista dei preventivi
            } else
            {
                throw new Error( 'Errore nell\'aggiornamento del preventivo' );
            }
        } catch ( error )
        {
            console.error( 'Errore durante l\'aggiornamento del preventivo:', error );
        }
    };
    const deletePrev = async ( event ) =>
    {
        console.log( row, 'idPREV' );
        const response = await fetch( `/api/quotes?idPrev=${ row.idPrev }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        } );

        if ( response.ok )
        {
            // Gestisci il caso di successo
            closeModalCanc();
            fetchData();
            console.log( 'Quote eliminata con successo' );
        } else
        {
            // Gestisci l'errore
            console.error( 'Errore nella cancellazione della quote' );
        }
    };


    const handleSubmit = async ( e: React.FormEvent ) =>
    {
        e.preventDefault();

        // Verifica che ci sia un file PDF
        const fileInput = document.getElementById( 'pdf-input' ) as HTMLInputElement; // Type assertion

        if ( fileInput && fileInput.files && fileInput.files[ 0 ] )
        {
            const file = fileInput.files[ 0 ];

            // Crea un FormData per inviare il file
            const formData = new FormData();

            // Verifica che formState contenga valori validi (stringhe o numeri)
            formData.append( 'nomeClient', formState.nomeClient || '' ); // Aggiungi valore di default se manca
            formData.append( 'descWork', formState.descWork || '' ); // Aggiungi valore di default se manca
            formData.append( 'importoOfferto', formState.importoOfferto?.toString() || '' ); // Converte a stringa
            formData.append( 'scadAsta', formState.scadAsta || '' ); // Aggiungi valore di default se manca
            formData.append( 'status', formState.status ? 'true' : 'false' ) // Aggiungi valore di default se manca
            formData.append( 'note', formState.note || '' ); // Aggiungi valore di default se manca
            formData.append( 'pdf', file ); // Aggiungi il file direttamente

            try
            {
                const response = await fetch( '/api/quotes', {
                    method: 'POST',
                    body: formData, // Invia il FormData che contiene il file
                } );
                console.log( 'Risposta del serverA:', response );
                if ( response.ok )
                {
                    const newQuote = await response.json();
                    console.log( 'Nuova quote salvata:', newQuote );
                    setRows( ( prevRows ) => [
                        ...prevRows,
                        createData(
                            newQuote.idPrev,
                            newQuote.nomeClient,
                            newQuote.descWork,
                            newQuote.importoOfferto,
                            newQuote.scadAsta,
                            newQuote.status,
                            newQuote.note,
                            newQuote.pdf // Il backend restituirà il percorso del file
                        ),
                    ] );

                    closeModal();
                    fetchData();
                } else
                {
                    console.log( 'Errore nella richiesta:', response.status );
                }
            } catch ( error )
            {
                console.error( 'Errore di rete o altro:', error );
            }
        }
    };


    const regexDate = ( e ) =>
    {
        const usaDateTime = e; // Formato MM/DD/YYYY HH:MM:SS
        const euDateTime = usaDateTime.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, "$3/$2/$1 $4:$5");
        return euDateTime

    }

    const setDeleteRow = ( e ) =>
    {
        setOpenCanc( true )
        console.log( row, 'row', e )
        setRow( e )
    }

    const setSelectedRow = ( e ) =>
    {
        console.log( row, 'row', rows )
        openModalEdit();
        setRow( e );

        // Quando la riga viene selezionata, aggiorna i dati nel form
        setForm( {
            idPrev: e.idPrev,
            nomeClient: e.nomeClient,
            descWork: e.descWork,
            importoOfferto: e.importoOfferto,
            scadAsta: e.scadAsta,
            status: e.status,
            note: e.note,
            pdf: e.pdf,
        } );
    };

    const handleEmail = ( e ) =>
    {


        const destinatario = "casavi@info.com";
        const oggetto = encodeURIComponent( "Nuovo preventivo da inviare" );
        const corpo = encodeURIComponent(
            `Ciao Casavi,\n\nEcco i dettagli del preventivo:\n` +
            `- Nome: ${ e.idPrev }\n` +
            `- Descrizione: ${ e.descWork }\n` +
            `- Scadenza asta: ${ e.scadAsta }\n` +
            `- Stato: ${ e.status }\n` +
            `- Note: ${ e.note }\n` +
            `- PDF: ${ e.pdf }\n` +
            `- Importo offerto: ${ e.importoOfferto }\n\n` +
            `Grazie!`
        );

        const mailtoLink = `mailto:${ destinatario }?subject=${ oggetto }&body=${ corpo }`;
        window.location.href = mailtoLink;
    };



    useEffect( () =>
    {
        if ( row )
        {
            setForm( {
                idPrev: row.idPrev,
                nomeClient: row.nomeClient,
                descWork: row.descWork,
                importoOfferto: row.importoOfferto,
                scadAsta: row.scadAsta,
                status: row.status,
                note: row.note,
                pdf: row.pdf,
            } );
        }
    }, [ row ] );

    useEffect( () =>
    {

        AOS.init( {
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        } );
        AOS.refresh();
        checkWidth();
    }, [] );


    useEffect( () =>
    {
        fetchData();
        console.log( rows, 'rows' )
    }, [] )

    return (
        <div className="gradient2" style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px' } }>
             <div className='gradient3'style={{zIndex:'-1'}}></div>
            <div className={ hostGrotesk.className } style={ { display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '100px' } }>
                <div style={ {
                    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -1,
                } }>
                    <video
                        src="/video/particles.mp4"
                        muted
                        autoPlay
                        loop
                        preload="auto"
                        className="videoResponsive"
                        style={ {
                            width: '100%',
                            objectFit: 'cover',
                            opacity: 0.1,
                            height: '100vh',
                        } }
                    />
                    { isMobile && <video
                        src="/video/particles2.mp4"
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        className="videoRes"
                        style={ {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.1
                        } }
                    /> }
                </div>

                <div className='divFlexColumn'>
                    <h1 style={ { fontSize: 30, fontWeight: '900', color: '#333' } }>Aste</h1>
                    <div style={ { display: 'flex', gap: 20 } }>
                        <button onClick={ openModalPrev } style={ { border: '1.5px solid #ffffab', color: '#ffffab', fontWeight: '500' } } className="borderLight">Come fare un preventivo?</button>
                        <button onClick={ openModal } className="borderLight">Aggiungi preventivo +</button>
                    </div>
                </div>

                <TableContainer component={ Paper } style={ { maxWidth: '97%', margin: '20px 0', minHeight: '70vh' } }>
                    <Table sx={ { minWidth: 700 } } aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID cliente</StyledTableCell>
                                <StyledTableCell align="left">Descrizione</StyledTableCell>
                                <StyledTableCell align="left">Base d&apos;asta</StyledTableCell>
                                <StyledTableCell align="left">Scadenza Asta</StyledTableCell>
                                <StyledTableCell align="left">Stato</StyledTableCell>
                                <StyledTableCell align="left">Note</StyledTableCell>
                                <StyledTableCell align="left">PDF</StyledTableCell>
                                <StyledTableCell align="center">Modifica</StyledTableCell>
                                <StyledTableCell align="center">Cancella</StyledTableCell>
                                <StyledTableCell align="center">Fai offerta</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { rows.map( ( row, index ) => (
                                <StyledTableRow key={ index }>
                                    <StyledTableCell>Cliente: { row.idPrev }</StyledTableCell>
                                    <StyledTableCell align="left">{ row.descWork }</StyledTableCell>
                                    <StyledTableCell align="left">{ row.importoOfferto }</StyledTableCell>
                                    <StyledTableCell align="left">{ regexDate( row.scadAsta ) }</StyledTableCell>
                                    <StyledTableCell align="left">{ row.status ? '✅' : '❌' }</StyledTableCell>
                                    <StyledTableCell align="left">{ row.note }</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <button style={ { cursor: 'pointer' } } onClick={ () => downloadPDF( row.idPrev ) }>
                                            <Icon fontSize={ 20 } icon='teenyicons:pdf-outline' />
                                        </button>
                                    </StyledTableCell>
                                    <StyledTableCell onClick={ () => setSelectedRow( row ) } align="center">
                                        <Icon style={ { cursor: 'pointer' } } fontSize={ 20 } icon="material-symbols:edit-outline" />
                                    </StyledTableCell>
                                    <StyledTableCell onClick={ () => setDeleteRow( row ) } align="center">
                                        <Icon style={ { cursor: 'pointer' } } fontSize={ 20 } icon="material-symbols:delete-outline" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Icon style={ { cursor: 'pointer' } } onClick={ () => handleEmail( row ) } fontSize={ 30 } icon="lets-icons:send-duotone" />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) ) }
                        </TableBody>
                    </Table>
                </TableContainer>

                { <Modal title={ 'Crea preventivo' } text={ '' } isOpen={ modal } closeModal={ closeModal }>
                    <div className={ hostGrotesk.className }>
                        <div className={ hostGrotesk.className } style={ styles.formContainer }>
                            <form onSubmit={ handleSubmit } className='formStyleW'>
                                <div style={ styles.formGroup }>
                                    <label style={ styles.label }>Nome Cliente:</label>
                                    <input
                                        type="text"
                                        value={ formState.nomeClient }
                                        name='nomeClient'
                                        onChange={ ( e ) => setForm( { ...formState, nomeClient: e.target.value } ) }
                                        style={ styles.input }
                                    />
                                </div>

                                <div style={ styles.formGroup }>
                                    <label style={ styles.label }>Descrizione del lavoro:</label>
                                    <input
                                        type="text"
                                        name='workDesc'
                                        value={ formState.descWork }
                                        onChange={ ( e ) => setForm( { ...formState, descWork: e.target.value } ) }
                                        style={ styles.input }
                                    />
                                </div>

                                <div style={ styles.formGroup }>
                                    <label style={ styles.label }>Importo Offerto:</label>
                                    <input
                                        type="number"
                                        name='importoOfferto'
                                        value={ formState.importoOfferto }
                                        onChange={ ( e ) => setForm( { ...formState, importoOfferto: e.target.value } ) }
                                        style={ styles.input }
                                    />
                                </div>

                                <div style={ styles.formGroup }>
                                    <label style={ styles.label }>Scadenza Asta:</label>
                                    <input
                                        type="datetime-local"
                                        name='scadAsta'
                                        value={ formState.scadAsta }
                                        onChange={ ( e ) => setForm( { ...formState, scadAsta: e.target.value } ) }
                                        style={ styles.input }
                                    />
                                </div>

                                { logged.includes( 'admin' ) && <div style={ styles.formGroup }>
                                    <label style={ styles.label }>Status:</label>
                                    <input
                                        type="checkbox"
                                        name='status'
                                        checked={ formState.status }
                                        onChange={ ( e ) => setForm( { ...formState, status: e.target.checked } ) }
                                        style={ styles.checkbox }
                                    />
                                </div> }

                                <div style={ styles.formGroup }>
                                    <label style={ styles.label }>Note:</label>
                                    <input
                                        type="text"
                                        name='note'
                                        value={ formState.note }
                                        onChange={ ( e ) => setForm( { ...formState, note: e.target.value } ) }
                                        style={ styles.input }
                                    />
                                </div>

                                <div style={ styles.formGroup }>
                                    <label style={ styles.label }>PDF:</label>
                                    <input
                                        type="file"
                                        id="pdf-input" name="pdf"
                                        onChange={ ( e ) => setForm( { ...formState, pdf: e.target.files[ 0 ] } ) }
                                    />

                                </div>

                                <button type="submit" style={ styles.submitButton }>Invia</button>
                            </form>
                        </div>
                    </div>
                </Modal> }
                {
                    formState && <Modal title={ 'Modifica preventivo' } text={ '' } isOpen={ modalEdit } closeModal={ closeModalEdit }>
                        <div className={ hostGrotesk.className }>
                            <div className={ hostGrotesk.className } style={ styles.formContainer }>
                                <form onSubmit={ editPrev } className='formStyleW'>
                                    <div style={ styles.formGroup }>
                                        <label style={ styles.label }>Nome Cliente:</label>
                                        <input
                                            type="text"
                                            value={ formState.nomeClient }
                                            name='nomeClient'
                                            onChange={ ( e ) => setForm( { ...formState, nomeClient: e.target.value } ) }
                                            style={ styles.input }
                                        />
                                    </div>

                                    <div style={ styles.formGroup }>
                                        <label style={ styles.label }>Descrizione del lavoro:</label>
                                        <input
                                            type="text"
                                            name='workDesc'
                                            value={ formState.descWork }
                                            onChange={ ( e ) => setForm( { ...formState, descWork: e.target.value } ) }
                                            style={ styles.input }
                                        />
                                    </div>

                                    <div style={ styles.formGroup }>
                                        <label style={ styles.label }>Importo Offerto:</label>
                                        <input
                                            type="text"
                                            name='importoOfferto'
                                            value={ formState.importoOfferto }
                                            onChange={ ( e ) => setForm( { ...formState, importoOfferto: e.target.value } ) }
                                            style={ styles.input }
                                        />
                                    </div>

                                    <div style={ styles.formGroup }>
                                        <label style={ styles.label }>Scadenza Asta:</label>
                                        <input
                                            type="text"
                                            name='scadAsta'
                                            value={ formState.scadAsta }
                                            onChange={ ( e ) => setForm( { ...formState, scadAsta: e.target.value } ) }
                                            style={ styles.input }
                                        />
                                    </div>

                                    { logged.includes( 'admin' ) && <div style={ styles.formGroup }>
                                        <label style={ styles.label }>Status:</label>
                                        <input
                                            type="checkbox"
                                            name='status'
                                            checked={ formState.status }
                                            onChange={ ( e ) => setForm( { ...formState, status: e.target.checked } ) }
                                            style={ styles.checkbox }
                                        />
                                    </div> }

                                    <div style={ styles.formGroup }>
                                        <label style={ styles.label }>Note:</label>
                                        <input
                                            type="text"
                                            name='note'
                                            value={ formState.note }
                                            onChange={ ( e ) => setForm( { ...formState, note: e.target.value } ) }
                                            style={ styles.input }
                                        />
                                    </div>

                                    <div style={ styles.formGroup }>
                                        <label style={ styles.label }>PDF:</label>
                                        <input
                                            type="file"
                                            id="pdf-input"
                                            name="pdf"
                                            accept="application/pdf"
                                            onChange={ ( e ) => setForm( { ...formState, pdf: e.target.files[ 0 ] } ) }
                                        />
                                        { row.pdf ? (
                                            <p style={ { fontSize: '12px', color: 'red', width: '100%', maxWidth: 250, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' } }>
                                                { row.pdf }
                                            </p>
                                        ) : (
                                            <p style={ { fontSize: '16px', color: 'red' } }>
                                                Nessun PDF selezionato.
                                            </p>
                                        ) }
                                    </div>


                                    <button type="submit" style={ styles.submitButton }>Invia</button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                }
                {
                    <Modal title={ 'Sei sicuro di voler cancellare?<' } text={ '' } closeModal={ closeModalCanc } isOpen={ modalCanc } >
                        <div style={ { display: 'flex', flexDirection: 'column', gap: 20 } }>
                            <button className='borderLight' style={ { backgroundColor: 'salmon' } } onClick={ deletePrev }>Si?</button>
                        </div>
                    </Modal>
                }
                {
                    <Modal title={ 'Come funzionano i preventivi' } text={ '' } closeModal={ closeModalPrev } isOpen={ modalPrev } >
                        <div style={ { display: 'flex', flexDirection: 'column', gap: 20 } }>
                            <p style={ { textAlign: 'left' } }>
                                <b> ● Aggiunta di un nuovo preventivo:</b>  Per creare un nuovo preventivo, inserisci i seguenti dati richiesti:

                                Nome: Il titolo del preventivo che vuoi creare.
                                Descrizione: Una breve spiegazione del progetto o servizio associato al preventivo.
                                Base d&apos;asta: L&apos;importo iniziale di riferimento per l&apos;asta.
                                Note: Informazioni aggiuntive o specifiche che ritieni utili per il preventivo.
                                Scadenza dell &apos;asta: La data entro cui è possibile presentare un&apos;offerta.
                                PDF del computo metrico: Carica il file PDF contenente i dettagli tecnici e quantitativi del progetto.<br /><br></br>
                                <b>●  Accesso ai preventivi disponibili:</b> Una volta aggiunto, il preventivo sarà visibile nella tabella dell&apos;applicativo. Puoi scaricare il file PDF del computo metrico associato al preventivo per consultare i dettagli.<br />
                                <br></br>
                                <b>●  Invio della tua offerta:</b> Se vuoi partecipare all&apos;asta, puoi cliccare sul pulsante Invia Offerta. Questo pulsante ti consente di:

                                Aprire il tuo client di posta elettronica con un email precompilata contenente i dettagli del preventivo.
                                Aggiungere la tua offerta personalizzata direttamente nell’email.
                                Inviare l&apos;email a CASAVI per partecipare alla selezione.

                            </p>
                        </div>
                    </Modal>
                }

            </div>
        </div>
    );
};

const styles: { [ key: string ]: CSSProperties } = {
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },

    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '8px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '14px',
        marginBottom: '10px',
    },
    checkbox: {
        margin: '10px 0',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    }
};

export default Preventivi;
