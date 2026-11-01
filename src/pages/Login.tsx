import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export default function Login() {
  const { login, switchDemoUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async (role: any) => {
    setLoading(true);
    try {
      await switchDemoUser(role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Side: Illustrative branding matching Screen 2 */}
        <div className="md:col-span-5 bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Skill2Career</span>
            </Link>

            <div className="pt-6 space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
                Build Skills<br />
                Achieve Goals<br />
                Grow Your Career
              </h2>
              <p className="text-xs text-white/90 leading-relaxed pt-2">
                Personalized AI roadmaps, verified courses, and direct job opportunities designed specifically for your ambitions.
              </p>
            </div>
          </div>

          {/* Quick Demo Logins for Instant Evaluation */}
          <div className="relative z-10 pt-6 mt-4 border-t border-white/20">
            <p className="text-xs font-semibold text-white/90 mb-2">⚡ Instant One-Click Demo Logins:</p>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => handleDemoSignIn('vinod')}
                className="w-full py-1.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-left text-xs font-medium flex items-center justify-between transition-colors backdrop-blur-xs"
              >
                <span>🎓 Vinod (Student)</span>
                <span className="text-[10px] text-white/80">Login →</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('kumar')}
                className="w-full py-1.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-left text-xs font-medium flex items-center justify-between transition-colors backdrop-blur-xs"
              >
                <span>💼 Kumar (Professional)</span>
                <span className="text-[10px] text-white/80">Login →</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('admin')}
                className="w-full py-1.5 px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-left text-xs font-medium flex items-center justify-between transition-colors backdrop-blur-xs"
              >
                <span>🛡️ Platform Admin</span>
                <span className="text-[10px] text-amber-300">Login →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Form matching Screen 2 */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Login to access your personalized career dashboard
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-sky-600 hover:text-sky-700"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 placeholder:text-slate-400"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-sky-600 hover:text-sky-700">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
