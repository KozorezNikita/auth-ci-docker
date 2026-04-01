import './globals.css'
import { ReactNode } from 'react'
import Providers from './providers'

export const metadata = {
  title: 'Task Manager',
  description: 'Навчальний фронтенд Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: 0 }}>
        <header style={{ background: '#1F58D3', color: 'white', padding: '1rem' }}>
          <h1>Task Manager</h1>
        </header>
          <Providers>
            <main style={{ padding: '2rem' }}>{children}</main>
          </Providers>
      </body>
    </html>
  )
}