import Link from 'next/link';
import { Flight } from '@/lib/types';
import styles from './FlightCard.module.css';

interface Props {
  flight: Flight;
}

export default function FlightCard({ flight }: Props) {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`glass ${styles.card}`}>
      <div className={styles.topSection}>
        <div className={styles.route}>
          <div className={styles.cityBlock}>
            <span className={styles.time}>{formatTime(flight.departureTime)}</span>
            <span className={styles.city}>{flight.departureCity}</span>
            <span className={styles.date}>{formatDate(flight.departureTime)}</span>
          </div>
          
          <div className={styles.flightPath}>
            <div className={styles.line}></div>
            <div className={styles.icon}>✈️</div>
          </div>
          
          <div className={styles.cityBlock}>
            <span className={styles.time}>{formatTime(flight.arrivalTime)}</span>
            <span className={styles.city}>{flight.arrivalCity}</span>
            <span className={styles.date}>{formatDate(flight.arrivalTime)}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Aircraft</span>
            <span className={styles.value}>{flight.aircraftModel}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Available</span>
            <span className={styles.value}>{flight.availableSeats} Seats</span>
          </div>
        </div>
        
        <div className={styles.action}>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            {flight.price.toLocaleString()}
            <span className={styles.perSeat}> / charter</span>
          </div>
          <Link href={`/book/${flight.id}`} className="btn btn-primary">
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
}
