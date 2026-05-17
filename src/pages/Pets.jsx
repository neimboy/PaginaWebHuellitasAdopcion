import { useState, useEffect } from 'react';
import { getRandomCats, getRandomDogs } from '../services/api';
import PetCard from '../components/PetCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      const [cats, dogs] = await Promise.all([
        getRandomCats(10),
        getRandomDogs(10)
      ]);
      const allPets = [
        ...cats.map(cat => ({ ...cat, type: 'cat' })),
        ...dogs.map(dog => ({ ...dog, type: 'dog' }))
      ];
      setPets(allPets);
      setLoading(false);
    };
    fetchPets();
  }, []);

  const filteredPets = filter === 'all' 
    ? pets 
    : pets.filter(pet => pet.type === filter);

  return (
    <div className="pt-5 mt-5">
      <div className="container py-4">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{ color: '#5C4033', fontWeight: '700' }}>
            <i className="bi bi-paw me-2" style={{ color: '#FF8C42' }}></i>
            Todas las Mascotas
          </h1>
          <p className="text-muted">Encuentra a tu compañero ideal</p>
        </motion.div>

        {/* Filtros */}
        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group">
            <button 
              className={`btn ${filter === 'all' ? 'active' : ''}`}
              style={filter === 'all' ? { backgroundColor: '#FF8C42', color: 'white' } : {}}
              onClick={() => setFilter('all')}
            >
              <i className="bi bi-heart me-1"></i>Todos
            </button>
            <button 
              className={`btn ${filter === 'cat' ? 'active' : ''}`}
              style={filter === 'cat' ? { backgroundColor: '#FF8C42', color: 'white' } : {}}
              onClick={() => setFilter('cat')}
            >
              <i className="bi bi-chat-heart me-1"></i>Gatos
            </button>
            <button 
              className={`btn ${filter === 'dog' ? 'active' : ''}`}
              style={filter === 'dog' ? { backgroundColor: '#FF8C42', color: 'white' } : {}}
              onClick={() => setFilter('dog')}
            >
              <i className="bi bi-paw me-1"></i>Perros
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            {filteredPets.map((pet, index) => (
              <PetCard key={`${pet.type}-${pet.id}`} pet={pet} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;