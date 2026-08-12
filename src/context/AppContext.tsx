import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, PropertyListing, SearchFilters, PaymentRecord, LandlordReport, HouseType } from '../types';
import { INITIAL_LISTINGS, INITIAL_LANDLORDS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  userRole: 'guest' | 'tenant' | 'landlord' | 'admin';
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  listings: PropertyListing[];
  savedListingIds: string[];
  recentlyViewedIds: string[];
  toggleSaveListing: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  
  // Search & Filter state
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  resetFilters: () => void;
  
  // Landlord operations
  addListing: (listing: Omit<PropertyListing, 'id' | 'viewsCount' | 'datePosted' | 'isApproved'>) => void;
  updateListing: (id: string, data: Partial<PropertyListing>) => void;
  deleteListing: (id: string) => void;
  toggleOccupiedStatus: (id: string) => void;
  processLandlordPayment: (payment: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'date' | 'status'>) => void;
  
  // Admin operations
  allUsers: User[];
  toggleBanUser: (userId: string) => void;
  toggleApproveListing: (listingId: string) => void;
  toggleFeatureListing: (listingId: string) => void;
  reports: LandlordReport[];
  submitReport: (report: Omit<LandlordReport, 'id' | 'date' | 'status'>) => void;
  resolveReport: (reportId: string) => void;
  
  // Quick demo switcher
  switchDemoRole: (role: 'guest' | 'tenant' | 'landlord' | 'admin') => void;
  
  // Modals trigger
  activeModal: 'auth' | 'payment' | 'addListing' | 'report' | null;
  setActiveModal: (modal: 'auth' | 'payment' | 'addListing' | 'report' | null) => void;
  selectedListingForDetail: PropertyListing | null;
  setSelectedListingForDetail: (listing: PropertyListing | null) => void;
}

