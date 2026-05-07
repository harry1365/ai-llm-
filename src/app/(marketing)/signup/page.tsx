'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import styles from '../login/login.module.css';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Set mock cookie (default to user role for signup)
    document.cookie = `auth_session=user; path=/; max-age=3600`;
    
    router.push('/dashboard/user');
    router.refresh();
  };

  return (
    <div className={`container ${styles.loginPage}`}>
      <ScrollReveal animation="reveal-up" className={styles.loginContainer}>
        <div className={`glass ${styles.loginCard}`}>
          <div className={styles.header}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.3 2.6c-.2.4.1.9.5 1l6.1 2.3-3.6 3.6-2.8-.7c-.4-.1-.8.1-1 .5l-.9 1.8c-.2.4.1.8.5.9l4.5 1.5 1.5 4.5c.1.4.6.7 1 .5l1.8-.9c.4-.2.6-.6.5-1l-.7-2.8 3.6-3.6 2.3 6.1c.1.4.6.7 1 .5l2.6-1.3c.3-.2.6-.6.5-1.1z"/>
            </svg>
            <h1 className="serif">Join <span className="highlight">AeroReserve</span></h1>
            <p>Create your profile to start booking private charters.</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                className={styles.input} 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input 
                type="password" 
                className={styles.input} 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input 
                type="password" 
                className={styles.input} 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <div className={styles.options}>
              <label className={styles.checkboxGroup}>
                <input type="checkbox" required />
                <span>I agree to the Terms of Service</span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary ${styles.submitBtn}`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <div className={styles.footer}>
            Already have an account? 
            <Link href="/login" className={styles.link}>Sign In</Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
