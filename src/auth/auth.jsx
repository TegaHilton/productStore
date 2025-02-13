import { create } from "zustand";
import { persist } from "zustand/middleware";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: localStorage.getItem("isAuthenticated") === "true", // ✅ Check storage on load

      login: (username, password) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          localStorage.setItem("isAuthenticated", "true"); // ✅ Persist login state
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        localStorage.removeItem("isAuthenticated"); // ✅ Clear on logout
        set({ isAuthenticated: false });
      },
    }),
    {
      name: "auth-store",
    }
  )
);
