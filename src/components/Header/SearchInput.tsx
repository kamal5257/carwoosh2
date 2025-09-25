"use client";

import React from "react";

interface SearchInputProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchInput = ({ query, onChange, placeholder, autoFocus = false }: SearchInputProps) => {
  return (
    <input
      type="text"
      value={query}
      onChange={onChange}
      placeholder={placeholder || "Search..."}
      autoFocus={autoFocus}
      className="search-input w-full px-3 py-1 rounded-md border border-gray-400 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-600"
    />
  );
};
