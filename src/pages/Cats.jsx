import { useState, useEffect } from 'react';
import { getRandomCats } from '../services/api';
import PetCard from '../components/PetCard';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const Cats = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const catsPerPage = 6;

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      const data = await getRandomCats(20);
      setCats(data);
      setLoading(false);
    };
    fetchCats();
  }, []);

  const indexOfLastCat = currentPage * catsPerPage;
  const indexOfFirstCat = indexOfLastCat - catsPerPage;
  const currentCats = cats.slice(indexOfFirstCat, indexOfLastCat);
  const totalPages = Math.ceil(cats.length / catsPerPage);

  return (
    <div className="pt-5 mt-5">
      <div className="container py-4">
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={{ color: '#5C4033', fontWeight: '700' }}>
            <i className="bi bi-chat-heart me-2" style={{ color: '#FF8C42' }}></i>
            Nuestros Gatitos
          </h1>
          <p className="text-muted">Descubre a tu nuevo mejor amigo felino</p>
        </motion.div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row">
              {currentCats.map((cat, index) => (
                <PetCard key={cat.id} pet={cat} index={index} />
              ))}
            </div>

            {/* Paginación */}
            <div className="d-flex justify-content-center mt-4">
              <button 
                className="btn me-2"
                style={{ backgroundColor: '#FF8C42', color: 'white' }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="align-self-center mx-3" style={{ color: '#5C4033' }}>
                Página {currentPage} de {totalPages}
              </span>
              <button 
                className="btn"
                style={{ backgroundColor: '#FF8C42', color: 'white' }}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cats;