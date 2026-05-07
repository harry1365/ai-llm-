'use client';

import { useState, useEffect } from 'react';
import { Reservation, Flight, Inquiry } from '@/lib/types';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './admin.module.css';

interface PopulatedReservation extends Reservation {
  flightDetails?: Flight;
}

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<PopulatedReservation[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRes, inqRes] = await Promise.all([
          fetch('/api/reservations'),
          fetch('/api/inquiries')
        ]);
        
        if (resRes.ok) setReservations(await resRes.json());
        if (inqRes.ok) setInquiries(await inqRes.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteReservation = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this reservation?')) return;
    
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setReservations(prev => prev.filter(r => r.id !== id));
      } else {
        alert('Failed to delete reservation');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  const totalRevenue = reservations.reduce((sum, res) => sum + res.totalPrice, 0);

  return (

    <div className={`animate-fade-in ${styles.dashboard}`}>
      <header className={styles.header}>
        <div>
          <h1 className="text-gradient">Control <span className="text-gradient-gold">Center</span></h1>
          <p>Global overview of operations, fleet, and bookings.</p>
        </div>
        <div className={styles.dateDisplay}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      {loading ? (
        <div className={styles.loading}>Connecting to global database...</div>
      ) : (
        <>
          <div className={styles.metricsGrid}>
            <ScrollReveal animation="reveal-up" delay={0} className={`glass ${styles.metricCard}`}>
              <div className={styles.metricIcon}>💰</div>
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Total Revenue</span>
                <span className={styles.metricValue}>${totalRevenue.toLocaleString()}</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="reveal-up" delay={100} className={`glass ${styles.metricCard}`}>
              <div className={styles.metricIcon}>📋</div>
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Active Bookings</span>
                <span className={styles.metricValue}>{reservations.length}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="reveal-up" delay={200} className={`glass ${styles.metricCard}`}>
              <div className={styles.metricIcon}>✉️</div>
              <div className={styles.metricInfo}>
                <span className={styles.metricLabel}>Pending Inquiries</span>
                <span className={styles.metricValue}>{inquiries.length}</span>
              </div>
            </ScrollReveal>
          </div>

          <div className={styles.tablesContainer}>
            <ScrollReveal animation="reveal-up" delay={300} className={`glass ${styles.tableSection}`}>
              <div className={styles.sectionHeader}>
                <h2>Recent Reservations</h2>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View All</button>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Passenger</th>
                      <th>Route</th>
                      <th>Revenue</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.slice(0, 5).map(res => (
                      <tr key={res.id}>
                        <td className={styles.mono}>{res.id.substring(0,8).toUpperCase()}</td>
                        <td>{res.passengerName}</td>
                        <td>{res.flightDetails ? `${res.flightDetails.departureCity.substring(0,3).toUpperCase()} ✈ ${res.flightDetails.arrivalCity.substring(0,3).toUpperCase()}` : 'N/A'}</td>
                        <td className={styles.revenue}>${res.totalPrice.toLocaleString()}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span className={styles.statusBadge}>Confirmed</span>
                            <button 
                              onClick={() => handleDeleteReservation(res.id)} 
                              className={styles.actionBtn}
                              style={{ color: '#ef4444', borderColor: '#ef4444' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {reservations.length === 0 && (
                      <tr><td colSpan={5} style={{textAlign: 'center', padding: '2rem'}}>No active reservations.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>


            <ScrollReveal animation="reveal-up" delay={400} className={`glass ${styles.tableSection}`}>
              <div className={styles.sectionHeader}>
                <h2>Charter Inquiries</h2>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>View All</button>
              </div>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map(inq => (
                      <tr key={inq.id}>
                        <td>{new Date(inq.date).toLocaleDateString()}</td>
                        <td>{inq.name}</td>
                        <td>{inq.email}</td>
                        <td><button className={styles.actionBtn}>Reply</button></td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr><td colSpan={4} style={{textAlign: 'center', padding: '2rem'}}>No pending inquiries.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </>
      )}
    </div>
  );
}
