import React, { useState } from 'react';
import { 
  X, 
  Search, 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_LAB_REPORTS, LabReportRecord } from '../data/hospitalData';

interface LabReportViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabReportViewerModal: React.FC<LabReportViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchInput, setSearchQuery] = useState('SJH-8821');
  const [activeReport, setActiveReport] = useState<LabReportRecord | null>(SAMPLE_LAB_REPORTS['SJH-8821']);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchInput.trim().toUpperCase();
    
    if (SAMPLE_LAB_REPORTS[query]) {
      setActiveReport(SAMPLE_LAB_REPORTS[query]);
    } else if (query.includes('4402') || query === '9876543210') {
      setActiveReport(SAMPLE_LAB_REPORTS['SJH-4402']);
    } else if (query.includes('8821') || query === '9811223344') {
      setActiveReport(SAMPLE_LAB_REPORTS['SJH-8821']);
    } else {
      setErrorMessage(`No verified lab report found for "${searchInput}". Please check UHID or select a sample report below.`);
      setActiveReport(null);
    }
  };

  const handleSelectPreset = (uhid: string) => {
    setSearchQuery(uhid);
    setActiveReport(SAMPLE_LAB_REPORTS[uhid]);
    setErrorMessage('');
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
              LAB
            </div>
            <div>
              <h2 className="text-base font-bold">
                Online Diagnostic & Pathology Reports Portal
              </h2>
              <p className="text-[11px] text-slate-400">
                NABL Accredited Central Laboratory · Sanjeevani Institute
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Lookup Bar */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 space-y-3 no-print">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Hospital UHID (e.g. SJH-8821) or Registered Mobile Number..."
                value={searchInput}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600 font-mono-data"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Fetch Report
            </button>
          </form>

          {/* Preset Buttons for easy demo */}
          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <span>Quick Sample Reports:</span>
            <button
              type="button"
              onClick={() => handleSelectPreset('SJH-8821')}
              className={`px-2.5 py-1 rounded text-xs font-mono-data border cursor-pointer transition-colors ${
                activeReport?.uhid === 'SJH-8821'
                  ? 'bg-teal-100 text-teal-800 border-teal-300 font-semibold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              SJH-8821 (Sunil Sharma - Cardio/Lipid Profile)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPreset('SJH-4402')}
              className={`px-2.5 py-1 rounded text-xs font-mono-data border cursor-pointer transition-colors ${
                activeReport?.uhid === 'SJH-4402'
                  ? 'bg-teal-100 text-teal-800 border-teal-300 font-semibold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              SJH-4402 (Priya Venkatesh - Hemogram & Thyroid)
            </button>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
              {errorMessage}
            </p>
          )}
        </div>

        {/* Report Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {activeReport ? (
            <div id="printable-document" className="bg-white border-2 border-slate-900 rounded-xl p-6 space-y-5 text-slate-900">
              
              {/* Report Header Letterhead */}
              <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-slate-900">
                    Sanjeevani Central Diagnostic Laboratories
                  </h3>
                  <p className="text-xs text-slate-600">
                    NABL Certificate No: MC-2089 · ISO 15189:2022 Certified
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono-data">
                    Department of Pathology, Biochemistry & Molecular Diagnostics
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase bg-teal-800 text-white px-2 py-0.5 rounded">
                    VERIFIED FINAL REPORT
                  </span>
                  <p className="text-xs font-mono-data text-slate-600 mt-1">
                    Report ID: LAB-{activeReport.uhid.replace('SJH-', '')}
                  </p>
                </div>
              </div>

              {/* Patient Information Grid */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Patient Name:</span>
                  <span className="font-bold text-slate-900">{activeReport.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">UHID:</span>
                  <span className="font-extrabold font-mono-data text-teal-800">{activeReport.uhid}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Age / Gender:</span>
                  <span className="font-medium text-slate-800">{activeReport.age} Yrs / {activeReport.gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Referred By:</span>
                  <span className="font-semibold text-slate-800">{activeReport.referredBy}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Sample Collected:</span>
                  <span className="font-mono-data text-slate-700">{activeReport.sampleCollectedDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Report Approved:</span>
                  <span className="font-mono-data text-slate-700">{activeReport.reportDate}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block text-[10px] uppercase">Test Profile:</span>
                  <span className="font-bold text-slate-900">{activeReport.testCategory}</span>
                </div>
              </div>

              {/* Clinical Results Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-800 uppercase font-bold border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Test Investigation Parameter</th>
                      <th className="py-2.5 px-3 text-right">Observed Value</th>
                      <th className="py-2.5 px-3">Unit</th>
                      <th className="py-2.5 px-3">Biological Reference Interval</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeReport.results.map((r, idx) => {
                      const isAbnormal = r.flag === 'High' || r.flag === 'Low' || r.flag === 'Critical';
                      return (
                        <tr key={idx} className={isAbnormal ? 'bg-amber-50/50' : 'hover:bg-slate-50'}>
                          <td className="py-2 px-3 font-medium text-slate-900">
                            {r.parameter}
                          </td>
                          <td className={`py-2 px-3 text-right font-mono-data font-bold ${
                            isAbnormal ? 'text-amber-800 text-sm' : 'text-slate-800'
                          }`}>
                            {r.value}
                          </td>
                          <td className="py-2 px-3 font-mono-data text-slate-500">
                            {r.unit}
                          </td>
                          <td className="py-2 px-3 text-slate-600 font-mono-data text-[11px]">
                            {r.referenceRange}
                          </td>
                          <td className="py-2 px-3 text-center">
                            {r.flag === 'Normal' ? (
                              <span className="text-emerald-700 font-semibold text-[11px]">
                                Normal
                              </span>
                            ) : (
                              <span className="font-bold text-amber-800 text-[11px] bg-amber-100 px-1.5 py-0.5 rounded">
                                {r.flag}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* End of Report Authentication */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <p className="text-[11px] text-slate-500">
                    * Results relate only to the items tested. Please correlate clinically with treating doctor.
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono-data mt-0.5">
                    Instrument: Roche Cobas Pro / Beckman Coulter DxH 900 · Fully Automated Track
                  </p>
                </div>

                <div className="text-right sm:text-right shrink-0">
                  <div className="font-mono-data font-semibold text-slate-900 border-b border-slate-400 pb-1 inline-block">
                    [Digitally Signed by Pathologist]
                  </div>
                  <p className="font-bold text-slate-900 text-xs mt-1">
                    {activeReport.consultantPathologist}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Consultant Pathologist & Lab Director
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">
              Please enter a valid UHID or choose a sample report above.
            </div>
          )}

          {/* Action Row */}
          {activeReport && (
            <div className="flex items-center justify-end gap-3 no-print pt-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print NABL Diagnostic Report</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
