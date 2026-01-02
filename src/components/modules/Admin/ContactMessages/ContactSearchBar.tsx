'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ContactSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get('searchTerm') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Update local state when URL changes
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  // Debounced search
  useEffect(() => {
    // Don't trigger if search term hasn't changed from URL
    if (searchTerm === initialSearchTerm) return;

    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchTerm) {
        params.set('searchTerm', searchTerm);
      } else {
        params.delete('searchTerm');
      }
      
      // Reset to first page when search changes
      params.delete('page');
      
      const queryString = params.toString();
      const url = queryString 
        ? `/admin/dashboard/contact-messages?${queryString}`
        : '/admin/dashboard/contact-messages';
      
      router.push(url);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, initialSearchTerm, router, searchParams]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, email, subject, or message..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
