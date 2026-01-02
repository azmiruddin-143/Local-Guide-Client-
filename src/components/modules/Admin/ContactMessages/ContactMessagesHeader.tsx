import { Mail, MailOpen, MessageSquare } from 'lucide-react';

interface ContactMessagesHeaderProps {
  totalMessages: number;
  unreadCount: number;
  readCount: number;
}

export default function ContactMessagesHeader({ totalMessages, unreadCount, readCount }: ContactMessagesHeaderProps) {

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
      <p className="text-gray-600 mb-6">Manage and respond to customer inquiries</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-blue-900">{totalMessages}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 mb-1">Unread Messages</p>
              <p className="text-3xl font-bold text-orange-900">{unreadCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">Read Messages</p>
              <p className="text-3xl font-bold text-green-900">{readCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <MailOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}