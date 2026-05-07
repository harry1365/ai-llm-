'use client';

import { useState, useEffect } from 'react';
import { Reservation, Flight } from '@/lib/types';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './user.module.css';

interface PopulatedReservation extends Reservation {
  flightDetails?: Flight;
}

export default function UserDashboard() {
  const [reservations, setReservations] = useState<PopulatedReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch('/api/reservations');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        // In a real app, we'd filter by logged in user ID. For MVP we show all.
        setReservations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  return (
    <div className={`animate-fade-in ${styles.dashboard}`}>
      <header className={styles.header}>
        <div>
          <h1 className="text-gradient">Welcome back, <span className="text-gradient-gold">Jane</span></h1>
          <p>Here is an overview of your upcoming luxury charters.</p>
        </div>
        <div className={styles.profileMock}>
          <div className={styles.avatar}>JD</div>
          <div className={styles.userInfo}>
            <strong>Jane Doe</strong>
            <span>jane@example.com</span>
          </div>
        </div>
      </header>

      {loading ? (
        <div className={styles.loading}>Loading your itinerary...</div>
      ) : (
        <div className={styles.grid}>
          {reservations.length > 0 ? (
            reservations.map((res, index) => (
              <ScrollReveal key={res.id} animation="reveal-up" delay={index * 150} className={`glass ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.badgeWrapper}>
                    <span className={styles.bookingId}>#{res.id.substring(0, 8).toUpperCase()}</span>
                    <span className={styles.status}>Confirmed</span>
                  </div>
                  <div className={styles.price}>${res.totalPrice.toLocaleString()}</div>
                </div>
                
                <div className={styles.cardBody}>
                  {res.flightDetails && (
                    <div className={styles.routeWrapper}>
                      <div className={styles.city}>
                        <span className={styles.cityCode}>{res.flightDetails.departureCity.substring(0,3).toUpperCase()}</span>
                        <span className={styles.cityName}>{res.flightDetails.departureCity}</span>
                      </div>
                      <div className={styles.flightPath}>
                        <div className={styles.line}></div>
                        <span className={styles.planeIcon}>✈️</span>
                      </div>
                      <div className={styles.city}>
                        <span className={styles.cityCode}>{res.flightDetails.arrivalCity.substring(0,3).toUpperCase()}</span>
                        <span className={styles.cityName}>{res.flightDetails.arrivalCity}</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Passenger</span>
                      <span className={styles.value}>{res.passengerName}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.label}>Seats</span>
                      <span className={styles.value}>{res.seatsBooked}</span>
                    </div>
                    {res.flightDetails && (
                      <>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>Date</span>
                          <span className={styles.value}>{new Date(res.flightDetails.departureTime).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.label}>Aircraft</span>
                          <span className={styles.value}>{res.flightDetails.aircraftModel}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className={styles.noReservations}>
              You have no upcoming flights. <a href="/search" className="highlight">Discover our fleet.</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
