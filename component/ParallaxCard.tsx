import Tilt from 'react-parallax-tilt';
import { Host_Grotesk, Kode_Mono } from 'next/font/google';
import { useState } from 'react';
import Modal from './Modal';
import { ElettricistaText, IdraulicoText, PavimentiText, FotovoltaiciText, TettiText, CappottiText } from '../utils/utils'
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '400' ],
} );

const ParallaxCard = () =>
{
    const [ selected, setSelected ] = useState( null )
    const [ name, setName ] = useState( '' )
    const [ text, setText ] = useState( '' )
    /*   const openModal = () => setSelected( true );  // Funzione per aprire il modal */
    const openModal = ( e ) =>
    {
        setSelected( true )
        setName( e.target.name )
        switch ( e.target.name )
        {
            case 'Idraulico':
                return setText( IdraulicoText )
            case 'Elettricista':
                return setText( ElettricistaText )
            case 'Fotovoltaici':
                return setText( FotovoltaiciText )
            case 'Pavimenti':
                return setText( PavimentiText )
            case 'Cappotti':
                return setText( CappottiText )
            case 'Tetti':
                return setText( TettiText )
            default:
                setText( '' )
        }
        console.log( text, 'text', e.target.name )
    }
    const closeModal = () =>
    {
        setSelected( false )
        setName( '' )
        setText( '' )
    }

    /*   const closeModal = () => setSelected( false );  // Funzione per chiudere il modal */


    return <div className="container__cards" style={ { overflowY: 'hidden', overflowX: 'hidden' } } >
        <div className='invertResponsive'>
            <Tilt
                tiltMaxAngleX={ 7 }  // Movimenti delicati
                tiltMaxAngleY={ 7 }    // Leggero ingrandimento all'hover
                transitionSpeed={ 250 }  // Transizione fluida
            >
                <div className="cardM">
                    <div className="coverM">
                        <img loading="lazy" style={ { transform: 'scale(0.8)', zIndex: 4, top: -30, width: '80%', height: '100%' } } alt='' src={ '/images/facility.png' } />
                        <div className="img__backM"></div>
                    </div>
                    <div className="descriptionM">
                        <h2>Casavi facility manager</h2>
                        <p>Stai pensando di costruire casa o di fare una ristrutturazione massiccia? Vorresti una persona che si prenda la responsabilità e si occupi di creare e gestire un team adatto alle tue esigenze?</p>
                        <input onClick={ openModal } name='Idraulico' className={ italiana.className } style={ { width: '100%', fontWeight: '300', fontSize: 16 } } type="button" value="Details" />
                    </div>
                </div>
            </Tilt>
        </div>
        <Tilt
            tiltMaxAngleX={ 7 }  // Movimenti delicati
            tiltMaxAngleY={ 7 }    // Leggero ingrandimento all'hover
            transitionSpeed={ 250 }  // Transizione fluida
        >
            <div className="card">
                <div className="cover">
                    <img loading="lazy" style={ { transform: 'scale(1)', zIndex: 4, top: 30, width: '80%', height: '100%' } } alt='' src={ '/images/elet.png' } />
                    <div className="img__back"></div>
                </div>
                <div className="description">
                    <h2>Idraulico</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                    <input onClick={ openModal } name='Idraulico' className={ italiana.className } style={ { width: '100%', fontWeight: '300', fontSize: 16 } } type="button" value="Details" />
                </div>
            </div>
        </Tilt>

        <Tilt
            tiltMaxAngleX={ 7 }  // Movimenti delicati
            tiltMaxAngleY={ 7 }    // Leggero ingrandimento all'hover
            transitionSpeed={ 250 }  // Transizione fluida
        >
            <div className="card">
                <div className="cover" >
                    <img style={ { transform: 'scale(1)', zIndex: 4, top: 40, width: '80%', height: '100%' } } alt='' src={ '/images/plub.png' } />
                    <div className="img__back"></div>
                </div>
                <div className="description">
                    <h2>Elettricista</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                    <input onClick={ openModal } name='Elettricista' className={ italiana.className } style={ { width: '100%', fontWeight: '300', fontSize: 16 } } type="button" value="Details" />
                </div>
            </div>
        </Tilt>
        <Tilt
            tiltMaxAngleX={ 7 }  // Movimenti delicati
            tiltMaxAngleY={ 7 }    // Leggero ingrandimento all'hover
            transitionSpeed={ 250 }  // Transizione fluida
        >
            <div className="card">
                <div className="cover">
                    <img loading="lazy" style={ { transform: 'scale(1)', zIndex: 4, width: '90%', top: 30, height: '100%' } } width={ 600 } height={ 300 } alt='' src={ '/images/solar.png' } />
                    <div className="img__back"></div>
                </div>
                <div className="description">
                    <h2>Fotovoltaici</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                    <input onClick={ openModal } name='Fotovoltaici' className={ italiana.className } style={ { width: '100%', fontWeight: '300', fontSize: 16 } } type="button" value="Details" />
                </div>
            </div>
        </Tilt>
        <Tilt
            tiltMaxAngleX={ 7 }  // Movimenti delicati
            tiltMaxAngleY={ 7 }    // Leggero ingrandimento all'hover
            transitionSpeed={ 250 }  // Transizione fluida
        >
            <div className="card">
                <div className="cover">
                    <img loading="lazy" style={ { transform: 'scale(1)', zIndex: 4, width: '84%', top: 30, height: '100%' } } alt='' src={ '/images/pav.png' } />
                    <div className="img__back"></div>
                </div>
                <div className="description">
                    <h2>Pavimenti</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                    <input onClick={ openModal } name='Pavimenti' className={ italiana.className } style={ { width: '100%', fontWeight: '300', fontSize: 16 } } type="button" value="Details" />
                </div>
            </div>
        </Tilt>
        <Tilt
            tiltMaxAngleX={ 7 }  // Movimenti delicati
            tiltMaxAngleY={ 7 }    // Leggero ingrandimento all'hover
            transitionSpeed={ 250 }  // Transizione fluida
        >
            <div className="card">
                <div className="cover">
                    <img loading="lazy" style={ { transform: 'scale(1)', zIndex: 4, width: '90%', top: 30, height: '100%' } } width={ 600 } height={ 300 } alt='' src={ '/images/tetti.png' } />
                    <div className="img__back"></div>
                </div>
                <div className="description">
                    <h2>Tetti</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                    <input onClick={ openModal } name='Tetti' className={ italiana.className } style={ { width: '100%', fontWeight: '300', fontSize: 16 } } type="button" value="Details" />
                </div>
            </div>
        </Tilt>
        <Tilt
            tiltMaxAngleX={ 7 }  // Movimenti delicati
            tiltMaxAngleY={ 7 }    // Leggero ingrandimento all'hover
            transitionSpeed={ 250 }  // Transizione fluida
        >
            <div className="card">
                <div className="cover">
                    <img loading="lazy" style={ { transform: 'scale(0.9)', zIndex: 4, width: '90%', top: 30, height: '100%' } } width={ 600 } height={ 300 } alt='' src={ '/images/cappotti.png' } />
                    <div className="img__back"></div>
                </div>
                <div className="description">
                    <h2>Cappotti</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                    <input onClick={ openModal } name='Cappotti' className={ italiana.className } style={ { width: '100%', fontWeight: '300', fontSize: 16 } } type="button" value="Details" />
                </div>
            </div>
        </Tilt>
        {
            selected && <Modal title={ name } text={ text } closeModal={ closeModal } isOpen={ openModal } >
                <button className='buttonStyle' style={{display:'inline', marginTop:20 }}>Contattaci</button>
            </Modal>
        }


    </div>


}
export default ParallaxCard;