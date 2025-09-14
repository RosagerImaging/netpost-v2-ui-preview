import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@repo/lib';
import Sidebar from '../components/shared/sidebar';

// Setup the Inter font
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI-Native Reselling Assistant',
  description: 'Manage your reselling business with the power of AI.',
};

/**
 * Root layout for the application.
 * Sets up the global font, background color, and main structure with a sidebar.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'bg-[#111111] text-primary-text antialiased'
        )}
      >
        <div className="flex">
          {/* Persistent Sidebar for desktop, managed within the component for mobile */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 lg:p-8 p-4">
            {/* The children prop will be replaced by page components */}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

