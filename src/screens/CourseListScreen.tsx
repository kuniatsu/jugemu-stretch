import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { courses } from '../data/courses'
import { getStretchById } from '../data/stretches'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

export function CourseListScreen() {
  const navigate = useNavigate()

  const handleCoursePress = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  return (
    <div style={styles.screen}>
      <Header title="コース一覧" />
      <div style={styles.content}>
        {courses.map((course) => {
          const stretchCount = course.stretch_ids.length
          const totalSeconds = course.stretch_ids.reduce((acc, id) => {
            const s = getStretchById(id)
            if (!s) return acc
            return acc + s.duration_seconds * (s.is_sided ? 2 : 1) + 5
          }, 0)
          const totalMinutes = Math.ceil(totalSeconds / 60)

          return (
            <button
              key={course.id}
              style={styles.card}
              onClick={() => handleCoursePress(course.id)}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>{course.title}</h3>
                {!course.is_free && (
                  <span style={styles.premiumBadge}>有料</span>
                )}
              </div>
              <p style={styles.cardDesc}>{course.description}</p>
              <div style={styles.cardMeta}>
                <span style={styles.metaItem}>{stretchCount}種目</span>
                <span style={styles.metaDot}>·</span>
                <span style={styles.metaItem}>約{totalMinutes}分</span>
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
  premiumBadge: {
    fontSize: fontSize.xs,
    backgroundColor: colors.accent,
    color: colors.surface,
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
