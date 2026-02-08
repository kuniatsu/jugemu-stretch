import { useNavigate } from 'react-router-dom'
import { colors, fontSize, spacing } from '../styles/theme'

interface HeaderProps {
  title: string
  showBack?: boolean
}

export function Header({ title, showBack = false }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <div id="header-container" style={styles.container}>
      {showBack ? (
        <button id="header-back-btn" style={styles.backButton} onClick={() => navigate(-1)}>
          ← 戻る
        </button>
      ) : (
        <div id="header-placeholder-left" style={styles.placeholder} />
      )}
      <h1 id="header-title" style={styles.title}>{title}</h1>
      <div id="header-placeholder-right" style={styles.placeholder} />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.sm}px ${spacing.md}px`,
    backgroundColor: colors.primary,
    color: colors.surface,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    margin: 0,
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: colors.surface,
    fontSize: fontSize.md,
    cursor: 'pointer',
    padding: `${spacing.xs}px ${spacing.sm}px`,
    whiteSpace: 'nowrap',
  },
  placeholder: {
    width: 60,
  },
}
