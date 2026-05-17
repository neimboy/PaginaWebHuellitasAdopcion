import { motion } from 'framer-motion';

const InfoSection = () => {
  const infoCards = [
    {
      icon: 'bi-house-heart',
      title: 'Hogar Seguro',
      description: 'Proporcionamos seguimiento para asegurar que cada mascota encuentre el hogar perfecto'
    },
    {
      icon: 'bi-heart-pulse',
      title: 'Salud Garantizada',
      description: 'Todas nuestras mascotas reciben atención veterinaria completa antes de la adopción'
    },
    {
      icon: 'bi-people',
      title: 'Familia Responsable',
      description: 'Buscamos familias comprometidas que brinden amor y cuidados para toda la vida'
    }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: '#FFF5EE' }}>
      <div className="container">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ color: '#5C4033', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
            ¿Por qué adoptar?
          </h2>
          <p className="text-muted">Cambia una vida, gana un amigo para siempre</p>
        </motion.div>
        
        <div className="row">
          {infoCards.map((card, index) => (
            <motion.div 
              key={card.title} 
              className="col-md-4 mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-center p-4 h-100" style={{ backgroundColor: 'white', borderRadius: '20px' }}>
                <i className={`bi ${card.icon} mb-3`} style={{ fontSize: '3rem', color: '#FF8C42' }}></i>
                <h4 style={{ color: '#5C4033', marginBottom: '15px' }}>{card.title}</h4>
                <p className="text-muted">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;