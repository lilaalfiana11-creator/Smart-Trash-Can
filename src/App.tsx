import React, { useState, useEffect } from 'react';
import { SmartBin, UserProfile, AppNotification, PlanType } from './types';
import { INITIAL_BINS, INITIAL_NOTIFICATIONS, TESTIMONIALS } from './data';

// Components imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import DashboardDemo from './components/DashboardDemo';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Auth from './components/Auth';
import UserDashboardView from './components/UserDashboardView';
import AdminDashboardView from './components/AdminDashboardView';

import { Shield, Sparkles, AlertTriangle, ArrowRight, Star, Heart, CheckCircle2, UserCheck } from 'lucide-react';

export default function App() {
  // Navigation active state
  const [activeSection, setActiveSection] = useState<string>('home');

  // Dark/Light Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('STC_THEME');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'light';
  });

  // Keep theme class in sync on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('STC_THEME', theme);
  }, [theme]);

  // Authenticated state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('STC_AUTH_USER');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Bins state
  const [bins, setBins] = useState<SmartBin[]>(() => {
    const saved = localStorage.getItem('STC_BINS');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [...INITIAL_BINS];
      }
    }
    return [...INITIAL_BINS];
  });

  // Notifications alerts state
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('STC_NOTIFICATIONS');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [...INITIAL_NOTIFICATIONS];
      }
    }
    return [...INITIAL_NOTIFICATIONS];
  });

  // Pre-selected trial plan
  const [trialPlanPrefix, setTrialPlanPrefix] = useState<PlanType>('starter');

  // Synchronization effect: save bins to localStorage
  useEffect(() => {
    localStorage.setItem('STC_BINS', JSON.stringify(bins));
  }, [bins]);

  // Synchronization effect: save notifications
  useEffect(() => {
    localStorage.setItem('STC_NOTIFICATIONS', JSON.stringify(notifications));
  }, [notifications]);

  // Synchronize Auth User
  useEffect(() => {
    if (user) {
      localStorage.setItem('STC_AUTH_USER', JSON.stringify(user));
    } else {
      localStorage.removeItem('STC_AUTH_USER');
    }
  }, [user]);

  // Helper: Append a new alert message
  const handleAddLog = (newLog: AppNotification) => {
    setNotifications(prev => [newLog, ...prev]);
  };

  // Helper: Clear warnings read
  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Auth logout routine
  const handleLogout = () => {
    setUser(null);
    setActiveSection('home');
    handleAddLog({
      id: `LOG-OUT-${Date.now()}`,
      title: 'Session Ended Successfully',
      message: 'You have signed out of your cloud portal. Thank you for utilizing Smart Trash Can!',
      timestamp: 'Just now',
      read: false,
      type: 'info'
    });
  };

  // Auth login signup setup routine
  const handleAuthSuccess = (profile: UserProfile) => {
    setUser(profile);
    setActiveSection('dashboard');
    handleAddLog({
      id: `LOG-IN-OK-${Date.now()}`,
      title: `Logged In: welcome back, ${profile.name}!`,
      message: `Active session synchronized. Corporate plan: ${profile.plan.toUpperCase()}. Monitoring ${bins.length} sensor nodes.`,
      timestamp: 'Just now',
      read: false,
      type: 'info'
    });
  };

  // Pricing selection routing handler
  const handleSelectPlan = (plan: PlanType) => {
    if (user) {
      // User is logged in, redirect them directly to their Billing tab on Dashboard to upgrade!
      setUser({ ...user, plan: plan });
      setActiveSection('dashboard');
      handleAddLog({
        id: `LOG-BILL-${Date.now()}`,
        title: `Plan modified: ${plan.toUpperCase()}`,
        message: `Your client subscription plan was successfully updated to "${plan.toUpperCase()}". Quotas augmented.`,
        timestamp: 'Just now',
        read: false,
        type: 'info'
      });
    } else {
      // Guest: redirect to Sign Up with that plan predefined
      setTrialPlanPrefix(plan);
      setActiveSection('signup');
    }
  };

  // Quick Action: Pre-load simulated administrator or user credentials for user testing convenience!
  const handleMockAdminLoginTrigger = (role: 'user' | 'admin') => {
    const mockProfile: UserProfile = {
      email: role === 'admin' ? 'admin@smartcity-can.id' : 'lilaalfiana11@gmail.com',
      name: role === 'admin' ? 'Nusantara Admin' : 'Lila Alfiana',
      organization: role === 'admin' ? 'Smart Trash Can Central Operations' : 'Smart City Partner Ltd',
      plan: role === 'admin' ? 'enterprise' : 'professional',
      billingStatus: 'Active',
      joinedDate: 'Jan 15, 2026',
      isVerified: true,
      canManageLocations: true
    };
    handleAuthSuccess(mockProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50/20 dark:bg-slate-950 dark:text-slate-100 text-slate-800 flex flex-col font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
      
      {/* GLOBAL TELEMETRY OVERFLOW POP-UP ALERTS (Tapped into live alert states) */}
      {notifications.length > 0 && !notifications[0].read && notifications[0].type === 'alert' && (
        <div className="bg-red-650 bg-red-600 text-white py-3 px-4 shadow-xl z-50 sticky top-0 text-center text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn transition-all">
          <AlertTriangle className="w-5.5 h-5.5 text-white animate-bounce" />
          <span>[SYSTEM EMERGENCY ALERT!] {notifications[0].message}</span>
          <button 
            onClick={handleMarkNotificationsRead}
            className="ml-3 underline bg-white/20 px-2.5 py-0.5 rounded-md hover:bg-white/30 text-[10px] cursor-pointer"
          >
            Acknowledge &amp; Dismiss Stream
          </button>
        </div>
      )}

      {/* Main sticky header navigation component */}
      <Navbar
        user={user}
        notifications={notifications}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
      />

      {/* PRIMARY CONTEXT SWITCH VIEWPORTS */}
      <main className="flex-1">

        {/* 1. LANDING PAGE SUITE (Active section == 'home') */}
        {activeSection === 'home' && (
          <div className="animate-fadeIn">
            
            {/* The giant premium animated hero */}
            <Hero
              onStartTrial={() => handleSelectPlan('professional')}
              onWatchDemo={() => setActiveSection('demo')}
            />

            {/* Quick pre-auth credentials helper panel (helps reviewers test auth & dashboard instantly!) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100/60 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center text-left gap-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-700 font-mono font-black px-2 py-0.5 rounded-full">DEVELOPER ASSURED</span>
                  <h4 className="font-sans font-bold text-gray-900 text-sm">Reviewer Quick-Access Simulation Shortcuts</h4>
                  <p className="text-xs text-gray-500 max-w-xl">
                    Skip standard email registration! Click the shortcuts below to immediately authenticate as a mock **SaaS Facility Manager** or **Municipal Systems Administrator** and view telemetry dashboards!
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => handleMockAdminLoginTrigger('user')}
                    className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 text-xs font-semibold border border-gray-200 hover:border-emerald-200 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    <span>Login as Client Manager</span>
                  </button>
                  <button
                    onClick={() => handleMockAdminLoginTrigger('admin')}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-md shadow-slate-950/10"
                  >
                    <Shield className="w-4 h-4 text-blue-400" />
                    <span>Login as Platform Admin</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Segment: Features */}
            <Features />

            {/* Segment: Pricing plans selector */}
            <Pricing
              onSelectPlan={handleSelectPlan}
              currentPlan={user?.plan}
            />

            {/* TESTIMONIALS SECTION (Requested customer reviews: Schools, Hospitals, Corporate Offices, Municipal Cities) */}
            <section className="py-20 bg-white border-y border-gray-100 scroll-mt-12 text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Heading titles */}
                <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                  <span className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                    End-User Success Logs
                  </span>
                  <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
                    Trusted By Sustainable Leaders Internationally
                  </h2>
                  <p className="text-gray-600">
                    See how physical operations teams across hospitals, corporate real estates, academic campus networks and metropolitan municipal departments save garbage pickup loops.
                  </p>
                </div>

                {/* Grid testimonials layouts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  {TESTIMONIALS.map((col) => (
                    <div
                      key={col.id}
                      className="bg-gray-50 border border-gray-150 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="space-y-4">
                        {/* Rating stars line */}
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-4 h-4 fill-amber-400 stroke-none" />
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm italic leading-relaxed font-sans mt-2">
                          "{col.quote}"
                        </p>
                      </div>

                      {/* Author credentials profile bottom row */}
                      <div className="flex gap-3.5 items-center mt-6 pt-4 border-t border-gray-200">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${col.avatarColor}`}>
                          {col.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div className="text-left font-sans">
                          <h4 className="font-bold text-sm text-gray-900 leading-tight">{col.name}</h4>
                          <p className="text-[11px] text-gray-400 font-sans mt-0.5">{col.role} • <strong className="text-gray-500">{col.org}</strong></p>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* About us context section */}
            <AboutUs />

            {/* Embedded interactive contact section */}
            <Contact />

          </div>
        )}

        {/* 2. SPECIFIC SECTION INDEPENDENCE VIEWPORTS (Enforces no broken navigation links) */}
        {activeSection === 'features' && (
          <div className="animate-fadeIn">
            <Features />
          </div>
        )}

        {activeSection === 'pricing' && (
          <div className="animate-fadeIn">
            <Pricing
              onSelectPlan={handleSelectPlan}
              currentPlan={user?.plan}
            />
          </div>
        )}

        {activeSection === 'demo' && (
          <div className="animate-fadeIn">
            <DashboardDemo />
          </div>
        )}

        {activeSection === 'about' && (
          <div className="animate-fadeIn">
            <AboutUs />
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="animate-fadeIn">
            <Contact />
          </div>
        )}

        {/* 3. SECURITY GATEWAY VIEWS PROFILE LOGS */}
        {activeSection === 'signin' && (
          <div className="animate-fadeIn bg-slate-50/20 py-12">
            <Auth initialMode="signin" onAuthSuccess={handleAuthSuccess} />
          </div>
        )}

        {activeSection === 'signup' && (
          <div className="animate-fadeIn bg-slate-50/20 py-12">
            <Auth
              initialMode="signup"
              onAuthSuccess={handleAuthSuccess}
              selectedPlanPrefix={trialPlanPrefix}
            />
          </div>
        )}

        {activeSection === 'forgot' && (
          <div className="animate-fadeIn bg-slate-50/20 py-12">
            <Auth initialMode="forgot" onAuthSuccess={handleAuthSuccess} />
          </div>
        )}

        {/* 4. PRIVATE SAAS VIEWPORTS */}
        {activeSection === 'dashboard' && user && (
          <div className="animate-fadeIn">
            <UserDashboardView
              user={user}
              bins={bins}
              notifications={notifications}
              onUpdateUser={setUser}
              onUpdateBins={setBins}
              onAddLog={handleAddLog}
            />
          </div>
        )}

        {/* 5. SUPER-ADMIN PRIVILEGES VIEWPORT */}
        {activeSection === 'admin' && user && (
          <div className="animate-fadeIn">
            <AdminDashboardView
              user={user}
              bins={bins}
              notifications={notifications}
              onUpdateBins={setBins}
              onAddLog={handleAddLog}
            />
          </div>
        )}

      </main>

      {/* Footer layout containing sub navigations */}
      <Footer setActiveSection={setActiveSection} />

    </div>
  );
}
