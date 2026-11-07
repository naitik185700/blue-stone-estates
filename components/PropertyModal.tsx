'use client';

import React, { useState } from 'react';
import { Property } from '@/lib/types';
import {
  X, MapPin, BedDouble, Bath, Maximize2, ShieldCheck, CheckCircle2,
  Calendar, Phone, MessageCircle, Send, Car, Sparkles, Navigation
} from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const phoneNumber = property.agentPhone || '9818014595';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    `Hi BlueStone Estates, I am viewing "${property.title}" in Sector 69 (${property.priceDisplay}). Please share PDF brochure, exact location pin, and schedule site visit.`
  )}`;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          propertyId: property.id,
          propertyTitle: property.title,
          inquiryType: preferredDate ? 'site_visit' : 'call_back',
          preferredDate,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full transition cursor-pointer shadow-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 pb-2 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="bg-[#0B1B3D] text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {property.type === 'builder_floor' ? 'Builder Floor' : property.type}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>RERA ID: {property.reraId}</span>
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              {property.status} • {property.possessionDate}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
            {property.title}
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
            <div className="flex items-center gap-1 text-slate-600 text-sm font-medium">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{property.location} ({property.subLocality})</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-900">
              {property.priceDisplay}
              {property.intent === 'sale' && property.pricePerSqft > 0 && (
                <span className="text-xs text-slate-500 font-normal ml-2">
                  (₹{property.pricePerSqft.toLocaleString('en-IN')}/sq.ft)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Photos & Details (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Featured Photo */}
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-semibold">
                Photo {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Photo Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                      activeImageIndex === idx ? 'border-amber-500 shadow-md scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <div className="text-slate-500 font-medium">Bedrooms</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{property.bhk} BHK</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Bathrooms</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{property.bathrooms} Luxury Baths</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Built-Up Area</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">
                  {property.plotSizeYards ? `${property.plotSizeYards} Sq.Yds (${property.areaSqft} sq.ft)` : `${property.areaSqft} Sq.Ft`}
                </div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Floor Level</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{property.floor}</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Furnishing</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{property.furnishing}</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Facing / View</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{property.facing}</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Balconies</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{property.balconies} Wide Balconies</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Parking</div>
                <div className="text-slate-900 font-bold text-sm mt-0.5">Stilt / Covered</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Property Overview & Description</span>
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                {property.description}
              </p>
            </div>

            {/* Key Highlights Checklist */}
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Key Deal Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Modern Amenities & Facilities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {property.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Locality & Nearby Connectivity */}
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>Nearby Landmarks & Connectivity</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.nearbyPlaces.map((place, i) => (
                  <div key={i} className="flex justify-between items-center bg-blue-50/50 border border-blue-100 p-2.5 rounded-xl text-xs">
                    <span className="font-semibold text-slate-800">{place.name}</span>
                    <span className="bg-white text-blue-900 font-bold px-2 py-0.5 rounded shadow-xs">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry & Booking Form (1 Col) */}
          <div className="space-y-4">
            {/* Quick Contact Box */}
            <div className="bg-[#0B1B3D] text-white p-5 rounded-2xl shadow-lg border border-blue-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center font-bold text-amber-300 text-lg shrink-0">
                  🏢
                </div>
                <div>
                  <div className="text-xs text-slate-300">BlueStone Property Advisor</div>
                  <div className="font-bold text-base text-white">{property.agentName}</div>
                  <div className="text-xs text-amber-300 font-semibold">📍 Sector 69, Gurgaon Office</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <a
                  href={`tel:+91${phoneNumber}`}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black py-2.5 px-4 rounded-xl text-sm transition shadow-md"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call: +91 {phoneNumber}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Brochure & Price</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-300 text-center flex items-center justify-center gap-1">
                <span>👉 Best Deals Guaranteed • 100% Free Consultation</span>
              </div>
            </div>

            {/* Schedule Site Visit / Callback Form */}
            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl shadow-md">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Book a Free Site Visit
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Experience this property in Sector 69 in person. We provide free doorstep cab service.
              </p>

              {submitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Thank You! Request Received</div>
                  <p className="text-xs">
                    Our Sector 69 property advisor will contact you within 15 minutes at {phone}.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs font-semibold text-emerald-700 underline"
                  >
                    Submit another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Pankaj Rao"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9818014595"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Preferred Date for Site Visit
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Message / Special Request
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Best price quotation, loan eligibility..."
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0B1B3D] hover:bg-blue-900 text-amber-300 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Confirm Site Visit Booking'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
