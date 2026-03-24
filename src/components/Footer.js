import React from "react";
import './styles.css';

export function Footer() {
    return (
        <div className="footer-wrapper">
            <footer className="footer-container">
                
                <div className="links">
                    <h4>Navigation:</h4>
                    <ul>
                        <li>
                            <a href="http://localhost:3000/">Home Page</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/buy">Buy</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/favourite">Favourites</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/sell">Sell</a>
                        </li>
                    </ul>
                </div>

                <div className="social-media">
                    <h4>Social Media:</h4>
                    <p>
                        <img src="/icons/instagram.png" className="icon" />
                        HavenLiving
                    </p>
                    <p>
                        <img src="/icons/X.png" className="icon" />
                        HavenLiving
                    </p>
                    <p>
                        <img src="/icons/facebook.png" className="icon" />
                        HavenLiving
                    </p>
                    <p>
                        <img src="/icons/tiktok.png" className="icon" />
                        HavenLiving
                    </p>
                </div>
                <div className="contact">
                    <h4>Contacts:</h4>
                    <p>
                        <img src="/icons/phone.png" alt="Phone" className="icon" />
                        912345678
                    </p>
                    <p>
                        <img src="/icons/email.png" alt="Email" className="icon" />
                        HavenLiving@email.com
                    </p>
                    <p>
                        <img src="/icons/location.png" alt="Location" className="icon" />
                        Lisbon, Portugal
                    </p>
                </div>


                <div className="footer-note">
                    <p>© 2024 Casas. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
