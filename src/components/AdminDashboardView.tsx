import React, { useState } from 'react';
import { SmartBin, SupportTicket, UserProfile, AppNotification } from '../types';
import { INITIAL_TICKETS } from '../data';
import { Sliders, Cpu, Activity, Ticket, Users, Layers, ShieldCheck, CheckCircle2, AlertOctagon, PowerOff, Sparkles, Server } from 'lucide-react';

interface AdminDashboardViewProps {
  user: UserProfile;
  bins: SmartBin[];
  notifications: AppNotification[];
  onUpdateBins: (updated: SmartBin[]) => void;
  onAddLog: (log: AppNotification) => void;
}

export default function AdminDashboardView({
  user,
  bins,
  notifications,
  onUpdateBins,
  onAddLog
}: AdminDashboardViewProps) {
  const [adminTab, setAdminTab] = useState<'tickets' | 'clients' | 'nodes' | 'telemetry'>('tickets');
  
  // Local tickets state
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    return [...INITIAL_TICKETS];
  });

  // Client accounts list simulation
  const [clients, setClients] = useState<UserProfile[]>([
    { email: 'budi@smartcity-can.id', name: 'Ir. Budi Santoso', organization: 'Jakarta Municipal Government', plan: 'enterprise', billingStatus: 'Active', joinedDate: 'May 02, 2026', isVerified: true, canManageLocations: true },
    { email: 'clara.w@medikahospital.co.id', name: 'Dr. Clara Wijaya', organization: 'Medika General Hospital', plan: 'enterprise', billingStatus: 'Active', joinedDate: 'April 14, 2026', isVerified: true, canManageLocations: true },
    { email: 'thomas@nusantara.ac.id', name: 'Prof. Thomas Hardi', organization: 'Nusantara State University', plan: 'professional', billingStatus: 'Active', joinedDate: 'June 01, 2026', isVerified: true, canManageLocations: true },
    { email: 'lilaalfiana11@gmail.com', name: 'Lila Alfiana', organization: 'Smart City Partner Ltd', plan: 'professional', billingStatus: 'Active', joinedDate: 'Jan 15, 2026', isVerified: true, canManageLocations: true }
  ]);

  // Support ticket fields
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCat, setNewTicketCat] = useState<'Billing' | 'Sensor Issue' | 'Dashboard Access' | 'API Key'>('Sensor Issue');

  // Handle support ticket resolution
  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => {
      return prev.map(t => {
        if (t.id === ticketId) {
          onAddLog({
            id: `LOG-TCK-RES-${Date.now()}`,
            title: `Ticket Resolved: ${t.id}`,
            message: `SaaS admin resolved priority SLA ticket regarding "${t.subject}". Client notification dispatched.`,
            timestamp: 'Just now',
            read: false,
            type: 'info'
          });
          return { ...t, status: 'resolved' as const };
        }
        return t;
      });
    });
  };

  // Handle client plan modification
  const handleModifyClientPlan = (clientEmail: string, nextPlan: any) => {
    setClients(prev => {
      return prev.map(c => {
        if (c.email === clientEmail) {
          return { ...c, plan: nextPlan };
        }
        return c;
      });
    });
    
    // Add warning
    onAddLog({
      id: `LOG-ADMIN-MOD-${Date.now()}`,
      title: 'Client Profile Mod',
      message: `Administrator modified plan for client ${clientEmail} to ${nextPlan.toUpperCase()}. Quota limits changed.`,
      timestamp: 'Just now',
      read: false,
      type: 'warning'
    });
  };

  // Handle bin sensorState override (e.g. Toggle online/maintenance)
  const handleOverrideSensorState = (binId: string, nextState: 'online' | 'offline' | 'maintenance') => {
    const updated = bins.map(b => {
      if (b.id === binId) {
        onAddLog({
          id: `LOG-ADMO-${Date.now()}`,
          title: `Sensor State Overriden: ${b.id}`,
          message: `Administrative override set sensor node state to "${nextState.toUpperCase()}". Hardware command dispatched.`,
          timestamp: 'Just now',
          read: false,
          type: 'warning'
        });
        return { ...b, sensorState: nextState };
      }
      return b;
    });
    onUpdateBins(updated);
  };

  // Submit client support ticket simulator
  const handleCreateSupportTicketSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim()) return;

    const newT: SupportTicket = {
      id: `TCK-${200 + tickets.length + 1}`,
      subject: newTicketSubject.trim(),
      category: newTicketCat,
      status: 'open',
      priority: 'medium',
      createdAt: 'Just Now'
    };

    setTickets([newT, ...tickets]);
    setNewTicketSubject('');

    onAddLog({
      id: `LOG-TCK-CRE-${Date.now()}`,
      title: 'New Customer Support Ticket Raised',
      message: `System recorded customer support request: "${newT.subject}". Ticket logged under category: ${newT.category}.`,
      timestamp: 'Just now',
      read: false,
      type: 'info'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left space-y-8">
      
      {/* Platform Level Title header indicator */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center shadow-2xl relative overflow-hidden">
        
        <div className="space-y-1 relative z-10 text-left">
          <span className="text-[10px] bg-blue-500/20 text-blue-400 font-mono tracking-widest px-2 py-0.5 rounded-sm border border-blue-500/30 font-bold uppercase">
            SUPER-ADMINISTRATOR PRIVILEGES ACTIVED
          </span>
          <h2 className="font-sans font-black text-2xl truncate mt-1">Smart Trash Can IoT Admin Controller</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Central orchestration node for global databases, support queues, and cellular sensor payloads.
          </p>
        </div>

        {/* Real-time telemetry widgets */}
        <div className="grid grid-cols-3 gap-3 mt-4 md:mt-0 relative z-10 w-full md:w-auto font-mono">
          <div className="bg-slate-950 p-2.5 border border-slate-800 text-center rounded-xl">
            <span className="block text-[8px] text-slate-400 uppercase font-bold tracking-wider mb-1">SYSTEM CORES LOAD</span>
            <div className="flex items-center gap-1 bg-emerald-950/20 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <span>14.2% CPU</span>
            </div>
          </div>

          <div className="bg-slate-950 p-2.5 border border-slate-800 text-center rounded-xl">
            <span className="block text-[8px] text-slate-400 uppercase font-bold tracking-wider mb-1">MEMORY POOL</span>
            <span className="text-xs font-bold text-blue-400">1.2GB / 4.0GB</span>
          </div>

          <div className="bg-slate-950 p-2.5 border border-slate-800 text-center rounded-xl">
            <span className="block text-[8px] text-slate-400 uppercase font-bold tracking-wider mb-1">TUNNEL TUNNELS</span>
            <span className="text-xs font-bold text-purple-400">Active Sec SSL</span>
          </div>
        </div>

      </div>

      {/* Admin navigation tabs */}
      <div className="flex flex-wrap border-b border-gray-200 gap-1">
        {[
          { id: 'tickets', label: 'Support Tickets Queue', icon: <Ticket className="w-4 h-4" /> },
          { id: 'clients', label: 'Monitor Subscriptions & Clients', icon: <Users className="w-4 h-4" /> },
          { id: 'nodes', label: 'Global IoT Devices Controller', icon: <Layers className="w-4 h-4" /> },
          { id: 'telemetry', label: 'Cloud Core Analytics Logs', icon: <Activity className="w-4 h-4" /> },
        ].map((tab) => {
          const isSelected = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-xs sm:text-sm tracking-tight border-b-2 cursor-pointer transition-all duration-150 ${
                isSelected
                  ? 'text-blue-600 border-blue-600 font-bold'
                  : 'text-gray-500 border-transparent hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ADMIN PANELS VIEW CORES */}

      {/* TAB 1: SUPPORT TICKETS QUEUE */}
      {adminTab === 'tickets' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active tickets array (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-sans font-extrabold text-sm uppercase text-gray-500 tracking-wider">Active Customer Inquiries Support Queue ({tickets.length} Registered)</h3>
            
            <div className="space-y-4">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between text-left relative ${
                    t.status === 'open' ? 'border-amber-200' : 'border-gray-200 opacity-80'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="font-mono text-xs font-bold text-gray-400">{t.id}</span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                          t.category === 'Billing' ? 'bg-amber-100 text-amber-800' :
                          t.category === 'Sensor Issue' ? 'bg-red-100 text-red-800' :
                          t.category === 'API Key' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
                        }`}>
                          {t.category}
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                          t.priority === 'high' ? 'bg-red-50 text-red-600 font-black' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {t.priority} priority
                        </span>
                      </div>

                      <h4 className="font-sans font-bold text-sm text-gray-900 mt-2">{t.subject}</h4>
                      <p className="text-[11px] text-gray-400 font-mono">Submitted: {t.createdAt}</p>
                    </div>

                    <div className="shrink-0">
                      {t.status === 'resolved' ? (
                        <span className="inline-flex gap-1 items-center text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <CheckCircle2 className="w-4 h-4" /> Resolved
                        </span>
                      ) : (
                        <button
                          onClick={() => handleResolveTicket(t.id)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all"
                        >
                          Resolve &amp; Alert
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test/Simulate Ticket Creator form (Right 4 cols) */}
          <div className="lg:col-span-4 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-sans font-bold text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-spin" />
              <span>Raise Support Ticket Simulated</span>
            </h4>
            <p className="text-xs text-gray-400">
              Simulate raising a support ticket from an end-user client to see it process into the administrative dispatcher!
            </p>

            <form onSubmit={handleCreateSupportTicketSim} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Inquiry Subject Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cannot fetch API token key"
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Category Category</label>
                <select
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                  value={newTicketCat}
                  onChange={(e) => setNewTicketCat(e.target.value as any)}
                >
                  <option value="Billing">Billing (Invoices, cards)</option>
                  <option value="Sensor Issue">Sensor Issue (Calibration, battery)</option>
                  <option value="Dashboard Access">Dashboard Access</option>
                  <option value="API Key">API Key Webhook integration</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all"
              >
                Log Simulated Ticket
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 2: CLIENT ACCOUNTS AND SUBSCRIPTIONS MANAGER */}
      {adminTab === 'clients' && (
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="font-sans font-extrabold text-sm uppercase text-gray-500 tracking-wider">Registered Corporate SaaS Accounts list ({clients.length} Active Accounts)</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-600">
              <thead className="text-[10px] font-mono text-gray-400 uppercase tracking-wider bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Representative Client</th>
                  <th className="px-4 py-3">Corporate Organization</th>
                  <th className="px-4 py-3">Active Subscription Plan</th>
                  <th className="px-4 py-3">Billing Status</th>
                  <th className="px-4 py-3">Enroll Date</th>
                  <th className="px-4 py-3 text-right">Administrative Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.map((c) => (
                  <tr key={c.email} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      <div>{c.name}</div>
                      <span className="font-mono text-[10px] text-gray-400">{c.email}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 leading-normal">{c.organization}</td>
                    <td className="px-4 py-3">
                      <select
                        className="px-2 py-1 bg-gray-50 border rounded-lg text-[11px] font-bold uppercase cursor-pointer"
                        value={c.plan}
                        onChange={(e) => handleModifyClientPlan(c.email, e.target.value as any)}
                      >
                        <option value="starter">Starter</option>
                        <option value="professional">Professional</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-sm">
                        {c.billingStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-400">{c.joinedDate}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => alert(`Operational safeguard alert: Client payload details regarding "${c.organization}" requested through central control. Telemetry tunnels validated.`)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all"
                      >
                        Request Audit Logs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: GLOBAL IoT DEVICES CONTROLLER */}
      {adminTab === 'nodes' && (
        <div className="bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-6">
          <h3 className="font-sans font-extrabold text-sm uppercase text-gray-500 tracking-wider">Central Gateways Connected Nodes Management Panel</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bins.map((bin) => (
              <div key={bin.id} className="border border-gray-250 p-4 rounded-xl space-y-3 flex flex-col justify-between text-left">
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-gray-400">{bin.id}</span>
                    <h4 className="font-sans font-bold text-sm text-gray-900 mt-1">{bin.name}</h4>
                    <p className="text-[11px] text-gray-400 truncate leading-relaxed">{bin.location}</p>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    bin.sensorState === 'online' ? 'bg-emerald-100 text-emerald-800' :
                    bin.sensorState === 'offline' ? 'bg-red-105 bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {bin.sensorState.toUpperCase()}
                  </span>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl text-xs font-mono">
                  <div className="flex justify-between mb-1 text-gray-500">
                    <span>Current Load Density:</span>
                    <span className="font-bold text-gray-900">{bin.fillLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: `${bin.fillLevel}%` }} />
                  </div>
                </div>

                <div className="pt-2 border-t flex flex-wrap gap-1.5 items-center justify-between">
                  <span className="text-[9px] font-mono uppercase text-gray-400 font-bold">Override Sensor State:</span>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleOverrideSensorState(bin.id, 'online')}
                      className={`px-2 py-0.5 text-[9px] font-bold rounded-sm cursor-pointer ${
                        bin.sensorState === 'online' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Online
                    </button>
                    <button
                      onClick={() => handleOverrideSensorState(bin.id, 'offline')}
                      className={`px-2 py-0.5 text-[9px] font-bold rounded-sm cursor-pointer ${
                        bin.sensorState === 'offline' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Offline
                    </button>
                    <button
                      onClick={() => handleOverrideSensorState(bin.id, 'maintenance')}
                      className={`px-2 py-0.5 text-[9px] font-bold rounded-sm cursor-pointer ${
                        bin.sensorState === 'maintenance' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Maint
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: SAAS INFRASTRUCTURE HEALTH & LIVE TELEMETRY LOGS */}
      {adminTab === 'telemetry' && (
        <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Health Logs list */}
            <div className="space-y-4 text-left">
              <h3 className="font-sans font-extrabold text-sm uppercase text-gray-505 tracking-wider flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-500 animate-bounce" />
                <span>Active Cloud Gateway Web Log Payload</span>
              </h3>

              <div className="bg-slate-950 text-slate-300 font-mono text-[10px] p-4 rounded-xl border border-slate-800 space-y-2 max-h-[300px] overflow-y-auto">
                <p className="text-gray-500">[2026-05-30T13:37:10Z] SYSTEM CORE INIT: OK</p>
                <p className="text-emerald-400">[2026-05-30T13:37:11Z] NODE-CONN-OK: Gateway API established over SSL WebSocket.</p>
                <p className="text-gray-400">[2026-05-30T13:38:00Z] DIAGNOSTICS: Memory cache scrubbed. 0 stale sessions ejected.</p>
                <p className="text-gray-400">[2026-05-30T13:39:15Z] TELEMETRY UPDATED: Registered 7 sensor handshakes successful.</p>
                <p className="text-blue-400">[2026-05-30T13:40:22Z] API-CALL-AUTH: Token query from client Sudirman Suite Level 4.</p>
                {notifications.slice(0, 4).map((log, i) => (
                  <p key={i} className="text-amber-500">
                    [2026-05-30T13:42:{i}0Z] EVENT LOG: {log.title}
                  </p>
                ))}
                <p className="text-slate-500 animate-pulse font-bold">[2026-05-30T13:42:55Z] LISTENING CONNECTED PORTS INGRESS CHANNEL 3000...</p>
              </div>
            </div>

            {/* Performance Stats description */}
            <div className="space-y-4 text-left">
              <h3 className="font-sans font-extrabold text-sm uppercase text-gray-500 tracking-wider">Infrastructure Metric Insights</h3>
              
              <div className="bg-slate-50 border border-gray-150 p-4 rounded-xl rounded-2xl space-y-3 text-xs leading-relaxed text-gray-650">
                <p className="font-semibold text-gray-900">🚀 Express.js Cloud Reverse Proxy Pipeline Status:</p>
                <p className="text-gray-500">
                  Our container utilizes automated load ingress routing to multiplex telemetry payloads down to port 3000. All websocket transactions require AES-256 certificate validation to maintain smart-home and municipal integrity security.
                </p>

                <p className="font-semibold text-gray-900 mt-4">⚓ Sensor Web Hook API Gateway:</p>
                <p className="text-gray-500">
                  Smart City administrators can query raw device states directly via programmatic endpoints:
                  <code className="block bg-gray-900 text-slate-100 p-2 text-[10px] font-mono rounded-md mt-1 border border-gray-800">
                    GET https://{window.location.host}/api/v1/sensors/all
                  </code>
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
