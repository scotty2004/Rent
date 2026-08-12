import React from 'react';
import { useApp } from '../context/AppContext';
import { ListingCard } from './ListingCard';
import { Heart, Clock, User, Phone, Mail, ShieldCheck } from 'lucide-react';

export const TenantDashboard: React.FC = () => {
  const { currentUser, listings, savedListingIds, recentlyViewedIds } = useApp();

  const savedListings = listings.filter(l => savedListingIds.includes(l.id));
  const viewedListings = listings.filter(l => recentlyViewedIds.includes(l.id));

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#008751] via-[#007043] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="bg-[#F4B400] text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
            Tenant Account
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {currentUser ? currentUser.name : 'Valued Tenant'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 mt-1">
            Access your saved favorite properties, recent search history, and direct landlord contacts.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
          <span className="text-[10px] uppercase font-mono tracking-wider block text-slate-200">Tenant Fee</span>
          <span className="text-xl font-black text-[#F4B400]">$0.00 FREE</span>
          <span className="text-[10px] block text-slate-200">Always 100% Free for Tenants</span>
        </div>
      </div>

      {/* Saved Houses Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Saved Favorite Houses ({savedListings.length})</h2>
        </div>

        {savedListings.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center text-slate-400">
            <Heart className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-xs font-bold">You haven't saved any house listings yet.</p>
            <p className="text-[11px] text-slate-400 mt-1">Click the heart icon on any house listing to save it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      {/* Recently Viewed Houses */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#008751]" />
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Recently Viewed Houses</h2>
        </div>

        {viewedListings.length === 0 ? (
          <p className="text-xs text-slate-400 font-medium">No recent house views recorded in this session.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewedListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      {/* Profile Details */}
      {currentUser && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-[#008751]" /> Profile Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
            <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl">
              <span className="text-slate-400 text-[10px] uppercase block">Full Name</span>
              <strong className="text-slate-800 dark:text-slate-100">{currentUser.name}</strong>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl">
              <span className="text-slate-400 text-[10px] uppercase block">Phone / WhatsApp</span>
              <strong className="text-slate-800 dark:text-slate-100">{currentUser.phone}</strong>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl">
              <span className="text-slate-400 text-[10px] uppercase block">Verification Status</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Tenant
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
