import { experimental_createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';

const { GET, POST } = experimental_createMcpHandler({
  tools: {
    rollDice: {
      description: 'Roll a dice.',
      parameters: z.object({
        sides: z.number().optional().default(6),
      }),
      handler: async ({ sides }) => {
        return {
          result: Math.floor(Math.random() * sides) + 1,
        };
      },
    },
  },
});

export { GET, POST };
