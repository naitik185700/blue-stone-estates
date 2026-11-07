'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar, Sparkles } from 'lucide-react';

interface StickyContactBarProps {
  onOpenSiteVisit: () => void;
}

export default function StickyContactBar({ onOpenSiteVisit }: StickyContactBarProps) {
  const phoneNumber = '9818014595';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    'Hi BlueStone Estates, I am browsing your website. I want to check the best deals for Flats & Builder Floors in Sector 69, Gurgaon.'
  )}`;

  return (
    <>
      {/* Floating Circular WhatsApp Button (Bottom Right) */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
        <div className="hidden sm:flex items-center gap-1.5 bg-[#0B1B3D] text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl border border-amber-400/50 animate-bounce">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Best Deals in Sector 69</span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 border-2 border-white ring-4 ring-emerald-400/30 group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 fill-current" />
        </a>
      </div>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1B3D] border-t border-blue-900/80 px-3 py-2 flex items-center gap-2 shadow-2xl backdrop-blur-lg">
        <a
          href={`tel:+91${phoneNumber}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition shadow-md"
        >
          <Phone className="w-4 h-4 fill-current" />
          <span>Call: 9818014595</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenSiteVisit}
          className="bg-blue-800/80 hover:bg-blue-800 text-white p-2.5 rounded-xl transition cursor-pointer"
          aria-label="Book Site Visit"
        >
          <Calendar className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
