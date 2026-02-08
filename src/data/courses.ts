export interface Course {
  id: string
  title: string
  description: string
  stretch_ids: string[]
  is_free: boolean
}

export const courses: Course[] = [
  {
    id: 'basic_stretch',
    title: '基本ストレッチコース',
    description: '全身の主要な筋肉をバランスよく伸ばす基本コース。初心者にもおすすめです。',
    stretch_ids: [
      'butterfly_forward_fold',
      'seated_forward_fold',
      'straddle_forward_fold',
      'seiza_backbend',
      'shoulder_overhead',
      'neck_side_tilt',
      'neck_backward',
      'neck_forward',
    ],
    is_free: true,
  },
  {
    id: 'morning_basic',
    title: '朝の基本コース',
    description: '朝の目覚めに最適な全身ストレッチ。5分で体をすっきり目覚めさせます。',
    stretch_ids: [
      'neck_side_tilt',
      'shoulder_cross_body',
      'chest_doorway',
      'hip_flexor_lunge',
      'quad_standing',
      'calf_wall_stretch',
    ],
    is_free: true,
  },
  {
    id: 'shoulder_relief',
    title: '肩こり解消コース',
    description: 'デスクワークで凝り固まった肩周りを徹底的にほぐします。',
    stretch_ids: [
      'neck_side_tilt',
      'neck_forward',
      'shoulder_cross_body',
      'shoulder_overhead',
      'upper_back_clasp',
      'sleeper_stretch',
    ],
    is_free: true,
  },
  {
    id: 'lower_body',
    title: '下半身集中コース',
    description: '太もも、お尻、ふくらはぎを中心にしっかり伸ばします。',
    stretch_ids: [
      'hip_flexor_lunge',
      'adductor_stretch',
      'quad_standing',
      'standing_hamstring',
      'pigeon_pose',
      'calf_wall_stretch',
      'soleus_stretch',
    ],
    is_free: true,
  },
  {
    id: 'back_care',
    title: '腰痛予防コース',
    description: '腰周りの筋肉をバランスよく伸ばし、腰痛を予防します。',
    stretch_ids: [
      'cat_cow',
      'child_pose',
      'seated_twist',
      'hip_flexor_lunge',
      'figure_four',
      'seated_forward_fold',
    ],
    is_free: true,
  },
  {
    id: 'full_body',
    title: '全身ストレッチコース',
    description: '頭からつま先まで、全身をまんべんなくストレッチする本格コース。',
    stretch_ids: [
      'neck_side_tilt',
      'shoulder_cross_body',
      'chest_doorway',
      'cobra_stretch',
      'side_bend',
      'cat_cow',
      'child_pose',
      'hip_flexor_lunge',
      'quad_standing',
      'standing_hamstring',
      'pigeon_pose',
      'calf_wall_stretch',
    ],
    is_free: false,
  },
  {
    id: 'night_relax',
    title: '夜のリラックスコース',
    description: '就寝前にゆっくりと行う、リラクゼーション重視のストレッチ。',
    stretch_ids: [
      'neck_forward',
      'child_pose',
      'seated_twist',
      'figure_four',
      'seated_forward_fold',
    ],
    is_free: false,
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}
