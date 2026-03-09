import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ retryCount }) {
  return (
    <motion.div
      className="card loading-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <div className="loader-ring" />
      <p>
        {retryCount > 0
          ? `Retrying (${retryCount})...`
          : 'Creating your coloring page...'}
      </p>
    </motion.div>
  );
}
