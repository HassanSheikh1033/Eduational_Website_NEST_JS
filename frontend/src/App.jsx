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


const App = () => {
  return (
    <UserProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RegisterForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/updateProfile/:id" element={<EditProfile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<ContactSection/>} />
      </Routes>
      <Footer />
    </Router>
    </UserProvider>
  );
};


export default App;


