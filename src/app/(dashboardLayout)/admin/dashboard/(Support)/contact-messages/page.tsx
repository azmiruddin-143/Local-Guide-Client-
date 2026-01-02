import ContactMessagesHeader from '@/components/modules/Admin/ContactMessages/ContactMessagesHeader';
import ContactFilters from '@/components/modules/Admin/ContactMessages/ContactFilters';
import ContactMessagesTable from '@/components/modules/Admin/ContactMessages/ContactMessagesTable';
import { getAllContacts } from '@/services/contact/contact.service';
import { queryStringFormatter } from '@/lib/formatters';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: 'Contact Messages | Admin Dashboard',
  description: 'Manage and respond to customer contact messages',
};

export default async function ContactMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const contactsResult = await getAllContacts(queryString);

  console.log(contactsResult);
  
  return (
    <div className="space-y-6">
      <ContactMessagesHeader
        totalMessages={contactsResult.meta.total}
        unreadCount={contactsResult.meta.unRead}
        readCount={contactsResult.meta.read}
      />

      {/* Search Bar and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <ContactFilters />
      </div>

      <div className="">
     

        {/* Main Content */}
        <main className="lg:col-span-3 space-y-6">
          <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
            <ContactMessagesTable contacts={contactsResult.data} meta={contactsResult?.meta} />
          </Suspense>


        </main>
      </div>
    </div>
  );
}
