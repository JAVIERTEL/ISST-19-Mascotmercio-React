import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Cabecera() {
  return (
    <div id="cabecera">
      <Navbar bg="transparent" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="navbar-links ms-auto">
              <Nav.Link href="HomePage"style={{ color: 'white' }}>HomePage</Nav.Link>
              <Nav.Link href="Places"style={{ color: 'white' }}>Places</Nav.Link>
              <Nav.Link href="Map"style={{ color: 'white' }}>Map</Nav.Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="transparent" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container id="cab-right">
          <img className="logo-cabecera" src={process.env.PUBLIC_URL + "/logomascotmercio.png"} alt="logo" />
            <Nav className="navbar-links ms-auto">
              <Nav.Link href="Login" style={{ color: 'white' }}>Log in</Nav.Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </div>
    
  );
}

export default Cabecera;
