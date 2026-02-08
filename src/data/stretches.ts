import stretchesData from './stretches.json'

export interface Stretch {
  id: string
  title: string
  description: string
  target_muscle_ids: string[]
  duration_seconds: number
  is_sided: boolean
  image_resource_name: string
}

export const stretches: Stretch[] = stretchesData as Stretch[]

export function getStretchById(id: string): Stretch | undefined {
  return stretches.find((s) => s.id === id)
}

export function getStretchesByMuscle(muscleId: string): Stretch[] {
  return stretches.filter((s) => s.target_muscle_ids.includes(muscleId))
}
