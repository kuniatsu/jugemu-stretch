import { useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useStretchTimer, URGENT_THRESHOLD } from '../hooks/useStretchTimer'
import { getStretchById } from '../data/stretches'
import type { Stretch } from '../data/stretches'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

function getPhaseLabel(phase: string, activeSide: string): string {
  switch (phase) {
    case 'prep':
      return '準備'
    case 'active':
      if (activeSide === 'right') return '右側'
      if (activeSide === 'left') return '左側'
      return '実行中'
    case 'finished':
      return '完了!'
    default:
      return ''
  }
}

export function PlayerScreen() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const stretchList: Stretch[] = useMemo(() => {
    const ids = searchParams.get('stretches')?.split(',') ?? []
    return ids.map(getStretchById).filter((s): s is Stretch => s !== undefined)
  }, [searchParams])

  const timer = useStretchTimer(stretchList)

  const isUrgent = timer.phase === 'active' && timer.secondsRemaining <= URGENT_THRESHOLD
  const timerColor = isUrgent ? colors.timerUrgent : colors.timerNormal

  if (stretchList.length === 0) {
    return (
      <div id="player-screen-empty" style={styles.screen}>
        <div id="player-empty-container" style={styles.emptyContainer}>
          <p id="player-empty-text" style={styles.emptyText}>ストレッチが選択されていません</p>
          <button id="player-empty-home-btn" style={styles.primaryButton} onClick={() => navigate('/')}>
            ホームに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div id="player-screen" style={styles.screen}>
      {/* Top Bar */}
      <div id="player-top-bar" style={styles.topBar}>
        <button id="player-close-btn" style={styles.closeButton} onClick={() => navigate(-1)}>
          ✕
        </button>
        <span id="player-progress-text" style={styles.progress}>
          {timer.currentStretchIndex + 1} / {timer.totalStretches}
        </span>
      </div>

      <div id="player-content" style={styles.content}>
        {timer.phase === 'idle' && (
          <>
            <h2 id="player-ready-title" style={styles.readyTitle}>ストレッチを始めましょう</h2>
            <p id="player-ready-desc" style={styles.readyDesc}>
              {stretchList.length}つのストレッチ
            </p>
            <div id="player-preview-list" style={styles.stretchPreviewList}>
              {stretchList.map((s, i) => (
                <div key={s.id} id={`player-preview-${s.id}`} style={styles.previewItem}>
                  <span id={`player-preview-num-${s.id}`} style={styles.previewNumber}>{i + 1}</span>
                  <span id={`player-preview-title-${s.id}`} style={styles.previewTitle}>{s.title}</span>
                  <span id={`player-preview-duration-${s.id}`} style={styles.previewDuration}>
                    {s.is_sided ? `${s.duration_seconds}秒×2` : `${s.duration_seconds}秒`}
                  </span>
                </div>
              ))}
            </div>
            <button id="player-start-btn" style={styles.startButton} onClick={timer.start}>
              スタート
            </button>
          </>
        )}

        {(timer.phase === 'prep' || timer.phase === 'active') && (
          <>
            {/* Phase Indicator */}
            <div
              id="player-phase-indicator"
              style={{
                ...styles.phaseIndicator,
                backgroundColor:
                  timer.phase === 'prep'
                    ? colors.accent
                    : colors.primary,
              }}
            >
              {getPhaseLabel(timer.phase, timer.activeSide)}
            </div>

            {/* Current Stretch Info */}
            {timer.currentStretch && (
              <div id="player-stretch-info" style={styles.stretchInfo}>
                <h2 id="player-stretch-title" style={styles.stretchTitle}>{timer.currentStretch.title}</h2>
                <p id="player-stretch-description" style={styles.stretchDescription}>
                  {timer.currentStretch.description}
                </p>
              </div>
            )}

            {/* Timer Display */}
            <div id="player-timer-container" style={styles.timerContainer}>
              <span id="player-timer-text" style={{ ...styles.timerText, color: timerColor }}>
                {timer.secondsRemaining}
              </span>
            </div>

            {/* Progress Bar */}
            <div id="player-progress-bar" style={styles.progressBarContainer}>
              <div
                id="player-progress-bar-fill"
                style={{
                  ...styles.progressBarFill,
                  width: `${((timer.currentStretchIndex) / timer.totalStretches) * 100}%`,
                }}
              />
            </div>

            {/* Controls */}
            <div id="player-controls" style={styles.controls}>
              {timer.isRunning ? (
                <button id="player-pause-btn" style={styles.controlButton} onClick={timer.pause}>
                  ⏸ 一時停止
                </button>
              ) : (
                <button id="player-resume-btn" style={styles.controlButton} onClick={timer.resume}>
                  ▶ 再開
                </button>
              )}
              <button id="player-skip-btn" style={styles.skipButton} onClick={timer.skip}>
                ⏭ スキップ
              </button>
              <button id="player-stop-btn" style={styles.stopButton} onClick={timer.stop}>
                ■ 停止
              </button>
            </div>
          </>
        )}

        {timer.phase === 'finished' && (
          <div id="player-finished" style={styles.finishedContainer}>
            <div id="player-finished-icon" style={styles.finishedIcon}>🎉</div>
            <h2 id="player-finished-title" style={styles.finishedTitle}>お疲れ様でした!</h2>
            <p id="player-finished-desc" style={styles.finishedDesc}>
              全{timer.totalStretches}つのストレッチを完了しました
            </p>
            <button id="player-finished-home-btn" style={styles.primaryButton} onClick={() => navigate('/')}>
              ホームに戻る
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  screen: {
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    color: colors.surface,
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing.sm}px ${spacing.md}px`,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: colors.surface,
    fontSize: fontSize.xl,
    cursor: 'pointer',
    padding: spacing.sm,
  },
  progress: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.7)',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.lg,
  },
  phaseIndicator: {
    padding: `${spacing.sm}px ${spacing.xl}px`,
    borderRadius: borderRadius.full,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.surface,
  },
  stretchInfo: {
    textAlign: 'center',
    maxWidth: '100%',
  },
  stretchTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    margin: `0 0 ${spacing.sm}px`,
  },
  stretchDescription: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.5,
    margin: 0,
  },
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
    borderRadius: '50%',
    border: '4px solid rgba(255,255,255,0.2)',
  },
  timerText: {
    fontSize: fontSize.timer,
    fontWeight: 'bold',
    fontVariantNumeric: 'tabular-nums',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
    transition: 'width 0.3s',
  },
  controls: {
    display: 'flex',
    gap: spacing.md,
  },
  controlButton: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    backgroundColor: colors.primary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  skipButton: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    backgroundColor: colors.accent,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  stopButton: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: colors.surface,
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    cursor: 'pointer',
  },
  readyTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    margin: 0,
  },
  readyDesc: {
    fontSize: fontSize.lg,
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  stretchPreviewList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    maxHeight: 300,
    overflowY: 'auto',
  },
  previewItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: borderRadius.md,
  },
  previewNumber: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    fontSize: fontSize.sm,
  },
  previewTitle: {
    flex: 1,
    fontSize: fontSize.md,
  },
  previewDuration: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  startButton: {
    padding: `${spacing.md}px ${spacing.xl * 2}px`,
    backgroundColor: colors.secondary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.full,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: spacing.md,
  },
  finishedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
  },
  finishedIcon: {
    fontSize: 64,
  },
  finishedTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    margin: 0,
  },
  finishedDesc: {
    fontSize: fontSize.lg,
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  primaryButton: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    backgroundColor: colors.primary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.lg,
    color: 'rgba(255,255,255,0.7)',
  },
}
