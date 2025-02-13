import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/nav";
import { Footer } from "../footer/footer";
import { toast } from "sonner";
import { useAuthStore } from "../../../src/auth/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuthStore();

  // ✅ Redirect only if authenticated, preventing infinite loop
  useEffect(() => {
    if (isAuthenticated && window.location.pathname !== "/admin-login") {
      navigate("/admin-dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details:", username, password); // Debugging
    if (login(username, password)) {
      toast.success("Login successful");
      setTimeout(() => navigate("/admin-dashboard", { replace: true }), 100);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5D7DB]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-[#06143E] mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[#473E66] mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border p-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#473E66] mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border p-2"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full bg-darkBlue p-3 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
