import React from 'react';
import { Phone, MapPin, ShieldCheck, Mail, Globe, Heart } from 'lucide-react';
import { HOSPITAL_CAMPUSES } from '../data/hospitalData';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenLabReports: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onOpenBooking,
  onOpenLabReports,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Top Row: Brand & Main Helplines */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center font-bold text-white text-sm">
                +
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Sanjeevani Super Speciality Hospital
              </span>
            </div>
            <p className="text-slate-400 mt-1 max-w-xl">
              Tertiary Care & Research Institute · NABH & NABL Accredited · Providing comprehensive, equitable, and evidence-grounded healthcare across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">24x7 Trauma Hotline</span>
              <a href="tel:1066" className="text-base font-bold text-rose-400 font-mono-data hover:underline">
                1066 / +91 11 4050 9000
              </a>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Ayushman Bharat Desk</span>
              <span className="text-sm font-bold text-teal-400 font-mono-data">
                +91 11 4050 9044
              </span>
            </div>
          </div>
        </div>

        {/* Campuses across India (Delhi-NCR, Bengaluru, Hyderabad, Mumbai) */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
            Apex Hospital Campuses Across India
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOSPITAL_CAMPUSES.map((campus, idx) => (
              <div key={idx} className="space-y-2 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-white text-xs">{campus.city}</h5>
                  <span className="text-[10px] text-teal-400 font-mono-data">{campus.beds}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {campus.address}
                </p>
                <p className="text-slate-500 text-[10px]">
                  Landmark: {campus.metroLandmark}
                </p>
                <div className="pt-1 text-[11px] font-mono-data text-slate-300">
                  <span>Emergency: </span>
                  <a href={`tel:${campus.emergencyHotline}`} className="hover:text-rose-400">
                    {campus.emergencyHotline}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links & Clinical Wings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-800/80 text-slate-400">
          <div>
            <h5 className="font-bold text-white mb-2.5">Clinical Specialities</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigateToSection('specialities')} className="hover:text-white">Cardiothoracic Sciences</button></li>
              <li><button onClick={() => onNavigateToSection('specialities')} className="hover:text-white">Neurology & Stroke Unit</button></li>
              <li><button onClick={() => onNavigateToSection('specialities')} className="hover:text-white">Surgical Oncology & BMT</button></li>
              <li><button onClick={() => onNavigateToSection('specialities')} className="hover:text-white">Robotic Joint Replacement</button></li>
              <li><button onClick={() => onNavigateToSection('specialities')} className="hover:text-white">Nephrology & Renal Transplant</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2.5">Patient Services</h5>
            <ul className="space-y-1.5">
              <li><button onClick={onOpenBooking} className="hover:text-white">Book OPD Appointment</button></li>
              <li><button onClick={() => onNavigateToSection('live-status')} className="hover:text-white">Live OPD Token Tracker</button></li>
              <li><button onClick={() => onNavigateToSection('live-status')} className="hover:text-white">Live Bed Availability</button></li>
              <li><button onClick={onOpenLabReports} className="hover:text-white">Download Pathology Reports</button></li>
              <li><button onClick={() => onNavigateToSection('packages')} className="hover:text-white">Aarogya Health Checkups</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2.5">Government Schemes</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigateToSection('ayushman')} className="hover:text-white">Ayushman Bharat (PM-JAY)</button></li>
              <li><button onClick={() => onNavigateToSection('ayushman')} className="hover:text-white">ABHA Digital Health ID</button></li>
              <li><button onClick={() => onNavigateToSection('ayushman')} className="hover:text-white">CGHS & ECHS Cashless</button></li>
              <li><button onClick={() => onNavigateToSection('ayushman')} className="hover:text-white">Cashless TPA Empanelment</button></li>
              <li><span className="text-slate-500">Pradhan Mantri National Dialysis</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2.5">Statutory & Governance</h5>
            <ul className="space-y-1.5 text-[11px]">
              <li><span className="text-slate-400">NABH Certificate: NABH-2024-0891</span></li>
              <li><span className="text-slate-400">NABL Lab Cert: MC-2089</span></li>
              <li><span className="text-slate-400">Bio-Medical Waste Compliance 2026</span></li>
              <li><span className="text-slate-400">Patient Rights & Responsibilities</span></li>
              <li><span className="text-slate-400">NOTTO Organ Donation Registry</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Quiet Note */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Sanjeevani Super Speciality Hospital & Research Institute. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Clinical Establishments Act Reg: CEA-DL-2018-0914</span>
            <span>·</span>
            <span>Emergency Toll-Free: 1066</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
