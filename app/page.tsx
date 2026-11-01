// ISR: page is served from the CDN cache and regenerated at most once per hour.
// Admin saves call revalidatePath("/") so edits appear immediately without
// forcing a full server render on every visitor.
export const revalidate = 3600;

import Navbar from "../components/Navbar";
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
      <Navbar showBlog={blogPosts.length > 0} />

      <main id="main" className="flex-1">
        {/* Hero Section */}
        <Hero data={hero} />

        {/* Video Introduction (if enabled in CMS) */}
        <VideoIntro data={video} />

        {/* Now Section (Current activities if enabled) */}
        <Now data={now} />

        {/* Featured Projects */}
        <Projects data={projects} />

        {/* Academic Research & Peer-Reviewed Publications */}
        <Publications data={publications} />
        <Research data={research} />

        {/* Experience & Leadership */}
        <CareerExperience data={career} />
        <Experience data={experience} />

        {/* Education & Qualifications */}
        <Education data={education} />

        {/* Technical Skills & Domains */}
        <TechnicalSkills data={skills} />

        {/* Verified Certifications */}
        <Certifications data={certifications} />

        {/* Open Source on GitHub */}
        <GitHubRepos data={repos} />

        {/* Competitive Programming & Coding Profiles */}
        <CodingProfiles data={coding} />

        {/* Achievements, Honors & Awards */}
        <Achievements data={achievements} />

        {/* Beyond Academics & Life Journey */}
        <Beyond data={beyond} />

        {/* Bookshelf */}
        <Bookshelf data={books} />

        {/* Academic References */}
        <AcademicReferences data={references} />

        {/* Professional Affiliations */}
        <Affiliations data={affiliations} />

        {/* Talks, Sessions & Workshops */}
        <Sessions data={sessions} />

        {/* Endorsements / Testimonials */}
        <Testimonials data={testimonials} />

        {/* Writing from the Blog */}
        <FromBlog posts={blogPosts} />

        {/* Contact Section */}
        <Contact email={hero.email} />
      </main>

      {/* Footer */}
      <Footer hero={hero} />
      <ScrollToTop />
    </>
  );
}
