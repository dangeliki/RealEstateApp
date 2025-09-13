import { BrowserRouter, Routes , Route } from "react-router-dom"
import Home from "./pages/home";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile";
import About from "./pages/about";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";

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
    <Route path="/search" element={<Search />}/>
    <Route path="/listing/:listingId" element={<Listing />}/>

    <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/create-listing" element={<CreateListing />}/>
      <Route path="/edit-listing/:listingId" element={<EditListing />}/>
      <Route path="/edit-listing/:listingId" element={<EditListing />}/>
    </Route>

    <Route path="/users" element={<AdminPage />} />

    
  </Routes>
  </BrowserRouter>
  )
}
