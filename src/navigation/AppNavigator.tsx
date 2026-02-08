import { Routes, Route } from 'react-router-dom'
import { MenuScreen } from '../screens/MenuScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { CourseListScreen } from '../screens/CourseListScreen'
import { CourseDetailScreen } from '../screens/CourseDetailScreen'
import { PlayerScreen } from '../screens/PlayerScreen'
import { CreateCourseListScreen } from '../screens/CreateCourseListScreen'
import { CreateCourseDetailScreen } from '../screens/CreateCourseDetailScreen'
import { StretchSelectScreen } from '../screens/StretchSelectScreen'
import { SettingsScreen } from '../screens/SettingsScreen'

export function AppNavigator() {
  return (
    <Routes>
      <Route path="/" element={<MenuScreen />} />
      <Route path="/bodymap" element={<HomeScreen />} />
      <Route path="/courses" element={<CourseListScreen />} />
      <Route path="/courses/:courseId" element={<CourseDetailScreen />} />
      <Route path="/player" element={<PlayerScreen />} />
      <Route path="/create-course" element={<CreateCourseListScreen />} />
      <Route path="/create-course/:courseId" element={<CreateCourseDetailScreen />} />
      <Route path="/create-course/:courseId/select-stretch" element={<StretchSelectScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
    </Routes>
  )
}
