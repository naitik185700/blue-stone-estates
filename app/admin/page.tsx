'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, Building2, Phone, MessageCircle, Calendar, PlusCircle,
  CheckCircle2, Clock, Search, ArrowLeft, RefreshCw, Database, Filter
} from 'lucide-react';
import { Inquiry, PropertySubmission, Property } from '@/lib/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'submissions' | 'addProperty'>('inquiries');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [submissions, setSubmissions] = useState<PropertySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New property form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('builder_floor');
  const [newIntent, setNewIntent] = useState('sale');
  const [newPrice, setNewPrice] = useState('');
  const [newPriceDisplay, setNewPriceDisplay] = useState('');
  const [newBhk, setNewBhk] = useState('3');
  const [newAreaSqft, setNewAreaSqft] = useState('2000');
  const [newLocation, setNewLocation] = useState('Sector 69, Gurgaon');
  const [newDescription, setNewDescription] = useState('');
  const [addPropertySuccess, setAddPropertySuccess] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resInq, resSub] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/submit-property'),
      ]);

      const dataInq = await resInq.json();
      const dataSub = await resSub.json();

      if (dataInq.success) setInquiries(dataInq.data);
      if (dataSub.success) setSubmissions(dataSub.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
          tagline: 'Exclusive BlueStone Estates Listing in Sector 69',
          type: newType,
          intent: newIntent,
          price: Number(newPrice),
          priceDisplay: newPriceDisplay || `₹${(Number(newPrice) / 10000000).toFixed(2)} Cr`,
          pricePerSqft: Math.round(Number(newPrice) / Number(newAreaSqft || 1000)),
          bhk: Number(newBhk),
          bathrooms: Number(newBhk),
          balconies: Number(newBhk),
          areaSqft: Number(newAreaSqft),
          floor: '1st Floor (Stilt + 4)',
          furnishing: 'Semi-Furnished',
          facing: 'North-East',
          location: newLocation,
          subLocality: 'Sector 69, Near Southern Peripheral Road',
          status: 'Ready to Move',
          possessionDate: 'Immediate',
          reraId: 'HRERA-PKL-GGM-2026',
          isFeatured: true,
          isHotDeal: true,
          isVerified: true,
          images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          ],
          description: newDescription || 'Exclusive premium property in Sector 69, Gurgaon.',
          highlights: ['Park Facing', 'Stilt Parking', 'Lift Access', 'Best Deals Guaranteed'],
          amenities: ['100% Power Backup', 'Lift', 'Security Guard', 'Covered Parking'],
          nearbyPlaces: [{ name: 'Southern Peripheral Road', distance: '300m', type: 'highway' }],
          agentName: 'BlueStone Senior Advisor',
          agentPhone: '9818014595',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAddPropertySuccess(true);
        setNewTitle('');
        setNewPrice('');
        setNewPriceDisplay('');
        setNewDescription('');
      }
    } catch (err) {
      console.error('Error creating property:', err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (statusFilter !== 'all' && inq.status !== statusFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        inq.name.toLowerCase().includes(q) ||
        inq.phone.toLowerCase().includes(q) ||
        (inq.propertyTitle && inq.propertyTitle.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Top Admin Header */}
      <header className="bg-[#0B1B3D] text-white py-4 px-6 shadow-md border-b border-blue-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 bg-blue-900/60 hover:bg-blue-900 rounded-lg text-slate-200 hover:text-white transition"
              title="Return to Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-amber-400/50 bg-[#061026] shrink-0">
              <img src="/bluestone-logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>BlueStone Estates</span>
                <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded uppercase">
                  CRM Portal
                </span>
              </h1>
              <p className="text-[11px] text-slate-300">
                Lead Management • Sector 69 Gurgaon Desk • Database Connected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-blue-950 px-3 py-1.5 rounded-lg border border-blue-800 text-slate-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>PostgreSQL / Persistent Store Active</span>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-slate-500">Total Client Leads</div>
              <div className="text-3xl font-black text-blue-950 mt-1">{inquiries.length}</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Callbacks & Site Visits</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-slate-500">Owner Submissions</div>
              <div className="text-3xl font-black text-amber-700 mt-1">{submissions.length}</div>
              <div className="text-[11px] text-amber-600 font-semibold mt-0.5">Post Property Free</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-slate-500">Contact Number</div>
              <div className="text-2xl font-black text-slate-900 mt-1">9818014595</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Sector 69, Gurgaon Direct Line</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Client Inquiries & Site Visits ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'submissions'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Owner Submissions ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('addProperty')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'addProperty'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            + Add New Property Listing
          </button>
        </div>

        {/* Tab 1: Client Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {/* Filter Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search lead by Name, Phone, or Property..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs border border-slate-300 rounded-xl px-3 py-2 bg-white focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New Leads</option>
                  <option value="Site Visit Fixed">Site Visit Fixed</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Inquiries Table / Cards */}
            {filteredInquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <div className="font-bold text-sm">No inquiries found</div>
                <div className="text-xs text-slate-400">Inquiries submitted on the website will appear here in real time.</div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => {
                  const leadWhatsappUrl = `https://wa.me/91${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${inq.name}, this is BlueStone Estates (Sector 69, Gurgaon). Reaching out regarding your inquiry for "${inq.propertyTitle || 'properties in Sector 69'}". How can we assist you?`
                  )}`;

                  return (
                    <div
                      key={inq.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col md:flex-row justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-black text-sm text-slate-900">{inq.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            inq.status === 'New'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {inq.status}
                          </span>
                          <span className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-semibold uppercase">
                            Type: {inq.inquiryType.replace('_', ' ')}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(inq.createdAt).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600">
                          <strong>Interested in:</strong> {inq.propertyTitle || 'General Sector 69 Query'}
                        </div>

                        {inq.preferredDate && (
                          <div className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 border border-amber-200">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Requested Visit Date: <strong>{inq.preferredDate}</strong> ({inq.preferredTime || 'Anytime'})</span>
                          </div>
                        )}

                        {inq.message && (
                          <div className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg">
                            "{inq.message}"
                          </div>
                        )}
                      </div>

                      <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                        <a
                          href={`tel:+91${inq.phone}`}
                          className="flex items-center justify-center gap-1.5 bg-[#0B1B3D] text-amber-400 font-bold px-3 py-2 rounded-xl text-xs hover:bg-blue-900 transition"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call {inq.phone}</span>
                        </a>

                        <a
                          href={leadWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs hover:bg-emerald-700 transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Lead</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Owner Submissions */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
                <Building2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <div className="font-bold text-sm">No owner submissions yet</div>
                <div className="text-xs text-slate-400">Owners listing flats or builder floors via "Post Property FREE" will appear here.</div>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => {
                  const ownerWhatsappUrl = `https://wa.me/91${sub.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hi ${sub.ownerName}, BlueStone Estates received your property submission for ${sub.propertyType} in ${sub.location}. Let's discuss activating the listing.`
                  )}`;

                  return (
                    <div
                      key={sub.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col md:flex-row justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-black text-sm text-slate-900">{sub.ownerName}</span>
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase">
                            {sub.intent === 'sale' ? 'Selling' : 'Renting Out'}
                          </span>
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase">
                            {sub.propertyType}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(sub.createdAt).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="text-xs text-slate-700">
                          <strong>Location:</strong> {sub.location} • <strong>BHK:</strong> {sub.bhk} BHK •{' '}
                          <strong>Expected Price:</strong> <span className="font-bold text-blue-900">{sub.expectedPrice}</span>
                        </div>

                        {sub.notes && (
                          <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg italic">
                            "{sub.notes}"
                          </div>
                        )}
                      </div>

                      <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                        <a
                          href={`tel:+91${sub.phone}`}
                          className="flex items-center justify-center gap-1.5 bg-[#0B1B3D] text-amber-400 font-bold px-3 py-2 rounded-xl text-xs hover:bg-blue-900 transition"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Owner</span>
                        </a>

                        <a
                          href={ownerWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white font-bold px-3 py-2 rounded-xl text-xs hover:bg-emerald-700 transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Owner</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Add New Property Listing Form */}
        {activeTab === 'addProperty' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-3xl mx-auto">
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Add New Property to BlueStone Estates Database
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Inserts directly into PostgreSQL database (or local persistent store).
            </p>

            {addPropertySuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold">Property Published Successfully!</h4>
                <p className="text-xs text-slate-600">The listing is now live on the homepage and searchable by buyers.</p>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setAddPropertySuccess(false)}
                    className="bg-[#0B1B3D] text-amber-300 font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    Add Another Property
                  </button>
                  <Link
                    href="/"
                    className="border border-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs"
                  >
                    View on Website
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateProperty} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Luxury 3 BHK Builder Floor with Stilt in Sector 69"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Type
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="builder_floor">Builder Floor</option>
                      <option value="flat">High-Rise Flat</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="commercial">Commercial Shop</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Intent
                    </label>
                    <select
                      value={newIntent}
                      onChange={(e) => setNewIntent(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      BHK
                    </label>
                    <select
                      value={newBhk}
                      onChange={(e) => setNewBhk(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                    >
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Numeric Price (INR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 18500000"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Display Price (e.g. ₹1.85 Cr)
                    </label>
                    <input
                      type="text"
                      value={newPriceDisplay}
                      onChange={(e) => setNewPriceDisplay(e.target.value)}
                      placeholder="e.g. ₹1.85 Cr"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Area (Sq.Ft)
                    </label>
                    <input
                      type="number"
                      value={newAreaSqft}
                      onChange={(e) => setNewAreaSqft(e.target.value)}
                      placeholder="e.g. 2040"
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Sector 69, Gurgaon"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Description & Specifications
                  </label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Enter detailed description, Italian marble, modular kitchen, parking details..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B1B3D] hover:bg-blue-900 text-amber-300 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Property to Database</span>
                </button>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
