export interface Doctor {
  id: string;
  name: string;
  department: string;
  qualification: string;
  designation: string;
  experienceYears: number;
  languages: string[];
  opdRoom: string;
  opdTimings: string;
  opdDays: string[];
  consultationFee: number;
  specialityInterests: string[];
  availableToday: boolean;
}

export interface Speciality {
  id: string;
  name: string;
  shortDescription: string;
  hodName: string;
  procedures: string[];
  iconName: string;
  emergencyCare: boolean;
}

export interface WardBedInfo {
  wardId: string;
  wardName: string;
  category: 'General' | 'Semi-Private' | 'Private' | 'Critical Care' | 'Emergency';
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  floor: string;
  ventilatorSupportAvailable: boolean;
}

export interface OpdTokenStatus {
  department: string;
  doctorName: string;
  roomNumber: string;
  currentToken: number;
  totalTokensIssued: number;
  estimatedWaitMins: number;
  status: 'In Consultation' | 'Break' | 'Delayed' | 'On Time';
}

export interface HealthPackage {
  id: string;
  title: string;
  targetAudience: string;
  testsCount: number;
  priceInr: number;
  originalPriceInr: number;
  fastingRequired: boolean;
  durationHours: string;
  keyTests: string[];
  recommendedFor: string;
}

export interface LabReportRecord {
  uhid: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  sampleCollectedDate: string;
  reportDate: string;
  referredBy: string;
  testCategory: string;
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    flag?: 'Normal' | 'High' | 'Low' | 'Critical';
  }[];
  consultantPathologist: string;
}

