import { getZonesBySide, type BodyZone } from '../data/bodyZones'
import { colors, fontSize, borderRadius } from '../styles/theme'

const BASE = import.meta.env.BASE_URL

interface BodyMapProps {
  side: 'front' | 'back'
  onZonePress: (zone: BodyZone) => void
}

export function BodyMap({ side, onZonePress }: BodyMapProps) {
  const zones = getZonesBySide(side)
  const imageSrc = side === 'front'
    ? `${BASE}img/front_skull_.png`
    : `${BASE}img/back_skull_.png`

  return (
    <div id="bodymap-container" style={styles.container}>
      <div id="bodymap-image-wrapper" style={styles.imageWrapper}>
        <img
          id="bodymap-image"
          src={imageSrc}
          alt={side === 'front' ? '前面' : '背面'}
          style={styles.image}
        />
        {/* 3 large zone overlays: head, upper body, lower body */}
        {zones.map((zone) => (
          <button
            key={zone.id}
            id={`bodymap-zone-${zone.id}`}
            style={{
              ...styles.zone,
              top: `${zone.topPercent}%`,
              height: `${zone.heightPercent}%`,
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
    padding: 0,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    pointerEvents: 'none',
  },
  zone: {
    position: 'absolute',
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(74, 144, 226, 0.08)',
    border: 'none',
    borderBottom: `1px solid ${colors.zoneBorder}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    WebkitTapHighlightColor: 'transparent',
    transition: 'background-color 0.15s',
    borderRadius: 0,
  },
  zoneLabel: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    textShadow: '0 0 6px rgba(255,255,255,0.9), 0 0 3px rgba(255,255,255,0.9)',
    pointerEvents: 'none',
    padding: `4px 12px`,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
}
