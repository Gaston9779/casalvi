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
                <div style={ { display: 'flex', flexDirection: 'column', marginTop: 100, marginLeft: 40 } }>
                    <p style={ { fontSize: 220, fontWeight: '900', color: '#e5d3b4',  zIndex:100} }>{ name }</p>
                    <div style={ { display: 'flex', marginTop: '-50px', marginLeft: 12 } }>
                        <p style={ { fontSize: 220, fontWeight: '900', color: 'whitesmoke',  zIndex:100 } }>{ surname }</p>
                        <div style={ { border: '1.5px solid white',  marginLeft: 50, marginTop: 140,  borderRadius: '50px', padding: 20, height: 70, display: 'flex', justifyContent: 'center', zIndex:100, alignItems: 'center' } }>
                            <p style={ { color: 'white',  fontSize: 25 } }>{ role }</p>
                        </div>

                    </div>
                    <p style={ { color: 'white',  zIndex:100, marginLeft: 17, fontWeight: '100', letterSpacing: '1.5px', width: '50%', lineHeight:'30px', fontSize:20} }>
                        { desc }</p>
                </div>
            </div>
            { name === 'Graziano' && <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100vh', position: 'absolute', right: 0 } }>
                { name === 'Graziano' && <Image alt='' src={ image } style={ { mixBlendMode: 'multiply' } } /> }

            </div> }
            { name === 'Riccardo' && <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end', height: '100vh', position: 'absolute', right: '-22%' } }>
                { <Image alt='' src={ image } style={ { mixBlendMode: 'multiply', transform: 'scale(2)', marginTop: '20%' } } /> }

            </div> }

            { nextUser !== null && <div onClick={ nextHandle } style={ { border: '1.5px solid white',  position: 'absolute', right: 40, bottom: 40, marginLeft: 50, marginTop: 140, borderRadius: '50px', padding: 30, height: 70, display: 'flex', justifyContent: 'center', alignItems: 'center', width:180 } }>
                <p className="animationText" style={ { color: 'white',  fontSize: 25 } }>{ nextUser } ⇀</p>
            </div> }

            { previousUser !== null && <div onClick={ prevHandle } style={ { border: '1.5px solid white',  position: 'absolute', left: 0, bottom: 40, marginLeft: 60, marginTop: 140, borderRadius: '50px', padding: 30, height: 70, display: 'flex', justifyContent: 'center', alignItems: 'center', width:180 } }>
                <p className="animationText" style={ { color: 'white',  fontSize: 25 } }>↼  { previousUser }</p>
            </div> }

        </div>
    )
}
export default PageProfile;