export const SPECIALITIES_DATA: Speciality[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Cardiothoracic Sciences',
    shortDescription: 'Comprehensive interventional cardiac care, 24x7 primary angioplasty, electrophysiology, and minimally invasive CABG.',
    hodName: 'Dr. Arvind Swaminathan, MD, DM (Cardio - AIIMS), FACC',
    procedures: ['Primary Angioplasty (PAMI)', 'TAVI & MitraClip', 'Coronary Artery Bypass Graft (CABG)', 'Electrophysiology Study & RF Ablation', 'Pediatric Cardiac Surgery'],
    iconName: 'HeartPulse',
    emergencyCare: true,
  },
  {
    id: 'neurology',
    name: 'Neurology & Neurosurgery',
    shortDescription: 'Dedicated 24x7 Stroke Unit with endovascular mechanical thrombectomy, deep brain stimulation, and neuro-oncology.',
    hodName: 'Dr. Radhika Sen, MBBS, MD, DM (Neurology - NIMHANS), FRCP',
    procedures: ['Hyperacute Stroke Thrombolysis', 'Mechanical Thrombectomy', 'Microvascular Neuro-Surgery', 'Deep Brain Stimulation (DBS)', 'Complex Spine Reconstruction'],
    iconName: 'Activity',
    emergencyCare: true,
  },
  {
    id: 'oncology',
    name: 'Medical & Surgical Oncology',
    shortDescription: 'Comprehensive cancer institute with multidisciplinary tumour boards, precision immunotherapy, and organ preservation surgery.',
    hodName: 'Dr. Vikramaditya Rathore, MS, MCh (Surgical Oncology - TMH Mumbai)',
    procedures: ['Robotic Onco-Surgery', 'Immunotherapy & Targeted Biologicals', 'Hyperthermic Intraperitoneal Chemotherapy (HIPEC)', 'Bone Marrow Transplant Support', 'Image Guided Radiation Therapy (IGRT)'],
    iconName: 'ShieldAlert',
    emergencyCare: false,
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics & Joint Replacement',
    shortDescription: 'Advanced robotic total knee and hip replacement, sports medicine arthroscopy, and complex pelvic-acetabular trauma.',
    hodName: 'Dr. Meenakshi Sundaram, MBBS, MS (Ortho), MCh (UK)',
    procedures: ['Robotic Total Knee Replacement (TKR)', 'Anterior Approach Hip Replacement', 'Arthroscopic ACL / Meniscal Repair', 'Deformity Correction & Ilizarov', 'Pelvic Trauma Reconstructions'],
    iconName: 'Bone',
    emergencyCare: true,
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Renal Transplant',
    shortDescription: 'State-of-the-art dialysis suite with 32 hemodialysis machines, continuous renal replacement therapy (CRRT), and kidney transplants.',
    hodName: 'Dr. Rajesh K. Varma, MBBS, MD, DNB (Nephro - SGPGI)',
    procedures: ['ABO-Incompatible Kidney Transplant', '24x7 Bedside CRRT & SLED', 'Peritoneal Dialysis Catheter Insertion', 'Ultrasound-Guided Renal Biopsy', 'Vascular Access & AV Fistula Creation'],
    iconName: 'Filter',
    emergencyCare: true,
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    shortDescription: 'Advanced diagnostic and therapeutic endoscopy, ERCP, endoscopic ultrasound, and comprehensive liver transplant program.',
    hodName: 'Dr. Pradeep Narayan, MD, DM (Gastro - PGI Chandigarh)',
    procedures: ['Therapeutic ERCP & EUS', 'Third Space Endoscopy (POEM/ESD)', 'Liver Cirrhosis & Portal HTN Care', 'Capsule Endoscopy', 'Emergency GI Bleed Hemostasis'],
    iconName: 'Stethoscope',
    emergencyCare: true,
  },
  {
    id: 'pediatrics',
    name: 'Paediatrics & Neonatal Intensive Care',
    shortDescription: 'Level III NICU and PICU equipped with high-frequency ventilators and nitric oxide therapy for high-risk neonates and children.',
    hodName: 'Dr. Ananya Mukherjee, MBBS, MD (Paed), Fellowship Neonatology (AIIMS)',
    procedures: ['Level III Neonatal Intensive Care', 'Extremely Low Birth Weight Care (<1000g)', 'Pediatric Bronchoscopy & Dialysis', 'Congenital Anomaly Surgical Correction', 'Neurodevelopmental Follow-up'],
    iconName: 'Baby',
    emergencyCare: true,
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology, Allergy & Sleep Medicine',
    shortDescription: 'Specialized care for interstitial lung diseases, severe asthma, COPD rehabilitation, and interventional bronchology.',
    hodName: 'Dr. Tariq Manzoor, MBBS, MD, DNB (Pulmonary Medicine)',
    procedures: ['Rigid & Flexible Bronchoscopy', 'Endobronchial Ultrasound (EBUS)', 'Comprehensive Sleep Study (Polysomnography)', 'Cryo-Biopsy for ILD', 'Medical Thoracoscopy'],
    iconName: 'Wind',
    emergencyCare: false,
  },
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-arvind-swaminathan',
    name: 'Dr. Arvind Swaminathan',
    department: 'Cardiology & Cardiothoracic Sciences',
    qualification: 'MBBS, MD (Medicine), DM (Cardiology - AIIMS New Delhi), FACC',
    designation: 'Director & Chief Interventional Cardiologist',
    experienceYears: 24,
    languages: ['English', 'Hindi', 'Tamil'],
    opdRoom: 'Room 102 (Cardio OPD, Ground Floor)',
    opdTimings: '09:30 AM - 01:30 PM & 04:00 PM - 06:30 PM',
    opdDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    consultationFee: 1500,
    specialityInterests: ['Complex Coronary Angioplasty', 'Transcatheter Aortic Valve Implantation (TAVI)', 'Heart Failure Management'],
    availableToday: true,
  },
  {
    id: 'dr-radhika-sen',
    name: 'Dr. Radhika Sen',
    department: 'Neurology & Neurosurgery',
    qualification: 'MBBS, MD, DM (Neurology - NIMHANS), FRCP (Edinburgh)',
    designation: 'Head of Department & Senior Neurologist',
    experienceYears: 19,
    languages: ['English', 'Hindi', 'Bengali'],
    opdRoom: 'Room 205 (Neuro OPD, 1st Floor)',
    opdTimings: '10:00 AM - 02:00 PM',
    opdDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    consultationFee: 1400,
    specialityInterests: ['Hyperacute Ischemic Stroke', 'Movement Disorders & Parkinsonism', 'Refractory Epilepsy'],
    availableToday: true,
  },
  {
    id: 'dr-vikramaditya-rathore',
    name: 'Dr. Vikramaditya Rathore',
    department: 'Medical & Surgical Oncology',
    qualification: 'MBBS, MS (General Surgery), MCh (Surgical Oncology - Tata Memorial)',
    designation: 'Director of Cancer Surgery & Head of Oncology Services',
    experienceYears: 22,
    languages: ['English', 'Hindi', 'Rajasthani'],
    opdRoom: 'Room 312 (Onco Wing, 2nd Floor)',
    opdTimings: '11:00 AM - 03:00 PM',
    opdDays: ['Tuesday', 'Thursday', 'Saturday'],
    consultationFee: 1600,
    specialityInterests: ['Thoracic & GI Oncology', 'Robotic Pelvic Exenteration', 'Hyperthermic Intraperitoneal Chemotherapy'],
    availableToday: true,
  },
  {
    id: 'dr-meenakshi-sundaram',
    name: 'Dr. Meenakshi Sundaram',
    department: 'Orthopaedics & Joint Replacement',
    qualification: 'MBBS, MS (Orthopaedics - Madras Medical College), MCh Ortho (Dundee)',
    designation: 'Senior Consultant & Robotic Joint Surgeon',
    experienceYears: 18,
    languages: ['English', 'Tamil', 'Hindi', 'Telugu'],
    opdRoom: 'Room 114 (Bone & Joint Clinic, Ground Floor)',
    opdTimings: '09:00 AM - 01:00 PM & 05:00 PM - 07:00 PM',
    opdDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    consultationFee: 1200,
    specialityInterests: ['Robotic Navigated Knee Arthroplasty', 'Revision Hip Reconstruction', 'Sports Knee Arthroscopy'],
    availableToday: true,
  },
  {
    id: 'dr-rajesh-varma',
    name: 'Dr. Rajesh K. Varma',
    department: 'Nephrology & Renal Transplant',
    qualification: 'MBBS, MD (Medicine), DNB (Nephrology - SGPGI Lucknow)',
    designation: 'Director of Nephrology & Kidney Transplantation',
    experienceYears: 21,
    languages: ['English', 'Hindi', 'Punjabi'],
    opdRoom: 'Room 218 (Renal Sciences, 1st Floor)',
    opdTimings: '10:30 AM - 02:30 PM',
    opdDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    consultationFee: 1300,
    specialityInterests: ['Live Donor Renal Transplant', 'Diabetic Nephropathy & Glomerulonephritis', 'Critical Care Hemodialysis'],
    availableToday: true,
  },
  {
    id: 'dr-pradeep-narayan',
    name: 'Dr. Pradeep Narayan',
    department: 'Gastroenterology & Hepatology',
    qualification: 'MBBS, MD, DM (Gastroenterology - PGI Chandigarh)',
    designation: 'Senior Consultant - Digestive & Liver Diseases',
    experienceYears: 16,
    languages: ['English', 'Hindi', 'Malayalam'],
    opdRoom: 'Room 201 (Digestive Health, 1st Floor)',
    opdTimings: '10:00 AM - 02:00 PM',
    opdDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    consultationFee: 1300,
    specialityInterests: ['Therapeutic Pancreatobiliary Endoscopy', 'Chronic Viral Hepatitis B & C', 'Non-Alcoholic Fatty Liver (MASH)'],
    availableToday: false,
  },
  {
    id: 'dr-ananya-mukherjee',
    name: 'Dr. Ananya Mukherjee',
    department: 'Paediatrics & Neonatal Intensive Care',
    qualification: 'MBBS, MD (Paediatrics - Calcutta), DM Neonatology (AIIMS New Delhi)',
    designation: 'Lead Neonatologist & In-Charge NICU',
    experienceYears: 15,
    languages: ['English', 'Hindi', 'Bengali'],
    opdRoom: 'Room 108 (Child Health Clinic, Ground Floor)',
    opdTimings: '09:00 AM - 01:00 PM',
    opdDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    consultationFee: 1100,
    specialityInterests: ['Extreme Preterm Care', 'Neonatal Sepsis & Hemodynamics', 'Developmental Pediatrics'],
    availableToday: true,
  },
  {
    id: 'dr-tariq-manzoor',
    name: 'Dr. Tariq Manzoor',
    department: 'Pulmonology, Allergy & Sleep Medicine',
    qualification: 'MBBS, MD (Pulmonary Medicine - KGMU Lucknow), FCCP (USA)',
    designation: 'Senior Consultant Pulmonologist & Sleep Specialist',
    experienceYears: 17,
    languages: ['English', 'Hindi', 'Urdu'],
    opdRoom: 'Room 222 (Chest Clinic, 1st Floor)',
    opdTimings: '11:00 AM - 03:00 PM',
    opdDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    consultationFee: 1200,
    specialityInterests: ['Post-COVID Fibrosis & ILD', 'Obstructive Sleep Apnea (OSA)', 'Asthma & Allergy Immunotherapy'],
    availableToday: true,
  },
];

