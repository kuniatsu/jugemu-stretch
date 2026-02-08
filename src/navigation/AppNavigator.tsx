import { Routes, Route } from 'react-router-dom'
import { HomeScreen } from '../screens/HomeScreen'
import { CourseListScreen } from '../screens/CourseListScreen'
import { CourseDetailScreen } from '../screens/CourseDetailScreen'
import { PlayerScreen } from '../screens/PlayerScreen'
import { TabBar } from '../components/TabBar'

export function AppNavigator() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/courses" element={<CourseListScreen />} />
        <Route path="/courses/:courseId" element={<CourseDetailScreen />} />
        <Route path="/player" element={<PlayerScreen />} />
      </Routes>
      <TabBar />
    </>
  )
}
