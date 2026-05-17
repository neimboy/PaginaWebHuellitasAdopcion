import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdoptionForm = ({ pet, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    tipoVivienda: '',
    tieneJardin: '',
    otrasMascotas: '',
    experiencia: '',
    motivo: '',
    aceptaTerminos: false,
    aceptaSeguimiento: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
      if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
      if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
      if (!formData.telefono.trim()) {
        newErrors.telefono = 'El teléfono es requerido';
      } else if (!/^\d{9,}$/.test(formData.telefono.replace(/\s/g, ''))) {
        newErrors.telefono = 'Teléfono inválido (mínimo 9 dígitos)';
      }
    } else if (stepNumber === 2) {
      if (!formData.direccion.trim()) newErrors.direccion = 'La dirección es requerida';
      if (!formData.ciudad.trim()) newErrors.ciudad = 'La ciudad es requerida';
      if (!formData.tipoVivienda) newErrors.tipoVivienda = 'Selecciona un tipo de vivienda';
      if (!formData.tieneJardin) newErrors.tieneJardin = 'Este campo es requerido';
    } else if (stepNumber === 3) {
      if (!formData.experiencia) newErrors.experiencia = 'Selecciona tu nivel de experiencia';
      if (!formData.motivo.trim() || formData.motivo.length < 20) {
        newErrors.motivo = 'Cuéntanos más sobre tus motivos (mínimo 20 caracteres)';
      }
      if (!formData.aceptaTerminos) newErrors.aceptaTerminos = 'Debes aceptar los términos';
      if (!formData.aceptaSeguimiento) newErrors.aceptaSeguimiento = 'Debes aceptar el seguimiento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Simular envío
      setTimeout(() => {
        setSubmitted(true);
      }, 1500);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h5 className="mb-4" style={{ color: '#5C4033' }}>
              <i className="bi bi-person-circle me-2" style={{ color: '#FF8C42' }}></i>
              Datos Personales
            </h5>
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{ color: '#5C4033' }}>Nombre *</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  style={{ borderRadius: '10px' }}
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{ color: '#5C4033' }}>Apellido *</label>
                <input
                  type="text"
                  className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  style={{ borderRadius: '10px' }}
                />
                {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>Email *</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                style={{ borderRadius: '10px' }}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>Teléfono *</label>
              <input
                type="tel"
                className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+51 999 888 777"
                style={{ borderRadius: '10px' }}
              />
              {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h5 className="mb-4" style={{ color: '#5C4033' }}>
              <i className="bi bi-house-heart me-2" style={{ color: '#FF8C42' }}></i>
              Información del Hogar
            </h5>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>Dirección *</label>
              <input
                type="text"
                className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Tu dirección completa"
                style={{ borderRadius: '10px' }}
              />
              {errors.direccion && <div className="invalid-feedback">{errors.direccion}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>Ciudad *</label>
              <input
                type="text"
                className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                placeholder="Tu ciudad"
                style={{ borderRadius: '10px' }}
              />
              {errors.ciudad && <div className="invalid-feedback">{errors.ciudad}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>Tipo de Vivienda *</label>
              <select
                className={`form-select ${errors.tipoVivienda ? 'is-invalid' : ''}`}
                name="tipoVivienda"
                value={formData.tipoVivienda}
                onChange={handleChange}
                style={{ borderRadius: '10px' }}
              >
                <option value="">Seleccionar...</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="condominio">Condominio</option>
                <option value="otro">Otro</option>
              </select>
              {errors.tipoVivienda && <div className="invalid-feedback">{errors.tipoVivienda}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>¿Tiene jardín o patio? *</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="tieneJardin"
                    value="si"
                    checked={formData.tieneJardin === 'si'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Sí</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="tieneJardin"
                    value="no"
                    checked={formData.tieneJardin === 'no'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {errors.tieneJardin && <div className="text-danger small">{errors.tieneJardin}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>¿Tiene otras mascotas?</label>
              <select
                className="form-select"
                name="otrasMascotas"
                value={formData.otrasMascotas}
                onChange={handleChange}
                style={{ borderRadius: '10px' }}
              >
                <option value="">Seleccionar...</option>
                <option value="no">No tengo</option>
                <option value="1">1 mascota</option>
                <option value="2">2 mascotas</option>
                <option value="3+">3 o más</option>
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h5 className="mb-4" style={{ color: '#5C4033' }}>
              <i className="bi bi-heart me-2" style={{ color: '#FF8C42' }}></i>
              Experiencia y Motivación
            </h5>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>Experiencia con mascotas *</label>
              <select
                className={`form-select ${errors.experiencia ? 'is-invalid' : ''}`}
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                style={{ borderRadius: '10px' }}
              >
                <option value="">Seleccionar...</option>
                <option value="principiante">Principiante</option>
                <option value="intermedio">Intermedio</option>
                <option value="experto">Experto</option>
              </select>
              {errors.experiencia && <div className="invalid-feedback">{errors.experiencia}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: '#5C4033' }}>
                ¿Por qué quieres adoptar a {pet?.name}? * (mín. 20 caracteres)
              </label>
              <textarea
                className={`form-control ${errors.motivo ? 'is-invalid' : ''}`}
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                rows="4"
                placeholder="Cuéntanos tus razones..."
                style={{ borderRadius: '10px' }}
              ></textarea>
              {errors.motivo && <div className="invalid-feedback">{errors.motivo}</div>}
              <small className="text-muted">{formData.motivo.length}/20 caracteres mín.</small>
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                />
                <label className="form-check-label" style={{ color: '#5C4033' }}>
                  Acepto los términos y condiciones de adopción *
                </label>
              </div>
              {errors.aceptaTerminos && <div className="text-danger small">{errors.aceptaTerminos}</div>}
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="aceptaSeguimiento"
                  checked={formData.aceptaSeguimiento}
                  onChange={handleChange}
                />
                <label className="form-check-label" style={{ color: '#5C4033' }}>
                  Acepto recibir seguimiento post-adopción *
                </label>
              </div>
              {errors.aceptaSeguimiento && <div className="text-danger small">{errors.aceptaSeguimiento}</div>}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          zIndex: 9999,
          backdropFilter: 'blur(5px)'
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-white rounded-4 p-4 m-3"
          style={{ 
            maxWidth: '600px', 
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          {!submitted ? (
            <>
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 style={{ color: '#5C4033' }}>
                    <i className="bi bi-heart-fill me-2" style={{ color: '#FF8C42' }}></i>
                    Formulario de Adopción
                  </h4>
                  <p className="text-muted mb-0">Para: {pet?.name} - {pet?.breed}</p>
                </div>
                <button 
                  className="btn btn-outline-danger btn-sm rounded-circle"
                  onClick={onClose}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${(step / 3) * 100}%`,
                      backgroundColor: '#FF8C42',
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <small style={{ color: step >= 1 ? '#FF8C42' : '#ccc' }}>Personales</small>
                  <small style={{ color: step >= 2 ? '#FF8C42' : '#ccc' }}>Hogar</small>
                  <small style={{ color: step >= 3 ? '#FF8C42' : '#ccc' }}>Motivación</small>
                </div>
              </div>

              {/* Form Steps */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleBack}
                      style={{ borderRadius: '10px' }}
                    >
                      <i className="bi bi-arrow-left me-2"></i>Anterior
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      className="btn"
                      style={{ backgroundColor: '#FF8C42', color: 'white', borderRadius: '10px' }}
                      onClick={handleNext}
                    >
                      Siguiente<i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn"
                      style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '10px' }}
                    >
                      <i className="bi bi-heart-fill me-2"></i>Enviar Solicitud
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            /* Mensaje de éxito */
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-5"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <i className="bi bi-check-circle-fill" style={{ fontSize: '5rem', color: '#4CAF50' }}></i>
              </motion.div>
              <h3 className="mt-4" style={{ color: '#5C4033' }}>¡Solicitud Enviada!</h3>
              <p className="text-muted">
                Gracias por tu interés en adoptar a {pet?.name}. 
                Nos pondremos en contacto contigo en 24-48 horas.
              </p>
              <motion.button
                className="btn mt-3"
                style={{ backgroundColor: '#FF8C42', color: 'white' }}
                whileHover={{ scale: 1.05 }}
                onClick={onClose}
              >
                <i className="bi bi-house-heart me-2"></i>Volver al Inicio
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdoptionForm;