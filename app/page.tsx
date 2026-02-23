import PortfolioClient from "@/components/portfolio/portfolio-client";
import {
  fallbackHero,
  fallbackAbout,
  fallbackEducation,
  fallbackExperience,
  fallbackSkills,
  fallbackProjects,
  fallbackCertifications,
  fallbackMedals,
  fallbackContact,
} from "@/lib/fallback-data";

export default function HomePage() {
  // Use fallback data for now - Firestore data will be fetched once admin panel populates it
  return (
    <PortfolioClient
      hero={fallbackHero}
      about={fallbackAbout}
      education={fallbackEducation}
      experience={fallbackExperience}
      skills={fallbackSkills}
      projects={fallbackProjects}
      certifications={fallbackCertifications}
      medals={fallbackMedals}
      contact={fallbackContact}
    />
  );
}
