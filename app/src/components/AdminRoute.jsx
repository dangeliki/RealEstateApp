import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Αν έχει περαστεί children το επιστρέφουμε, αλλιώς Outlet για nested routes
  return children || <Outlet />;
}
