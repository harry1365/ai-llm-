import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div style={{ marginTop: 'var(--nav-height)', minHeight: 'calc(100vh - var(--nav-height))', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </div>
    </>
  );
}
