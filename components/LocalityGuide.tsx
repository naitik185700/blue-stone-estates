'use client';

import React from 'react';
import { MapPin, TrendingUp, Compass, Award, ShieldCheck, CheckCircle2, Building, Car, School, HeartPulse, ShoppingBag } from 'lucide-react';

export default function LocalityGuide() {
  return (
    <section id="sector-69-guide" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Gurgaon Micro-Market Spotlight</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Why Invest in Sector 69, Gurgaon?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            The prime corridor of Southern Peripheral Road (SPR) & Golf Course Extension Road offering unmatched infrastructure and luxury low-rise builder floors.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Connectivity */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Car className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Unrivaled Highway Connectivity
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Strategically located right off the 60-meter wide Southern Peripheral Road (SPR). Offers seamless non-stop signal-free drive to Golf Course Extension Road, Sohna Elevated Corridor, and NH-48.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>3 mins to SPR Expressway</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>15 mins to Golf Course Road</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>20 mins to Cyber City & Udyog Vihar</span>
              </li>
            </ul>
          </div>

          {/* Social Infrastructure */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <School className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Top Schools, Hospitals & Malls
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Surrounded by premier educational institutions, multi-specialty healthcare, and vibrant retail centers making it ideal for modern families.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>St. Xavier's & DPS International (5-8 mins)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Medanta & Park Hospital (10 mins)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Airia Mall & Elan Epic (4-6 mins)</span>
              </li>
            </ul>
          </div>

          {/* Capital Growth */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              High Capital Appreciation & Yield
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Sector 69 has witnessed over 24% annual capital growth driven by new metro expansion and high demand for independent builder floors with stilt parking and roof rights.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Strong rental yield (4.5% - 6.0%)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Low density luxury living</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>High demand for Stilt+4 floors</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Locality Quick Overview Banner */}
        <div className="bg-gradient-to-r from-[#0B1B3D] to-[#122B5F] text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              BlueStone Estates Micro-Market Desk
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Planning to Buy or Rent in Sector 69?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get an exclusive Sector 69 price trend report, upcoming floor launch catalog, and direct developer discounts.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:+919818014595"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-md"
            >
              Speak to Sector 69 Expert
            </a>
            <a
              href="https://wa.me/919818014595?text=Hi%20BlueStone%20Estates%2C%20please%20send%20me%20Sector%2069%20Gurgaon%20investment%20brochure%20and%20rates."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition"
            >
              WhatsApp Brochure
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
