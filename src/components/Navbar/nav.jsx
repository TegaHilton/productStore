import { useNavigate } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";
import { useStore } from "../../store/productStore";
import Logo from "../Logo/logo";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer text-gray-800 hover:text-primary transition-colors"
          >
            <Logo />
          </h1>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Store size={20} />
            <span>Shop</span>
          </button>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Admin
          </button>
        </div>

        {/* Cart Section */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ShoppingCart size={20} />
          <span>Cart ({cartItemsCount})</span>
        </button>
      </div>

      {/* Mobile Navigation Menu (Visible when isMenuOpen is true) */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-md py-4`}
      >
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/shop");
            }}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/admin-dashboard");
            }}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Admin
          </button>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/cart");
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
