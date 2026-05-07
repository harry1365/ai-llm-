'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './DashboardSidebar.module.css';

interface Props {
  role: 'user' | 'admin';
}

export default function DashboardSidebar({ role }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const userLinks = [
    { name: 'My Flights', href: '/dashboard/user', icon: '✈️' },
    { name: 'Profile', href: '#', icon: '👤' },
    { name: 'Support', href: '/contact', icon: '📞' },
  ];

  const adminLinks = [
    { name: 'Overview', href: '/dashboard/admin', icon: '📊' },
    { name: 'Reservations', href: '#', icon: '📋' },
    { name: 'Inquiries', href: '#', icon: '✉️' },
    { name: 'Fleet', href: '#', icon: '✈️' },
  ];

  const links = role === 'admin' ? adminLinks : userLinks;

  const handleSignOut = () => {
    document.cookie = 'auth_session=; path=/; max-age=0';
    router.push('/login');
    router.refresh();
  };

  const handleExit = () => {
    // We don't necessarily want to sign out when exiting to site, 
    // just navigate back. But if they want to clear session, they can.
    // For now, let's just navigate.
    router.push('/');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.roleBadge}>{role === 'admin' ? 'Admin Portal' : 'User Portal'}</span>
      </div>
      
      <nav className={styles.navMenu}>
        {links.map(link => (
          <Link 
            key={link.name} 
            href={link.href}
            className={`${styles.navItem} ${pathname === link.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{link.icon}</span>
            <span className={styles.name}>{link.name}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={`${styles.logoutBtn} ${styles.exitBtn}`} onClick={handleExit}>
          <span className={styles.icon}>🌐</span>
          <span className={styles.name}>Exit to Site</span>
        </button>
        <button className={styles.logoutBtn} onClick={handleSignOut}>
          <span className={styles.icon}>🚪</span>
          <span className={styles.name}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

