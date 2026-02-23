"use client";

import type {
  HeroData,
  AboutData,
  EducationItem,
  ExperienceItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  MedalItem,
  ContactData,
} from "@/lib/types";

import Navbar from "./navbar";
import HeroSection from "./hero-section";
import AboutSection from "./about-section";
import EducationSection from "./education-section";
import ExperienceSection from "./experience-section";
import SkillsSection from "./skills-section";
import ProjectsSection from "./projects-section";
import MedalsSection from "./medals-section";
import CertificationsSection from "./certifications-section";
import ContactSection from "./contact-section";
import Footer from "./footer";
import ChatWidget from "@/components/chatbot/chat-widget";

interface PortfolioClientProps {
  hero: HeroData;
  about: AboutData;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  medals: MedalItem[];
  contact: ContactData;
}

export default function PortfolioClient({
  hero,
  about,
  education,
  experience,
  skills,
  projects,
  certifications,
  medals,
  contact,
}: PortfolioClientProps) {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection data={hero} />
        <AboutSection data={about} />
        <EducationSection data={education} />
        <ExperienceSection data={experience} />
        <SkillsSection data={skills} />
        <ProjectsSection data={projects} />
        <MedalsSection data={medals} />
        <CertificationsSection data={certifications} />
        <ContactSection data={contact} />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
