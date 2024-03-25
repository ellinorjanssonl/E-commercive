import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCart } from '../CartContext'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
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
            <Nav.Link className="navlink" as={Link} to="/womens">Womens</Nav.Link>
            <Nav.Link className="navlink" as={Link} to="/mens">Mens</Nav.Link>
            <Nav.Link className="navlink" as={Link} to="/cart">Cart({cartItems.length})</Nav.Link>
          
            </Nav>

        {isLoggedIn ? (
        <Nav.Link className="navlogin" onClick={handleLogout}>Logout</Nav.Link>
      ) : (
        <Nav.Link className="navlogin" as={Link} to="/login">Login</Nav.Link>
      )}
        <Nav.Link className="navlogin" as={Link} to="/register">Register</Nav.Link>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
