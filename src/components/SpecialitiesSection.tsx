import React, { useState } from 'react';
import { 
  HeartPulse, 
  Activity, 
  ShieldAlert, 
  Bone, 
  Filter, 
  Stethoscope, 
  Baby, 
  Wind,
  Check, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { SPECIALITIES_DATA, Speciality } from '../data/hospitalData';

interface SpecialitiesSectionProps {
  onOpenBooking: (doctorName?: string, department?: string) => void;
}

export const SpecialitiesSection: React.FC<SpecialitiesSectionProps> = ({ onOpenBooking }) => {
  const [selectedSpeciality, setSelectedSpeciality] = useState<Speciality>(SPECIALITIES_DATA[0]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-indigo-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'Bone': return <Bone className="w-5 h-5 text-teal-600" />;
      case 'Filter': return <Filter className="w-5 h-5 text-cyan-600" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-emerald-600" />;
      case 'Baby': return <Baby className="w-5 h-5 text-pink-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-600" />;
      default: return <Activity className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="specialities" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        <div>
          <div className="text-xs font-semibold text-teal-800 tracking-wider uppercase mb-1">
            Centres of Clinical Excellence
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Quaternary Multi-Speciality Institutes
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            Each institute operates as an integrated clinical centre led by nationally recognized department heads, multidisciplinary tumor boards, and dedicated specialty ICUs.
          </p>
        </div>

        {/* Two-panel Interactive View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Department List / Selector */}
          <div className="lg:col-span-5 space-y-2">
            {SPECIALITIES_DATA.map((dept) => {
              const isSelected = selectedSpeciality.id === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedSpeciality(dept)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-white border-teal-600 shadow-sm text-slate-900'
                      : 'bg-white/70 border-slate-200 hover:bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-teal-50' : 'bg-slate-100'}`}>
                      {getIcon(dept.iconName)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${isSelected ? 'text-teal-900' : 'text-slate-800'}`}>
                        {dept.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {dept.procedures.slice(0, 2).join(' · ')}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-teal-700 translate-x-1' : 'text-slate-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Selected Speciality Deep-Dive Showcase (Zero Pictures, Pure Layout & Typography) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-teal-50 inline-block">
                  {getIcon(selectedSpeciality.iconName)}
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {selectedSpeciality.name}
                  </h3>
                  {selectedSpeciality.emergencyCare && (
                    <span className="text-xs font-semibold text-rose-700">
                      24x7 Emergency Protocols Available
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">
                {selectedSpeciality.shortDescription}
              </p>
            </div>

            {/* Department Head & Clinical Leadership */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 uppercase tracking-wide">
                <UserCheck className="w-4 h-4 text-teal-700" />
                <span>Clinical Department Leadership</span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {selectedSpeciality.hodName}
              </p>
              <p className="text-xs text-slate-500">
                Overseeing clinical protocols, morbidity review committees, and resident training under National Board of Examinations (NBE) guidelines.
              </p>
            </div>

            {/* Key Procedures & Surgeries */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Marquee Surgical & Diagnostic Capabilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedSpeciality.procedures.map((proc, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-start gap-2 text-xs text-slate-800"
                  >
                    <Check className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                    <span className="font-medium">{proc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span>OPD Consultations: Monday to Saturday</span>
                <span className="block text-slate-700 font-medium">Prior online booking recommended</span>
              </div>

              <button
                onClick={() => onOpenBooking(undefined, selectedSpeciality.name)}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Consult Speciality Doctor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