export const LIVE_OPD_TOKENS: OpdTokenStatus[] = [
  {
    department: 'Cardiology',
    doctorName: 'Dr. Arvind Swaminathan',
    roomNumber: 'Room 102',
    currentToken: 28,
    totalTokensIssued: 45,
    estimatedWaitMins: 18,
    status: 'In Consultation',
  },
  {
    department: 'Neurology',
    doctorName: 'Dr. Radhika Sen',
    roomNumber: 'Room 205',
    currentToken: 19,
    totalTokensIssued: 32,
    estimatedWaitMins: 25,
    status: 'In Consultation',
  },
  {
    department: 'Orthopaedics',
    doctorName: 'Dr. Meenakshi Sundaram',
    roomNumber: 'Room 114',
    currentToken: 34,
    totalTokensIssued: 50,
    estimatedWaitMins: 12,
    status: 'On Time',
  },
  {
    department: 'Oncology',
    doctorName: 'Dr. Vikramaditya Rathore',
    roomNumber: 'Room 312',
    currentToken: 14,
    totalTokensIssued: 26,
    estimatedWaitMins: 30,
    status: 'In Consultation',
  },
  {
    department: 'Nephrology',
    doctorName: 'Dr. Rajesh K. Varma',
    roomNumber: 'Room 218',
    currentToken: 22,
    totalTokensIssued: 35,
    estimatedWaitMins: 15,
    status: 'On Time',
  },
  {
    department: 'Paediatrics',
    doctorName: 'Dr. Ananya Mukherjee',
    roomNumber: 'Room 108',
    currentToken: 31,
    totalTokensIssued: 40,
    estimatedWaitMins: 10,
    status: 'In Consultation',
  },
  {
    department: 'Pulmonology',
    doctorName: 'Dr. Tariq Manzoor',
    roomNumber: 'Room 222',
    currentToken: 16,
    totalTokensIssued: 28,
    estimatedWaitMins: 20,
    status: 'Delayed',
  },
];

