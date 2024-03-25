import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useCart } from '../CartContext'; 
import { Link } from 'react-router-dom';
import './Navbar.css';

function NavbarComponent() {
  const { cartItems } = useCart();
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
