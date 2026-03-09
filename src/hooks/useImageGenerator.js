import { useState, useRef, useCallback } from 'react';
import { generateImage } from '../services/imageService';

const MAX_RETRIES = 2;
const RETRY_DELAY = 3000;

/**
 * Custom hook for image generation with retry logic
 */
export function useImageGenerator() {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const abortRef = useRef(null);
  const prevBlobRef = useRef(null);

  const generate = useCallback(async (prompt) => {
    // Cancel any in-progress generation
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    setRetryCount(0);

    let attempts = 0;

    const attempt = async () => {
      try {
        const blobUrl = await generateImage(prompt, controller.signal);

        // Revoke previous blob URL to free memory
        if (prevBlobRef.current) {
          URL.revokeObjectURL(prevBlobRef.current);
        }
        prevBlobRef.current = blobUrl;

        setImageUrl(blobUrl);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') return;

        attempts++;
        setRetryCount(attempts);

        if (attempts <= MAX_RETRIES && !err.message.includes('token')) {
          await new Promise((r) => setTimeout(r, RETRY_DELAY));
          if (!controller.signal.aborted) {
            return attempt();
          }
        } else {
          setIsLoading(false);
          setError(err.message);
        }
      }
    };

    await attempt();
  }, []);

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return { imageUrl, isLoading, error, retryCount, generate, cancel };
}
