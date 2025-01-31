import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import Back from '../assets/villa.jpg'
import First from '../assets/cantieri/1.jpg'
import Sec from '../assets/cantieri/2.JPG'
import Third from '../assets/cantieri/3.jpg'
import Fourth from '../assets/cantieri/4.jpg'
import Fiveth from '../assets/cantieri/5.jpg'
import Sixth from '../assets/cantieri/6.jpeg'
import Seventh from '../assets/cantieri/7.jpg'
import Eight from '../assets/cantieri/8.jpeg'
const Realizzazioni = () =>
{
    const buttonStyle = {
        height: 50,
        width: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "100%",
        background: "black",
        opacity: 0.7,
        fontSize: "20px"
    };
    useEffect( () =>
    {
        AOS.init( {
            duration: 3000
        } );
        AOS.refresh();
    }, [] );

    return (
        <div
            className="gradient2"
            style={ {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%'
            } }
        >
            <div className='gradient3'></div>
            <div style={ { display: 'flex', alignItems: 'center', position: 'absolute', top: 0, justifyContent: 'center', width: '100vw', background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,0,0,1) 100%)', opacity: '40%', mixBlendMode: 'multiply' } }>
            </div>
            {/* <Image src={ HomeWork } style={ { width: '100%', height: '90vh', opacity:'10%', position:'absolute', zIndex:0 } } /> */ }
            <AwesomeSlider
                style={ { color: 'white', height: '100vh', marginTop: 20 } }
                organicArrows={ false }
                buttonContentRight={ <p style={ buttonStyle }>{ ">" }</p> }
                buttonContentLeft={ <p style={ buttonStyle }>{ "<" }</p> }
                play
                cancelOnInteraction={ false } // should stop playing on user interaction
                interval={ 6000 }
            >

                <div>

                    <Image src={ First } style={ { objectFit: 'contain', borderRadius: 10, zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
                <div>
                    <div style={ { backgroundColor: 'black', width: '80%', opacity: '80%', left: '10%', bottom: -140, right: 0, zIndex: '100', position: 'absolute' } }><p color="white">CIAO</p></div>
                    <Image src={ Sec } style={ { objectFit: 'contain', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
                <div>
                    <div style={ { backgroundColor: 'black', width: '80%', opacity: '80%', left: '10%', bottom: -140, right: 0, zIndex: '100', position: 'absolute' } }><p color="white"> CIAO</p></div>
                    <Image src={ Third } style={ { objectFit: 'contain', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
                <div>
                    <div style={ { backgroundColor: 'black', width: '80%', opacity: '80%', left: '10%', bottom: -140, right: 0, zIndex: '100', position: 'absolute' } }><p color="white"> CIAO</p></div>
                    <Image src={ Fourth } style={ { objectFit: 'contain', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
                <div>
                    <div style={ { backgroundColor: 'black', width: '80%', opacity: '80%', left: '10%', bottom: -140, right: 0, zIndex: '100', position: 'absolute' } }><p color="white"> CIAO</p></div>
                    <Image src={ Fiveth } style={ { objectFit: 'contain', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
                <div>
                    <div style={ { backgroundColor: 'black', width: '80%', opacity: '80%', left: '10%', bottom: -140, right: 0, zIndex: '100', position: 'absolute' } }><p color="white"> CIAO</p></div>
                    <Image src={ Sixth } style={ { objectFit: 'contain', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
                <div>
                    <div style={ { backgroundColor: 'black', width: '80%', opacity: '80%', left: '10%', bottom: -140, right: 0, zIndex: '100', position: 'absolute' } }><p color="white"> CIAO</p></div>
                    <Image src={ Seventh } style={ { objectFit: 'contain', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
                <div>
                    <div style={ { backgroundColor: 'black', width: '80%', opacity: '80%', left: '10%', bottom: -140, right: 0, zIndex: '100', position: 'absolute' } }><p color="white"> CIAO</p></div>
                    <Image src={ Eight } style={ { objectFit: 'contain', zIndex: '-1', width: '100vw', height: '100vh', } } alt='' />
                </div>
            </AwesomeSlider>

        </div>
    )
}
export default Realizzazioni;