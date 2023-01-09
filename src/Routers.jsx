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
    </Routes>
  );
};

export default Routers;
