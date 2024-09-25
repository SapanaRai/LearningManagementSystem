import { Route, Routes} from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import ContactUs from './Pages/ContactUs'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import CourseCreate from './Pages/Course/CourseCreate'
import RequireAuth from './Components/Auth/RequireAuth'
import UserProfile from './Pages/User/UserProfile'
import EditProfile from './Pages/User/EditProfile'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import AddLecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route>
      <Route path="/signup" element={<Signup/> }></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/contact" element={<ContactUs/>}></Route>
      <Route path="/courses" element={<CourseList/>}></Route>
      <Route path="/denied" element={<Denied/>}></Route>
      
      <Route path="*" element={<NotFound/>}></Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>} >
        <Route path="/course/create" element={<CourseCreate/>}/>
        <Route path="/course/addlecture" element={<AddLecture/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>} >
        <Route path="/user/profile" element={<UserProfile/>}/>
        <Route path="/user/editprofile" element={<EditProfile/>}/>
        <Route path="/course/description" element={<CourseDescription/>}></Route>
        <Route path="/course/displayLectures" element={<DisplayLectures/>}/>
      </Route>
    </Routes>
  )
}

export default App
