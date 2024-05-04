import { Navigate } from 'react-router-dom';

function ProtectedComponent({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedComponent;