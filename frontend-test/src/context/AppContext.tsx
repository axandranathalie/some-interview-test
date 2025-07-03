"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  search: string;
  setSearch: (value: string) => void;
  showFavorites: boolean;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  sortOrder: "oldest" | "newest";
  toggleSortOrder: () => void;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOrder, setSortOrder] = useState<"oldest" | "newest">("newest");
  const [showSearch, setShowSearch] = useState(false); 

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));

  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        showFavorites,
        setShowFavorites,
        sortOrder,
        toggleSortOrder,
        showSearch,      
        setShowSearch,   
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
