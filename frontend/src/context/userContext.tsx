// src/context/UserContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IuserLogin } from '../types/user';

interface UserContextData {
  user: IuserLogin | null;
  setUser: React.Dispatch<React.SetStateAction<IuserLogin | null>>;
}

export const UserContext = createContext<UserContextData | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IuserLogin | null>(null);

  useEffect(() => {
    // Verifica se há um usuário salvo no AsyncStorage ao iniciar a aplicação
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
