import { useNavigate } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";
import { useStore } from "../../store/productStore";
import Logo from "../Logo/logo";

export function Navbar() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center gap-150">
        <div className="flex items-center space-x-8">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-primary transition-colors"
          >
            <Logo />
          </h1>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Store size={20} />
              <span>Shop</span>
            </button>
            <button
              onClick={() => navigate("/admin-dashboard")} // Fixed route
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ShoppingCart size={20} />
          <span>Cart ({cartItemsCount})</span>
        </button>
      </div>
    </nav>
  );
}
