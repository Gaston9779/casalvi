import Image from "next/image"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useEffect } from "react";



type Props = {
    image: any,
    name: string,
    surname: string,
    desc: string,
    role: string,
    nextUser?: string,
    previousUser?: string,
    nextHandle: () => void;
    prevHandle: () => void;
}
const PageProfile = ( { image, name, previousUser, nextHandle, prevHandle, surname, desc, role, nextUser }: Props ) =>
{
    useEffect( () =>
    {
        AOS.init();
    }, [] )

    return (
        <div style={ { display: 'flex', height: '100vh', marginTop: 30 } }>
            <div data-aos="fade-right">
                <div className="pageProfile">
                    <p className="name">{ name }</p>
                    <div style={ { display: 'flex', marginTop: '-30px', marginLeft: 12 } }>
                        <p className="name" style={ {color: 'whitesmoke', fontSize:130 } }>{ surname }</p>
                        <div className="roleDiv">
                            <p style={ { color: '#fadbb6', fontSize: 18 } }>{ role }</p>
                        </div>

                    </div>
                    <p className="descDiv" style={ { color: 'white', zIndex:100, marginLeft: 17, fontWeight: '400', width: '50%', lineHeight:'23px', fontSize:14} }>
                        { desc }</p>
                </div>
            </div>
            { name === 'Graziano' && <div className="imagDiv">
                { name === 'Graziano' && <img alt='' src={ image }  style={ { opacity:'60%', mixBlendMode:'multiply', transform:'scale(1)' } } /> }

            </div> }
            { name === 'Riccardo' && <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100vh', position: 'absolute', right: '-12%' } }>
                { <img loading="lazy"  alt='' src={ image }  style={ { mixBlendMode: 'multiply', transform: 'scale(3)', marginTop: '20%' } } /> }

            </div> }

            { nextUser !== null && <div onClick={ nextHandle } style={ { border: '1.5px solid white',  position: 'absolute', right: 40, bottom: 40, marginLeft: 50, marginTop: 140, borderRadius: '50px', padding: 20,  display: 'flex', justifyContent: 'center', alignItems: 'center', width:180 } }>
                <p className="animationText" style={ { color: 'white',  fontSize: 20 } }>{ nextUser } ⇀</p>
            </div> }

            { previousUser !== null && <div onClick={ prevHandle } style={ { border: '1.5px solid white',  position: 'absolute', left: 0, bottom: 40, marginLeft: 60, marginTop: 140, borderRadius: '50px', padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', width:180 } }>
                <p className="animationText" style={ { color: 'white',  fontSize: 20 } }>↼  { previousUser }</p>
            </div> }

        </div>
    )
}
export default PageProfile;