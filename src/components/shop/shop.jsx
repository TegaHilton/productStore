import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/nav";
import { Footer } from "../footer/footer";
import { useStore } from "../../store/productStore";

export default function Shop() {
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Define how many products per page

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  // Paginated products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page and scroll to top
  const handleNext = () => {
    if (currentPage * productsPerPage < filteredProducts.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to the top of the page after changing the page
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to the top of the page after changing the page
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5D7DB] pt-20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow sm:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#06143E]"
            />
            <button
              onClick={() => setSearchQuery(searchQuery)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-all duration-200 btn-primary flex items-center gap-2 bg-darkBlue text-white"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/product-details?id=${product.id}`)}
              />
              <div className="p-4">
                <h3
                  className="text-lg font-semibold text-[#06143E] mb-2 cursor-pointer hover:text-gray-600"
                  onClick={() => navigate(`/product-details?id=${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-[#473E66] mb-4">${product.price}</p>
                <button
                  onClick={() => useStore.getState().addToCart(product)}
                  className="btn btn-primary w-full bg-darkBlue text-white rounded-md p-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-darkBlue text-white rounded-md disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-darkBlue text-white rounded-md disabled:opacity-50"
            disabled={currentPage * productsPerPage >= filteredProducts.length}
          >
            Next
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
