import musclesData from './muscles.json'

export interface Muscle {
  id: string
  name: string
  zone_id: string
  side: 'front' | 'back'
}

export const muscles: Muscle[] = musclesData as Muscle[]

export function getMusclesByZone(zoneId: string): Muscle[] {
  return muscles.filter((m) => m.zone_id === zoneId)
}

export function getMuscleById(id: string): Muscle | undefined {
  return muscles.find((m) => m.id === id)
}
