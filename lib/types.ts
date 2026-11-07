export type PropertyType = 'flat' | 'builder_floor' | 'plot' | 'commercial' | 'penthouse';
export type PropertyIntent = 'sale' | 'rent';
export type PropertyStatus = 'Ready to Move' | 'Under Construction' | 'Pre-Launch';

export interface Property {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  type: PropertyType;
  intent: PropertyIntent;
  price: number;
  priceDisplay: string;
  pricePerSqft: number;
  bhk: number;
  bathrooms: number;
  balconies: number;
  areaSqft: number;
  plotSizeYards?: number;
  floor: string;
  furnishing: 'Semi-Furnished' | 'Fully Furnished' | 'Unfurnished';
  facing: string;
  location: string;
  subLocality: string;
  status: PropertyStatus;
  possessionDate: string;
  reraId: string;
  isFeatured: boolean;
  isHotDeal: boolean;
  isVerified: boolean;
  images: string[];
  description: string;
  highlights: string[];
  amenities: string[];
  nearbyPlaces: {
    name: string;
    distance: string;
    type: 'metro' | 'highway' | 'school' | 'hospital' | 'mall';
  }[];
  agentName: string;
  agentPhone: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyId?: string;
  propertyTitle?: string;
  inquiryType: 'call_back' | 'site_visit' | 'whatsapp' | 'price_breakdown' | 'general';
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Site Visit Fixed' | 'Closed';
  createdAt: string;
}

export interface PropertySubmission {
  id: string;
  ownerName: string;
  phone: string;
  email: string;
  propertyType: PropertyType;
  intent: PropertyIntent;
  location: string;
  bhk: string;
  expectedPrice: string;
  areaSqft?: number;
  notes?: string;
  status: 'Pending Review' | 'Approved' | 'Contacted';
  createdAt: string;
}

export interface SearchFilters {
  intent?: PropertyIntent;
  type?: PropertyType | 'all';
  location?: string;
  bhk?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  keyword?: string;
}
