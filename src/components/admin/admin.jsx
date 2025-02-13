import { useState, useEffect, useMemo } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/nav";
import { Footer } from "../footer/footer";
import { useStore } from "../../store/productStore";
import { useAuthStore } from "../../../src/auth/auth";
import { toast } from "sonner";

export default function Admin() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const colors = [];
    for (let i = 0; i < 4; i++) {
      const name = formData.get(`colorName${i}`);
      const hex = formData.get(`colorHex${i}`);
      if (name && hex) colors.push({ name, hex });
    }

    const sizes = [];
    for (let i = 0; i < 6; i++) {
      const name = formData.get(`sizeName${i}`);
      const label = formData.get(`sizeLabel${i}`);
      if (name && label) sizes.push({ name, label });
    }

    const productData = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get("name"),
      price: Number(formData.get("price")),
      description: formData.get("description"),
      image: formData.get("image"),
      category: formData.get("category"),
      colors: colors.length > 0 ? colors : undefined,
      sizes: sizes.length > 0 ? sizes : undefined,
    };

    if (editingProduct) {
      updateProduct(productData);
      toast.success("Product updated successfully");
    } else {
      addProduct(productData);
      toast.success("Product added successfully");
    }

    setIsEditing(false);
    setEditingProduct(null);
    e.target.reset();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F6] pt-20">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center  gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => {
              logout();
              navigate("/admin-login");
            }}
            className="px-4 py-2 font-medium transition-all duration-200 btn-secondary bg-warmOrange text-white p-2 rounded-md"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-4 md:w-auto w-full mb-4 ml-auto justify-end">
          <div className="flex flex-grow md:flex-grow-0 gap-2 ">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow md:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#AFC9DC]"
            />
            <button className="btn btn-primary flex items-center gap-2 bg-darkBlue text-white p-2 rounded-md">
              <Search size={20} /> Search
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary whitespace-nowrap bg-darkBlue text-white p-2 rounded-md"
            >
              Add New Product
            </button>
          </div>
        </div>

        {isEditing && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6 mb-4">
            <h2 className="text-2xl font-bold">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <input
                type="text"
                name="name"
                defaultValue={editingProduct?.name}
                placeholder="Product Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={editingProduct?.price}
                placeholder="Price"
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                defaultValue={editingProduct?.description}
                placeholder="Description"
                className="w-full border p-2 rounded h-32"
                required
              />
              <input
                type="url"
                name="image"
                defaultValue={editingProduct?.image}
                placeholder="Image URL"
                className="w-full border p-2 rounded"
                required
              />
              <select
                name="category"
                defaultValue={editingProduct?.category || "other"}
                className="w-full border p-2 rounded"
              >
                <option value="clothing">Clothing</option>
                <option value="footwear">Footwear</option>
                <option value="accessories">Accessories</option>
                <option value="electronics">Electronics</option>
                <option value="other">Other</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      name={`colorName${i}`}
                      placeholder="Color Name"
                      defaultValue={editingProduct?.colors?.[i]?.name}
                      className="border p-2 rounded"
                    />
                    <input
                      type="color"
                      name={`colorHex${i}`}
                      defaultValue={
                        editingProduct?.colors?.[i]?.hex || "#000000"
                      }
                      className="w-12 h-10 rounded border"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 ">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-2 ">
                    <input
                      type="text"
                      name={`sizeName${i}`}
                      placeholder="Size Code"
                      defaultValue={editingProduct?.sizes?.[i]?.name}
                      className="w-24 border p-2 rounded"
                    />
                    <input
                      type="text"
                      name={`sizeLabel${i}`}
                      placeholder="Size Label"
                      defaultValue={editingProduct?.sizes?.[i]?.label}
                      className="border p-2 rounded"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn btn-primary bg-darkBlue text-white px-4 py-2 rounded-md "
                >
                  {editingProduct ? "Update Product" : "Add"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-secondary bg-warmOrange text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#AFC9DC] text-white ">
              <tr className="text-left">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr className="border-t" key={product.id}>
                  <td className="p-4">
                    <img
                      src={product.image}
                      className="w-16 h-16 object-cover rounded"
                      alt={product.name}
                    />
                  </td>
                  <td className="p-4 text-[#473E66]">{product.name}</td>
                  <td className="p-4 text-[#473E66]">${product.price}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
