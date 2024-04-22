import React, { useState } from 'react';
import { createRoot } from 'react-dom/client'; // Importar createRoot de react-dom/client
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './services/UserContext'; // Importar UserProvider

function Main() {
  // Crear un estado para el usuario
  const [user, setUser] = useState(null);

  return (
    <React.StrictMode>
      <UserProvider value={{ user, setUser }}> {/* Pasar user y setUser a UserProvider */}
        <App />
      </UserProvider>
    </React.StrictMode>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Main />);

reportWebVitals();