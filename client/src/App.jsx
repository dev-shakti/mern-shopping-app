import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./pages/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminOrder from "./pages/admin-view/Order";
import Products from "./pages/admin-view/Products";
import AdminFeatures from "./pages/admin-view/Features";
import ShoppingLayout from "./pages/shopping-view/Layout";
import ShoppingHome from "./pages/shopping-view/Home";
import ShopListing from "./pages/shopping-view/Listing";
import ShoppingCheckout from "./pages/shopping-view/Checkout";
import ShopingAccount from "./pages/shopping-view/Account";
import NotFound from "./pages/not-found/NotFound";
import CheckAuth from "./components/common/CheckAuth";

function App() {
  const isAutheticated = false;
  const user =null
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAutheticated={isAutheticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* admin */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAutheticated={isAutheticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="products" element={<Products />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        {/* shopping */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAutheticated={isAutheticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShopListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShopingAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
