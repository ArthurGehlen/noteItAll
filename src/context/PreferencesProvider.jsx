// Hooks
import { createContext, useContext, useState } from "react";

const PreferenceContext = createContext();

export function PreferencesProvider({ children }) {
  const [isSidebarActiveGlobal, setIsSidebarActiveGlobal] = useState(true);

  return (
    <PreferenceContext.Provider
      value={{ isSidebarActiveGlobal, setIsSidebarActiveGlobal }}
    >
      {children}
    </PreferenceContext.Provider>
  );
}

export const usePreference = () => useContext(PreferenceContext);
