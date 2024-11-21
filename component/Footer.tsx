import { Host_Grotesk, Poppins } from 'next/font/google';
const italiana = Host_Grotesk( {
    subsets: [ 'latin' ],
    weight: [ '300' ],
} );
const Footer = () =>
{
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <p className={italiana.className}>
                        CASAVI
                        </p>
                    </div>
                    <div className="footer-links">
                        <ul className="footer-menu">
                            <li><a className={italiana.className} href="/chisiamo">Chi siamo</a></li>
                            <li><a className={italiana.className} href="/project">Realizzazioni</a></li>
                            <li><a className={italiana.className} href="/service">Servizi</a></li>
                            <li><a className={italiana.className} href="/workus">Lavora con noi</a></li>
                            <li><a className={italiana.className} href="/contact">Contatti</a></li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <ul className="social-icons">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className={italiana.className}>&copy; 2024 Casavi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;