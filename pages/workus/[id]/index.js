import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCallback, useMemo } from "react";
import ContactUs from '../../workus';

export default function Workus ()
{

    const router = useRouter()
    const id = router.query.id

    const sectorForm = useMemo(() =>
    {
        let nameService
        if ( id === 'artigiani' )
        {
            nameService = 'artigiani'
        }
        if ( id === 'prof' )
        {
            nameService = 'prof'
        }if ( id === 'noi' )
        {
            nameService = 'noi'
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
       <ContactUs type={sectorForm}/>
    )
}