import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Coffee, 
  Calendar, 
  HelpCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { HEALTH_PACKAGES, HealthPackage } from '../data/hospitalData';

interface HealthPackagesSectionProps {
  onBookPackage: (packageName: string) => void;
}

export const HealthPackagesSection: React.FC<HealthPackagesSectionProps> = ({ onBookPackage }) => {
  const [selectedPkg, setSelectedPkg] = useState<HealthPackage>(HEALTH_PACKAGES[1]); // Default to Cardiac Screen

  return (
    <section id="packages" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 tracking-wider uppercase mb-1">
              Preventive Healthcare & Longevity
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Aarogya Preventive Health Checkups
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Early detection prevents acute cardiac, metabolic, and oncological events. Includes comprehensive pathology, radiology, and one-on-one specialist reviews.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-white border border-slate-200 p-3 rounded-lg flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Fast for 10-12 hours prior to appointment. Complimentary breakfast provided.</span>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HEALTH_PACKAGES.map((pkg) => {
            const isSelected = selectedPkg.id === pkg.id;
            const discountPercent = Math.round(
              ((pkg.originalPriceInr - pkg.priceInr) / pkg.originalPriceInr) * 100
            );

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between cursor-pointer relative ${
                  isSelected
                    ? 'border-teal-600 ring-2 ring-teal-600/10 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {pkg.id === 'aarogya-cardiac' && (
                  <span className="absolute -top-3 left-4 bg-teal-800 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-xs">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {pkg.targetAudience}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold font-mono-data text-slate-900">
                        ₹{pkg.priceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-mono-data">
                        ₹{pkg.originalPriceInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-teal-800 font-semibold mt-1">
                      <span>{pkg.testsCount} Diagnostic Tests</span>
                      <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Save {discountPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Fasting & Duration */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Duration: {pkg.durationHours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Coffee className="w-3.5 h-3.5 text-slate-400" />
                      <span>{pkg.fastingRequired ? '12-Hr Overnight Fasting' : 'No Fasting'}</span>
                    </div>
                  </div>

                  {/* Key Tests Preview */}
                  <div className="space-y-1.5 border-t border-slate-100 pt-3">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                      Includes Investigations:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {pkg.keyTests.slice(0, 4).map((test, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-tight">
                          <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{test}</span>
                        </li>
                      ))}
                      {pkg.keyTests.length > 4 && (
                        <li className="text-[11px] text-teal-700 font-medium pl-5">
                          + {pkg.keyTests.length - 4} more specialized tests
                        </li>
                      )}
                    </ul>
                  </div>

                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookPackage(pkg.title);
                    }}
                    className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-teal-700 hover:bg-teal-800 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Selected Package Detailed Deep Dive */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-semibold text-teal-800 uppercase tracking-wide">
                Comprehensive Test Breakdown
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {selectedPkg.title} ({selectedPkg.testsCount} Clinical Parameters)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedPkg.recommendedFor}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Special Package Price</span>
                <span className="text-xl font-extrabold font-mono-data text-slate-900">
                  ₹{selectedPkg.priceInr.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => onBookPackage(selectedPkg.title)}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Book This Package
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedPkg.keyTests.map((t, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <span className="font-medium text-slate-800">{t}</span>
              </div>
            ))}
          </div>

          {/* Pre-Test Guidelines Banner */}
          <div className="p-4 bg-teal-50/60 rounded-lg border border-teal-100 text-xs text-slate-700 space-y-1">
            <p className="font-bold text-teal-900">Instructions for Patients on Checkup Day:</p>
            <p>1. Fast overnight (10 to 12 hours). Do not consume tea, coffee, milk, or juices in the morning. Plain water is permitted.</p>
            <p>2. Please report between 07:30 AM to 09:30 AM at the Health Check Lounge, 2nd Floor.</p>
            <p>3. If you take blood pressure or cardiac medications, please take them as advised with a sip of water.</p>
            <p>4. Comprehensive digital reports are uploaded to your patient portal within 6 hours of completion.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
