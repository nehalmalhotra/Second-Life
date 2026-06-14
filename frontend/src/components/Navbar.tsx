export default function Navbar() {
  return (
    <nav
      style={{
        background: '#131921',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700 }}>
        amazon
      </span>
      <span style={{ color: '#FF9900', fontSize: '20px', fontWeight: 700, marginLeft: '2px' }}>
        second life
      </span>
    </nav>
  )
}