import { NextRequest, NextResponse } from 'next/server';
import { addInquiry } from '@/lib/db';
import { Inquiry } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newInquiry: Inquiry = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      message: body.message,
      date: new Date().toISOString(),
    };

    await addInquiry(newInquiry);

    return NextResponse.json({ success: true, inquiryId: newInquiry.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}
