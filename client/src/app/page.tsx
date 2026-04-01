import Link from 'next/link'



export default function HomePage() {

  return (
    <div>
      <h2>Home Page</h2>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          href="/tasks"
          style={{
            padding: '0.5rem 1rem',
            background: '#1F58D3',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Go to Tasks
        </Link>

        <Link
          href="/about"
          style={{
            padding: '0.5rem 1rem',
            background: '#28a745',
            color: 'white',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Go to About
        </Link>
      </div>
    </div>
  )
}



