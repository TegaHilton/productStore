import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Shop from "./components/shop/shop";
import Cart from "./components/cart/cart";
import ProductDetails from "./components/productDetails/productDetails";
import AdminLogin from "./components/adminLogin/adminlogin";
import AdminDashboard from "./components/admin/admin";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F2F4F6]">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
