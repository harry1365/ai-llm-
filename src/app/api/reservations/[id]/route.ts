import { NextRequest, NextResponse } from 'next/server';
import { deleteReservation } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authSession = request.cookies.get('auth_session');
  
  // Only admins can delete reservations
  if (authSession?.value !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await deleteReservation(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}
