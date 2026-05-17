import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section" style={{
      background: 'linear-gradient(135deg, #FFE5D9 0%, #FFF5EE 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      marginTop: '76px'
    }}>
      <div className="container">
        <div className="row align-items-center">
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              color: '#5C4033',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '1.2'
            }}>
              Dales un hogar <br />
              <span style={{ color: '#FF8C42' }}>lleno de amor</span>
            </h1>
            <p className="lead my-4" style={{ color: '#8B7355', fontSize: '1.2rem' }}>
              Miles de mascotas esperan encontrar una familia que las ame.
              Adopta, no compres. Cambia una vida hoy.
            </p>
            <div className="d-flex gap-3">
              <motion.button
                className="btn btn-lg"
                style={{ backgroundColor: '#FF8C42', color: 'white' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/pets')}
              >
                <i className="bi bi-heart-fill me-2"></i>
                Adoptar Ahora
              </motion.button>
              <motion.button
                className="btn btn-lg btn-outline-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/adoption')}
              >
                Conocer Más
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="col-lg-6 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop"
              alt="Gato adorable"
              className="img-fluid rounded-circle shadow-lg"
              style={{ maxWidth: '500px', border: '8px solid white' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;