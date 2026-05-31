import { remoteState } from '@/lib/remoteState';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  let controller: ReadableStreamDefaultController;
  const id = crypto.randomUUID();

  const stream = new ReadableStream({
    start(c) {
      controller = c;
      const client = { id, controller };
      remoteState.addClient(client);

      const interval = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(': heartbeat\n\n'));
        } catch (e) {
          clearInterval(interval);
          remoteState.removeClient(client);
        }
      }, 15000);

      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        remoteState.removeClient(client);
      });
    },
    cancel() {
      remoteState.clients.forEach(c => {
        if (c.id === id) remoteState.removeClient(c);
      });
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  });
}
