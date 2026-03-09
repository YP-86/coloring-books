import React from 'react';
import { motion } from 'framer-motion';

export default function ErrorMessage({ message }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="error-message">
        😕 {message || 'Something went wrong. Please try again.'}
      </p>
    </motion.div>
  );
}
