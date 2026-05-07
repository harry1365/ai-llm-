import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '6rem', color: 'var(--accent-color)', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '400px' }}>
        We couldn't locate the page you're looking for. It may have been moved or the charter flight details have changed.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
