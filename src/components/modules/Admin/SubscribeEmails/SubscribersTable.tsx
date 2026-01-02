'use client';

import SearchFilter from '@/components/shared/SearchFilter';
import TablePagination from '@/components/shared/TablePagination';
import { Subscriber } from '@/services/newsletter/newsletter.service';
import { format } from 'date-fns';
import { Mail, CheckCircle, XCircle, Calendar, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface SubscribersTableProps {
  subscribers: Subscriber[];
  meta: any
}

export default function SubscribersTable({ subscribers, meta }: SubscribersTableProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Ensure subscribers is always an array
  const subscribersList = Array.isArray(subscribers) ? subscribers : [];

  const copyToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllEmails = async () => {
    const activeEmails = subscribersList
      .filter(sub => sub.isActive)
      .map(sub => sub.email)
      .join(', ');

    try {
      await navigator.clipboard.writeText(activeEmails);
      setCopiedEmail('all');
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };



  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">All Subscribers</h2>
      <div className="md:col-span-2 max-w-[399px]">
        <SearchFilter paramName="searchTerm" placeholder="Search emails..." />
      </div>
        <button
          onClick={copyAllEmails}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          {copiedEmail === 'all' ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy All Active Emails
            </>
          )}
        </button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscribed Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unsubscribed Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscribersList.map((subscriber) => (
              <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{subscriber.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {subscriber.isActive ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3" />
                      Unsubscribed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {format(new Date(subscriber.subscribedAt), 'MMM dd, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {subscriber.unsubscribedAt ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {format(new Date(subscriber.unsubscribedAt), 'MMM dd, yyyy')}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => copyToClipboard(subscriber.email)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Copy email"
                  >
                    {copiedEmail === subscriber.email ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            {subscribersList.length === 0 &&
              (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Subscribers Yet</h3>
                  <p className="text-gray-600">Newsletter subscribers will appear here once users start subscribing.</p>
                </div>
              )
            }
      </div>

      {/* Footer */}
      <div className="lg:flex gap-3 items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-center text-gray-600">
          Showing <span className="font-medium text-gray-900">{subscribersList.length}</span> subscriber{subscribersList.length !== 1 ? 's' : ''}
        </p>
        {meta?.totalPage > 1 && (
          <TablePagination
            currentPage={meta?.page}
            totalPages={meta?.totalPages}
          />
        )}
      </div>
    </div>
  );
}
