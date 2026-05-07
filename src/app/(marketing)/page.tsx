'use client';

import { useRouter } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/search'); // For MVP, we just navigate to search which will show all available flights
  };

  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <ScrollReveal animation="reveal-up" className={styles.heroContent}>
            <h1 className={styles.title}>
              Elevate Your <span className="highlight">Journey</span>
            </h1>
            <p className={styles.subtitle}>
              Experience unparalleled luxury with AeroReserve. Book your private charter to anywhere in the world.
            </p>
            
            <form className={`glass ${styles.searchWidget}`} onSubmit={handleSearch}>
              <div className={styles.widgetGrid}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" htmlFor="from">From</label>
                  <input type="text" id="from" placeholder="City or Airport" className="input-field" required />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" htmlFor="to">To</label>
                  <input type="text" id="to" placeholder="City or Airport" className="input-field" required />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" htmlFor="date">Date</label>
                  <input type="date" id="date" className="input-field" required />
                </div>
                <div className="input-group" style={{ marginBottom: 0 }}>
                  <label className="input-label" htmlFor="passengers">Passengers</label>
                  <select id="passengers" className="input-field">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className={`btn btn-primary ${styles.searchBtn}`}>
                Find Flights
              </button>
            </form>
          </ScrollReveal>
        </div>
        
        {/* Background Overlay */}
        <div className={styles.heroOverlay}></div>
      </section>

      <section className={`container ${styles.featuresSection}`}>
        <ScrollReveal animation="reveal-fade">
          <h2 className={styles.sectionTitle}>The AeroReserve <span className="highlight">Standard</span></h2>
        </ScrollReveal>
        <div className={styles.featuresGrid}>
          <ScrollReveal animation="reveal-up" delay={100} className={styles.featureCard}>
            <div className={styles.featureIcon}>⚜️</div>
            <h3>Unmatched Luxury</h3>
            <p>Every charter offers bespoke catering, spacious cabins, and an environment tailored to your comfort.</p>
          </ScrollReveal>
          <ScrollReveal animation="reveal-up" delay={200} className={styles.featureCard}>
            <div className={styles.featureIcon}>⏱️</div>
            <h3>Total Flexibility</h3>
            <p>Fly on your schedule. Avoid long security lines and terminal wait times with private boarding.</p>
          </ScrollReveal>
          <ScrollReveal animation="reveal-up" delay={300} className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3>Ultimate Privacy</h3>
            <p>Conduct business or relax in absolute confidentiality with our fully vetted, discreet crews.</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
