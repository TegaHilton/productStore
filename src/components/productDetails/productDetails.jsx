import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../Navbar/nav";
import { Footer } from "../footer/footer";
import { useStore } from "../../store/productStore";

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const products = useStore((state) => state.products);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5D7DB]  ">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 text-primary hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Shop
          </button>
          <p className="text-[#06143E]">Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5D7DB] pt-20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/shop")}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all text-primary hover:text-gray-800"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#06143E] mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-[#473E66] mb-6">${product.price}</p>
              <p className="text-[#473E66] mb-6">{product.description}</p>

              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[#06143E] font-semibold mb-2">
                    Select Color
                  </h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.hex}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-10 h-10 rounded-full border-2 ${
                          selectedColor === color.name
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  {selectedColor && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {selectedColor}
                    </p>
                  )}
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-[#06143E] font-semibold mb-2">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`px-4 py-2 rounded-lg border ${
                          selectedSize === size.name
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-gray-200 hover:border-primary"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-[#473E66] mb-8">{product.description}</p>
              <button
                onClick={() => {
                  if (product.colors?.length && !selectedColor) {
                    toast.error("Please select a color");
                    return;
                  }
                  if (product.sizes?.length && !selectedSize) {
                    toast.error("Please select a size");
                    return;
                  }
                  useStore
                    .getState()
                    .addToCart(product, selectedColor, selectedSize);
                  toast.success("Added to cart");
                }}
                className="btn btn-primary w-full md:w-auto bg-darkBlue text-white py-2 px-4 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
