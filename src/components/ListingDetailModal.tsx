import React, { useState } from 'react';
import { PropertyListing } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Droplets, 
  Zap, 
  Wifi, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Heart, 
  Share2, 
  AlertTriangle, 
  Star, 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  QrCode,
  Building,
  Check
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const { 
    selectedListingForDetail, 
    setSelectedListingForDetail, 
    savedListingIds, 
    toggleSaveListing,
    submitReport,
    setActiveModal
  } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('Fake Listing / Scam');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Sample reviews
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      tenantName: 'Blessing K.',
      rating: 5,
      comment: 'Landlord Tinashe was very responsive! The borehole water supply is 100% genuine and the solar power works non-stop.',
      date: '2026-08-01'
    },
    {
      id: 'rev-2',
      tenantName: 'Nomsa M.',
      rating: 5,
      comment: 'Very clean property in Avondale. Easy viewings organized via WhatsApp.',
      date: '2026-07-20'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  if (!selectedListingForDetail) return null;

  const listing = selectedListingForDetail;
  const isSaved = savedListingIds.includes(listing.id);

  const handleWhatsApp = () => {
    const cleanPhone = listing.landlordWhatsApp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hi ${listing.landlordName}, I saw your listing "${listing.title}" ($${listing.rentPrice}/mo in ${listing.suburb}, ${listing.city}) on Zim Accommodation. Is it still available for viewing?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setReviews(prev => [
        {
          id: 'rev-' + Date.now(),
          tenantName: 'Verified Tenant',
          rating: newRating,
          comment: newComment.trim(),
          date: new Date().toISOString().split('T')[0]
        },
        ...prev
      ]);
      setNewComment('');
    }
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport({
      listingId: listing.id,
      listingTitle: listing.title,
      reporterName: 'Concerned User',
      reason: reportReason,
      details: reportDetails
    });
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setShowReportModal(false);
      setReportDetails('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-[#008751] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {listing.houseType}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              ID: #{listing.id.replace('house-', '')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveListing(listing.id)}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
              title={isSaved ? "Saved" : "Save house"}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={() => setShowQrCode(!showQrCode)}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-full transition-colors"
              title="QR Code Share"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedListingForDetail(null)}
              className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* QR Code Overlay Dropdown */}
          {showQrCode && (
            <div className="bg-[#008751]/10 dark:bg-[#008751]/20 border border-[#008751] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-[#008751] dark:text-[#00a865] text-sm">Share Listing via QR Code</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">Scan this code on your mobile camera to quickly open this listing.</p>
              </div>
              <div className="bg-white p-3 rounded-xl shadow-md border flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex items-center justify-center text-white text-[10px] text-center font-mono font-bold">
                  [ZIM-ACCOM-QR]
                  <br />
                  {listing.id}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-bold">Zim Accommodation</span>
              </div>
            </div>
          )}

          {/* Main Gallery Hero */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 bg-slate-900 rounded-2xl overflow-hidden group">
              <img
                src={listing.images[activeImageIdx]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />

              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIdx(prev => (prev === 0 ? listing.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIdx(prev => (prev === listing.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                Photo {activeImageIdx + 1} of {listing.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {listing.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#008751] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Landlord Contact Header Block */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Main Info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-black text-[#008751] dark:text-[#00a865]">${listing.rentPrice}</span>
                  <span className="text-xs text-slate-500 font-bold">/ month</span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                    listing.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {listing.isAvailable ? 'Available Now' : 'Occupied'}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight mb-2">
                  {listing.title}
                </h1>
                <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-[#008751]" />
                  {listing.street ? `${listing.street}, ` : ''}{listing.suburb}, {listing.city}, Zimbabwe
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-[#008751]" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Bedrooms</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">{listing.bedrooms} Beds</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-[#008751]" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Bathrooms</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">{listing.bathrooms} Baths</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#008751]" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Parking</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">{listing.parkingSpaces} Bay</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#008751]" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Furnished</span>
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100">{listing.furnishedStatus}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Property Description</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Zimbabwean Utility & Amenities Badges */}
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Utilities & Security</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <div>
                      <span className="font-bold block">Water Supply</span>
                      <span className="text-slate-500 text-[11px]">{listing.waterAvailability}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="font-bold block">Electricity</span>
                      <span className="text-slate-500 text-[11px]">{listing.electricityAvailability}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">
                    <Wifi className="w-4 h-4 text-emerald-500" />
                    <div>
                      <span className="font-bold block">WiFi Internet</span>
                      <span className="text-slate-500 text-[11px]">{listing.wifiAvailable ? 'Connected / Fibre Ready' : 'Not Included'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-[#008751]" />
                    <div>
                      <span className="font-bold block">Security Features</span>
                      <span className="text-slate-500 text-[11px]">{listing.securityFeatures.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Landlord Contact Box */}
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#008751] text-white font-extrabold text-lg flex items-center justify-center shadow-sm">
                    {listing.landlordName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">{listing.landlordName}</h3>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{listing.landlordRating}</span>
                      <span className="text-slate-400 font-normal">({listing.landlordReviewCount} reviews)</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Phone Verified Landlord
                    </span>
                  </div>
                </div>

                {/* Primary WhatsApp Direct Contact Button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </button>

                {/* Phone Reveal Button */}
                {showPhone ? (
                  <a
                    href={`tel:${listing.landlordPhone}`}
                    className="w-full bg-[#008751] text-white py-3 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call: {listing.landlordPhone}</span>
                  </a>
                ) : (
                  <button
                    onClick={() => setShowPhone(true)}
                    className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#008751]" />
                    <span>Show Phone Number</span>
                  </button>
                )}

                <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-medium">
                  🔒 Zim Accommodation never charges tenant viewing fees. Report any fraud immediately.
                </p>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-center">
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="text-[11px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" /> Report Fake Listing or Scam
                  </button>
                </div>
              </div>

              {/* Map View Box (Interactive Location Representation) */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {/* Simulated map background grid */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#008751_1px,transparent_1px)] [background-size:12px_12px]"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <MapPin className="w-8 h-8 text-[#008751] animate-bounce" />
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 mt-1">{listing.suburb}, {listing.city}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Zimbabwe Map Pin</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">Approximate neighbourhood location provided for privacy.</p>
              </div>
            </div>
          </div>

          {/* Report Modal Box overlay */}
          {showReportModal && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-red-700 dark:text-red-400 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Report Fraud or Incorrect Listing
                </h4>
                <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reportSubmitted ? (
                <div className="text-xs font-bold text-emerald-600 flex items-center gap-2 py-2">
                  <Check className="w-4 h-4" /> Thank you. Your report has been submitted to Zim Accommodation admins.
                </div>
              ) : (
                <form onSubmit={handleSendReport} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Reason for report</label>
                    <select
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                    >
                      <option value="Fake Listing / Scam">Fake Listing / Scam</option>
                      <option value="Incorrect Price Requested">Incorrect Price Requested on WhatsApp</option>
                      <option value="House Already Occupied">House Already Occupied</option>
                      <option value="Unreachable Landlord">Unreachable Landlord</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Details</label>
                    <textarea
                      rows={2}
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      placeholder="Explain briefly what happened..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-xs"
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Submit Report
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Reviews Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#F4B400] fill-[#F4B400]" />
              <span>Tenant Reviews for {listing.landlordName}</span>
            </h3>

            {/* Existing Reviews */}
            <div className="space-y-3">
              {reviews.map(rev => (
                <div key={rev.id} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-xs text-slate-800 dark:text-slate-100">{rev.tenantName}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-500' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Leave Review Form */}
            <form onSubmit={handleAddReview} className="bg-slate-100 dark:bg-slate-800/40 p-3 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Write a Tenant Review</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Rating:</span>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-bold"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience contacting or viewing this property..."
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
              />
              <button
                type="submit"
                className="bg-[#008751] hover:bg-[#007043] text-white px-4 py-1.5 rounded-xl text-xs font-bold"
              >
                Post Review
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
