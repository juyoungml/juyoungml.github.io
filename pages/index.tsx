import type { NextPage } from 'next'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import NewsSection from '../components/NewsSection'
import ExperienceSection from '../components/ExperienceSection'
import ProjectsSection from '../components/ProjectsSection'
import PublicationsSection from '../components/PublicationsSection'
import ResearchSection from '../components/ResearchSection'
import ContactSection from '../components/ContactSection'
import BackToTop from '../components/BackToTop'
import { portfolioData } from '../data/portfolio'

const Home: NextPage = () => {
  const { personal, about, experience, projects, publications, research, news } = portfolioData

  return (
    <>
      <Head>
        <title>{personal.name}</title>
        <meta name="description" content={`${personal.name} - ${personal.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        <Navigation name={personal.name} />

        {/* Main Content */}
        <main className="max-width-container section-padding py-16">
          {/* Hero Section with Profile Image */}
          <HeroSection
            name={personal.name}
            title={personal.title}
            bio={personal.bio}
            profileImage={personal.profileImage}
          />

          {/* News Section */}
          <NewsSection news={news} />

          {/* Projects Section */}
          <ProjectsSection projects={projects} />

          {/* Publications Section */}
          <PublicationsSection publications={publications} />

          {/* Research Section */}
          <ResearchSection research={research} />

          {/* Work Experience Section moved to end */}
          <ExperienceSection experiences={experience} />

          {/* Contact Section */}
          <ContactSection
            email={personal.email}
            github={personal.github}
            linkedin={personal.linkedin}
            googleScholar={personal.googleScholar}
          />
        </main>

        {/* Footer */}
        <footer className="border-t border-border">
          <div className="max-width-container section-padding py-6">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
          </div>
        </footer>
        
        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </>
  )
}

export default Home