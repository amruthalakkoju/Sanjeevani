import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  CheckCircle, 
  Search, 
  PhoneCall, 
  FileText, 
  HelpCircle,
  Building,
  UserCheck
} from 'lucide-react';
import { CASHLESS_TPA_PARTNERS } from '../data/hospitalData';

export const AyushmanBharatSection: React.FC = () => {
  const [tpaSearch, setTpaSearch] = useState('');
  const [testAbhaInput, setTestAbhaInput] = useState('');
  const [abhaVerificationResult, setAbhaVerificationResult] = useState<string | null>(null);

  const filteredTpa = CASHLESS_TPA_PARTNERS.filter(p =>
    p.name.toLowerCase().includes(tpaSearch.toLowerCase()) ||
    p.type.toLowerCase().includes(tpaSearch.toLowerCase()) ||
    p.coverage.toLowerCase().includes(tpaSearch.toLowerCase())
  );

  const handleVerifyAbha = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = testAbhaInput.replace(/\D/g, '');
    if (cleaned.length === 14) {
      setAbhaVerificationResult(
        `✓ ABHA ID Verified: ${testAbhaInput} linked to National Health Authority (NHA) ABDM Registry. Active & eligible for fast-track cashless admission.`
      );
    } else {
      setAbhaVerificationResult('Please enter a valid 14-digit ABHA number (e.g. 14-1234-5678-9012)');
    }
  };

  return (
    <section id="ayushman" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 tracking-wider uppercase mb-1">
              Government Healthcare & Cashless Insurance Desk
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Ayushman Bharat (PM-JAY), CGHS & TPA Network
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Dedicated 24x7 Cashless Helpdesk for PM-JAY Golden Card holders, Central & State government schemes, and over 42 private health insurance providers.
            </p>
          </div>

          <div className="text-xs text-slate-700 bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-teal-700 shrink-0" />
            <div>
              <span className="font-semibold block">TPA & PM-JAY Dedicated Desk:</span>
              <span className="font-mono-data text-teal-800">+91 11 4050 9044 (Ext. 204)</span>
            </div>
          </div>
        </div>

        {/* Highlight Grid: PM-JAY Overview and ABHA verification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: PM-JAY Entitlements & Process */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
                <span>Ayushman Bharat (PM-JAY) Golden Card Privileges</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">₹5,00,000 Cashless Cover</span>
                  <p className="text-slate-600">Per family per annum for secondary & tertiary hospitalizations across all clinical departments.</p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">1,949 Surgical & Medical Packages</span>
                  <p className="text-slate-600">Includes cardiology, neurosurgery, orthopaedic joint replacement, oncology, and kidney care.</p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Zero Out-Of-Pocket Expenses</span>
                  <p className="text-slate-600">Diagnostics, medicines, ICU care, food, and post-discharge medicines for 15 days are included.</p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Pradhan Mantri Aarogya Mitra (PMAM)</span>
                  <p className="text-slate-600">Dedicated assistance counter right at the main reception for instant biometric verification.</p>
                </div>
              </div>

              {/* Step by step admission under Ayushman Bharat */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
                  Cashless Admission Workflow at Sanjeevani:
                </span>
                <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1 bg-white p-3.5 rounded-lg border border-slate-200">
                  <li><strong>Step 1:</strong> Present Golden Card / Aadhaar at PMAM Counter (Ground Floor, Room 12).</li>
                  <li><strong>Step 2:</strong> PMAM verifies eligibility on the National Health Authority (NHA) TMS portal.</li>
                  <li><strong>Step 3:</strong> Doctor initiates clinical assessment and pre-authorization is triggered online.</li>
                  <li><strong>Step 4:</strong> Cashless admission processed within 30 minutes with zero deposit required.</li>
                </ol>
              </div>
            </div>

            {/* ABHA Account Verification Tool */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-teal-700" />
                  <span>ABHA (Ayushman Bharat Health Account) Verification</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check if your 14-digit ABHA number is linked for paperless digital health records sharing.
                </p>
              </div>

              <form onSubmit={handleVerifyAbha} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter 14-digit ABHA number (e.g. 14-8891-2304-9912)"
                  value={testAbhaInput}
                  onChange={(e) => setTestAbhaInput(e.target.value)}
                  className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 font-mono-data text-slate-900 focus:outline-none focus:border-teal-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Verify ABHA Status
                </button>
              </form>

              {abhaVerificationResult && (
                <div className={`p-3 rounded-lg text-xs font-medium border ${
                  abhaVerificationResult.startsWith('✓') 
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}>
                  {abhaVerificationResult}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Searchable Empanelled TPAs & Insurers */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-teal-700" />
                <span>Empanelled Cashless TPA & Insurers</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Check whether your corporate or individual insurance policy has direct cashless approval.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search insurer e.g. Star Health, ICICI, CGHS..."
                value={tpaSearch}
                onChange={(e) => setTpaSearch(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>

            {/* List */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredTpa.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">No matching insurance provider found.</p>
              ) : (
                filteredTpa.map((tpa, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{tpa.name}</span>
                      <span className="text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                        {tpa.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-teal-700 font-medium">
                      Coverage: {tpa.coverage}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              * Need assistance with reimbursement claim paperwork? Visit our Insurance Helpdesk on Ground Floor (Counter 5).
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
