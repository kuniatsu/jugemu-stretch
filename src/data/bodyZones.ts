export interface BodyZone {
  id: string
  name: string
  side: 'front' | 'back'
  // Percentage-based positions relative to the skeleton image height
  topPercent: number   // top edge as % of image height
  heightPercent: number // zone height as % of image height
}

// 3 large zones per side, positioned as percentage of image height
// New images (front_skull_.png, back_skull_.png) have minimal whitespace
export const bodyZones: BodyZone[] = [
  // Front zones
  { id: 'head_front', name: '頭部', side: 'front', topPercent: 0, heightPercent: 20 },
  { id: 'upper_body_front', name: '上半身', side: 'front', topPercent: 20, heightPercent: 30 },
  { id: 'lower_body_front', name: '下半身', side: 'front', topPercent: 50, heightPercent: 50 },

  // Back zones
  { id: 'head_back', name: '頭部', side: 'back', topPercent: 0, heightPercent: 20 },
  { id: 'upper_body_back', name: '上半身', side: 'back', topPercent: 20, heightPercent: 30 },
  { id: 'lower_body_back', name: '下半身', side: 'back', topPercent: 50, heightPercent: 50 },
]

export function getZonesBySide(side: 'front' | 'back'): BodyZone[] {
  return bodyZones.filter((z) => z.side === side)
}

// Map zone IDs to the muscle zone IDs they contain
// This bridges the new 3-zone layout to the existing muscle data
export function getMuscleZoneIds(zoneId: string): string[] {
  switch (zoneId) {
    case 'head_front':
      return ['neck_front']
    case 'upper_body_front':
      return ['shoulder_front', 'chest', 'arm_front', 'abdomen']
    case 'lower_body_front':
      return ['hip_front', 'thigh_front', 'lower_leg_front']
    case 'head_back':
      return ['neck_back']
    case 'upper_body_back':
      return ['shoulder_back', 'upper_back', 'lower_back']
    case 'lower_body_back':
      return ['glutes', 'thigh_back', 'calf']
    default:
      return []
  }
}
