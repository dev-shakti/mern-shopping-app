/* eslint-disabled */
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children, isLoading }) => {
  const location = useLocation();
  
 
  if (isLoading) {
    // Show a loading indicator or placeholder
    return <div>Loading...</div>;
  }
  // Redirect to login if the user is not authenticated 
  //and not already on the login or register page.
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("login") ||
      location.pathname.includes("register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from login/register pages 
  //based on their role.

  if (
    isAuthenticated &&
    (location.pathname.includes("login") || location.pathname.includes("register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Redirect non-admin users trying to access admin pages.
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Allow admins to access admin pages.
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Render children if none of the above conditions are met.
  return <>{children}</>;
};

export default CheckAuth

