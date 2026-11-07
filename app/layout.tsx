import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BlueStone Estates 🏢 | Flats • Builder Floors • Sector 69, Gurgaon',
  description:
    'Best Deals Guaranteed on Luxury Builder Floors, Flats, Rent & Sale in Sector 69, Gurgaon. Call/WhatsApp: 9818014595. Regrob-inspired verified real estate listings.',
  keywords: [
    'BlueStone Estates',
    'Real Estate Gurgaon',
    'Sector 69 Gurgaon',
    'Builder Floors Sector 69',
    'Flats in Sector 69 Gurgaon',
    'Rent Sale Sector 69',
    'Southern Peripheral Road Flats',
    'Best Deals Guaranteed',
  ],
  icons: {
    icon: '/bluestone-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
