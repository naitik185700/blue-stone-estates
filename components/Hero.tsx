'use client';

import React, { useState } from 'react';
import { Search, MapPin, Building, IndianRupee, BedDouble, CheckCircle2, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { PropertyIntent, PropertyType, SearchFilters } from '@/lib/types';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
  onOpenSiteVisit: () => void;
}

export default function Hero({ onSearch, onOpenSiteVisit }: HeroProps) {
  const [intent, setIntent] = useState<PropertyIntent | 'all'>('all');
  const [type, setType] = useState<PropertyType | 'all'>('all');
  const [bhk, setBhk] = useState<string>('all');
  const [budgetRange, setBudgetRange] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('Sector 69, Gurgaon');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (budgetRange === 'under-1cr') {
      maxPrice = 10000000;
    } else if (budgetRange === '1cr-2cr') {
      minPrice = 10000000;
      maxPrice = 20000000;
    } else if (budgetRange === '2cr-3.5cr') {
      minPrice = 20000000;
      maxPrice = 35000000;
    } else if (budgetRange === 'above-3.5cr') {
      minPrice = 35000000;
    } else if (budgetRange === 'rent-under-35k') {
      maxPrice = 35000;
    } else if (budgetRange === 'rent-35k-60k') {
      minPrice = 35000;
      maxPrice = 60000;
    }

    onSearch({
      intent: intent === 'all' ? undefined : intent,
      type: type === 'all' ? undefined : type,
      bhk: bhk === 'all' ? undefined : bhk,
      minPrice,
      maxPrice,
      keyword: keyword.trim() || undefined,
    });

    const el = document.getElementById('featured-properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickChip = (chipType: PropertyType | 'all', chipIntent: PropertyIntent | 'all', chipBhk: string = 'all') => {
    setType(chipType);
    setIntent(chipIntent);
    setBhk(chipBhk);
    onSearch({
      type: chipType === 'all' ? undefined : chipType,
      intent: chipIntent === 'all' ? undefined : chipIntent,
      bhk: chipBhk === 'all' ? undefined : chipBhk,
      keyword: 'Sector 69',
    });
    const el = document.getElementById('featured-properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-b from-[#0B1B3D] via-[#0E234E] to-[#122B5F] text-white pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background luxury elements */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Specialists in Sector 69, Gurgaon</span>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-blue-600/30 text-blue-200 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Regrob-Inspired Verified Inventory</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Discover Exceptional Homes. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              Exclusive Deals Guaranteed.
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-xl font-medium max-w-2xl mx-auto">
            Flats • Builder Floors • Rent & Sale in Sector 69, Gurgaon. Directly connect with vetted owners and local real estate experts.
          </p>
        </div>

        {/* Regrob-Style Search Box */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6 text-slate-800 border-4 border-amber-400/40 backdrop-blur-lg">
          {/* Intent / Category Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
            <button
              type="button"
              onClick={() => setIntent('all')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                intent === 'all'
                  ? 'bg-[#0B1B3D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Listings
            </button>
            <button
              type="button"
              onClick={() => setIntent('sale')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                intent === 'sale'
                  ? 'bg-[#0B1B3D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Buy / Sale 🏡
            </button>
            <button
              type="button"
              onClick={() => setIntent('rent')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                intent === 'rent'
                  ? 'bg-[#0B1B3D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Rentals 🔑
            </button>
            <button
              type="button"
              onClick={() => {
                setType('builder_floor');
                setIntent('sale');
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                type === 'builder_floor'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              ⭐ Builder Floors (Sector 69)
            </button>
          </div>

          {/* Search Inputs Grid */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-4">
            {/* Location Input */}
            <div className="relative">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Location
              </label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent bg-slate-50">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mr-2" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. Sector 69, SPR"
                  className="w-full bg-transparent text-xs md:text-sm font-semibold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Property Type
              </label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent bg-slate-50">
                <Building className="w-4 h-4 text-blue-600 shrink-0 mr-2" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-transparent text-xs md:text-sm font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="builder_floor">Builder Floor (Low Rise)</option>
                  <option value="flat">Luxury Flat / Apartment</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="commercial">Commercial Shop / SCO</option>
                </select>
              </div>
            </div>

            {/* BHK Dropdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Bedrooms (BHK)
              </label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent bg-slate-50">
                <BedDouble className="w-4 h-4 text-emerald-600 shrink-0 mr-2" />
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="all">Any BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                </select>
              </div>
            </div>

            {/* Budget Range Dropdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Budget Range
              </label>
              <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent bg-slate-50">
                <IndianRupee className="w-4 h-4 text-amber-600 shrink-0 mr-2" />
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-transparent text-xs md:text-sm font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="all">Any Budget</option>
                  <option value="under-1cr">Under ₹1.00 Cr</option>
                  <option value="1cr-2cr">₹1.00 Cr - ₹2.00 Cr</option>
                  <option value="2cr-3.5cr">₹2.00 Cr - ₹3.50 Cr</option>
                  <option value="above-3.5cr">Above ₹3.50 Cr</option>
                  <option value="rent-under-35k">Rent: &lt; ₹35k/mo</option>
                  <option value="rent-35k-60k">Rent: ₹35k - ₹60k/mo</option>
                </select>
              </div>
            </div>

            {/* Submit Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0B1B3D] to-blue-900 hover:from-blue-900 hover:to-[#0B1B3D] text-amber-400 font-extrabold py-3 px-4 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all cursor-pointer border border-amber-400/40"
              >
                <Search className="w-4 h-4" />
                <span>Search Deals</span>
              </button>
            </div>
          </form>

          {/* Quick Search Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500">Popular Searches:</span>
            <button
              onClick={() => handleQuickChip('builder_floor', 'sale', '3')}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-2.5 py-1 rounded-md font-medium transition cursor-pointer"
            >
              3 BHK Builder Floor Sector 69
            </button>
            <button
              onClick={() => handleQuickChip('flat', 'sale', '3')}
              className="bg-blue-100 hover:bg-blue-200 text-blue-900 px-2.5 py-1 rounded-md font-medium transition cursor-pointer"
            >
              Luxury High-Rise Flats
            </button>
            <button
              onClick={() => handleQuickChip('flat', 'rent', 'all')}
              className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-md font-medium transition cursor-pointer"
            >
              Rentals in Sector 69
            </button>
            <button
              onClick={() => handleQuickChip('builder_floor', 'sale', '4')}
              className="bg-purple-100 hover:bg-purple-200 text-purple-900 px-2.5 py-1 rounded-md font-medium transition cursor-pointer"
            >
              4 BHK with Terrace Rights
            </button>
          </div>
        </div>

        {/* Bottom Trust & Key Highlights */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300 font-black shrink-0">
              📍
            </div>
            <div>
              <div className="font-bold text-sm text-white">Sector 69, Gurgaon</div>
              <div className="text-xs text-slate-300">Local Micro-Market Specialists</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-300 font-black shrink-0">
              🏢
            </div>
            <div>
              <div className="font-bold text-sm text-white">Flats & Builder Floors</div>
              <div className="text-xs text-slate-300">Stilt+4, Penthouses & Societies</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-400/20 flex items-center justify-center text-blue-300 font-black shrink-0">
              🤝
            </div>
            <div>
              <div className="font-bold text-sm text-white">Best Deals Guaranteed</div>
              <div className="text-xs text-slate-300">Direct Owner & Developer Prices</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-400/20 flex items-center justify-center text-purple-300 font-black shrink-0">
              📞
            </div>
            <div>
              <div className="font-bold text-sm text-white">Call/WhatsApp</div>
              <a href="tel:+919818014595" className="text-xs text-amber-300 font-bold hover:underline">
                9818014595
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
