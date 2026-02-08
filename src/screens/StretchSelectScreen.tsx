import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { stretches } from '../data/stretches'
import { muscles } from '../data/muscles'
import { useCustomCourses } from '../hooks/useCustomCourses'
import type { Stretch } from '../data/stretches'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

export function StretchSelectScreen() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { addStretchToCourse, getCourseById, refresh } = useCustomCourses()
  const [filter, setFilter] = useState('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const course = courseId ? getCourseById(courseId) : undefined

  const filteredStretches = useMemo(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return stretches

    return stretches.filter((stretch) => {
      if (stretch.title.toLowerCase().includes(query)) return true
      if (stretch.description.toLowerCase().includes(query)) return true
      // Also search by muscle name
      for (const muscleId of stretch.target_muscle_ids) {
        const muscle = muscles.find((m) => m.id === muscleId)
        if (muscle && muscle.name.toLowerCase().includes(query)) return true
      }
      return false
    })
  }, [filter])

  const handleSelect = (stretch: Stretch) => {
    if (!courseId) return
    const result = addStretchToCourse(courseId, stretch.id)
    if (!result.ok) {
      setErrorMsg(result.error ?? 'エラーが発生しました')
      return
    }
    refresh()
    navigate(-1)
  }

  const getMuscleNames = (stretchItem: Stretch): string => {
    return stretchItem.target_muscle_ids
      .map((id) => muscles.find((m) => m.id === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  return (
    <div id="stretch-select-screen" style={styles.screen}>
      <Header title="ストレッチを選択" showBack />
      <div id="stretch-select-content" style={styles.content}>
        {/* Filter Input */}
        <div id="stretch-select-filter-container" style={styles.filterContainer}>
          <input
            id="stretch-select-filter-input"
            style={styles.filterInput}
            type="text"
            placeholder="ストレッチ名・筋肉名で検索"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {filter && (
            <button
              id="stretch-select-filter-clear"
              style={styles.clearButton}
              onClick={() => setFilter('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Already added info */}
        {course && course.stretch_ids.length > 0 && (
          <p id="stretch-select-added-info" style={styles.addedInfo}>
            追加済み: {course.stretch_ids.length}種目
          </p>
        )}

        {/* Stretch List */}
        <div id="stretch-select-list" style={styles.list}>
          {filteredStretches.map((stretch) => {
            const isAdded = course?.stretch_ids.includes(stretch.id) ?? false
            return (
              <button
                key={stretch.id}
                id={`stretch-select-item-${stretch.id}`}
                style={{
                  ...styles.card,
                  ...(isAdded ? styles.cardAdded : {}),
                }}
                onClick={() => !isAdded && handleSelect(stretch)}
                disabled={isAdded}
              >
                <div id={`stretch-select-info-${stretch.id}`} style={styles.cardInfo}>
                  <span id={`stretch-select-title-${stretch.id}`} style={styles.cardTitle}>
                    {stretch.title}
                  </span>
                  <span id={`stretch-select-muscles-${stretch.id}`} style={styles.cardMuscles}>
                    {getMuscleNames(stretch)}
                  </span>
                  <div id={`stretch-select-meta-${stretch.id}`} style={styles.cardMeta}>
                    <span id={`stretch-select-duration-${stretch.id}`} style={styles.badge}>
                      {stretch.duration_seconds}秒
                    </span>
                    {stretch.is_sided && (
                      <span id={`stretch-select-sided-${stretch.id}`} style={{ ...styles.badge, ...styles.badgeSided }}>
                        左右
                      </span>
                    )}
                  </div>
                </div>
                {isAdded ? (
                  <span id={`stretch-select-check-${stretch.id}`} style={styles.checkIcon}>✓</span>
                ) : (
                  <span id={`stretch-select-add-${stretch.id}`} style={styles.addIcon}>＋</span>
                )}
              </button>
            )
          })}
        </div>

        {filteredStretches.length === 0 && (
          <p id="stretch-select-empty" style={styles.emptyText}>
            該当するストレッチが見つかりません
          </p>
        )}
      </div>

      {/* Error Popup */}
      {errorMsg && (
        <div id="stretch-select-error-overlay" style={styles.overlay}>
          <div id="stretch-select-error-popup" style={styles.popup}>
            <p id="stretch-select-error-msg" style={styles.popupMsg}>{errorMsg}</p>
            <button
              id="stretch-select-error-ok"
              style={styles.popupButton}
              onClick={() => setErrorMsg(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}
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
  filterContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  filterInput: {
    width: '100%',
    padding: `${spacing.md}px ${spacing.xl}px ${spacing.md}px ${spacing.md}px`,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.lg,
    fontSize: fontSize.md,
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: colors.surface,
  },
  clearButton: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: colors.textLight,
    fontSize: fontSize.md,
    cursor: 'pointer',
    padding: spacing.xs,
  },
  addedInfo: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    margin: `0 0 ${spacing.sm}px`,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  card: {
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
    width: '100%',
  },
  cardAdded: {
    opacity: 0.5,
    cursor: 'default',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text,
  },
  cardMuscles: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  cardMeta: {
    display: 'flex',
    gap: spacing.xs,
    marginTop: 2,
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
  addIcon: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  checkIcon: {
    color: colors.secondary,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    marginLeft: spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSize.md,
    padding: spacing.xl,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: spacing.lg,
  },
  popup: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 320,
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  popupMsg: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 1.6,
    margin: `0 0 ${spacing.lg}px`,
  },
  popupButton: {
    padding: `${spacing.sm}px ${spacing.xl}px`,
    backgroundColor: colors.primary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}
