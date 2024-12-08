import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import EditProfile from "./pages/EditProfile";
import { UserProvider } from "./context/userContext";
import Projects from "./pages/Projects";
import ContactSection from "./pages/Contact";
import Courses from "./pages/Courses";
import CoursesDetails from "./pages/CoursesDetails";
import About from "./pages/About";


const App = () => {
  return (
    <UserProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/updateProfile/:id" element={<EditProfile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactSection/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/courses/:id" element={<CoursesDetails/>} />
      </Routes>
      <Footer />
    </Router>
    </UserProvider>
  );
};


export default App;


