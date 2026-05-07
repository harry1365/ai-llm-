import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AeroReserve - Luxury Private Jets',
  description: 'Book your next private charter with AeroReserve.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
