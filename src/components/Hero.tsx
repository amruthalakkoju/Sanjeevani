import React, { useState } from 'react';
import { 
  Calendar, 
  Bed, 
  Activity, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Search,
  Sparkles,
  MapPin
} from 'lucide-react';
import { DOCTORS_DATA, LIVE_BED_INVENTORY, LIVE_OPD_TOKENS } from '../data/hospitalData';

interface HeroProps {
  onOpenBooking: (doctorName?: string, department?: string) => void;
  onOpenLabReports: () => void;
  onNavigateToSection: (sectionId: string) => void;
  language: 'en' | 'hi' | 'ta' | 'te';
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenLabReports,
  onNavigateToSection,
  language,
}) => {
  const [activeQuickTab, setActiveQuickTab] = useState<'appointment' | 'token' | 'beds' | 'reports'>('appointment');
  const [quickDoctorQuery, setQuickDoctorQuery] = useState('');
  const [quickDepartment, setQuickDepartment] = useState('All Departments');
  const [quickUhidInput, setQuickUhidInput] = useState('');

  // Total available beds calculation
  const totalBeds = LIVE_BED_INVENTORY.reduce((acc, curr) => acc + curr.totalBeds, 0);
  const totalAvailableBeds = LIVE_BED_INVENTORY.reduce((acc, curr) => acc + curr.availableBeds, 0);
  const totalIcuAvailable = LIVE_BED_INVENTORY
    .filter(b => b.category === 'Critical Care')
    .reduce((acc, curr) => acc + curr.availableBeds, 0);

  const departmentsList = [
    'All Departments',
    'Cardiology & Cardiothoracic Sciences',
    'Neurology & Neurosurgery',
    'Medical & Surgical Oncology',
    'Orthopaedics & Joint Replacement',
    'Nephrology & Renal Transplant',
    'Gastroenterology & Hepatology',
    'Paediatrics & Neonatal Intensive Care',
    'Pulmonology, Allergy & Sleep Medicine',
  ];

  const handleQuickDoctorSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(
      quickDoctorQuery ? quickDoctorQuery : undefined, 
      quickDepartment !== 'All Departments' ? quickDepartment : undefined
    );
  };

  return (
    <section className="relative bg-medical-grid pt-10 pb-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Accreditation and trust bar - Unboxed clean metadata as per skill guidelines */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
          <span className="text-teal-700 font-semibold tracking-wide">
            NABH Accredited Tertiary Network
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>NABL Certified Diagnostic Pathology</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Ayushman Bharat (PM-JAY) Empanelled</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>CGHS & ECHS Cashless Partner</span>
        </div>

        {/* Hero Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Hero Prose & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]" style={{ textWrap: 'balance' }}>
              Advanced Clinical Care. <br />
              <span className="text-teal-800">
                Transparent & Compassionate.
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
              Serving India with quaternary multi-speciality clinical excellence. Combining top surgical faculty from AIIMS, PGI, and Tata Memorial with instant OPD queue transparency, real-time bed tracking, and seamless Ayushman Bharat coverage.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-all hover:shadow flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Doctor Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateToSection('live-status')}
                className="px-5 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Bed className="w-4 h-4 text-teal-700" />
                <span>View Live Bed & OPD Status</span>
              </button>
            </div>

            {/* Real-world trust benchmarks (Claim-to-Proof Adjacency) */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold font-mono-data text-slate-900">
                  {totalAvailableBeds}
                  <span className="text-xs font-normal text-slate-500 font-sans ml-1">/ {totalBeds}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Beds Available Today</p>
              </div>

              <div>
                <p className="text-2xl font-bold font-mono-data text-teal-700">
                  {totalIcuAvailable}
                  <span className="text-xs font-normal text-slate-500 font-sans ml-1">ICU</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Critical Beds Vacant</p>
              </div>

              <div>
                <p className="text-2xl font-bold font-mono-data text-slate-900">
                  &lt; 4.2<span className="text-xs font-normal text-slate-500 font-sans ml-1">min</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Average ER Triage Time</p>
              </div>

              <div>
                <p className="text-2xl font-bold font-mono-data text-slate-900">
                  42+
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Cashless TPA Partners</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hospital Gateway Card (Pure CSS, No pictures) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              
              {/* Segmented Quick Action Tab Selector */}
              <div className="p-1 bg-slate-100 rounded-lg flex items-center gap-1 text-xs font-medium">
                <button
                  onClick={() => setActiveQuickTab('appointment')}
                  className={`flex-1 py-2 px-2.5 rounded-md transition-all text-center whitespace-nowrap cursor-pointer ${
                    activeQuickTab === 'appointment'
                      ? 'bg-white text-teal-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Quick Book
                </button>
                <button
                  onClick={() => setActiveQuickTab('token')}
                  className={`flex-1 py-2 px-2.5 rounded-md transition-all text-center whitespace-nowrap cursor-pointer ${
                    activeQuickTab === 'token'
                      ? 'bg-white text-teal-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Live Tokens
                </button>
                <button
                  onClick={() => setActiveQuickTab('beds')}
                  className={`flex-1 py-2 px-2.5 rounded-md transition-all text-center whitespace-nowrap cursor-pointer ${
                    activeQuickTab === 'beds'
                      ? 'bg-white text-teal-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Bed Matrix
                </button>
                <button
                  onClick={() => setActiveQuickTab('reports')}
                  className={`flex-1 py-2 px-2.5 rounded-md transition-all text-center whitespace-nowrap cursor-pointer ${
                    activeQuickTab === 'reports'
                      ? 'bg-white text-teal-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Reports
                </button>
              </div>

              {/* Tab 1: Quick Appointment Booking Form */}
              {activeQuickTab === 'appointment' && (
                <form onSubmit={handleQuickDoctorSearch} className="space-y-3.5 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Clinical Department
                    </label>
                    <select
                      value={quickDepartment}
                      onChange={(e) => setQuickDepartment(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-teal-600"
                    >
                      {departmentsList.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Doctor Name or Condition (Optional)
                    </label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Dr. Arvind, Chest Pain, Knee..."
                        value={quickDoctorQuery}
                        onChange={(e) => setQuickDoctorQuery(e.target.value)}
                        className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 text-xs text-slate-600 space-y-1">
                    <p className="font-medium text-slate-800 flex items-center justify-between">
                      <span>Standard OPD Consultation:</span>
                      <span className="font-mono-data font-bold text-teal-700">₹1,000 - ₹1,500</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Walk-in slots available from 09:00 AM. Free follow-up within 7 days.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Find Specialist & Choose Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Tab 2: Live OPD Tokens Preview */}
              {activeQuickTab === 'token' && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Live OPD Queue Tracking</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {LIVE_OPD_TOKENS.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-slate-900">{item.doctorName}</p>
                          <p className="text-[11px] text-slate-500">{item.department} · {item.roomNumber}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block">Current Token</span>
                          <span className="text-sm font-bold font-mono-data text-teal-700">
                            #{item.currentToken}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigateToSection('live-status')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors text-center block cursor-pointer"
                  >
                    View All Live Consultation Queues
                  </button>
                </div>
              )}

              {/* Tab 3: Bed Availability Matrix Preview */}
              {activeQuickTab === 'beds' && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Hospital Bed Availability</span>
                    <span className="text-teal-700 font-mono-data font-semibold">{totalAvailableBeds} Vacant</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div>
                        <span className="font-medium text-slate-800">Critical Care (ICU / CCU / SICU)</span>
                        <span className="text-[11px] text-slate-500 block">Ventilator equipped</span>
                      </div>
                      <span className="font-mono-data font-bold text-teal-700 text-sm">
                        {totalIcuAvailable} Beds
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div>
                        <span className="font-medium text-slate-800">General Wards (Male/Female)</span>
                        <span className="text-[11px] text-slate-500 block">Floor 2, Wing A & B</span>
                      </div>
                      <span className="font-mono-data font-bold text-slate-900 text-sm">
                        21 Beds
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div>
                        <span className="font-medium text-slate-800">Emergency Red Zone Triage</span>
                        <span className="text-[11px] text-slate-500 block">Ground Floor Resuscitation</span>
                      </div>
                      <span className="font-mono-data font-bold text-rose-600 text-sm">
                        7 Beds
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateToSection('live-status')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors text-center block cursor-pointer"
                  >
                    Open Complete Ward & Bed Breakdown
                  </button>
                </div>
              )}

              {/* Tab 4: Lab Reports Fast Lookup */}
              {activeQuickTab === 'reports' && (
                <div className="space-y-3 pt-1">
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800 block mb-1">Download Verified Diagnostic Reports</span>
                    Enter your 10-digit mobile number or Hospital UHID to view pathology & radiology results.
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      UHID or Registered Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SJH-8821 or 9876543210"
                      value={quickUhidInput}
                      onChange={(e) => setQuickUhidInput(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Quick Sample UHIDs: 
                    <button 
                      type="button" 
                      onClick={() => setQuickUhidInput('SJH-8821')}
                      className="ml-1 text-teal-700 underline font-mono-data cursor-pointer"
                    >
                      SJH-8821
                    </button>
                    <span className="mx-1">·</span>
                    <button 
                      type="button" 
                      onClick={() => setQuickUhidInput('SJH-4402')}
                      className="text-teal-700 underline font-mono-data cursor-pointer"
                    >
                      SJH-4402
                    </button>
                  </div>

                  <button
                    onClick={onOpenLabReports}
                    className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Access Lab Portal</span>
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
