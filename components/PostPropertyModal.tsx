'use client';

import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, Building2, Send, ShieldCheck } from 'lucide-react';
import { PropertyType, PropertyIntent } from '@/lib/types';

interface PostPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostPropertyModal({ isOpen, onClose }: PostPropertyModalProps) {
  if (!isOpen) return null;

  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('builder_floor');
  const [intent, setIntent] = useState<PropertyIntent>('sale');
  const [location, setLocation] = useState('Sector 69, Gurgaon');
  const [bhk, setBhk] = useState('3');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [areaSqft, setAreaSqft] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !phone || !expectedPrice) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submit-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerName,
          phone,
          email,
          propertyType,
          intent,
          location,
          bhk,
          expectedPrice,
          areaSqft: areaSqft ? Number(areaSqft) : undefined,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Error posting property:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Post Property Free • Zero Commission For Direct Owners
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          List Your Property in Gurgaon
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Connect with 10,000+ verified active buyers and tenants looking for Flats & Builder Floors in Sector 69.
        </p>

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold">Property Submitted Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our BlueStone Estates listing specialist will verify the title details and activate your listing. We will contact you at {phone}.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="bg-[#0B1B3D] text-amber-300 font-bold px-6 py-2 rounded-xl text-xs"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Intent Radio Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIntent('sale')}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  intent === 'sale'
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                I want to Sell 🏡
              </button>
              <button
                type="button"
                onClick={() => setIntent('rent')}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  intent === 'rent'
                    ? 'bg-[#0B1B3D] text-white border-[#0B1B3D]'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                I want to Rent Out 🔑
              </button>
            </div>

            {/* Owner Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Owner / Landlord Name *
                </label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Pankaj Rao"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Contact Phone Number *
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
            </div>

            {/* Property Type & BHK */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Property Category
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="builder_floor">Builder Floor (Stilt+4)</option>
                  <option value="flat">High-Rise Flat / Society</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="plot">Plot / Land</option>
                  <option value="commercial">Commercial Shop / SCO</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Bedrooms (BHK)
                </label>
                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5+">5+ BHK</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Built-up Area (Sq.Ft / Yds)
                </label>
                <input
                  type="number"
                  value={areaSqft}
                  onChange={(e) => setAreaSqft(e.target.value)}
                  placeholder="e.g. 2040"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Location & Expected Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Locality / Society Name *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Sector 69, Near SPR, Gurgaon"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Expected Price / Rent *
                </label>
                <input
                  type="text"
                  required
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  placeholder="e.g. ₹1.85 Cr or ₹40,000/month"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                Property Highlights / Floor Details
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. 1st floor with lift, park facing, 2 car parking, modular kitchen..."
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your contact information is strictly confidential and protected by BlueStone Estates.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Listing...' : 'Submit Property for FREE Verification'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
