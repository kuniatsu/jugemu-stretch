import { useNavigate } from 'react-router-dom'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

interface MenuItem {
  id: string
  label: string
  icon: string
  path: string
  enabled: boolean
}

const menuItems: MenuItem[] = [
  { id: 'menu-course', label: 'コースでストレッチ', icon: '📋', path: '/courses', enabled: true },
  { id: 'menu-bodymap', label: '部位を指定してストレッチ', icon: '💀', path: '/bodymap', enabled: true },
  { id: 'menu-create', label: 'コースを作成する', icon: '✏️', path: '/create-course', enabled: false },
  { id: 'menu-settings', label: '設定', icon: '⚙️', path: '/settings', enabled: false },
]

export function MenuScreen() {
  const navigate = useNavigate()

  return (
    <div id="menu-screen" style={styles.screen}>
      <div id="menu-header" style={styles.header}>
        <h1 id="menu-title" style={styles.title}>Jugemu Stretch</h1>
        <p id="menu-subtitle" style={styles.subtitle}>寿限無ストレッチタイマー</p>
      </div>

      <div id="menu-buttons" style={styles.buttonList}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            id={item.id}
            style={{
              ...styles.menuButton,
              ...(item.enabled ? {} : styles.menuButtonDisabled),
            }}
            onClick={() => item.enabled && navigate(item.path)}
            disabled={!item.enabled}
          >
            <span id={`${item.id}-icon`} style={styles.menuIcon}>{item.icon}</span>
            <span id={`${item.id}-label`} style={styles.menuLabel}>{item.label}</span>
            {!item.enabled && (
              <span id={`${item.id}-badge`} style={styles.comingSoonBadge}>準備中</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  screen: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    margin: 0,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  buttonList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    width: '100%',
    padding: `${spacing.lg}px ${spacing.md}px`,
    backgroundColor: colors.surface,
    border: 'none',
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    transition: 'transform 0.1s',
    position: 'relative',
  },
  menuButtonDisabled: {
    opacity: 0.5,
    cursor: 'default',
  },
  menuIcon: {
    fontSize: 28,
    width: 40,
    textAlign: 'center',
    flexShrink: 0,
  },
  menuLabel: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
  },
  comingSoonBadge: {
    fontSize: fontSize.xs,
    backgroundColor: colors.border,
    color: colors.textLight,
    padding: `2px ${spacing.sm}px`,
    borderRadius: borderRadius.full,
  },
}
