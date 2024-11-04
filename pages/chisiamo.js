import Card from "../component/Card";
import Image from 'next/image';
import { useEffect, useState } from "react";
import GrazImage from '../public/images/graz.png';
import RikiImage from '../public/images/riki.png';
import PageProfile from '../component/PageProfile'
import { useDispatch, useSelector } from "react-redux";
import { sliderSlicer, setSlider } from "../redux/SliderSlice";
import { Italiana, Kode_Mono } from 'next/font/google';
import AgencyCrest from '../pages/agencyCrest'

const italiana = Italiana( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );

const kodeMono = Kode_Mono( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );


const KnowHow = () =>
{
    const data = [
        {
            id: 0,
            name: "Graziano Viola",
            image: GrazImage,
            description: "Desc graz",
            role: "Responsabile Tecnico"
        },
        {
            id: 1,
            name: "Riccardo Viola",
            image: RikiImage,
            description: "Desc Rik",
            role: "Tecnico"
        },
    ];

    const [ isClicked, setIsClicked ] = useState( false );
    const dispatch = useDispatch()
    const sliderValue = useSelector( ( state ) => state.slider.value );


    const stepNext = ( async () =>
    {
        await dispatch( setSlider( 1 ) )
    } )
    const stepPrevious = ( async () =>
    {
        await dispatch( setSlider( 0 ) )
    } )

    useEffect( () =>
    {
        console.log( sliderValue === 0 )
    }, [ sliderValue ] )


    return (
        <AgencyCrest/>
       /*  <div className='gradient' style={ { height: '100vh', position: 'fixed', width: '100%' } }>
            <div className={italiana.className} style={ { display: 'flex', alignItems: 'center', position: 'absolute', top: 0, justifyContent: 'center', width: '100vw', height: '100vh', background: 'linear-gradient(83deg, rgba(52,59,59,1) 0%, rgba(34,193,195,1) 48%, rgba(49,53,54,1) 100%)', opacity: '50%', mixBlendMode: 'multiply' } }>
            </div>
            { sliderValue === 0 && <PageProfile
                name="Graziano"
                surname="Viola"
                image= '/images/graz.png' 
                previousUser={ null }
                role="Responsabile"
                nextUser="Riccardo"
                nextHandle={ () => stepNext() }
                desc="Casavi nasce da Graziano Viola, geometra con una lunga esperienza in edilizia e immobiliare. Dopo aver fondato EDILVIOLA con il fratello, si specializza in progetti di sviluppo immobiliare e collabora con Gau Arena e RECONSULT per la progettazione di stadi. Nel 2019, fonda CASAVI, una rete d'imprese che unisce artigiani e professionisti per offrire soluzioni sinergiche e complete nel settore immobiliare trentino e altoatesino."/> }
            { sliderValue === 1 && <PageProfile
                name="Riccardo"
                surname="Viola"
                image={ '/images/riki.png'}
                nextUser={ null }
                role="Tecnico"
                previousUser="Graziano"
                prevHandle={ () => stepPrevious() }
                desc="Nasce con l&apos;obiettivo di AGGREGARE tramite partnership e stabili collaborazioni, società della filiera edilizia
                (professionisti, artigiani, commercianti) che operano sul mercato con proprie reti commerciali"
            /> }



        </div> */
    );
};

export default KnowHow;
