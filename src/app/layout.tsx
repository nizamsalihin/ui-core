import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ComponentStyles from '@/components/ComponentStyles';

export const metadata: Metadata = {
  title: 'UI Component Docs',
  description: 'Documentation for our UI components',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ComponentStyles />
      </head>
      <body>
        <Sidebar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
