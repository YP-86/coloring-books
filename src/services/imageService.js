/**
 * Image Generation Service
 * Handles all communication with the HuggingFace Inference API
 */

const HF_MODEL_URL =
  'https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell';

const COLORING_SUFFIX =
  ', black and white line art coloring book page, simple bold outlines, no shading, white background, clean lines for coloring';

/**
 * Get the API token from environment variable (injected at build time)
 */
function getApiToken() {
  return process.env.REACT_APP_HF_TOKEN || '';
}

/**
 * Generate a coloring book image from a text prompt
 * @param {string} prompt - User's text prompt
 * @param {AbortSignal} [signal] - Optional abort signal for cancellation
 * @returns {Promise<string>} - Object URL of the generated image blob
 */
export async function generateImage(prompt, signal) {
  const token = getApiToken();
  if (!token) {
    throw new Error('API token not configured. Please set REACT_APP_HF_TOKEN.');
  }

  const fullPrompt = prompt.trim() + COLORING_SUFFIX;

  const response = await fetch(HF_MODEL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: fullPrompt,
    }),
    signal,
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error('Invalid API token. Check your Hugging Face key.');
  }

  if (!response.ok) {
    throw new Error(`Generation failed (HTTP ${response.status})`);
  }

  const blob = await response.blob();
  if (blob.size < 1000) {
    throw new Error('Generated image is too small — please try again.');
  }

  return URL.createObjectURL(blob);
}

/**
 * Download an image from a blob URL
 * @param {string} blobUrl - The blob URL of the image
 * @param {string} [filename='coloring-page.jpg'] - Download filename
 */
export function downloadImage(blobUrl, filename = 'coloring-page.jpg') {
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
