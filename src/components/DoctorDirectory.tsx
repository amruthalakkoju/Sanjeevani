import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  MapPin, 
  Languages, 
  Award, 
  CheckCircle, 
  Phone
} from 'lucide-react';
import { DOCTORS_DATA, Doctor } from '../data/hospitalData';

interface DoctorDirectoryProps {
  onOpenBooking: (doctorName?: string, department?: string) => void;
}

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({ onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const departments = [
    'All',
    'Cardiology & Cardiothoracic Sciences',
    'Neurology & Neurosurgery',
    'Medical & Surgical Oncology',
    'Orthopaedics & Joint Replacement',
    'Nephrology & Renal Transplant',
    'Gastroenterology & Hepatology',
    'Paediatrics & Neonatal Intensive Care',
    'Pulmonology, Allergy & Sleep Medicine',
  ];

  const languages = ['All', 'Hindi', 'English', 'Tamil', 'Bengali', 'Telugu', 'Punjabi', 'Malayalam'];

  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialityInterests.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
    const matchesLang = selectedLanguage === 'All' || doc.languages.includes(selectedLanguage);

    return matchesSearch && matchesDept && matchesLang;
  });

  // Initials generator for doctor card (No pictures)
  const getInitials = (name: string) => {
    return name
      .replace(/^Dr\.\s*/, '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2);
  };

  return (
    <section id="doctors" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 tracking-wider uppercase mb-1">
              Distinguished Medical Faculty
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Specialist Physicians & Surgeons
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Consult with senior clinicians trained at India's premier apex institutes (AIIMS, NIMHANS, PGIMER, TMH) and international centres of excellence.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono-data">
            Total Specialists: {DOCTORS_DATA.length} Available
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by doctor name, condition, or procedure..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-teal-600"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Specialities' : dept}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:border-teal-600"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'All' ? 'All Languages' : `Speaks ${lang}`}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Doctors Grid (No photos, clean typographic cards with initials avatar & detailed credentials) */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-sm font-semibold text-slate-700">No specialists matching your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try clearing search filters or changing the clinical department.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedDept('All'); setSelectedLanguage('All'); }}
              className="mt-3 px-3 py-1.5 bg-teal-700 text-white text-xs font-semibold rounded cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Top: Monogram Avatar & Basic Info */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold text-base font-mono-data shrink-0 shadow-2xs">
                      {getInitials(doc.name)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-teal-800 font-semibold mt-0.5">
                        {doc.designation}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {doc.department}
                      </p>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                      Qualifications:
                    </span>
                    <span className="text-slate-800 font-medium">
                      {doc.qualification}
                    </span>
                  </div>

                  {/* Metadata Row: Experience, OPD Room, Languages */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{doc.experienceYears}+ Years Clinical Experience</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-mono-data">{doc.opdRoom}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-mono-data">{doc.opdTimings}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{doc.languages.join(', ')}</span>
                    </div>
                  </div>

                  {/* Clinical Interests */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Key Clinical Focus:
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 flex-wrap">
                      {doc.specialityInterests.map((interest, i) => (
                        <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Card Footer: Fees & Booking Action */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">
                      OPD Fee
                    </span>
                    <span className="text-sm font-extrabold font-mono-data text-slate-900">
                      ₹{doc.consultationFee.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBooking(doc.name, doc.department)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book OPD Slot</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
