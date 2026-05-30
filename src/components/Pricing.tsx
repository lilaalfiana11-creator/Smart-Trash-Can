import React, { useState } from 'react';
import { Check, Cpu, Sparkles, Building2, Shield, Landmark } from 'lucide-react';
import { PlanType } from '../types';

interface PricingProps {
  onSelectPlan: (plan: PlanType) => void;
  currentPlan?: PlanType;
}

export default function Pricing({ onSelectPlan, currentPlan }: PricingProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'starter' as PlanType,
      name: 'Starter Plan',
      price: billingPeriod === 'monthly' ? 'Rp 50,000' : 'Rp 40,000',
      period: '/ month',
      sub: 'Ideal for Smart Homes and individual shops testing smart sensors.',
      icon: <Cpu className="h-6 w-6 text-gray-500" />,
      features: [
        '1 IoT Smart Trash Can',
        'Real-Time Level Monitoring',
        'Basic Dashboard Metrics',
        'Email Alerts (delayed 5 min)',
        'Standard Community Supported documentation'
      ],
      popular: false,
      badgeText: '',
      colorClass: 'border-gray-200 bg-white ring-gray-100',
      btnText: 'Start Free Trial'
    },
    {
      id: 'professional' as PlanType,
      name: 'Professional Plan',
      price: billingPeriod === 'monthly' ? 'Rp 500,000' : 'Rp 400,000',
      period: '/ month',
      sub: 'For retail centers, offices, schools and medium private facilities.',
      icon: <Sparkles className="h-6 w-6 text-blue-600 animate-pulse" />,
      features: [
        'Up to 20 IoT Smart Trash Cans',
        'Cloud Advanced Analytics Suite',
        'Multi-Building Dashboard Management',
        'Sub-second Capacity alerts',
        'Automatic Sensor Status Alerts',
        'Priority SLA Support Response (<2hr)',
        'Report exports (CSV/PDF)'
      ],
      popular: true,
      badgeText: 'MOST POPULAR',
      colorClass: 'border-blue-500 bg-white ring-blue-500/10 shadow-lg ring-4',
      btnText: 'Start Free Trial'
    },
    {
      id: 'enterprise' as PlanType,
      name: 'Enterprise Plan',
      price: 'Custom Pricing',
      period: '',
      sub: 'Designed for government agencies, airports, and smart city programs.',
      icon: <Landmark className="h-6 w-6 text-indigo-600" />,
      features: [
        'Unlimited IoT Connected Trash cans',
        'Smart City Dashboard API Integration',
        'Municipal Fleet Dynamic Routing modules',
        'Encrypted Private Database Gateway',
        'Hardware on-site custom installation option',
        'Dedicated SLA Operations Manager',
        'Unlimited Historical data storage'
      ],
      popular: false,
      badgeText: 'SMART CITIES',
      colorClass: 'border-slate-200 bg-slate-50 backdrop-blur-xs ring-slate-100',
      btnText: 'Contact Enterprise Sales'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50/50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header content section */}
        <div className="max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs uppercase font-mono tracking-widest text-blue-600 font-bold bg-blue-50 px-2.5 py-1 rounded-md">
            Flexible Subscriptions
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
            Predictable Cloud Pricing Plans
          </h2>
          <p className="text-slate-600">
            Scale up seamlessly as you deploy more sensors. Select the subscription level that fits your sanitation budget. Enjoy 14 days free trial!
          </p>

          {/* Monthly or Yearly selection switch */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-semibold ${billingPeriod === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>
              Monthly Subscription
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors cursor-pointer"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-slate-900' : 'text-slate-400'}`}>
              Yearly Bill <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">SAVE 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {plans.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] ${plan.colorClass}`}
              >
                {/* Popularity Badge */}
                {plan.badgeText && (
                  <span className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full ${
                    plan.id === 'professional' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' : 'bg-indigo-600 text-white'
                  }`}>
                    {plan.badgeText}
                  </span>
                )}

                <div className="space-y-6 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="font-sans font-bold text-lg text-slate-900">{plan.name}</h3>
                    {plan.icon}
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed min-h-[40px]">
                    {plan.sub}
                  </p>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {plan.period}
                    </span>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Bullet points benefits list */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Includes capabilities:</p>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <Check className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5 bg-blue-50 rounded-full p-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3 text-sm font-semibold rounded-xl cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/10 active:scale-95'
                        : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-500 hover:bg-slate-50 active:scale-95'
                    }`}
                    disabled={isCurrent}
                  >
                    {isCurrent ? 'Your Current Active Plan' : plan.btnText}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Security / Quality lock assurance guarantee */}
        <div className="mt-12 text-center text-xs text-slate-400 flex flex-col sm:flex-row gap-2 justify-center items-center">
          <Shield className="w-4 h-4 text-blue-500" />
          <span>No credit card required for 14-day free trials. Upgrade, downgrade, or cancel subscription anytime from dashboard billing panels.</span>
        </div>

      </div>
    </section>
  );
}
