import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/nav";
import { Footer } from "../footer/footer";
import { useStore } from "../../store/productStore";

export default function Cart() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartItemColor = useStore((state) => state.updateCartItemColor);
  const updateCartItemSize = useStore((state) => state.updateCartItemSize);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5D7DB] pt-20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all text-primary hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            Back to Shop
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-[#473E66]">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-[#06143E]">
                      {item.product.name}
                    </h3>
                    <p className="text-[#473E66] mb-2">${item.product.price}</p>

                    {item.product.colors && item.product.colors.length > 0 && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">Color:</span>
                        <div className="flex gap-1">
                          {item.product.colors.map((color) => (
                            <button
                              key={color.hex}
                              onClick={() =>
                                updateCartItemColor(item.product.id, color.name)
                              }
                              className={`w-6 h-6 rounded-full border ${
                                item.selectedColor === color.name
                                  ? "border-primary ring-2 ring-primary/30"
                                  : "border-gray-200"
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {item.product.sizes && item.product.sizes.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Size:</span>
                        <select
                          value={item.selectedSize || ""}
                          onChange={(e) =>
                            updateCartItemSize(item.product.id, e.target.value)
                          }
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="">Select size</option>
                          {item.product.sizes.map((size) => (
                            <option key={size.name} value={size.name}>
                              {size.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, Number(e.target.value))
                      }
                      className="rounded border p-1"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold text-[#06143E] mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-[#473E66]">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#473E66]">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-[#06143E]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="btn btn-primary w-full bg-darkBlue p-2 text-white rounded-md">Checkout</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
