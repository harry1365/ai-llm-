'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div className="glass" style={{ padding: '3rem', borderRadius: '24px', maxWidth: '600px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
        <h1 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
          Something went <span className="highlight">wrong</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          We encountered an unexpected error while processing your request. Our team has been notified.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={() => reset()} 
            className="btn btn-primary"
          >
            Try Again
          </button>
          <Link href="/" className="btn btn-secondary">
            Return Home
          </Link>
        </div>
        {error.digest && (
          <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)' }}>
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
