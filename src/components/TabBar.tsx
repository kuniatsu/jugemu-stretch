import { useNavigate, useLocation } from 'react-router-dom'
import { colors, fontSize, spacing } from '../styles/theme'

interface Tab {
  path: string
  label: string
  icon: string
}

const tabs: Tab[] = [
  { path: '/', label: 'ホーム', icon: '🏠' },
  { path: '/courses', label: 'コース', icon: '📋' },
]

export function TabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  // Don't show tab bar on player screen
  if (location.pathname.startsWith('/player')) {
    return null
  }

  return (
    <div id="tabbar-container" style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(tab.path)
        return (
          <button
            key={tab.path}
            id={`tabbar-tab-${tab.path === '/' ? 'home' : tab.path.slice(1)}`}
            style={{
              ...styles.tab,
              ...(isActive ? styles.tabActive : {}),
            }}
            onClick={() => navigate(tab.path)}
          >
            <span id={`tabbar-icon-${tab.path === '/' ? 'home' : tab.path.slice(1)}`} style={styles.icon}>{tab.icon}</span>
            <span
              id={`tabbar-label-${tab.path === '/' ? 'home' : tab.path.slice(1)}`}
              style={{
                ...styles.label,
                color: isActive ? colors.primary : colors.textLight,
              }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.surface,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  },
  tab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.sm}px 0`,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
  },
  tabActive: {},
  icon: {
    fontSize: fontSize.xl,
    lineHeight: 1,
  },
  label: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
}
