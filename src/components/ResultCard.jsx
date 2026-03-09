import React from 'react';
import { motion } from 'framer-motion';
import { downloadImage } from '../services/imageService';

export default function ResultCard({ imageUrl, onRegenerate }) {
  return (
    <motion.div
      className="card result-card"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.img
        src={imageUrl}
        alt="Your coloring page"
        className="result-image"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <motion.div
        className="action-buttons"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="btn-action"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.print()}
        >
          🖨️ Print
        </motion.button>
        <motion.button
          className="btn-action"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => downloadImage(imageUrl)}
        >
          💾 Download
        </motion.button>
        <motion.button
          className="btn-action"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRegenerate}
        >
          🔄 New Version
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
