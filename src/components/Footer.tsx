import React from 'react';
import { Trash2, ShieldCheck, Mail, Github } from 'lucide-react';

interface FooterProps {
  setActiveSection: (sec: string) => void;
}

export default function Footer({ setActiveSection }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 sm:py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mb-12">
          
          {/* Logo brand & Address info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md">
                <Trash2 className="h-5 w-5" />
              </div>
              <span className="font-sans font-extrabold text-white text-lg tracking-tight">
                Smart Trash Can
              </span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              An intelligent cloud-managed municipal sanitation platform powered by cellular IoT ranging sensors to optimize waste logistics and civic energy.
            </p>

            <span className="text-[10px] uppercase font-mono tracking-wider font-bold block text-slate-500">
              Jl. Jenderal Sudirman Kav. 8, Central Jakarta, Indonesia
            </span>
          </div>

          {/* Quick links columns (3 columns of 2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase font-mono tracking-wider text-[10px]">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveSection('features')} className="hover:text-blue-400 text-left cursor-pointer">Enterprise Features</button></li>
              <li><button onClick={() => setActiveSection('pricing')} className="hover:text-blue-400 text-left cursor-pointer">Pricing Packages</button></li>
              <li><button onClick={() => setActiveSection('demo')} className="hover:text-blue-400 text-left cursor-pointer">Interactive Play Demo</button></li>
              <li><button onClick={() => setActiveSection('about')} className="hover:text-blue-400 text-left cursor-pointer">Core Mission</button></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase font-mono tracking-wider text-[10px]">Target Audiences</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveSection('features')} className="hover:text-blue-400 text-left cursor-pointer">Schools &amp; Campus</button></li>
              <li><button onClick={() => setActiveSection('features')} className="hover:text-blue-400 text-left cursor-pointer">Hospitals &amp; Clinical</button></li>
              <li><button onClick={() => setActiveSection('features')} className="hover:text-blue-400 text-left cursor-pointer">Shopping Centers</button></li>
              <li><button onClick={() => setActiveSection('features')} className="hover:text-blue-400 text-left cursor-pointer">Smart Cities</button></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase font-mono tracking-wider text-[10px]">Legal SLA Compliance</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-blue-400 block text-left">Privacy &amp; Cookies Protocol</a></li>
              <li><a href="#about" className="hover:text-blue-400 block text-left">Hardware Guarantee SLA</a></li>
              <li><a href="#about" className="hover:text-blue-400 block text-left font-mono text-[10px]">ISO-27001 Certified System</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom footer credit bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span>Smart Trash Can © 2026. All rights reserved. Indonesian IoT Ecosystem.</span>
          </span>

          <div className="flex gap-4">
            <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest font-bold">Secure SSL Connection</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
