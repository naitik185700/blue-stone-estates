'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Vikram & Neha Sharma',
      role: 'Homeowners, 3 BHK Builder Floor',
      location: 'Sector 69, Gurgaon',
      review:
        'BlueStone Estates made buying our first builder floor completely seamless! We got a park-facing 3 BHK on 204 sq yds with stilt parking at a price well below developer quotes. Their Best Deals Guaranteed claim is genuinely real.',
      rating: 5,
      date: 'October 2026',
    },
    {
      name: 'Rajesh Singhal',
      role: 'Commercial Investor',
      location: 'Southern Peripheral Road',
      review:
        'I invested in a ground floor retail shop in Sector 69 through BlueStone Estates. Their team provided genuine rental yield projections and handled all the documentation cleanly. Highly recommended for Gurgaon real estate!',
      rating: 5,
      date: 'September 2026',
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Tenant (Senior Director, MNC)',
      location: 'Tulip Society, Sector 69',
      review:
        'Relocated from Bengaluru to Gurgaon and needed a safe, gated 3 BHK flat on rent. BlueStone Estates arranged a cab visit on the same day and helped me finalize lease agreement without any hassle.',
      rating: 5,
      date: 'August 2026',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5 text-amber-600" />
            <span>Verified Client Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Trusted by Gurgaon Homebuyers & Investors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Read what our clients say about their property buying and renting journey with BlueStone Estates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.role} • {t.location}</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
