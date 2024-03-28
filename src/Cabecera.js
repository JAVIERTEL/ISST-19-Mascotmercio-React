import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function Cabecera() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">HomePage</Nav.Link>
            <Nav.Link href="#places">Places</Nav.Link>
            <Nav.Link href="#map">Map</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Log In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Cabecera;
