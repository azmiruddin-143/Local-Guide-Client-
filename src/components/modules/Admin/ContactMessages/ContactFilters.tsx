'use client';

import ClearFiltersButton from '@/components/shared/ClearFiltersButton';
import RefreshButton from '@/components/shared/RefreshButton';
import SearchFilter from '@/components/shared/SearchFilter';
import SelectFilter from '@/components/shared/SelectFilter';
import { InquiryType } from '@/types/contact.interface';

export default function ContactFilters() {
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 w-full gap-4">
      <div className="md:col-span-2">
        <SearchFilter paramName="searchTerm" placeholder="Search users..." />
      </div>
      <SelectFilter
        paramName="isRead"
        placeholder="Verification"
        defaultValue="All Messages"
        options={[
          { label: "Read", value: "true" },
          { label: "Unread", value: "false" },
        ]}
      />

      <SelectFilter
        paramName="inquiryType"
        placeholder="Verification"
        defaultValue="All Types"
        options={Object.values(InquiryType).map((type) => (
          { label: type, value: type }
        ))}
      />
      <div className='flex gap-2'>
        <RefreshButton />
        {/* Clear All Filters */}
        <ClearFiltersButton />
      </div>
    </div>
  );
}
