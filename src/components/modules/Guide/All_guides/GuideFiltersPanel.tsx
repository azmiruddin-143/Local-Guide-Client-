'use client';

import { Check, X } from 'lucide-react';

interface GuideFilters {
  searchTerm?: string;
  languages?: string[];
  expertise?: string[];
  location?: string;
  isVerified?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface GuideFiltersPanelProps {
  filters: GuideFilters;
  onFilterChange: (filters: Record<string, any>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  availableLanguages: string[];
  availableExpertise: string[];
}

export default function GuideFiltersPanel({
  filters,
  onFilterChange,
  onClearFilters,
  availableLanguages,
  availableExpertise,
  hasActiveFilters,
}: GuideFiltersPanelProps) {
  const toggleLanguage = (language: string) => {
    const currentLanguages = filters.languages || [];
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(l => l !== language)
      : [...currentLanguages, language];
    onFilterChange({ languages: newLanguages });
  };

  const toggleExpertise = (expertise: string) => {
    const currentExpertise = filters.expertise || [];
    const newExpertise = currentExpertise.includes(expertise)
      ? currentExpertise.filter(e => e !== expertise)
      : [...currentExpertise, expertise];
    onFilterChange({ expertise: newExpertise });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      

      {/* Language Filter */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
        {availableLanguages.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableLanguages.map((language) => (
              <label
                key={language}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.languages?.includes(language)}
                  onChange={() => toggleLanguage(language)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">{language}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No languages available</p>
        )}
      </div>

      {/* Expertise/Category Filter */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Expertise</h4>
        {availableExpertise.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {availableExpertise.map((exp) => {
              const isSelected = filters.expertise?.includes(exp);
              return (
                <button
                  key={exp}
                  onClick={() => toggleExpertise(exp)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {isSelected && <Check size={14} className="inline mr-1" />}
                  {exp}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No expertise available</p>
        )}
      </div>

     

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t">
          <h4 className="font-semibold text-gray-900 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.languages?.map((lang) => (
              <span
                key={lang}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1"
              >
                {lang}
                <button onClick={() => toggleLanguage(lang)}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {filters.expertise?.map((exp) => (
              <span
                key={exp}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1"
              >
                {exp}
                <button onClick={() => toggleExpertise(exp)}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {filters.location && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full flex items-center gap-1">
                📍 {filters.location}
                <button onClick={() => onFilterChange({ location: '' })}>
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
