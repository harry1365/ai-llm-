import { NextRequest, NextResponse } from 'next/server';
import { getFlights, getFlightById } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const flight = await getFlightById(id);
      if (!flight) {
        return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
      }
      return NextResponse.json(flight);
    }

    const flights = await getFlights();
    return NextResponse.json(flights);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 });
  }
}
