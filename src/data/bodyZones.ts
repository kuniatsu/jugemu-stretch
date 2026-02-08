export interface BodyZone {
  id: string
  name: string
  side: 'front' | 'back'
  // Percentage-based positions relative to the skeleton image
  x: number // left edge X %
  y: number // top edge Y %
  width: number // % width
  height: number // % height
}

export const bodyZones: BodyZone[] = [
  // Front zones (positioned on front_skull.png)
  { id: 'neck_front', name: '首', side: 'front', x: 40, y: 11, width: 20, height: 4 },
  { id: 'shoulder_front', name: '肩', side: 'front', x: 22, y: 15, width: 56, height: 5 },
  { id: 'chest', name: '胸', side: 'front', x: 28, y: 20, width: 44, height: 10 },
  { id: 'arm_front', name: '腕', side: 'front', x: 12, y: 22, width: 76, height: 16 },
  { id: 'abdomen', name: '腹部', side: 'front', x: 34, y: 32, width: 32, height: 10 },
  { id: 'hip_front', name: '股関節', side: 'front', x: 30, y: 42, width: 40, height: 8 },
  { id: 'thigh_front', name: '太もも前面', side: 'front', x: 28, y: 52, width: 44, height: 16 },
  { id: 'lower_leg_front', name: 'すね', side: 'front', x: 30, y: 70, width: 40, height: 18 },

  // Back zones (positioned on back_skull.png)
  { id: 'neck_back', name: '首(後)', side: 'back', x: 40, y: 11, width: 20, height: 4 },
  { id: 'shoulder_back', name: '肩(後)', side: 'back', x: 22, y: 15, width: 56, height: 5 },
  { id: 'upper_back', name: '背中上部', side: 'back', x: 28, y: 20, width: 44, height: 12 },
  { id: 'lower_back', name: '腰', side: 'back', x: 32, y: 33, width: 36, height: 10 },
  { id: 'glutes', name: 'お尻', side: 'back', x: 30, y: 43, width: 40, height: 8 },
  { id: 'thigh_back', name: '太もも裏', side: 'back', x: 28, y: 53, width: 44, height: 16 },
  { id: 'calf', name: 'ふくらはぎ', side: 'back', x: 30, y: 71, width: 40, height: 18 },
]

export function getZonesBySide(side: 'front' | 'back'): BodyZone[] {
  return bodyZones.filter((z) => z.side === side)
}
