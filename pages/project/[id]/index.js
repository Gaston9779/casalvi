import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCallback, useMemo } from "react";
import Before from '../../../assets/before.jpeg'
import After from '../../../assets/after.jpeg'
import
{
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'
import 'react-reflex/styles.css'
import Image from 'next/image';

export default function ProjectPage ()
{

    const router = useRouter()
    const id = router.query.id



    useEffect( () =>
    {
        AOS.init( {
            duration: 3000
        } );
        AOS.refresh();
    }, [] );

    return (
        <div style={ { paddingLeft: 100, paddingTop: 120, paddingRight: 50, display: 'flex', flexDirection: 'column', height:'100vh' } }>
            <p>CATEGORIA{ router.query.id }</p>
            <ReflexContainer orientation="vertical" style={{paddingBottom:20}}>

                <ReflexElement style={ { backgroundColor: 'cyan' } } className="left-pane">
                    <div className="pane-content" style={ { overflowY: 'hidden', height: '100%' } }>
                        <Image alt='' src={ Before } style={ { height: '100%', objectFit:'cover', overflowY: 'hidden' } } />
                    </div> 
                </ReflexElement>

                <ReflexSplitter style={ {  backgroundColor: 'white', width: 10 } } />

                <ReflexElement style={ {backgroundColor: 'red' } } className="right-pane">
                    <div className="pane-content" style={ { overflowY: 'hidden', height: '100%' } }>
                        <Image alt='' src={ After } style={ { height: '100%',objectFit:'cover', overflowY: 'hidden' } } />
                    </div>
                </ReflexElement>

            </ReflexContainer>

        </div >
    )
}