'use client';

import { useState, useEffect } from 'react';
import FlightCard from '@/components/FlightCard';
import ScrollReveal from '@/components/ScrollReveal';
import { Flight } from '@/lib/types';
import styles from './search.module.css';

export default function Search() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch('/api/flights');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setFlights(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className={`container animate-fade-in ${styles.page}`}>
      <div className={styles.header}>
        <h1>Available <span className="highlight">Charters</span></h1>
        <p>Select a flight below to proceed with your luxury reservation.</p>
      </div>

      {loading ? (
        <div className={styles.loading}>Curating available flights...</div>
      ) : (
        <div className={styles.resultsList}>
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <ScrollReveal key={flight.id} animation="reveal-up" delay={index * 150}>
                <FlightCard flight={flight} />
              </ScrollReveal>
            ))
          ) : (
            <div className={styles.noResults}>
              No flights currently available. Please check back later.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
