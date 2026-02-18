// ストレッチIDと画像ファイル名のマッピング
// red: 赤い筋肉ハイライト版, white: 白ベース版
// 2枚重ねて赤の透明度をアニメーションすることで筋肉が光る演出

interface StretchImageSet {
  red: string
  white: string
}

const BASE = import.meta.env.BASE_URL

const imageMap: Record<string, StretchImageSet> = {
  butterfly_forward_fold: {
    red: '合蹠前屈1.PNG',
    white: '合蹠前屈2.PNG',
  },
  seated_forward_fold: {
    red: '長座前屈1.PNG',
    white: '長座前屈2.PNG',
  },
  straddle_forward_fold: {
    red: '開脚前屈1.PNG',
    white: '開脚前屈2.PNG',
  },
  seiza_backbend: {
    red: '正座後屈1.PNG',
    white: '正座後屈2.PNG',
  },
  shoulder_overhead: {
    red: '頭の後ろで肘引きストレッチ1.PNG',
    white: '頭の後ろで肘引きストレッチ2.PNG',
  },
  neck_side_tilt: {
    red: '首の横倒し1.PNG',
    white: '首の横倒し2.PNG',
  },
  neck_backward: {
    red: '首の後倒し1.PNG',
    white: '首の後倒し2.PNG',
  },
  neck_forward: {
    red: '首の前倒し1.PNG',
    white: '首の前倒し2.PNG',
  },
}

export function getStretchImages(stretchId: string): { red: string; white: string } | null {
  const entry = imageMap[stretchId]
  if (!entry) return null
  return {
    red: `${BASE}img/${encodeURIComponent(entry.red)}`,
    white: `${BASE}img/${encodeURIComponent(entry.white)}`,
  }
}
