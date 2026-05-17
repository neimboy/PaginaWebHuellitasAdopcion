import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <i className="bi bi-heart-fill" style={{ fontSize: '4rem', color: '#FF8C42' }}></i>
      </motion.div>
    </div>
  );
};

export default Loader;