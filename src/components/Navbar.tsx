import React, { useState } from 'react';
import { Trash2, Bell, Shield, User, LogOut, Menu, X, Check, Mail, Sun, Moon } from 'lucide-react';
import { UserProfile, AppNotification } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  notifications: AppNotification[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
  onMarkNotificationsRead: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({
  user,
  notifications,
  activeSection,
  setActiveSection,
  onLogout,
  onMarkNotificationsRead,
  theme,
  onToggleTheme
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
  };

  const toggleNotifDropdown = () => {
    setNotifDropdownOpen(!notifDropdownOpen);
    if (!notifDropdownOpen && unreadCount > 0) {
      // delay marking read slightly for visual gratification or handle immediately
      onMarkNotificationsRead();
    }
  };

  const renderNavLinks = () => {
    const links = [
      { id: 'home', label: 'Home' },
      { id: 'features', label: 'Features' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'demo', label: 'Dashboard Demo' },
      { id: 'about', label: 'About Us' },
      { id: 'contact', label: 'Contact' },
    ];

    return (
      <>
        {links.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              id={`nav-${link.id}`}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer text-left ${
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/80 rounded-lg'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/15 transform hover:scale-105 transition-all">
              <Trash2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-extrabold text-lg tracking-tight text-slate-800">
                Smart Trash Can<span className="text-blue-600 font-black"> AI</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 leading-none">
                Cloud IoT Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {renderNavLinks()}
          </div>

          {/* Desktop User Center */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* System Live status identifier */}
            <div className="relative px-3 py-1 bg-slate-100 rounded-full flex items-center gap-2 border border-slate-200/50">
              <div className="w-2 h-2 bg-green-500 rounded-full status-pulse"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Live</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              id="theme-toggle-btn"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-amber-500" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notif-bell-btn"
                onClick={toggleNotifDropdown}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all relative cursor-pointer"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Dropdown Drawer */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/60 py-2 ring-1 ring-black/5 z-50 transform origin-top-right transition-all">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-700 uppercase tracking-wider">Telemetry Notifications</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        No recent alerts. Everything normal!
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 text-xs transition-all hover:bg-slate-50 flex gap-2.5 items-start ${
                            !notif.read ? 'bg-blue-50/20' : ''
                          }`}
                        >
                          <div className={`mt-0.5 p-1 rounded-full ${
                            notif.type === 'alert' ? 'bg-red-50 text-red-600' :
                            notif.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-current rounded-full" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-slate-800">{notif.title}</p>
                            <p className="text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                            <span className="text-[9px] text-slate-400 block mt-1 font-mono">{notif.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => handleNavClick(user ? 'dashboard' : 'demo')}
                      className="text-[10px] text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                    >
                      Open Notification Center
                    </button>
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  id="dashboard-shortcut-btn"
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-xl transition-all cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  id="admin-shortcut-btn"
                  onClick={() => handleNavClick('admin')}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  title="Admin Platform Panel"
                >
                  <Shield className="h-4 w-4 text-blue-500" />
                </button>
                <button
                  id="logout-btn"
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  id="nav-signin-btn"
                  onClick={() => handleNavClick('signin')}
                  className="px-3.5 py-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => handleNavClick('signup')}
                  className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg hover:shadow-lg hover:shadow-blue-600/10 active:scale-95 transition-all cursor-pointer"
                >
                  Start Free Trial
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onToggleTheme}
              id="mobile-theme-toggle-btn"
              className="p-2 text-gray-500 hover:text-blue-600 rounded-xl transition-all cursor-pointer"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5 text-amber-500" />}
            </button>
            <button
              onClick={toggleNotifDropdown}
              className="p-2 text-gray-500 hover:text-emerald-600 btn-notif relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 shadow-inner space-y-1 animate-fadeIn">
          {renderNavLinks()}
          <hr className="border-gray-100 my-2" />
          {user ? (
            <div className="pt-2 space-y-2">
              <div className="px-3 py-1 flex flex-col">
                <span className="text-xs font-semibold text-gray-800">{user.name}</span>
                <span className="text-[10px] text-gray-400 font-mono">{user.email}</span>
                <span className="text-[10px] mt-1 text-emerald-600 font-medium">Plan: {user.plan.toUpperCase()}</span>
              </div>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-all flex items-center gap-2 cursor-pointer"
              >
                <User className="h-4 w-4" />
                Go to Dashboard
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Shield className="h-4 w-4 text-blue-500" />
                Go to Admin Panel
              </button>
              <button
                onClick={onLogout}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 space-y-2">
              <button
                onClick={() => handleNavClick('signin')}
                className="w-full text-center py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavClick('signup')}
                className="w-full text-center py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 shadow-md shadow-emerald-600/10 transition-all cursor-pointer"
              >
                Start Free Trial
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
