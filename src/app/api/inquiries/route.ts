import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getInquiries } from '@/lib/db';

export async function GET(request: NextRequest) {
  const authSession = request.cookies.get('auth_session');
  if (!authSession || authSession.value !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
