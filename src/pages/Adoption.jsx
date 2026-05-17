import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Adoption = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: 'bi-heart-fill',
      title: 'Salvas una vida',
      description: 'Al adoptar, le das una segunda oportunidad a un animal que lo necesita'
    },
    {
      icon: 'bi-cash-coin',
      title: 'Es más económico',
      description: 'La adopción es gratuita o de bajo costo comparado con la compra'
    },
    {
      icon: 'bi-shield-check',
      title: 'Mascotas saludables',
      description: 'Todos nuestros animales están vacunados y esterilizados'
    },
    {
      icon: 'bi-emoji-smile',
      title: 'Amor incondicional',
      description: 'Recibirás gratitud y amor puro de tu nueva mascota'
    }
  ];

  return (
    <div className="pt-5 mt-5">
      {/* Hero Adoption */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #FFE5D9 0%, #FFF5EE 100%)' }}>
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ color: '#5C4033', fontWeight: '700', fontSize: '3rem' }}>
              Proceso de Adopción
            </h1>
            <p className="lead mt-3" style={{ color: '#8B7355' }}>
              Dar el paso para adoptar es más fácil de lo que imaginas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pasos */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {[
              { step: 1, title: 'Explora',  desc: 'Navega por nuestra galería y encuentra tu mascota ideal' },
              { step: 2, title: 'Conoce',   desc: 'Visita a la mascota y conoce su personalidad' },
              { step: 3, title: 'Adopta',   desc: 'Completa el formulario y lleva a tu nuevo amigo a casa' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="col-md-4 mb-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  className="text-center p-4 h-100"
                  style={{ backgroundColor: '#FFF5EE', borderRadius: '20px' }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#FF8C42',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>{item.step}</span>
                  </div>
                  <h4 style={{ color: '#5C4033' }}>{item.title}</h4>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#5C4033', fontWeight: '700' }}>
            Beneficios de Adoptar
          </h2>
          <div className="row">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="col-md-3 col-sm-6 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-center p-3">
                  <i className={`bi ${benefit.icon} mb-3`} style={{ fontSize: '2.5rem', color: '#FF8C42' }}></i>
                  <h5 style={{ color: '#5C4033' }}>{benefit.title}</h5>
                  <p className="text-muted small">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5" style={{ backgroundColor: '#FF8C42' }}>
        <div className="container text-center text-white">
          <h3 className="mb-4">¿Listo para cambiar una vida?</h3>
          <motion.button
            className="btn btn-light btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ color: '#FF8C42', fontWeight: '600' }}
            onClick={() => navigate('/pets')}
          >
            <i className="bi bi-heart-fill me-2"></i>
            Comenzar Proceso de Adopción
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Adoption;