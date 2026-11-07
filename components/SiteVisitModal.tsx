'use client';

import React, { useState } from 'react';
import { X, Building2, Calendar, Clock, Car, CheckCircle2, Send, Phone, MessageCircle } from 'lucide-react';
import { Property } from '@/lib/types';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProperty?: Property | null;
}

export default function SiteVisitModal({ isOpen, onClose, selectedProperty }: SiteVisitModalProps) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [needCab, setNeedCab] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const phoneNumber = '9818014595';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    `Hi BlueStone Estates, I want to book a physical site visit in Sector 69, Gurgaon${
      selectedProperty ? ` for "${selectedProperty.title}"` : ''
    }. Please confirm slot.`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !preferredDate) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          propertyId: selectedProperty?.id || 'general-sector-69',
          propertyTitle: selectedProperty?.title || 'Sector 69 Gurgaon General Site Visit',
          inquiryType: 'site_visit',
          preferredDate,
          preferredTime: timeSlot,
          message: needCab
            ? `Requested Free VIP Cab Pickup from: ${pickupLocation || 'Gurgaon NCR'}`
            : 'Direct meeting at Sector 69 site',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      }
    } catch (err) {
      console.error('Error booking site visit:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative my-auto p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-700">
            <Building2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
            VIP Guided Property Inspection
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          Schedule Free Site Visit
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Inspect ready-to-move builder floors and luxury flats in Sector 69 with our senior consultant.
        </p>

        {selectedProperty && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0">
              <img src={selectedProperty.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-amber-800 uppercase">Selected Property</div>
              <div className="text-xs font-bold text-slate-900 truncate">{selectedProperty.title}</div>
              <div className="text-xs font-black text-blue-900">{selectedProperty.priceDisplay}</div>
            </div>
          </div>
        )}

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold">Site Visit Confirmed!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our Sector 69 relationship manager will call you at {phone} to coordinate the schedule and dispatch your cab.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Full Name *
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
                  Mobile Number *
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Preferred Visit Date *
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                  <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Free Cab Option */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needCab}
                  onChange={(e) => setNeedCab(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-900 accent-blue-900"
                />
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-600" />
                  <span>Request Free Doorstep Cab Pickup & Drop (NCR)</span>
                </span>
              </label>

              {needCab && (
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter your pickup address (e.g. Golf Course Rd, Gurgaon / Delhi NCR)"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0B1B3D] hover:bg-blue-900 text-amber-300 font-black py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Scheduling Visit...' : 'Confirm Free Site Visit'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
