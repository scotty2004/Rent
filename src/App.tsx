import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Hero } from './components/Hero';
import { SearchFiltersBar } from './components/SearchFiltersBar';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { PaymentModal } from './components/PaymentModal';
import { AuthModal } from './components/AuthModal';
import { LandlordDashboard } from './components/LandlordDashboard';
import { TenantDashboard } from './components/TenantDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ZIM_CITIES } from './data/mockData';
import { 
  Building2, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  PhoneCall, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Smartphone, 
  ArrowRight,
  MapPin,
  Search,
  Filter
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { listings, filters, setFilters, setActiveModal, userRole } = useApp();
  const [currentPage, setCurrentPage] = useState<'home' | 'search' | 'landlord-dashboard' | 'tenant-dashboard' | 'admin-dashboard'>('home');

  // Filter listings based on active search criteria
  const filteredListings = listings.filter(l => {
    if (!l.isApproved) return false;
    if (filters.city !== 'all' && l.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    if (filters.suburb !== 'all' && !l.suburb.toLowerCase().includes(filters.suburb.toLowerCase())) return false;
    if (filters.propertyType !== 'all' && l.houseType !== filters.propertyType) return false;
    if (l.rentPrice > filters.maxPrice) return false;
    if (filters.bedrooms !== 'any' && l.bedrooms < (filters.bedrooms as number)) return false;
    if (filters.availableNowOnly && !l.isAvailable) return false;
    if (filters.waterType === 'Borehole' && !l.waterAvailability.includes('Borehole')) return false;
    if (filters.electricityType === 'Solar' && !l.electricityAvailability.includes('Solar')) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'cheapest') return a.rentPrice - b.rentPrice;
    if (filters.sortBy === 'expensive') return b.rentPrice - a.rentPrice;
    if (filters.sortBy === 'popular') return b.viewsCount - a.viewsCount;
    return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime(); // newest
  });

  const featuredListings = listings.filter(l => l.isFeatured);
  const recentListings = listings.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Main Top Header */}
      <Header onNavigate={(page) => setCurrentPage(page as any)} currentPage={currentPage} />

      {/* Page Views Router */}
      <main className="flex-1 pb-12">
        {currentPage === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
            
            {/* Hero Section */}
            <Hero onSearch={() => setCurrentPage('search')} />

            {/* Featured Houses Carousel / Grid */}
            <section className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[#008751] text-xs font-black uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" /> Hand-Picked Properties
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
                    Featured Houses in Zimbabwe
                  </h2>
                </div>
                <button
                  onClick={() => setCurrentPage('search')}
                  className="hidden sm:flex items-center gap-1.5 text-xs font-black text-[#008751] hover:underline"
                >
                  <span>View All {listings.length} Houses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </section>

            {/* Popular Zimbabwean Cities Grid */}
            <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-black text-[#008751] uppercase tracking-wider block mb-1">Browse Locations</span>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Houses by Zimbabwean City</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {ZIM_CITIES.map(c => (
                  <div
                    key={c.name}
                    onClick={() => {
                      setFilters(prev => ({ ...prev, city: c.name, suburb: 'all' }));
                      setCurrentPage('search');
                    }}
                    className="relative h-36 rounded-2xl overflow-hidden cursor-pointer group shadow-xs hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800"
                  >
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                      <h3 className="font-extrabold text-white text-base leading-none">{c.name}</h3>
                      <span className="text-[11px] text-[#F4B400] font-bold mt-1">{c.popularCount}+ Active Rentals</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recently Added Listings */}
            <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-black text-[#008751] uppercase tracking-wider block mb-1">Fresh Market Updates</span>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Recently Posted Accommodations</h2>
                </div>
                <button
                  onClick={() => setCurrentPage('search')}
                  className="text-xs font-black text-[#008751] hover:underline flex items-center gap-1"
                >
                  <span>Explore Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </section>

            {/* Why Choose Zim Accommodation Section */}
            <section className="bg-gradient-to-br from-slate-900 to-[#008751] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="bg-[#F4B400] text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Built for Zimbabwe
                </span>
                <h2 className="text-3xl font-black">Why Choose Zim Accommodation?</h2>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  We solve the hassle of house hunting in Zimbabwe by providing direct landlord contacts and verified property utility details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
                  <div className="bg-[#F4B400] w-10 h-10 rounded-xl flex items-center justify-center text-slate-900 font-black">
                    $0
                  </div>
                  <h3 className="font-extrabold text-base">Free for Tenants</h3>
                  <p className="text-xs text-slate-200">No agent fees or viewing fees charged to tenants. Search and view unlimited houses.</p>
                </div>

                <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
                  <div className="bg-[#008751] w-10 h-10 rounded-xl flex items-center justify-center text-white font-black">
                    1Mo
                  </div>
                  <h3 className="font-extrabold text-base">Landlord Free Trial</h3>
                  <p className="text-xs text-slate-200">Every new house owner gets 30 days free advertising. Then just $2/year via EcoCash or InnBucks.</p>
                </div>

                <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
                  <Droplets className="w-10 h-10 text-blue-400" />
                  <h3 className="font-extrabold text-base">Borehole & Solar Filters</h3>
                  <p className="text-xs text-slate-200">Filter houses with guaranteed 24/7 borehole water and solar back-up electricity systems.</p>
                </div>

                <div className="bg-white/10 dark:bg-slate-800/60 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                  <h3 className="font-extrabold text-base">Verified Landlords</h3>
                  <p className="text-xs text-slate-200">Direct WhatsApp connection to verified house owners with phone authentication.</p>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="space-y-6 pt-4">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-black text-[#008751] uppercase tracking-wider block">Community Feedback</span>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">What Zimbabwean Landlords & Tenants Say</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "I listed my cottage in Avondale on Zim Accommodation. Within 3 days I got 12 WhatsApp enquiries from genuine tenants. The EcoCash $2 payment was instant!"
                  </p>
                  <div className="pt-2 border-t">
                    <strong className="text-xs font-black block text-slate-800 dark:text-slate-100">Tinashe Moyo</strong>
                    <span className="text-[10px] text-slate-400">Landlord in Harare</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "Finding a house with a borehole in Ascot Bulawayo used to take weeks of walking around. With Zim Accommodation filters, I found a clean bachelor flat in 10 minutes."
                  </p>
                  <div className="pt-2 border-t">
                    <strong className="text-xs font-black block text-slate-800 dark:text-slate-100">Chiedza N.</strong>
                    <span className="text-[10px] text-slate-400">Tenant in Bulawayo</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex text-amber-500 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "The direct WhatsApp chat button is amazing. No middleman agent demanding 50% commission fees. Direct deal with the landlord!"
                  </p>
                  <div className="pt-2 border-t">
                    <strong className="text-xs font-black block text-slate-800 dark:text-slate-100">Kudzai Mutasa</strong>
                    <span className="text-[10px] text-slate-400">Tenant in Mutare</span>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* Search View */}
        {currentPage === 'search' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <SearchFiltersBar />

            {/* Results Counter Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-black text-slate-800 dark:text-slate-100">
                  Available Houses in {filters.city === 'all' ? 'Zimbabwe' : filters.city}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Showing {filteredListings.length} accommodation listings matching your filters
                </p>
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-black text-slate-800 dark:text-slate-100">No matching houses found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try broadening your price range or clearing suburb filters to see more properties across Zimbabwe.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Landlord Dashboard View */}
        {currentPage === 'landlord-dashboard' && <LandlordDashboard />}

        {/* Tenant Dashboard View */}
        {currentPage === 'tenant-dashboard' && <TenantDashboard />}

        {/* Admin Dashboard View */}
        {currentPage === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* Global Modals */}
      <ListingDetailModal />
      <PaymentModal />
      <AuthModal />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav onNavigate={(page) => setCurrentPage(page as any)} currentPage={currentPage} />

      {/* Footer */}
      <Footer onNavigate={(page) => setCurrentPage(page as any)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
