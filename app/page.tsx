import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { StatsCards } from './components/sections/StatsCards';
import { TechStack } from './components/sections/TechStack';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Projects } from './components/sections/Projects';
import { Footer } from './components/layout/Footer';
import { getPortfolioData } from './lib/api';
import { AnalyticsDashboard } from './components/sections/AnalyticsDashboard'; // <--- Importe
import { ChatWidget } from './components/ui/ChatWidget';

export default async function Home() {
  const { stats, projects } = await getPortfolioData();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background font-sans selection:bg-primary/10 pt-16">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Hero />
          <StatsCards stats={stats} />
          <AnalyticsDashboard stats={stats} />
          <TechStack />
          <Experience />
          <Education />
          <Projects data={projects} />
          <Footer />

        </div>
      </main>
      <ChatWidget />
    </>
  );
}