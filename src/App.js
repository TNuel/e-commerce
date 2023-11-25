import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user-mgt/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./pages/user-mgt/RegisterPage";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/e-commerce/LandingPage";
import ProductDetails from "./pages/e-commerce/product/ProductPage";
import NoMatch from "./pages/NoMatch";
import { useState } from "react";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainLayout />}>
            <Route exact path="/main/landing-page" element={<LandingPage open={open} />} />
            <Route path="/main/product-details/:id" element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
