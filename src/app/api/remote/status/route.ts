import { NextResponse } from 'next/server';
import { remoteState } from '@/lib/remoteState';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const isActive = id === remoteState.currentAdminId;
  return NextResponse.json({ isActive });
}
