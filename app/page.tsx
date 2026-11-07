'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import PropertyModal from '@/components/PropertyModal';
import PostPropertyModal from '@/components/PostPropertyModal';
import SiteVisitModal from '@/components/SiteVisitModal';
import LocalityGuide from '@/components/LocalityGuide';
import EmiCalculator from '@/components/EmiCalculator';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import StickyContactBar from '@/components/StickyContactBar';
import { Property, SearchFilters } from '@/lib/types';
import {
  Building2, Home, Key, Flame, ArrowUpDown, Filter, Sparkles,
  Phone, MessageCircle, MapPin, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPostPropertyOpen, setIsPostPropertyOpen] = useState<boolean>(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState<boolean>(false);

  // Filter & sort states
  const [activeTab, setActiveTab] = useState<'all' | 'builder_floor' | 'flat' | 'rent' | 'hot'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high'>('featured');
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});

  // Fetch properties from Node API backend
  const fetchProperties = async (filters?: SearchFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters?.intent) params.set('intent', filters.intent);
      if (filters?.type && filters.type !== 'all') params.set('type', filters.type);
      if (filters?.bhk && filters.bhk !== 'all') params.set('bhk', filters.bhk);
      if (filters?.minPrice) params.set('minPrice', filters.minPrice.toString());
      if (filters?.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
      if (filters?.keyword) params.set('keyword', filters.keyword);

      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProperties(data.data);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleHeroSearch = (filters: SearchFilters) => {
    setCurrentFilters(filters);
    fetchProperties(filters);
  };

  // Filter in-memory for tab buttons
  let displayedProperties = properties.filter((p) => {
    if (activeTab === 'builder_floor') return p.type === 'builder_floor';
    if (activeTab === 'flat') return p.type === 'flat';
    if (activeTab === 'rent') return p.intent === 'rent';
    if (activeTab === 'hot') return p.isHotDeal;
    return true;
  });

  // Sorting
  if (sortBy === 'price_low') {
    displayedProperties = [...displayedProperties].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    displayedProperties = [...displayedProperties].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. Header & Navigation */}
      <Header
        onOpenPostProperty={() => setIsPostPropertyOpen(true)}
        onOpenSiteVisit={() => setIsSiteVisitOpen(true)}
      />

      {/* 2. Hero Section with Regrob Search Engine */}
      <Hero
        onSearch={handleHeroSearch}
        onOpenSiteVisit={() => setIsSiteVisitOpen(true)}
      />

      {/* 3. Category Quick Explore Banners */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600">
                Curated Property Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Explore by Property Category in Sector 69
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Whether you are looking for an independent builder floor with roof rights or a high-rise flat, BlueStone Estates guarantees the best deals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category 1: Builder Floors */}
            <div
              onClick={() => {
                setActiveTab('builder_floor');
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 h-64 flex flex-col justify-end p-5"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                alt="Builder Floors"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/60 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  Most Popular
                </span>
                <h3 className="text-lg font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                  Builder Floors (Stilt + 4)
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Private Lift • Stilt Parking • 204 to 500 Sq. Yds
                </p>
              </div>
            </div>

            {/* Category 2: High Rise Flats */}
            <div
              onClick={() => {
                setActiveTab('flat');
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 h-64 flex flex-col justify-end p-5"
            >
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                alt="Flats"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/60 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="bg-blue-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  Gated Societies
                </span>
                <h3 className="text-lg font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                  Luxury Flats & Apartments
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Clubhouse • Swimming Pool • High Rental Yield
                </p>
              </div>
            </div>

            {/* Category 3: Rentals */}
            <div
              onClick={() => {
                setActiveTab('rent');
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 h-64 flex flex-col justify-end p-5"
            >
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
                alt="Rental"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/60 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  Ready to Move
                </span>
                <h3 className="text-lg font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                  Rental Flats & Floors
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Semi & Fully Furnished • Family & Execs
                </p>
              </div>
            </div>

            {/* Category 4: Commercial & Penthouses */}
            <div
              onClick={() => {
                setActiveTab('hot');
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 h-64 flex flex-col justify-end p-5"
            >
              <img
                src="https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80"
                alt="Penthouse"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/60 to-transparent" />
              <div className="relative z-10 text-white">
                <span className="bg-red-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  Hot Deals
                </span>
                <h3 className="text-lg font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                  Penthouses & Commercial
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Retail Shops & Duplexes on SPR Corridor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Main Featured Properties Section */}
      <section id="featured-properties" className="py-16 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Listings Database</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Featured Properties in Sector 69, Gurgaon
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {displayedProperties.length} verified flats and builder floors. All titles verified by BlueStone Estates.
            </p>
          </div>

          {/* Tab Filters & Sort Control */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-200/80 p-1 rounded-xl text-xs font-bold text-slate-700">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'all' ? 'bg-[#0B1B3D] text-white shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                All ({properties.length})
              </button>
              <button
                onClick={() => setActiveTab('builder_floor')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'builder_floor' ? 'bg-[#0B1B3D] text-white shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                Builder Floors
              </button>
              <button
                onClick={() => setActiveTab('flat')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'flat' ? 'bg-[#0B1B3D] text-white shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                Flats
              </button>
              <button
                onClick={() => setActiveTab('rent')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'rent' ? 'bg-[#0B1B3D] text-white shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                Rentals
              </button>
              <button
                onClick={() => setActiveTab('hot')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === 'hot' ? 'bg-red-600 text-white shadow-xs' : 'hover:text-slate-950'
                }`}
              >
                🔥 Hot Deals
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-900 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
            <div className="font-bold text-sm text-slate-700">Loading verified properties...</div>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && displayedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Building2 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No properties match your current filter</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
              We have offline inventoried builder floors and flats in Sector 69. Contact us directly at 9818014595 for customized options.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                fetchProperties({});
              }}
              className="bg-[#0B1B3D] text-amber-300 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onViewDetails={(p) => setSelectedProperty(p)}
                onOpenSiteVisit={(p) => {
                  setSelectedProperty(p);
                  setIsSiteVisitOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Banner: Don't see what you are looking for? */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider">
              Looking for something specific?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Get Custom Off-Market Deals in Sector 69, Gurgaon
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Many exclusive builder floor owners prefer private sales without public listing. Contact our private client desk directly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:+919818014595"
              className="bg-[#0B1B3D] hover:bg-blue-900 text-amber-300 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-md flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call: 9818014595</span>
            </a>

            <a
              href="https://wa.me/919818014595?text=Hi%20BlueStone%20Estates%2C%20I%20am%20looking%20for%20a%20specific%20builder%20floor%20or%20flat%20in%20Sector%2069%20Gurgaon.%20Please%20share%20options."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-md flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Request</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Locality Guide & Micro-Market Insights */}
      <LocalityGuide />

      {/* 6. Home Loan EMI Calculator */}
      <EmiCalculator />

      {/* 7. Why Choose BlueStone Estates */}
      <WhyChooseUs />

      {/* 8. Client Testimonials */}
      <Testimonials />

      {/* 9. Footer */}
      <Footer
        onOpenPostProperty={() => setIsPostPropertyOpen(true)}
        onOpenSiteVisit={() => setIsSiteVisitOpen(true)}
      />

      {/* 10. Sticky Bottom Contact Bar (Mobile & WhatsApp Float) */}
      <StickyContactBar
        onOpenSiteVisit={() => setIsSiteVisitOpen(true)}
      />

      {/* 11. Modals */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      <PostPropertyModal
        isOpen={isPostPropertyOpen}
        onClose={() => setIsPostPropertyOpen(false)}
      />

      <SiteVisitModal
        isOpen={isSiteVisitOpen}
        onClose={() => setIsSiteVisitOpen(false)}
        selectedProperty={selectedProperty}
      />
    </div>
  );
}
