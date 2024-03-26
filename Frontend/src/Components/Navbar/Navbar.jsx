import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCart } from '../CartContext'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {faVenus} from '@fortawesome/free-solid-svg-icons';
import {faMars} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';

function NavbarComponent() {
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate(); // Skapa en instans av useNavigate

  const handleLogout = () => {
    logout(); // Logga ut användaren
    navigate('/'); // Navigera till hemsidan efter utloggning
  };

  return (
    <Navbar expand="lg" className="Navbarsection">
      <Container fluid>
        <Navbar.Brand href="/">FASHONHUB</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="navlink" as={Link} to="/womens">Womens <FontAwesomeIcon icon={faVenus} className="icon-space"/></Nav.Link>
            <Nav.Link className="navlink" as={Link} to="/mens">Mens <FontAwesomeIcon icon={faMars} className="icon-space"/></Nav.Link>
            <Nav.Link className="navlink" as={Link} to="/sale">Sale</Nav.Link>
            <Nav.Link className="navlink" as={Link} to="/cart">Cart ({cartItems.length})<FontAwesomeIcon icon={faCartShopping} className="icon-space"/></Nav.Link>
          </Nav>

        {isLoggedIn ? (
        <Nav.Link className="navlogin" onClick={handleLogout}>Logout</Nav.Link>
      ) : (
        <Nav.Link className="navlogin" as={Link} to="/login">Login <FontAwesomeIcon icon={faUser} className="icon-space"/></Nav.Link>
      )}
        <Nav.Link className="navlogin" as={Link} to="/register">Register</Nav.Link>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
