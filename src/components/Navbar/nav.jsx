import { useNavigate } from "react-router-dom";
import { ShoppingCart, Store, Menu } from "lucide-react";
import { useStore } from "../../store/productStore";
import Logo from "../Logo/logo";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle navigation and scroll to the top
  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to the top of the page after navigation
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and Desktop Navigation Section */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <h1
            onClick={() => handleNavigate("/")}
            className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-primary transition-colors"
          >
            <Logo />
          </h1>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-6">
            <button
              onClick={() => handleNavigate("/shop")}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Store size={20} />
              <span>Shop</span>
            </button>
            <button
              onClick={() => handleNavigate("/admin-dashboard")}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Cart Section */}
        <button
          onClick={() => handleNavigate("/cart")}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ShoppingCart size={20} />
          <span>Cart ({cartItemsCount})</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-md py-4`}
      >
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleNavigate("/shop");
            }}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleNavigate("/admin-dashboard");
            }}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Admin
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleNavigate("/cart");
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Cart ({cartItemsCount})</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
