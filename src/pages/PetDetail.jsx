import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCatById, generatePetDetails } from '../services/api';
import AdoptionForm from '../components/AdoptionForm';
import Loader from '../components/Loader';

// ─── Helpers deterministas (mismos que api.js) ────────────────────────────────

function seededRandom(seed, max) {
  const hash = String(seed).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return hash % max;
}

const AGES    = ['2 meses', '4 meses', '6 meses', '1 año', '2 años', '3 años', '5 años'];
const GENDERS = ['Macho', 'Hembra'];

// ─── Componente ───────────────────────────────────────────────────────────────

const PetDetail = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const galleryImages = pet
    ? [
        pet.url,
        `https://source.unsplash.com/400x400/?${type === 'cat' ? 'cat' : 'dog'}&sig=1`,
        `https://source.unsplash.com/400x400/?${type === 'cat' ? 'kitten' : 'puppy'}&sig=2`,
        `https://source.unsplash.com/400x400/?pet&sig=3`,
      ]
    : [];

  useEffect(() => {
    const fetchPetDetails = async () => {
      setLoading(true);
      try {
        let petData;

        if (type === 'cat') {
          // getCatById ya devuelve { ...data, name } desde api.js
          const catData = await getCatById(id);
          if (catData) {
            petData = {
              ...catData,
              type: 'cat',
              // nombre ya viene de api.js — no sobreescribir
              breed:  catData.breeds?.[0]?.name || 'Mestizo',
              age:    AGES[seededRandom(id, AGES.length)],
              gender: GENDERS[seededRandom(id + 'g', GENDERS.length)],
            };
          }
        } else if (type === 'dog') {
          // Para perros que llegan por ruta directa (sin pasar por getRandomDogs)
          // generamos nombre y datos de forma determinista con el id
          const DOG_NAMES = [
            'Max', 'Bella', 'Rocky', 'Coco', 'Thor', 'Lola', 'Bruno', 'Nina',
            'Toby', 'Laika', 'Dante', 'Kira', 'Boby', 'Sasha', 'Rex',
            'Nube', 'Chispa', 'Apolo', 'Frida', 'Duque',
          ];
          petData = {
            id,
            url: `https://dog.ceo/api/breeds/${id}/images/random`,
            type: 'dog',
            name:   DOG_NAMES[seededRandom(id, DOG_NAMES.length)],
            breed:  id.charAt(0).toUpperCase() + id.slice(1),
            age:    AGES[seededRandom(id, AGES.length)],
            gender: GENDERS[seededRandom(id + 'g', GENDERS.length)],
          };
        }

        if (petData) {
          setPet(generatePetDetails(petData));
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id, type]);

  if (loading) return <Loader />;
  if (!pet) return (
    <div className="container text-center py-5 mt-5">
      <h2>Mascota no encontrada</h2>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Volver al inicio
      </button>
    </div>
  );

  return (
    <div className="pt-5 mt-4">
      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ color: '#FF8C42', textDecoration: 'none' }}>Inicio</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/pets" style={{ color: '#FF8C42', textDecoration: 'none' }}>Mascotas</a>
            </li>
            <li className="breadcrumb-item active" style={{ color: '#5C4033' }}>{pet.name}</li>
          </ol>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="row">
            {/* Galería de Imágenes */}
            <div className="col-lg-6 mb-4">
              <div className="position-relative" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <motion.img
                  key={selectedImage}
                  src={galleryImages[selectedImage]}
                  alt={pet.name}
                  className="w-100"
                  style={{ height: '500px', objectFit: 'cover', borderRadius: '20px' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span
                  className="position-absolute top-0 end-0 m-3 badge fs-6"
                  style={{ backgroundColor: '#FF8C42' }}
                >
                  <i className="bi bi-heart-fill me-1"></i>Adoptable
                </span>
              </div>

              {/* Miniaturas */}
              <div className="row mt-3 g-2">
                {galleryImages.map((img, index) => (
                  <div key={index} className="col-3">
                    <motion.img
                      src={img}
                      alt={`${pet.name} ${index + 1}`}
                      className="w-100"
                      style={{
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: selectedImage === index ? '3px solid #FF8C42' : '3px solid transparent',
                        opacity: selectedImage === index ? 1 : 0.6,
                      }}
                      onClick={() => setSelectedImage(index)}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Información de la Mascota */}
            <div className="col-lg-6">
              <div className="d-flex align-items-center mb-3">
                <h1 style={{ color: '#5C4033', fontWeight: '700', fontSize: '2.5rem' }}>
                  {pet.name}
                </h1>
                <span className="ms-3 badge fs-6" style={{ backgroundColor: '#E8D5C4', color: '#5C4033' }}>
                  {pet.gender}
                </span>
              </div>

              {/* Características principales */}
              <div className="row mb-4">
                {[
                  { label: 'Raza',            value: pet.breed },
                  { label: 'Edad',            value: pet.age },
                  { label: 'Personalidad',    value: pet.personality },
                ].map(({ label, value }) => (
                  <div key={label} className="col-6 mb-3">
                    <div className="p-3" style={{ backgroundColor: '#FFF5EE', borderRadius: '15px' }}>
                      <small className="text-muted">{label}</small>
                      <h6 style={{ color: '#5C4033' }}>{value}</h6>
                    </div>
                  </div>
                ))}
                <div className="col-6 mb-3">
                  <div className="p-3" style={{ backgroundColor: '#FFF5EE', borderRadius: '15px' }}>
                    <small className="text-muted">Nivel de Energía</small>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi bi-lightning-fill me-1 ${i < pet.energyLevel ? 'text-warning' : 'text-muted'}`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Historia */}
              <div className="mb-4 p-4" style={{ backgroundColor: '#FFF5EE', borderRadius: '15px' }}>
                <h5 style={{ color: '#5C4033' }}>
                  <i className="bi bi-book-heart me-2" style={{ color: '#FF8C42' }}></i>
                  Su Historia
                </h5>
                <p className="text-muted">{pet.story}</p>
              </div>

              {/* Salud */}
              <div className="mb-4">
                <h5 style={{ color: '#5C4033' }}>
                  <i className="bi bi-heart-pulse me-2" style={{ color: '#FF8C42' }}></i>
                  Estado de Salud
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {pet.health.map((item, index) => (
                    <span key={index} className="badge fs-6" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                      <i className="bi bi-check-circle me-1"></i>{item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Compatibilidad */}
              <div className="mb-4">
                <h5 style={{ color: '#5C4033' }}>
                  <i className="bi bi-people me-2" style={{ color: '#FF8C42' }}></i>
                  Compatible con
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {pet.compatibility.map((item, index) => (
                    <span key={index} className="badge fs-6" style={{ backgroundColor: '#E8D5C4', color: '#5C4033' }}>
                      <i className="bi bi-heart me-1"></i>{item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fecha de llegada */}
              <p className="text-muted mb-4">
                <i className="bi bi-calendar-heart me-2"></i>
                En el refugio desde: {pet.arrivalDate}
              </p>

              {/* Botones de acción */}
              <div className="d-flex gap-3">
                <motion.button
                  className="btn btn-lg flex-grow-1"
                  style={{ backgroundColor: '#FF8C42', color: 'white' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                >
                  <i className="bi bi-heart-fill me-2"></i>
                  ¡Quiero Adoptar!
                </motion.button>
                <motion.button
                  className="btn btn-lg btn-outline-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="bi bi-share"></i>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Características adicionales */}
          <div className="row mt-5">
            <div className="col-12">
              <h3 style={{ color: '#5C4033', fontWeight: '700' }} className="mb-4">
                Más sobre {pet.name}
              </h3>
            </div>
            {[
              { icon: 'bi-house-heart',  title: 'Busca hogar definitivo', desc: 'Compromiso de por vida' },
              { icon: 'bi-gift',         title: 'Kit de bienvenida',       desc: 'Incluye alimentos y juguetes' },
              { icon: 'bi-chat-heart',   title: 'Seguimiento post-adopción', desc: 'Te acompañamos en el proceso' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="col-md-4 mb-3">
                <div className="p-4 text-center" style={{ backgroundColor: '#FFF5EE', borderRadius: '15px' }}>
                  <i className={`bi ${icon} mb-3`} style={{ fontSize: '2rem', color: '#FF8C42' }}></i>
                  <h6 style={{ color: '#5C4033' }}>{title}</h6>
                  <p className="text-muted small">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {showForm && <AdoptionForm pet={pet} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default PetDetail;