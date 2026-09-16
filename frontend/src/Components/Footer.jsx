import { Link } from 'react-router-dom'
import '../Style/FooterStyle.css'

const Footer = () => {
    return (
        <div>
            <footer className="footer">

                <Link to="/" className='footer-logo-link'>
                    <div className="footer-logo">
                        RentHive
                    </div>
                </Link>

                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/catalog">Catalog</Link>
                    <Link to="/how-it-works">How It Works</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <p>+91 88474 82208</p>
                    <p>rohitthakur792002@gmail.com</p>
                    <p>Mohali Punjab, India</p>
                </div>

                <div className="copyright">
                    © 2024 FurniRent. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Footer