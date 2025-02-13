import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/nav";
import { Footer } from "../footer/footer";
import { useStore } from "../../store/productStore";
import { ShoppingBag, Truck, Headphones, CreditCard, Star } from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F6] ">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[600px] mb-12 overflow-hidden">
          <div className="absolute inset-0 pt-28">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070"
              alt="Shopping Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#AFC9DC]/90 to-transparent"></div>
          </div>
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-bold mb-6 text-[#F2F4F6] leading-tight animate-fade-in">
                Discover Your Perfect Style
              </h1>
              <p className="text-xl mb-8 text-[#F2F4F6]/90 max-w-xl animate-fade-in-delay">
                Explore our curated collection of premium products. From fashion
                to electronics, find everything you need in one place.
              </p>
              <div className="flex gap-4 animate-fade-in-delay-2">
                <button
                  onClick={() => navigate("/shop")}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-[#AFC9DC] hover:bg-[#F2F4F6] text-gray-800 px-8 py-3 rounded-full transition-all transform hover:scale-105"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => navigate("/shop")}
                  className="btn border-2 border-[#F2F4F6] text-[#F2F4F6] hover:bg-[#F2F4F6] hover:text-gray-800 px-8 py-3 rounded-full transition-all transform hover:scale-105"
                >
                  View Collections
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="container top mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Electronics",
                image:
                  "https://images.unsplash.com/photo-1498049794561-7780e7231661",
                description: "Latest gadgets and tech accessories",
                items: "150+ Products",
              },
              {
                name: "Fashion",
                image:
                  "https://images.unsplash.com/photo-1445205170230-053b83016050",
                description: "Trendy clothing and accessories",
                items: "200+ Products",
              },
              {
                name: "Home & Living",
                image:
                  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126",
                description: "Beautiful home decor and furniture",
                items: "180+ Products",
              },
              {
                name: "Accessories",
                image:
                  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48",
                description: "Stylish accessories for every occasion",
                items: "120+ Products",
              },
              {
                name: "Beauty",
                image:
                  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                description: "Skincare and beauty products",
                items: "90+ Products",
              },
              {
                name: "Sports",
                image:
                  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
                description: "Sports gear and equipment",
                items: "100+ Products",
              },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate("/shop")}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary font-medium">
                      {category.items}
                    </span>
                    <span className="text-gray-800 group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#06143E] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <button
                    onClick={() => useStore.getState().addToCart(product)}
                    className="btn btn-primary w-full bg-darkBlue text-white p-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="bg-[#AFC9DC] text-white py-16 mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Special Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#AFC9DC] rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold mb-4">New Arrivals</h3>
                <p className="mb-4">Get 20% off on all new arrivals</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="btn bg-darkBlue hover:bg-[#F2F4F6] hover:text-black text-white px-4 py-2 rounded-md"
                >
                  Shop Now
                </button>
              </div>
              <div className="bg-[#06143E] rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold mb-4">Clearance Sale</h3>
                <p className="mb-4">Up to 50% off on selected items</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="btn bg-[#F1916D] hover:bg-[#BD83B8] text-white px-4 py-2 rounded-md"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold text-[#06143E] mb-8 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: ShoppingBag,
                title: "Quality Products",
                description: "Curated selection of premium products",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Free shipping on orders over $50",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                description: "Round the clock customer service",
              },
              {
                icon: CreditCard,
                title: "Secure Payment",
                description: "Safe and secure payment methods",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-[#06143E]" />
                <h3 className="text-xl font-semibold text-[#06143E] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="bg-white py-16 mb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#06143E] mb-8 text-center">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Regular Customer",
                  comment:
                    "Amazing products and excellent customer service! Will definitely shop here again.",
                  rating: 5,
                },
                {
                  name: "Mike Thompson",
                  role: "Verified Buyer",
                  comment:
                    "Fast delivery and great quality products. Highly recommended!",
                  rating: 5,
                },
                {
                  name: "Emily Davis",
                  role: "Loyal Customer",
                  comment:
                    "The best online shopping experience I've had. Great selection and prices.",
                  rating: 5,
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="bg-[#F2F4F6] p-6 rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-[#473E66] mb-4">{testimonial.comment}</p>
                  <div>
                    <p className="font-semibold text-[#06143E]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#473E66]">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-[#06143E] rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for exclusive offers and updates
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-lg text-black"
              />
              <button
                type="submit"
                className="btn bg-[#F1916D] hover:bg-[#BD83B8] text-white whitespace-nowrap p-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
