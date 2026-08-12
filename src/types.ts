export type UserRole = 'tenant' | 'landlord' | 'admin';

export type PaymentMethod = 'ecocash' | 'innbucks' | 'omari';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isPhoneVerified: boolean;
  avatar?: string;
  createdAt: string;
  // Landlord specific fields
  subscriptionStatus?: 'trial' | 'active' | 'expired';
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  paymentHistory?: PaymentRecord[];
  isBanned?: boolean;
}

export interface PaymentRecord {
  id: string;
  landlordId: string;
  amount: number; // in USD
  method: PaymentMethod;
  phoneNumber: string;
  reference: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  periodYears: number;
  receiptNumber: string;
}

export type HouseType = 'Room' | 'Cottage' | 'Apartment' | 'House' | 'Bachelor Flat';

export interface PropertyListing {
  id: string;
  landlordId: string;
  landlordName: string;
  landlordPhone: string;
  landlordWhatsApp: string;
  landlordRating: number;
  landlordReviewCount: number;
  title: string;
  description: string;
  rentPrice: number; // USD / month
  city: string;
  suburb: string;
  street?: string;
  bedrooms: number;
  bathrooms: number;
  hasKitchen: boolean;
  hasLounge: boolean;
  parkingSpaces: number;
  furnishedStatus: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  waterAvailability: 'Borehole' | 'Council Water' | 'Water Tank' | 'Borehole & Council';
  electricityAvailability: 'ZESA Prepaid' | 'Solar Power System' | 'ZESA & Solar' | 'Generator';
  wifiAvailable: boolean;
  securityFeatures: string[]; // e.g., ["Walled & Gated", "Electric Fence", "CCTV", "Razor Wire", "Security Guard"]
  houseType: HouseType;
  images: string[];
  isAvailable: boolean;
  isFeatured?: boolean;
  isApproved?: boolean;
  viewsCount: number;
  datePosted: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyReview {
  id: string;
  listingId: string;
  tenantName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SearchFilters {
  city: string;
  suburb: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  bathrooms: number | 'any';
  propertyType: HouseType | 'all';
  availableNowOnly: boolean;
  furnishedOnly: boolean;
  waterType: string | 'all';
  electricityType: string | 'all';
  sortBy: 'newest' | 'cheapest' | 'expensive' | 'popular';
}

export interface CityData {
  name: string;
  suburbs: string[];
  popularCount: number;
  imageUrl?: string;
}

export interface LandlordReport {
  id: string;
  listingId: string;
  listingTitle: string;
  reporterName: string;
  reason: string;
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  date: string;
}
