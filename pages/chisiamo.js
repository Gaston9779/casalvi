import Card from "../component/Card";
import Lottie from "lottie-react";
import lottiefile from '../assets/lottie.json'
import Image from 'next/image'
import { useEffect, useState } from "react";
import Arrow from '../assets/arrow.png'

const KnowHow = () =>
{
    const data = [
        {
            "id": 0,
            "name": "Graziano Viola",
            "image": require( "./../assets/graz.jpeg" ),
            "description": "Desc graz",
            "role": "Responsabile Tecnico"

        },
        {
            "id": 1,
            "name": "Riccardo Viola",
            "image": require( "./../assets/riki.jpeg" ),
            "description": "Desc Rik",
            "role": "Tecnico"

        },
        {
            "id": 2,
            "name": "Nicola Alessandrini",
            "image": require( "./../assets/nik.jpeg" ),
            "description": "Desc Nik",
            "role": "Responsabile Commerciale"

        },
        {
            "id": 3,
            "name": "Marilena Burli",
            "image": require( "./../assets/marilena.jpeg" ),
            "description": "Desc Mari",
            "role": "Responsabile Amministrativa"

        },
    ]
    const [ isClicked, setIsClicked ] = useState( false )

    return (
        <div className='gradient '>
            {/* <div className="backS"></div>

            <Lottie className="backLottie" animationData={ lottiefile } /> */}
            <div style={ { padding: '3%' } }>
                <p style={ { fontSize: 30, fontWeight: '600', color: 'orange', marginBottom: 20 } }>CASALVI è un gruppo Innovativo</p>
                <p style={ { width: '70%', fontSize: 20, lineHeight: 2, fontFamily: 'Montserrat' } }>Si configura come "aggregatore di reti d'impresa". <br />
                    Nasce con l'obiettivo di AGGREGARE tramite partnership e stabili
                    collaborazioni, società della filiera edilizia (professionisti, artigiani,
                    commercianti) che operano sul mercato con proprie reti commerciali.<br />
                    Reti commerciali già strutturate a livello locale, in modo da consentire ai propri
                    clienti (privati, imprese, ente pubblico) di essere canalizzati al loro interno.<br />
                    Casalvi ricerca <b>Aziende, Imprese e Professionisti</b>, che per le loro abilità e caratteristiche , rispondono all'
                    eccellenza sul mercato, ad unicità di prodotto ede sclusività nella tipologia del servizio.
                    La selezione avverrà secondo i "parametri d'ingresso" analizzati dal team commerciale della rete, successivamente
                    raggiunto l'accordo, l'Azienda/Professionista diviene <b>"Business Partner"</b> di RETE</p>
                <div style={ { display: 'flex', gap: 10, marginTop: 20 } }>
                    <button className="buttonStyle" >Vedi contratto di Rete</button>
                    <button className="buttonStyle" style={ { border: '1px solid black' } }>Vedi dipendenti rete</button>
                </div>
            </div>

            <div style={ { display: 'flex', padding: 30, alignItems: 'center', } }>
                <Image alt='' style={ { height: '100%' } } src={ Arrow } />
                <div style={ { display: 'flex', flexDirection: 'column', gap: 30 } }>
                    <p style={ { fontSize: 30, fontWeight: 'bold' } }>Cosa succede poi?</p>
                    <p style={ { fontSize: 20, width: '90%', lineHeight: 2, fontFamily: 'Montserrat' } }>Tramite
                        il "database
                        gestionale CASALVI" i contatti
                        vengono posti in "match" per
                        poter intercettare interessi
                        commerciali tra i contatti,
                        promuovere le loro richieste e
                        veicolare il loro business
                        all'interno delle reti d'impresa.</p>
                </div>
            </div>

            { isClicked &&
                data.map( ( item, index ) =>
                {
                    return <div className={ item.id % 2 === 0 ? 'leftSabiri' : 'rightSab' } key={ index }><Card typeCard={ item.id % 2 === 0 ? 'left' : 'right' } role={ item.role } name={ item.name } image={ item.image } description={ item.description } /></div>
                } )
            }
        </div>

    )
}
export default KnowHow;