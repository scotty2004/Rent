import React from 'react';
import { useApp } from '../context/AppContext';
import { ZIM_CITIES } from '../data/mockData';
import { Filter, RotateCcw, MapPin, DollarSign, Home, Droplets, Zap, Check } from 'lucide-react';
import { HouseType } from '../types';

export const SearchFiltersBar: React.FC = () => {
  const { filters, setFilters, resetFilters, listings } = useApp();

  const selectedCityObj = ZIM_CITIES.find(c => c.name === filters.city);
  const availableSuburbs = selectedCityObj ? selectedCityObj.suburbs : [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-800 shadow-xs mb-6">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#008751]" />
          <h2 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Filter Houses in Zimbabwe</h2>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#008751] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* City Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">City</label>
          <select
            value={filters.city}
            onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value, suburb: 'all' }))}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#008751]"
          >
            <option value="all">All Cities in Zimbabwe</option>
            {ZIM_CITIES.map(c => (
              <option key={c.name} value={c.name}>{c.name} ({c.popularCount}+ houses)</option>
            ))}
          </select>
        </div>

        {/* Suburb Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">Suburb / Location</label>
          {filters.city !== 'all' && availableSuburbs.length > 0 ? (
            <select
              value={filters.suburb}
              onChange={(e) => setFilters(prev => ({ ...prev, suburb: e.target.value }))}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#008751]"
            >
              <option value="all">All Suburbs in {filters.city}</option>
              {availableSuburbs.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={filters.suburb === 'all' ? '' : filters.suburb}
              onChange={(e) => setFilters(prev => ({ ...prev, suburb: e.target.value || 'all' }))}
              placeholder="e.g. Avondale, Ascot..."
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#008751]"
            />
          )}
        </div>

        {/* House Type Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">House Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value as HouseType | 'all' }))}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-[#008751]"
          >
            <option value="all">All Types (Rooms, Cottages, Houses...)</option>
            <option value="Room">Room / Extension</option>
            <option value="Cottage">Cottage</option>
            <option value="Apartment">Apartment / Flat</option>
            <option value="House">Full House</option>
            <option value="Bachelor Flat">Bachelor Flat</option>
          </select>
        </div>

        {/* Max Rent Price */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
            Max Rent Price: <span className="text-[#008751] font-black">${filters.maxPrice}/mo</span>
          </label>
          <input
            type="range"
            min={100}
            max={2500}
            step={50}
            value={filters.maxPrice}
            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
            className="w-full accent-[#008751] cursor-pointer mt-2"
          />
        </div>
      </div>

      {/* Bedrooms & Utilities Chips */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {/* Bedrooms Selector */}
          <span className="text-xs font-extrabold text-slate-500 mr-1">Bedrooms:</span>
          {['any', 1, 2, 3, 4].map(num => (
            <button
              key={String(num)}
              onClick={() => setFilters(prev => ({ ...prev, bedrooms: num as any }))}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-colors ${
                filters.bedrooms === num
                  ? 'bg-[#008751] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {num === 'any' ? 'Any' : `${num}+ Beds`}
            </button>
          ))}
        </div>

        {/* Checkboxes for Zim specific essential features */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.availableNowOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, availableNowOnly: e.target.checked }))}
              className="rounded-md text-[#008751] focus:ring-[#008751] w-4 h-4 accent-[#008751]"
            />
            <span>Available Now Only</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.waterType === 'Borehole'}
              onChange={(e) => setFilters(prev => ({ ...prev, waterType: e.target.checked ? 'Borehole' : 'all' }))}
              className="rounded-md text-[#008751] focus:ring-[#008751] w-4 h-4 accent-[#008751]"
            />
            <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-blue-500" /> Borehole Water</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.electricityType === 'Solar'}
              onChange={(e) => setFilters(prev => ({ ...prev, electricityType: e.target.checked ? 'Solar' : 'all' }))}
              className="rounded-md text-[#008751] focus:ring-[#008751] w-4 h-4 accent-[#008751]"
            />
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> Solar Power</span>
          </label>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-100"
          >
            <option value="newest">Newest First</option>
            <option value="cheapest">Rent: Lowest First</option>
            <option value="expensive">Rent: Highest First</option>
            <option value="popular">Most Popular Views</option>
          </select>
        </div>
      </div>
    </div>
  );
};
