import React, { useState } from 'react';
import { 
  Calculator, 
  Activity, 
  Heart, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const HealthCalculatorsSection: React.FC<{ onBookConsultation: () => void }> = ({
  onBookConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'idrs' | 'bmi' | 'cardiac'>('idrs');

  // IDRS (Indian Diabetes Risk Score - MDRF Validated) State
  const [idrsAge, setIdrsAge] = useState<number>(0); // 0, 20, 30
  const [idrsWaist, setIdrsWaist] = useState<number>(0); // 0, 10, 20
  const [idrsActivity, setIdrsActivity] = useState<number>(10); // 0, 10, 20, 30
  const [idrsFamily, setIdrsFamily] = useState<number>(0); // 0, 10, 20

  const totalIdrsScore = idrsAge + idrsWaist + idrsActivity + idrsFamily;

  const getIdrsInterpretation = (score: number) => {
    if (score < 30) {
      return {
        level: 'Low Risk',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        advice: 'Your risk of diabetes is low. Maintain a balanced diet, keep active, and screen annually after age 35.',
      };
    } else if (score <= 50) {
      return {
        level: 'Moderate Risk',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        advice: 'Moderate risk. We recommend checking fasting blood glucose and HbA1c every 6 to 12 months. Increase brisk walking to 45 mins/day.',
      };
    } else {
      return {
        level: 'High Risk (>=60)',
        color: 'text-rose-800 bg-rose-50 border-rose-200',
        advice: 'High risk of undiagnosed diabetes or prediabetes. We strongly recommend immediate fasting blood glucose and HbA1c testing and a physician review.',
      };
    }
  };

  // BMI (South Asian Cutoffs) State
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(68);

  const heightM = heightCm / 100;
  const bmiValue = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 0;

  const getBmiInterpretation = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-sky-700', note: 'Below South Asian optimal baseline.' };
    if (bmi <= 22.9) return { category: 'Normal Range (South Asian)', color: 'text-emerald-700', note: 'Ideal metabolic health bracket.' };
    if (bmi <= 24.9) return { category: 'Overweight (India Cutoff >=23)', color: 'text-amber-700', note: 'Increased risk of insulin resistance.' };
    return { category: 'Obese (India Cutoff >=25)', color: 'text-rose-700', note: 'High risk for type 2 diabetes, fatty liver, and hypertension.' };
  };

  // Cardiac Risk
  const [cardiacAge, setCardiacAge] = useState<number>(45);
  const [cardiacSmoker, setCardiacSmoker] = useState<boolean>(false);
  const [cardiacBp, setCardiacBp] = useState<'normal' | 'stage1' | 'stage2'>('normal');
  const [cardiacFamilyHistory, setCardiacFamilyHistory] = useState<boolean>(false);

  const calculateCardiacRisk = () => {
    let points = 0;
    if (cardiacAge > 40) points += 2;
    if (cardiacAge > 55) points += 2;
    if (cardiacSmoker) points += 3;
    if (cardiacBp === 'stage1') points += 2;
    if (cardiacBp === 'stage2') points += 4;
    if (cardiacFamilyHistory) points += 2;

    if (points <= 3) return { level: 'Low 10-Year Risk', desc: 'Heart risk is low. Maintain heart-healthy nutrition and active lifestyle.' };
    if (points <= 6) return { level: 'Moderate Risk', desc: 'Moderate cardiovascular risk. Recommended: Lipid profile & resting ECG.' };
    return { level: 'Elevated Risk', desc: 'Higher propensity for coronary artery blockages. Recommended: 2D Echo, TMT, and Cardiologist review.' };
  };

  return (
    <section id="calculators" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-teal-800 tracking-wider uppercase mb-1">
              Evidence-Based Screening Tools
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Clinical Health Risk Evaluators
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mt-1">
              Calibrated specifically for South Asian genetic and lifestyle phenotypes based on Indian Council of Medical Research (ICMR) criteria.
            </p>
          </div>

          {/* Segmented Control */}
          <div className="p-1 bg-slate-200/80 rounded-lg flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('idrs')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'idrs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Indian Diabetes Score (IDRS)
            </button>
            <button
              onClick={() => setActiveTab('bmi')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'bmi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Asian BMI Calculator
            </button>
            <button
              onClick={() => setActiveTab('cardiac')}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === 'cardiac' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cardiac Risk Screen
            </button>
          </div>
        </div>

        {/* Tab 1: IDRS (Indian Diabetes Risk Score) */}
        {activeTab === 'idrs' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Indian Diabetes Risk Score (IDRS - MDRF & ICMR Validated)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluates risk of developing Type-2 diabetes using four simple clinical parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Question 1: Age */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  1. Age Group:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: '< 35 Years', pts: 0 },
                    { label: '35 - 49 Years', pts: 20 },
                    { label: '≥ 50 Years', pts: 30 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setIdrsAge(opt.pts)}
                      className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                        idrsAge === opt.pts
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="block text-[10px] text-slate-400">+{opt.pts} pts</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Waist Circumference */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  2. Abdominal Waist Circumference:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: '<80cm (F) / <90cm (M)', pts: 0 },
                    { label: '80-89cm (F) / 90-99cm (M)', pts: 10 },
                    { label: '≥90cm (F) / ≥100cm (M)', pts: 20 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setIdrsWaist(opt.pts)}
                      className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                        idrsWaist === opt.pts
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="line-clamp-1">{opt.label}</span>
                      <span className="block text-[10px] text-slate-400">+{opt.pts} pts</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Physical Activity */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  3. Daily Physical Activity Level:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { label: 'Vigorous Exercise', pts: 0 },
                    { label: 'Moderate Exercise', pts: 10 },
                    { label: 'Mild / Sedentary', pts: 20 },
                    { label: 'No Physical Exercise', pts: 30 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setIdrsActivity(opt.pts)}
                      className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                        idrsActivity === opt.pts
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="line-clamp-1">{opt.label}</span>
                      <span className="block text-[10px] text-slate-400">+{opt.pts} pts</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4: Family History */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  4. Family History of Diabetes:
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: 'Neither Parent', pts: 0 },
                    { label: 'One Parent Diabetic', pts: 10 },
                    { label: 'Both Parents Diabetic', pts: 20 },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setIdrsFamily(opt.pts)}
                      className={`p-2.5 rounded-lg border text-center transition-colors cursor-pointer ${
                        idrsFamily === opt.pts
                          ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="block text-[10px] text-slate-400">+{opt.pts} pts</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Score Result Box */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 text-white rounded-xl text-center min-w-[100px]">
                  <span className="text-[10px] uppercase tracking-wider block text-slate-400">IDRS Score</span>
                  <span className="text-2xl font-extrabold font-mono-data">{totalIdrsScore} / 100</span>
                </div>
                <div>
                  <div className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold border mb-1 ${getIdrsInterpretation(totalIdrsScore).color}`}>
                    {getIdrsInterpretation(totalIdrsScore).level}
                  </div>
                  <p className="text-xs text-slate-600 max-w-xl">
                    {getIdrsInterpretation(totalIdrsScore).advice}
                  </p>
                </div>
              </div>

              <button
                onClick={onBookConsultation}
                className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Consult Endocrinologist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: South Asian BMI Calculator */}
        {activeTab === 'bmi' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                South Asian Adjusted BMI & Body Mass Index
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Note: In South Asians, metabolic complications arise at lower BMI cutoffs (Overweight ≥ 23 kg/m², Obese ≥ 25 kg/m²) than Caucasian standards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Height: {heightCm} cm</span>
                  <span className="text-slate-500 font-mono-data">({(heightCm / 30.48).toFixed(1)} feet)</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-700 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-800">
                  <span>Weight: {weightKg} kg</span>
                  <span className="text-slate-500 font-mono-data">({(weightKg * 2.204).toFixed(0)} lbs)</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 text-white rounded-xl text-center min-w-[100px]">
                  <span className="text-[10px] uppercase tracking-wider block text-slate-400">Your BMI</span>
                  <span className="text-2xl font-extrabold font-mono-data text-teal-400">{bmiValue}</span>
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${getBmiInterpretation(bmiValue).color}`}>
                    {getBmiInterpretation(bmiValue).category}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {getBmiInterpretation(bmiValue).note}
                  </p>
                </div>
              </div>

              <button
                onClick={onBookConsultation}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Discuss with Clinical Nutritionist
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Cardiac Risk Evaluator */}
        {activeTab === 'cardiac' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Cardiovascular Health Screener
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Estimates coronary artery disease vulnerability based on clinical risk factors.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Age: {cardiacAge} Yrs</label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={cardiacAge}
                  onChange={(e) => setCardiacAge(parseInt(e.target.value, 10))}
                  className="w-full accent-teal-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Smoking Status</label>
                <select
                  value={cardiacSmoker ? 'yes' : 'no'}
                  onChange={(e) => setCardiacSmoker(e.target.value === 'yes')}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:border-teal-600"
                >
                  <option value="no">Non-Smoker</option>
                  <option value="yes">Current Smoker / Tobacco</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Blood Pressure</label>
                <select
                  value={cardiacBp}
                  onChange={(e) => setCardiacBp(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:border-teal-600"
                >
                  <option value="normal">Normal (&lt;120/80 mmHg)</option>
                  <option value="stage1">Stage 1 HTN (120-139/80-89)</option>
                  <option value="stage2">Stage 2 HTN (≥140/90 mmHg)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Family Heart History</label>
                <select
                  value={cardiacFamilyHistory ? 'yes' : 'no'}
                  onChange={(e) => setCardiacFamilyHistory(e.target.value === 'yes')}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-2 focus:border-teal-600"
                >
                  <option value="no">No premature heart attack in family</option>
                  <option value="yes">Father/Mother had CAD before age 55</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-teal-800 tracking-wider block">
                  Evaluation:
                </span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {calculateCardiacRisk().level}
                </p>
                <p className="text-xs text-slate-600">
                  {calculateCardiacRisk().desc}
                </p>
              </div>

              <button
                onClick={onBookConsultation}
                className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                Schedule Cardiac Checkup
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
