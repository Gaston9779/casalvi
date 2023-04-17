import Image from "next/image";
import After from "../assets/graz.jpeg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const Card = ( { typeCard, name, description, image, role } ) =>
{
    useEffect( () =>
    {
        AOS.init({
            duration:3000
        });
        AOS.refresh();
    }, [] );

    return (
        <div data-aos={ typeCard === 'left' ? 'fade-right' : 'fade-left'}  className={ typeCard === 'left' ? 'cardStyle' : 'cardRight' }>
            { typeCard === 'left' ? null : <Image alt="" style={ { backgroundSize:'contain', boxShadow:'1px 1px 13px lightgrey', height:'90%', borderRadius:10, width:'100%',overflow: 'hidden', objectFit:'cover' } } src={ image } /> }
            <div style={ { display: 'flex', flexDirection: 'column', padding: 30, justifyContent: 'space-between', height: 400, paddingLeft:65 } }>
                <div>
                    <h1 style={{color:'#141413'}}>{name}</h1>
                    <p style={ { marginTop: 20, color:'#141413', fontFamily:'Montserrat', flexWrap:'wrap', display:'flex', maxWidth: '80%', fontWeight:'400', fontSize:14 } }>{description}</p>
                </div>
                <p style={{color:'#141413', fontWeight:'600', fontFamily:'Syne'}}>{role}</p>
            </div>
            { typeCard === 'right' ? null : <Image priority='high' alt="image" style={ { overflow: 'hidden', backgroundSize:'contain', height:'90%',boxShadow:'1px 1px 13px lightgrey', objectFit:'cover',  borderRadius:10, width:'100%' }} src={image} /> }
        </div>
    )
}
export default Card;