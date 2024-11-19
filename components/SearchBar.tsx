import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { detectIoCType } from '../utils/iocDetection';

const placeholders = [
  'Enter an IP address (e.g., 8.8.8.8)',
  'Enter a domain (e.g., example.com)',
  'Enter a file hash (MD5, SHA-1, SHA-256)',
  'Enter a URL to analyze',
];

interface SearchBarProps {
  onSearch: (query: string, type: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const type = detectIoCType(query.trim());
    if (type) {
      onSearch(query.trim(), type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl px-4 sm:px-6 md:px-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="w-full h-[56px] pl-14 pr-12 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-lg"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Search className="w-5 h-5 text-gray-400" />
        </button>
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
    </form>
  );
}