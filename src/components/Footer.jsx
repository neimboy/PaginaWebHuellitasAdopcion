import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white py-4" style={{ backgroundColor: '#5C4033' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="d-flex align-items-center">
              <i className="bi bi-heart-fill me-2" style={{ color: '#FF8C42' }}></i>
              Huellitas
            </h5>
            <p className="small">Conectando corazones, creando familias</p>
            <div className="d-flex gap-2">
              <a href="https://www.facebook.com" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/" className="text-white"><i className="bi bi-instagram"></i></a>
              <a href="https://x.com/" className="text-white"><i className="bi bi-twitter"></i></a>
              <a href="https://www.youtube.com/shorts/S124IplovG4" className="text-white"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6>Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Inicio</Link></li>
              <li><Link to="/cats" className="text-white text-decoration-none">Gatitos</Link></li>
              <li><Link to="/pets" className="text-white text-decoration-none">Mascotas</Link></li>
              <li><Link to="/adoption" className="text-white text-decoration-none">Adopción</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6>Contacto</h6>
            <p className="small mb-1">
              <i className="bi bi-envelope me-2"></i>
              haroldgonzales987@gmail.com
            </p>
            <p className="small mb-1">
              <i className="bi bi-phone me-2"></i>
              +51 904 620 145
            </p>
            <p className="small">
              <i className="bi bi-geo-alt me-2"></i>
              Ciudad de Huancayo - Perú
            </p>
          </div>
        </div>
        
        <hr />
        <div className="text-center small">
          <p className="mb-0">&copy; 2026 Huellitas. Todos los derechos reservados. Hecho con ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;