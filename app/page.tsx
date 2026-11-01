// ISR: page is served from the CDN cache and regenerated at most once per hour.
// Admin saves call revalidatePath("/") so edits appear immediately without
// forcing a full server render on every visitor.
export const revalidate = 3600;

import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import Now from "../components/Now";
import VideoIntro from "../components/VideoIntro";
import Projects from "../components/Projects";
import Publications from "../components/Publications";
import Research from "../components/Research";
import Experience from "../components/Experience";
import CareerExperience from "../components/CareerExperience";
import Education from "../components/Education";
import TechnicalSkills from "../components/TechnicalSkills";
import Certifications from "../components/Certifications";
import GitHubRepos from "../components/GitHubRepos";
import CodingProfiles from "../components/CodingProfiles";
import Achievements from "../components/Achievements";
import Beyond from "../components/Beyond";
import Bookshelf from "../components/Bookshelf";
import AcademicReferences from "../components/AcademicReferences";
import Affiliations from "../components/Affiliations";
import Sessions from "../components/Sessions";
import Testimonials from "../components/Testimonials";
import FromBlog from "../components/FromBlog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import FadeInSection from "../components/FadeInSection";
import {
  getHero, getVideo, getCareer, getExperience, getEducation, getSkills,
  getPublications, getReferences, getAffiliations, getBeyond,
  getProjects, getCertifications, getBooks, getTestimonials, getNow, getResearch,
  getCoding, getAchievements, getSessions,
} from "../lib/content";
import { getGitHubRepos } from "../lib/github";
import { getAllPosts } from "../lib/blog";

export default async function Home() {
  const [
    hero, video, career, experience, education, skills, publications,
    references, affiliations, beyond, projects, certifications, books,
    testimonials, repos, now, research, coding, achievements, sessions,
    blogPosts,
  ] = await Promise.all([
    getHero(),
    getVideo(),
    getCareer(),
    getExperience(),
    getEducation(),
    getSkills(),
    getPublications(),
    getReferences(),
    getAffiliations(),
    getBeyond(),
    getProjects(),
    getCertifications(),
    getBooks(),
    getTestimonials(),
    getGitHubRepos(),
    getNow(),
    getResearch(),
    getCoding(),
    getAchievements(),
    getSessions(),
    getAllPosts(),
  ]);

  return (
    <>
      <SiteHeader showBlog={blogPosts.length > 0} />

      <main id="main" className="flex-1">
        {/* Hero Section */}
        <Hero data={hero} />

        {/* Video Introduction (if enabled in CMS) */}
        <VideoIntro data={video} />

        {/* Now Section (Current activities if enabled) */}
        <Now data={now} />

        {/* Featured Projects */}
        <FadeInSection>
          <Projects data={projects} />
        </FadeInSection>

        {/* Academic Research & Peer-Reviewed Publications */}
        <FadeInSection>
          <Publications data={publications} />
          <Research data={research} />
        </FadeInSection>

        {/* Experience & Leadership */}
        <FadeInSection>
          <CareerExperience data={career} />
          <Experience data={experience} />
        </FadeInSection>

        {/* Education & Qualifications */}
        <FadeInSection>
          <Education data={education} />
        </FadeInSection>

        {/* Technical Skills & Domains */}
        <FadeInSection>
          <TechnicalSkills data={skills} />
        </FadeInSection>

        {/* Verified Certifications */}
        <FadeInSection>
          <Certifications data={certifications} />
        </FadeInSection>

        {/* Open Source on GitHub */}
        <FadeInSection>
          <GitHubRepos data={repos} />
        </FadeInSection>

        {/* Competitive Programming & Coding Profiles */}
        <FadeInSection>
          <CodingProfiles data={coding} />
        </FadeInSection>

        {/* Achievements, Honors & Awards */}
        <FadeInSection>
          <Achievements data={achievements} />
        </FadeInSection>

        {/* Beyond Academics & Life Journey */}
        <FadeInSection>
          <Beyond data={beyond} />
        </FadeInSection>

        {/* Bookshelf */}
        <FadeInSection>
          <Bookshelf data={books} />
        </FadeInSection>

        {/* Academic References */}
        <FadeInSection>
          <AcademicReferences data={references} />
        </FadeInSection>

        {/* Professional Affiliations */}
        <FadeInSection>
          <Affiliations data={affiliations} />
        </FadeInSection>

        {/* Talks, Sessions & Workshops */}
        <FadeInSection>
          <Sessions data={sessions} />
        </FadeInSection>

        {/* Endorsements / Testimonials */}
        <FadeInSection>
          <Testimonials data={testimonials} />
        </FadeInSection>

        {/* Writing from the Blog */}
        <FadeInSection>
          <FromBlog posts={blogPosts} />
        </FadeInSection>

        {/* Contact Section */}
        <FadeInSection>
          <Contact email={hero.email} />
        </FadeInSection>
      </main>

      {/* Footer */}
      <Footer hero={hero} />
      <ScrollToTop />
    </>
  );
}
