import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { Sun, Moon } from 'lucide-react';

export function App() {
  const [isDark, setIsDark] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearch = (query: string, type: string) => {
    setSearchQuery(query);
    setSearchType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar />
      
      <main className="transition-all duration-300 ml-16 lg:ml-64 min-h-screen">
        <div className="sticky top-0 z-40 p-4 flex justify-end bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 px-4 pt-16">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IoC Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl">
            Analyze IP addresses, domains, file hashes, and other indicators of compromise using multiple security intelligence sources
          </p>
          <SearchBar onSearch={handleSearch} />
          
          {searchQuery && searchType && (
            <SearchResults query={searchQuery} type={searchType} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;