import Link from "next/link";

const Cardproject = ({categoria}) =>
{

    return (
        <Link href={`/project/${categoria}`} className='cardProj'>
            <div>

            </div>
            <div style={{backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', borderTop:'1px solid orange'}}>
                <p >{categoria}</p>
            </div>
        </Link>
    )
}
export default Cardproject;