import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { BodyMap } from '../components/BodyMap'
import { getMusclesByZone } from '../data/muscles'
import { getStretchesByMuscle } from '../data/stretches'
import type { BodyZone } from '../data/bodyZones'
import type { Muscle } from '../data/muscles'
import type { Stretch } from '../data/stretches'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

type ViewState =
  | { type: 'bodyMap' }
  | { type: 'muscleList'; zone: BodyZone; muscles: Muscle[] }
  | { type: 'stretchList'; muscle: Muscle; stretches: Stretch[] }

export function HomeScreen() {
  const navigate = useNavigate()
  const [side, setSide] = useState<'front' | 'back'>('front')
  const [viewState, setViewState] = useState<ViewState>({ type: 'bodyMap' })

  const handleZonePress = (zone: BodyZone) => {
    const muscles = getMusclesByZone(zone.id)
    if (muscles.length === 0) return
    setViewState({ type: 'muscleList', zone, muscles })
  }

  const handleMusclePress = (muscle: Muscle) => {
    const stretches = getStretchesByMuscle(muscle.id)
    setViewState({ type: 'stretchList', muscle, stretches })
  }

  const handleStretchPress = (stretch: Stretch) => {
    navigate(`/player?stretches=${stretch.id}`)
  }

  const handleBack = () => {
    if (viewState.type === 'stretchList') {
      const muscle = viewState.muscle
      const muscles = getMusclesByZone(muscle.zone_id)
      const zone = { id: muscle.zone_id, name: '', side: muscle.side, x: 0, y: 0, width: 0, height: 0 }
      setViewState({ type: 'muscleList', zone, muscles })
    } else {
      setViewState({ type: 'bodyMap' })
    }
  }

  return (
    <div id="home-screen" style={styles.screen}>
      <Header title="ストレッチタイマー" />
      <div id="home-content" style={styles.content}>
        {viewState.type === 'bodyMap' && (
          <>
            {/* Front/Back Toggle */}
            <div id="home-side-toggle" style={styles.toggleContainer}>
              <button
                id="home-toggle-front"
                style={{
                  ...styles.toggleButton,
                  ...(side === 'front' ? styles.toggleActive : {}),
                }}
                onClick={() => setSide('front')}
              >
                表面
              </button>
              <button
                id="home-toggle-back"
                style={{
                  ...styles.toggleButton,
                  ...(side === 'back' ? styles.toggleActive : {}),
                }}
                onClick={() => setSide('back')}
              >
                裏面
              </button>
            </div>
            <BodyMap side={side} onZonePress={handleZonePress} />
          </>
        )}

        {viewState.type === 'muscleList' && (
          <div id="home-muscle-list" style={styles.listContainer}>
            <button id="home-muscle-back-btn" style={styles.backLink} onClick={handleBack}>
              ← 部位選択に戻る
            </button>
            <h2 id="home-muscle-list-title" style={styles.listTitle}>{viewState.zone.name} の筋肉</h2>
            {viewState.muscles.map((muscle) => (
              <button
                key={muscle.id}
                id={`home-muscle-${muscle.id}`}
                style={styles.listItem}
                onClick={() => handleMusclePress(muscle)}
              >
                <span id={`home-muscle-name-${muscle.id}`} style={styles.listItemText}>{muscle.name}</span>
                <span id={`home-muscle-arrow-${muscle.id}`} style={styles.arrow}>→</span>
              </button>
            ))}
          </div>
        )}

        {viewState.type === 'stretchList' && (
          <div id="home-stretch-list" style={styles.listContainer}>
            <button id="home-stretch-back-btn" style={styles.backLink} onClick={handleBack}>
              ← 筋肉一覧に戻る
            </button>
            <h2 id="home-stretch-list-title" style={styles.listTitle}>{viewState.muscle.name} のストレッチ</h2>
            {viewState.stretches.length === 0 ? (
              <p id="home-stretch-empty" style={styles.emptyText}>ストレッチが見つかりません</p>
            ) : (
              viewState.stretches.map((stretch) => (
                <button
                  key={stretch.id}
                  id={`home-stretch-card-${stretch.id}`}
                  style={styles.stretchCard}
                  onClick={() => handleStretchPress(stretch)}
                >
                  <div id={`home-stretch-info-${stretch.id}`} style={styles.stretchInfo}>
                    <span id={`home-stretch-title-${stretch.id}`} style={styles.stretchTitle}>{stretch.title}</span>
                    <span id={`home-stretch-desc-${stretch.id}`} style={styles.stretchDesc}>{stretch.description}</span>
                    <div id={`home-stretch-meta-${stretch.id}`} style={styles.stretchMeta}>
                      <span id={`home-stretch-duration-${stretch.id}`} style={styles.badge}>
                        {stretch.duration_seconds}秒
                      </span>
                      {stretch.is_sided && (
                        <span id={`home-stretch-sided-${stretch.id}`} style={{ ...styles.badge, ...styles.badgeSided }}>
                          左右
                        </span>
                      )}
                    </div>
                  </div>
                  <span id={`home-stretch-play-${stretch.id}`} style={styles.playIcon}>▶</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  screen: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    paddingBottom: 60,
  },
  content: {
    padding: spacing.md,
  },
  toggleContainer: {
    display: 'flex',
    backgroundColor: colors.border,
    borderRadius: borderRadius.lg,
    padding: 2,
    marginBottom: spacing.md,
  },
  toggleButton: {
    flex: 1,
    padding: `${spacing.sm}px`,
    border: 'none',
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.textSecondary,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  toggleActive: {
    backgroundColor: colors.surface,
    color: colors.primary,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  backLink: {
    background: 'none',
    border: 'none',
    color: colors.primary,
    fontSize: fontSize.md,
    cursor: 'pointer',
    textAlign: 'left',
    padding: `${spacing.xs}px 0`,
  },
  listTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    margin: `${spacing.sm}px 0`,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  listItemText: {
    fontSize: fontSize.lg,
    color: colors.text,
  },
  arrow: {
    color: colors.textLight,
    fontSize: fontSize.lg,
  },
  stretchCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  stretchInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  stretchTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  stretchDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 1.4,
  },
  stretchMeta: {
    display: 'flex',
    gap: spacing.xs,
    marginTop: 4,
  },
  badge: {
    fontSize: fontSize.xs,
    backgroundColor: colors.primary + '20',
    color: colors.primary,
    padding: `2px ${spacing.sm}px`,
    borderRadius: borderRadius.full,
  },
  badgeSided: {
    backgroundColor: colors.accent + '20',
    color: colors.accent,
  },
  playIcon: {
    color: colors.primary,
    fontSize: fontSize.xl,
    marginLeft: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSize.md,
    padding: spacing.xl,
  },
}
