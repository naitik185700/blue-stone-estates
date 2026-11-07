'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Mail, ShieldCheck, Clock, Building2, ChevronRight } from 'lucide-react';

interface FooterProps {
  onOpenPostProperty: () => void;
  onOpenSiteVisit: () => void;
}

export default function Footer({ onOpenPostProperty, onOpenSiteVisit }: FooterProps) {
  const phoneNumber = '9818014595';
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    'Hi BlueStone Estates, I am reaching out from your website. Please share latest flats and builder floor deals in Sector 69 Gurgaon.'
  )}`;

  return (
    <footer className="bg-[#07132c] text-white pt-16 pb-24 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-blue-900/50">
          {/* Column 1: Brand & Logo Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-lg bg-[#061026] shrink-0">
                <img
                  src="/bluestone-logo.jpg"
                  alt="BlueStone Estates Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  BlueStone <span className="text-amber-400">Estates</span> 🏢
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Flats • Builder Floors • Rent & Sale
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Gurgaon’s premier real estate consultancy specializing in luxury independent builder floors, high-rise gated societies, and prime commercial properties in Sector 69 & Southern Peripheral Road.
            </p>

            <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 text-xs text-amber-300 font-semibold">
              👉 “Best Deals Guaranteed”
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Explore Real Estate</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <Link href="#featured-properties" className="hover:text-amber-300 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured Properties in Sector 69</span>
                </Link>
              </li>
              <li>
                <Link href="#builder-floors" className="hover:text-amber-300 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Independent Builder Floors (Stilt + 4)</span>
                </Link>
              </li>
              <li>
                <Link href="#luxury-flats" className="hover:text-amber-300 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Luxury High-Rise Society Flats</span>
                </Link>
              </li>
              <li>
                <Link href="#rental-deals" className="hover:text-amber-300 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rental Homes in Sector 69</span>
                </Link>
              </li>
              <li>
                <Link href="#emi-calculator" className="hover:text-amber-300 transition flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Home Loan EMI Calculator</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenPostProperty}
                  className="hover:text-amber-300 transition flex items-center gap-1 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Post Property FREE (Zero Brokerage)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Prime Localities in Gurgaon */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Key Micro-Markets</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-1 text-white font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Sector 69, Gurgaon (HQ)</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Southern Peripheral Road (SPR)</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Golf Course Extension Road</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Sector 70 & Sector 70A</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Sector 68 & Airia Mall Vicinity</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                <span>Sohna Elevated Corridor</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              <span>Reach BlueStone Office</span>
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Office:</strong> Sector 69, Near Southern Peripheral Road (SPR), Gurgaon, Haryana 122101
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Direct Call:</strong>{' '}
                  <a href={`tel:+91${phoneNumber}`} className="text-amber-400 font-bold hover:underline">
                    +91 {phoneNumber}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>WhatsApp:</strong>{' '}
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">
                    +91 {phoneNumber}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  <strong>Working Hours:</strong> Mon - Sun: 9:00 AM – 8:30 PM
                </span>
              </div>
            </div>

            <button
              onClick={onOpenSiteVisit}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs transition shadow-md cursor-pointer"
            >
              Book Free Site Visit & Cab
            </button>
          </div>
        </div>

        {/* Legal & RERA Disclaimer */}
        <div className="pt-8 text-[11px] text-slate-400 space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>RERA Registered Property Advisory • Haryana Real Estate Regulatory Authority</span>
            </div>
            <div>
              © {new Date().getFullYear()} BlueStone Estates. All rights reserved. Inspired by Regrob.
            </div>
          </div>
          <p className="text-slate-400 leading-normal">
            Disclaimer: BlueStone Estates is an independent real estate consultancy located in Sector 69, Gurgaon. All property specifications, layout plans, and pricing are subject to verification and availability. Contact us at 9818014595 for authorized developer deals.
          </p>
        </div>
      </div>
    </footer>
  );
}
