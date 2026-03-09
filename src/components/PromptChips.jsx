import React from 'react';
import samplePrompts from '../utils/samplePrompts';

export default function PromptChips({ onSelect }) {
  return (
    <div className="chips">
      {samplePrompts.map((item) => (
        <button
          key={item.prompt}
          className="chip"
          onClick={() => onSelect(item.prompt)}
        >
          {item.emoji} {item.label}
        </button>
      ))}
    </div>
  );
}