export const LIVE_BED_INVENTORY: WardBedInfo[] = [
  {
    wardId: 'gen-male',
    wardName: 'General Medical Ward (Male)',
    category: 'General',
    totalBeds: 60,
    occupiedBeds: 51,
    availableBeds: 9,
    floor: 'Floor 2, Wing A',
    ventilatorSupportAvailable: false,
  },
  {
    wardId: 'gen-female',
    wardName: 'General Medical Ward (Female)',
    category: 'General',
    totalBeds: 60,
    occupiedBeds: 48,
    availableBeds: 12,
    floor: 'Floor 2, Wing B',
    ventilatorSupportAvailable: false,
  },
  {
    wardId: 'semi-pvt',
    wardName: 'Semi-Private Twin Sharing Rooms',
    category: 'Semi-Private',
    totalBeds: 110,
    occupiedBeds: 96,
    availableBeds: 14,
    floor: 'Floor 3 & 4',
    ventilatorSupportAvailable: false,
  },
  {
    wardId: 'deluxe-pvt',
    wardName: 'Deluxe Single Private Suites',
    category: 'Private',
    totalBeds: 80,
    occupiedBeds: 72,
    availableBeds: 8,
    floor: 'Floor 5 (Tower A)',
    ventilatorSupportAvailable: false,
  },
  {
    wardId: 'micu',
    wardName: 'Medical Intensive Care Unit (MICU)',
    category: 'Critical Care',
    totalBeds: 40,
    occupiedBeds: 34,
    availableBeds: 6,
    floor: 'Floor 1, Critical Care Block',
    ventilatorSupportAvailable: true,
  },
  {
    wardId: 'ccu',
    wardName: 'Coronary Care Unit (CCU / ICCU)',
    category: 'Critical Care',
    totalBeds: 32,
    occupiedBeds: 28,
    availableBeds: 4,
    floor: 'Floor 1, Heart Block',
    ventilatorSupportAvailable: true,
  },
  {
    wardId: 'sicu',
    wardName: 'Surgical Intensive Care Unit (SICU)',
    category: 'Critical Care',
    totalBeds: 28,
    occupiedBeds: 25,
    availableBeds: 3,
    floor: 'Floor 2, Surgical Complex',
    ventilatorSupportAvailable: true,
  },
  {
    wardId: 'nicu',
    wardName: 'Neonatal ICU Level III (NICU)',
    category: 'Critical Care',
    totalBeds: 24,
    occupiedBeds: 19,
    availableBeds: 5,
    floor: 'Floor 1, Mother & Child Block',
    ventilatorSupportAvailable: true,
  },
  {
    wardId: 'er-triage',
    wardName: '24x7 Emergency Triage & Resuscitation',
    category: 'Emergency',
    totalBeds: 30,
    occupiedBeds: 23,
    availableBeds: 7,
    floor: 'Ground Floor, Red Zone Entry',
    ventilatorSupportAvailable: true,
  },
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'aarogya-essential',
    title: 'Aarogya Essential Wellness',
    targetAudience: 'Adults aged 20-45 looking for annual baseline screening',
    testsCount: 54,
    priceInr: 1699,
    originalPriceInr: 4200,
    fastingRequired: true,
    durationHours: '2-3 hours',
    keyTests: [
      'Complete Hemogram (24 parameters)',
      'Fasting Blood Glucose & HbA1c',
      'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Liver Function Test (SGOT, SGPT, Bilirubin, Protein)',
      'Kidney Function Test (Urea, Creatinine, Uric Acid)',
      'Urine Routine & Microscopic Examination',
      'Consultation with Senior Physician',
    ],
    recommendedFor: 'Annual preventative health checkup for early detection of lifestyle disorders.',
  },
  {
    id: 'aarogya-cardiac',
    title: 'Sanjeevani Advanced Cardiac Screen',
    targetAudience: 'Individuals with hypertension, family history of CAD, or age 35+',
    testsCount: 72,
    priceInr: 4699,
    originalPriceInr: 9800,
    fastingRequired: true,
    durationHours: '3-4 hours',
    keyTests: [
      'Everything in Aarogya Essential',
      'High-Sensitivity C-Reactive Protein (hs-CRP)',
      '12-Lead Resting Digital Electrocardiogram (ECG)',
      '2D Echocardiography with Color Doppler',
      'Treadmill Test (TMT / Stress Test)',
      'Serum Apolipoprotein A1 & B',
      'Detailed Consultation with Senior Cardiologist',
      'Dietary & Preventive Lifestyle Plan',
    ],
    recommendedFor: 'Comprehensive evaluation of heart health, arterial block risks, and coronary endurance.',
  },
  {
    id: 'aarogya-senior',
    title: 'Senior Citizen Comprehensive Care',
    targetAudience: 'Men & Women aged 60+ requiring multidisciplinary geriatric review',
    testsCount: 88,
    priceInr: 6499,
    originalPriceInr: 14500,
    fastingRequired: true,
    durationHours: '4-5 hours',
    keyTests: [
      'Comprehensive Blood, Liver & Kidney Profile',
      'HbA1c & Average Estimated Glucose',
      'Serum Vitamin D3 & Vitamin B12 Levels',
      'Thyroid Profile (Free T3, Free T4, Ultra-TSH)',
      'Prostate-Specific Antigen (PSA) for Men / Mammography for Women',
      'DEXA Bone Mineral Density Scan (Spine & Femur)',
      'Resting ECG & 2D Echo',
      'Ophthalmology Screening (Cataract & Glaucoma evaluation)',
      'Geriatrician & Orthopaedic Specialist Reviews',
    ],
    recommendedFor: 'Thorough assessment of bone density, joint mobility, cardiovascular, metabolic, and ocular health in elderly.',
  },
  {
    id: 'aarogya-executive',
    title: 'Executive Whole Body Signature Scan',
    targetAudience: 'Corporate leaders, busy executives, and comprehensive diagnostic seekers',
    testsCount: 112,
    priceInr: 9999,
    originalPriceInr: 22000,
    fastingRequired: true,
    durationHours: '5-6 hours (Includes Healthy Breakfast)',
    keyTests: [
      'Full Blood, Lipid, Liver, Kidney, Thyroid & Metabolic Spectrum',
      'Whole Abdomen & Pelvis Ultrasound (High Resolution)',
      'Low Dose CT Chest / Pulmonary Screen',
      '2D Echo & Stress TMT',
      'Carotid Doppler (Stroke Risk Assessment)',
      'Tumour Markers (CEA, CA-125 / PSA)',
      'Vitamin D, B12, Iron Studies & Ferritin',
      'Multi-Speciality Consultations: Physician, Cardiologist, Nutritionist',
    ],
    recommendedFor: 'In-depth head-to-toe organ screening designed for proactive longevity and early risk mitigation.',
  },
];

