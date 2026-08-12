import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, Heart, LayoutDashboard, User } from 'lucide-react';

export const BottomNav: React.FC<{ onNavigate: (page: string) => void; currentPage: string }> = ({ onNavigate, currentPage }) => {
  const { userRole, savedListingIds, setActiveModal, currentUser } = useApp();

  const getDashboardTarget = () => {
    if (userRole === 'landlord') return 'landlord-dashboard';
    if (userRole === 'admin') return 'admin-dashboard';
    return 'tenant-dashboard';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-1.5 px-4 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            currentPage === 'home' ? 'text-[#008751] dark:text-[#00a865] font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => onNavigate('search')}
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            currentPage === 'search' ? 'text-[#008751] dark:text-[#00a865] font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Search</span>
        </button>

        <button
          onClick={() => onNavigate('tenant-dashboard')}
          className={`relative flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            currentPage === 'tenant-dashboard' ? 'text-[#008751] dark:text-[#00a865] font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Heart className="w-5 h-5" />
          {savedListingIds.length > 0 && (
            <span className="absolute top-0 right-2 bg-[#F4B400] text-slate-900 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {savedListingIds.length}
            </span>
          )}
          <span className="text-[10px] mt-0.5">Saved</span>
        </button>

        <button
          onClick={() => {
            if (!currentUser) {
              setActiveModal('auth');
            } else {
              onNavigate(getDashboardTarget());
            }
          }}
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            currentPage.includes('dashboard') ? 'text-[#008751] dark:text-[#00a865] font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Dashboard</span>
        </button>

        <button
          onClick={() => {
            if (!currentUser) {
              setActiveModal('auth');
            } else {
              onNavigate(getDashboardTarget());
            }
          }}
          className={`flex flex-col items-center py-1 px-3 rounded-lg transition-colors ${
            currentPage === 'profile' ? 'text-[#008751] dark:text-[#00a865] font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{currentUser ? 'Account' : 'Login'}</span>
        </button>
      </div>
    </nav>
  );
};
