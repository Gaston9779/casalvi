import { useEffect } from 'react';
import MiniSidebar from '../component/MiniSidebar';
import ParallaxCard from '../component/ParallaxCard'

const listina = [
    { id: 0, title: 'Idraulico', subtitle: 'Bla bla', sub: 'idraaa' },
    { id: 1, title: 'Elettricista', subtitle: 'Bla IDAS', sub: 'eleee' },
    { id: 2, title: 'Muratori', subtitle: 'Bla bla', sub: 'muraaa' },
    { id: 3, title: 'Tetti', subtitle: 'Bla IDAS', sub: 'tettiii' },
    { id: 4, title: 'Cappotti', subtitle: 'Bla bla', sub: 'caaap' },
    { id: 5, title: 'Pannelli', subtitle: 'Bla IDAS', sub: 'paaa' },
];

const ServicePages = ( { serviceLabel } ) =>
{

    const handleSidebar = ( ( item, index ) =>
    {
        console.log( 'we' )
    }, [] )

    return (
        <div
            className="gradient2"
            style={ {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent:'center'
            } }
        >
            {/* Background Gradient Overlay */ }
            <div
                style={ {
                    position: 'absolute',
                    top: 0,
                    width: '100vw',
                    height: '150vh',
                    background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(0,0,0,1) 100%)',
                    opacity: 0.3,
                    mixBlendMode: 'multiply'
                } }
            />

            {/* Heading Section */ }
            <div
                style={ {
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 70,
                } }
            >
                <p
                    style={ {
                        fontSize: 50,
                        fontWeight: '900',
                        color: 'white',
                        zIndex: 1,
                        textAlign:'center'
                    } }
                >
                    Professionalità e innovazione,
                </p>
                <p
                    style={ {
                        fontSize: 80,
                        fontWeight: '900',
                        color: '#e5d3b4',
                        zIndex: 1,
                        textAlign:'center'
                    } }
                >
                    tutto in un unico team
                </p>
                <div style={{marginTop:-100}}>
                    <ParallaxCard />
                </div>

            </div>

            {/* Sidebar Items */ }
            {/* <div style={ { zIndex: 1000, top: 200, right: 0, position: 'absolute', display: 'flex', flexDirection: 'column', gap: 40 } }>

                <MiniSidebar
                    list={ listina }
                    active={ false } // Impostiamo un valore predefinito per active
                />

            </div> */}

        </div>
    );
};

export default ServicePages;
