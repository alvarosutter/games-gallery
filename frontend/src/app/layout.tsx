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
      <body className="flex min-h-svh flex-col items-center justify-start bg-[#121212] font-inter text-[#F5F5F5] antialiased">
        <Header />
        <main className="my-8 w-full max-w-[80%] sm:my-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
