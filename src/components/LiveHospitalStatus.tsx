import React, { useState } from 'react';
import { 
  Bed, 
  Clock, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  Search, 
  Phone, 
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { LIVE_BED_INVENTORY, LIVE_OPD_TOKENS, OpdTokenStatus, WardBedInfo } from '../data/hospitalData';

interface LiveHospitalStatusProps {
  onOpenBooking: (doctorName?: string, department?: string) => void;
}

export const LiveHospitalStatus: React.FC<LiveHospitalStatusProps> = ({ onOpenBooking }) => {
  const [opdTokens, setOpdTokens] = useState<OpdTokenStatus[]>(LIVE_OPD_TOKENS);
  const [bedInventory, setBedInventory] = useState<WardBedInfo[]>(LIVE_BED_INVENTORY);
  const [selectedWardCategory, setSelectedWardCategory] = useState<string>('All');
  const [opdSearchQuery, setOpdSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [myTokenCheck, setMyTokenCheck] = useState('');
  const [tokenCheckResult, setTokenCheckResult] = useState<string | null>(null);

  // Manual simulation refresh to simulate real-time queue advancement
  const handleRefreshTokens = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setOpdTokens(prev => prev.map(item => {
        // randomly increment current token by 1 if not maxed out
        const shouldAdvance = Math.random() > 0.4 && item.currentToken < item.totalTokensIssued;
        const newCurrent = shouldAdvance ? item.currentToken + 1 : item.currentToken;
        return {
          ...item,
          currentToken: newCurrent,
          estimatedWaitMins: Math.max(5, item.estimatedWaitMins + (shouldAdvance ? -4 : 2)),
        };
      }));
      setIsRefreshing(false);
    }, 600);
  };

  const handleCheckMyToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!myTokenCheck) return;
    const tokenNum = parseInt(myTokenCheck.trim().replace(/\D/g, ''), 10);
    if (isNaN(tokenNum)) {
      setTokenCheckResult('Please enter a valid numeric token number (e.g. 35)');
      return;
    }

    // Find any room where token is greater than current
    const matchingQueues = opdTokens.filter(q => tokenNum >= q.currentToken && tokenNum <= q.totalTokensIssued);
    if (matchingQueues.length > 0) {
      const q = matchingQueues[0];
      const ahead = tokenNum - q.currentToken;
      setTokenCheckResult(`Token #${tokenNum} for ${q.doctorName} (${q.roomNumber}): Currently consulting #${q.currentToken}. Approximately ${ahead} patients ahead (est. ${ahead * 8} mins).`);
    } else {
      setTokenCheckResult(`Token #${tokenNum} status: Currently consulting in respective room. Please proceed to the nurse station.`);
    }
  };

  const filteredBeds = selectedWardCategory === 'All' 
    ? bedInventory 
    : bedInventory.filter(b => b.category === selectedWardCategory);

  const filteredOpd = opdTokens.filter(t => 
    t.doctorName.toLowerCase().includes(opdSearchQuery.toLowerCase()) ||
    t.department.toLowerCase().includes(opdSearchQuery.toLowerCase()) ||
    t.roomNumber.toLowerCase().includes(opdSearchQuery.toLowerCase())
  );

  const categories = ['All', 'Critical Care', 'General', 'Semi-Private', 'Private', 'Emergency'];

  const totalAvailableBeds = bedInventory.reduce((acc, curr) => acc + curr.availableBeds, 0);

  return (
    <section id="live-status" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 tracking-wider uppercase mb-1">
              NABH Real-Time Transparency
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Live OPD Queue & Bed Availability Matrix
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Track live consultation tokens across consultation chambers and check instant bed vacancies before emergency or elective admission.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshTokens}
              disabled={isRefreshing}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-700' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Live Status'}</span>
            </button>
            <div className="text-xs text-slate-500 font-mono-data">
              Updated: Just Now
            </div>
          </div>
        </div>

        {/* Part 1: Live OPD Token Counter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-heart-pulse" />
              <h3 className="text-lg font-bold text-slate-900">
                Today's Active OPD Consultations
              </h3>
            </div>

            {/* Quick Token Search by Patient */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter doctor or room..."
                  value={opdSearchQuery}
                  onChange={(e) => setOpdSearchQuery(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 w-48 sm:w-64 focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>
          </div>

          {/* Quick Check Specific Token Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
            <form onSubmit={handleCheckMyToken} className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">Check Your Token Position:</span>
              <input
                type="text"
                placeholder="Enter Token Number (e.g. 24)"
                value={myTokenCheck}
                onChange={(e) => setMyTokenCheck(e.target.value)}
                className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 w-44 focus:outline-none focus:border-teal-600"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded cursor-pointer transition-colors"
              >
                Track Position
              </button>
              {tokenCheckResult && (
                <span className="text-xs font-medium text-teal-900 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  {tokenCheckResult}
                </span>
              )}
            </form>
          </div>

          {/* OPD Token Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredOpd.map((opd, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-teal-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-medium text-teal-700 block">
                      {opd.department}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {opd.doctorName}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono-data text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {opd.roomNumber}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                      Currently Calling
                    </span>
                    <span className="text-2xl font-extrabold font-mono-data text-teal-800">
                      Token #{opd.currentToken}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                      Issued Today
                    </span>
                    <span className="text-sm font-bold font-mono-data text-slate-700">
                      {opd.totalTokensIssued} Total
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Est. Wait: ~{opd.estimatedWaitMins}m</span>
                  </span>
                  
                  <span className={`text-[11px] font-medium ${
                    opd.status === 'On Time' || opd.status === 'In Consultation'
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}>
                    {opd.status}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(opd.doctorName, opd.department)}
                  className="w-full py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded transition-colors text-center cursor-pointer"
                >
                  Book Slot with Doctor
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Real-Time Bed Availability Dashboard */}
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-teal-700" />
                <h3 className="text-lg font-bold text-slate-900">
                  Ward & Intensive Care Bed Availability
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Total Campus Capacity: 650 Beds · Currently Vacant: <strong className="text-teal-800">{totalAvailableBeds} Beds</strong>
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedWardCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    selectedWardCategory === cat
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bed Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ward / Care Unit</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location Floor</th>
                  <th className="py-3 px-4">Ventilator Equipped</th>
                  <th className="py-3 px-4 text-center">Total Beds</th>
                  <th className="py-3 px-4 text-center">Occupied</th>
                  <th className="py-3 px-4 text-center font-bold text-teal-800">Available Vacant</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredBeds.map((bed) => {
                  const percentVacant = Math.round((bed.availableBeds / bed.totalBeds) * 100);
                  return (
                    <tr key={bed.wardId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {bed.wardName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {bed.category}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono-data">
                        {bed.floor}
                      </td>
                      <td className="py-3 px-4">
                        {bed.ventilatorSupportAvailable ? (
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Yes (Invasive / NIV)
                          </span>
                        ) : (
                          <span className="text-slate-400">Standard O2</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center font-mono-data text-slate-700">
                        {bed.totalBeds}
                      </td>
                      <td className="py-3 px-4 text-center font-mono-data text-slate-600">
                        {bed.occupiedBeds}
                      </td>
                      <td className="py-3 px-4 text-center font-mono-data font-bold text-teal-800 text-sm">
                        {bed.availableBeds}
                        <span className="text-[10px] font-normal text-slate-400 block">
                          ({percentVacant}% vacant)
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href="tel:+911140509000"
                          className="px-2.5 py-1 text-[11px] font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded transition-colors inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Admission Desk</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                <strong>Bed Reservation Policy:</strong> For emergency trauma admissions, beds are allocated within 10 minutes at the Triage counter. Cashless TPA pre-authorization is expedited for all empanelled insurers.
              </span>
            </div>
            <a 
              href="tel:1066"
              className="text-rose-700 font-semibold hover:underline whitespace-nowrap shrink-0"
            >
              Call 1066 for Ambulance Dispatch &rarr;
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
