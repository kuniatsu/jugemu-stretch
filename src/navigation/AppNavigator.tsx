import { Routes, Route } from 'react-router-dom'
import { MenuScreen } from '../screens/MenuScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { CourseListScreen } from '../screens/CourseListScreen'
import { CourseDetailScreen } from '../screens/CourseDetailScreen'
import { PlayerScreen } from '../screens/PlayerScreen'

export function AppNavigator() {
  return (
    <Routes>
      <Route path="/" element={<MenuScreen />} />
      <Route path="/bodymap" element={<HomeScreen />} />
      <Route path="/courses" element={<CourseListScreen />} />
      <Route path="/courses/:courseId" element={<CourseDetailScreen />} />
      <Route path="/player" element={<PlayerScreen />} />
    </Routes>
  )
}
