'use client';

import { useRouter } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './login.module.css';

export default function LoginGateway() {
  const router = useRouter();

  const handleLogin = (role: 'user' | 'admin') => {
    // For demonstration MVP, we just directly route to the respective dashboard
    // We set a mock cookie so the middleware and APIs know we're "authenticated"
    document.cookie = `auth_session=${role}; path=/; max-age=3600`;
    
    if (role === 'admin') {
      router.push('/dashboard/admin');
    } else {
      router.push('/dashboard/user');
    }
  };

  return (
    <div className={`container ${styles.loginPage}`}>
      <ScrollReveal animation="reveal-up" className={styles.loginContainer}>
        <div className={`glass ${styles.loginCard}`}>
          <div className={styles.header}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.3 2.6c-.2.4.1.9.5 1l6.1 2.3-3.6 3.6-2.8-.7c-.4-.1-.8.1-1 .5l-.9 1.8c-.2.4.1.8.5.9l4.5 1.5 1.5 4.5c.1.4.6.7 1 .5l1.8-.9c.4-.2.6-.6.5-1l-.7-2.8 3.6-3.6 2.3 6.1c.1.4.6.7 1 .5l2.6-1.3c.3-.2.6-.6.5-1.1z"/>
            </svg>
            <h1>AeroReserve <span className="highlight">Portal</span></h1>
            <p>Select your authentication profile to continue.</p>
          </div>

          <div className={styles.actions}>
            <button 
              onClick={() => handleLogin('user')} 
              className={`btn btn-primary ${styles.roleBtn}`}
            >
              <div className={styles.btnIcon}>👤</div>
              <div className={styles.btnText}>
                <strong>Log in as User</strong>
                <span>Access your personal bookings</span>
              </div>
            </button>
            
            <button 
              onClick={() => handleLogin('admin')} 
              className={`btn btn-secondary ${styles.roleBtn}`}
            >
              <div className={styles.btnIcon}>🛡️</div>
              <div className={styles.btnText}>
                <strong>Log in as Admin</strong>
                <span>Access global control center</span>
              </div>
            </button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
