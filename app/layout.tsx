import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'YumYummy — Your Craving Is Calling',
  description: 'Premium fast-food ordering experience built for practice.',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
        <Script
          src="https://cdn.zanderio.ai/widget/loader.js"
          data-id="wdg_2H0qb65QnB8mGDbVX3A2ntNk"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