export const SAMPLE_LAB_REPORTS: Record<string, LabReportRecord> = {
  'SJH-8821': {
    uhid: 'SJH-8821',
    patientName: 'Sunil Kumar Sharma',
    age: 48,
    gender: 'Male',
    sampleCollectedDate: '28-Sep-2026 07:45 AM',
    reportDate: '28-Sep-2026 01:15 PM',
    referredBy: 'Dr. Arvind Swaminathan (Cardiology)',
    testCategory: 'Pathology & Metabolic Comprehensive Profile',
    consultantPathologist: 'Dr. Nandini Sengupta, MD (Pathology - AIIMS), FICP',
    results: [
      { parameter: 'Hemoglobin (Hb)', value: '14.6', unit: 'g/dL', referenceRange: '13.0 - 17.0', flag: 'Normal' },
      { parameter: 'Total Leukocyte Count (TLC)', value: '7,400', unit: '/cu.mm', referenceRange: '4,000 - 11,000', flag: 'Normal' },
      { parameter: 'Platelet Count', value: '2.6', unit: 'Lakh/cu.mm', referenceRange: '1.5 - 4.5', flag: 'Normal' },
      { parameter: 'Fasting Blood Glucose', value: '104', unit: 'mg/dL', referenceRange: '70 - 99', flag: 'High' },
      { parameter: 'HbA1c (Glycated Hemoglobin)', value: '5.9', unit: '%', referenceRange: '< 5.7 (Normal), 5.7-6.4 (Prediabetic)', flag: 'High' },
      { parameter: 'Total Cholesterol', value: '192', unit: 'mg/dL', referenceRange: '< 200', flag: 'Normal' },
      { parameter: 'Triglycerides', value: '210', unit: 'mg/dL', referenceRange: '< 150', flag: 'High' },
      { parameter: 'HDL Cholesterol (Good)', value: '38', unit: 'mg/dL', referenceRange: '> 40', flag: 'Low' },
      { parameter: 'LDL Cholesterol (Calculated)', value: '112', unit: 'mg/dL', referenceRange: '< 100', flag: 'High' },
      { parameter: 'Serum Creatinine', value: '0.98', unit: 'mg/dL', referenceRange: '0.70 - 1.20', flag: 'Normal' },
      { parameter: 'Uric Acid', value: '5.8', unit: 'mg/dL', referenceRange: '3.5 - 7.2', flag: 'Normal' },
      { parameter: 'hs-CRP (Cardiac Risk Marker)', value: '1.8', unit: 'mg/L', referenceRange: '< 1.0 (Low), 1.0-3.0 (Avg)', flag: 'Normal' },
    ],
  },
  'SJH-4402': {
    uhid: 'SJH-4402',
    patientName: 'Priya Venkatesh',
    age: 34,
    gender: 'Female',
    sampleCollectedDate: '27-Sep-2026 08:30 AM',
    reportDate: '27-Sep-2026 02:00 PM',
    referredBy: 'Dr. Tariq Manzoor (Pulmonology)',
    testCategory: 'Complete Hemogram & Thyroid Profile',
    consultantPathologist: 'Dr. Nandini Sengupta, MD (Pathology - AIIMS), FICP',
    results: [
      { parameter: 'Hemoglobin (Hb)', value: '10.8', unit: 'g/dL', referenceRange: '12.0 - 15.0', flag: 'Low' },
      { parameter: 'RBC Count', value: '3.9', unit: 'mill/cu.mm', referenceRange: '3.8 - 4.8', flag: 'Normal' },
      { parameter: 'Packed Cell Volume (PCV)', value: '33.2', unit: '%', referenceRange: '36.0 - 46.0', flag: 'Low' },
      { parameter: 'MCV', value: '78.4', unit: 'fL', referenceRange: '83.0 - 101.0', flag: 'Low' },
      { parameter: 'Ferritin (Serum)', value: '14.2', unit: 'ng/mL', referenceRange: '15.0 - 150.0', flag: 'Low' },
      { parameter: 'Total T3', value: '1.1', unit: 'ng/mL', referenceRange: '0.8 - 2.0', flag: 'Normal' },
      { parameter: 'Total T4', value: '7.8', unit: 'µg/dL', referenceRange: '5.1 - 14.1', flag: 'Normal' },
      { parameter: 'TSH (Ultrasensitive)', value: '2.45', unit: 'µIU/mL', referenceRange: '0.40 - 4.20', flag: 'Normal' },
      { parameter: 'Vitamin D (25-OH)', value: '18.4', unit: 'ng/mL', referenceRange: '30.0 - 100.0 (Sufficient)', flag: 'Low' },
    ],
  },
};

