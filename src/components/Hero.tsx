import React, { useState } from 'react';
import { Play, ArrowRight, Server, Wifi, Cpu, Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartTrial: () => void;
  onWatchDemo: () => void;
}

export default function Hero({ onStartTrial, onWatchDemo }: HeroProps) {
  const [activeTelemSlot, setActiveTelemSlot] = useState<number>(0);

  const mockIoTNodes = [
    { name: 'City Hall Block 2', lvl: 88, status: 'critical', temp: '29°C', battery: '91%', updated: '2s ago' },
    { name: 'Nusantara School Lobby', lvl: 24, status: 'normal', temp: '25°C', battery: '84%', updated: '5s ago' },
    { name: 'Medika ICU Lab Wing', lvl: 61, status: 'warning', temp: '21°C', battery: '100%', updated: '1s ago' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 lg:py-24">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)] opacity-40 bg-radial-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Context Left */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Cloud IoT Powered Waste Logistics v2.4
            </div>

            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight">
              Smart Waste Management for a <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">Cleaner and Smarter</span> Future
            </h1>

            <p className="font-sans text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Monitor waste levels in real time, receive automatic notifications, and optimize waste collection using cloud technology. Empower your organization or city with sustainable intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <button
                id="hero-trial-cta"
                onClick={onStartTrial}
                className="group px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-blue-600/20 active:scale-95 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-demo-cta"
                onClick={onWatchDemo}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 rounded-lg hover:border-slate-300 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="h-4 w-4 text-blue-600 fill-blue-600" />
                <span>Watch Demo &amp; Play</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 sm:pt-8 border-t border-slate-100 w-full">
              <div>
                <span className="block font-sans font-bold text-3xl text-slate-935 text-slate-900">Rp 50K</span>
                <span className="text-xs text-slate-400 font-medium uppercase font-mono tracking-wider">Starts At / Mo</span>
              </div>
              <div>
                <span className="block font-sans font-bold text-3xl text-slate-900">99.9%</span>
                <span className="text-xs text-slate-400 font-medium uppercase font-mono tracking-wider">Cloud Uptime</span>
              </div>
              <div>
                <span className="block font-sans font-bold text-3xl text-slate-900">&lt; 3.2s</span>
                <span className="text-xs text-slate-400 font-medium uppercase font-mono tracking-wider">Sensor Latency</span>
              </div>
            </div>

          </div>

          {/* Hero Graphic Right (Interactive IoT simulator) */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            
            {/* The Glassmorphic Terminal Screen */}
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden card-shadow">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-blue-400" />
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-md text-[10px] font-semibold font-mono">
                  <Wifi className="h-3 w-3 animate-pulse" />
                  <span>IOT-HUB-ONLINE</span>
                </div>
              </div>

              {/* Physical Smart Trash Can Display graphic */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/50 rounded-xl p-4 flex gap-4 items-center">
                
                {/* Trash Can Vector Illustration */}
                <div className="relative w-20 h-28 flex flex-col justify-between items-center bg-white rounded-lg border-2 border-slate-200 p-2 shadow-inner">
                  {/* Smart Sensor Unit On Top */}
                  <div className="absolute top-1 right-2 flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                    <Cpu className="h-3 w-3 text-blue-500" />
                  </div>

                  {/* Lid opening indicator */}
                  <div className="w-16 h-2 bg-slate-400 rounded-full mb-1 transition-transform origin-left duration-500 transform group-hover:-rotate-45" />
                  
                  {/* Visual Trash level inside */}
                  <div className="w-14 bg-slate-50 rounded-md flex-1 relative overflow-hidden flex flex-col justify-end">
                    <div 
                      className={`w-full transition-all duration-700 rounded-xs`}
                      style={{ 
                        height: `${mockIoTNodes[activeTelemSlot].lvl}%`,
                        backgroundColor: mockIoTNodes[activeTelemSlot].status === 'critical' ? '#EF4444' : 
                                        mockIoTNodes[activeTelemSlot].status === 'warning' ? '#F59E0B' : '#3B82F6'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-800 bg-white/70 px-1 rounded-sm">
                        {mockIoTNodes[activeTelemSlot].lvl}%
                      </span>
                    </div>
                  </div>

                  {/* Smart Can Legs style */}
                  <div className="flex justify-between w-12 mt-1">
                    <span className="w-2 h-1 bg-slate-500 rounded-b-xs" />
                    <span className="w-2 h-1 bg-gray-500 rounded-b-xs" />
                  </div>
                </div>

                {/* Live telemetry metadata stats */}
                <div className="flex-1 space-y-1.5 text-left">
                  <span className="text-[10px] text-slate-400 font-mono">NODE DATA FIELD</span>
                  <h4 className="font-bold text-sm text-slate-800 leading-none">{mockIoTNodes[activeTelemSlot].name}</h4>
                  
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1.5">
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono">TEMPERATURE</span>
                      <span className="font-mono text-xs text-slate-700 font-semibold">{mockIoTNodes[activeTelemSlot].temp}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono">BATTERY LIFE</span>
                      <span className="font-mono text-xs text-slate-700 font-semibold">{mockIoTNodes[activeTelemSlot].battery}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono">DATA LATENCY</span>
                      <span className="font-mono text-xs text-blue-600 font-semibold">{mockIoTNodes[activeTelemSlot].updated}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-400 font-mono">STATUS</span>
                      <span className={`font-mono text-[10px] px-1 rounded-xs uppercase font-bold leading-none ${
                        mockIoTNodes[activeTelemSlot].status === 'critical' ? 'bg-red-50 text-red-600' :
                        mockIoTNodes[activeTelemSlot].status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>{mockIoTNodes[activeTelemSlot].status}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Node selector buttons */}
              <div className="mt-4 flex flex-col space-y-2">
                <p className="text-[10px] text-slate-400 font-mono text-left uppercase font-bold">Switch Node Telemetry Transmitter</p>
                <div className="grid grid-cols-3 gap-2">
                  {mockIoTNodes.map((node, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTelemSlot(i)}
                      className={`px-2.5 py-2 rounded-lg text-[11px] font-medium text-left border cursor-pointer transition-all ${
                        activeTelemSlot === i
                          ? 'bg-blue-50 border-blue-500 text-blue-800 ring-2 ring-blue-500/10 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block truncate font-bold text-[10px]">{node.name.split(' ')[0]}</span>
                      <span className="text-[9px] font-mono opacity-80">{node.lvl}% Capacity</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra visual indicators overlay */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1"><Server className="w-3.5 h-3.5 text-blue-500" /> Express Cloud Gateway</span>
                <span className="flex items-center gap-1 text-blue-600 font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> SHA-256 Secured</span>
              </div>

            </div>

            {/* floating abstract background circles */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-100 rounded-full -z-10 blur-xl animate-bounce" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-100 rounded-full -z-10 blur-xl animate-pulse" />
          </div>

        </div>
      </div>
    </section>
  );
}
