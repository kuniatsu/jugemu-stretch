import { useState, useCallback } from 'react'

export interface CustomCourse {
  id: string
  title: string
  stretch_ids: string[]
  created_at: number
}

const STORAGE_KEY = 'jugemu_custom_courses'

function loadCourses(): CustomCourse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CustomCourse[]
  } catch {
    return []
  }
}

function saveCourses(courses: CustomCourse[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses))
}

const FREE_MAX_STRETCHES = 1

export function useCustomCourses() {
  const [courses, setCourses] = useState<CustomCourse[]>(loadCourses)

  const createCourse = useCallback((title: string): CustomCourse => {
    const newCourse: CustomCourse = {
      id: `custom_${Date.now()}`,
      title,
      stretch_ids: [],
      created_at: Date.now(),
    }
    const updated = [...loadCourses(), newCourse]
    saveCourses(updated)
    setCourses(updated)
    return newCourse
  }, [])

  const deleteCourse = useCallback((courseId: string) => {
    const updated = loadCourses().filter((c) => c.id !== courseId)
    saveCourses(updated)
    setCourses(updated)
  }, [])

  const renameCourse = useCallback((courseId: string, newTitle: string) => {
    const all = loadCourses()
    const target = all.find((c) => c.id === courseId)
    if (!target) return
    target.title = newTitle
    saveCourses(all)
    setCourses([...all])
  }, [])

  const addStretchToCourse = useCallback(
    (courseId: string, stretchId: string): { ok: boolean; error?: string } => {
      const all = loadCourses()
      const target = all.find((c) => c.id === courseId)
      if (!target) return { ok: false, error: 'コースが見つかりません' }

      if (target.stretch_ids.includes(stretchId)) {
        return { ok: false, error: 'すでに追加されています' }
      }

      if (target.stretch_ids.length >= FREE_MAX_STRETCHES) {
        return {
          ok: false,
          error: '無料版で選べるストレッチは1つまでです。有料版をご購入ください。',
        }
      }

      target.stretch_ids.push(stretchId)
      saveCourses(all)
      setCourses([...all])
      return { ok: true }
    },
    []
  )

  const removeStretchFromCourse = useCallback((courseId: string, stretchId: string) => {
    const all = loadCourses()
    const target = all.find((c) => c.id === courseId)
    if (!target) return
    target.stretch_ids = target.stretch_ids.filter((id) => id !== stretchId)
    saveCourses(all)
    setCourses([...all])
  }, [])

  const getCourseById = useCallback(
    (courseId: string): CustomCourse | undefined => {
      return courses.find((c) => c.id === courseId)
    },
    [courses]
  )

  const refresh = useCallback(() => {
    setCourses(loadCourses())
  }, [])

  return {
    courses,
    createCourse,
    deleteCourse,
    renameCourse,
    addStretchToCourse,
    removeStretchFromCourse,
    getCourseById,
    refresh,
    FREE_MAX_STRETCHES,
  }
}
