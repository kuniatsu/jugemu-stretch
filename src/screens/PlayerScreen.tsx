import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useStretchTimer, URGENT_THRESHOLD } from '../hooks/useStretchTimer'
import { getStretchById } from '../data/stretches'
import { getStretchImages } from '../data/stretchImages'
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

  // Preload all stretch images on mount (before user presses start)
  useEffect(() => {
    stretchList.forEach((s) => {
      const imgs = getStretchImages(s.id)
      if (!imgs) return
      const r = new Image(); r.src = imgs.red
      const w = new Image(); w.src = imgs.white
    })
  }, [stretchList])

  const timer = useStretchTimer(stretchList)

  const isUrgent = timer.phase === 'active' && timer.secondsRemaining <= URGENT_THRESHOLD
  const timerColor = isUrgent ? colors.timerUrgent : colors.timerNormal

  // Pause popup state
  const [showPausePopup, setShowPausePopup] = useState(false)

  // Hint text alternation
  const [hintIndex, setHintIndex] = useState(0)
  const hints = ['タップで一時停止', 'スワイプで前後のストレッチに移動']

  useEffect(() => {
    if (timer.phase !== 'prep' && timer.phase !== 'active') return
    const interval = window.setInterval(() => {
      setHintIndex((prev) => (prev + 1) % 2)
    }, 3000)
    return () => window.clearInterval(interval)
  }, [timer.phase])

  // ── Slider transition: ONLY on stretch index change ──
  const [transition, setTransition] = useState<{
    fromIndex: number
    direction: 'left' | 'right'
  } | null>(null)
  const prevIndexRef = useRef(timer.currentStretchIndex)

  useEffect(() => {
    // Don't animate on idle/finished
    if (timer.phase === 'idle' || timer.phase === 'finished') {
      prevIndexRef.current = timer.currentStretchIndex
      return
    }
    // Only animate when stretch INDEX changes (not phase changes)
    if (prevIndexRef.current !== timer.currentStretchIndex) {
      const direction = timer.currentStretchIndex > prevIndexRef.current ? 'left' : 'right'
      setTransition({ fromIndex: prevIndexRef.current, direction })
      prevIndexRef.current = timer.currentStretchIndex
      const timeout = setTimeout(() => setTransition(null), 400)
      return () => clearTimeout(timeout)
    }
  }, [timer.currentStretchIndex, timer.phase])

  // ── Swipe handling ──
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    }
  }, [])

  // Desktop: click to pause
  const handleTap = useCallback(
    (e: React.MouseEvent) => {
      if (e.detail === 0) return
      if (timer.phase !== 'prep' && timer.phase !== 'active') return
      if (timer.isRunning) {
        timer.pause()
        setShowPausePopup(true)
      }
    },
    [timer]
  )

  // Mobile: detect tap vs swipe
  const handleTouchEndWithTap = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y
      const dt = Date.now() - touchStartRef.current.time
      touchStartRef.current = null

      const isSwipe = Math.abs(dx) > 50 && Math.abs(dy) < Math.abs(dx) && dt < 500

      if (isSwipe) {
        if (dx < 0) {
          timer.skip()
        } else {
          timer.prev()
        }
      } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 300) {
        if (timer.phase !== 'prep' && timer.phase !== 'active') return
        if (timer.isRunning) {
          timer.pause()
          setShowPausePopup(true)
        }
      }
    },
    [timer]
  )

  const handleResume = () => {
    setShowPausePopup(false)
    timer.resume()
  }

  const handleStop = () => {
    setShowPausePopup(false)
    timer.stop()
    navigate(-1)
  }

  // ── Render a single stretch card ──
  const renderCard = (stretch: Stretch, isActive: boolean) => {
    const images = getStretchImages(stretch.id)
    return (
      <div style={styles.card}>
        {images && (
          <div style={styles.imageContainer}>
            <img src={images.white} alt="" style={styles.imageBase} />
            {isActive && (
              <img
                src={images.red}
                alt=""
                style={styles.imageOverlay}
                className="muscle-glow-overlay"
              />
            )}
          </div>
        )}
        {isActive ? (
          <div style={styles.timerContainer}>
            <span style={{ ...styles.timerText, color: timerColor }}>
              {timer.secondsRemaining}
            </span>
          </div>
        ) : (
          <span style={styles.leavingCardTitle}>{stretch.title}</span>
        )}
      </div>
    )
  }

  // ── Empty state ──
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
      <div id="player-content" style={styles.content}>
        {/* ── Idle: preview list ── */}
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

        {/* ── Active: slider UI ── */}
        {(timer.phase === 'prep' || timer.phase === 'active') && (
          <div
            id="player-active-area"
            style={styles.activeArea}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEndWithTap}
            onClick={handleTap}
          >
            {/* Top Bar: Title left, Phase right */}
            <div id="player-top-bar" style={styles.topBar}>
              <div id="player-top-left" style={styles.topLeft}>
                {timer.currentStretch && (
                  <span id="player-stretch-title" style={styles.stretchTitle}>
                    {timer.currentStretch.title}
                  </span>
                )}
                <span id="player-progress-text" style={styles.progressText}>
                  {timer.currentStretchIndex + 1} / {timer.totalStretches}
                </span>
              </div>
              <div
                id="player-phase-indicator"
                style={{
                  ...styles.phaseIndicator,
                  backgroundColor:
                    timer.phase === 'prep' ? colors.accent : colors.primary,
                }}
              >
                {getPhaseLabel(timer.phase, timer.activeSide)}
              </div>
            </div>

            {/* Page indicator dots */}
            <div id="player-dots" style={styles.dotsContainer}>
              {stretchList.map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.dot,
                    ...(i === timer.currentStretchIndex ? styles.dotActive : {}),
                  }}
                />
              ))}
            </div>

            {/* ── Slider container: this is the actual carousel ── */}
            <div id="player-slider" style={styles.sliderContainer}>
              {transition ? (
                // During transition: show two cards side by side, animate
                <div
                  className={`slider-track slider-${transition.direction}`}
                  style={styles.sliderTrack}
                >
                  {transition.direction === 'left' ? (
                    // Going forward: [old | new] → slide left to reveal new
                    <>
                      <div style={styles.sliderPage}>
                        {renderCard(stretchList[transition.fromIndex], false)}
                      </div>
                      <div style={styles.sliderPage}>
                        {timer.currentStretch && renderCard(timer.currentStretch, true)}
                      </div>
                    </>
                  ) : (
                    // Going back: [new | old] → slide right to reveal new
                    <>
                      <div style={styles.sliderPage}>
                        {timer.currentStretch && renderCard(timer.currentStretch, true)}
                      </div>
                      <div style={styles.sliderPage}>
                        {renderCard(stretchList[transition.fromIndex], false)}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Normal state: single card, no animation
                timer.currentStretch && renderCard(timer.currentStretch, true)
              )}
            </div>

            {/* Bottom: Hint + Progress Bar */}
            <div id="player-bottom" style={styles.bottom}>
              <span
                id="player-hint-text"
                key={hintIndex}
                className="player-hint-blink"
                style={styles.hintText}
              >
                {hints[hintIndex]}
              </span>
              <div id="player-progress-bar" style={styles.progressBarContainer}>
                <div
                  id="player-progress-bar-fill"
                  style={{
                    ...styles.progressBarFill,
                    width: `${((timer.currentStretchIndex) / timer.totalStretches) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Finished ── */}
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

      {/* Pause Popup */}
      {showPausePopup && (
        <div id="player-pause-overlay" style={styles.overlay}>
          <div id="player-pause-popup" style={styles.popup}>
            <h3 id="player-pause-title" style={styles.popupTitle}>一時停止中</h3>
            <p id="player-pause-msg" style={styles.popupMsg}>再開しますか？</p>
            <div id="player-pause-actions" style={styles.popupActions}>
              <button id="player-pause-resume" style={styles.popupResumeBtn} onClick={handleResume}>
                再開
              </button>
              <button id="player-pause-stop" style={styles.popupStopBtn} onClick={handleStop}>
                終了
              </button>
            </div>
          </div>
        </div>
      )}
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
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  activeArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
    touchAction: 'pan-y',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: `${spacing.md}px ${spacing.md}px 0`,
  },
  topLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  stretchTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.surface,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  phaseIndicator: {
    padding: `${spacing.xs}px ${spacing.md}px`,
    borderRadius: borderRadius.full,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.surface,
    flexShrink: 0,
  },
  // ── Page indicator dots ──
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 6,
    padding: `${spacing.sm}px 0`,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.25)',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  dotActive: {
    backgroundColor: colors.primary,
    transform: 'scale(1.3)',
  },
  // ── Slider (carousel) ──
  sliderContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200%',
    height: '100%',
    display: 'flex',
  },
  sliderPage: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ── Card (single stretch content) ──
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.md,
    width: '100%',
  },
  leavingCardTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 220,
    height: 220,
    flexShrink: 0,
  },
  imageBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    borderRadius: '50%',
    border: '4px solid rgba(255,255,255,0.2)',
  },
  timerText: {
    fontSize: fontSize.timer,
    fontWeight: 'bold',
    fontVariantNumeric: 'tabular-nums',
  },
  bottom: {
    padding: `0 ${spacing.md}px ${spacing.lg}px`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    alignItems: 'center',
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
  hintText: {
    fontSize: fontSize.lg,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Idle / Preview
  readyTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
    padding: `${spacing.xl}px ${spacing.lg}px 0`,
  },
  readyDesc: {
    fontSize: fontSize.lg,
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
    textAlign: 'center',
    padding: `${spacing.sm}px`,
  },
  stretchPreviewList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    padding: `0 ${spacing.lg}px`,
    maxHeight: 400,
    overflowY: 'auto',
    flex: 1,
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
    margin: `${spacing.md}px auto ${spacing.xl}px`,
  },
  // Finished
  finishedContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  // Pause Popup
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: spacing.lg,
  },
  popup: {
    backgroundColor: '#2a2a4e',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 300,
    textAlign: 'center',
  },
  popupTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.surface,
    margin: `0 0 ${spacing.sm}px`,
  },
  popupMsg: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.7)',
    margin: `0 0 ${spacing.lg}px`,
  },
  popupActions: {
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'center',
  },
  popupResumeBtn: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    backgroundColor: colors.secondary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  popupStopBtn: {
    padding: `${spacing.md}px ${spacing.xl}px`,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: colors.surface,
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    cursor: 'pointer',
  },
}
