import React, { useState } from 'react';
import { PropertyListing } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Droplets, 
  Zap, 
  Wifi, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Eye, 
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const ListingCard: React.FC<{ listing: PropertyListing }> = ({ listing }) => {
  const { savedListingIds, toggleSaveListing, setSelectedListingForDetail, addRecentlyViewed } = useApp();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const isSaved = savedListingIds.includes(listing.id);

  const handleCardClick = () => {
    addRecentlyViewed(listing.id);
    setSelectedListingForDetail(listing);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx(prev => (prev === 0 ? listing.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx(prev => (prev === listing.images.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = listing.landlordWhatsApp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hi ${listing.landlordName}, I saw your listing "${listing.title}" ($${listing.rentPrice}/mo in ${listing.suburb}, ${listing.city}) on Zim Accommodation. Is it still available?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out this house listing in ${listing.suburb}, ${listing.city} on Zim Accommodation: $${listing.rentPrice}/mo`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Listing link copied to clipboard!');
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all cursor-pointer group flex flex-col h-full transform hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-52 bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <img
          src={listing.images[currentImageIdx] || listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {listing.isAvailable ? (
            <span className="bg-[#008751] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
              AVAILABLE NOW
            </span>
          ) : (
            <span className="bg-slate-800/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider backdrop-blur-xs">
              OCCUPIED
            </span>
          )}

          {listing.isFeatured && (
            <span className="bg-[#F4B400] text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-sm uppercase tracking-wider w-max">
              ★ FEATURED
            </span>
          )}
        </div>

        {/* Favorite Heart & Share buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => handleShareClick(e)}
            className="p-2 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-full backdrop-blur-md shadow-sm transition-colors"
            title="Share listing"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveListing(listing.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
              isSaved
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200'
            }`}
            title={isSaved ? "Saved to favorites" : "Save house"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Image Navigation Arrows (if multiple) */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
              {currentImageIdx + 1}/{listing.images.length} Photos
            </div>
          </>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Header Row: Title & Rent */}
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base line-clamp-1 group-hover:text-[#008751] dark:group-hover:text-[#00a865] transition-colors">
              {listing.title}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-lg font-black text-[#008751] dark:text-[#00a865]">
                ${listing.rentPrice}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold block -mt-1">/month</span>
            </div>
          </div>

          {/* Location & House Type */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#008751] shrink-0" />
            <span className="truncate">{listing.suburb}, {listing.city}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-[10px] font-bold text-slate-600 dark:text-slate-300">
              {listing.houseType}
            </span>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-semibold mb-3">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span>{listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[11px] text-slate-400">{listing.viewsCount} views</span>
            </div>
          </div>

          {/* Key Utilities Badges (Borehole, Solar, WiFi) */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {listing.waterAvailability.includes('Borehole') && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md">
                <Droplets className="w-3 h-3 text-blue-500" /> Borehole
              </span>
            )}
            {listing.electricityAvailability.includes('Solar') && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-md">
                <Zap className="w-3 h-3 text-amber-500" /> Solar Power
              </span>
            )}
            {listing.wifiAvailable && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                <Wifi className="w-3 h-3 text-emerald-500" /> WiFi Ready
              </span>
            )}
            {listing.securityFeatures.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3 h-3 text-slate-500" /> {listing.securityFeatures[0]}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            By <strong className="text-slate-700 dark:text-slate-200">{listing.landlordName}</strong>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `tel:${listing.landlordPhone}`;
              }}
              className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-colors"
              title="Call Landlord"
            >
              <Phone className="w-4 h-4 text-[#008751]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
