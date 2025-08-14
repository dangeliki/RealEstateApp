import { BrowserRouter, Routes , Route } from "react-router-dom"
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import About from "./pages/about";
import Header from "./components/Header";

export default function App() {
  return (
  <BrowserRouter>
  {/* Header of the page - exists in all pages */}
  <Header></Header>

  {/* Pages */}
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/sign-in" element={<Signin />}/>
    <Route path="/sign-up" element={<Signup />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/profile" element={<Profile />}/>
  </Routes>
  </BrowserRouter>
  )
}
