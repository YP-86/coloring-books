import React from 'react';

export default function ErrorMessage({ message }) {
  return (
    <div className="card">
      <p className="error-message">
        😕 {message || 'Something went wrong. Please try again.'}
      </p>
    </div>
  );
}
