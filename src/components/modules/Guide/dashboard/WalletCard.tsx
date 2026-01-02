'use client';

import { Wallet, ArrowUpRight, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface WalletCardProps {
  wallet: {
    balance: number;
    pendingBalance: number;
    totalEarned: number;
    totalPlatformFee: number;
  };
  payouts: {
    pending: {
      count: number;
      totalAmount: number;
      totalNetAmount: number;
    };
  };
}

export default function WalletCard({ wallet, payouts }: WalletCardProps) {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-lg">
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-green-100">Available Balance</p>
            <h2 className="text-3xl font-bold">৳{wallet.balance.toLocaleString()}</h2>
          </div>
        </div>
        <Link
          href="/guide/dashboard/earnings"
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <span className="text-sm font-medium">Request Payout</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-green-100" />
            <p className="text-xs text-green-100">Pending</p>
          </div>
          <p className="text-lg font-semibold">৳{wallet.pendingBalance.toLocaleString()}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-green-100" />
            <p className="text-xs text-green-100">Total Earned</p>
          </div>
          <p className="text-lg font-semibold">৳{wallet.totalEarned.toLocaleString()}</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpRight className="h-4 w-4 text-green-100" />
            <p className="text-xs text-green-100">Platform Fee</p>
          </div>
          <p className="text-lg font-semibold">৳{wallet.totalPlatformFee.toLocaleString()}</p>
        </div>
      </div>

      {payouts.pending.count > 0 && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-100">
              {payouts.pending.count} pending payout{payouts.pending.count > 1 ? 's' : ''}
            </p>
            <p className="text-sm font-semibold">৳{payouts.pending.totalNetAmount.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
