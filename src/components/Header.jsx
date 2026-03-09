import React from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div
      className="header"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        ✨ Magic Coloring Book 🎨
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Type anything and get a coloring page — print it & color away
      </motion.p>
    </motion.div>
  );
}
