'use client';

import React, { useState, useId } from 'react';
import { Calculator, IndianRupee, Percent, Clock, CheckCircle2, MessageCircle } from 'lucide-react';

export default function EmiCalculator() {
  const loanAmountInputId = useId();
  const interestRateInputId = useId();
  const tenureInputId = useId();

  const [loanAmount, setLoanAmount] = useState(15000000); // 1.5 Cr
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years

  // EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const monthlyEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const principalPercentage = Math.round((loanAmount / totalPayment) * 100);
  const interestPercentage = 100 - principalPercentage;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const whatsappLoanUrl = `https://wa.me/919818014595?text=${encodeURIComponent(
    `Hi BlueStone Estates, I am calculating EMI for Loan: ${formatCurrency(
      loanAmount
    )} at ${interestRate}%. Please assist me with lowest home loan interest rates in Sector 69 Gurgaon.`
  )}`;

  return (
    <section id="emi-calculator" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Home Loan EMI Calculator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Plan your budget accurately for flats & builder floors in Sector 69, Gurgaon with pre-approved loans from top banks.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sliders Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={loanAmountInputId} className="text-xs font-bold uppercase text-slate-600 flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                  <span>Loan Amount</span>
                </label>
                <span className="text-base font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <input
                id={loanAmountInputId}
                type="range"
                min="1000000"
                max="50000000"
                step="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>₹10 Lakh</span>
                <span>₹2.5 Cr</span>
                <span>₹5.0 Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={interestRateInputId} className="text-xs font-bold uppercase text-slate-600 flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-amber-600" />
                  <span>Interest Rate (p.a.)</span>
                </label>
                <span className="text-base font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                  {interestRate}%
                </span>
              </div>
              <input
                id={interestRateInputId}
                type="range"
                min="7.0"
                max="12.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>7.0% (Best Rate)</span>
                <span>8.5% (Avg)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={tenureInputId} className="text-xs font-bold uppercase text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Loan Tenure</span>
                </label>
                <span className="text-base font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                id={tenureInputId}
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>5 Years</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Bank Tie-ups */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-500 mb-2">
                Partnered Banks for Instant Approvals:
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">SBI Bank</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">HDFC Bank</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">ICICI Bank</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">Axis Bank</span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">Kotak Bank</span>
              </div>
            </div>
          </div>

          {/* Results Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1B3D] to-[#122B5F] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-1">
                Estimated Monthly Payment
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-4">
                ₹{monthlyEmi.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-slate-300">/ month</span>
              </div>

              {/* Progress Breakdown Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                  <span>Principal: {principalPercentage}%</span>
                  <span>Interest: {interestPercentage}%</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-amber-400 h-full"
                    style={{ width: `${principalPercentage}%` }}
                  />
                  <div
                    className="bg-blue-400 h-full"
                    style={{ width: `${interestPercentage}%` }}
                  />
                </div>
              </div>

              {/* Key Totals */}
              <div className="space-y-2.5 text-xs border-t border-blue-900/60 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Principal Amount:</span>
                  <span className="font-bold text-amber-300">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Interest:</span>
                  <span className="font-bold text-blue-300">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between border-t border-blue-900/60 pt-2 text-sm">
                  <span className="text-slate-200 font-bold">Total Payment:</span>
                  <span className="font-black text-white">{formatCurrency(totalPayment)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-900/60 space-y-2">
              <a
                href={whatsappLoanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs transition shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Lowest Bank Rate on WhatsApp</span>
              </a>
              <div className="text-[11px] text-slate-300 text-center flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Processing Fee on Select Builder Floors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
