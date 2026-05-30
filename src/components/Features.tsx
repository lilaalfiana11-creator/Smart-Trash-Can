import React, { useState } from 'react';
import { Eye, Bell, Cpu, Link, BarChart2, Radio, Check, Landmark, GraduationCap, Building2, ShieldQuestion } from 'lucide-react';

export default function Features() {
  const [activeTab, setActiveTab] = useState<'tech' | 'targets'>('tech');

  const technicalFeatures = [
    {
      icon: <Eye className="h-6 w-6 text-blue-600" />,
      title: 'Real-Time Monitoring',
      desc: 'Track trash bin fill levels from anywhere through modern cloud dashboards. View accurate 1% level increases instantly.'
    },
    {
      icon: <Bell className="h-6 w-6 text-amber-500" />,
      title: 'Automatic Notifications',
      desc: 'Receive alerts over SMS, email, and web hooks the moment a trash bin reaches critical capacity. Avoid costly overflows.'
    },
    {
      icon: <Cpu className="h-6 w-6 text-indigo-500" />,
      title: 'Touchless Operation',
      desc: 'Automatic lid opening using medical-grade proximity sensors. Enhances public health hygiene and touchless user convenience.'
    },
    {
      icon: <Link className="h-6 w-6 text-blue-500" />,
      title: 'Multi-Location Management',
      desc: 'Monitor hundreds of trash bins scattered across multiple buildings, departments, or cities in a single pane of glass.'
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-purple-500" />,
      title: 'Cloud Analytics',
      desc: 'Generate deep historical analytics, trash creation trends, and schedule path optimizing collection performance reports.'
    },
    {
      icon: <Radio className="h-6 w-6 text-sky-500" />,
      title: 'Smart City Integration',
      desc: 'Designed for government integration with support for central urban planning systems, open APIs, and dashboard relays.'
    }
  ];

  const targetMarkets = [
    {
      icon: <Landmark className="h-7 w-7 text-blue-600" />,
      title: 'Government Agencies & Smart Cities',
      challenge: 'High civic waste budgets, fuel waste during blind pickups, environmental overflow smell complaints.',
      sol: 'Dynamic path routing for garbage collector fleets using smart fill level indicators. Cut operational costs by up to 35%.'
    },
    {
      icon: <GraduationCap className="h-7 w-7 text-indigo-600" />,
      title: 'Schools and Universities',
      challenge: 'Thousands of dynamic students dumping plastics/papers randomly across large multi-building campuses.',
      sol: 'Eco-recycle sensors notifying central facilities. Gamify clean-campus drives using real fill-level competition stats.'
    },
    {
      icon: <Building2 className="h-7 w-7 text-blue-700" />,
      title: 'Hospitals & Specialized Clinics',
      challenge: 'Strict contamination laws. Hazard bins must be cleared immediately when close to capacity.',
      sol: 'Automated 24/7 instant notifications specifically routed to bio-hazardous sanitizing extraction crews.'
    },
    {
      icon: <Building2 className="h-7 w-7 text-purple-600" />,
      title: 'Corporate Offices & Retail Malls',
      challenge: 'Maintaining modern premium visual aesthetics. Overflowing bins look unprofessional to clients.',
      sol: 'Sensors integrated quietly in premium cabinets. Dispatch alerts to facilities team secretly before bins exceed 80%.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50/50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
            Product Capabilities Detail
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
            How Smart Trash Can Transforms Your Facilities
          </h2>
          <p className="text-slate-600">
            Say goodbye to mechanical schedules and heavy workforce allocations. Our unified hardware-to-cloud ecosystem automates sanitary operations globally.
          </p>
 
          {/* Tab Selector */}
          <div className="inline-flex p-1 bg-white border border-slate-200/60 rounded-xl shadow-xs mt-4">
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'tech'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              Enterprise Features
            </button>
            <button
              onClick={() => setActiveTab('targets')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'targets'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              Target Audiences
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 transition-all duration-300">
          {activeTab === 'tech' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technicalFeatures.map((feat, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 w-fit rounded-xl">
                      {feat.icon}
                    </div>
                    <h3 className="font-sans font-bold text-lg text-slate-900">{feat.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center text-xs font-semibold text-blue-600">
                    <Check className="h-4 w-4 mr-1.5" /> Core System Standard
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {targetMarkets.map((tgt, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-slate-150 card-shadow hover:shadow-md flex flex-col sm:flex-row gap-6 text-left"
                >
                  <div className="p-4 bg-blue-50/50 text-blue-700 rounded-2xl h-fit w-fit">
                    {tgt.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-sans font-bold text-xl text-slate-900">{tgt.title}</h3>
                    <div>
                      <span className="inline-block text-[10px] font-bold text-red-650 bg-red-50/80 px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1">
                        Operational Friction
                      </span>
                      <p className="text-sm text-slate-500 leading-relaxed">{tgt.challenge}</p>
                    </div>
                    <div>
                      <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1">
                        IoT Smart Trash Can Solution
                      </span>
                      <p className="text-sm text-blue-950 font-semibold leading-relaxed">{tgt.sol}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
