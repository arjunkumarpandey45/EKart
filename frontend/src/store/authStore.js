import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

     
      setAuth: (user, token) =>
        set({
          user,
          accessToken: token,
        }),

   
      logout: () =>
        set({
          user: null,
          accessToken: null,
        }),
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useAuthStore;
