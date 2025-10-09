import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  getUserByEmail: (email: string) => User | undefined;
}

const userStoreCreator: StateCreator<UserState, [], [], UserState> = (set, get) => ({
  users: [],
  addUser: (user: User) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  getUserByEmail: (email: string) =>
    get().users.find((u) => u.email === email),
});

export const useUserStore = create<UserState>()(
  persist(userStoreCreator, {
    name: "user-storage",
  })
);