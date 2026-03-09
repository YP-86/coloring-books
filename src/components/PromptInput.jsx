import React, { useState, useRef } from 'react';

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
    <div>
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
      <button
        className="btn-generate"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? '⏳ Generating...' : '🪄 Generate Coloring Page'}
      </button>
    </div>
  );
}
