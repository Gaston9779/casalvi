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

   


    return (
        <AgencyCrest/>
      
    );
};

export default KnowHow;
