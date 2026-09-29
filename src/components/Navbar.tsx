import React, { useState } from 'react';
import { 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  Menu, 
  X, 
  FileText, 
  Bed, 
  Activity, 
  CreditCard,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (doctorName?: string, department?: string) => void;
  onOpenLabReports: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  language: 'en' | 'hi' | 'ta' | 'te';
  onChangeLanguage: (lang: 'en' | 'hi' | 'ta' | 'te') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenLabReports,
  activeSection,
  onNavigate,
  language,
  onChangeLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'specialities', label: language === 'hi' ? 'विशेषताएं' : 'Specialities' },
    { id: 'doctors', label: language === 'hi' ? 'विशेषज्ञ डॉक्टर' : 'Doctors' },
    { id: 'live-status', label: language === 'hi' ? 'लाइव ओपीडी व बेड' : 'Live OPD & Beds' },
    { id: 'packages', label: language === 'hi' ? 'स्वास्थ्य पैकेज' : 'Health Packages' },
    { id: 'ayushman', label: language === 'hi' ? 'आयुष्मान भारत' : 'PM-JAY & Insurance' },
    { id: 'calculators', label: language === 'hi' ? 'स्वास्थ्य कैलकुलेटर' : 'Health Calculators' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Topmost Clinical & Emergency Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-rose-400 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> 24x7 Emergency & Trauma:
              </span>
              <a href="tel:1066" className="font-mono-data font-bold text-white hover:text-rose-300 tracking-wider">
                1066 (National Toll-Free)
              </a>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <a href="tel:+911140509000" className="font-mono-data text-slate-300 hover:text-white hidden sm:inline">
                +91 11 4050 9000
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-slate-400">
              <span>·</span>
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> NABH & NABL Accredited Apex Hospital
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenLabReports}
              className="text-teal-300 hover:text-teal-100 flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>Lab Reports Portal</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Language Selector */}
            <div className="flex items-center gap-1 text-slate-300">
              <span className="text-slate-400 hidden sm:inline">Language:</span>
              <select 
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value as any)}
                className="bg-slate-800 text-slate-200 text-xs rounded px-2 py-0.5 border border-slate-700 focus:outline-none focus:border-teal-500 cursor-pointer"
                aria-label="Select website language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Row - Following 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single element wordmark brand title */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          {/* Medical SVG geometric symbol (No pictures) */}
          <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <rect x="9" y="3" width="6" height="18" rx="1" />
              <rect x="3" y="9" width="18" height="6" rx="1" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
              Sanjeevani
            </span>
            <span className="text-[11px] block font-medium tracking-wide text-teal-700 -mt-0.5">
              Super Speciality Hospital
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (single line, subtle hover) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-colors hover:text-teal-700 cursor-pointer py-1 relative ${
                activeSection === link.id ? 'text-teal-700 font-semibold' : ''
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('emergency')}
            className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-rose-600" />
            <span>Emergency 24x7</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book OPD Appointment</span>
          </button>
        </div>

        {/* Mobile menu hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === link.id
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-teal-700 rounded-lg text-center shadow-sm"
            >
              Book OPD Appointment
            </button>
            <button
              onClick={() => {
                onOpenLabReports();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg text-center"
            >
              Diagnostic Lab Reports
            </button>
            <a
              href="tel:1066"
              className="w-full py-2 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg text-center block"
            >
              Call Emergency Helpline 1066
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
