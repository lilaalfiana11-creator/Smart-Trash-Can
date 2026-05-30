import React, { useState, useEffect } from 'react';
import { SmartBin, UserProfile, AppNotification, Invoice, PlanType } from '../types';
import { Database, TrendingUp, CreditCard, User, AlertTriangle, RefreshCw, BarChart3, Plus, Search, FileDown, Trash2, Battery, Check, Mail, Sliders } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'motion/react';

interface UserDashboardViewProps {
  user: UserProfile;
  bins: SmartBin[];
  notifications: AppNotification[];
  onUpdateUser: (updated: UserProfile) => void;
  onUpdateBins: (updated: SmartBin[]) => void;
  onAddLog: (log: AppNotification) => void;
}

export default function UserDashboardView({
  user,
  bins,
  notifications,
  onUpdateUser,
  onUpdateBins,
  onAddLog
}: UserDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'nodes' | 'analytics' | 'billing' | 'profile'>('nodes');
  const [isFetching, setIsFetching] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Trigger simulated fetch when tab loads
  useEffect(() => {
    if (activeTab === 'nodes') {
      setIsFetching(true);
      const timer = setTimeout(() => {
        setIsFetching(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Keep theme class checked on change
  useEffect(() => {
    setThemeMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const observer = new MutationObserver(() => {
      setThemeMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const monthlyCollectionData = [
    { name: 'Week 1', General: 320, Recycling: 240, Organic: 195, Hazardous: 80 },
    { name: 'Week 2', General: 410, Recycling: 310, Organic: 220, Hazardous: 95 },
    { name: 'Week 3', General: 480, Recycling: 450, Organic: 340, Hazardous: 110 },
    { name: 'Week 4', General: 390, Recycling: 520, Organic: 410, Hazardous: 130 },
  ];

  const [nodesSearchText, setNodesSearchText] = useState('');
  const [nodesTypeFilter, setNodesTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'fill' | 'battery' | 'location' | 'id'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Add Bin Modal state
  const [addBinModalOpen, setAddBinModalOpen] = useState(false);
  const [newBinName, setNewBinName] = useState('');
  const [newBinLocation, setNewBinLocation] = useState('');
  const [newBinType, setNewBinType] = useState<'general' | 'recycle' | 'organic' | 'hazardous'>('general');

  // Invoices simulation list
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'INV-2026-001', date: 'May 30, 2026', amount: user.plan === 'starter' ? 50000 : user.plan === 'professional' ? 500000 : 1500000, status: 'paid', plan: user.plan },
    { id: 'INV-2026-002', date: 'April 30, 2026', amount: user.plan === 'starter' ? 50000 : user.plan === 'professional' ? 500000 : 1500000, status: 'paid', plan: user.plan }
  ]);

  // Selected invoice for receipt modal
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Profile fields state
  const [profileName, setProfileName] = useState(user.name);
  const [profileOrg, setProfileOrg] = useState(user.organization);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Handle Bin trigger Empty
  const handleEmptyBin = (binId: string) => {
    const targetBin = bins.find(b => b.id === binId);
    if (targetBin) {
      const confirmMessage = `Are you sure you want to EMPTY the Smart Trash Can "${targetBin.name}" (${targetBin.location})?\n\nThis will reset its telemetry fill capacity back to 0%.`;
      const isConfirmed = window.confirm(confirmMessage);
      if (!isConfirmed) return;
    }

    const updated = bins.map(b => {
      if (b.id === binId) {
        onAddLog({
          id: `LOG-COL-${Date.now()}`,
          title: `Bin Emptied: ${b.id}`,
          message: `The sanitation operator successfully emptied ${b.name} (${b.location}). Volume returned to 0%.`,
          timestamp: 'Just now',
          read: false,
          type: 'info'
        });
        return {
          ...b,
          fillLevel: 0,
          status: 'normal' as const,
          lastCollected: 'Collected Just Now'
        };
      }
      return b;
    });
    onUpdateBins(updated);
  };

  // Handle disposal simulated impact (+15% fill level)
  const handleDisposeTrash = (binId: string) => {
    const updated = bins.map(b => {
      if (b.id === binId) {
        const nextFill = Math.min(100, b.fillLevel + 20);
        let status: 'normal' | 'warning' | 'critical' = 'normal';
        if (nextFill >= 85) status = 'critical';
        else if (nextFill >= 60) status = 'warning';

        if (nextFill >= 85 && b.fillLevel < 85) {
          onAddLog({
            id: `LOG-ALT-${Date.now()}`,
            title: `Capacity limit exceeded on ${b.id}`,
            message: `${b.name} located at ${b.location} is overflowing at ${nextFill}% capacity. Operational sanitation crew alerted.`,
            timestamp: 'Just now',
            read: false,
            type: 'alert'
          });
        }

        return { ...b, fillLevel: nextFill, status };
      }
      return b;
    });
    onUpdateBins(updated);
  };

  // Handle adding new device node
  const handleAddNewBin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBinName.trim() || !newBinLocation.trim()) return;

    // Check plan constraints
    if (user.plan === 'starter' && bins.length >= 1) {
      alert('SaaS subscription limitation: The Starter Plan only permits 1 Smart Trash Can device node. Upgrade to Professional on the Billing tab to register unlimited nodes!');
      setAddBinModalOpen(false);
      return;
    }

    const newBin: SmartBin = {
      id: `BIN-${100 + bins.length + 1}`,
      name: newBinName.trim(),
      location: newBinLocation.trim(),
      fillLevel: 0,
      status: 'normal',
      battery: 100,
      lastCollected: 'Never',
      type: newBinType,
      sensorState: 'online'
    };

    onUpdateBins([newBin, ...bins]);
    onAddLog({
      id: `LOG-ADD-${Date.now()}`,
      title: `Successful registration: ${newBin.id}`,
      message: `A new smart ${newBinType} trash can named "${newBinName}" has been successfully provisioned inside the cloud gateway.`,
      timestamp: 'Just now',
      read: false,
      type: 'info'
    });

    // Reset values
    setNewBinName('');
    setNewBinLocation('');
    setAddBinModalOpen(false);
  };

  // Change Subscription Plan
  const handleChangeSubscriptionPlan = (newPlan: PlanType) => {
    const nextUser: UserProfile = {
      ...user,
      plan: newPlan
    };
    onUpdateUser(nextUser);

    // Append new payment log invoice simulation
    const nextInv: Invoice = {
      id: `INV-2026-${100 + invoices.length + 1}`,
      date: 'Today',
      amount: newPlan === 'starter' ? 50000 : newPlan === 'professional' ? 500000 : 1500000,
      status: 'paid',
      plan: newPlan
    };
    setInvoices([nextInv, ...invoices]);
    
    onAddLog({
      id: `LOG-BILL-${Date.now()}`,
      title: `Subscription updated to ${newPlan.toUpperCase()}`,
      message: `Your cloud billing protocol was changed successfully. Your quota limits have been augmented instantly.`,
      timestamp: 'Just now',
      read: false,
      type: 'info'
    });
  };

  // Profile form submission handler
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: profileName.trim(),
      organization: profileOrg.trim()
    });
    setFeedbackMsg('Your profile configurations have been synchronized successfully!');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // CSV Data Downloader method
  const handleDownloadCSV = () => {
    // Generate CSV content string
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Device ID,Name,Location,Fill Level (%),Status,Battery (%),Sensor State,Waste Type,Last Collected\r\n";
    
    bins.forEach((bin) => {
      csvContent += `${bin.id},"${bin.name.replace(/"/g, '""')}","${bin.location.replace(/"/g, '""')}",${bin.fillLevel},${bin.status},${bin.battery},${bin.sensorState},${bin.type},"${bin.lastCollected}"\r\n`;
    });

    // Create virtual download anchor element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `smartcan_telemetry_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onAddLog({
      id: `LOG-CSV-${Date.now()}`,
      title: 'Metrics report exported',
      message: 'Client-side generated CSV telemetry log downloaded. Telemetry structure verified.',
      timestamp: 'Just now',
      read: false,
      type: 'info'
    });
  };

  const filteredBinsList = bins.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(nodesSearchText.toLowerCase()) || 
                        b.location.toLowerCase().includes(nodesSearchText.toLowerCase()) ||
                        b.id.toLowerCase().includes(nodesSearchText.toLowerCase());
    const matchType = nodesTypeFilter === 'all' || b.type === nodesTypeFilter;
    return matchSearch && matchType;
  });

  const sortedBinsList = [...filteredBinsList].sort((a, b) => {
    let valA: any;
    let valB: any;

    if (sortBy === 'fill') {
      valA = a.fillLevel;
      valB = b.fillLevel;
    } else if (sortBy === 'battery') {
      valA = a.battery;
      valB = b.battery;
    } else if (sortBy === 'location') {
      valA = a.location;
      valB = b.location;
    } else {
      valA = a.id;
      valB = b.id;
    }

    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handlePrintPDFReport = () => {
    onAddLog({
      id: `LOG-PDF-${Date.now()}`,
      title: 'Compliance Report Produced',
      message: `A professional monthly waste collection compliance report for "${user.organization}" has been dynamically compiled and sent to local printer.`,
      timestamp: 'Just now',
      read: false,
      type: 'info'
    });
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      
      {/* Top Banner indicating Active Sandbox Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-emerald-900 to-teal-800 text-white rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
        
        <div className="space-y-1 relative z-10 text-left">
          <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-mono tracking-widest px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase">
            Active Tenant Sandbox
          </span>
          <h2 className="font-sans font-black text-2xl truncate mt-1">Hello, {user.name}!</h2>
          <p className="text-xs text-emerald-100 opacity-90 leading-relaxed font-sans">
            Managing environment node configurations for: <strong>{user.organization}</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-4 md:mt-0 relative z-10">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-center">
            <span className="block text-[8px] text-emerald-300 uppercase font-mono tracking-wide">Subscription Plan</span>
            <span className="text-xs font-bold leading-none uppercase">{user.plan}</span>
          </div>

          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-center">
            <span className="block text-[8px] text-emerald-300 uppercase font-mono tracking-wide">Simulated Devices</span>
            <span className="text-xs font-bold leading-none font-mono">
              {bins.length} {user.plan === 'starter' ? '/ 1' : user.plan === 'professional' ? '/ 20' : '/ ∞'}
            </span>
          </div>
        </div>

      </div>

      {/* Primary Tab Bar Menu navigation */}
      <div className="flex flex-wrap border-b border-gray-200 gap-1 mb-8">
        {[
          { id: 'nodes', label: 'Trash Can Nodes', icon: <Database className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics & Reports', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'billing', label: 'Billing & Invoices', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'profile', label: 'Profile Configurations', icon: <User className="w-4 h-4" /> },
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-xs sm:text-sm tracking-tight border-b-2 cursor-pointer transition-all duration-150 ${
                isSelected
                  ? 'text-emerald-600 border-emerald-600 font-bold'
                  : 'text-gray-500 border-transparent hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW PANEL DYNAMIC CONTENT */}

      {/* 1. TRASH CAN NODES HUB PANEL */}
      {activeTab === 'nodes' && (
        <div className="space-y-6">
          
          {/* Controls bar: search, type selection filter, register new node trigger */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-white p-4 border border-gray-150 rounded-2xl shadow-xs">
            
            {/* Search filter input */}
            <div className="flex-1 max-w-sm relative">
              <span className="absolute inset-y-0 left-3 flex items-center pr-1 text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-250 focus:bg-white rounded-xl focus:outline-none focus:border-emerald-500 transition-all"
                placeholder="Search by Node ID, Area or Location..."
                value={nodesSearchText}
                onChange={(e) => setNodesSearchText(e.target.value)}
              />
            </div>

            {/* Selector parameters */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <select
                className="px-3 py-2 text-xs bg-gray-50 border border-gray-250 rounded-xl focus:bg-white focus:outline-none"
                value={nodesTypeFilter}
                onChange={(e) => setNodesTypeFilter(e.target.value)}
              >
                <option value="all">All Waste Streams</option>
                <option value="general">General Waste</option>
                <option value="recycle">Recycling</option>
                <option value="organic">Organic</option>
                <option value="hazardous">Hazardous Wing</option>
              </select>

              <select
                className="px-3 py-2 text-xs bg-gray-50 border border-gray-250 rounded-xl focus:bg-white focus:outline-none font-semibold text-slate-700 dark:text-slate-200"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as [any, any];
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="id-asc">Sort ID (A-Z)</option>
                <option value="id-desc">Sort ID (Z-A)</option>
                <option value="fill-desc">Sort: Fill Level (High-Low)</option>
                <option value="fill-asc">Sort: Fill Level (Low-High)</option>
                <option value="battery-desc">Sort: Battery (High-Low)</option>
                <option value="battery-asc">Sort: Battery (Low-High)</option>
                <option value="location-asc">Sort: Location (A-Z)</option>
                <option value="location-desc">Sort: Location (Z-A)</option>
              </select>

              {/* Action Button: Download CSV */}
              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-1.5 px-3 py-2 border border-gray-250 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                title="Download local logs spreadsheet"
              >
                <FileDown className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              {/* Sync Telemetry Feed Button */}
              <button
                onClick={() => {
                  setIsFetching(true);
                  setTimeout(() => {
                    setIsFetching(false);
                    onAddLog({
                      id: `LOG-SYNC-${Date.now()}`,
                      title: 'Telemetry Node Data Synchronized',
                      message: 'Real-time sensors successfully fetched and verified across core IoT cellular networks.',
                      timestamp: 'Just now',
                      read: false,
                      type: 'info'
                    });
                  }, 800);
                }}
                disabled={isFetching}
                className="flex items-center gap-1.5 px-3 py-2 border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-105 rounded-xl text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
                title="Sync dynamic sensor records"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-500 ${isFetching ? 'animate-spin' : ''}`} />
                <span>{isFetching ? 'Syncing...' : 'Sync Feed'}</span>
              </button>

              {/* Add New Node button trigger */}
              <button
                onClick={() => setAddBinModalOpen(true)}
                className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:scale-103 cursor-pointer transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Smart Bin</span>
              </button>
            </div>

          </div>

          {/* Grid display list of users trash bins */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isFetching ? (
              // Subtle Animated Loading Skeletons matching real card outlines perfectly!
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between animate-pulse">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-14 bg-slate-200 rounded-md"></div>
                        <div className="h-4 w-10 bg-slate-200 rounded-md"></div>
                      </div>
                      <div className="h-4.5 w-12 bg-slate-200 rounded-md"></div>
                    </div>
                    <div className="space-y-2 text-left">
                      <div className="h-5 w-3/4 bg-slate-250 bg-slate-200 rounded-lg"></div>
                      <div className="h-3 w-1/2 bg-slate-200 rounded-md"></div>
                    </div>
                    <div className="space-y-1.5 text-left pt-2">
                      <div className="flex justify-between">
                        <div className="h-3 w-1/3 bg-slate-200 rounded-md"></div>
                        <div className="h-3 w-8 bg-slate-200 rounded-md"></div>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex gap-2.5 pt-4 border-t border-slate-100 mt-6">
                    <div className="h-8.5 flex-1 bg-slate-200 rounded-xl"></div>
                    <div className="h-8.5 flex-1 bg-slate-200 rounded-xl"></div>
                  </div>
                </div>
              ))
            ) : sortedBinsList.length === 0 ? (
              <div className="col-span-full py-16 bg-white border border-gray-150 rounded-2xl text-center space-y-3">
                <p className="text-gray-400 text-sm">No connected smart sensors found matching filters.</p>
                <button
                  onClick={() => { setNodesSearchText(''); setNodesTypeFilter('all'); }}
                  className="px-4 py-1.5 bg-gray-50 text-emerald-600 hover:bg-emerald-100 text-xs font-bold rounded-lg"
                >
                  Clear search parameters
                </button>
              </div>
            ) : (
              sortedBinsList.map((bin) => (
                <div
                  key={bin.id}
                  className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between group transition-all duration-200 hover:shadow-md ${
                    bin.fillLevel >= 85 ? 'border-red-200 ring-2 ring-red-500/5' : 'border-gray-150'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase ${
                          bin.type === 'organic' ? 'bg-amber-100 text-amber-800' :
                          bin.type === 'recycle' ? 'bg-blue-100 text-blue-800' :
                          bin.type === 'hazardous' ? 'bg-red-100 text-red-800' :
                          'bg-gray-150 text-gray-700'
                        }`}>
                          {bin.type}
                        </span>
                        <span className="font-mono text-xs text-gray-400 font-semibold">{bin.id}</span>
                      </div>
                      
                      {/* Battery telemetry visual representation */}
                      <div className="flex items-center gap-1 border border-gray-150 px-1.5 py-0.5 rounded-md">
                        <Battery className={`w-3.5 h-3.5 ${bin.battery < 20 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
                        <span className="font-mono text-[9px] text-gray-500 font-bold">{bin.battery}%</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-sans font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{bin.name}</h4>
                      <p className="text-xs text-gray-500 font-medium truncate mt-0.5">{bin.location}</p>
                    </div>

                    {/* Progress tracking bar representing percent filled visually */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono font-semibold">
                        <span className="text-gray-400 font-semibold text-[10px] uppercase">Telemetry Level</span>
                        <span className={
                          bin.fillLevel >= 85 ? 'text-red-600 font-bold' :
                          bin.fillLevel >= 60 ? 'text-amber-600 font-bold' : 'text-emerald-600 font-semibold'
                        }>{bin.fillLevel}% Full</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            bin.fillLevel >= 85 ? 'bg-red-500' :
                            bin.fillLevel >= 60 ? 'bg-amber-400' : 'bg-emerald-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${bin.fillLevel}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Extra health info row */}
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl text-[10px] font-mono text-gray-500">
                      <div>
                        <span className="block text-gray-400 text-[8px] uppercase font-bold text-[8px]">Sensor Health</span>
                        <span className={`font-semibold capitalize ${bin.sensorState === 'online' ? 'text-emerald-600' : 'text-amber-600'}`}>{bin.sensorState}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 text-[8px] uppercase font-bold text-[8px]">Active Band</span>
                        <span className="font-semibold text-gray-700">NB-IoT LTE</span>
                      </div>
                    </div>

                  </div>

                  {/* Actions buttons pad */}
                  <div className="mt-5 pt-3.5 border-t border-gray-100 flex gap-2 justify-between items-center">
                    <span className="text-[10px] text-gray-400 italic">
                      L.C.: {bin.lastCollected}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDisposeTrash(bin.id)}
                        className="px-2 py-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-200 border border-gray-200 text-[10px] font-bold text-gray-700 rounded-lg transition-all cursor-pointer flex items-center gap-0.5"
                        title="Simulate dumping some trash inside"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Add Trash</span>
                      </button>
                      <button
                        onClick={() => handleEmptyBin(bin.id)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[10px] font-bold text-emerald-700 rounded-lg border border-emerald-100 transition-all cursor-pointer"
                        title="Dispatch automated crew emptying"
                      >
                        Empty
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* 2. ANALYTICS & HISTORICAL REPORTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs">
          
          {/* Headline stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-150 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest leading-none">Weekly Collected Waste Index</span>
              <p className="font-sans font-black text-3xl text-gray-900 mt-1.5">Rp 1,424,000</p>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                ▲ 12.4% vs last Week
              </span>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest leading-none">Fleet Travel Spared (CO2)</span>
              <p className="font-sans font-black text-3xl text-emerald-700 mt-1.5">3.4 Tons CO2</p>
              <span className="text-xs text-gray-400 font-semibold flex items-center gap-1 mt-1">
                Optimized route logs approved
              </span>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest leading-none">Average Sensor Response Uptime</span>
              <p className="font-sans font-black text-3xl text-gray-900 mt-1.5">99.98%</p>
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1 font-mono">
                Active connections stable
              </span>
            </div>
          </div>

          {/* Recharts Bar Chart representing past month trends */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-sans font-extrabold text-sm uppercase tracking-wider text-slate-900">Historical Waste Collection Trends</h3>
                <p className="text-xs text-slate-500 font-medium">Categorized volume statistics monitored across all locations over the past month</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-blue-650 text-blue-600" /> Export Dataset (.csv)
                </button>
                <button
                  onClick={handlePrintPDFReport}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer hover:scale-102 active:scale-98"
                >
                  <Check className="w-4 h-4 text-white" /> Generate &amp; Print PDF Report
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 min-h-[340px] flex flex-col justify-between">
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyCollectionData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke={themeMode === 'dark' ? '#334155' : '#E2E8F0'} 
                    />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: themeMode === 'dark' ? '#94A3B8' : '#64748B', fontSize: 11, fontWeight: 'bold' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: themeMode === 'dark' ? '#94A3B8' : '#64748B', fontSize: 11, fontWeight: 'bold' }}
                      axisLine={false}
                      tickLine={false}
                      unit="kg"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: themeMode === 'dark' ? '#1E293B' : '#FFFFFF',
                        borderColor: themeMode === 'dark' ? '#475569' : '#E2E8F0',
                        color: themeMode === 'dark' ? '#F8FAFC' : '#1F2937',
                        borderRadius: '12px',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                      itemStyle={{ fontWeight: 'bold' }}
                    />
                    <Legend 
                      wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }}
                    />
                    <Bar dataKey="General" stackId="a" fill="#64748B" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Recycling" stackId="a" fill="#2563EB" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Organic" stackId="a" fill="#D97706" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="Hazardous" stackId="a" fill="#DC2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 flex justify-between items-center font-mono">
                <span>* Grouped by automatic weight metrics</span>
                <span>Combined monthly volume: 3,740 kg collected</span>
                <span>System peak loads registered under Enterprise SLA limits</span>
              </div>
            </div>
          </div>

          {/* Section features */}
          <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 text-xs text-emerald-990 leading-relaxed text-left space-y-1">
            <p className="font-bold">💡 Dynamic Fleet Routing recommendation report:</p>
            <p className="text-gray-600 font-sans">
              Based on the simulated sensor history, Wednesdays and Fridays display over 80% load densities on commercial recyclables. System algorithm suggests rescheduling collection rounds on these specific days at <strong>09:30 AM</strong> to prevent sensor limit violations.
            </p>
          </div>

        </div>
      )}

      {/* 3. BILLING & SUBSCRIPTIONS */}
      {activeTab === 'billing' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Active Subscription status card (Left 5 cols) */}
            <div className="lg:col-span-5 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-6">
              <h3 className="font-sans font-bold text-lg text-gray-900">Your Subscription Status</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-550/10 bg-slate-50 border p-3.5 rounded-xl border-gray-200">
                  <div className="text-left font-sans">
                    <span className="text-[9px] font-mono font-extrabold text-emerald-600 leading-none">CURRENT TIER</span>
                    <h4 className="font-sans font-black text-lg text-gray-900 uppercase leading-none mt-1">{user.plan} PLAN</h4>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold font-sans px-2.5 py-0.5 rounded-md">
                    {user.billingStatus}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-gray-400">
                    <span>Invoice Recurrent Interval</span>
                    <span className="text-gray-800 font-semibold font-sans">Monthly basis</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Base monthly price index</span>
                    <span className="text-gray-800 font-semibold font-sans">
                      {user.plan === 'starter' ? 'Rp 50,000' : user.plan === 'professional' ? 'Rp 500,000' : 'Custom Pricing'}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Provisioned Node Capacity</span>
                    <span className="text-gray-800 font-semibold font-sans">
                      {user.plan === 'starter' ? '1 Device limit' : user.plan === 'professional' ? 'Up to 20 Devices' : 'Unlimited Devices'}
                    </span>
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Sub upgrade selectors buttons stack */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest text-left">Quickly Change Subscription Level:</p>
                  
                  <div className="flex flex-col gap-2 pt-1.5">
                    {['starter', 'professional', 'enterprise'].map((planId) => {
                      const isCurrent = user.plan === planId;
                      return (
                        <button
                          key={planId}
                          onClick={() => handleChangeSubscriptionPlan(planId as PlanType)}
                          disabled={isCurrent}
                          className={`px-4 py-2 text-xs rounded-xl text-left border font-semibold flex justify-between items-center transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-gray-50 text-gray-400 border-gray-150 cursor-not-allowed'
                              : 'bg-white text-gray-800 border-gray-250 hover:bg-emerald-50 hover:border-emerald-500'
                          }`}
                        >
                          <span className="capitalize">{planId} Plan</span>
                          {isCurrent ? (
                            <span className="font-bold text-[9px] text-gray-400 uppercase font-mono bg-gray-100 px-2 py-0.5 rounded-md">CURRENT ACTIVE</span>
                          ) : (
                            <span className="text-emerald-600 text-[11px] font-sans">
                              {planId === 'starter' ? 'Rp 50k/mo' : planId === 'professional' ? 'Rp 500k/mo' : 'Custom Pricing'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Invoices collection ledger column (Right 7 cols) */}
            <div className="lg:col-span-7 bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-6 text-left">
              <h3 className="font-sans font-bold text-lg text-gray-900">Payment Invoice Receipts History</h3>
              
              <div className="space-y-3 divide-y divide-gray-50">
                {invoices.map((inv) => (
                  <div key={inv.id} className="pt-3 first:pt-0 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono font-bold text-gray-850 block">{inv.id}</span>
                      <span className="text-[10px] text-gray-400 font-mono mt-0.5">{inv.date} • Plan: {inv.plan.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-gray-900 font-bold">
                        Rp {inv.amount.toLocaleString('id-ID')}
                      </span>
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="py-1 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-[10px] font-bold text-emerald-700 rounded-md transition-all cursor-pointer"
                      >
                        Print Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 4. PROFILE & CONFIGURATION */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl max-w-2xl mx-auto shadow-xs text-left">
          
          <h3 className="font-sans font-bold text-xl text-gray-950 mb-6">Edit Profile &amp; Alert Settings</h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            
            {feedbackMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-semibold">
                ✓ {feedbackMsg}
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Your Registered Full Name</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 transition-all font-sans text-gray-900"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Corporate Department/Organization</label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 transition-all font-sans text-gray-900"
                value={profileOrg}
                onChange={(e) => setProfileOrg(e.target.value)}
              />
            </div>

            <div className="space-y-1 opacity-70">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Business Email ID (Read-Only)</label>
              <input
                type="text"
                disabled
                className="w-full px-3.5 py-2.5 text-sm bg-gray-100 border border-gray-200 rounded-xl font-mono text-gray-500 cursor-not-allowed"
                value={user.email}
              />
            </div>

            <hr className="border-gray-100 my-4" />

            <div className="space-y-2 text-left">
              <p className="text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">SaaS Notification Preferences</p>
              
              <div className="flex items-center gap-3 pt-1">
                <input type="checkbox" id="pref-email" defaultChecked className="rounded-md" />
                <label htmlFor="pref-email" className="text-xs text-gray-600 cursor-pointer select-none">
                  Enable simulated SMS limits override notifications on critical cans.
                </label>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <input type="checkbox" id="pref-weekly" defaultChecked className="rounded-md" />
                <label htmlFor="pref-weekly" className="text-xs text-gray-600 cursor-pointer select-none">
                  Send weekly sanitation diagnostics optimizations audit logs.
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all active:scale-95"
              >
                Save Changes &amp; Synchronize Settings
              </button>
            </div>

          </form>

        </div>
      )}


      {/* MODAL: ADD SMART BIN */}
      {addBinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-100 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b pb-3 border-gray-100">
              <h4 className="font-sans font-black text-lg text-gray-900">Provision New Core Smart Can</h4>
              <button
                onClick={() => setAddBinModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewBin} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-500 font-mono uppercase tracking-wider">Bin Alias Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Corridor Recycling Bin"
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  value={newBinName}
                  onChange={(e) => setNewBinName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-500 font-mono uppercase tracking-wider">Location / Building Detail</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Level 3 Hallway North"
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none"
                  value={newBinLocation}
                  onChange={(e) => setNewBinLocation(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gray-500 font-mono uppercase tracking-wider">Waste Steam Stream</label>
                <select
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-500"
                  value={newBinType}
                  onChange={(e) => setNewBinType(e.target.value as any)}
                >
                  <option value="general">General Waste Stream</option>
                  <option value="recycle">Paper / Plastics Recycling</option>
                  <option value="organic">Organic Compost Trash</option>
                  <option value="hazardous">Hazardous / Bio-Medical Safety</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                Provision Device &amp; Pair Ultrasonics
              </button>
            </form>
          </div>
        </div>
      )}


      {/* MODAL: INVOICE / RECEIPT GENERATOR PREVIEW */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-gray-100 shadow-2xl space-y-4 text-left animate-scaleDown font-sans">
            
            <div className="text-center pb-2 border-b border-gray-100 space-y-1">
              <div className="p-1.5 bg-emerald-50 w-fit mx-auto rounded-xl">
                <Check className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 font-sans tracking-wide">SMART TRASH CAN RECEIPT</h4>
              <p className="font-mono text-[9px] text-gray-400">INVOICE ID: {selectedInvoice.id}</p>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-gray-400">Bill Date</span>
                <span className="text-gray-800 font-medium">{selectedInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Channel</span>
                <span className="text-gray-800 font-medium font-mono">CC Endings •••• 4022</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SaaS License Type</span>
                <span className="text-gray-800 font-medium uppercase">{selectedInvoice.plan} PLAN</span>
              </div>
              <hr className="border-gray-100 my-2" />
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-700">Total charge amount</span>
                <span className="font-mono font-bold text-emerald-700">Rp {selectedInvoice.amount.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-100 text-[10px] text-emerald-950 font-semibold rounded-lg text-center leading-relaxed">
              ✓ Paid through direct corporate banking portal. Invoice stored securely inside the cloud database.
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { window.print(); }}
                className="flex-1 py-2 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer transition-all"
              >
                Print Receipt
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 py-2 text-center bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all"
              >
                Close Prev
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. PROFESSIONAL PRINT COMPLIANCE REPORT */}
      <div id="smartcan-pdf-report" className="hidden printable-area bg-white text-slate-900 p-8 font-sans border-none shadow-none text-left print:block">
        <div className="border-b-4 border-emerald-600 pb-5 mb-5 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-emerald-600 tracking-tight">SmartCan™ SaaS Portal</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded-md font-bold uppercase">SaaS Telemetry Core</span>
            </div>
            <p className="text-xs text-slate-500 font-medium font-mono mt-1">
              Ref ID: STC-RE-2026-XMT912 • Issued: May 30, 2026, 14:12 UTC (Standard Calibration)
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-lg font-black text-slate-900 leading-none">OFFICIAL COMPLIANCE REPORT</h1>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1 font-mono">Solid Waste Management &amp; SLA Audit</p>
          </div>
        </div>

        {/* Audit Details Metadata */}
        <div className="grid grid-cols-4 gap-4 bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs mb-6">
          <div>
            <span className="block text-[9px] text-slate-400 font-mono uppercase font-bold">Tenant Organization</span>
            <span className="font-bold text-slate-800 font-sans">{user.organization}</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-400 font-mono uppercase font-bold">Primary Facility Lead</span>
            <span className="font-bold text-slate-800 font-sans">{user.name}</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-400 font-mono uppercase font-bold">Subscription Plan Tier</span>
            <span className="font-bold text-slate-800 capitalize font-sans">{user.plan} License</span>
          </div>
          <div>
            <span className="block text-[9px] text-slate-400 font-mono uppercase font-bold">Active Sensor Fleet Group</span>
            <span className="font-bold text-slate-800 font-mono">{bins.length} Smart IoT Nodes</span>
          </div>
        </div>

        {/* Analytics High Level Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="border border-slate-200 p-3.5 rounded-xl text-left bg-slate-50/55">
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider block leading-none">MONTHLY WASTE REMOVED</span>
            <span className="text-xl font-extrabold text-slate-900 block mt-1">3,740 kg</span>
            <p className="text-[10px] text-slate-500 mt-1">Accredited by integrated weight strain load sensors</p>
          </div>
          <div className="border border-slate-200 p-3.5 rounded-xl text-left bg-slate-50/55">
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider block leading-none">FLEET TRAVEL SPARED (CO2)</span>
            <span className="text-xl font-extrabold text-emerald-700 block mt-1">3.4 Tons CO2</span>
            <p className="text-[10px] text-emerald-600 mt-1">Optimized by route minimization algorithms</p>
          </div>
          <div className="border border-slate-200 p-3.5 rounded-xl text-left bg-slate-50/55">
            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider block leading-none">SENSOR RESPONSE UPTIME</span>
            <span className="text-xl font-extrabold text-slate-900 block mt-1">99.98%</span>
            <p className="text-[10px] text-slate-500 mt-1">Active NB-IoT cellular handshake signals</p>
          </div>
        </div>

        {/* Waste Stream Breakdown Grid list */}
        <div className="mb-6">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-100 pb-1.5 font-sans">1. Categorized Monthly Waste Volume Breakdown</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
              <span className="text-[9px] text-slate-400 uppercase font-bold block">General Waste</span>
              <span className="text-sm font-extrabold text-slate-800">1,600 kg</span>
              <span className="text-[10px] text-slate-500 block">42.8% of total volume</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
              <span className="text-[9px] text-blue-500 uppercase font-bold block">Recycling Stream</span>
              <span className="text-sm font-extrabold text-blue-700">1,520 kg</span>
              <span className="text-[10px] text-slate-500 block">40.6% of total volume</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
              <span className="text-[9px] text-amber-500 uppercase font-bold block">Organic Compost</span>
              <span className="text-sm font-extrabold text-amber-700">1,165 kg</span>
              <span className="text-[10px] text-slate-500 block">31.1% of total volume</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-left">
              <span className="text-[9px] text-red-500 uppercase font-bold block">Hazardous Materials</span>
              <span className="text-sm font-extrabold text-red-700">415 kg</span>
              <span className="text-[10px] text-slate-500 block">11.1% of total volume</span>
            </div>
          </div>
        </div>

        {/* Bins list Telemetry register table */}
        <div className="mb-6">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-3 border-b border-slate-100 pb-1.5 font-sans">2. Connected Node Fleet Inventory &amp; Current Sensor Register</h3>
          <table className="w-full text-xs text-slate-700 border-collapse border-b border-slate-100">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-mono font-bold border-b border-slate-200">
                <th className="py-2 px-3 text-left">Device Node ID</th>
                <th className="py-2 px-3 text-left">Name / Designation</th>
                <th className="py-2 px-3 text-left">Operational Location</th>
                <th className="py-2 px-3 text-center">Fill Capacity</th>
                <th className="py-2 px-3 text-center">Battery Charge</th>
                <th className="py-2 px-3 text-center">Sensor Uptime</th>
              </tr>
            </thead>
            <tbody>
              {bins.map((bin) => (
                <tr key={bin.id} className="border-b border-slate-100 font-sans">
                  <td className="py-2 px-3 font-mono font-bold text-slate-900">{bin.id}</td>
                  <td className="py-2 px-3 font-semibold text-slate-800">{bin.name}</td>
                  <td className="py-2 px-3 text-slate-500">{bin.location}</td>
                  <td className="py-2 px-3 text-center font-bold">
                    <span className={bin.fillLevel >= 85 ? 'text-red-600' : bin.fillLevel >= 60 ? 'text-amber-600' : 'text-emerald-600'}>{bin.fillLevel}%</span>
                  </td>
                  <td className="py-2 px-3 text-center font-mono text-slate-600">{bin.battery}%</td>
                  <td className="py-2 px-3 text-center text-slate-600 font-sans capitalize">
                    {bin.sensorState}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dynamic routing insights block split safe */}
        <div className="bg-emerald-50 text-xs text-slate-700 p-4 rounded-xl border border-emerald-200 mb-8 print-avoid-break text-left">
          <p className="font-bold text-emerald-950 font-sans">💡 Executive Waste Management Insight:</p>
          <p className="font-sans text-slate-600 mt-1">
            Historical analytics data confirms Wednesdays and Fridays are high-utilization peaks for recycling streams (averaging 80%+ load limits). It is recommended that municipal routing crews prioritize automatic emptying schedules at <strong>09:30 AM</strong> on these days to avoid overflow event alarms.
          </p>
        </div>

        {/* Compliance Signatures Row */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 print-avoid-break">
          <div className="text-center font-sans">
            <div className="h-16 border-b border-dashed border-slate-300 w-3/4 mx-auto" />
            <span className="block text-[10px] text-slate-500 font-mono uppercase font-bold mt-2">Facility Operations Manager Signature</span>
            <span className="text-[10px] text-slate-400 mt-1 block">Authorized sign-off slot for {user.name}</span>
          </div>
          <div className="text-center font-sans">
            <div className="h-16 border-b border-dashed border-slate-300 w-3/4 mx-auto flex items-center justify-center text-[10px] text-slate-300 font-mono italic">
              [SLA Compliance Seal Placement Area]
            </div>
            <span className="block text-[10px] text-slate-500 font-mono uppercase font-bold mt-2">Certified SLA Quality Inspector Stamp</span>
            <span className="text-[10px] text-slate-400 mt-1 block font-mono">Verification Stamp ID: STC-SLA-99238</span>
          </div>
        </div>
      </div>

    </div>
  );
}
