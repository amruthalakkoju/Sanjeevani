import React, { useState } from 'react';
import { 
  PhoneCall, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  Activity, 
  Heart, 
  Zap, 
  CheckCircle,
  Truck
} from 'lucide-react';

export const EmergencyTriageGuide: React.FC = () => {
  const [ambulanceRequested, setAmbulanceRequested] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [emergencyType, setEmergencyType] = useState('Cardiac / Chest Pain');

  const handleAmbulanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAmbulanceRequested(true);
  };

  return (
    <section id="emergency" className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>24x7 Level-1 Emergency & Trauma Care</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Golden Hour Triage & Critical Resuscitation
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Every second counts during acute medical emergencies. Our Red Zone triage protocols guarantee immediate consultant mobilization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:1066"
              className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              <span>Dial Emergency: 1066</span>
            </a>
          </div>
        </div>

        {/* 4 Emergency Protocol Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Heart Attack (STEMI) */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-800/50 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Door-to-Balloon &lt; 60 Mins</span>
              <h3 className="text-base font-bold text-white mt-0.5">Acute Heart Attack (STEMI)</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Immediate ECG transmission from ambulance to Cath Lab. Direct triage bypass for urgent primary angioplasty (PAMI) to restore coronary flow.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-700/50">
              <strong>Symptoms:</strong> Crushing chest heaviness radiating to left arm/jaw, cold sweat, breathlessness.
            </div>
          </div>

          {/* Card 2: Brain Stroke (FAST) */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Door-to-Needle &lt; 45 Mins</span>
              <h3 className="text-base font-bold text-white mt-0.5">Hyperacute Stroke Unit</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              24x7 emergency CT perfusion and MRI Brain. Intravenous thrombolysis (tissue plasminogen activator) and mechanical thrombectomy within 4.5 hours.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-700/50">
              <strong>FAST:</strong> Face drooping, Arm drift, Slurred speech, Time to call 1066 immediately.
            </div>
          </div>

          {/* Card 3: Polytrauma & Road Accidents */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Level-1 ATLS Protocol</span>
              <h3 className="text-base font-bold text-white mt-0.5">Polytrauma & Road Accidents</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dual emergency OT ready 24x7 with dedicated neurosurgeons, orthopaedic trauma specialists, thoracic surgeons, and a fully stocked blood bank.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-700/50">
              <strong>Equipped:</strong> Massive transfusion protocol (O-Negative immediate availability), ventilator triage.
            </div>
          </div>

          {/* Card 4: Snakebite & Toxic Envenomation */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-teal-950/60 border border-teal-800/50 flex items-center justify-center text-teal-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Tropical Emergency Protocol</span>
              <h3 className="text-base font-bold text-white mt-0.5">Snakebite & Toxins Desk</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Polyvalent Anti-Snake Venom (ASV) available round the clock. 20-minute whole blood clotting test (20WBCT), neuroparalysis ventilation, and neostigmine.
            </p>
            <div className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-700/50">
              <strong>Rule:</strong> Do NOT tie tight tourniquets or make cuts. Keep limb immobilized & rush to hospital.
            </div>
          </div>

        </div>

        {/* Rapid Ambulance Dispatch Section */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-900/40 rounded-lg border border-rose-700 text-rose-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Advanced Cardiac Life Support (ACLS) Ambulance Dispatch
                </h3>
                <p className="text-xs text-slate-400">
                  GPS-tracked mobile ICUs equipped with defibrillators, transport ventilators, and emergency physicians.
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Average City Arrival Time</span>
              <span className="text-lg font-mono-data font-bold text-teal-400">12 - 18 Minutes</span>
            </div>
          </div>

          {ambulanceRequested ? (
            <div className="p-4 bg-emerald-950/50 border border-emerald-700/50 rounded-lg text-emerald-200 text-xs space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>Ambulance Dispatched! Control Room Contacting: +91 {callerPhone}</span>
              </div>
              <p>Ambulance #SJH-EMS-04 is en route to: {pickupAddress}. Please keep patient in comfortable recovery position.</p>
            </div>
          ) : (
            <form onSubmit={handleAmbulanceSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Attendant / Caller Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile"
                  value={callerPhone}
                  onChange={(e) => setCallerPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono-data focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Pickup Address / Landmark *</label>
                <input
                  type="text"
                  required
                  placeholder="Apartment, Street, Landmark"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Emergency Nature</label>
                <select
                  value={emergencyType}
                  onChange={(e) => setEmergencyType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Cardiac / Chest Pain">Cardiac / Chest Pain</option>
                  <option value="Stroke / Paralysis">Stroke / Paralysis</option>
                  <option value="Road Accident / Trauma">Road Accident / Trauma</option>
                  <option value="Severe Breathlessness">Severe Breathlessness</option>
                  <option value="Pediatric Emergency">Pediatric Emergency</option>
                </select>
              </div>

              <div className="sm:col-span-2 md:col-span-4 flex items-center justify-between pt-2">
                <p className="text-[11px] text-slate-400">
                  * For immediate life-saving guidance, keep this call active while dispatch connects.
                </p>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Request Immediate Ambulance
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
