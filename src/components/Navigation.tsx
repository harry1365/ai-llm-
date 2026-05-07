'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [authRole, setAuthRole] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    setAuthRole(getCookie('auth_session') || null);
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = 'auth_session=; path=/; max-age=0';
    setAuthRole(null);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.3 2.6c-.2.4.1.9.5 1l6.1 2.3-3.6 3.6-2.8-.7c-.4-.1-.8.1-1 .5l-.9 1.8c-.2.4.1.8.5.9l4.5 1.5 1.5 4.5c.1.4.6.7 1 .5l1.8-.9c.4-.2.6-.6.5-1l-.7-2.8 3.6-3.6 2.3 6.1c.1.4.6.7 1 .5l2.6-1.3c.3-.2.6-.6.5-1.1z"/>
          </svg>
          <span className="serif">AeroReserve</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>Discover</Link>
          <Link href="/search" className={`${styles.navLink} ${pathname === '/search' ? styles.active : ''}`}>Charter Flights</Link>
          
          {authRole ? (
            <>
              <Link 
                href={authRole === 'admin' ? '/dashboard/admin' : '/dashboard/user'} 
                className={`${styles.navLink} ${pathname.startsWith('/dashboard') ? styles.active : ''}`}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>Sign Out</button>
            </>
          ) : (
            <Link href="/login" className={`${styles.navLink} ${pathname === '/login' ? styles.active : ''}`}>Login</Link>
          )}
          
          <Link href="/contact" className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}

