import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function PromptInput({ onGenerate, isLoading }) {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setHasError(true);
      inputRef.current?.focus();
      setTimeout(() => setHasError(false), 1000);
      return;
    }
    onGenerate(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <input
        ref={inputRef}
        type="text"
        className={`prompt-input ${hasError ? 'error' : ''}`}
        placeholder="What should we draw? (e.g., a dragon in a castle)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <motion.button
        className="btn-generate"
        onClick={handleSubmit}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {isLoading ? '⏳ Generating...' : '🪄 Generate Coloring Page'}
      </motion.button>
    </motion.div>
  );
}
