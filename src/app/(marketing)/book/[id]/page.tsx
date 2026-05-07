'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Flight } from '@/lib/types';
import styles from './book.module.css';

export default function Book({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(`/api/flights?id=${resolvedParams.id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setFlight(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!flight) return;
    
    setBooking(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      flightId: flight.id,
      passengerName: formData.get('passengerName'),
      email: formData.get('email'),
      seatsBooked: Number(formData.get('seatsBooked')),
    };

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to book');
      router.push('/reservations');
    } catch (err) {
      console.error(err);
      setBooking(false);
    }
  };

  if (loading) return <div className={styles.loading}>Retrieving flight details...</div>;
  if (!flight) return <div className={styles.error}>Flight not found.</div>;

  return (
    <div className={`container animate-fade-in ${styles.page}`}>
      <div className={styles.header}>
        <h1>Secure Your <span className="highlight">Reservation</span></h1>
        <p>Complete the details below to finalize your booking.</p>
      </div>

      <div className={styles.content}>
        <div className={`glass ${styles.summary}`}>
          <h3>Flight Summary</h3>
          <div className={styles.summaryDetails}>
            <p><strong>Route:</strong> {flight.departureCity} to {flight.arrivalCity}</p>
            <p><strong>Date:</strong> {new Date(flight.departureTime).toLocaleDateString()}</p>
            <p><strong>Aircraft:</strong> {flight.aircraftModel}</p>
            <p><strong>Price per Seat:</strong> ${flight.price.toLocaleString()}</p>
          </div>
        </div>

        <form className={`glass ${styles.form}`} onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="passengerName">Primary Passenger Name</label>
            <input required type="text" id="passengerName" name="passengerName" className="input-field" placeholder="Full Name" />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input required type="email" id="email" name="email" className="input-field" placeholder="Email for confirmation" />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="seatsBooked">Number of Seats (Max {flight.availableSeats})</label>
            <input required type="number" id="seatsBooked" name="seatsBooked" className="input-field" min="1" max={flight.availableSeats} defaultValue="1" />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={booking}>
            {booking ? 'Processing...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
}
