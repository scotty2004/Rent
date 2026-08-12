import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyListing, HouseType } from '../types';
import { ZIM_CITIES } from '../data/mockData';
import { 
  PlusCircle, 
  Building2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Edit, 
  Trash2, 
  X, 
  Upload, 
  Check, 
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Droplets,
  Zap,
  Printer
} from 'lucide-react';

export const LandlordDashboard: React.FC = () => {
  const { 
    currentUser, 
    listings, 
    addListing, 
    updateListing, 
    deleteListing, 
    toggleOccupiedStatus,
    setActiveModal
  } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingListing, setEditingListing] = useState<PropertyListing | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rentPrice, setRentPrice] = useState(300);
  const [city, setCity] = useState('Harare');
  const [suburb, setSuburb] = useState('Avondale');
  const [street, setStreet] = useState('');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [hasKitchen, setHasKitchen] = useState(true);
  const [hasLounge, setHasLounge] = useState(true);
  const [parkingSpaces, setParkingSpaces] = useState(1);
  const [furnishedStatus, setFurnishedStatus] = useState<'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished'>('Unfurnished');
  const [waterAvailability, setWaterAvailability] = useState<'Borehole' | 'Council Water' | 'Water Tank' | 'Borehole & Council'>('Borehole');
  const [electricityAvailability, setElectricityAvailability] = useState<'ZESA Prepaid' | 'Solar Power System' | 'ZESA & Solar' | 'Generator'>('Solar Power System');
  const [wifiAvailable, setWifiAvailable] = useState(true);
  const [securityFeatures, setSecurityFeatures] = useState<string[]>(['Walled & Gated']);
  const [houseType, setHouseType] = useState<HouseType>('Cottage');
  const [imageUrls, setImageUrls] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageInput, setNewImageInput] = useState('');

  // Landlord's listings
  const landlordListings = listings.filter(l => l.landlordId === currentUser?.id || l.landlordName === currentUser?.name);
  const totalListings = landlordListings.length;
  const activeListings = landlordListings.filter(l => l.isAvailable).length;
  const occupiedListings = landlordListings.filter(l => !l.isAvailable).length;
  const totalViews = landlordListings.reduce((acc, curr) => acc + curr.viewsCount, 0);

  const selectedCityObj = ZIM_CITIES.find(c => c.name === city);
  const suburbsList = selectedCityObj ? selectedCityObj.suburbs : [];

  const handleAddImage = () => {
    if (newImageInput.trim() && imageUrls.length < 20) {
      setImageUrls(prev => [...prev, newImageInput.trim()]);
      setNewImageInput('');
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== idx));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && imageUrls.length < 20) {
            setImageUrls(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const listingData = {
      landlordId: currentUser.id,
      landlordName: currentUser.name,
      landlordPhone: currentUser.phone,
      landlordWhatsApp: currentUser.phone.replace(/[^0-9]/g, ''),
      landlordRating: 5.0,
      landlordReviewCount: 1,
      title,
      description,
      rentPrice: Number(rentPrice),
      city,
      suburb,
      street,
      bedrooms,
      bathrooms,
      hasKitchen,
      hasLounge,
      parkingSpaces,
      furnishedStatus,
      waterAvailability,
      electricityAvailability,
      wifiAvailable,
      securityFeatures,
      houseType,
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      isAvailable: true,
      isFeatured: false
    };

    if (editingListing) {
      updateListing(editingListing.id, listingData);
      setEditingListing(null);
    } else {
      addListing(listingData);
    }

    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setRentPrice(300);
    setCity('Harare');
    setSuburb('Avondale');
    setStreet('');
    setBedrooms(2);
    setBathrooms(1);
    setHasKitchen(true);
    setHasLounge(true);
    setParkingSpaces(1);
    setFurnishedStatus('Unfurnished');
    setWaterAvailability('Borehole');
    setElectricityAvailability('Solar Power System');
    setWifiAvailable(true);
    setSecurityFeatures(['Walled & Gated']);
    setHouseType('Cottage');
    setImageUrls([
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]);
  };

  const openEdit = (l: PropertyListing) => {
    setEditingListing(l);
    setTitle(l.title);
    setDescription(l.description);
    setRentPrice(l.rentPrice);
    setCity(l.city);
    setSuburb(l.suburb);
    setStreet(l.street || '');
    setBedrooms(l.bedrooms);
    setBathrooms(l.bathrooms);
    setHasKitchen(l.hasKitchen);
    setHasLounge(l.hasLounge);
    setParkingSpaces(l.parkingSpaces);
    setFurnishedStatus(l.furnishedStatus);
    setWaterAvailability(l.waterAvailability);
    setElectricityAvailability(l.electricityAvailability);
    setWifiAvailable(l.wifiAvailable);
    setSecurityFeatures(l.securityFeatures);
    setHouseType(l.houseType);
    setImageUrls(l.images);
    setShowAddForm(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Landlord Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#008751] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#F4B400] text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" /> House Owner Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Welcome back, {currentUser?.name}!</h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl">
            Manage your property listings across Zimbabwe, monitor view stats, and keep your annual subscription active.
          </p>
        </div>

        {/* Subscription Status & Renewal Trigger */}
        <div className="bg-white/10 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-right w-full md:w-auto">
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-300 block">Subscription Status</span>
          <div className="text-sm font-black text-[#F4B400] flex items-center justify-end gap-1.5 my-1">
            <CheckCircle2 className="w-4 h-4 text-[#F4B400]" />
            <span>
              {currentUser?.subscriptionStatus === 'active' ? 'ACTIVE — Annual Paid' : '30-Day FREE Trial Active'}
            </span>
          </div>
          <p className="text-[11px] text-slate-200 mb-3 font-medium">
            {currentUser?.subscriptionEndsAt ? `Valid until ${currentUser.subscriptionEndsAt}` : '24 Days Remaining in Trial'}
          </p>
          <button
            onClick={() => setActiveModal('payment')}
            className="w-full bg-[#F4B400] hover:bg-[#e2a600] text-slate-900 px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md"
          >
            Renew $2/Year Subscription
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase">Total Listings</span>
            <Building2 className="w-5 h-5 text-[#008751]" />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{totalListings}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Houses registered</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase">Active Listings</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{activeListings}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Available for tenants</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase font-sans">Occupied</span>
            <Clock className="w-5 h-5 text-slate-500" />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{occupiedListings}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Currently rented out</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase">Total Views</span>
            <Eye className="w-5 h-5 text-blue-500" />
          </div>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{totalViews}</span>
          <span className="text-[10px] text-slate-400 block mt-1">Tenant impressions</span>
        </div>
      </div>

      {/* Main Content Action Row */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">My Property Listings</h2>
          <p className="text-xs text-slate-500 font-medium">Upload photos, set prices, and toggle occupancy status</p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setEditingListing(null);
            setShowAddForm(true);
          }}
          className="bg-[#008751] hover:bg-[#007043] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-md"
        >
          <PlusCircle className="w-4 h-4 text-[#F4B400]" />
          <span>Post New House Listing</span>
        </button>
      </div>

      {/* Listing Form Drawer / Modal */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-[#008751] shadow-2xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
              {editingListing ? 'Edit House Listing' : 'Post New House Listing'}
            </h3>
            <button onClick={() => setShowAddForm(false)} className="p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveListing} className="space-y-6">
            
            {/* Title & Rent */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Property Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern 3-Bedroom Cottage with Borehole & Solar"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Monthly Rent ($ USD)</label>
                <input
                  type="number"
                  value={rentPrice}
                  onChange={(e) => setRentPrice(Number(e.target.value))}
                  placeholder="300"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-[#008751]"
                  required
                />
              </div>
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">City</label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    const cObj = ZIM_CITIES.find(c => c.name === e.target.value);
                    if (cObj && cObj.suburbs.length > 0) setSuburb(cObj.suburbs[0]);
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  {ZIM_CITIES.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Suburb</label>
                {suburbsList.length > 0 ? (
                  <select
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                  >
                    {suburbsList.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="e.g. Avondale"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Street Address (Optional)</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. 14 King George Rd"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">House Type</label>
                <select
                  value={houseType}
                  onChange={(e) => setHouseType(e.target.value as HouseType)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="Room">Room / Extension</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Apartment">Apartment / Flat</option>
                  <option value="House">Full House</option>
                  <option value="Bachelor Flat">Bachelor Flat</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bedrooms</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Bathrooms</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={bathrooms}
                  onChange={(e) => setBathrooms(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Furnished Status</label>
                <select
                  value={furnishedStatus}
                  onChange={(e) => setFurnishedStatus(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>
              </div>
            </div>

            {/* Zimbabwean Utilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Water Supply</label>
                <select
                  value={waterAvailability}
                  onChange={(e) => setWaterAvailability(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="Borehole">Borehole Water</option>
                  <option value="Council Water">Council Water</option>
                  <option value="Water Tank">Water Tank (Jojo Tank)</option>
                  <option value="Borehole & Council">Borehole & Council</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Electricity Supply</label>
                <select
                  value={electricityAvailability}
                  onChange={(e) => setElectricityAvailability(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                >
                  <option value="Solar Power System">Solar Power System</option>
                  <option value="ZESA Prepaid">ZESA Prepaid Meter</option>
                  <option value="ZESA & Solar">ZESA & Backup Solar</option>
                  <option value="Generator">Generator Backup</option>
                </select>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe features, neighbourhood, rules, deposit terms..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs"
                required
              ></textarea>
            </div>

            {/* Image Upload up to 20 images */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  Property Images (Up to 20 high quality photos)
                </label>
                <span className="text-[10px] text-slate-400 font-bold">{imageUrls.length}/20 uploaded</span>
              </div>

              {/* Drag/File Upload input */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-file-input"
                />
                <label htmlFor="image-file-input" className="cursor-pointer flex flex-col items-center gap-1">
                  <Upload className="w-6 h-6 text-[#008751]" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Click to upload photos from device</span>
                  <span className="text-[10px] text-slate-400">PNG, JPG, WEBP formats accepted</span>
                </label>
              </div>

              {/* Or paste URL */}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newImageInput}
                  onChange={(e) => setNewImageInput(e.target.value)}
                  placeholder="Or paste image URL (e.g. Unsplash or Cloudinary)..."
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Add Image
                </button>
              </div>

              {/* Uploaded Thumbnails Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative h-20 rounded-xl overflow-hidden group border border-slate-200 dark:border-slate-700">
                    <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                className="flex-1 bg-[#008751] hover:bg-[#007043] text-white py-3 rounded-2xl font-black text-xs shadow-md"
              >
                {editingListing ? 'Update Property Listing' : 'Publish Property Listing'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-2xl font-bold text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Listings Table / Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">All Registered Listings</h3>

        {landlordListings.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-3">
            <Building2 className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-bold">You haven't posted any house listings yet.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-[#008751] text-white px-4 py-2 rounded-xl text-xs font-bold"
            >
              Post Your First Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {landlordListings.map(item => (
              <div key={item.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                <div className="flex gap-3">
                  <img src={item.images[0]} alt={item.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#008751]">${item.rentPrice}/mo</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        item.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {item.isAvailable ? 'AVAILABLE' : 'OCCUPIED'}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate mt-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">{item.suburb}, {item.city}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{item.viewsCount} tenant views</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs font-bold">
                  <button
                    onClick={() => toggleOccupiedStatus(item.id)}
                    className="text-slate-600 dark:text-slate-300 hover:text-[#008751] text-[11px]"
                  >
                    Mark as {item.isAvailable ? 'Occupied' : 'Available'}
                  </button>

                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteListing(item.id)} className="p-1.5 hover:bg-red-100 text-red-600 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment History Table */}
      {currentUser?.paymentHistory && currentUser.paymentHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Payment & Subscription Invoices</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3 rounded-l-xl">Receipt #</th>
                  <th className="p-3">Gateway</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Ref</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                {currentUser.paymentHistory.map(pay => (
                  <tr key={pay.id}>
                    <td className="p-3 text-[#008751]">{pay.receiptNumber}</td>
                    <td className="p-3 uppercase">{pay.method}</td>
                    <td className="p-3">${pay.amount}.00 USD</td>
                    <td className="p-3 font-mono text-slate-500">{pay.reference}</td>
                    <td className="p-3 text-slate-500">{pay.date}</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full uppercase">
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
