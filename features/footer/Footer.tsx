export function Footer() {
  const mono = { fontFamily: 'var(--font-inter), sans-serif' } as React.CSSProperties

  const linkStyle: React.CSSProperties = {
    ...mono,
    fontSize: 8,
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    color: 'rgba(203,193,181,0.14)',
    textDecoration: 'none',
  }

  return (
    <footer style={{ background: '#0B1020', paddingTop: '8vh' }}>
      {/* Thin divider */}
      <div style={{ margin: '0 7vw', height: '0.5px', background: 'rgba(203,193,181,0.06)' }} />

      {/* Single horizontal row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2.5rem 7vw 2.8rem',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Logo mark */}
        <img
          src="/logo.png"
          alt="UNOTUSK"
          style={{ height: 16, width: 'auto', opacity: 0.14, filter: 'brightness(10)' }}
        />

        {/* Footer links — far right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
          <span style={{ ...mono, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(203,193,181,0.12)' }}>
            Zephvion Pvt. Ltd.
          </span>
          <span style={{ ...mono, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(203,193,181,0.12)' }}>
            Built in Bengaluru
          </span>
          <a href="mailto:hello@unotusk.com" style={linkStyle}>
            hello@unotusk.com
          </a>
          <a href="mailto:hello@unotusk.com" style={{ ...linkStyle, color: 'rgba(203,193,181,0.20)' }}>
            Join Lighthouse →
          </a>
        </div>
      </div>
    </footer>
  )
}
