
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';

// Accept props as an argument here
function NavbarComponent() {
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
            <Nav.Link className="navlink" href="/womens">Womens</Nav.Link>
            <Nav.Link className="navlink" href="/mens">Mens</Nav.Link>
            <Nav.Link className="navlink" href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
