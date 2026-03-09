import React from 'react';

export default function LoadingSpinner({ retryCount }) {
  return (
    <div className="card loading">
      <div className="spinner" />
      <p>
        {retryCount > 0
          ? `✨ Retrying (${retryCount})...`
          : '✨ Creating your coloring page...'}
      </p>
    </div>
  );
}
