import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import * as api from "../api";

import type { User } from "../types";

type ActiveBtn = null | 'register' | 'login';

type TUsersProvider = {
  selectedBtn: ActiveBtn;
  setSelectedBtn: (btn: ActiveBtn) => void;
  currentUser: User | null;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  createUser: (user: Omit<User, "id">) => Promise<void>;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const UsersContext = createContext<TUsersProvider>({} as TUsersProvider);

export const UsersProvider = ({children}: {children: ReactNode}) => {

  const [selectedBtn, setSelectedBtn] = useState<ActiveBtn>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const refetchUsers = () => {
    setIsLoading(true)
    return api.getAllUsers()
    .then((users) => setAllUsers(users))
    .catch(() => toast.error('Failed to refetch users!'))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    refetchUsers();
  }, []);
  
  //we need favoritesRecipes, setFavoriteRecipes, toggleFavRecipe from "FavoritesProvider"

  const createUser = async (user: Omit<User, "id">): Promise<void> => {
    setIsLoading(true);
  
    try {
      // Check if the username already exists in the list of allUsers
      const existingUser = allUsers.find((u) => u.username === user.username);
  
      if (existingUser) {
        toast.error('User already exists, try a different username!');
        setIsLoading(false);
        return;
      }
  
      await api.postUser(user);
      await refetchUsers();
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('Failed to create user.');
    } finally {
      setIsLoading(false);
    }
  }

  const login = (username: string, password: string) => {    
    setIsLoading(true);
    const user = allUsers.find((user) => user.username === username);
  
    if (!user) {
      toast.error('User not found');
      setIsLoading(false);
      return;
    }
  
    if (user.password !== password) {
      toast.error('Incorrect password');
      setIsLoading(false);
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  
    // If both username and password match
    toast.success('Logged in!');
    setIsLoading(false);
    setSelectedBtn(null);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  }

  const value = {
    selectedBtn,
    setSelectedBtn,
    currentUser,
    isLoading,
    setIsLoading,
    createUser,
    login,
    logout
  }

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  )

}

export const useUsers = () => useContext(UsersContext);