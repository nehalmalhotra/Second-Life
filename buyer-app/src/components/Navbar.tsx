interface NavbarProps {
    showSearch?: boolean
    searchQuery?: string
  }
  
  export default function Navbar({ showSearch = false, searchQuery = '' }: NavbarProps) {
    return (
      <nav style={{
        background: '#131921',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', flexShrink: 0 }}>
          <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700 }}>amazon</span>
          <span style={{ color: '#FF9900', fontSize: '20px', fontWeight: 700 }}>second life</span>
        </div>
  
        {showSearch && (
          <div style={{
            flex: 1,
            background: '#FFFFFF',
            borderRadius: '6px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '320px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{ fontSize: '13px', color: '#555555' }}>{searchQuery || 'Search Second Life'}</span>
          </div>
        )}
  
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <span style={{ fontSize: '12px', color: '#FFFFFF' }}>
            Delivering to{' '}
            <span style={{ fontWeight: 600, color: '#FF9900' }}>Ashish · Mumbai</span>
          </span>
        </div>
      </nav>
    )
  }