import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { X, User, Lock, Mail, Phone, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { activeModal, setActiveModal, setCurrentUser, switchDemoRole } = useApp();

  const [mode, setMode] = useState<'signin' | 'register'>('register');
  const [role, setRole] = useState<UserRole>('landlord');
  const [step, setStep] = useState<'details' | 'otp'>('details');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  if (activeModal !== 'auth') return null;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      setStep('otp'); // Go to simulated phone verification
    } else {
      // Direct sign in
      switchDemoRole(role === 'landlord' ? 'landlord' : 'tenant');
      setActiveModal(null);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: (role === 'landlord' ? 'lnd-' : 'ten-') + Date.now(),
      name: name || (role === 'landlord' ? 'New Landlord' : 'New Tenant'),
      email: email || 'user@zimaccommodation.co.zw',
      phone: phone || '+263771112233',
      role,
      isPhoneVerified: true,
      createdAt: new Date().toISOString().split('T')[0],
      ...(role === 'landlord' ? {
        subscriptionStatus: 'trial' as const,
        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        paymentHistory: []
      } : {})
    };

    setCurrentUser(newUser);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
              {mode === 'register' ? 'Create Zim Accom Account' : 'Sign In'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Connect with verified landlords & tenants across Zimbabwe</p>
          </div>
          <button onClick={() => setActiveModal(null)} className="p-2 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'otp' ? (
          /* Phone OTP Verification step */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 text-center space-y-1">
              <ShieldCheck className="w-8 h-8 text-[#008751] mx-auto" />
              <h3 className="text-sm font-extrabold text-emerald-800 dark:text-emerald-300">Verify Zimbabwe Phone Number</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                An SMS code was sent to <strong>{phone || '+263 77 123 4567'}</strong>
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Enter 4-Digit Code</label>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="1 2 3 4"
                className="w-full text-center text-xl tracking-widest font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 font-bold"
                required
              />
              <span className="text-[10px] text-slate-400 block text-center mt-1">For testing, enter any code (e.g. 1234)</span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008751] hover:bg-[#007043] text-white py-3 rounded-2xl font-black text-xs shadow-md"
            >
              Verify & Complete Registration
            </button>
          </form>
        ) : (
          /* Main Auth Form */
          <form onSubmit={handleSubmitDetails} className="space-y-4">
            
            {/* Role Switcher */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">I am a:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('tenant')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    role === 'tenant'
                      ? 'border-[#008751] bg-[#008751]/10 text-[#008751] font-black'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 font-bold'
                  }`}
                >
                  <span className="text-xs block">🏡 Tenant</span>
                  <span className="text-[10px] text-slate-400">Search houses for FREE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('landlord')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    role === 'landlord'
                      ? 'border-[#008751] bg-[#008751]/10 text-[#008751] font-black'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 font-bold'
                  }`}
                >
                  <span className="text-xs block">🔑 House Owner</span>
                  <span className="text-[10px] text-[#008751] font-extrabold">1 Mo FREE, then $2/yr</span>
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tinashe Moyo"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs font-bold"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">WhatsApp Phone (+263)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+263 77 123 4567"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs font-bold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs font-bold"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs font-bold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#008751] hover:bg-[#007043] text-white py-3 rounded-2xl font-black text-xs shadow-md"
            >
              {mode === 'register' ? 'Continue to Phone Verification' : 'Sign In'}
            </button>

            {/* Mode switch */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode(mode === 'register' ? 'signin' : 'register')}
                className="text-xs text-[#008751] font-bold hover:underline"
              >
                {mode === 'register' ? 'Already have an account? Sign In' : 'New user? Register now'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
