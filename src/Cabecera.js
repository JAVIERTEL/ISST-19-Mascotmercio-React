import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Cabecera() {
  return (<div id="cabecera">
    <Navbar bg="light" expand="lg">
      <Container>
      <img className = "logo" src= {process.env.PUBLIC_URL + "/logomascotmercio.png"} alt="logo"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="nav-link-left">HomePage</Nav.Link>
            <Nav.Link href="#places"  className="nav-link-left">Places</Nav.Link>
            <Nav.Link href="#map"  className="nav-link-left">Map</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login"  className="nav-link-right">Log In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default Cabecera;
