import { useCallback } from "react";
type Menu = {
    title: string;
    subtitle: string;
    id: number;
    active?: boolean; // La proprietà è opzionale
};
type Props = {
    list: Menu[],
    title: string,
    subtitle: string,
    active: boolean,
    id: number,
    handle: () => void;
}
const MiniSidebar = ( { id, title, list, handle, subtitle, active }: Props ) =>
{
    const services = [
        {
            name: 'Idraulico',
            id: 0,
            active: false,
        },
        {
            name: 'Elettricista',
            id: 1,
            active: false
        },
        {
            name: 'Muratori',
            id: 2,
            active: false
        },
        {
            name: 'Fotovoltaici',
            id: 3,
            active: false
        },
        {
            name: 'Tetti',
            id: 4,
            active: false
        },
        {
            name: 'Cappotti',
            id: 5,
            active: false
        },

    ]
    const handleSub = useCallback( ( item ) =>
    {

        // logica della funzione
     
    }, [] );
    return (
        <div style={ { width: '400px', cursor: 'pointer', position:'fixed', right: 50, textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 30 } }>

            { list?.map( ( item, index ) => (
                <div key={index}>
                    <p onClick={ () => handleSub( id ) } className="title">:: { item.title }</p>
                {/*     <p className="subtitle">-{ item.subtitle }</p> */}
                </div>
            ) ) }

        </div>
    )
}
export default MiniSidebar;