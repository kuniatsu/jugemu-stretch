import { useState, useEffect, useCallback, useRef } from 'react'
import type { Stretch } from '../data/stretches'

export type TimerPhase = 'idle' | 'prep' | 'active' | 'interval' | 'finished'
export type ActiveSide = 'none' | 'right' | 'left'

interface TimerState {
  phase: TimerPhase
  secondsRemaining: number
  currentStretchIndex: number
  activeSide: ActiveSide
  isRunning: boolean
}

interface UseStretchTimerReturn extends TimerState {
  currentStretch: Stretch | null
  totalStretches: number
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
}

const PREP_DURATION = 5
const INTERVAL_DURATION = 5
const URGENT_THRESHOLD = 5

export function useStretchTimer(stretchList: Stretch[]): UseStretchTimerReturn {
  const [state, setState] = useState<TimerState>({
    phase: 'idle',
    secondsRemaining: 0,
    currentStretchIndex: 0,
    activeSide: 'none',
    isRunning: false,
  })

  const intervalRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    return audioContextRef.current
  }, [])

  const playBeep = useCallback(
    (frequency: number, duration: number) => {
      try {
        const ctx = getAudioContext()
        const oscillator = ctx.createOscillator()
        const gainNode = ctx.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(ctx.destination)
        oscillator.frequency.value = frequency
        oscillator.type = 'sine'
        gainNode.gain.value = 0.3
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
        oscillator.start(ctx.currentTime)
        oscillator.stop(ctx.currentTime + duration)
      } catch {
        // Audio not available
      }
    },
    [getAudioContext]
  )

  const playTick = useCallback(() => playBeep(800, 0.05), [playBeep])
  const playUrgentTick = useCallback(() => playBeep(1200, 0.08), [playBeep])
  const playFinish = useCallback(() => {
    playBeep(523, 0.15)
    setTimeout(() => playBeep(659, 0.15), 150)
    setTimeout(() => playBeep(784, 0.3), 300)
  }, [playBeep])

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const moveToNextPhase = useCallback(
    (currentState: TimerState): TimerState => {
      const stretch = stretchList[currentState.currentStretchIndex]
      if (!stretch) return { ...currentState, phase: 'finished', isRunning: false }

      switch (currentState.phase) {
        case 'prep': {
          // Prep -> Active
          const side: ActiveSide = stretch.is_sided ? 'right' : 'none'
          return {
            ...currentState,
            phase: 'active',
            secondsRemaining: stretch.duration_seconds,
            activeSide: side,
          }
        }
        case 'active': {
          if (stretch.is_sided && currentState.activeSide === 'right') {
            // Right done -> Interval -> Left
            return {
              ...currentState,
              phase: 'interval',
              secondsRemaining: INTERVAL_DURATION,
              activeSide: 'left',
            }
          }
          // Move to next stretch
          const nextIndex = currentState.currentStretchIndex + 1
          if (nextIndex >= stretchList.length) {
            return { ...currentState, phase: 'finished', isRunning: false }
          }
          // Interval before next stretch
          return {
            ...currentState,
            phase: 'interval',
            secondsRemaining: INTERVAL_DURATION,
            currentStretchIndex: nextIndex,
            activeSide: 'none',
          }
        }
        case 'interval': {
          const nextStretch = stretchList[currentState.currentStretchIndex]
          if (currentState.activeSide === 'left') {
            // Interval -> Left side active
            return {
              ...currentState,
              phase: 'active',
              secondsRemaining: nextStretch.duration_seconds,
            }
          }
          // Interval -> Prep for next stretch
          return {
            ...currentState,
            phase: 'prep',
            secondsRemaining: PREP_DURATION,
          }
        }
        default:
          return currentState
      }
    },
    [stretchList]
  )

  useEffect(() => {
    if (!state.isRunning) {
      clearTimer()
      return
    }

    intervalRef.current = window.setInterval(() => {
      setState((prev) => {
        if (!prev.isRunning) return prev

        const newSeconds = prev.secondsRemaining - 1

        // Play sound
        if (newSeconds > 0) {
          if (newSeconds <= URGENT_THRESHOLD) {
            playUrgentTick()
          } else {
            playTick()
          }
        }

        if (newSeconds <= 0) {
          playFinish()
          return moveToNextPhase(prev)
        }

        return { ...prev, secondsRemaining: newSeconds }
      })
    }, 1000)

    return clearTimer
  }, [state.isRunning, clearTimer, moveToNextPhase, playTick, playUrgentTick, playFinish])

  const start = useCallback(() => {
    if (stretchList.length === 0) return
    // Initialize audio context on user interaction
    getAudioContext()
    setState({
      phase: 'prep',
      secondsRemaining: PREP_DURATION,
      currentStretchIndex: 0,
      activeSide: 'none',
      isRunning: true,
    })
  }, [stretchList.length, getAudioContext])

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }))
  }, [])

  const resume = useCallback(() => {
    setState((prev) => {
      if (prev.phase === 'finished' || prev.phase === 'idle') return prev
      return { ...prev, isRunning: true }
    })
  }, [])

  const stop = useCallback(() => {
    clearTimer()
    setState({
      phase: 'idle',
      secondsRemaining: 0,
      currentStretchIndex: 0,
      activeSide: 'none',
      isRunning: false,
    })
  }, [clearTimer])

  const currentStretch = stretchList[state.currentStretchIndex] ?? null

  return {
    ...state,
    currentStretch,
    totalStretches: stretchList.length,
    start,
    pause,
    resume,
    stop,
  }
}

export { URGENT_THRESHOLD }
