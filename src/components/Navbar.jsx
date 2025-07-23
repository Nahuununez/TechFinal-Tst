import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/productos">Mi Tienda</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/productos">Productos</Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">Carrito</Link>
            </li>
          )}
          {user?.role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Administrar</Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {!user ? (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;