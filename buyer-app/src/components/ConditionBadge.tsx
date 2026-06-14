interface Props {
    condition: string
    size?: 'sm' | 'md' | 'lg'
  }
  
  const badgeStyles: Record<string, { background: string; color: string; border: string }> = {
    'Like New': { background: '#E6F4EA', color: '#1A7340', border: '1px solid #A8D5B5' },
    'Good': { background: '#E8F0FE', color: '#1A56A0', border: '1px solid #A8C4F0' },
    'Acceptable': { background: '#FFF3CD', color: '#856404', border: '1px solid #FFD966' },
    'Below Threshold': { background: '#FCE8E8', color: '#8B1A1A', border: '1px solid #F5A0A0' },
  }
  
  const fontSizes = { sm: '11px', md: '13px', lg: '16px' }
  
  export default function ConditionBadge({ condition, size = 'md' }: Props) {
    const s = badgeStyles[condition] ?? badgeStyles['Good']
    return (
      <span style={{
        ...s,
        padding: '4px 12px',
        borderRadius: '100px',
        fontSize: fontSizes[size],
        fontWeight: 600,
        display: 'inline-block',
      }}>
        {condition}
      </span>
    )
  }