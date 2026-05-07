export default function Loading() {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-color)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div className="loader-float">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.5l-1.3 2.6c-.2.4.1.9.5 1l6.1 2.3-3.6 3.6-2.8-.7c-.4-.1-.8.1-1 .5l-.9 1.8c-.2.4.1.8.5.9l4.5 1.5 1.5 4.5c.1.4.6.7 1 .5l1.8-.9c.4-.2.6-.6.5-1l-.7-2.8 3.6-3.6 2.3 6.1c.1.4.6.7 1 .5l2.6-1.3c.3-.2.6-.6.5-1.1z"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <span className="serif" style={{ fontSize: '1.5rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent-color)', opacity: 0.8 }}>
            AeroReserve
          </span>
          <div style={{ width: '200px', height: '2px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '1px', overflow: 'hidden', position: 'relative' }}>
            <div className="loader-bar-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
