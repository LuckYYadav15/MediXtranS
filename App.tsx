
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, SimulationScene } from './components/QuantumScene';
import { InteractiveModelDiagram, ArchitectureDiagram, BenchmarkChart } from './components/Diagrams';
import { ArrowDown, Menu, X, FileText, Cpu, Activity, Share2, Download, Stethoscope, Mic, Database, BrainCircuit } from 'lucide-react';

const AuthorCard = ({ name, role, institute }: { name: string, role: string, institute: string }) => {
  return (
    <div className="flex flex-col p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 min-w-[200px] flex-1">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-tech-primary/10 text-tech-primary rounded-full flex items-center justify-center font-bold text-lg border border-tech-primary/20">
            {name.charAt(0)}
        </div>
        <div>
            <h3 className="font-bold text-slate-900 text-sm">{name}</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{role}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 font-medium border-t border-slate-100 pt-3 mt-auto">
        {institute}
      </p>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle: string, icon: any }) => (
    <div className="mb-12 border-l-4 border-tech-primary pl-6">
        <div className="flex items-center gap-2 text-tech-primary font-mono text-sm font-bold uppercase tracking-wider mb-2">
            <Icon size={16} /> {subtitle}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
    </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-tech-primary selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm' : 'bg-white border-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 bg-tech-primary text-white rounded-lg flex items-center justify-center shadow-md">
                <Stethoscope size={20} />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-sm text-slate-900 leading-none">MED<span className="text-tech-primary">WHISPER</span></span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider leading-none mt-1">Research Showcase</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#abstract" onClick={scrollToSection('abstract')} className="hover:text-tech-primary transition-colors">Abstract</a>
            <a href="#methodology" onClick={scrollToSection('methodology')} className="hover:text-tech-primary transition-colors">Methodology</a>
            <a href="#results" onClick={scrollToSection('results')} className="hover:text-tech-primary transition-colors">Results</a>
            <a href="#authors" onClick={scrollToSection('authors')} className="hover:text-tech-primary transition-colors">Authors</a>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-tech-primary transition-colors shadow-sm text-xs font-bold uppercase tracking-wide">
              <Download size={14} /> Paper
            </button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 text-lg font-bold text-slate-800 animate-fade-in">
            <a href="#abstract" onClick={scrollToSection('abstract')}>Abstract</a>
            <a href="#methodology" onClick={scrollToSection('methodology')}>Methodology</a>
            <a href="#results" onClick={scrollToSection('results')}>Results</a>
            <a href="#authors" onClick={scrollToSection('authors')}>Authors</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
        <HeroScene />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/10"></div>
        
        {/* Medical/Tech Grid Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
             style={{ 
                 backgroundImage: 'radial-gradient(rgba(14, 165, 233, 0.2) 1px, transparent 1px)', 
                 backgroundSize: '30px 30px' 
             }}>
        </div>

        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-tech-secondary/10 text-tech-secondary border border-tech-secondary/30 text-xs font-mono rounded-full backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tech-secondary animate-pulse"></span>
              IEEE PUBLICATION
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white tracking-tight drop-shadow-sm">
              Optimizing Speech Recognition for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-secondary to-blue-400">Medical Transcription</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-xl drop-shadow-sm">
              Fine-tuning the Whisper ASR model and developing a secure MERN-stack web application for efficient clinical documentation.
            </p>
            
            <div className="flex flex-wrap gap-4">
               <button onClick={scrollToSection('abstract')} className="px-6 py-3 bg-tech-primary hover:bg-blue-600 text-white font-bold rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,98,155,0.4)]">
                  Explore Research <ArrowDown size={18} />
               </button>
               <button className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-md text-slate-200 font-bold rounded-lg flex items-center gap-2 border border-slate-600 transition-all">
                  <Share2 size={18} /> Cite
               </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Abstract */}
        <section id="abstract" className="py-24 bg-white relative border-b border-slate-200">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                <div className="md:col-span-4">
                    <div className="sticky top-32">
                        <div className="w-16 h-1 bg-tech-secondary mb-6"></div>
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-6">The Challenge</h2>
                        <p className="text-slate-600 mb-6">
                            Manual note-taking diverts physician attention. Proprietary ASR solutions are expensive. Accents and medical jargon pose significant challenges.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                                <Mic className="text-tech-primary" /> <span className="text-slate-700 font-medium">Diverse Accents</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                                <Activity className="text-tech-primary" /> <span className="text-slate-700 font-medium">Background Noise</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 shadow-sm">
                                <Database className="text-tech-primary" /> <span className="text-slate-700 font-medium">Complex Terminology</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-8">
                    <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-lg">
                        <div className="mb-6 flex items-center gap-3">
                            <FileText className="text-tech-primary" size={24} />
                            <h3 className="text-2xl font-bold text-slate-900">Abstract</h3>
                        </div>
                        <p className="text-lg text-slate-800 leading-relaxed mb-6 text-justify">
                          Utilizing automatic speech recognition (ASR) in medical transcription can greatly improve healthcare professionals' productivity. In this work, we <strong className="text-tech-primary font-bold">fine-tuned the Whisper ASR system</strong>, known for its robustness, using medical speech data. The fine-tuned model achieved a <strong className="text-tech-primary font-bold">Word Error Rate (WER) of 7.5%</strong>, significantly outperforming the baseline.
                        </p>
                        <p className="text-lg text-slate-800 leading-relaxed mb-6 text-justify">
                           Further, we developed a <strong className="text-tech-primary font-bold">web application</strong> tailored for medical transcription using the MERN stack. The app offers secure login, audio recording, and report generation. Informal testing with six Indian doctors (362 utterances) yielded a WER of 19.4%, highlighting the need for further accent-specific fine-tuning.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-8">
                            {['Whisper ASR', 'Medical Transcription', 'Fine-Tuning', 'MERN Stack', 'Named Entity Recognition'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wide rounded-full border border-slate-200 shadow-sm hover:border-tech-primary/30 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Methodology / Architecture - Switched to Light Theme for Visibility */}
        <section id="methodology" className="py-24 bg-slate-50 text-slate-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="max-w-3xl">
                         <div className="flex items-center gap-2 text-tech-primary font-mono text-sm font-bold uppercase tracking-wider mb-2">
                            <Cpu size={16} /> Methodology
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-slate-900">System Architecture</h2>
                        {/* High contrast container for the description text */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                          <p className="text-slate-700 text-lg leading-relaxed">
                              We integrated the fine-tuned Whisper model into a full-stack web application. The pipeline includes feature extraction, ASR decoding, and Named Entity Recognition (NER) for extracting symptoms and medicines.
                          </p>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <BrainCircuit size={100} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white relative z-10">
                             <BrainCircuit className="text-tech-secondary" /> Data Processing Pipeline
                        </h3>
                        <div className="relative z-10">
                           <ArchitectureDiagram />
                        </div>
                        <div className="mt-8 space-y-4 text-sm text-slate-300 relative z-10">
                            <p><strong className="text-white">1. Feature Extraction:</strong> Audio is resampled to 16kHz and converted to log-Mel spectrograms.</p>
                            <p><strong className="text-white">2. ASR Engine:</strong> The fine-tuned Whisper (Small) model processes the spectrograms to generate raw text.</p>
                            <p><strong className="text-white">3. NER Module:</strong> Identifies biological entities (e.g., "knee pain", "headache") to structure the final medical report.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                         <div className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-200 shadow-lg">
                             <InteractiveModelDiagram />
                         </div>
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                             <h4 className="font-bold text-slate-900 mb-2">The Dataset</h4>
                             <p className="text-slate-600 text-sm leading-relaxed">
                                 We utilized the <strong className="text-slate-900">"Medical Speech, Transcription, and Intent"</strong> dataset, comprising 6,601 recordings (8.5 hours) of common medical symptoms.
                             </p>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Results */}
        <section id="results" className="py-24 bg-white overflow-hidden border-t border-slate-200">
            <div className="container mx-auto px-6 relative">
                 <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
                     <SimulationScene />
                 </div>

                <SectionHeader title="Performance Evaluation" subtitle="Experimental Results" icon={Activity} />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                     <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Fine-Tuning Impact</h3>
                            <p className="text-slate-700 leading-relaxed font-medium">
                                The Whisper 'small' model was fine-tuned over 600 steps. We observed a consistent decrease in training and test loss, validating the domain adaptation process.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center shadow-sm">
                                <div className="text-3xl font-extrabold text-slate-400">10.92%</div>
                                <div className="text-xs font-bold uppercase text-slate-500 mt-1">Baseline WER</div>
                            </div>
                            <div className="p-4 bg-tech-primary/5 border border-tech-primary/20 rounded-xl text-center shadow-sm">
                                <div className="text-3xl font-extrabold text-tech-primary">7.51%</div>
                                <div className="text-xs font-bold uppercase text-tech-primary mt-1">Fine-Tuned WER</div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-900 text-slate-300 rounded-xl text-sm leading-relaxed border-l-4 border-tech-secondary shadow-lg">
                             "The fine-tuned model demonstrated strong performance on standard medical data. However, real-world testing with Indian doctors (WER 19.4%) highlights the challenge of diverse accents."
                        </div>
                     </div>

                     <div className="lg:col-span-7">
                        <BenchmarkChart />
                     </div>
                </div>
            </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-slate-50 border-t border-slate-200">
             <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">Research Team</h2>
                    <p className="text-slate-600 mt-2 font-medium">Contributors from IIIT Dharwad & IIT Bhubaneswar</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <AuthorCard name="Rakesh Roushan" role="ECE Department" institute="IIIT Dharwad" />
                    <AuthorCard name="Harshit Mishra" role="ECE Department" institute="IIIT Dharwad" />
                    <AuthorCard name="Lucky Yadav" role="CSE Department" institute="IIIT Dharwad" />
                    <AuthorCard name="Sreeja Koppula" role="ECE Department" institute="IIIT Dharwad" />
                    <AuthorCard name="Nitya Tiwari" role="SECS" institute="IIT Bhubaneswar" />
                    <AuthorCard name="K S Nataraj" role="ECE Department" institute="IIIT Dharwad" />
                </div>
             </div>
        </section>

      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="mb-4 md:mb-0">
                    <div className="text-white font-bold text-2xl tracking-tight mb-1">IEEE Presentation</div>
                    <p className="text-xs text-slate-500 font-mono mt-1">Paper: Optimizing Speech Recognition for Medical Transcription</p>
                </div>
                <div className="flex gap-6 text-sm font-medium">
                    <a href="#" className="hover:text-white transition-colors">IEEE Xplore</a>
                    <a href="#" className="hover:text-white transition-colors">References</a>
                    <a href="#" className="hover:text-white transition-colors">Dataset</a>
                </div>
            </div>
            <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
                <div>© 2024 Research Presentation. Based on work by Roushan et al.</div>
                <div className="mt-2 md:mt-0">Visualized with React Three Fiber</div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
