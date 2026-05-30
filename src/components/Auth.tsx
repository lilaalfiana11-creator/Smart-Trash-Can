import React, { useState } from 'react';
import { Mail, Trash2, Key, CheckCircle2, ShieldCheck, UserCheck, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';
import { PlanType, UserProfile } from '../types';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  org: z.string().min(3, 'Organization/Department must be at least 3 characters.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to cloud IoT privacy terms.',
  }),
});

interface AuthProps {
  initialMode: 'signin' | 'signup' | 'forgot';
  onAuthSuccess: (user: UserProfile) => void;
  selectedPlanPrefix?: PlanType;
}

export default function Auth({ initialMode, onAuthSuccess, selectedPlanPrefix = 'starter' }: AuthProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot' | 'verify'> (initialMode);

  // Form Fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(selectedPlanPrefix);

  // Verification fields
  const [passcode, setPasscode] = useState('');
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(null);

  // Feedback States
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; org?: string; password?: string; agreeTerms?: string }>({});

  const validateField = (field: 'name' | 'email' | 'org' | 'password' | 'agreeTerms', value: any) => {
    const rawForm = { name, email, org, password, agreeTerms, [field]: value };
    const result = signupSchema.safeParse(rawForm);
    if (result.success) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    } else {
      const fieldError = result.error.issues.find(err => err.path[0] === field);
      setErrors(prev => ({ ...prev, [field]: fieldError ? fieldError.message : undefined }));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const result = signupSchema.safeParse({ name, email, org, password, agreeTerms });
    if (!result.success) {
      const formattedErrors: typeof errors = {};
      result.error.issues.forEach(err => {
        formattedErrors[err.path[0] as keyof typeof errors] = err.message;
      });
      setErrors(formattedErrors);
      setErrorText('Please correct the registration errors before enrolling.');
      return;
    }

    setErrorText('');
    setErrors({});
    const newProfile: UserProfile = {
      email: email.trim(),
      name: name.trim(),
      organization: org.trim(),
      plan: selectedPlan,
      billingStatus: 'Trialing',
      joinedDate: 'May 30, 2026',
      isVerified: false,
      canManageLocations: true
    };
    
    setTempProfile(newProfile);
    setSuccessText('Sign up data recorded securely. We have dispatched a 4-digit smart verification token to your business email inbox.');
    setMode('verify');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorText('Credential mismatch. Both email and security passphrase are required.');
      return;
    }

    setErrorText('');
    // Mock user login credentials successfully
    const mockUser: UserProfile = {
      email: email.trim(),
      name: name.trim() || email.split('@')[0].toUpperCase(),
      organization: 'Smart City Partner Ltd',
      plan: 'professional',
      billingStatus: 'Active',
      joinedDate: 'Jan 15, 2026',
      isVerified: true,
      canManageLocations: true
    };

    onAuthSuccess(mockUser);
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode !== '1234') {
      setErrorText('Incorrect verification token. Use the demo passcode "1234" to simulate successfully!');
      return;
    }

    setErrorText('');
    if (tempProfile) {
      const verifiedUser = { ...tempProfile, isVerified: true };
      
      // Save simulated credentials to localStorage for robust persistent experience.
      localStorage.setItem('STC_AUTH_USER', JSON.stringify(verifiedUser));
      
      onAuthSuccess(verifiedUser);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorText('Please enter your registered SaaS login email to proceed.');
      return;
    }

    setErrorText('');
    setSuccessText('Passcode recovery dispatch: A unique recovery protocol link has been dispatched to your email address.');
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/20 text-left">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6">
        
        {/* Header decoration */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-xl shadow-md shadow-emerald-500/10">
            <Trash2 className="h-6 w-6 animate-bounce" />
          </div>
          <h2 className="font-sans font-extrabold text-2xl text-gray-900 tracking-tight">
            {mode === 'signin' && 'Sign In to Your Account'}
            {mode === 'signup' && 'Create Your Free 14-Day Trial'}
            {mode === 'forgot' && 'Reset Security Credentials'}
            {mode === 'verify' && 'Verify Your Business Identity'}
          </h2>
          <p className="text-xs text-gray-400">
            {mode === 'signin' && 'Access telemetry feeds and smart routing algorithms.'}
            {mode === 'signup' && 'No credit card input needed. Zero risk cloud operations.'}
            {mode === 'forgot' && 'Provide credentials to recover system analytics access.'}
            {mode === 'verify' && 'Check your mock inbox and enter passcode 1234.'}
          </p>
        </div>

        {errorText && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
            ⚠️ {errorText}
          </div>
        )}

        {successText && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-semibold text-emerald-800">
            🎉 {successText}
          </div>
        )}

        {/* SIGN IN FORM VIEW */}
        {mode === 'signin' && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Business Email Address</label>
              <input
                type="email"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all font-mono"
                placeholder="e.g. budias@company.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Assigned Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[10px] text-emerald-600 hover:text-emerald-700 font-semibold cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                type="password"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all font-mono"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Access Cloud Control Panel</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-center pt-2 text-xs text-gray-500">
              Don't have a corporate trial yet?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-emerald-600 hover:text-emerald-700 font-bold underline cursor-pointer"
              >
                Sign Up 14-days Free
              </button>
            </div>
          </form>
        )}

        {/* SIGN UP FORM VIEW */}
        {mode === 'signup' && (
          <form className="space-y-4 font-sans text-left" onSubmit={handleRegister}>
            
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Your Full Name</label>
              <input
                type="text"
                required
                className={`w-full px-3.5 py-2.5 text-sm bg-gray-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                }`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateField('name', e.target.value);
                }}
                placeholder="e.g. Dr. Jane Doe"
              />
              {errors.name && (
                <p className="text-[10px] text-red-500 font-semibold font-sans mt-0.5">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Business Email Address</label>
              <input
                type="email"
                required
                className={`w-full px-3.5 py-2.5 text-sm bg-gray-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-mono ${
                  errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateField('email', e.target.value);
                }}
                placeholder="e.g. janedoe@university.edu"
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 font-semibold font-sans mt-0.5">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Organization / Department Name</label>
              <input
                type="text"
                required
                className={`w-full px-3.5 py-2.5 text-sm bg-gray-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all ${
                  errors.org ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                }`}
                value={org}
                onChange={(e) => {
                  setOrg(e.target.value);
                  validateField('org', e.target.value);
                }}
                placeholder="e.g. Nusantara Hospital Ward 3"
              />
              {errors.org && (
                <p className="text-[10px] text-red-500 font-semibold font-sans mt-0.5">{errors.org}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Select Trial Tier</label>
              <select
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all font-sans"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value as PlanType)}
              >
                <option value="starter">Starter Plan (1 Smart Trash Can)</option>
                <option value="professional">Professional Plan (Up to 20 Devices)</option>
                <option value="enterprise">Enterprise Plan (Unlimited Devices / API)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Security Password Passcode</label>
              <input
                type="password"
                required
                className={`w-full px-3.5 py-2.5 text-sm bg-gray-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-mono ${
                  errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validateField('password', e.target.value);
                }}
                placeholder="•••••••• (Min 6 chars)"
              />
              {errors.password && (
                <p className="text-[10px] text-red-500 font-semibold font-sans mt-0.5">{errors.password}</p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="agree-checkbox"
                  className="mt-0.5"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    validateField('agreeTerms', e.target.checked);
                  }}
                />
                <label htmlFor="agree-checkbox" className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
                  I agree to the Smart Trash Can cloud service terms, GDPR policies, and real-time device updates consent.
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-[10px] text-red-500 font-semibold font-sans mt-0.5">{errors.agreeTerms}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Enroll In Free Trial Portfolio</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-center pt-2 text-xs text-gray-500">
              Already have an enterprise credential?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-emerald-600 hover:text-emerald-700 font-bold underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form className="space-y-4" onSubmit={handleForgotPassword}>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider">Your Registered Email</label>
              <input
                type="email"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 text-gray-900 focus:ring-2 focus:ring-emerald-500/10 font-mono"
                placeholder="budias@company.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all cursor-pointer"
            >
              Request Password Override Link
            </button>

            <button
              type="button"
              onClick={() => setMode('signin')}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

        {/* VERIFICATION FORM VIEW */}
        {mode === 'verify' && (
          <form className="space-y-4" onSubmit={handleVerifyPasscode}>
            <div className="bg-amber-50 text-amber-900 text-xs p-3.5 rounded-xl border border-amber-100 italic">
              <strong>Passcode hints:</strong> Since this is a client-side SaaS simulation, enter the passcode <strong>1234</strong> to verify your simulated business account!
            </div>

            <div className="space-y-1 text-center">
              <label className="block text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider mb-2">4-DIGIT VERIFICATION TOKEN</label>
              <input
                type="text"
                required
                maxLength={4}
                className="w-32 mx-auto text-xl font-bold tracking-widest text-center px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-mono"
                placeholder="0000"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Complete Safe Registration
            </button>

            <div className="text-center pt-2">
              <span className="text-xs text-gray-400">Didn’t receive the email simulation?</span>{' '}
              <button
                type="button"
                onClick={() => setSuccessText('Passcode resent! Check mock email simulation feed and enter "1234".')}
                className="text-emerald-600 hover:text-emerald-700 text-xs font-bold underline cursor-pointer"
              >
                Resend Passcode
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
