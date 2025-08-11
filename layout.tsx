import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './AuthContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Value Meet - 会議効率向上アプリ',
  description: '会議の効率性を向上させる統合管理システム',
};
