export function Footer() {
  return (
    <footer className="bg-white shadow-md py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EcoShop</h3>
            <p className="text-gray-600">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shop"
                  className="text-gray-800 hover:text-primary transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-gray-800 hover:text-primary transition-colors"
                >
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-600">
              Email: support@ecoshop.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          © 2024 EcoShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
