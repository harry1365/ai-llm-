import fs from 'fs/promises';
import path from 'path';
import { DatabaseSchema, Flight, Reservation } from './types';

const dataFilePath = path.join(process.cwd(), 'data.json');

const INITIAL_FLIGHTS: Flight[] = [
  {
    id: 'f1',
    departureCity: 'New York (JFK)',
    arrivalCity: 'London (LHR)',
    departureTime: '2026-06-15T18:00:00Z',
    arrivalTime: '2026-06-16T06:00:00Z',
    price: 15000,
    aircraftModel: 'Gulfstream G650',
    availableSeats: 8,
  },
  {
    id: 'f2',
    departureCity: 'Los Angeles (LAX)',
    arrivalCity: 'Tokyo (HND)',
    departureTime: '2026-06-20T10:00:00Z',
    arrivalTime: '2026-06-21T14:00:00Z',
    price: 25000,
    aircraftModel: 'Bombardier Global 7500',
    availableSeats: 12,
  },
  {
    id: 'f3',
    departureCity: 'Miami (MIA)',
    arrivalCity: 'Dubai (DXB)',
    departureTime: '2026-07-05T20:00:00Z',
    arrivalTime: '2026-07-06T18:00:00Z',
    price: 35000,
    aircraftModel: 'Dassault Falcon 8X',
    availableSeats: 10,
  }
];

// Initialize the data file if it doesn't exist
async function initDb() {
  try {
    const content = await fs.readFile(dataFilePath, 'utf-8');
    // Basic validation, if it's the old aircraft array, reset it
    const data = JSON.parse(content);
    if (Array.isArray(data)) {
      throw new Error('Old schema detected');
    }
  } catch (error) {
    const initialData: DatabaseSchema = { flights: INITIAL_FLIGHTS, reservations: [], inquiries: [] };
    await fs.writeFile(dataFilePath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

async function getDb(): Promise<DatabaseSchema> {
  await initDb();
  const data = await fs.readFile(dataFilePath, 'utf-8');
  const parsed = JSON.parse(data);
  if (!parsed.inquiries) parsed.inquiries = [];
  return parsed;
}

async function saveDb(data: DatabaseSchema): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getFlights(): Promise<Flight[]> {
  const db = await getDb();
  return db.flights;
}

export async function getFlightById(id: string): Promise<Flight | undefined> {
  const flights = await getFlights();
  return flights.find(f => f.id === id);
}

export async function getReservations(): Promise<Reservation[]> {
  const db = await getDb();
  return db.reservations;
}

export async function addReservation(reservation: Reservation): Promise<void> {
  const db = await getDb();
  
  // Decrease available seats
  const flightIndex = db.flights.findIndex(f => f.id === reservation.flightId);
  if (flightIndex !== -1) {
    db.flights[flightIndex].availableSeats -= reservation.seatsBooked;
  }

  db.reservations.push(reservation);
  await saveDb(db);
}

export async function addInquiry(inquiry: import('./types').Inquiry): Promise<void> {
  const db = await getDb();
  db.inquiries.push(inquiry);
  await saveDb(db);
}

export async function getInquiries(): Promise<import('./types').Inquiry[]> {
  const db = await getDb();
  return db.inquiries || [];
}

export async function deleteReservation(id: string): Promise<void> {
  const db = await getDb();
  const resIndex = db.reservations.findIndex(r => r.id === id);
  if (resIndex !== -1) {
    const reservation = db.reservations[resIndex];
    // Restore available seats
    const flightIndex = db.flights.findIndex(f => f.id === reservation.flightId);
    if (flightIndex !== -1) {
      db.flights[flightIndex].availableSeats += reservation.seatsBooked;
    }
    db.reservations.splice(resIndex, 1);
    await saveDb(db);
  }
}

