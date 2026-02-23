import { useState } from 'react'
import { Header } from '../components/Header'
import { useSettings } from '../hooks/useSettings'
import { colors, fontSize, spacing, borderRadius } from '../styles/theme'

export function SettingsScreen() {
  const { settings, setJugemuEnabled, setProVersion, isPro } = useSettings()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleToggleJugemu = () => {
    const newValue = !settings.jugemu_enabled
    const result = setJugemuEnabled(newValue)
    if (!result.ok) {
      setErrorMsg(result.error ?? 'エラーが発生しました')
    }
  }

  const handleTogglePro = () => {
    setProVersion(!isPro)
  }

  return (
    <div id="settings-screen" style={styles.screen}>
      <Header title="設定" showBack />
      <div id="settings-content" style={styles.content}>
        {/* Pro Version Toggle */}
        <div id="settings-pro-card" style={styles.card}>
          <div id="settings-pro-info" style={styles.cardInfo}>
            <span id="settings-pro-label" style={styles.cardLabel}>
              バージョン
            </span>
            <span id="settings-pro-desc" style={styles.cardDesc}>
              {isPro ? 'Pro版（制限なし）' : '通常版'}
            </span>
          </div>
          <button
            id="settings-pro-toggle"
            style={{
              ...styles.toggle,
              backgroundColor: isPro ? colors.accent : colors.border,
            }}
            onClick={handleTogglePro}
          >
            <div
              id="settings-pro-toggle-knob"
              style={{
                ...styles.toggleKnob,
                transform: isPro ? 'translateX(20px)' : 'translateX(0)',
              }}
            />
          </button>
        </div>
        <p id="settings-pro-status" style={styles.statusText}>
          {isPro ? 'Pro版: ON' : 'Pro版: OFF'}
        </p>

        {/* Jugemu Toggle */}
        <div id="settings-jugemu-card" style={styles.card}>
          <div id="settings-jugemu-info" style={styles.cardInfo}>
            <span id="settings-jugemu-label" style={styles.cardLabel}>じゅげむ音声</span>
            <span id="settings-jugemu-desc" style={styles.cardDesc}>
              ストレッチ中にじゅげむを読み上げます
            </span>
          </div>
          <button
            id="settings-jugemu-toggle"
            style={{
              ...styles.toggle,
              backgroundColor: settings.jugemu_enabled ? colors.secondary : colors.border,
            }}
            onClick={handleToggleJugemu}
          >
            <div
              id="settings-jugemu-toggle-knob"
              style={{
                ...styles.toggleKnob,
                transform: settings.jugemu_enabled ? 'translateX(20px)' : 'translateX(0)',
              }}
            />
          </button>
        </div>
        <p id="settings-jugemu-status" style={styles.statusText}>
          現在: {settings.jugemu_enabled ? 'ON' : 'OFF'}
        </p>

        {/* Pro Benefits */}
        <div id="settings-premium-card" style={{
          ...styles.premiumCard,
          ...(isPro ? styles.premiumCardActive : {}),
        }}>
          <h3 id="settings-premium-title" style={styles.premiumTitle}>
            {isPro ? 'Pro版の特典（有効中）' : 'Pro版の特典'}
          </h3>
          <ul id="settings-premium-list" style={styles.premiumList}>
            <li style={styles.premiumItem}>
              じゅげむ音声をOFFにできます
            </li>
            <li style={styles.premiumItem}>
              カスタムコースにストレッチを無制限に追加できます
            </li>
            <li style={styles.premiumItem}>
              広告が非表示になります
            </li>
          </ul>
        </div>
      </div>

      {/* Error/Info Popup */}
      {errorMsg && (
        <div id="settings-error-overlay" style={styles.overlay}>
          <div id="settings-error-popup" style={styles.popup}>
            <p id="settings-error-msg" style={styles.popupMsg}>{errorMsg}</p>
            <button
              id="settings-error-ok"
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
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 1,
  },
  cardLabel: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  cardDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'background-color 0.2s',
    flexShrink: 0,
    padding: 0,
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    position: 'absolute',
    top: 2,
    left: 2,
    transition: 'transform 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },
  statusText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    margin: 0,
    textAlign: 'right',
  },
  premiumCard: {
    padding: spacing.lg,
    backgroundColor: colors.accent + '10',
    border: `1px solid ${colors.accent}40`,
    borderRadius: borderRadius.lg,
  },
  premiumCardActive: {
    backgroundColor: colors.secondary + '10',
    border: `1px solid ${colors.secondary}40`,
  },
  premiumTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    margin: `0 0 ${spacing.sm}px`,
  },
  premiumList: {
    margin: 0,
    paddingLeft: 20,
  },
  premiumItem: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 1.8,
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
