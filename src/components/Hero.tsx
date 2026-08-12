import React from 'react';
import { useApp } from '../context/AppContext';
import { ZIM_CITIES } from '../data/mockData';
import { Search, MapPin, Home, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';
import { HouseType } from '../types';

export const Hero: React.FC<{ onSearch: () => void }> = ({ onSearch }) => {
  const { filters, setFilters, setActiveModal, userRole } = useApp();

  const selectedCityObj = ZIM_CITIES.find(c => c.name === filters.city);
  const availableSuburbs = selectedCityObj ? selectedCityObj.suburbs : [];

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setFilters(prev => ({
      ...prev,
      city: newCity,
      suburb: 'all' // reset suburb when city changes
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="relative bg-gradient-to-br from-[#008751] via-[#007043] to-slate-900 text-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl overflow-hidden mb-8">
      {/* Background Decorative Patterns */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-[#F4B400]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Top Promo Badge */}
        <div className="inline-flex items-center gap-2 bg-[#F4B400] text-slate-900 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>House Owner Promotion</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 leading-tight">
          Find your dream house in <span className="text-[#F4B400]">Zimbabwe</span>
        </h1>
        <p className="text-slate-100 text-sm sm:text-base md:text-lg max-w-2xl opacity-90 mb-6 font-medium">
          Direct connection between landlords and tenants. Free for tenants forever. Landlords start with a <strong>30-day free trial</strong>, then only <strong>US$2 per year</strong>.
        </p>

        {/* Interactive Search Bar Box */}
        <form 
          onSubmit={handleSearchSubmit}
          className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl p-4 md:p-5 shadow-2xl border border-white/20 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
        >
          {/* City Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#008751]" /> City
            </label>
            <select
              value={filters.city}
              onChange={handleCityChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-[#008751] focus:outline-hidden"
            >
              <option value="all">All Cities in Zimbabwe</option>
              {ZIM_CITIES.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Suburb Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#008751]" /> Suburb
            </label>
            {filters.city !== 'all' && availableSuburbs.length > 0 ? (
              <select
                value={filters.suburb}
                onChange={(e) => setFilters(prev => ({ ...prev, suburb: e.target.value }))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-[#008751] focus:outline-hidden"
              >
                <option value="all">All Suburbs</option>
                {availableSuburbs.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={filters.suburb === 'all' ? '' : filters.suburb}
                onChange={(e) => setFilters(prev => ({ ...prev, suburb: e.target.value || 'all' }))}
                placeholder="e.g. Avondale, Ascot..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-[#008751] focus:outline-hidden"
              />
            )}
          </div>

          {/* Property Type Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#008751]" /> Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as HouseType | 'all' }))}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-[#008751] focus:outline-hidden"
            >
              <option value="all">All Types</option>
              <option value="Room">Room / Extension</option>
              <option value="Cottage">Cottage</option>
              <option value="Apartment">Apartment / Flat</option>
              <option value="House">Full House</option>
              <option value="Bachelor Flat">Bachelor Flat</option>
            </select>
          </div>

          {/* Max Price Selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-[#008751]" /> Max Rent
            </label>
            <select
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-[#008751] focus:outline-hidden"
            >
              <option value={3000}>Any Price</option>
              <option value={150}>Up to $150 / mo</option>
              <option value={250}>Up to $250 / mo</option>
              <option value={500}>Up to $500 / mo</option>
              <option value={800}>Up to $800 / mo</option>
              <option value={1200}>Up to $1,200 / mo</option>
            </select>
          </div>

          {/* Submit Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#008751] hover:bg-[#007043] text-white py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg h-[38px]"
            >
              <Search className="w-4 h-4 text-[#F4B400]" />
              <span>Find Houses</span>
            </button>
          </div>
        </form>

        {/* Trust Badges & Supported Payment Methods */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-medium opacity-90">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400]" /> Free for Tenants
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400]" /> Verified Landlord WhatsApp Contacts
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400]" /> Borehole & Solar Filters
            </span>
          </div>

          {/* Supported Zim Payments */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-mono opacity-80">Supported Gateways:</span>
            <span className="bg-white/15 px-2.5 py-1 rounded-md text-[11px] font-bold text-white">EcoCash</span>
            <span className="bg-white/15 px-2.5 py-1 rounded-md text-[11px] font-bold text-white">InnBucks</span>
            <span className="bg-white/15 px-2.5 py-1 rounded-md text-[11px] font-bold text-white">Omari</span>
          </div>
        </div>
      </div>
    </div>
  );
};
