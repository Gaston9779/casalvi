import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectSlice, setHoverText } from "../redux/ServiceSlice"
import { Italiana, DM_Serif_Text } from 'next/font/google';
const kode = DM_Serif_Text( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );
type Props = {
    selected: boolean
}
const ColumnChart = ( { selected }: Props ) =>
{
    const [ isHover, hoverable ] = useState( '' )
    const indice = useSelector( ( state:any ) => state.service.indice);
    const serviceValue = useSelector(selectSlice);
    const dispatch = useDispatch()
    useEffect( () =>
    {
        const elements = document.querySelectorAll( '.worksCard' );

        elements.forEach( element =>
        {
          
            // Aggiungi la classe 'hovered' quando il mouse entra
            element.addEventListener( 'mouseenter', ( event: any ) =>
            {
                /* hoverable( true ) */
                dispatch(setHoverText(event.target.textContent))
                hoverable( event.target.textContent )
                console.log(indice,'indice')
            } );

            // Rimuovi la classe 'hovered' quando il mouse esce
            element.addEventListener( 'mouseleave', ( event ) =>
            {
              
               /*  hoverable( 'Match' ) */
                /*  hoverable( false ) */
                console.log( 'DIshover', event.target );
            } );
          /*   if(indice === '') {
                dispatch(setHoverText('Match'))
            } */
        } );
    }, [] )

    useEffect(()=> {
        console.log(indice,'indice')
    },[indice])

    return (
        <div className="containerWorks" >
            <div content="Match" className="worksCard">
                <div className={ !isHover.includes( 'Match' ) ? "card_work" : "card_work_selected" }>
                    <img src="/images/worker.png" width={ '100%' } alt="" />

                </div>
                <div style={ { display: 'flex', alignItems: 'center', gap: 10 } }>
                    <p className={kode.className} style={ { fontSize: 30, color:'#333'} }> 1 </p>
                    <p className="textHover"> Match</p>
                </div>
            </div>
            <div content="Interess" className="worksCard">
                <div className={ !isHover.includes( 'Interessi' ) ? "card_work" : "card_work_selected" }>
                    <img src="/images/worker.png" width={ '100%' } alt="" />

                </div>
                <div style={ { height: '30px', width: '30px' } } className="graphWorks">

                </div>
                <div style={ { display: 'flex', alignItems: 'center', gap: 10 } }>
                    <p className={kode.className} style={ { fontSize: 30 } }> 2 </p>
                    <p className="textHover">Interessi</p>
                </div>

            </div>
            <div content="Collaborazioni" className="worksCard">
                <div className={ !isHover.includes( 'Collaborazioni' ) ? "card_work" : "card_work_selected" }>
                    <img src="/images/worker.png" width={ '100%' } alt="" />
                </div>
                <div style={ { height: '40px', width: '40px' } } className="graphWorks">

                </div>
                <div style={ { display: 'flex', alignItems: 'center', gap: 10 } }>
                    <p className={kode.className} style={ { fontSize: 30 } }> 3 </p>
                    <p className="textHover">Collaborazioni</p>
                </div>


            </div>
            <div content="Tempistiche" className="worksCard">
                <div className={ !isHover.includes( 'Tempistiche' ) ? "card_work" : "card_work_selected" }>
                    <img src="/images/worker.png" width={ '100%' } alt="" />
                </div>
                <div style={ { height: '50px', width: '50px' } } className="graphWorks">

                </div>
                <div style={ { display: 'flex', alignItems: 'center', gap: 10 } }>
                    <p className={kode.className} style={ { fontSize: 30 } }> 4 </p>
                    <p className="textHover">Tempistiche</p>
                </div>

            </div>
        </div>
    )
}
export default ColumnChart;