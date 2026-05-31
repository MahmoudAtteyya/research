import { NextResponse } from 'next/server';
import { remoteState } from '@/lib/remoteState';

export async function POST() {
  const id = crypto.randomUUID();
  remoteState.registerAdmin(id);
  return NextResponse.json({ adminId: id });
}
