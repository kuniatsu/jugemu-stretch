import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { courses } from '../data/courses'
import { getStretchById } from '../data/stretches'
import { useCustomCourses } from '../hooks/useCustomCourses'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

function calcCourseMeta(stretchIds: string[]) {
  const stretchCount = stretchIds.length
  const totalSeconds = stretchIds.reduce((acc, id) => {
    const s = getStretchById(id)
    if (!s) return acc
    return acc + s.duration_seconds * (s.is_sided ? 2 : 1) + 5
  }, 0)
  const totalMinutes = Math.ceil(totalSeconds / 60)
  return { stretchCount, totalMinutes }
}

export function CourseListScreen() {
  const navigate = useNavigate()
  const { courses: customCourses } = useCustomCourses()

  const handlePresetPress = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    if (!course) return
    const ids = course.stretch_ids.join(',')
    navigate(`/player?stretches=${ids}`)
  }

  const handleCustomPress = (stretchIds: string[]) => {
    if (stretchIds.length === 0) return
    navigate(`/player?stretches=${stretchIds.join(',')}`)
  }

  // カスタムコースで再生可能なもの（ストレッチが1つ以上）
  const playableCustom = customCourses.filter((c) => c.stretch_ids.length > 0)

  return (
    <div id="course-list-screen" style={styles.screen}>
      <Header title="コースでストレッチ" showBack />
      <div id="course-list-content" style={styles.content}>
        {/* カスタムコース（一番上） */}
        {playableCustom.length > 0 && (
          <>
            <p style={styles.sectionLabel}>マイコース</p>
            {playableCustom.map((custom) => {
              const { stretchCount, totalMinutes } = calcCourseMeta(custom.stretch_ids)
              return (
                <button
                  key={custom.id}
                  id={`course-card-${custom.id}`}
                  style={styles.card}
                  onClick={() => handleCustomPress(custom.stretch_ids)}
                >
                  <div style={styles.cardHeader}>
                    <h3 style={styles.cardTitle}>{custom.title}</h3>
                    <span style={styles.customBadge}>カスタム</span>
                  </div>
                  <div style={styles.cardMeta}>
                    <span style={styles.metaItem}>{stretchCount}種目</span>
                    <span style={styles.metaDot}>·</span>
                    <span style={styles.metaItem}>約{totalMinutes}分</span>
                  </div>
                </button>
              )
            })}
          </>
        )}

        {/* プリセットコース */}
        {playableCustom.length > 0 && <p style={styles.sectionLabel}>プリセットコース</p>}
        {courses.filter((c) => c.id === 'basic_stretch').map((course) => {
          const { stretchCount, totalMinutes } = calcCourseMeta(course.stretch_ids)
          return (
            <button
              key={course.id}
              id={`course-card-${course.id}`}
              style={styles.card}
              onClick={() => handlePresetPress(course.id)}
            >
              <div id={`course-card-header-${course.id}`} style={styles.cardHeader}>
                <h3 id={`course-card-title-${course.id}`} style={styles.cardTitle}>{course.title}</h3>
              </div>
              <p id={`course-card-desc-${course.id}`} style={styles.cardDesc}>{course.description}</p>
              <div id={`course-card-meta-${course.id}`} style={styles.cardMeta}>
                <span id={`course-card-count-${course.id}`} style={styles.metaItem}>{stretchCount}種目</span>
                <span id={`course-card-dot-${course.id}`} style={styles.metaDot}>·</span>
                <span id={`course-card-time-${course.id}`} style={styles.metaItem}>約{totalMinutes}分</span>
              </div>
            </button>
          )
        })}
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
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  sectionLabel: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.textSecondary,
    margin: `${spacing.sm}px 0 -${spacing.sm}px`,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    transition: 'transform 0.1s',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    margin: 0,
  },
  customBadge: {
    fontSize: fontSize.xs,
    backgroundColor: colors.primary + '20',
    color: colors.primary,
    padding: `2px ${spacing.sm}px`,
    borderRadius: borderRadius.full,
    fontWeight: 'bold',
  },
  cardDesc: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 1.5,
    margin: 0,
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaItem: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  metaDot: {
    color: colors.textLight,
  },
}
