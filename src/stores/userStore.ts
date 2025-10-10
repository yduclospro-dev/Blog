import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

interface UserState {
  users: User[];
  addUser: (user: User) => void;
  getUserByEmail: (email: string) => User | undefined;
  getAllUsers: () => User[];
  checkIfUsernameOrEmailExists: (username: string, email: string) => boolean;
}

const userStoreCreator: StateCreator<UserState, [], [], UserState> = (set, get) => ({
  users: [],
  addUser: (user: User) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  getUserByEmail: (email: string) =>
    get().users.find((u) => u.email === email),
  getAllUsers: () => get().users,
  checkIfUsernameOrEmailExists: (username: string, email: string) => 
     get().users.some(user => user.username === username || user.email === email)
});

export const useUserStore = create<UserState>()(
  persist(userStoreCreator, {
    name: "user-storage",
  })
);