export const CASHLESS_TPA_PARTNERS = [
  { name: 'Ayushman Bharat PM-JAY', type: 'Government Scheme', coverage: 'Up to ₹5 Lakh / Family / Year' },
  { name: 'Central Govt Health Scheme (CGHS)', type: 'Government Empanelment', coverage: 'Full Cashless IPD / OPD' },
  { name: 'Ex-Servicemen Contributory Health (ECHS)', type: 'Defence Scheme', coverage: 'Full Cashless Hospitalization' },
  { name: 'Star Health & Allied Insurance', type: 'Private TPA', coverage: 'Direct Cashless Desk' },
  { name: 'ICICI Lombard General Insurance', type: 'Private TPA', coverage: 'Express 45-min Pre-Auth' },
  { name: 'HDFC ERGO General Insurance', type: 'Private TPA', coverage: 'Instant Digital Approvals' },
  { name: 'Care Health Insurance', type: 'Private TPA', coverage: 'Direct Cashless Desk' },
  { name: 'Niva Bupa Health Insurance', type: 'Private TPA', coverage: 'Paperless TPA Desk' },
  { name: 'Medi Assist Healthcare TPA', type: 'Third Party Administrator', coverage: 'Corporate & Retail Claims' },
  { name: 'Paramount Health Services TPA', type: 'Third Party Administrator', coverage: 'National Network Desk' },
  { name: 'Vidal Health TPA', type: 'Third Party Administrator', coverage: 'PSU & Corporate Pan-India' },
  { name: 'MDIndia Healthcare TPA', type: 'Third Party Administrator', coverage: 'State Scheme & PSU Desk' },
];

