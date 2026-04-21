import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ComponentStyles from '@/components/ComponentStyles';
import Topbar from '@/components/Topbar';
import SearchModal from '@/components/SearchModal';

export const metadata: Metadata = {
  title: 'UI CORE',
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
        <main className="main-content">
          <Topbar />
          {children}
        </main>
        <SearchModal />
      </body>
    </html>
  );
}
