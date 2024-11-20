import GoogleMapComponent from '../component/GoogleMapComponent'
import { Host_Grotesk, Poppins } from 'next/font/google';
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
} );
const Contact = () => {
    return (
        <div
            className="gradient2"
            style={ {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%',
            } }
        >
            <div style={{height:'100vh', width:'100%'}}>
            <GoogleMapComponent />
            <p className={italiana.className} style={{textAlign:'center', color:'white', padding:20}}>Via della Zarga, 42, Lavis 38015</p>
            </div>
        </div>
    )
}
export default Contact;