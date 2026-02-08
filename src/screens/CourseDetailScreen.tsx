import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { getCourseById } from '../data/courses'
import { getStretchById } from '../data/stretches'
import type { Stretch } from '../data/stretches'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

export function CourseDetailScreen() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()

  const course = courseId ? getCourseById(courseId) : undefined

  const stretchList: Stretch[] = useMemo(() => {
    if (!course) return []
    return course.stretch_ids
      .map(getStretchById)
      .filter((s): s is Stretch => s !== undefined)
  }, [course])

  const totalSeconds = useMemo(() => {
    return stretchList.reduce((acc, s) => {
      return acc + s.duration_seconds * (s.is_sided ? 2 : 1) + 5
    }, 0)
  }, [stretchList])

  if (!course) {
    return (
      <div id="course-detail-screen-empty" style={styles.screen}>
        <Header title="コース" showBack />
        <div id="course-detail-empty" style={styles.empty}>
          <p id="course-detail-empty-text">コースが見つかりません</p>
        </div>
      </div>
    )
  }

  const handleStart = () => {
    const ids = course.stretch_ids.join(',')
    navigate(`/player?stretches=${ids}`)
  }

  return (
    <div id="course-detail-screen" style={styles.screen}>
      <Header title={course.title} showBack />
      <div id="course-detail-content" style={styles.content}>
        <div id="course-detail-info-card" style={styles.infoCard}>
          <p id="course-detail-description" style={styles.description}>{course.description}</p>
          <div id="course-detail-stats" style={styles.stats}>
            <div id="course-detail-stat-count" style={styles.stat}>
              <span id="course-detail-stat-count-value" style={styles.statValue}>{stretchList.length}</span>
              <span id="course-detail-stat-count-label" style={styles.statLabel}>種目</span>
            </div>
            <div id="course-detail-stat-time" style={styles.stat}>
              <span id="course-detail-stat-time-value" style={styles.statValue}>{Math.ceil(totalSeconds / 60)}</span>
              <span id="course-detail-stat-time-label" style={styles.statLabel}>分</span>
            </div>
          </div>
        </div>

        <h3 id="course-detail-section-title" style={styles.sectionTitle}>ストレッチ一覧</h3>

        <div id="course-detail-stretch-list" style={styles.stretchList}>
          {stretchList.map((stretch, index) => (
            <div key={stretch.id} id={`course-detail-stretch-${stretch.id}`} style={styles.stretchItem}>
              <div id={`course-detail-stretch-num-${stretch.id}`} style={styles.stretchNumber}>
                <span>{index + 1}</span>
              </div>
              <div id={`course-detail-stretch-info-${stretch.id}`} style={styles.stretchInfo}>
                <span id={`course-detail-stretch-title-${stretch.id}`} style={styles.stretchTitle}>{stretch.title}</span>
                <span id={`course-detail-stretch-meta-${stretch.id}`} style={styles.stretchMeta}>
                  {stretch.duration_seconds}秒
                  {stretch.is_sided ? ' × 左右' : ''}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button id="course-detail-start-btn" style={styles.startButton} onClick={handleStart}>
          コースを開始する
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  screen: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    paddingBottom: 80,
  },
  content: {
    padding: spacing.md,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 1.6,
    margin: `0 0 ${spacing.md}px`,
  },
  stats: {
    display: 'flex',
    gap: spacing.xl,
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    margin: `0 0 ${spacing.sm}px`,
  },
  stretchList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  stretchItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
  },
  stretchNumber: {
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '15',
    borderRadius: '50%',
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary,
    flexShrink: 0,
  },
  stretchInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  stretchTitle: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.text,
  },
  stretchMeta: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  startButton: {
    width: '100%',
    padding: spacing.md,
    backgroundColor: colors.secondary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: spacing.lg,
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    color: colors.textLight,
  },
}
