import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet, index }) => {
  const navigate = useNavigate();

  const breed = pet.breeds?.[0]?.name || pet.breed || 'Mestizo';
  const petType = pet.type || 'cat';

  // Todos estos valores vienen de la API (ya enriquecidos en api.js)
  const name   = pet.name   || 'Sin nombre';
  const age    = pet.age    || 'Edad desconocida';
  const gender = pet.gender || 'Desconocido';

  const handleClick = () => {
    navigate(`/pet/${petType}/${pet.id}`);
  };

  return (
    <motion.div
      className="col-md-6 col-lg-4 mb-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="card h-100 shadow-sm border-0"
        style={{ borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}
        onClick={handleClick}
      >
        <div className="position-relative" style={{ height: '250px', overflow: 'hidden' }}>
          <img
            src={pet.url}
            className="card-img-top h-100 w-100"
            alt={name}
            style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          />
          <span className="position-absolute top-0 end-0 m-2 badge" style={{ backgroundColor: '#FF8C42' }}>
            <i className="bi bi-heart-fill me-1"></i>Adoptable
          </span>
        </div>

        <div className="card-body text-center" style={{ backgroundColor: '#FFF5EE' }}>
          <h5 className="card-title" style={{ color: '#5C4033', fontWeight: '600' }}>{name}</h5>
          <p className="card-text text-muted mb-2">
            <i className="bi bi-paw me-2" style={{ color: '#FF8C42' }}></i>
            {breed}
          </p>
          <p className="card-text">
            <span className="badge me-2" style={{ backgroundColor: '#E8D5C4', color: '#5C4033' }}>
              <i className="bi bi-calendar-heart me-1"></i>{age}
            </span>
            <span className="badge" style={{ backgroundColor: '#E8D5C4', color: '#5C4033' }}>
              <i className="bi bi-gender-ambiguous me-1"></i>
              {gender}
            </span>
          </p>
          <motion.button
            className="btn w-100 mt-2"
            style={{ backgroundColor: '#FF8C42', color: 'white' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <i className="bi bi-heart me-2"></i>Conocer
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;