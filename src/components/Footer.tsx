import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandColumn}>
          <h2>Aero<span className="highlight">Reserve</span></h2>
          <p>Elevating global travel with unparalleled luxury and discretion.</p>
        </div>
        
        <div className={styles.linksColumn}>
          <h3>Company</h3>
          <ul>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Our Fleet</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="#">Careers</Link></li>
          </ul>
        </div>

        <div className={styles.linksColumn}>
          <h3>Legal</h3>
          <ul>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className={`container ${styles.footerBottom}`}>
        <p>&copy; {currentYear} AeroReserve. All rights reserved.</p>
      </div>
    </footer>
  );
}
