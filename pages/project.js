import Image from "next/image";
import Before from '../assets/before.jpeg'
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import HomeWork from '../assets/work.jpeg'
import Cardproject from "../component/Cardproject";

const Realizzazioni = () =>
{
    useEffect( () =>
    {
        AOS.init({
            duration:3000
        });
        AOS.refresh();
    }, [] );

    return (
        <div style={ {opacity:'100%', paddingTop:'130px', display:'flex', flexDirection:'column', justifyContent:'space-around' } } >
            {/* <Image src={ HomeWork } style={ { width: '100%', height: '90vh', opacity:'10%', position:'absolute', zIndex:0 } } /> */}
            <div data-aos='fade-left' style={ { display: 'flex', justifyContent: 'space-between', paddingLeft: 70 } } >
                <div>
                    <h1 style={ { color: '#242930'} }>Realizzazioni</h1>
                    <hr style={ { width: 220, height: 7, backgroundColor: 'orange', border:'none' } }></hr>
                </div>
                <div></div>
            </div>
            <div data-aos='fade-left' className='gridTemplate'>
               <Cardproject categoria={'1'} />
               <Cardproject categoria={'2'} />
               <Cardproject categoria={'3'} />
               <Cardproject categoria={'4'} />
               <Cardproject categoria={'5'} />
               <Cardproject categoria={'6'} />
            </div>
        </div>
    )
}
export default Realizzazioni;