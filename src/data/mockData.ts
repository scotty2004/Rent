import { PropertyListing, CityData, User } from '../types';

export const ZIM_CITIES: CityData[] = [
  {
    name: 'Harare',
    suburbs: [
      'Avondale', 'Borrowdale', 'Mount Pleasant', 'Westgate', 'Mabelreign',
      'Eastlea', 'Highlands', 'Greendale', 'Hatfield', 'Greystone Park',
      'Belvedere', 'Milton Park', 'CBD', 'Avenues', 'Marlborough', 'Chisipite'
    ],
    popularCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Bulawayo',
    suburbs: [
      'Ascot', 'Kumalo', 'Suburbs', 'Hillside', 'Burnside', 'Bradfield',
      'Famona', 'Malindela', 'Morningside', 'Khumalo', 'Selborne Park',
      'CBD', 'Pelandaba', 'Luveve', 'Nkulumane'
    ],
    popularCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Chitungwiza',
    suburbs: ['Unit A', 'Unit C', 'Unit K', 'Zengeza 1', 'Zengeza 2', 'Zengeza 3', 'Zengeza 4', 'Seke', 'St Marys'],
    popularCount: 54,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Mutare',
    suburbs: ['Chikanga', 'Morningside', 'Palmerstone', 'Yeovil', 'Murambi', 'Fairbridge Park', 'Dangamvura'],
    popularCount: 39,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Gweru',
    suburbs: ['Senga', 'Ilanda', 'Lundi Park', 'Southdowns', 'Daylesford', 'Mkoba', 'Nashville'],
    popularCount: 31,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Victoria Falls',
    suburbs: ['Mkhosana', 'Chinotimba', 'Low Density', 'Chinotimba Township'],
    popularCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Masvingo',
    suburbs: ['Rhodene', 'Rujeko', 'Mucheke', 'Chesvingo'],
    popularCount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_LANDLORDS: User[] = [
  {
    id: 'lnd-1',
    name: 'Tinashe Moyo',
    email: 'tinashe.moyo@gmail.com',
    phone: '+263772123456',
    role: 'landlord',
    isPhoneVerified: true,
    createdAt: '2026-01-15',
    subscriptionStatus: 'active',
    subscriptionEndsAt: '2027-02-15',
    paymentHistory: [
      {
        id: 'pay-101',
        landlordId: 'lnd-1',
        amount: 2,
        method: 'ecocash',
        phoneNumber: '+263772123456',
        reference: 'ECO-984214',
        date: '2026-02-15',
        status: 'completed',
        periodYears: 1,
        receiptNumber: 'REC-2026-0081'
      }
    ]
  },
  {
    id: 'lnd-2',
    name: 'Chiedza Ndlovu',
    email: 'chiedza.n@yahoo.com',
    phone: '+263783987654',
    role: 'landlord',
    isPhoneVerified: true,
    createdAt: '2026-02-01',
    subscriptionStatus: 'trial',
    trialEndsAt: '2026-08-28',
    paymentHistory: []
  },
  {
    id: 'lnd-3',
    name: 'Farai Sibanda',
    email: 'farai.properties@gmail.com',
    phone: '+263712555888',
    role: 'landlord',
    isPhoneVerified: true,
    createdAt: '2026-03-10',
    subscriptionStatus: 'active',
    subscriptionEndsAt: '2027-03-10',
    paymentHistory: [
      {
        id: 'pay-102',
        landlordId: 'lnd-3',
        amount: 2,
        method: 'innbucks',
        phoneNumber: '+263712555888',
        reference: 'INN-441092',
        date: '2026-03-10',
        status: 'completed',
        periodYears: 1,
        receiptNumber: 'REC-2026-0142'
      }
    ]
  }
];

export const INITIAL_LISTINGS: PropertyListing[] = [
  {
    id: 'house-101',
    landlordId: 'lnd-1',
    landlordName: 'Tinashe Moyo',
    landlordPhone: '+263772123456',
    landlordWhatsApp: '263772123456',
    landlordRating: 4.9,
    landlordReviewCount: 14,
    title: 'Modern 3-Bedroom Cottage with Borehole & Solar',
    description: 'Beautiful modern cottage in peaceful Avondale. Has 24/7 borehole water with 5000L tank, 5kVA solar power system, electric fence, paved yard, and high speed WiFi. Perfect for a young family or working professionals.',
    rentPrice: 450,
    city: 'Harare',
    suburb: 'Avondale',
    street: '14 King George Road',
    bedrooms: 3,
    bathrooms: 2,
    hasKitchen: true,
    hasLounge: true,
    parkingSpaces: 2,
    furnishedStatus: 'Unfurnished',
    waterAvailability: 'Borehole',
    electricityAvailability: 'Solar Power System',
    wifiAvailable: true,
    securityFeatures: ['Walled & Gated', 'Electric Fence', 'Razor Wire'],
    houseType: 'Cottage',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    isFeatured: true,
    isApproved: true,
    viewsCount: 382,
    datePosted: '2026-08-08',
    latitude: -17.7833,
    longitude: 31.0333
  },
  {
    id: 'house-102',
    landlordId: 'lnd-2',
    landlordName: 'Chiedza Ndlovu',
    landlordPhone: '+263783987654',
    landlordWhatsApp: '263783987654',
    landlordRating: 4.8,
    landlordReviewCount: 8,
    title: 'Spacious 1-Bedroom Bachelor Flat near Ascot Shopping Centre',
    description: 'Clean and tiled self-contained bachelor flat in Ascot, Bulawayo. En-suite bathroom, fitted kitchenette, backup water tank, secure parking, quiet compound close to NUST and Ascot Mall.',
    rentPrice: 180,
    city: 'Bulawayo',
    suburb: 'Ascot',
    street: '22 Ascot Way',
    bedrooms: 1,
    bathrooms: 1,
    hasKitchen: true,
    hasLounge: false,
    parkingSpaces: 1,
    furnishedStatus: 'Semi-Furnished',
    waterAvailability: 'Water Tank',
    electricityAvailability: 'ZESA Prepaid',
    wifiAvailable: true,
    securityFeatures: ['Walled & Gated', 'CCTV'],
    houseType: 'Bachelor Flat',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    isFeatured: true,
    isApproved: true,
    viewsCount: 294,
    datePosted: '2026-08-10',
    latitude: -20.1500,
    longitude: 28.5833
  },
  {
    id: 'house-103',
    landlordId: 'lnd-3',
    landlordName: 'Farai Sibanda',
    landlordPhone: '+263712555888',
    landlordWhatsApp: '263712555888',
    landlordRating: 5.0,
    landlordReviewCount: 21,
    title: 'Luxury 4-Bedroom House with Swimming Pool & Full Solar',
    description: 'Prime double-storey residential family home in Borrowdale. Features 4 ensuite bedrooms, modern granite kitchen, swimming pool, manicured garden, full 10kVA solar power system, high yielding borehole, staff quarters, and electric gate.',
    rentPrice: 1200,
    city: 'Harare',
    suburb: 'Borrowdale',
    street: '88 Borrowdale Brooke Drive',
    bedrooms: 4,
    bathrooms: 4,
    hasKitchen: true,
    hasLounge: true,
    parkingSpaces: 4,
    furnishedStatus: 'Fully Furnished',
    waterAvailability: 'Borehole & Council',
    electricityAvailability: 'ZESA & Solar',
    wifiAvailable: true,
    securityFeatures: ['Walled & Gated', 'Electric Fence', 'CCTV', 'Security Guard'],
    houseType: 'House',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    isFeatured: true,
    isApproved: true,
    viewsCount: 610,
    datePosted: '2026-08-01',
    latitude: -17.7500,
    longitude: 31.1000
  },
  {
    id: 'house-104',
    landlordId: 'lnd-1',
    landlordName: 'Tinashe Moyo',
    landlordPhone: '+263772123456',
    landlordWhatsApp: '263772123456',
    landlordRating: 4.9,
    landlordReviewCount: 14,
    title: 'Clean 2-Room Extension in Westgate',
    description: 'Neat 2 rooms (bedroom + kitchen/lounge) with private entrance in Westgate near Westgate Shopping Mall. Tiled, own prepaid electricity meter, constant council water plus 2500L backup tank.',
    rentPrice: 220,
    city: 'Harare',
    suburb: 'Westgate',
    street: '45 Lomagundi Road',
    bedrooms: 1,
    bathrooms: 1,
    hasKitchen: true,
    hasLounge: true,
    parkingSpaces: 1,
    furnishedStatus: 'Unfurnished',
    waterAvailability: 'Water Tank',
    electricityAvailability: 'ZESA Prepaid',
    wifiAvailable: false,
    securityFeatures: ['Walled & Gated'],
    houseType: 'Room',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    isFeatured: false,
    isApproved: true,
    viewsCount: 175,
    datePosted: '2026-08-05',
    latitude: -17.7600,
    longitude: 30.9800
  },
  {
    id: 'house-105',
    landlordId: 'lnd-2',
    landlordName: 'Chiedza Ndlovu',
    landlordPhone: '+263783987654',
    landlordWhatsApp: '263783987654',
    landlordRating: 4.8,
    landlordReviewCount: 8,
    title: 'Modern 2-Bedroom Apartment in Hillside',
    description: 'Upmarket 2 bedroom garden apartment in Hillside Bulawayo. Gated security complex, modern finishes, solar geyser, internet connection ready, friendly neighborhood.',
    rentPrice: 350,
    city: 'Bulawayo',
    suburb: 'Hillside',
    street: '12 Hillside Road',
    bedrooms: 2,
    bathrooms: 1,
    hasKitchen: true,
    hasLounge: true,
    parkingSpaces: 1,
    furnishedStatus: 'Unfurnished',
    waterAvailability: 'Borehole',
    electricityAvailability: 'Solar Power System',
    wifiAvailable: true,
    securityFeatures: ['Walled & Gated', 'Electric Fence'],
    houseType: 'Apartment',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: false, // Marked Occupied for testing
    isFeatured: false,
    isApproved: true,
    viewsCount: 220,
    datePosted: '2026-07-28',
    latitude: -20.1800,
    longitude: 28.6100
  },
  {
    id: 'house-106',
    landlordId: 'lnd-3',
    landlordName: 'Farai Sibanda',
    landlordPhone: '+263712555888',
    landlordWhatsApp: '263712555888',
    landlordRating: 5.0,
    landlordReviewCount: 21,
    title: '2-Bedroom House in Chikanga Mutare',
    description: 'Neat stand-alone 2-bedroom home in Chikanga Phase 2, Mutare. Tiled floors, walled and gated, reliable council water with extra tank storage, ZESA prepaid meter.',
    rentPrice: 200,
    city: 'Mutare',
    suburb: 'Chikanga',
    street: '77 Chikanga Phase 2',
    bedrooms: 2,
    bathrooms: 1,
    hasKitchen: true,
    hasLounge: true,
    parkingSpaces: 2,
    furnishedStatus: 'Unfurnished',
    waterAvailability: 'Council Water',
    electricityAvailability: 'ZESA Prepaid',
    wifiAvailable: false,
    securityFeatures: ['Walled & Gated'],
    houseType: 'House',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    isAvailable: true,
    isFeatured: false,
    isApproved: true,
    viewsCount: 140,
    datePosted: '2026-08-02',
    latitude: -18.9700,
    longitude: 32.6300
  }
];
