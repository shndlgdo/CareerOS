import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerOS',
  description: 'Your career, remembered.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
