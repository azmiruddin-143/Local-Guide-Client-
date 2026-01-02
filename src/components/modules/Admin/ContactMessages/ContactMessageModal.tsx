'use client';

import { Contact } from '@/types/contact.interface';
import { markContactAsRead, deleteContact } from '@/services/contact/contact.service';
import { format } from 'date-fns';
import { X, Mail, Phone, User, Calendar, Tag, MessageSquare, Trash2, CheckCircle } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface ContactMessageModalProps {
  contact: Contact;
  onClose: () => void;
}

export default function ContactMessageModal({ contact, onClose }: ContactMessageModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleMarkAsRead = () => {
    if (contact.isRead) return;

    startTransition(async () => {
      await markContactAsRead(contact._id);
      onClose()
      router.refresh();
    });
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    setIsDeleting(true);
    startTransition(async () => {
      await deleteContact(contact._id);
      setIsDeleting(false);
      onClose();
      router.refresh();
    });
  };

  const getInquiryTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'General Inquiry': 'bg-blue-100 text-blue-800 border-blue-200',
      'Booking Support': 'bg-purple-100 text-purple-800 border-purple-200',
      'Become a Guide': 'bg-green-100 text-green-800 border-green-200',
      'Partnership': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Technical Issue': 'bg-red-100 text-red-800 border-red-200',
      'Feedback': 'bg-pink-100 text-pink-800 border-pink-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Message Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Type */}
          <div className="flex items-center gap-3 flex-wrap">
            {contact.isRead ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                <CheckCircle className="w-4 h-4" />
                Read
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                <Mail className="w-4 h-4" />
                Unread
              </span>
            )}
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getInquiryTypeColor(contact.inquiryType)}`}>
              <Tag className="w-4 h-4" />
              {contact.inquiryType}
            </span>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm font-medium text-gray-900">{contact.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{contact.email}</p>
                </div>
              </div>

              {contact.phoneNumber && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-medium text-gray-900">{contact.phoneNumber}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Submitted On</p>
                  <p className="text-sm font-medium text-gray-900">
                    {format(new Date(contact.createdAt), 'MMM dd, yyyy • hh:mm a')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Subject</h3>
            <p className="text-gray-700">{contact.subject}</p>
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Message</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {contact.message}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={handleDelete}
            disabled={isPending || isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? 'Deleting...' : 'Delete Message'}
          </button>

          <div className="flex items-center gap-3">
            {!contact.isRead && (
              <button
                onClick={handleMarkAsRead}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                {isPending ? 'Marking...' : 'Mark as Read'}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
