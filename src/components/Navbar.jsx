import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#FFF5EE' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-heart-fill me-2" style={{ color: '#FF8C42', fontSize: '1.5rem' }}></i>
          <span style={{ fontWeight: '700', color: '#5C4033', fontFamily: 'Poppins, sans-serif' }}>
            Huellitas
          </span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/')}`} 
                to="/"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-house-heart me-1"></i>Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/cats')}`} 
                to="/cats"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-chat-heart me-1"></i>Gatitos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/pets')}`} 
                to="/pets"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-paw me-1"></i>Mascotas
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/adoption')}`} 
                to="/adoption"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-heart me-1"></i>Adopción
              </Link>
            </li>
          </ul>
          <button
            className="btn ms-lg-3"
            style={{ backgroundColor: '#FF8C42', color: 'white' }}
            onClick={() => { navigate('/pets'); setIsOpen(false); }}
          >
            Adoptar Ahora
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;