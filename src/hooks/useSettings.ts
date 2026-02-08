import { useState, useCallback } from 'react'

interface Settings {
  jugemu_enabled: boolean
}

const STORAGE_KEY = 'jugemu_settings'
const IS_PAID = false // Free version flag

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { jugemu_enabled: true }
    return JSON.parse(raw) as Settings
  } catch {
    return { jugemu_enabled: true }
  }
}

function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  const setJugemuEnabled = useCallback(
    (enabled: boolean): { ok: boolean; error?: string } => {
      if (!enabled && !IS_PAID) {
        return {
          ok: false,
          error: 'じゅげむをOFFにするには有料版を購入してください。',
        }
      }
      const updated = { ...settings, jugemu_enabled: enabled }
      saveSettings(updated)
      setSettings(updated)
      return { ok: true }
    },
    [settings]
  )

  return {
    settings,
    setJugemuEnabled,
    isPaid: IS_PAID,
  }
}
