import AddCourses from './components/AddCourses'
import AddProjects from './components/AddProjects'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import UpdateProject from './components/UpdateProject';
import MyCourses from './components/MyCourses';
import UpdateCourse from './components/UpdateCourses';
import MyProjects from './components/Projects';


function App() {

  return (
    <div className="min-h-screen justify-center items-center bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddCourses/>} />
          <Route path="/addProjects" element={<AddProjects />} />
          <Route path="/myprojects" element={<MyProjects/>} />
          <Route path="/updateProject/:id" element={<UpdateProject/>} />
          <Route path="/mycourses" element={<MyCourses/>} />
          <Route path="/updatecourses/:id" element={<UpdateCourse/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
