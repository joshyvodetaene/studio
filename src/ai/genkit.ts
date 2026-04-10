
'use client';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Initialisiert Genkit für den Client-Einsatz.
 * Wichtig: Wir nutzen hier nur die Plugins, die im Browser funktionieren.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
