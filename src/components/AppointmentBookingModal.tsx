import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle, 
  Printer, 
  ShieldCheck, 
  MapPin, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { DOCTORS_DATA, SPECIALITIES_DATA } from '../data/hospitalData';

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: string;
  preselectedDepartment?: string;
}

export const AppointmentBookingModal: React.FC<AppointmentBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctor,
  preselectedDepartment,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  
  // Form State
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [mobileNumber, setMobileNumber] = useState('');
  const [abhaId, setAbhaId] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [department, setDepartment] = useState(preselectedDepartment || 'Cardiology & Cardiothoracic Sciences');
  const [doctorName, setDoctorName] = useState(preselectedDoctor || 'Dr. Arvind Swaminathan');
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:30 AM - 11:00 AM');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [isAyushmanPatient, setIsAyushmanPatient] = useState(false);

  // Confirmed Receipt State
  const [confirmedData, setConfirmedData] = useState<{
    uhid: string;
    tokenNumber: string;
    appointmentId: string;
    bookedAt: string;
    fee: number;
    room: string;
  } | null>(null);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedDepartment) {
      setDepartment(preselectedDepartment);
      const matchingDocs = DOCTORS_DATA.filter(d => d.department === preselectedDepartment);
      if (matchingDocs.length > 0 && !preselectedDoctor) {
        setDoctorName(matchingDocs[0].name);
      }
    }
    if (preselectedDoctor) {
      setDoctorName(preselectedDoctor);
      const doc = DOCTORS_DATA.find(d => d.name === preselectedDoctor);
      if (doc) {
        setDepartment(doc.department);
      }
    }
  }, [preselectedDoctor, preselectedDepartment]);

  // Handle department change
  const handleDeptChange = (dept: string) => {
    setDepartment(dept);
    const docsInDept = DOCTORS_DATA.filter(d => d.department === dept);
    if (docsInDept.length > 0) {
      setDoctorName(docsInDept[0].name);
    }
  };

  const selectedDoctorObj = DOCTORS_DATA.find(d => d.name === doctorName) || DOCTORS_DATA[0];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) errors.patientName = 'Patient full name is required';
    if (!age || parseInt(age, 10) <= 0 || parseInt(age, 10) > 120) errors.age = 'Valid age required';
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, '').length !== 10) {
      errors.mobileNumber = '10-digit Indian mobile number is required';
    }
    if (abhaId && abhaId.replace(/\D/g, '').length !== 14) {
      errors.abhaId = 'ABHA ID must be 14 digits (XX-XXXX-XXXX-XXXX)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate authentic UHID and Token
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const tokenRandom = Math.floor(12 + Math.random() * 25);
    const uhid = `SJH-${new Date().getFullYear()}-${randomSuffix}`;
    const token = `TK-${tokenRandom}`;
    const appointmentId = `APT-${Date.now().toString().slice(-6)}`;

    const confirmed = {
      uhid,
      tokenNumber: token,
      appointmentId,
      bookedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      fee: isAyushmanPatient ? 0 : selectedDoctorObj.consultationFee,
      room: selectedDoctorObj.opdRoom,
    };

    setConfirmedData(confirmed);
    setStep('confirmed');

    // Save to localStorage for quick patient reference
    try {
      const existing = JSON.parse(localStorage.getItem('sanjeevani_appointments') || '[]');
      existing.unshift({
        ...confirmed,
        patientName,
        age,
        gender,
        mobileNumber,
        doctorName,
        department,
        appointmentDate,
        timeSlot,
        isAyushmanPatient,
      });
      localStorage.setItem('sanjeevani_appointments', JSON.stringify(existing.slice(0, 10)));
    } catch (err) {
      // ignore
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetAndClose = () => {
    setStep('form');
    setConfirmedData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
              SJH
            </div>
            <div>
              <h2 className="text-base font-bold">
                {step === 'form' ? 'OPD Consultation Slot Reservation' : 'Digital OPD Appointment Slip'}
              </h2>
              <p className="text-[11px] text-slate-400">
                Sanjeevani Super Speciality Hospital · Outpatient Department
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Patient Information */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                <User className="w-3.5 h-3.5" />
                <span>1. Patient Demographics</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name as per Aadhaar / ID"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600 ${
                      formErrors.patientName ? 'border-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {formErrors.patientName && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.patientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age (Years) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="120"
                    placeholder="e.g. 42"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (10 digits) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono-data text-slate-500">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600 font-mono-data"
                    />
                  </div>
                  {formErrors.mobileNumber && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.mobileNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ayushman Bharat ABHA ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="14-digit ABHA Number"
                    value={abhaId}
                    onChange={(e) => setAbhaId(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600 font-mono-data"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">For digital health records synchronization</p>
                </div>
              </div>
            </div>

            {/* Step 2: Clinical Speciality & Doctor Selection */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-teal-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>2. Department & Consultant</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Clinical Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => handleDeptChange(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {SPECIALITIES_DATA.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Consultant Doctor *
                  </label>
                  <select
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    {DOCTORS_DATA.filter(d => d.department === department).map((doc) => (
                      <option key={doc.id} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600 font-mono-data"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  >
                    <option value="09:30 AM - 10:00 AM">09:30 AM - 10:00 AM (Morning OPD)</option>
                    <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                    <option value="12:30 PM - 01:00 PM">12:30 PM - 01:00 PM</option>
                    <option value="04:30 PM - 05:00 PM">04:30 PM - 05:00 PM (Evening OPD)</option>
                    <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chief Complaint / Reason for Consultation (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe symptoms, duration, or if this is a follow-up review..."
                    value={reasonForVisit}
                    onChange={(e) => setReasonForVisit(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>
            </div>

            {/* Insurance / PM-JAY Checkbox */}
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg flex items-start gap-2.5">
              <input
                type="checkbox"
                id="ayushman-check"
                checked={isAyushmanPatient}
                onChange={(e) => setIsAyushmanPatient(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
              />
              <label htmlFor="ayushman-check" className="text-xs text-slate-800 cursor-pointer">
                <span className="font-semibold text-teal-900">Ayushman Bharat (PM-JAY) / CGHS / ECHS Beneficiary</span>
                <span className="block text-slate-600 text-[11px] mt-0.5">
                  Check this if you hold a PM-JAY Golden Card or CGHS/ECHS Card. Consultation fee will be 100% cashless under government empanelment.
                </span>
              </label>
            </div>

            {/* Price Summary */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block">Consultation Room:</span>
                <span className="font-semibold text-slate-900">{selectedDoctorObj.opdRoom}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Payable Fee at Hospital:</span>
                <span className="text-base font-extrabold font-mono-data text-teal-800">
                  {isAyushmanPatient ? 'FREE (Cashless PM-JAY)' : `₹${selectedDoctorObj.consultationFee.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Confirm OPD Reservation & Generate Slip
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Confirmed Digital OPD Slip (Printable letterhead format) */
          <div className="p-6 space-y-6">
            
            {/* Success Notification */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5 text-xs text-emerald-900">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">OPD Slot Successfully Confirmed!</p>
                <p className="text-emerald-700">An SMS notification has been sent to +91 {mobileNumber}. Please present this digital slip at OPD Counter #2.</p>
              </div>
            </div>

            {/* Printable Document Sheet */}
            <div id="printable-document" className="bg-white border-2 border-slate-800 p-6 rounded-xl space-y-5 text-slate-900">
              
              {/* Slip Header */}
              <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight text-slate-900">
                    Sanjeevani Super Speciality Hospital
                  </h3>
                  <p className="text-xs text-slate-600">
                    NABH & NABL Accredited Apex Healthcare Facility
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono-data">
                    Plot 12, Institutional Area, Sector 62, New Delhi - 110025 · Phone: +91 11 4050 9000
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-2 py-0.5 rounded">
                    OUTPATIENT SLIP
                  </span>
                  <p className="text-xs font-mono-data text-slate-600 mt-1">
                    Date: {confirmedData?.bookedAt}
                  </p>
                </div>
              </div>

              {/* Patient & Booking Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 border-b border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Patient UHID</span>
                  <span className="font-bold font-mono-data text-slate-900 text-sm">
                    {confirmedData?.uhid}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">OPD Token No.</span>
                  <span className="font-extrabold font-mono-data text-teal-800 text-lg">
                    {confirmedData?.tokenNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Appointment ID</span>
                  <span className="font-bold font-mono-data text-slate-800">
                    {confirmedData?.appointmentId}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Billing Category</span>
                  <span className="font-semibold text-slate-900">
                    {isAyushmanPatient ? 'PM-JAY (Cashless)' : 'Private / Cash'}
                  </span>
                </div>
              </div>

              {/* Patient Details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Patient Name:</span>
                  <span className="font-bold text-slate-900">{patientName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Age / Gender:</span>
                  <span className="font-semibold text-slate-800">{age} Yrs / {gender}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Registered Phone:</span>
                  <span className="font-mono-data text-slate-800">+91 {mobileNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Speciality:</span>
                  <span className="font-semibold text-slate-800">{department}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Consulting Doctor:</span>
                  <span className="font-bold text-teal-900">{doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Chamber / Room:</span>
                  <span className="font-bold font-mono-data text-slate-900">{confirmedData?.room}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Appointment Date:</span>
                  <span className="font-bold font-mono-data text-slate-900">{appointmentDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Time Slot:</span>
                  <span className="font-bold font-mono-data text-slate-900">{timeSlot}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Consultation Fee:</span>
                  <span className="font-extrabold font-mono-data text-slate-900">
                    {confirmedData?.fee === 0 ? '₹0.00 (PM-JAY)' : `₹${confirmedData?.fee}.00`}
                  </span>
                </div>
              </div>

              {/* Instructions Bar */}
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Important Patient Instructions:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Please arrive 15 minutes prior to the scheduled slot at OPD Nursing Station.</li>
                  <li>Carry prior diagnostic investigations, prescriptions, and discharge summaries.</li>
                  <li>Ayushman Bharat / CGHS beneficiaries must bring their original Golden Card & Aadhaar Card.</li>
                  <li>Valid for one free review consultation within 7 days of the appointment date.</li>
                </ul>
              </div>

              {/* Simulated Barcode (Pure SVG lines, no picture) */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <div className="space-y-0.5">
                  <svg className="w-48 h-8" aria-hidden="true">
                    {[3, 6, 8, 12, 16, 20, 26, 30, 36, 42, 45, 52, 58, 64, 70, 78, 85, 92, 98, 105, 114, 120, 130, 140, 148, 155, 165, 175, 185].map((x, i) => (
                      <line 
                        key={i} 
                        x1={x} 
                        y1="0" 
                        x2={x} 
                        y2="30" 
                        stroke="#0f172a" 
                        strokeWidth={i % 3 === 0 ? 3 : 1.5} 
                      />
                    ))}
                  </svg>
                  <p className="text-[10px] font-mono-data text-slate-500">{confirmedData?.uhid} · {confirmedData?.tokenNumber}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <p>Authorized OPD Registrar</p>
                  <p className="font-semibold text-slate-700">Digital Seal Verified</p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 no-print">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print OPD Slip</span>
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
              >
                Done / Close
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
