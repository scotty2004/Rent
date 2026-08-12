import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ZIM_CITIES } from '../data/mockData';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  Star, 
  Trash2,
  MapPin,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    allUsers, 
    toggleBanUser, 
    listings, 
    toggleApproveListing, 
    toggleFeatureListing, 
    deleteListing,
    reports,
    resolveReport
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'users' | 'reports' | 'cities'>('listings');

  const landlords = allUsers.filter(u => u.role === 'landlord');
  const tenants = allUsers.filter(u => u.role === 'tenant');
  const pendingReports = reports.filter(r => r.status === 'pending');
  const totalSubRevenue = landlords.reduce((acc, curr) => {
    return acc + (curr.paymentHistory ? curr.paymentHistory.reduce((pAcc, p) => pAcc + p.amount, 0) : 0);
  }, 4); // base mock revenue

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#008751] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F4B400] text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Zim Accommodation Admin</h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Moderate listings, ban fraudulent landlords, review EcoCash/InnBucks transactions, and manage Zimbabwean cities.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 block">Subscription Revenue</span>
          <span className="text-2xl font-black text-[#F4B400]">${totalSubRevenue}.00 USD</span>
          <span className="text-[10px] block text-slate-200">From Landlord $2/Yr Payments</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Total Users</span>
            <Users className="w-5 h-5 text-[#008751]" />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{allUsers.length}</span>
          <span className="text-[10px] text-slate-400 block mt-1">{landlords.length} Landlords, {tenants.length} Tenants</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Active Listings</span>
            <Building2 className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{listings.length}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Houses registered</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Fraud Reports</span>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-2xl font-black text-red-600 dark:text-red-400">{pendingReports.length}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Pending admin review</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase">Cities Covered</span>
            <MapPin className="w-5 h-5 text-[#F4B400]" />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{ZIM_CITIES.length}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Zimbabwean Municipalities</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
            activeTab === 'listings' ? 'bg-[#008751] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
          }`}
        >
          Manage Listings ({listings.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
            activeTab === 'users' ? 'bg-[#008751] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
          }`}
        >
          Manage Users ({allUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
            activeTab === 'reports' ? 'bg-[#008751] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
          }`}
        >
          Scam Reports ({pendingReports.length})
        </button>
        <button
          onClick={() => setActiveTab('cities')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors ${
            activeTab === 'cities' ? 'bg-[#008751] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
          }`}
        >
          Cities & Suburbs ({ZIM_CITIES.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'listings' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">Moderate Property Listings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map(l => (
              <div key={l.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                <div className="flex gap-3">
                  <img src={l.images[0]} alt={l.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs truncate">{l.title}</h4>
                    <p className="text-[11px] text-slate-500">{l.suburb}, {l.city} • ${l.rentPrice}/mo</p>
                    <p className="text-[10px] text-slate-400">Landlord: {l.landlordName}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t text-xs font-bold">
                  <button
                    onClick={() => toggleFeatureListing(l.id)}
                    className={`flex items-center gap-1 ${l.isFeatured ? 'text-[#F4B400]' : 'text-slate-400'}`}
                  >
                    <Star className={`w-3.5 h-3.5 ${l.isFeatured ? 'fill-[#F4B400]' : ''}`} />
                    <span>{l.isFeatured ? 'Featured' : 'Make Featured'}</span>
                  </button>

                  <button
                    onClick={() => deleteListing(l.id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">All Platform Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">WhatsApp Phone</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                {allUsers.map(u => (
                  <tr key={u.id}>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3 uppercase text-[10px] font-mono text-[#008751]">{u.role}</td>
                    <td className="p-3 text-slate-500">{u.phone}</td>
                    <td className="p-3">
                      {u.isBanned ? (
                        <span className="bg-red-100 text-red-800 text-[10px] px-2 py-0.5 rounded-full font-bold">BANNED</span>
                      ) : (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => toggleBanUser(u.id)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-black ${
                          u.isBanned ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {u.isBanned ? 'Unban User' : 'Ban User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">Fraud & Scam Reports</h3>
          {reports.length === 0 ? (
            <p className="text-xs text-slate-400 font-medium">No active listing reports filed.</p>
          ) : (
            <div className="space-y-3">
              {reports.map(r => (
                <div key={r.id} className="bg-red-50 dark:bg-red-950/30 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-red-600 block">{r.reason}</span>
                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 mt-0.5">{r.listingTitle}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{r.details}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">Reported on {r.date}</span>
                  </div>

                  {r.status === 'pending' ? (
                    <button
                      onClick={() => resolveReport(r.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0"
                    >
                      Resolve & Dismiss
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600">✓ Resolved</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'cities' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">Supported Zimbabwean Municipalities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZIM_CITIES.map(c => (
              <div key={c.name} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/40">
                <h4 className="font-extrabold text-sm text-[#008751]">{c.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{c.suburbs.length} Suburbs: {c.suburbs.slice(0, 5).join(', ')}...</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
