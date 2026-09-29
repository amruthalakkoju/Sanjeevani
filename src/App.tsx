/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveHospitalStatus } from './components/LiveHospitalStatus';
import { SpecialitiesSection } from './components/SpecialitiesSection';
import { DoctorDirectory } from './components/DoctorDirectory';
import { HealthPackagesSection } from './components/HealthPackagesSection';
import { AyushmanBharatSection } from './components/AyushmanBharatSection';
import { HealthCalculatorsSection } from './components/HealthCalculatorsSection';
import { EmergencyTriageGuide } from './components/EmergencyTriageGuide';
import { Footer } from './components/Footer';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { LabReportViewerModal } from './components/LabReportViewerModal';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedDoctor, setPreselectedDoctor] = useState<string | undefined>(undefined);
  const [preselectedDepartment, setPreselectedDepartment] = useState<string | undefined>(undefined);
  const [labReportsModalOpen, setLabReportsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta' | 'te'>('en');

  const handleOpenBooking = (doctorName?: string, department?: string) => {
    setPreselectedDoctor(doctorName);
    setPreselectedDepartment(department);
    setBookingModalOpen(true);
  };

  const handleBookPackage = (packageName: string) => {
    setPreselectedDoctor(undefined);
    setPreselectedDepartment('General Medicine & Preventive Health');
    setBookingModalOpen(true);
  };

  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      {/* Primary Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenLabReports={() => setLabReportsModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigateToSection}
        language={language}
        onChangeLanguage={setLanguage}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Quick Clinical Portals */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenLabReports={() => setLabReportsModalOpen(true)}
          onNavigateToSection={handleNavigateToSection}
          language={language}
        />

        {/* Live OPD Queue & Bed Availability Matrix */}
        <LiveHospitalStatus onOpenBooking={handleOpenBooking} />

        {/* Quaternary Multi-Speciality Institutes */}
        <SpecialitiesSection onOpenBooking={handleOpenBooking} />

        {/* Specialist Doctor Directory */}
        <DoctorDirectory onOpenBooking={handleOpenBooking} />

        {/* Aarogya Preventive Health Checkups */}
        <HealthPackagesSection onBookPackage={handleBookPackage} />

        {/* Ayushman Bharat (PM-JAY) & Cashless Insurance Desk */}
        <AyushmanBharatSection />

        {/* Clinical Health Risk Evaluators (IDRS, BMI, Cardiac) */}
        <HealthCalculatorsSection onBookConsultation={() => handleOpenBooking()} />

        {/* 24x7 Golden Hour Emergency & Ambulance Triage */}
        <EmergencyTriageGuide />
      </main>

      {/* Institutional Footer */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLabReports={() => setLabReportsModalOpen(true)}
      />

      {/* Interactive Modals */}
      <AppointmentBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedDoctor={preselectedDoctor}
        preselectedDepartment={preselectedDepartment}
      />

      <LabReportViewerModal
        isOpen={labReportsModalOpen}
        onClose={() => setLabReportsModalOpen(false)}
      />
    </div>
  );
}
