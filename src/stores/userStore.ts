import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/User";

interface AuthUser {
  id: string;
  email: string;
  username: string;
}

interface UserState {
  // Gestion des utilisateurs
  users: User[];
  addUser: (user: User) => boolean;
  getUserByEmail: (email: string) => User | undefined;
  getAllUsers: () => User[];
  checkIfUsernameOrEmailExists: (username: string, email: string) => boolean;
  
  // Authentification
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const userStoreCreator: StateCreator<UserState, [], [], UserState> = (set, get) => ({
  // État initial
  users: [],
  currentUser: null,
  isAuthenticated: false,

  // Gestion des utilisateurs
  addUser: (user: User) => {
    if (!user.id || !user.username || !user.email || !user.password) return false
    set((state) => ({ users: [...state.users, user] }))
    return true
  },
  
  getUserByEmail: (email: string) =>
    get().users.find((u) => u.email === email),
  
  getAllUsers: () => get().users,
  
  checkIfUsernameOrEmailExists: (username: string, email: string) =>
    get().users.some(user => user.username === username || user.email === email),

  // Authentification
  login: async (email: string, password: string) => {
    const users = get().users;
    
    // Vérifier les credentials
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Email ou mot de passe incorrect' };
    }

    // Connexion réussie
    set({
      currentUser: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      isAuthenticated: true
    });

    return { success: true };
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },

  register: async (username: string, email: string, password: string) => {
    // Validation
    if (!username || !email || !password) {
      return { success: false, error: 'Tous les champs sont obligatoires' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Le mot de passe doit contenir au moins 6 caractères' };
    }

    // Vérifier si l'utilisateur existe déjà
    if (get().checkIfUsernameOrEmailExists(username, email)) {
      return { success: false, error: "Le nom d'utilisateur ou l'email existe déjà" };
    }

    // Créer le nouvel utilisateur
    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      password
    };

    // Ajouter l'utilisateur (sans connexion automatique)
    get().addUser(newUser);

    return { success: true };
  }
});

export const useUserStore = create<UserState>()(
  persist(userStoreCreator, {
    name: "users-storage",
    storage: createJSONStorage(() => localStorage),
  })
);