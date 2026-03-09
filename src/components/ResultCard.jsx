import React from 'react';
import { downloadImage } from '../services/imageService';

export default function ResultCard({ imageUrl, onRegenerate }) {
  return (
    <div className="card result-card">
      <img src={imageUrl} alt="Your coloring page" className="result-image" />
      <div className="action-buttons">
        <button className="btn-action" onClick={() => window.print()}>
          🖨️ Print
        </button>
        <button
          className="btn-action"
          onClick={() => downloadImage(imageUrl)}
        >
          💾 Download
        </button>
        <button className="btn-action" onClick={onRegenerate}>
          🔄 New Version
        </button>
      </div>
    </div>
  );
}
