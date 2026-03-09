import React, { useState } from 'react';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import PromptChips from './components/PromptChips';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';
import ErrorMessage from './components/ErrorMessage';
import { useImageGenerator } from './hooks/useImageGenerator';
import './styles/App.css';

export default function App() {
  const { imageUrl, isLoading, error, retryCount, generate } =
    useImageGenerator();
  const [lastPrompt, setLastPrompt] = useState('');

  const handleGenerate = (prompt) => {
    setLastPrompt(prompt);
    generate(prompt);
  };

  return (
    <div className="app">
      <div className="container">
        <Header />

        <div className="card">
          <PromptChips onSelect={handleGenerate} />
          <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {isLoading && <LoadingSpinner retryCount={retryCount} />}

        {error && !isLoading && <ErrorMessage message={error} />}

        {imageUrl && !isLoading && !error && (
          <ResultCard
            imageUrl={imageUrl}
            onRegenerate={() => generate(lastPrompt)}
          />
        )}

        <div className="footer">Made with ✨ magic and a sprinkle of AI</div>
      </div>
    </div>
  );
}
