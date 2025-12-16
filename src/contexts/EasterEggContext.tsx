import { createContext, useContext, useState, ReactNode } from 'react';

interface EasterEggContextType {
  isCourseActive: boolean;
  setIsCourseActive: (active: boolean) => void;
}

const EasterEggContext = createContext<EasterEggContextType>({
  isCourseActive: false,
  setIsCourseActive: () => {},
});

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [isCourseActive, setIsCourseActive] = useState(false);

  return (
    <EasterEggContext.Provider value={{ isCourseActive, setIsCourseActive }}>
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEgg() {
  return useContext(EasterEggContext);
}