const defaultFilters: SearchFilters = {
  city: 'all',
  suburb: 'all',
  minPrice: 0,
  maxPrice: 3000,
  bedrooms: 'any',
  bathrooms: 'any',
  propertyType: 'all',
  availableNowOnly: false,
  furnishedOnly: false,
  waterType: 'all',
  electricityType: 'all',
  sortBy: 'newest'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Demo default user is guest or tenant
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('zim_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('zim_dark') === 'true';
  });

  const [listings, setListings] = useState<PropertyListing[]>(() => {
    const saved = localStorage.getItem('zim_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [savedListingIds, setSavedListingIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zim_saved');
    return saved ? JSON.parse(saved) : ['house-101', 'house-103'];
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zim_viewed');
    return saved ? JSON.parse(saved) : ['house-101', 'house-102'];
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('zim_users');
    return saved ? JSON.parse(saved) : [
      ...INITIAL_LANDLORDS,
      {
        id: 'ten-1',
        name: 'Kudzai Mutasa',
        email: 'kudzai.m@gmail.com',
        phone: '+263773111222',
        role: 'tenant',
        isPhoneVerified: true,
        createdAt: '2026-02-10'
      },
      {
        id: 'admin-1',
        name: 'Zim Accom Admin',
        email: 'admin@zimaccommodation.co.zw',
        phone: '+263771234567',
        role: 'admin',
        isPhoneVerified: true,
        createdAt: '2026-01-01'
      }
    ];
  });

  const [reports, setReports] = useState<LandlordReport[]>(() => {
    const saved = localStorage.getItem('zim_reports');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rep-1',
        listingId: 'house-104',
        listingTitle: 'Clean 2-Room Extension in Westgate',
        reporterName: 'Sipho Dube',
        reason: 'Incorrect price listed',
        details: 'Landlord asked for $250 on WhatsApp instead of $220 listed here.',
        status: 'pending',
        date: '2026-08-11'
      }
    ];
  });

  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [activeModal, setActiveModal] = useState<'auth' | 'payment' | 'addListing' | 'report' | null>(null);
  const [selectedListingForDetail, setSelectedListingForDetail] = useState<PropertyListing | null>(null);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) localStorage.setItem('zim_user', JSON.stringify(currentUser));
    else localStorage.removeItem('zim_user');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('zim_dark', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('zim_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('zim_saved', JSON.stringify(savedListingIds));
  }, [savedListingIds]);

  useEffect(() => {
    localStorage.setItem('zim_viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem('zim_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('zim_reports', JSON.stringify(reports));
  }, [reports]);

  const userRole = currentUser ? currentUser.role : 'guest';

  const resetFilters = () => setFilters(defaultFilters);

  const toggleSaveListing = (id: string) => {
    setSavedListingIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 10);
    });
    // Increment views count on listing
    setListings(prev =>
      prev.map(item => item.id === id ? { ...item, viewsCount: item.viewsCount + 1 } : item)
    );
  };

  const addListing = (data: Omit<PropertyListing, 'id' | 'viewsCount' | 'datePosted' | 'isApproved'>) => {
    const newListing: PropertyListing = {
      ...data,
      id: 'house-' + Date.now(),
      viewsCount: 1,
      datePosted: new Date().toISOString().split('T')[0],
      isApproved: true, // auto approve in demo
    };
    setListings(prev => [newListing, ...prev]);
  };

  const updateListing = (id: string, data: Partial<PropertyListing>) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, ...data } : item));
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  const toggleOccupiedStatus = (id: string) => {
    setListings(prev =>
      prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)
    );
  };

  const processLandlordPayment = (paymentData: Omit<PaymentRecord, 'id' | 'receiptNumber' | 'date' | 'status'>) => {
    if (!currentUser) return;

    const receiptNum = 'REC-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newRecord: PaymentRecord = {
      ...paymentData,
      id: 'pay-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      receiptNumber: receiptNum
    };

    const currentYearEnd = new Date();
    currentYearEnd.setFullYear(currentYearEnd.getFullYear() + paymentData.periodYears);

    const updatedUser: User = {
      ...currentUser,
      subscriptionStatus: 'active',
      subscriptionEndsAt: currentYearEnd.toISOString().split('T')[0],
      paymentHistory: [...(currentUser.paymentHistory || []), newRecord]
    };

    setCurrentUser(updatedUser);
    setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const toggleBanUser = (userId: string) => {
    setAllUsers(prev =>
      prev.map(u => u.id === userId ? { ...u, isBanned: !u.isBanned } : u)
    );
  };

  const toggleApproveListing = (listingId: string) => {
    setListings(prev =>
      prev.map(l => l.id === listingId ? { ...l, isApproved: !l.isApproved } : l)
    );
  };

  const toggleFeatureListing = (listingId: string) => {
    setListings(prev =>
      prev.map(l => l.id === listingId ? { ...l, isFeatured: !l.isFeatured } : l)
    );
  };

  const submitReport = (reportData: Omit<LandlordReport, 'id' | 'date' | 'status'>) => {
    const newReport: LandlordReport = {
      ...reportData,
      id: 'rep-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setReports(prev => [newReport, ...prev]);
  };

  const resolveReport = (reportId: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
  };

  const switchDemoRole = (role: 'guest' | 'tenant' | 'landlord' | 'admin') => {
    if (role === 'guest') {
      setCurrentUser(null);
    } else if (role === 'tenant') {
      setCurrentUser({
        id: 'ten-1',
        name: 'Kudzai Mutasa',
        email: 'kudzai.m@gmail.com',
        phone: '+263773111222',
        role: 'tenant',
        isPhoneVerified: true,
        createdAt: '2026-02-10'
      });
    } else if (role === 'landlord') {
      setCurrentUser(INITIAL_LANDLORDS[0]);
    } else if (role === 'admin') {
      setCurrentUser({
        id: 'admin-1',
        name: 'Zim Accom Admin',
        email: 'admin@zimaccommodation.co.zw',
        phone: '+263771234567',
        role: 'admin',
        isPhoneVerified: true,
        createdAt: '2026-01-01'
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userRole,
        darkMode,
        setDarkMode,
        listings,
        savedListingIds,
        recentlyViewedIds,
        toggleSaveListing,
        addRecentlyViewed,
        filters,
        setFilters,
        resetFilters,
        addListing,
        updateListing,
        deleteListing,
        toggleOccupiedStatus,
        processLandlordPayment,
        allUsers,
        toggleBanUser,
        toggleApproveListing,
        toggleFeatureListing,
        reports,
        submitReport,
        resolveReport,
        switchDemoRole,
        activeModal,
        setActiveModal,
        selectedListingForDetail,
        setSelectedListingForDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