export const HOSPITAL_CAMPUSES = [
  {
    city: 'New Delhi (Flagship Apex Centre)',
    address: 'Plot 12, Institutional Area, Sector 62, New Delhi - 110025',
    beds: '650 Beds',
    emergencyHotline: '+91 11 4050 9000',
    ambulanceHotline: '1066 / +91 11 4050 9108',
    opdInquiry: '+91 11 4050 9001',
    metroLandmark: 'Near Indraprastha Metro Station, Gate No. 3',
  },
  {
    city: 'Bengaluru (Tech City Campus)',
    address: 'ITPL Main Road, Whitefield, Bengaluru, Karnataka - 560066',
    beds: '450 Beds',
    emergencyHotline: '+91 80 4050 8000',
    ambulanceHotline: '1066 / +91 80 4050 8108',
    opdInquiry: '+91 80 4050 8001',
    metroLandmark: 'Adjacent to Hopefarm Metro Station',
  },
  {
    city: 'Hyderabad (Deccan Care Wing)',
    address: 'Road No. 2, Banjara Hills, Hyderabad, Telangana - 500034',
    beds: '400 Beds',
    emergencyHotline: '+91 40 4050 7000',
    ambulanceHotline: '1066 / +91 40 4050 7108',
    opdInquiry: '+91 40 4050 7001',
    metroLandmark: 'Opposite KBR Park Main Gate',
  },
  {
    city: 'Mumbai (Coastal Metro Centre)',
    address: 'BKC Connector Road, Bandra East, Mumbai, Maharashtra - 400051',
    beds: '500 Beds',
    emergencyHotline: '+91 22 4050 6000',
    ambulanceHotline: '1066 / +91 22 4050 6108',
    opdInquiry: '+91 22 4050 6001',
    metroLandmark: '5 Mins from Bandra-Kurla Complex Hub',
  },
];
