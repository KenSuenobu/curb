import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CURB: Car Universal Rental App',
  description: 'CURB 0.1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfirmDialog/>
        {children}
      </body>
    </html>
  )
}
