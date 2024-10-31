import Card from "../component/Card";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Arrow from '../assets/arrow.png';
import GrazImage from './../assets/graz.jpeg';
import RikiImage from './../assets/riki.png';
import NikImage from './../assets/nik.jpeg';
import MarilenaImage from './../assets/marilena.jpeg';
import PageProfile from '../component/PageProfile'
import { useDispatch, useSelector } from "react-redux";
import { sliderSlicer, setSlider } from "../redux/SliderSlice";

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
        {
            id: 2,
            name: "Nicola Alessandrini",
            image: NikImage,
            description: "Desc Nik",
            role: "Responsabile Commerciale"
        },
        {
            id: 3,
            name: "Marilena Burli",
            image: MarilenaImage,
            description: "Desc Mari",
            role: "Responsabile Amministrativa"
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
        <div className='gradient' style={ { height: '100vh', position: 'fixed', width: '100%' } }>
            <div style={ { display: 'flex', alignItems: 'center', position: 'absolute', top:0, justifyContent: 'center', width: '100vw', height: '100vh', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,0,0,1) 100%)', opacity: '40%', mixBlendMode: 'multiply' } }>
            </div>
            { sliderValue === 0 && <PageProfile
                name="Graziano"
                surname="Viola"
                image={ GrazImage }
                previousUser={ null }
                role="Responsabile"
                nextUser="Riccardo"
                nextHandle={ () => stepNext() }
                desc="Nasce con l&apos;obiettivo di AGGREGARE tramite partnership e stabili collaborazioni, società della filiera edilizia
                (professionisti, artigiani, commercianti) che operano sul mercato con proprie reti commerciali"
            /> }
            { sliderValue === 1 && <PageProfile
                name="Riccardo"
                surname="Viola"
                image={ RikiImage }
                nextUser={ null }
                role="Tecnico"
                previousUser="Graziano"
                prevHandle={ () => stepPrevious() }
                desc="Nasce con l&apos;obiettivo di AGGREGARE tramite partnership e stabili collaborazioni, società della filiera edilizia
                (professionisti, artigiani, commercianti) che operano sul mercato con proprie reti commerciali"
            /> }



        </div>
    );
};

export default KnowHow;
