"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  updateSearch: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearch = (value: string) => {
    setSearchTerm(value);

    // Scroll suave até a seção de produtos
    if (typeof window !== "undefined") {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de SearchProvider");
  }
  return context;
}
