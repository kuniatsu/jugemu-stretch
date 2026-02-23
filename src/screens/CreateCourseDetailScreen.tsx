import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { useCustomCourses } from '../hooks/useCustomCourses'
import { getStretchById } from '../data/stretches'
import type { Stretch } from '../data/stretches'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

export function CreateCourseDetailScreen() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { getCourseById, removeStretchFromCourse, renameCourse, refresh } = useCustomCourses()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')

  const course = courseId ? getCourseById(courseId) : undefined

  useEffect(() => {
    refresh()
  }, [refresh])

  if (!course) {
    return (
      <div id="create-detail-screen-empty" style={styles.screen}>
        <Header title="コース編集" showBack />
        <div id="create-detail-empty" style={styles.empty}>
          <p id="create-detail-empty-text">コースが見つかりません</p>
        </div>
      </div>
    )
  }

  const stretchList: Stretch[] = course.stretch_ids
    .map(getStretchById)
    .filter((s): s is Stretch => s !== undefined)

  const handleRename = () => {
    const title = editTitle.trim()
    if (!title || !courseId) return
    renameCourse(courseId, title)
    setIsEditing(false)
    refresh()
  }

  const handleRemoveStretch = (stretchId: string) => {
    if (!courseId) return
    removeStretchFromCourse(courseId, stretchId)
    refresh()
  }

  const handleAddStretch = () => {
    navigate(`/create-course/${courseId}/select-stretch`)
  }

  return (
    <div id="create-detail-screen" style={styles.screen}>
      <Header title="コース編集" showBack />
      <div id="create-detail-content" style={styles.content}>
        {/* Course Title */}
        <div id="create-detail-title-section" style={styles.titleSection}>
          {isEditing ? (
            <div id="create-detail-title-form" style={styles.titleForm}>
              <input
                id="create-detail-title-input"
                style={styles.input}
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                autoFocus
              />
              <div id="create-detail-title-actions" style={styles.formActions}>
                <button
                  id="create-detail-title-cancel"
                  style={styles.cancelButton}
                  onClick={() => setIsEditing(false)}
                >
                  キャンセル
                </button>
                <button
                  id="create-detail-title-save"
                  style={styles.submitButton}
                  onClick={handleRename}
                >
                  保存
                </button>
              </div>
            </div>
          ) : (
            <button
              id="create-detail-title-btn"
              style={styles.titleButton}
              onClick={() => {
                setEditTitle(course.title)
                setIsEditing(true)
              }}
            >
              <h2 id="create-detail-title" style={styles.courseTitle}>{course.title}</h2>
              <span id="create-detail-title-edit-icon" style={styles.editIcon}>✏️</span>
            </button>
          )}
        </div>

        {/* Stretch List */}
        <h3 id="create-detail-section-title" style={styles.sectionTitle}>
          ストレッチ一覧 ({stretchList.length}種目)
        </h3>

        {stretchList.length === 0 && (
          <p id="create-detail-no-stretch" style={styles.emptyText}>
            ストレッチを追加してください
          </p>
        )}

        <div id="create-detail-stretch-list" style={styles.stretchList}>
          {stretchList.map((stretch, index) => (
            <div key={stretch.id} id={`create-detail-stretch-${stretch.id}`} style={styles.stretchItem}>
              <div id={`create-detail-stretch-num-${stretch.id}`} style={styles.stretchNumber}>
                <span>{index + 1}</span>
              </div>
              <div id={`create-detail-stretch-info-${stretch.id}`} style={styles.stretchInfo}>
                <span id={`create-detail-stretch-title-${stretch.id}`} style={styles.stretchTitle}>
                  {stretch.title}
                </span>
                <span id={`create-detail-stretch-meta-${stretch.id}`} style={styles.stretchMeta}>
                  {stretch.duration_seconds}秒{stretch.is_sided ? ' × 左右' : ''}
                </span>
              </div>
              <button
                id={`create-detail-stretch-remove-${stretch.id}`}
                style={styles.removeButton}
                onClick={() => handleRemoveStretch(stretch.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add Stretch Button */}
        <button
          id="create-detail-add-btn"
          style={styles.addButton}
          onClick={handleAddStretch}
        >
          ＋ ストレッチを追加
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
  titleSection: {
    marginBottom: spacing.lg,
  },
  titleButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  },
  courseTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
    margin: 0,
  },
  editIcon: {
    fontSize: fontSize.lg,
  },
  titleForm: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  },
  input: {
    width: '100%',
    padding: spacing.md,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    outline: 'none',
    boxSizing: 'border-box',
  },
  formActions: {
    display: 'flex',
    gap: spacing.sm,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    backgroundColor: 'transparent',
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    cursor: 'pointer',
  },
  submitButton: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    backgroundColor: colors.primary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    margin: `0 0 ${spacing.sm}px`,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSize.md,
    padding: spacing.lg,
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
    flex: 1,
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
  removeButton: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.danger + '15',
    color: colors.danger,
    border: 'none',
    borderRadius: '50%',
    fontSize: fontSize.md,
    cursor: 'pointer',
    flexShrink: 0,
  },
  addButton: {
    width: '100%',
    padding: spacing.md,
    backgroundColor: 'transparent',
    border: `2px dashed ${colors.border}`,
    borderRadius: borderRadius.lg,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: colors.primary,
    cursor: 'pointer',
    marginTop: spacing.md,
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    color: colors.textLight,
  },
}
