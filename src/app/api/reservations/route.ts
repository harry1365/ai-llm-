import { NextRequest, NextResponse } from 'next/server';
import { getReservations, addReservation, getFlightById } from '@/lib/db';
import { Reservation } from '@/lib/types';

export async function GET(request: NextRequest) {
  const authSession = request.cookies.get('auth_session');
  if (!authSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reservations = await getReservations();
    
    // Populate with flight details for the UI
    const populated = await Promise.all(reservations.map(async (res) => {
      const flight = await getFlightById(res.flightId);
      return { ...res, flightDetails: flight };
    }));

    return NextResponse.json(populated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.flightId || !body.passengerName || !body.email || !body.seatsBooked) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const flight = await getFlightById(body.flightId);
    if (!flight) {
      return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
    }

    if (flight.availableSeats < body.seatsBooked) {
      return NextResponse.json({ error: 'Not enough seats available' }, { status: 400 });
    }

    const newReservation: Reservation = {
      id: crypto.randomUUID(),
      flightId: body.flightId,
      passengerName: body.passengerName,
      email: body.email,
      seatsBooked: Number(body.seatsBooked),
      totalPrice: flight.price * Number(body.seatsBooked),
      bookingDate: new Date().toISOString(),
    };

    await addReservation(newReservation);

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}
