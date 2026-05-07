import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Charter Search | AeroReserve',
  description: 'Search our fleet of luxury private jets available for charter worldwide.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
