'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Building2, PlusCircle, ShieldCheck, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenPostProperty: () => void;
  onOpenSiteVisit: () => void;
}

export default function Header({ onOpenPostProperty, onOpenSiteVisit }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const phoneNumber = '9818014595';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    'Hi BlueStone Estates, I am interested in Flats and Builder Floors in Sector 69, Gurgaon. Please share best deals.'
  )}`;

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Announcement & Quick Contact Bar */}
      <div className="bg-[#07132c] text-white text-xs md:text-sm py-2 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-200 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold text-[11px] border border-amber-500/30">
              👉 Best Deals Guaranteed
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="flex items-center gap-1 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Sector 69, Gurgaon (Specialists in Flats & Builder Floors)</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={`tel:+91${phoneNumber}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors text-slate-200 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call: +91 {phoneNumber}</span>
            </a>
            <span className="text-slate-500">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded-full transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#0B1B3D] text-white border-b border-blue-950/80">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 border-amber-400/60 shadow-lg shadow-blue-950/50 bg-[#061026] shrink-0">
              <img
                src="/bluestone-logo.jpg"
                alt="BlueStone Estates Logo"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  BlueStone <span className="text-amber-400">Estates</span>
                </span>
                <span className="text-sm">🏢</span>
              </div>
              <p className="text-[11px] md:text-xs font-medium text-slate-300 tracking-wide">
                Flats • Builder Floors • Rent & Sale
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
            <Link href="#featured-properties" className="text-slate-200 hover:text-amber-300 transition-colors">
              Properties
            </Link>
            <Link href="#builder-floors" className="text-slate-200 hover:text-amber-300 transition-colors">
              Builder Floors
            </Link>
            <Link href="#luxury-flats" className="text-slate-200 hover:text-amber-300 transition-colors">
              Flats
            </Link>
            <Link href="#rental-deals" className="text-slate-200 hover:text-amber-300 transition-colors">
              Rent & Sale
            </Link>
            <Link href="#emi-calculator" className="text-slate-200 hover:text-amber-300 transition-colors">
              EMI Calculator
            </Link>
            <Link href="#sector-69-guide" className="text-slate-200 hover:text-amber-300 transition-colors">
              Sector 69 Guide
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenPostProperty}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs md:text-sm shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Post Property <span className="bg-slate-950 text-amber-300 text-[10px] uppercase px-1.5 py-0.5 rounded ml-1">Free</span></span>
            </button>

            <button
              onClick={onOpenSiteVisit}
              className="flex items-center gap-1.5 border border-amber-400/50 hover:bg-amber-400/10 text-amber-300 font-semibold px-3 py-2 rounded-lg text-xs md:text-sm transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Book Site Visit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07132c] border-t border-blue-900/60 px-4 py-4 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-blue-900/40">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPostProperty();
                }}
                className="flex items-center justify-center gap-1 bg-amber-500 text-slate-950 font-bold py-2 px-3 rounded-md text-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Property FREE</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSiteVisit();
                }}
                className="flex items-center justify-center gap-1 border border-amber-400/60 text-amber-300 font-semibold py-2 px-3 rounded-md text-xs"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Book Site Visit</span>
              </button>
            </div>

            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-200">
              <Link
                href="#featured-properties"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-amber-400"
              >
                All Properties
              </Link>
              <Link
                href="#builder-floors"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-amber-400"
              >
                Builder Floors in Sector 69
              </Link>
              <Link
                href="#luxury-flats"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-amber-400"
              >
                Flats & High-Rise Societies
              </Link>
              <Link
                href="#rental-deals"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-amber-400"
              >
                Rentals in Gurgaon
              </Link>
              <Link
                href="#emi-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-amber-400"
              >
                Home Loan EMI Calculator
              </Link>
              <Link
                href="#sector-69-guide"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-amber-400"
              >
                Sector 69 Locality Insights
              </Link>
            </nav>

            <div className="pt-2 border-t border-blue-900/40 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HRERA Verified Partner</span>
              </div>
              <a href={`tel:+91${phoneNumber}`} className="text-amber-400 font-bold">
                📞 {phoneNumber}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
