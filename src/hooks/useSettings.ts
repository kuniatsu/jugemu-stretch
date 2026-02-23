import { useState, useCallback, useEffect } from 'react'

interface Settings {
  jugemu_enabled: boolean
  is_pro: boolean
}

const STORAGE_KEY = 'jugemu_settings'

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { jugemu_enabled: true, is_pro: false }
    return { jugemu_enabled: true, is_pro: false, ...JSON.parse(raw) }
  } catch {
    return { jugemu_enabled: true, is_pro: false }
  }
}

function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

/** URLのハッシュ部分に v=pro を付与/削除する */
function syncProUrl(isPro: boolean) {
  const hash = window.location.hash // e.g. "#/settings?v=pro"
  const qIndex = hash.indexOf('?')
  const path = qIndex >= 0 ? hash.slice(0, qIndex) : hash
  const search = qIndex >= 0 ? hash.slice(qIndex + 1) : ''
  const params = new URLSearchParams(search)

  if (isPro) {
    params.set('v', 'pro')
  } else {
    params.delete('v')
  }

  const newSearch = params.toString()
  const newHash = newSearch ? `${path}?${newSearch}` : path
  if (window.location.hash !== newHash) {
    window.history.replaceState(null, '', newHash)
  }
}

/** Hook外からpro判定を取得するユーティリティ */
export function getIsPro(): boolean {
  return loadSettings().is_pro
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(loadSettings)

  // 初回マウント時にURLをpro状態と同期
  useEffect(() => {
    syncProUrl(settings.is_pro)
  }, [])

  const setJugemuEnabled = useCallback(
    (enabled: boolean): { ok: boolean; error?: string } => {
      if (!enabled && !settings.is_pro) {
        return {
          ok: false,
          error: 'じゅげむをOFFにするにはPro版に切り替えてください。',
        }
      }
      const updated = { ...settings, jugemu_enabled: enabled }
      saveSettings(updated)
      setSettings(updated)
      return { ok: true }
    },
    [settings]
  )

  const setProVersion = useCallback(
    (isPro: boolean) => {
      const updated = { ...settings, is_pro: isPro }
      saveSettings(updated)
      setSettings(updated)
      syncProUrl(isPro)
    },
    [settings]
  )

  return {
    settings,
    setJugemuEnabled,
    setProVersion,
    isPro: settings.is_pro,
  }
}
