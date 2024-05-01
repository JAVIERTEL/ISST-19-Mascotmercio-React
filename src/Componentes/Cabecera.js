import React, { useContext, useState } from 'react'; // Importar useContext
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from '../services/UserContext'; // Importar UserContext
import { useNavigate, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap'; // Importar Modal de react-bootstrap

function Cabecera() {
  const { user,setUser } = useContext(UserContext); // Acceder al estado del usuario
  const navigate = useNavigate(); // Obtener el objeto history
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  const handleLogout = () => {
    // Aquí puedes poner cualquier lógica de cierre de sesión que necesites
    // Por ejemplo, puedes resetear el estado del usuario a null
    setUser(null);
    localStorage.removeItem('user');

    // Redirigir al usuario a la página de inicio
    navigate('/HomePage');
  };
  const handleProfileClick = () => {
    setShowModal(true); // Mostrar el modal cuando se haga clic en el perfil
  };

 
  return (
    <div id="cabecera">
      <Navbar bg="transparent" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
            <Nav className="navbar-links ms-auto">
              <Nav.Link as={Link} to="HomePage"style={{ color: 'white' }}>HomePage</Nav.Link>
              <Nav.Link as={Link} to="Places"style={{ color: 'white' }}>Places</Nav.Link>
              <Nav.Link as={Link} to="Map"style={{ color: 'white' }}>Map</Nav.Link>
              {user && (
              <Nav.Link as={Link} to="Perfil" style={{ color: 'white' }}>Perfil</Nav.Link>
        )}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
      <Navbar bg="transparent" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container id="cab-right">
          <img className="logo-cabecera" src={process.env.PUBLIC_URL + "/logomascotmercio.png"} alt="logo" />
            <Nav className="navbar-links ms-auto">
            {user ? (
                <>
                  <Nav.Link onClick={handleLogout} style={{ color: 'white' }}>Log out</Nav.Link>
                </>
              ) : (
                <Nav.Link href="Login" style={{ color: 'white' }}>Log in</Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Cabecera;