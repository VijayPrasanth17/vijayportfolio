import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './components/Footer.jsx';
import { GradientBackground } from './components/GradientBackground.jsx';
import { Navbar } from './components/Navbar.jsx';
import { ParticleBackground } from './components/ParticleBackground.jsx';
import { ResumeModal } from './components/ResumeModal.jsx';
import { About } from './pages/About.jsx';
import { Articles } from './pages/Articles.jsx';
import { CodingProfiles } from './pages/CodingProfiles.jsx';
import { Contact } from './pages/Contact.jsx';
import { Home } from './pages/Home.jsx';
import { ProjectDetail } from './pages/ProjectDetail.jsx';
import { Projects } from './pages/Projects.jsx';
import { Skills } from './pages/Skills.jsx';
import { handleResumeDownload } from './utils/resumeHandler.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes({ onRequestResume }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home onRequestResume={onRequestResume} />} />
        <Route path="/about" element={<About onRequestResume={onRequestResume} />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/profiles" element={<CodingProfiles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home onRequestResume={onRequestResume} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const triggerResume = () => {
    handleResumeDownload(() => setResumeModalOpen(true));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-shell">
        <GradientBackground />
        <ParticleBackground />
        <Navbar onRequestResume={triggerResume} />

        <main id="main-content">
          <AnimatedRoutes onRequestResume={triggerResume} />
        </main>

        <Footer />
        <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
