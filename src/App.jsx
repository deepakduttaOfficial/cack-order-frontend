import React from "react";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routers />
    </BrowserRouter>
  );
};

export default App;
