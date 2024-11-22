import React, { useEffect, useState } from 'react';
import { Host_Grotesk, Manrope } from 'next/font/google';
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );
const kode = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '800' ],
} );

const Counter = () =>
{
    const [ count, setCount ] = useState( 0 );
    const [ count2, setCount2 ] = useState( 0 );
    const [ count3, setCount3 ] = useState( 0 );

    useEffect( () =>
    {
        // Set up an interval to update the count every 100ms
        const interval = setInterval( () =>
        {
            setCount( prevCount =>
            {
                if ( prevCount >= 30 )
                {
                    clearInterval( interval ); // Stop when it reaches 30
                    return prevCount;
                }
                return prevCount + 1;
            } );
        }, 100 ); // Increment every 100ms

        // Clean up the interval when the component unmounts
        return () => clearInterval( interval );
    }, [] ); // Empty array means this effect runs once after the component mounts
    useEffect( () =>
    {
        // Set up an interval to update the count every 100ms
        const interval = setInterval( () =>
        {
            setCount2( prevCount =>
            {
                if ( prevCount >= 60 )
                {
                    clearInterval( interval ); // Stop when it reaches 30
                    return prevCount;
                }
                return prevCount + 1;
            } );
        }, 100 ); // Increment every 100ms

        // Clean up the interval when the component unmounts
        return () => clearInterval( interval );
    }, [] ); // Empty array means this effect runs once after the component mounts
    useEffect( () =>
    {
        // Set up an interval to update the count every 100ms
        const interval = setInterval( () =>
        {
            setCount3( prevCount =>
            {
                if ( prevCount >= 120 )
                {
                    clearInterval( interval ); // Stop when it reaches 30
                    return prevCount;
                }
                return prevCount + 1;
            } );
        }, 50 ); // Increment every 100ms

        // Clean up the interval when the component unmounts
        return () => clearInterval( interval );
    }, [] ); // Empty array means this effect runs once after the component mounts


    return (
        <div className='counterCard'>
            <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
                <p className={ italiana.className } style={ { fontWeight: 900, fontSize: 18 } }>Imprese</p>
                <p className={ kode.className } style={ {
                    fontWeight: 900, fontSize: 50, color: 'white', textShadow:'2px 2px 4px rgba(0, 0, 0, 0.1)'
                } }>{ count }</p>
            </div>
            <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
                <p className={ italiana.className } style={ { fontWeight: 900, fontSize: 18 } }>Dipendenti</p>
                <p className={ kode.className } style={ {
                    fontWeight: 900, fontSize: 50, color: 'white', textShadow:'2px 2px 4px rgba(0, 0, 0, 0.1)'
                } }>{ count2 }</p>
            </div>
            <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
                <p className={ italiana.className } style={ { fontWeight: 900, fontSize: 18 } }>Lavori eseguiti</p>
                <p className={ kode.className } style={ {
                    fontWeight: 900, fontSize: 50, color: 'white', textShadow:'2px 2px 4px rgba(0, 0, 0, 0.1)'
                } }>{ count3 }</p>
            </div>
        </div>
    );
};

export default Counter;
