import { create } from "zustand";
import { persist } from "zustand/middleware";

// Sample Products
const mockProducts = [
  {
    id: "1",
    name: "Classic White Sneakers",
    price: 89.99,
    description: "Comfortable and stylish sneakers perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  },
  {
    id: "2",
    name: "Leather Backpack",
    price: 129.99,
    description:
      "Premium leather backpack with multiple compartments for everyday use.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: 199.99,
    description:
      "High-quality wireless headphones with active noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: "4",
    name: "Smart Watch",
    price: 299.99,
    description:
      "Feature-rich smartwatch with health tracking and notifications.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
  },
  {
    id: "5",
    name: "Vintage Camera",
    price: 449.99,
    description: "Classic vintage camera for photography enthusiasts.",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  },
  {
    id: "6",
    name: "Minimalist Watch",
    price: 159.99,
    description: "Elegant minimalist watch with leather strap.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
  },
  {
    id: "7",
    name: "Sunglasses",
    price: 129.99,
    description: "Stylish sunglasses with UV protection.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
  },
  {
    id: "8",
    name: "Laptop Sleeve",
    price: 39.99,
    description: "Protective sleeve for laptops up to 15 inches.",
    image: "https://images.unsplash.com/photo-1533697344553-5c72c5be4b48",
  },
  {
    id: "9",
    name: "Mechanical Keyboard",
    price: 149.99,
    description: "High-performance mechanical keyboard for typing enthusiasts.",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212",
  },
  {
    id: "10",
    name: "Desk Lamp",
    price: 79.99,
    description: "Modern LED desk lamp with adjustable brightness.",
    image: "https://images.unsplash.com/photo-1534281368625-1c90d3170590",
  },
  {
    id: "11",
    name: "Coffee Maker",
    price: 199.99,
    description: "Premium coffee maker with built-in grinder.",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
  },
  {
    id: "12",
    name: "Bluetooth Speaker",
    price: 89.99,
    description: "Portable bluetooth speaker with rich sound.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
  },
  {
    id: "13",
    name: "Yoga Mat",
    price: 49.99,
    description: "Non-slip yoga mat for comfortable practice.",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2",
  },
  {
    id: "14",
    name: "Plant Pot",
    price: 34.99,
    description: "Ceramic plant pot with drainage hole.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
  },
  {
    id: "15",
    name: "Wall Clock",
    price: 59.99,
    description: "Modern wall clock with silent movement.",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c",
  },
  {
    id: "16",
    name: "Water Bottle",
    price: 29.99,
    description: "Insulated water bottle keeps drinks cold for 24 hours.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
  },
  {
    id: "17",
    name: "Phone Stand",
    price: 24.99,
    description: "Adjustable phone stand for desk use.",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11",
  },
  {
    id: "18",
    name: "Travel Pillow",
    price: 39.99,
    description: "Memory foam travel pillow for comfortable journeys.",
    image: "https://images.unsplash.com/photo-1520923179278-ee25e25e09e4",
  },
  {
    id: "19",
    name: "Wireless Mouse",
    price: 49.99,
    description: "Ergonomic wireless mouse with long battery life.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  },
  {
    id: "20",
    name: "Notebook Set",
    price: 19.99,
    description: "Set of 3 premium notebooks with dotted pages.",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57",
  },
];

export const useStore = create(
  persist(
    (set) => ({
      products: mockProducts,
      cart: [],

      addToCart: (product, selectedColor, selectedSize) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cart: [
              ...state.cart,
              { product, quantity: 1, selectedColor, selectedSize },
            ],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),

      updateCartItemColor: (productId, color) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, selectedColor: color }
              : item
          ),
        })),

      updateCartItemSize: (productId, size) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, selectedSize: size }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),

      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),
    }),
    {
      name: "ecommerce-store",
    }
  )
);

// ✅ Export `useProducts`
export const useProducts = () => useStore((state) => state.products);
