'use client';

import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2, PhoneCall, Sparkles, Handshake, Key } from 'lucide-react';

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The BlueStone Edge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Why Buy & Rent Through BlueStone Estates?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            We operate on an honest, transparent model inspired by modern tech-enabled brokerages like Regrob—bridging online discovery with on-ground local trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Best Deals Guaranteed</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We negotiate directly with top builders and verified owners, eliminating unnecessary layers and guaranteeing the most competitive price in Sector 69.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <div className="w-12 h-12 rounded-xl bg-blue-400/20 text-blue-300 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">100% RERA & Legal Check</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every builder floor and apartment is vetted for sanction plans, DTCP approvals, and complete non-encumbrance before listing.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-4">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Flats & Builder Floors</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Specialized inventory of 200, 300 & 500 Sq. Yd. builder floors with private lift access, stilt car parking, and exclusive roof terrace rights.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
            <div className="w-12 h-12 rounded-xl bg-purple-400/20 text-purple-300 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">End-to-End Handholding</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              From free doorstep cab site visits to home loan disbursal and registry paperwork, our dedicated relationship manager is with you at every step.
            </p>
          </div>
        </div>

        {/* Numbers Ribbon */}
        <div className="mt-12 bg-gradient-to-r from-[#0B1B3D] via-[#162E66] to-[#0B1B3D] rounded-2xl p-6 border border-amber-400/30 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">1000+</div>
            <div className="text-xs text-slate-300 mt-1">Families Settled in Gurgaon</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">150+</div>
            <div className="text-xs text-slate-300 mt-1">Active Sector 69 Listings</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">100%</div>
            <div className="text-xs text-slate-300 mt-1">RERA Legal Compliance</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">15 Mins</div>
            <div className="text-xs text-slate-300 mt-1">Response Guarantee (9818014595)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
