import { getZonesBySide, type BodyZone } from '../data/bodyZones'
import { colors, fontSize, borderRadius } from '../styles/theme'
import frontSkull from '../assets/images/front_skull.png'
import backSkull from '../assets/images/back_skull.png'

interface BodyMapProps {
  side: 'front' | 'back'
  onZonePress: (zone: BodyZone) => void
}

export function BodyMap({ side, onZonePress }: BodyMapProps) {
  const zones = getZonesBySide(side)
  const imageSrc = side === 'front' ? frontSkull : backSkull

  return (
    <div id="bodymap-container" style={styles.container}>
      <div id="bodymap-image-wrapper" style={styles.imageWrapper}>
        <img
          id="bodymap-image"
          src={imageSrc}
          alt={side === 'front' ? '前面' : '背面'}
          style={styles.image}
        />
        {/* Clickable Zone Overlays */}
        {zones.map((zone) => (
          <button
            key={zone.id}
            id={`bodymap-zone-${zone.id}`}
            style={{
              ...styles.zone,
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
            }}
            onClick={() => onZonePress(zone)}
          >
            <span id={`bodymap-zone-label-${zone.id}`} style={styles.zoneLabel}>
              {zone.name}
            </span>
          </button>
        ))}
      </div>
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
  imageWrapper: {
    position: 'relative',
    width: '75%',
    maxWidth: 300,
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    pointerEvents: 'none',
  },
  zone: {
    position: 'absolute',
    backgroundColor: colors.zoneHighlight,
    border: `1.5px solid ${colors.zoneBorder}`,
    borderRadius: borderRadius.sm,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    WebkitTapHighlightColor: 'transparent',
    transition: 'background-color 0.15s',
  },
  zoneLabel: {
    fontSize: fontSize.xs,
    fontWeight: 'bold',
    color: colors.text,
    textShadow: '0 0 3px rgba(255,255,255,0.8)',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
}
