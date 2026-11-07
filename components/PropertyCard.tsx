'use client';

import React from 'react';
import { Property } from '@/lib/types';
import { MapPin, BedDouble, Bath, Maximize2, ShieldCheck, Flame, Phone, MessageCircle, ChevronRight } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onOpenSiteVisit: (property: Property) => void;
}

export default function PropertyCard({ property, onViewDetails, onOpenSiteVisit }: PropertyCardProps) {
  const phoneNumber = property.agentPhone || '9818014595';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    `Hi BlueStone Estates, I am interested in "${property.title}" in Sector 69 (${property.priceDisplay}). Please share exact floor plan and schedule site visit.`
  )}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Property Image & Badges */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onViewDetails(property)}>
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-[#0B1B3D]/90 backdrop-blur-md text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {property.type === 'builder_floor' ? 'Builder Floor' : property.type.toUpperCase()}
          </span>
          {property.isHotDeal && (
            <span className="bg-red-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" />
              <span>Hot Deal</span>
            </span>
          )}
          {property.isVerified && (
            <span className="bg-emerald-600/90 text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>RERA Verified</span>
            </span>
          )}
        </div>

        {/* Status Badge on Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            property.status === 'Ready to Move'
              ? 'bg-emerald-500 text-slate-950 font-bold'
              : 'bg-amber-500 text-slate-950 font-bold'
          }`}>
            {property.status}
          </span>
        </div>

        {/* Price & Location Overlay on Bottom */}
        <div className="absolute bottom-3 left-3 right-3 text-white z-10 flex justify-between items-end">
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-300 drop-shadow-md">
              {property.priceDisplay}
            </div>
            {property.intent === 'sale' && property.pricePerSqft > 0 && (
              <div className="text-[11px] text-slate-300 font-medium">
                ₹{property.pricePerSqft.toLocaleString('en-IN')}/sq.ft
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
              {property.intent === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Title */}
          <div className="flex items-center gap-1 text-slate-500 text-xs font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{property.location} • {property.subLocality}</span>
          </div>

          {/* Property Name */}
          <h3
            onClick={() => onViewDetails(property)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1 cursor-pointer mb-2"
          >
            {property.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3">
            {property.tagline || property.description}
          </p>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-700 font-medium mb-3 bg-slate-50/70 rounded-xl px-2">
            {property.bhk > 0 ? (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{property.bhk} BHK</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Commercial</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{property.bathrooms} Baths</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {property.plotSizeYards ? `${property.plotSizeYards} Yds` : `${property.areaSqft} Sq.Ft`}
              </span>
            </div>
          </div>

          {/* Highlights Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {property.highlights.slice(0, 2).map((hl, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-800 border border-blue-100 text-[11px] font-medium px-2 py-0.5 rounded-md"
              >
                ✓ {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2 rounded-xl text-xs transition shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:+91${phoneNumber}`}
              className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-blue-950 text-white font-bold py-2 px-2 rounded-xl text-xs transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Now</span>
            </a>
          </div>

          <button
            onClick={() => onViewDetails(property)}
            className="w-full flex items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold py-2 px-3 rounded-xl text-xs transition cursor-pointer"
          >
            <span>View Full Details & Floor Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
