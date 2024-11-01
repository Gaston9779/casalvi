import Image from 'next/image';
import Idraulic from '../assets/plub.png'
import Elet from '../assets/elet.png'
import Pan from '../assets/solar.png'

const ParallaxCard = () =>
{
    return <div className="container__cards" style={{overflowY:'hidden', overflowX:'hidden'}}>

        <div className="card">
            <div className="cover">
                <Image style={ { transform: 'scale(1)', top: 30, width: '80%', height: '100%' } } width={ 500 } height={ 300 } alt='' src={ Idraulic } />
                <div className="img__back"></div>
            </div>
            <div className="description">
                <h2>Idraulico</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                <input style={ { width: '100%' } } type="button" value="Details" />
            </div>
        </div>

        <div className="card">
            <div className="cover" >
                <Image style={ { transform: 'scale(1)', top: 20, width: '80%', height: '100%' } } alt='' src={ Elet } />
                <div className="img__back"></div>
            </div>
            <div className="description">
                <h2>Elettricista</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                <input style={ { width: '100%' } } type="button" value="Details" />
            </div>
        </div>

        <div className="card">
            <div className="cover">
                <Image style={ { transform: 'scale(1)', width: '90%', top: 30, height: '100%' } } width={ 600 } height={ 300 } alt='' src={ Pan } />
                <div className="img__back"></div>
            </div>
            <div className="description">
                <h2>Tetti</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                <input style={ { width: '100%' } } type="button" value="Details" />
            </div>
        </div>
        <div className="card">
            <div className="cover">
                {/* <img src="https://images.wikidexcdn.net/mwuploads/wikidex/2/2e/latest/20200102044414/Bellossom_EpEc.gif" alt=""/> */ }
                <div className="img__back"></div>
            </div>
            <div className="description">
                <h2>Cappotti</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                <input style={ { width: '100%' } } type="button" value="Details" />
            </div>
        </div>
        <div className="card">
            <div className="cover">
                {/* <img src="https://images.wikidexcdn.net/mwuploads/wikidex/2/2e/latest/20200102044414/Bellossom_EpEc.gif" alt=""/> */ }
                <div className="img__back"></div>
            </div>
            <div className="description">
                <h2>Cappotti</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                <input style={ { width: '100%' } } type="button" value="Details" />
            </div>
        </div>
        <div className="card">
            <div className="cover">
                {/* <img src="https://images.wikidexcdn.net/mwuploads/wikidex/2/2e/latest/20200102044414/Bellossom_EpEc.gif" alt=""/> */ }
                <div className="img__back"></div>
            </div>
            <div className="description">
                <h2>Cappotti</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, laboriosam.</p>
                <input style={ { width: '100%' } } type="button" value="Details" />
            </div>
        </div>
      

    </div>


}
export default ParallaxCard;