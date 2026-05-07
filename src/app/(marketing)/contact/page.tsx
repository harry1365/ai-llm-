'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to submit inquiry');
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container animate-fade-in ${styles.page}`}>
      <div className={styles.header}>
        <h1>Contact <span className="highlight">AeroReserve</span></h1>
        <p>Inquire about custom charter flights, fleet management, or bespoke travel itineraries.</p>
      </div>

      <div className={styles.content}>
        <div className={`glass ${styles.info}`}>
          <h3>Global Headquarters</h3>
          <p>1 Aviation Way<br/>New York, NY 10001</p>
          <br/>
          <h3>Direct Line</h3>
          <p>+1 (800) 555-JETS</p>
          <p>charter@aeroreserve.com</p>
        </div>

        <form className={`glass ${styles.form}`} onSubmit={handleSubmit}>
          {success && <div className={styles.success}>Your inquiry has been received. Our concierge will contact you shortly.</div>}
          {error && <div className={styles.error}>{error}</div>}
          
          <div className="input-group">
            <label className="input-label" htmlFor="name">Full Name</label>
            <input required type="text" id="name" name="name" className="input-field" placeholder="Jane Doe" />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input required type="email" id="email" name="email" className="input-field" placeholder="jane@example.com" />
          </div>
          
          <div className="input-group">
            <label className="input-label" htmlFor="message">Your Inquiry</label>
            <textarea required id="message" name="message" className="input-field" rows={5} placeholder="How can we assist you today?"></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}
