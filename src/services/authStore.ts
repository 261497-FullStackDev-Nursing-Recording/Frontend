import { create } from "zustand";
export type RoleTypes =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "NURSE_ADMIN"
  | "NURSE"
  | "USER";

export interface UserType {
  username: string | null;
  role: RoleTypes;
}

interface AuthStore {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: string | null;
  setError: (error: string) => void;
}

//create default and manage state to pass to the useAuth.ts file
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user: UserType | null) => set({}),
  isLoading: true, // Prevent initial redirect to login page.
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  error: null,
  setError: (error: string) => set({ error }),
}));
