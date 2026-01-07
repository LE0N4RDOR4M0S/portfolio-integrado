import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { StatsCards } from './components/sections/StatsCards';
import { TechStack } from './components/sections/TechStack';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Projects } from './components/sections/Projects';
import { Footer } from './components/layout/Footer';
import { getPortfolioData } from './lib/api';
import { AnalyticsDashboard } from './components/sections/AnalyticsDashboard';
import { ChatWidget } from './components/ui/ChatWidget';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const { stats, projects } = await getPortfolioData();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background font-sans selection:bg-primary/10 pt-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
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

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-integrado.up.railway.app/'),
  title: 'Leonardo Ramos | Desenvolvedor e Entusiasta',
  description: 'Portfólio de Leonardo Ramos - Projetos, habilidades e métricas em tempo real.',
  openGraph: {
    title: 'Leonardo Ramos - Portfolio',
    description: 'Veja meus projetos e métricas de código em tempo real.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}