import { create } from "zustand";
import { User } from "../interfaces/user.interface";
import { LoginData, RegisterData, UpdateData } from "../interfaces/auth.interface";
import { persist } from "zustand/middleware";

interface State {
  user: User | null;
  isLogged: boolean;
  token: string;

  login: (loginData: LoginData) => Promise<void>;
  register: (registerData: RegisterData) => Promise<void>;
  getById: (userId: string) => Promise<void>;
  update: (updateData: UpdateData, userId: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      isLogged: false,
      token: "",

      login: async (loginData: LoginData) => {
        const { email, password } = loginData;

        try {
          const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password
            })
          })

          if (!res.ok) {
            throw new Error("Email o contraseña incorrectos.");
          }

          const data = await res.json();

          set({ user: data.data, isLogged: true, token: data.token });
        }
        catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          else {
            throw new Error("Ocurrió un error inesperado.");
          }
        }

      },
      register: async (registerData: RegisterData): Promise<void> => {
        try {
          const res = await fetch("http://localhost:4000/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData)
          });

          if (!res.ok) {
            const errorData = await res.json();
            if (errorData.error === "Email already exists") {
              throw new Error("El email ya esta registrado.");
            }
            else if (errorData.error === "DNI already exists") {
              throw new Error("El DNI ya esta registrado.");
            }
            else {
              throw new Error("Ocurrio un error inesperado");
            }
          }

          return;
        }
        catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          else {
            throw new Error("Ocurrio un error inesperado.");
          }
        }
      },
      getById: async (userId: string): Promise<void> => {
        try {
          const res = await fetch(`http://localhost:4000/api/auth/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
          }

          const foundUser = await res.json();

          set({ user: foundUser.user });
        }
        catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          else {
            throw new Error("Ocurrio un error inesperado.");
          }
        }
      },
      update: async (updateData: UpdateData, userId: string): Promise<void> => {
        try {
          const res = await fetch(`http://localhost:4000/api/auth/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData)
          });

          if (!res.ok) {
            throw new Error("Ocurrio un error inesperado.");
          }

          await get().getById(userId);

        }
        catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          else {
            throw new Error("Ocurrio un error inesperado.");
          }
        }
      },
      logout: () => {
        set({ user: null, isLogged: false, token: "" });
      },
    }),
    {
      name: "auth-session",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
)