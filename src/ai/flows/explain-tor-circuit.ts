'use server';
/**
 * @fileOverview Provides a Genkit flow for explaining a Tor circuit to a user.
 *
 * - explainTorCircuit - A function that generates an explanation of a Tor circuit.
 * - ExplainTorCircuitInput - The input type for the explainTorCircuit function.
 * - ExplainTorCircuitOutput - The return type for the explainTorCircuit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TorNodeSchema = z.object({
  ip: z.string().ip().describe('The IP address of the Tor node.'),
  country: z.string().describe('The country where the Tor node is located.'),
  city: z.string().describe('The city where the Tor node is located.'),
});

const ExplainTorCircuitInputSchema = z.object({
  entryNode: TorNodeSchema.describe('Details of the entry guard Tor node.'),
  middleNode: TorNodeSchema.describe('Details of the middle relay Tor node.'),
  exitNode: TorNodeSchema.describe('Details of the exit Tor node.'),
});
export type ExplainTorCircuitInput = z.infer<typeof ExplainTorCircuitInputSchema>;

const ExplainTorCircuitOutputSchema = z.object({
  explanation: z.string().describe('An easy-to-understand explanation of the Tor circuit and its privacy benefits.'),
});
export type ExplainTorCircuitOutput = z.infer<typeof ExplainTorCircuitOutputSchema>;

export async function explainTorCircuit(input: ExplainTorCircuitInput): Promise<ExplainTorCircuitOutput> {
  return explainTorCircuitFlow(input);
}

const explainTorCircuitPrompt = ai.definePrompt({
  name: 'explainTorCircuitPrompt',
  input: { schema: ExplainTorCircuitInputSchema },
  output: { schema: ExplainTorCircuitOutputSchema },
  prompt: `You are an expert in network security and privacy, specializing in Tor.
Your task is to provide an easy-to-understand explanation of a user's current Tor circuit, detailing each node's role, approximate location, and the privacy benefits of this multi-hop setup.

Here are the details of the current Tor circuit:

Entry Node:
  - IP: {{{entryNode.ip}}}
  - Location: {{{entryNode.city}}}, {{{entryNode.country}}}

Middle Node:
  - IP: {{{middleNode.ip}}}
  - Location: {{{middleNode.city}}}, {{{middleNode.country}}}

Exit Node:
  - IP: {{{exitNode.ip}}}
  - Location: {{{exitNode.city}}}, {{{exitNode.country}}}

Please explain the circuit clearly, focusing on:
1.  What each node (entry, middle, exit) does in the circuit.
2.  How the combination of these three nodes helps protect the user's anonymity and privacy.
3.  Keep the language accessible to a non-technical user.`,
});

const explainTorCircuitFlow = ai.defineFlow(
  {
    name: 'explainTorCircuitFlow',
    inputSchema: ExplainTorCircuitInputSchema,
    outputSchema: ExplainTorCircuitOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await explainTorCircuitPrompt(input);
      return output!;
    } catch (error) {
      // Fallback analysis if AI is offline
      return {
        explanation: `Dieser Tor-Circuit nutzt drei verschlüsselte Hops für maximale Anonymität. Der Guard-Knoten in ${input.entryNode.city} verbirgt Ihre reale IP vor dem Netzwerk. Der Relay in ${input.middleNode.city} verschleiert den Pfad weiter, sodass kein Knoten den gesamten Weg kennt. Der Exit-Knoten in ${input.exitNode.city} stellt die finale, verschlüsselte Verbindung zum Ziel her. Ihre Identität bleibt durch diese mehrlagige Architektur vollständig geschützt.`
      };
    }
  },
);
