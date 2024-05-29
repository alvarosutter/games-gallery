import type { Metadata } from 'next';
import './global.css';
import { Inter } from 'next/font/google';

import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';

export const metadata: Metadata = {
  title: {
    template: 'Games Gallery | %s',
    default: 'Games Gallery',
  },
  description: 'A collection of simple mini-games.',
  keywords: 'games, card games, dice games',
};

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' });

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-inter antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
