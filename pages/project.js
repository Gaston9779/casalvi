import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Back from '../assets/villa.jpg'
const Realizzazioni = () =>
{
    useEffect( () =>
    {
        AOS.init( {
            duration: 3000
        } );
        AOS.refresh();
    }, [] );

    return (
        <div style={ { opacity: '100%', paddingTop: '110px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' } } className="gradient" >
            <div style={ { display: 'flex', alignItems: 'center', position: 'absolute', top:0, justifyContent: 'center', width: '100vw', height: '100vh', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,0,0,1) 100%)', opacity: '40%', mixBlendMode: 'multiply' } }>
            </div>
            {/* <Image src={ HomeWork } style={ { width: '100%', height: '90vh', opacity:'10%', position:'absolute', zIndex:0 } } /> */ }
            <AwesomeSlider style={ { height: '95%', marginTop:'-20px' } }>
                <div>
                    <div style={{backgroundColor:'black', width:'80%', height:'50vh', opacity:'80%', left:'10%', bottom:-140, mixBlendMode:'multiply', right:0, zIndex:'100', position:'absolute'}}><p>CIAO</p></div>
                     <Image src={ Back } style={ { objectFit: 'cover', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' /></div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </AwesomeSlider>

        </div>
    )
}
export default Realizzazioni;