import React from 'react';
import { motion } from 'framer-motion';
import samplePrompts from '../utils/samplePrompts';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.6 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function PromptChips({ onSelect }) {
  return (
    <motion.div
      className="chips"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {samplePrompts.map((sp) => (
        <motion.button
          key={sp.prompt}
          className="chip"
          variants={item}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => onSelect(sp.prompt)}
        >
          {sp.emoji} {sp.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
