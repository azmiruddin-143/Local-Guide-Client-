'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface GuideSearchBarProps {
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
  availableExpertise?: string[];
}

export default function GuideSearchBar({ onSearch, initialValue = '', availableExpertise }: GuideSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Update local state when initialValue changes (from URL)
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Debounced search effect
  useEffect(() => {
    // Only trigger search if the value is different from initial
    if (searchTerm === initialValue) return;

    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, initialValue, onSearch]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by guide name, city, or country..."
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
        />
      </div>

      {/* Quick Filter Tags */}
      <div className="mt-4 flex items-center flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-600">Popular:</span>
        {availableExpertise?.map((tag) => (
          <button
            key={tag}
            onClick={() => setSearchTerm(tag)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
