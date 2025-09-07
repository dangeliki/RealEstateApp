import { BrowserRouter, Routes , Route } from "react-router-dom"
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Profile from "./pages/Profile";
import About from "./pages/about";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";

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
    <Route path="/listing/:listingId" element={<Listing />}/>

    <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/create-listing" element={<CreateListing />}/>
      <Route path="/edit-listing/:listingId" element={<EditListing />}/>
    </Route>
    
  </Routes>
  </BrowserRouter>
  )
}
