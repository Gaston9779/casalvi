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
                            <li><a className={italiana.className} href="#">Home</a></li>
                            <li><a className={italiana.className} href="#">About</a></li>
                            <li><a className={italiana.className} href="#">Services</a></li>
                            <li><a className={italiana.className} href="#">Contact</a></li>
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
                    <p className={italiana.className}>&copy; 2023 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;