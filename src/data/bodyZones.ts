export interface BodyZone {
  id: string
  name: string
  side: 'front' | 'back'
  // SVG path region (percentage-based positions for the body map)
  x: number // center X %
  y: number // center Y %
  width: number // % width
  height: number // % height
}

export const bodyZones: BodyZone[] = [
  // Front zones
  { id: 'neck_front', name: '首', side: 'front', x: 50, y: 10, width: 16, height: 5 },
  { id: 'shoulder_front', name: '肩', side: 'front', x: 50, y: 17, width: 40, height: 6 },
  { id: 'chest', name: '胸', side: 'front', x: 50, y: 25, width: 32, height: 9 },
  { id: 'arm_front', name: '腕', side: 'front', x: 50, y: 35, width: 52, height: 12 },
  { id: 'abdomen', name: '腹部', side: 'front', x: 50, y: 38, width: 24, height: 10 },
  { id: 'hip_front', name: '股関節', side: 'front', x: 50, y: 50, width: 28, height: 7 },
  { id: 'thigh_front', name: '太もも前面', side: 'front', x: 50, y: 62, width: 28, height: 14 },
  { id: 'lower_leg_front', name: 'すね', side: 'front', x: 50, y: 82, width: 20, height: 14 },

  // Back zones
  { id: 'neck_back', name: '首(後)', side: 'back', x: 50, y: 10, width: 16, height: 5 },
  { id: 'shoulder_back', name: '肩(後)', side: 'back', x: 50, y: 17, width: 40, height: 6 },
  { id: 'upper_back', name: '背中上部', side: 'back', x: 50, y: 25, width: 32, height: 9 },
  { id: 'lower_back', name: '腰', side: 'back', x: 50, y: 38, width: 24, height: 10 },
  { id: 'glutes', name: 'お尻', side: 'back', x: 50, y: 50, width: 28, height: 7 },
  { id: 'thigh_back', name: '太もも裏', side: 'back', x: 50, y: 62, width: 28, height: 14 },
  { id: 'calf', name: 'ふくらはぎ', side: 'back', x: 50, y: 82, width: 20, height: 14 },
]

export function getZonesBySide(side: 'front' | 'back'): BodyZone[] {
  return bodyZones.filter((z) => z.side === side)
}
