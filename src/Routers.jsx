import { Routes, Route } from "react-router-dom";
import tokenAuth from "./helper/tokenAuth";
import Home from "./pages/home";
import PageNotFound from "./pages/PageNotFound";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import RecoveryPassword from "./pages/forgotpassword/RecoveryPassword";
import ProductDetails from "./pages/productdetails";
import Addcardproducts from "./pages/addcardproducts";
import CreateProduct from "./ADMIN/pages/CreateProduct";
import AdminRoute from "./helper/AdminRoute";
import Category from "./ADMIN/pages/category";
import ManageProduct from "./ADMIN/pages/manageproduct";
import UpdateProduct from "./ADMIN/pages/manageproduct/UpdateProduct";
import UserInfo from "./ADMIN/pages/user/UserInfo";
import GraphView from "./ADMIN/pages/graph_view";
import ManageOrder from "./ADMIN/pages/manageOrder";
import Profile from "./pages/USER_INFO/pages/profile";
import ProtectedRoute from "./helper/ProtectedRoute";
import Order from "./pages/USER_INFO/pages/order";
import PasswordUpdate from "./pages/USER_INFO/pages/PasswordUpdate";
import CreateOrder from "./pages/order";
import VerifyAccount from "./pages/varify";

const Routers = () => {
  tokenAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/e/signin" element={<Signin />} />
      <Route path="/e/signup" element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/account/forgotpassword" element={<ForgotPassword />} />
      <Route path="/account/reset-password" element={<RecoveryPassword />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/addcard" element={<Addcardproducts />} />
      <Route path="/user/e/verify-email" element={<VerifyAccount />} />
      {/* Product routes */}
      <Route
        path="/admin/:adminId/dashboard/createproduct"
        element={
          <AdminRoute>
            <CreateProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/:adminId/dashboard/manageproduct"
        element={
          <AdminRoute>
            <ManageProduct />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/:adminId/dashboard/updateproduct/:productId"
        element={
          <AdminRoute>
            <UpdateProduct />
          </AdminRoute>
        }
      />
      {/*  Category routes */}
      <Route
        path="/admin/:adminId/dashboard/managecategory"
        element={
          <AdminRoute>
            <Category />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/:adminId/dashboard/user-info"
        element={
          <AdminRoute>
            <UserInfo />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/:adminId/dashboard/manageorder"
        element={
          <AdminRoute>
            <ManageOrder />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/:adminId/dashboard/graph-view"
        element={
          <AdminRoute>
            <GraphView />
          </AdminRoute>
        }
      />

      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/order/:userId"
        element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/update-password/:userId"
        element={
          <ProtectedRoute>
            <PasswordUpdate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order/create-order/:userId"
        element={
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
