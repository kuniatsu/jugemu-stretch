import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { useCustomCourses } from '../hooks/useCustomCourses'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

export function CreateCourseListScreen() {
  const navigate = useNavigate()
  const { courses, createCourse, deleteCourse } = useCustomCourses()
  const [showNewInput, setShowNewInput] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handleCreate = () => {
    const title = newTitle.trim()
    if (!title) return
    const course = createCourse(title)
    setNewTitle('')
    setShowNewInput(false)
    navigate(`/create-course/${course.id}`)
  }

  const handleDelete = (courseId: string) => {
    deleteCourse(courseId)
    setDeleteTarget(null)
  }

  return (
    <div id="create-course-list-screen" style={styles.screen}>
      <Header title="コースを作成する" showBack />
      <div id="create-course-list-content" style={styles.content}>
        {/* New Course Button */}
        {!showNewInput ? (
          <button
            id="create-course-new-btn"
            style={styles.newButton}
            onClick={() => setShowNewInput(true)}
          >
            ＋ 新しいコースを作成
          </button>
        ) : (
          <div id="create-course-new-form" style={styles.newForm}>
            <input
              id="create-course-new-input"
              style={styles.input}
              type="text"
              placeholder="コース名を入力"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
            <div id="create-course-new-actions" style={styles.formActions}>
              <button
                id="create-course-new-cancel"
                style={styles.cancelButton}
                onClick={() => {
                  setShowNewInput(false)
                  setNewTitle('')
                }}
              >
                キャンセル
              </button>
              <button
                id="create-course-new-submit"
                style={styles.submitButton}
                onClick={handleCreate}
              >
                作成
              </button>
            </div>
          </div>
        )}

        {/* Course List */}
        {courses.length === 0 && !showNewInput && (
          <p id="create-course-empty" style={styles.emptyText}>
            カスタムコースはまだありません
          </p>
        )}

        {courses.map((course) => (
          <div key={course.id} id={`create-course-card-${course.id}`} style={styles.card}>
            {deleteTarget === course.id ? (
              <div id={`create-course-delete-confirm-${course.id}`} style={styles.deleteConfirm}>
                <p id={`create-course-delete-msg-${course.id}`} style={styles.deleteMsg}>
                  「{course.title}」を削除しますか？
                </p>
                <div id={`create-course-delete-actions-${course.id}`} style={styles.formActions}>
                  <button
                    id={`create-course-delete-cancel-${course.id}`}
                    style={styles.cancelButton}
                    onClick={() => setDeleteTarget(null)}
                  >
                    キャンセル
                  </button>
                  <button
                    id={`create-course-delete-ok-${course.id}`}
                    style={styles.dangerButton}
                    onClick={() => handleDelete(course.id)}
                  >
                    削除
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  id={`create-course-edit-${course.id}`}
                  style={styles.cardBody}
                  onClick={() => navigate(`/create-course/${course.id}`)}
                >
                  <span id={`create-course-title-${course.id}`} style={styles.cardTitle}>
                    {course.title}
                  </span>
                  <span id={`create-course-count-${course.id}`} style={styles.cardMeta}>
                    {course.stretch_ids.length}種目
                  </span>
                </button>
                <button
                  id={`create-course-delete-btn-${course.id}`}
                  style={styles.deleteButton}
                  onClick={() => setDeleteTarget(course.id)}
                >
                  🗑
                </button>
              </>
            )}
          </div>
        ))}
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
  newButton: {
    width: '100%',
    padding: spacing.lg,
    backgroundColor: colors.primary,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  newForm: {
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
  emptyText: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSize.md,
    padding: spacing.xl,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  cardBody: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
  },
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  cardMeta: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  deleteButton: {
    padding: `${spacing.md}px`,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: fontSize.xl,
    cursor: 'pointer',
  },
  deleteConfirm: {
    flex: 1,
    padding: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  deleteMsg: {
    fontSize: fontSize.md,
    color: colors.text,
    margin: 0,
  },
  dangerButton: {
    padding: `${spacing.sm}px ${spacing.md}px`,
    backgroundColor: colors.danger,
    color: colors.surface,
    border: 'none',
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}
