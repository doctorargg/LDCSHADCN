import { createMcpHandler } from '@vercel/mcp-adapter';
import { McpServer } from '@modelcontextprotocol/sdk';
import { z } from 'zod';

const handler = createMcpHandler(async (server: McpServer) => {
  server.tools = {
    rollDice: {
      description: 'Roll a dice.',
      parameters: z.object({
        sides: z.number().optional().default(6),
      }),
      handler: async ({ sides }: { sides: number }) => {
        return {
          result: Math.floor(Math.random() * sides) + 1,
        };
      },
    },
  };
});

export const GET = handler;
export const POST = handler;
