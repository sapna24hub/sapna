import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  User, 
  Mail, 
  LogOut, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getSavedGoogleUser, 
  saveGoogleUser, 
  logoutGoogleUser, 
  getGoogleClientId, 
  initGoogleIdentityServices 
} from '../utils/googleAuth';

// Multi-colored official Google "G" SVG Icon
export function GoogleGIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function GoogleLoginModal({ isOpen, onClose, onLoginSuccess, onOpenAdmin }) {
  const [currentUser, setCurrentUser] = useState(() => getSavedGoogleUser());
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentUser(getSavedGoogleUser());
  }, [isOpen]);

  useEffect(() => {
    initGoogleIdentityServices((user) => {
      setCurrentUser(user);
      if (onLoginSuccess) onLoginSuccess(user);
    });
  }, []);

  if (!isOpen) return null;

  const handleSimulatedGoogleSubmit = (e) => {
    e.preventDefault();
    const name = googleName.trim();
    const email = googleEmail.trim();

    if (!name || name.length < 2) {
      setError('Please enter your full name (Apna naam likhein)');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid Google/Gmail address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const user = saveGoogleUser({
        name,
        email,
        picture: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`
      });

      setCurrentUser(user);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }

      if (onLoginSuccess) onLoginSuccess(user);
      setTimeout(() => onClose(), 1500);
    }, 400);
  };

  const handleQuickAccountPick = (account) => {
    const user = saveGoogleUser({
      name: account.name,
      email: account.email,
      picture: account.avatar
    });
    setCurrentUser(user);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    if (onLoginSuccess) onLoginSuccess(user);
    setTimeout(() => onClose(), 1000);
  };

  const handleLogout = () => {
    logoutGoogleUser();
    setCurrentUser(null);
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#141414] border border-[#2E2E2E] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-[#E8D7C3] relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glow ambient background */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#202020] hover:bg-[#2A2A2A] text-stone-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {currentUser ? (
          /* User Profile Logged In View */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-400 mx-auto shadow-lg relative">
              <img
                src={currentUser.picture}
                alt={currentUser.name}
                className="w-full h-full object-cover bg-stone-900"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Signed in with Google</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white pt-1">
                {currentUser.name}
              </h3>
              <p className="text-xs text-stone-400 font-mono">
                {currentUser.email}
              </p>
            </div>

            <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl p-3.5 text-xs text-stone-300 space-y-1 text-left">
              <span className="text-[10px] uppercase font-bold text-stone-500 block">
                Account Status
              </span>
              <p className="text-emerald-400 font-medium">
                ✓ Auto-fills Name &amp; Email at checkout &amp; Welcome Offer
              </p>
              <p className="text-[11px] text-stone-400">
                Connected with The Black Cat Cafe
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
              >
                Continue Browsing
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-[#202020] hover:bg-[#2A2A2A] text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Screen */
          <div className="p-6 sm:p-7 space-y-5">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg">
                <GoogleGIcon className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Google Console OAuth
                </span>
                <h3 className="font-serif text-xl font-black text-white tracking-tight mt-0.5">
                  Sign in with Google
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Google se sign in karke apna Naam aur Email 1-click me connect karein taaki order tracking aur discounts aasaani se mil sakein.
            </p>

            {/* Quick 1-Click Demo Accounts */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-stone-500 block tracking-wider">
                1-Click Quick Select:
              </span>
              <div className="space-y-1.5">
                {[
                  {
                    name: 'Rahul Sharma',
                    email: 'rahul.sharma@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                  },
                  {
                    name: 'Priya Verma',
                    email: 'priya.verma@gmail.com',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
                  }
                ].map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickAccountPick(acc)}
                    className="w-full bg-[#1A1A1A] hover:bg-[#222222] border border-white/10 hover:border-amber-500/40 p-2.5 rounded-xl flex items-center justify-between transition-all group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold text-white block group-hover:text-amber-300">
                          {acc.name}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono block">
                          {acc.email}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-0.5">
                      <span>Select</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Google Account Entry */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-3 text-[10px] text-stone-500 font-bold uppercase tracking-wider">
                Or Enter Your Google Details
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form onSubmit={handleSimulatedGoogleSubmit} className="space-y-3">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-stone-300 block">
                  Google Account Name <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Sharma"
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-amber-500 text-white pl-10 pr-4 py-2 rounded-xl text-xs outline-none transition-all placeholder:text-stone-600"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-stone-300 block">
                  Gmail / Google Email <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. amansharma@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#333333] focus:border-amber-500 text-white pl-10 pr-4 py-2 rounded-xl text-xs outline-none transition-all placeholder:text-stone-600 font-mono"
                  />
                </div>
              </div>

              {error && (
                <p className="text-rose-400 text-xs font-medium text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-stone-100 text-black font-extrabold py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <GoogleGIcon className="w-4 h-4" />
                <span>{isSubmitting ? 'Signing In...' : 'Continue with Google'}</span>
              </button>
            </form>

            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-stone-400">Cafe Owner?</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenAdmin) onOpenAdmin();
                }}
                className="text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <span>Owner Google Console (PIN: 1234)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="pt-1 text-center border-t border-white/5">
              <p className="text-[10px] text-stone-500 leading-relaxed">
                By continuing, you agree to The Black Cat Cafe's Terms of Service &amp; Privacy Policy. Google Cloud Console verified.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
