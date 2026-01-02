'use client';

import { Contact } from '@/types/contact.interface';
import { format } from 'date-fns';
import { Mail, MailOpen, Eye, Phone, User } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
import ContactMessageModal from './ContactMessageModal';
import TablePagination from '@/components/shared/TablePagination';


interface ContactMessagesTableProps {
  contacts: Contact[];
  meta: any
}

export default function ContactMessagesTable({ contacts, meta }: ContactMessagesTableProps) {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure contacts is always an array
  const contactsList = Array.isArray(contacts) ? contacts : [];

  const openModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
  };

  const getInquiryTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'General Inquiry': 'bg-blue-100 text-blue-800',
      'Booking Support': 'bg-purple-100 text-purple-800',
      'Become a Guide': 'bg-green-100 text-green-800',
      'Partnership': 'bg-yellow-100 text-yellow-800',
      'Technical Issue': 'bg-red-100 text-red-800',
      'Feedback': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (contactsList.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Messages Found</h3>
        <p className="text-gray-600">Contact messages will appear here when users submit the contact form.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">All Messages</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inquiry Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contactsList.map((contact) => (
                <tr
                  key={contact._id}
                  className={`hover:bg-gray-50 transition-colors ${!contact.isRead ? 'bg-blue-50/30' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.isRead ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <MailOpen className="w-3 h-3" />
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <Mail className="w-3 h-3" />
                        Unread
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{contact.fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{contact.email}</span>
                      </div>
                      {contact.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{contact.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getInquiryTypeColor(contact.inquiryType)}`}>
                      {contact.inquiryType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 font-medium truncate max-w-xs">
                      {contact.subject}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
                      <br />
                      <span className="text-xs text-gray-500">
                        {format(new Date(contact.createdAt), 'hh:mm a')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => openModal(contact)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="lg:flex gap-3 items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-center mb-1 lg:mb-0 text-gray-600">
            Showing <span className="font-medium text-gray-900">{contactsList.length}</span> message{contactsList.length !== 1 ? 's' : ''}
          </p>
          {meta.totalPage > 1 && (
            <TablePagination
              currentPage={meta.page}
              totalPages={meta.totalPage}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedContact && (
        <Suspense fallback={<div>Loading...</div>}>
          <ContactMessageModal
            contact={selectedContact}
            onClose={closeModal}
          />
        </Suspense>
      )}
    </>
  );
}
