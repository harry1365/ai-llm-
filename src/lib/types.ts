export interface Flight {
  id: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  aircraftModel: string;
  availableSeats: number;
}

export interface Reservation {
  id: string;
  flightId: string;
  passengerName: string;
  email: string;
  seatsBooked: number;
  totalPrice: number;
  bookingDate: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export interface DatabaseSchema {
  flights: Flight[];
  reservations: Reservation[];
  inquiries: Inquiry[];
}
