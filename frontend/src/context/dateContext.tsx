// src/context/DateContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import moment from 'moment';

interface DateContextData {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const DateContext = createContext<DateContextData | undefined>(undefined);

interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider = ({ children }: DateProviderProps) => {
  const [date, setDate] = useState(moment.utc().format("YYYY-MM-DD"));

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
