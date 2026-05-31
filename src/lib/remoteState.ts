type SSEClient = {
  id: string;
  controller: ReadableStreamDefaultController;
};

class RemoteState {
  currentAdminId: string | null = null;
  clients: Set<SSEClient> = new Set();

  registerAdmin(id: string) {
    this.currentAdminId = id;
    console.log('[RemoteState] New admin registered:', id);
  }

  addClient(client: SSEClient) {
    this.clients.add(client);
    console.log('[RemoteState] Client connected, total:', this.clients.size);
  }

  removeClient(client: SSEClient) {
    this.clients.delete(client);
    console.log('[RemoteState] Client disconnected, total:', this.clients.size);
  }

  broadcastCommand(command: any) {
    const data = `data: ${JSON.stringify(command)}\n\n`;
    const encoder = new TextEncoder();
    for (const client of this.clients) {
      try {
        client.controller.enqueue(encoder.encode(data));
      } catch (e) {
        console.error("Error sending to client", e);
        this.removeClient(client);
      }
    }
  }
}

// Ensure global singleton in Next.js dev
const globalAny: any = global;
if (!globalAny.__remoteState) {
  globalAny.__remoteState = new RemoteState();
}

export const remoteState: RemoteState = globalAny.__remoteState;
