import React, { useState, useEffect } from 'react';
import { Database, AlertTriangle, MapPin, CheckCircle, RefreshCw, Plus, Trash2, TrendingUp, Sparkles, BellRing } from 'lucide-react';
import { SmartBin, AppNotification } from '../types';
import { INITIAL_BINS, INITIAL_NOTIFICATIONS } from '../data';

export default function DashboardDemo() {
  const [demoBins, setDemoBins] = useState<SmartBin[]>(() => {
    return [...INITIAL_BINS];
  });

  const [demoLogs, setDemoLogs] = useState<AppNotification[]>(() => {
    return [...INITIAL_NOTIFICATIONS];
  });

  const [selectedBinTypeFilter, setSelectedBinTypeFilter] = useState<string>('all');
  const [isSimulatingCycle, setIsSimulatingCycle] = useState(false);

  // Derive stats dynamically
  const totalBinsCount = demoBins.length;
  const fullBinsCount = demoBins.filter(b => b.fillLevel >= 85).length;
  const onlineCount = demoBins.filter(b => b.sensorState === 'online').length;
  
  // Calculate average collection efficiency percentage
  const avgEfficiency = Math.round(100 - (demoBins.filter(b => b.fillLevel > 75).length / totalBinsCount) * 40);

  const triggerMockTrashImpact = (binId: string) => {
    setDemoBins(prevBins => {
      return prevBins.map(bin => {
        if (bin.id === binId) {
          const nextFill = Math.min(100, bin.fillLevel + 15);
          let nextStatus: 'normal' | 'warning' | 'critical' = 'normal';
          if (nextFill >= 85) nextStatus = 'critical';
          else if (nextFill >= 60) nextStatus = 'warning';

          // Emit alert if it just became critical
          if (nextFill >= 85 && bin.fillLevel < 85) {
            const pathNode = bin.name;
            const newAlert: AppNotification = {
              id: `DEMO-ALERT-${Date.now()}`,
              title: `Telemetry alert: ${bin.id} reached ${nextFill}% capacity!`,
              message: `${bin.name} located at ${bin.location} is overflowing. Dynamic routing engine suggests collection schedule prioritization.`,
              timestamp: 'Just now',
              read: false,
              type: 'alert'
            };
            setDemoLogs(logs => [newAlert, ...logs]);
          }

          return {
            ...bin,
            fillLevel: nextFill,
            status: nextStatus
          };
        }
        return bin;
      });
    });
  };

  const triggerCleanCollection = (binId: string) => {
    setDemoBins(prevBins => {
      return prevBins.map(bin => {
        if (bin.id === binId) {
          const newNotif: AppNotification = {
            id: `DEMO-LOG-${Date.now()}`,
            title: `Sanitation Dispatched: ${bin.id} cleared`,
            message: `${bin.name} successfully emptied. Status returned to normal. Recorded collection efficiency weight 44kg trash.`,
            timestamp: 'Just now',
            read: false,
            type: 'info'
          };
          setDemoLogs(logs => [newNotif, ...logs]);

          return {
            ...bin,
            fillLevel: 0,
            status: 'normal',
            lastCollected: 'Just Now by Fleet 3'
          };
        }
        return bin;
      });
    });
  };

  const simulateRandomTraffic = () => {
    setIsSimulatingCycle(true);
    setTimeout(() => {
      setDemoBins(prevBins => {
        return prevBins.map(bin => {
          // Increase level of dynamic bins slightly
          const addedVal = Math.floor(Math.random() * 20) + 5;
          const nextFill = Math.min(100, bin.fillLevel + addedVal);
          let nextStatus: 'normal' | 'warning' | 'critical' = 'normal';
          if (nextFill >= 85) nextStatus = 'critical';
          else if (nextFill >= 60) nextStatus = 'warning';

          if (nextFill >= 85 && bin.fillLevel < 85) {
            // Push notification
            const newAlert: AppNotification = {
              id: `DEMO-ALERT-${Date.now() + Math.random()}`,
              title: `High Load: ${bin.id} at ${nextFill}%`,
              message: `Simulated customer traffic on ${bin.name} triggered high-level warning.`,
              timestamp: 'Just now',
              read: false,
              type: 'warning'
            };
            setDemoLogs(logs => [newAlert, ...logs]);
          }

          return {
            ...bin,
            fillLevel: nextFill,
            status: nextStatus
          };
        });
      });
      setIsSimulatingCycle(false);
    }, 800);
  };

  const triggerEmptyAll = () => {
    setDemoBins(prevBins => {
      return prevBins.map(bin => ({
        ...bin,
        fillLevel: 0,
        status: 'normal',
        lastCollected: 'Collected All, Just Now'
      }));
    });
    const infoNotif: AppNotification = {
      id: `DEMO-LOG-ALL-${Date.now()}`,
      title: 'Full Fleet Dispatch',
      message: 'Simulated sanitation fleet routed. Emptied all connected smart trash nodes successfully.',
      timestamp: 'Just now',
      read: false,
      type: 'info'
    };
    setDemoLogs(logs => [infoNotif, ...logs]);
  };

  const filteredBins = selectedBinTypeFilter === 'all'
    ? demoBins
    : demoBins.filter(b => b.type === selectedBinTypeFilter);

  return (
    <section id="demo" className="py-20 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
            Interactive SaaS Simulator
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Explore the Real-Time Cloud Dashboard Demo
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Click on bins to simulate waste disposal, run collection loops, and witness real-time alerting systems. No sign-up required to test our cloud environment!
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <button
              onClick={simulateRandomTraffic}
              disabled={isSimulatingCycle}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-60 text-xs font-semibold rounded-xl border border-blue-100 transition-all cursor-pointer"
            >
              <RefreshCw className={`h-3 w-3 ${isSimulatingCycle ? 'animate-spin' : ''}`} />
              <span>{isSimulatingCycle ? 'Simulating Traffic...' : 'Simulate Guest Traffic (+15%)'}</span>
            </button>
            <button
              onClick={triggerEmptyAll}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold rounded-xl border border-blue-100 transition-all cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
              <span>Simulate Garbage Collection (Empty All)</span>
            </button>
          </div>
        </div>

        {/* Dashboard Frame Mockup */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 text-left text-slate-200 overflow-hidden relative">
          
          {/* Header of SaaS Dashboard Interface */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                <span className="font-mono text-[10px] text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded-sm border border-blue-800/40 font-bold tracking-widest">
                  LIVE TELEMETRY STREAM
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">SmartCity Central Operations Panel</h3>
            </div>
            
            {/* Quick Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {['all', 'general', 'recycle', 'organic', 'hazardous'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedBinTypeFilter(filter)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg font-mono transition-all cursor-pointer uppercase ${
                    selectedBinTypeFilter === filter
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics grid (Total connected, Full cans, uptime, efficiency) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-blue-950 text-blue-450 rounded-lg">
                <Database className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono tracking-wider font-semibold uppercase">Total Smart Bins</span>
                <span className="text-xl font-bold font-mono text-white">{totalBinsCount}</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-red-950/60 text-red-400 rounded-lg">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono tracking-wider font-semibold uppercase font-bold text-red-500">Critical / Full Bins</span>
                <span className="text-xl font-bold font-mono text-white">{fullBinsCount} <span className="text-xs text-slate-500 font-normal">/ {totalBinsCount}</span></span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-blue-950/60 text-blue-400 rounded-lg">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono tracking-wider font-semibold uppercase">Online Receivers</span>
                <span className="text-xl font-bold font-mono text-blue-400">{onlineCount} <span className="text-xs text-slate-400 font-normal">/ {totalBinsCount}</span></span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-purple-950 text-purple-400 rounded-lg">
                <CheckCircle className="h-5 w-5 animate-bounce" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-mono tracking-wider font-semibold uppercase">Logistics Efficiency</span>
                <span className="text-xl font-bold font-mono text-white">{avgEfficiency}%</span>
              </div>
            </div>

          </div>

          {/* Main Layout Grid of SaaS mockup */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* List of Smart Cans (Left column 8 cols) */}
            <div className="xl:col-span-8 space-y-3">
              <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase font-bold flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-500" /> Sensor Output Hub ({filteredBins.length} Nodes)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBins.map((bin) => (
                  <div
                    key={bin.id}
                    className={`bg-slate-900/95 p-4 border rounded-xl hover:border-slate-700 transition-all flex flex-col justify-between group ${
                      bin.fillLevel >= 85 ? 'ring-1 ring-red-500/20 border-red-900/60' : 'border-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex gap-2">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                            bin.type === 'organic' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/30' :
                            bin.type === 'recycle' ? 'bg-blue-950/80 text-blue-400 border border-blue-800/30' :
                            bin.type === 'hazardous' ? 'bg-red-950/80 text-red-400 border border-red-800/30' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {bin.type}
                          </span>
                          <span className="text-slate-400 text-xs font-mono font-semibold">{bin.id}</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${
                          bin.sensorState === 'online' ? 'bg-blue-500' :
                          bin.sensorState === 'offline' ? 'bg-red-500' : 'bg-amber-500'
                        }`} title={`Sensor details: ${bin.sensorState}`} />
                      </div>

                      <h5 className="font-bold text-sm text-slate-100 mt-2">{bin.name}</h5>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate leading-relaxed">{bin.location}</p>

                      {/* Level Indicator Bar */}
                      <div className="mt-4 pt-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1 leading-none">
                          <span>FILL CONGREGATION</span>
                          <span className={`font-bold ${
                            bin.fillLevel >= 85 ? 'text-red-400' :
                            bin.fillLevel >= 60 ? 'text-amber-400' : 'text-blue-400'
                          }`}>{bin.fillLevel}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              bin.fillLevel >= 85 ? 'bg-red-500' :
                              bin.fillLevel >= 60 ? 'bg-amber-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${bin.fillLevel}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Operational Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono italic">
                        Last collected: {bin.lastCollected}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => triggerMockTrashImpact(bin.id)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-[10px] font-semibold rounded-md text-slate-300 transition-all flex items-center gap-0.5 cursor-pointer"
                          title="Simulate adding some volume to this trash can"
                        >
                          <Plus className="w-3 h-3 text-blue-400" />
                          <span>Dump trash</span>
                        </button>
                        <button
                          onClick={() => triggerCleanCollection(bin.id)}
                          className="px-2 py-1 bg-blue-950 hover:bg-blue-900 active:bg-blue-900 text-[10px] font-semibold rounded-md text-blue-400 transition-all flex items-center gap-0.5 cursor-pointer"
                          title="Trigger mock crew pickup emptying"
                        >
                          <RefreshCw className="w-3 h-3 text-blue-400" />
                          <span>Clear Can</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Alerts log / Analytics (Right column 4 cols) */}
            <div className="xl:col-span-4 space-y-4">
              <div>
                <h4 className="text-xs font-mono tracking-wider text-gray-400 uppercase font-bold flex items-center gap-1.5 mb-2.5">
                  <BellRing className="w-4 h-4 text-amber-500" /> Dynamic Telemetry Log
                </h4>
                
                {/* Simulated alerts container */}
                <div className="bg-gray-900/90 border border-gray-800/80 rounded-xl p-3 max-h-[352px] overflow-y-auto space-y-2.5 divide-y divide-gray-800/40">
                  {demoLogs.length === 0 ? (
                    <p className="text-xs text-gray-500 py-6 text-center">No notifications yet. Push "Dump trash" above to trigger alert levels!</p>
                  ) : (
                    demoLogs.map((log) => (
                      <div key={log.id} className="pt-2 sm:pt-2.5 text-[11px] first:pt-0">
                        <div className="flex justify-between items-start">
                          <span className={`font-mono text-[9px] px-1 rounded-xs uppercase font-bold leading-tight ${
                            log.type === 'alert' ? 'bg-red-950 text-red-400 border border-red-800' :
                            log.type === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            'bg-blue-950 text-blue-400 border border-blue-800'
                          }`}>
                            {log.type}
                          </span>
                          <span className="text-[8px] text-gray-500 font-mono">{log.timestamp}</span>
                        </div>
                        <p className="text-gray-200 mt-1 font-bold leading-tight">{log.title}</p>
                        <p className="text-gray-400 mt-0.5 text-[10px] leading-relaxed">{log.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Extra Dynamic Stats panel */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800/80 rounded-xl p-4 text-left">
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EMULATED SYSTEM HEALTH</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Active Gateway ID</span>
                    <span className="text-slate-100 font-semibold">ASIA-EAST-RUN-3</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Cloud Sync Rate</span>
                    <span className="text-blue-400 font-semibold">Real-Time (SSE Stream)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Database Engine</span>
                    <span className="text-slate-100 font-semibold">IndexedDB Mock Stack</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
