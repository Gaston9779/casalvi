import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCallback, useMemo } from "react";

export default function PostPage ()
{

    const router = useRouter()
    const id = router.query.id

    const changeServiceNames = useMemo(() =>
    {
        let nameService
        if ( id === 'ristrutturazionecommerciale' )
        {
            nameService = 'Ristrutturazione Commerciale'
        }
        if ( id === 'ristrutturazioneresidenziale' )
        {
            nameService = 'Ristrutturazione Residenziale'
        }
        if ( id === 'progettazione' )
        {
            nameService = 'Progettazione'
        }
        if ( id === 'impianti' )
        {
            nameService = 'Impianti'
        }
        return nameService
    }, [id] )

    useEffect( () =>
    {
        AOS.init({
            duration:3000
        });
        AOS.refresh();
    }, [] );

    return (
        <div style={ { paddingLeft: 70, paddingTop: 130, paddingBottom:50, paddingRight:50, display:'flex', flexDirection:'column', height:'100vh', justifyContent:'space-between'} }>
            <div>
                <h1 style={ { color: '#242930' } }>{ changeServiceNames }</h1>
                <hr style={ { width: 330, height: 10, backgroundColor: 'orange', border: 'none' } } />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:0,justifyContent:'center'}}>
                <div data-aos='fade-left' >
                    <h1 style={{fontSize:28, fontWeight:'600'}}>Titolo</h1>
                    <p style={{ marginTop:20, fontSize:14, maxWidth:'80%', fontWeight:'300',color: '#242930', fontFamily:'Montserrat'}}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>
                </div>
                <div style={{backgroundColor:'orange',borderRadius:10}}>

                </div>
            </div>
            <div style={{  width:'100%', height:80, borderRadius:10, boxShadow:'1px 1px 13px lightgrey'}}></div>
        </div>
    )
}