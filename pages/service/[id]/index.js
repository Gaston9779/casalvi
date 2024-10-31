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
            
        </div>
    )
}