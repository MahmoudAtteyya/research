import { NextResponse } from 'next/server';
import { remoteState } from '@/lib/remoteState';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { adminId, command, ...args } = body;

    if (!adminId || adminId !== remoteState.currentAdminId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    remoteState.broadcastCommand({ command, ...args });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
