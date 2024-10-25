import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

// define a schema for the notifications
export const interactionSchema = z.object({
  interactions: z.array(
    z.object({
      continueBoolean: z.boolean().describe('Set to false if context suggests that the user input are incorrect or need amending, else true'),
      message: z.string().describe('Message to user based on interaction so far.'),
    }),
  ),
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: interactionSchema,
    prompt:
      `You are a helpful but sharp AI assistant running intake for 
      potential wage & hour claims. You have a fun personality (use emojis!)
      but you are also very sharp and will not let the user get away with 
      incorrect information.` + context,
  });

  return result.toTextStreamResponse();
}