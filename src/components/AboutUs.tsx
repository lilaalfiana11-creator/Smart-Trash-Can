import React, { useState } from 'react';
import { Target, Shield, Heart, HelpCircle, Leaf, Trash2, ChevronDown, ChevronUp, Battery, Wrench, Settings } from 'lucide-react';

export default function AboutUs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      id: 0,
      icon: <Settings className="w-5 h-5 text-blue-500 shrink-0" />,
      category: "Installation",
      question: "How do we mount the Smart Trash Can IoT sensors, and do they fit existing bins?",
      answer: "Our sensors are universally designed and can be installed in under 5 minutes on virtually any standard plastic, metal, wood, or concrete utility bin. They mount securely via tamper-proof security rivets or high-strength industrial adhesive brackets on the inner underside of the lid. No local cellular gateway, server, or complex network pairing is required—each device is self-provisioning via built-in cellular IoT."
    },
    {
      id: 1,
      icon: <Battery className="w-5 h-5 text-blue-500 shrink-0 animate-pulse" />,
      category: "Battery Life",
      question: "What is the average battery life and how are power alerts handled?",
      answer: "Equipped with state-of-the-art lithium-thionyl chloride battery packs and adaptive micro-reporting algorithms, each sensor boasts an outstanding battery life of up to 6 to 8 years under active cloud telemetry. The system uses micro-amperage sleep states and only fires cellular packets when volume shifts occur or during a scheduled daily heartbeat ping. Automatic low-battery warning indicators will trigger on your dashboard and dispatch emails when charge levels drop below 15%."
    },
    {
      id: 2,
      icon: <Wrench className="w-5 h-5 text-blue-500 shrink-0" />,
      category: "Maintenance",
      question: "What maintenance do the sensors require under extreme weather conditions?",
      answer: "Designed for rugged municipal operations, our sensors feature IP68-rated vacuum-sealed dust/water casings and non-stick hydrophobic polymer lens coatings that actively repel liquid residues, moisture, and dust buildup. They are fully certified for all climates ranging from -30°C (-22°F) to 75°C (167°F). Outside of a rapid annual inspect-and-wipe check during scheduled routine bin washdowns, they operate completely maintenance-free."
    }
  ];

  const toggleFaq = (id: number) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  return (
    <section id="about" className="py-20 bg-white scroll-mt-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Mission info description text on Left */}
          <div className="space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
              Who We Are
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Building smarter, cleaner, and more sustainable environments through cloud-powered waste management.
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Smart Trash Can was born in response to the massive inefficiency of static municipal scheduling. Modern cities utilize advanced algorithms for logistics and packages, so why do we still pick up empty garbage cans or ignore overflowing public bins?
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              By packaging state-of-the-art ultrasound distance sensors, cellular IoT technology, and cloud analytics into a durable casing, we allow sanitary teams to act only when necessary. Our solutions empower smart homes, school districts, regional medical campuses, and entire municipalities to optimize waste disposal and support smart city initiatives in real time.
            </p>

            {/* Sub values block checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex gap-2.5 items-start">
                <Leaf className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900">Green Logistics Initiative</h4>
                  <p className="text-xs text-slate-400 font-medium">Reducing carbon footprint indices by avoiding redundant diesel garbage truck trips.</p>
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900">Health &amp; Security Shield</h4>
                  <p className="text-xs text-slate-400 font-medium">Ensuring hazardous hospital waste or office food waste never overflows or smells.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Visuals and Stats grid on Right */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-205 relative overflow-hidden flex flex-col justify-between card-shadow">
            <div className="absolute top-0 right-0 p-8 text-blue-300 pointer-events-none opacity-20">
              <Trash2 className="w-40 h-40" />
            </div>

            <div className="space-y-6 relative">
              <h3 className="font-sans font-extrabold text-xl text-slate-950">Active Global Cloud Telemetry Impact</h3>
              <p className="text-xs text-slate-755 font-semibold leading-relaxed">
                Our IoT chips are monitoring facilities internationally in real time. In the past 12 months, our connected devices registered the following benchmarks:
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-xs text-left">
                  <span className="block font-mono font-black text-2xl text-blue-600">12,400+</span>
                  <span className="text-[10px] text-slate-450 font-semibold uppercase tracking-wider font-mono">Sensors Monitored</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-xs text-left">
                  <span className="block font-mono font-black text-2xl text-blue-600">Rp 1.4B+</span>
                  <span className="text-[10px] text-slate-450 font-semibold uppercase tracking-wider font-mono">Civic Fuel Saved</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-xs text-left">
                  <span className="block font-mono font-black text-2xl text-blue-600">420,000+</span>
                  <span className="text-[10px] text-slate-450 font-semibold uppercase tracking-wider font-mono">Overflows Blocked</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-xs text-left">
                  <span className="block font-mono font-black text-2xl text-slate-800 text-blue-600 font-bold">32% Avg</span>
                  <span className="text-[10px] text-slate-450 font-semibold uppercase tracking-wider font-mono">Carbon Reduction</span>
                </div>
              </div>

              {/* Helpful quote card overlay */}
              <div className="p-4 bg-slate-950 text-white rounded-xl text-left border border-slate-800 shadow-lg">
                <p className="text-xs italic leading-relaxed font-sans text-slate-200">
                  "Building cleaner communities requires leveraging real data. We believe intelligent waste monitoring will soon become the standard expectation for civil infrastructure globally."
                </p>
                <span className="block text-[9px] mt-2 font-mono uppercase tracking-widest text-blue-400 font-bold">— Operations Group, Smart Trash Can</span>
              </div>
            </div>

          </div>

        </div>

        {/* --- FAQ SECTION FOR THE ABOUT US PAGE --- */}
        <div className="mt-20 pt-12 border-t border-slate-150">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
              Operations Center FAQ
            </span>
            <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Common Procurement &amp; Logistics Questions
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              Everything municipal sanitary operators, hospital leads, and corporate campus managers need to know about setting up and running our intelligent sensor grids.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-slate-50 rounded-2xl border border-slate-150 overflow-hidden transition-all duration-200 card-shadow"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:bg-slate-100/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-xs">
                        {faq.icon}
                      </div>
                      <div className="text-left">
                        <span className="block text-[10px] font-mono tracking-wider font-bold text-blue-600 uppercase mb-0.5">
                          {faq.category}
                        </span>
                        <h4 className="font-sans text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                    </div>
                    <div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[350px] border-t border-slate-150 p-5 bg-white text-slate-600" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
