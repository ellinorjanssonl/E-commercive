import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'; 

/* Här är min Footer-komponent. Här visar jag information om företaget.
Jag använder FontAwesomeIcons för att visa ikoner. */

const Footer = () => {
    const year = new Date().getFullYear();
    const name = 'FASHONHUB';
    const author = 'Ellinor Jansson Lande';
    const email = " Ellinor_jansson@hotmail.com"; 

    return (
        <footer className='Footer'>
            <p className='Footerp'>{name} &copy; {year} by {author}</p>
            <p className='Footerp'><FontAwesomeIcon icon={faEarthAmericas} size="lg"/> Stockholm, Sweden</p>
            <p className='Footerp'><FontAwesomeIcon icon={faPhone} size="lg"/> Phone: +46 707836682</p>
            <p className='Footerp'>
            <FontAwesomeIcon icon={faEnvelope} size="lg"/> Email:   
            <a href={`mailto:${email}`} className="FooterEmail">{email}</a>
            </p>
        </footer>
    );
}

export default Footer;
