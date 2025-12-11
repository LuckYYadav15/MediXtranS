
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, Network, Server, Router, Wifi, Mic, FileAudio, FileText, Stethoscope } from 'lucide-react';

// --- GENERIC INTERACTIVE NETWORK DIAGRAM -> WEB APP FLOW ---
export const InteractiveModelDiagram: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([0]);
  
  // Paper's Web App Flow: Frontend (React) -> Backend (Node) -> ASR (Whisper) -> DB (Mongo)
  const connections = [
      { from: 0, to: 1 }, // User -> Frontend
      { from: 1, to: 2 }, // Frontend -> Backend
      { from: 2, to: 3 }, // Backend -> ASR
      { from: 3, to: 2 }, // ASR -> Backend (Return text)
      { from: 2, to: 4 }, // Backend -> DB
  ];
  
  const nodes = [
      { id: 0, x: '10%', y: '50%', label: 'Doctor', icon: Stethoscope },
      { id: 1, x: '30%', y: '50%', label: 'React UI', icon: FileAudio },
      { id: 2, x: '55%', y: '50%', label: 'Node Server', icon: Server },
      { id: 3, x: '55%', y: '20%', label: 'Whisper ASR', icon: Activity },
      { id: 4, x: '80%', y: '50%', label: 'MongoDB', icon: Database },
  ];

  const toggleNode = (id: number) => {
    setActiveNodes(prev => {
        if (prev.includes(id)) return prev.filter(n => n !== id);
        return [...prev, id];
    });
  };

  const isConnectionActive = (from: number, to: number) => {
      // Simple logic: if both ends are active
      return activeNodes.includes(from) && activeNodes.includes(to);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full items-center mb-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Network size={18} className="text-tech-primary"/> Web App Workflow
          </h3>
          <span className="text-[10px] font-mono text-slate-400 uppercase">MERN Stack</span>
      </div>
      
      <div className="relative w-full h-64 bg-slate-50 rounded border border-slate-200 overflow-hidden">
         {/* Grid Background */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

         {/* Connections */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, i) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                const active = isConnectionActive(conn.from, conn.to);

                return (
                    <g key={i}>
                        <line 
                            x1={fromNode.x} y1={fromNode.y}
                            x2={toNode.x} y2={toNode.y}
                            stroke={active ? '#00B5E2' : '#CBD5E1'}
                            strokeWidth={2}
                            strokeDasharray={active ? "0" : "5,5"}
                            className="transition-all duration-300"
                        />
                         {/* Animated packet if active */}
                         {active && (
                             <circle r="3" fill="#00629B">
                                 <animateMotion 
                                    dur="2s" 
                                    repeatCount="indefinite"
                                    path={`M${fromNode.x},${fromNode.y} L${toNode.x},${toNode.y}`} 
                                 />
                             </circle>
                         )}
                    </g>
                );
            })}
         </svg>

         {/* Nodes */}
         {nodes.map((node) => {
             const Icon = node.icon;
             const isActive = activeNodes.includes(node.id);
             return (
                <div key={node.id} className="absolute -ml-6 -mt-6 flex flex-col items-center" style={{ left: node.x, top: node.y }}>
                     <button
                        onClick={() => toggleNode(node.id)}
                        className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all duration-300 z-10 shadow-sm ${isActive ? 'bg-white border-tech-primary text-tech-primary shadow-md' : 'bg-slate-100 border-slate-300 text-slate-400 hover:border-slate-400'}`}
                     >
                        <Icon size={20} />
                     </button>
                     <div className={`mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isActive ? 'bg-tech-primary text-white' : 'text-slate-500 bg-slate-200'}`}>
                         {node.label}
                     </div>
                </div>
             );
         })}
      </div>
      
      <div className="mt-4 text-xs text-slate-500 text-center">
          Interactive: Click nodes to activate MERN stack components.
      </div>
    </div>
  );
};

// --- ARCHITECTURE DIAGRAM (Paper Fig 1) ---
export const ArchitectureDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 5);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Steps: User -> Frontend -> Feature Extraction -> ASR Engine -> NER -> Report
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-between w-full gap-2 overflow-x-auto pb-4">
        
        {/* Step 1: User/FE */}
        <div className={`flex flex-col items-center gap-2 min-w-[60px] ${step >= 0 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded border flex items-center justify-center ${step === 0 ? 'border-tech-secondary bg-tech-secondary text-slate-900' : 'border-slate-600 bg-slate-800'}`}>
               <Mic size={18} />
            </div>
            <span className="text-[9px] font-mono uppercase text-slate-400 text-center">Input</span>
        </div>

        <div className="h-[1px] flex-1 bg-slate-700 mx-2"></div>

        {/* Step 2: Features */}
        <div className={`flex flex-col items-center gap-2 min-w-[60px] ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
             <div className={`w-10 h-10 rounded border flex items-center justify-center ${step === 1 ? 'border-tech-secondary bg-tech-secondary text-slate-900' : 'border-slate-600 bg-slate-800'}`}>
               <Activity size={18} />
            </div>
            <span className="text-[9px] font-mono uppercase text-slate-400 text-center">Spectrogram</span>
        </div>

        <div className="h-[1px] flex-1 bg-slate-700 mx-2"></div>

        {/* Step 3: ASR */}
        <div className={`flex flex-col items-center gap-2 min-w-[60px] ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
             <div className={`w-10 h-10 rounded border flex items-center justify-center ${step === 2 ? 'border-tech-secondary bg-tech-secondary text-slate-900' : 'border-slate-600 bg-slate-800'}`}>
               <Server size={18} />
            </div>
            <span className="text-[9px] font-mono uppercase text-slate-400 text-center">Whisper</span>
        </div>

         <div className="h-[1px] flex-1 bg-slate-700 mx-2"></div>

        {/* Step 4: NER */}
        <div className={`flex flex-col items-center gap-2 min-w-[60px] ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded border flex items-center justify-center ${step === 3 ? 'border-tech-secondary bg-tech-secondary text-slate-900' : 'border-slate-600 bg-slate-800'}`}>
               <Database size={18} />
            </div>
            <span className="text-[9px] font-mono uppercase text-slate-400 text-center">NER</span>
        </div>

        <div className="h-[1px] flex-1 bg-slate-700 mx-2"></div>

         {/* Step 5: Report */}
        <div className={`flex flex-col items-center gap-2 min-w-[60px] ${step >= 4 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded border flex items-center justify-center ${step === 4 ? 'border-green-500 bg-green-500 text-slate-900' : 'border-slate-600 bg-slate-800'}`}>
               <FileText size={18} />
            </div>
            <span className="text-[9px] font-mono uppercase text-slate-400 text-center">Report</span>
        </div>

      </div>
    </div>
  );
};

// --- BENCHMARK CHART (Paper Table I) ---
export const BenchmarkChart: React.FC = () => {
    // Data from Table I: WER over steps
    const data = [
        { step: '100', wer: 32.17 },
        { step: '200', wer: 12.56 },
        { step: '300', wer: 9.15 },
        { step: '400', wer: 8.21 },
        { step: '500', wer: 7.92 },
        { step: '600', wer: 7.51 } // Best
    ];

    const maxWER = 35;

    return (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col justify-center">
             <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                 WER Improvement During Fine-Tuning
             </h3>
             <p className="text-xs text-slate-500 mb-8 font-mono">Word Error Rate (%) vs Training Steps</p>
             
             <div className="flex items-end justify-between h-48 gap-2 border-b border-slate-200 pb-2 relative">
                 {/* Y-Axis Grid Lines */}
                 <div className="absolute inset-0 pointer-events-none flex flex-col justify-between text-[10px] text-slate-300">
                    <div className="w-full border-t border-slate-100">30%</div>
                    <div className="w-full border-t border-slate-100">20%</div>
                    <div className="w-full border-t border-slate-100">10%</div>
                    <div className="w-full border-t border-slate-100">0%</div>
                 </div>

                 {data.map((item, index) => (
                     <div key={index} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
                         <div className="mb-2 text-xs font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">
                            {item.wer}%
                         </div>
                         <motion.div 
                            className={`w-full max-w-[40px] rounded-t-sm ${index === 5 ? 'bg-tech-primary' : 'bg-slate-300'}`}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(item.wer / maxWER) * 100}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                         />
                         <div className="mt-2 text-[10px] font-mono text-slate-500">{item.step}</div>
                     </div>
                 ))}
             </div>
             <div className="text-center text-[10px] text-slate-400 mt-2 font-mono uppercase tracking-widest">Training Steps</div>
        </div>
    )
}
