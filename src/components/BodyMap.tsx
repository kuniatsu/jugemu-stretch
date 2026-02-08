import { getZonesBySide, type BodyZone } from '../data/bodyZones'
import { colors, fontSize, borderRadius } from '../styles/theme'

interface BodyMapProps {
  side: 'front' | 'back'
  onZonePress: (zone: BodyZone) => void
}

export function BodyMap({ side, onZonePress }: BodyMapProps) {
  const zones = getZonesBySide(side)

  return (
    <div style={styles.container}>
      <svg viewBox="0 0 200 460" style={styles.svg}>
        {/* Head */}
        <ellipse cx="100" cy="30" rx="22" ry="26" fill={colors.bodyFront} stroke="#ccc" strokeWidth="1" />
        {/* Neck */}
        <rect x="90" y="54" width="20" height="16" fill={colors.bodyFront} stroke="#ccc" strokeWidth="0.5" />
        {/* Torso */}
        <path
          d="M60,70 Q55,68 48,80 L38,130 L38,190 Q38,210 55,220 L70,225 L130,225 L145,220 Q162,210 162,190 L162,130 L152,80 Q145,68 140,70 Z"
          fill={colors.bodyFront}
          stroke="#ccc"
          strokeWidth="1"
        />
        {/* Left Arm */}
        <path
          d="M48,80 Q35,85 28,110 L20,160 L18,200 Q17,210 22,210 L30,205 L35,160 L38,130"
          fill={colors.bodyFront}
          stroke="#ccc"
          strokeWidth="1"
        />
        {/* Right Arm */}
        <path
          d="M152,80 Q165,85 172,110 L180,160 L182,200 Q183,210 178,210 L170,205 L165,160 L162,130"
          fill={colors.bodyFront}
          stroke="#ccc"
          strokeWidth="1"
        />
        {/* Left Leg */}
        <path
          d="M70,225 L65,280 L60,340 L55,400 Q53,420 58,430 L72,430 Q76,420 74,400 L80,340 L85,280 L90,225"
          fill={colors.bodyFront}
          stroke="#ccc"
          strokeWidth="1"
        />
        {/* Right Leg */}
        <path
          d="M110,225 L115,280 L120,340 L125,400 Q127,420 122,430 L108,430 Q104,420 106,400 L100,340 L95,280 L90,225"
          fill={colors.bodyFront}
          stroke="#ccc"
          strokeWidth="1"
        />

        {/* Clickable Zone Overlays */}
        {zones.map((zone) => {
          const svgX = (zone.x / 100) * 200 - (zone.width / 100) * 200 / 2
          const svgY = (zone.y / 100) * 460 - (zone.height / 100) * 460 / 2
          const svgW = (zone.width / 100) * 200
          const svgH = (zone.height / 100) * 460

          return (
            <g key={zone.id} onClick={() => onZonePress(zone)} style={{ cursor: 'pointer' }}>
              <rect
                x={svgX}
                y={svgY}
                width={svgW}
                height={svgH}
                fill={colors.zoneHighlight}
                stroke={colors.zoneBorder}
                strokeWidth="1.5"
                rx="4"
                ry="4"
              />
              <text
                x={svgX + svgW / 2}
                y={svgY + svgH / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="10"
                fill={colors.text}
                fontWeight="bold"
              >
                {zone.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  svg: {
    width: '70%',
    maxWidth: 280,
    height: 'auto',
  },
  zoneLabel: {
    fontSize: fontSize.xs,
    fill: colors.text,
    textAnchor: 'middle' as const,
    dominantBaseline: 'central' as const,
    fontWeight: 'bold',
    pointerEvents: 'none' as const,
    borderRadius: borderRadius.sm,
  },
}
