import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import PetCard from '../components/PetCard';
import InfoSection from '../components/InfoSection';
import Loader from '../components/Loader';
import { getRandomCats, getRandomDogs } from '../services/api';
import { motion } from 'framer-motion';

const Home = () => {
  const [featuredCats, setFeaturedCats] = useState([]);
  const [featuredDogs, setFeaturedDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const [cats, dogs] = await Promise.all([
          getRandomCats(3),
          getRandomDogs(3)
        ]);
        setFeaturedCats(cats);
        setFeaturedDogs(dogs);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  return (
    <>
      <Hero />
      
      {/* Sección de Gatitos Destacados */}
      <section className="py-5" style={{ backgroundColor: '#FFF5EE' }}>
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ color: '#5C4033', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
              Gatitos que Buscan Hogar
            </h2>
            <p className="text-muted">Ellos te están esperando</p>
          </motion.div>
          
          {loading ? (
            <Loader />
          ) : (
            <div className="row">
              {featuredCats.map((cat, index) => (
                <PetCard key={cat.id} pet={cat} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sección de Perros Destacados */}
      <section className="py-5 bg-white">
        <div className="container">
          <motion.div 
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ color: '#5C4033', fontWeight: '700', fontFamily: 'Poppins, sans-serif' }}>
              Perros en Adopción
            </h2>
            <p className="text-muted">Encuentra a tu compañero fiel</p>
          </motion.div>
          
          {loading ? (
            <Loader />
          ) : (
            <div className="row">
              {featuredDogs.map((dog, index) => (
                <PetCard key={dog.id} pet={dog} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <InfoSection />
    </>
  );
};

export default Home;