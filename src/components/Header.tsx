import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  User as UserIcon, 
  Moon, 
  Sun, 
  LogOut, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  PhoneCall,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC<{ onNavigate: (page: string) => void; currentPage: string }> = ({ onNavigate, currentPage }) => {
  const { 
    currentUser, 
    setCurrentUser, 
    userRole, 
    darkMode, 
    setDarkMode, 
    savedListingIds, 
    switchDemoRole,
    setActiveModal,
    setFilters
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters(prev => ({ ...prev, city: 'all', suburb: searchQuery.trim() }));
      onNavigate('search');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#008751] text-white text-xs py-1.5 px-4 font-medium flex justify-between items-center overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="bg-[#F4B400] text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Landlord Offer
          </span>
          <span>1 Month FREE Trial — then only <strong>US$2 per year</strong>!</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] opacity-90">
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-[#F4B400]" /> Hotline: +263 77 123 4567
          </span>
          <span className="border-l border-white/20 pl-3">EcoCash • InnBucks • Omari</span>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="bg-[#008751] p-2 rounded-xl group-hover:bg-[#007043] transition-colors shadow-sm relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9.5L12 3L21 9.5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.5Z" stroke="#F4B400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21V12H15V21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute -bottom-1 -right-1 bg-[#F4B400] w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900"></span>
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#008751] dark:text-[#00a865] tracking-tight leading-none block">
              Zim<span className="text-slate-800 dark:text-slate-100">Accommodation</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest block -mt-0.5">
              Zimbabwe's Rental Hub
            </span>
          </div>
        </div>

        {/* Quick Search Input (Desktop) */}
        <form onSubmit={handleQuickSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city or suburb (e.g. Avondale, Harare)..."
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#008751] transition-all shadow-xs"
            />
            <button 
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#008751] hover:bg-[#007043] text-white p-1.5 rounded-full transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Action Controls & Role Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Saved items shortcut */}
          <button
            onClick={() => onNavigate('tenant-dashboard')}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-[#008751] dark:hover:text-[#00a865] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title="Saved Houses"
          >
            <Heart className="w-5 h-5" />
            {savedListingIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#F4B400] text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedListingIds.length}
              </span>
            )}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#008751] dark:hover:text-[#00a865] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-[#F4B400]" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Role Quick Switcher Demo Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>Role: <strong className="capitalize text-[#008751] dark:text-[#00a865]">{userRole}</strong></span>
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 hidden group-hover:block z-50">
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">Switch Demo Role</div>
              <button 
                onClick={() => switchDemoRole('guest')} 
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 ${userRole === 'guest' ? 'font-bold text-[#008751]' : ''}`}
              >
                👤 Guest Tenant
              </button>
              <button 
                onClick={() => switchDemoRole('tenant')} 
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 ${userRole === 'tenant' ? 'font-bold text-[#008751]' : ''}`}
              >
                🏡 Registered Tenant
              </button>
              <button 
                onClick={() => switchDemoRole('landlord')} 
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 ${userRole === 'landlord' ? 'font-bold text-[#008751]' : ''}`}
              >
                🔑 House Owner (Landlord)
              </button>
              <button 
                onClick={() => switchDemoRole('admin')} 
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 ${userRole === 'admin' ? 'font-bold text-[#008751]' : ''}`}
              >
                🛡️ System Admin
              </button>
            </div>
          </div>

          {/* Post House Listing CTA */}
          <button
            onClick={() => {
              if (userRole !== 'landlord') {
                setActiveModal('auth');
              } else {
                onNavigate('landlord-dashboard');
                setActiveModal('addListing');
              }
            }}
            className="flex items-center gap-1.5 bg-[#008751] hover:bg-[#007043] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm hover:shadow-md"
          >
            <PlusCircle className="w-4 h-4 text-[#F4B400]" />
            <span>List House</span>
          </button>

          {/* User Account Button */}
          {currentUser ? (
            <button
              onClick={() => {
                if (userRole === 'landlord') onNavigate('landlord-dashboard');
                else if (userRole === 'admin') onNavigate('admin-dashboard');
                else onNavigate('tenant-dashboard');
              }}
              className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 hover:border-[#008751] pl-2 pr-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#008751] text-white flex items-center justify-center font-bold text-[11px]">
                {currentUser.name.charAt(0)}
              </div>
              <span className="truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveModal('auth')}
              className="bg-[#F4B400] hover:bg-[#e2a600] text-slate-900 px-4 py-2 rounded-full text-xs font-extrabold transition-colors shadow-xs"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-600 dark:text-slate-300 rounded-lg"
          >
            {darkMode ? <Sun className="w-5 h-5 text-[#F4B400]" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <form onSubmit={handleQuickSearch} className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city or suburb..."
                className="w-full bg-slate-100 dark:bg-slate-800 py-2.5 pl-4 pr-10 text-sm rounded-xl border border-slate-200 dark:border-slate-700"
              />
              <button type="submit" className="absolute right-2 top-2 bg-[#008751] text-white p-1 rounded-lg">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:text-[#008751]"
            >
              🏠 Home
            </button>
            <button 
              onClick={() => { onNavigate('search'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:text-[#008751]"
            >
              🔍 Search Houses
            </button>
            <button 
              onClick={() => { onNavigate('tenant-dashboard'); setMobileMenuOpen(false); }}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:text-[#008751]"
            >
              ❤️ Saved ({savedListingIds.length})
            </button>
            <button 
              onClick={() => { 
                if (userRole === 'landlord') onNavigate('landlord-dashboard');
                else if (userRole === 'admin') onNavigate('admin-dashboard');
                else onNavigate('tenant-dashboard');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-left hover:text-[#008751]"
            >
              📊 My Dashboard
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Role: <strong className="text-[#008751] capitalize">{userRole}</strong></span>
            <div className="flex gap-1">
              <button onClick={() => switchDemoRole('tenant')} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Tenant</button>
              <button onClick={() => switchDemoRole('landlord')} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Landlord</button>
              <button onClick={() => switchDemoRole('admin')} className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Admin</button>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                if (userRole !== 'landlord') setActiveModal('auth');
                else { onNavigate('landlord-dashboard'); setActiveModal('addListing'); }
                setMobileMenuOpen(false);
              }}
              className="flex-1 bg-[#008751] text-white py-2.5 rounded-xl text-xs font-bold text-center"
            >
              + List Property
            </button>
            {currentUser ? (
              <button 
                onClick={() => setCurrentUser(null)} 
                className="px-4 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => { setActiveModal('auth'); setMobileMenuOpen(false); }} 
                className="px-6 bg-[#F4B400] text-slate-900 rounded-xl text-xs font-extrabold"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
