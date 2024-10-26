import AddCourses from './components/AddCourses'
import AddProjects from './components/AddProjects'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard';
import UpdateProject from './components/UpdateProject';


function App() {

  return (
    <div className="min-h-screen justify-center items-center bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AddCourses/>} />
          <Route path="/addProjects" element={<AddProjects />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updateProject/:id" element={<UpdateProject/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
