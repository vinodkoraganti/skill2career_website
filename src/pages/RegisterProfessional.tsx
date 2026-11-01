import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, ArrowLeft, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export default function RegisterProfessional() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentRole, setCurrentRole] = useState('Software Developer');
  const [company, setCompany] = useState('');
  const [experienceYears, setExperienceYears] = useState('3 years');
  const [industry, setIndustry] = useState('Information Technology');
  const [targetRole, setTargetRole] = useState('Cloud Engineer');
  const [preferredLocation, setPreferredLocation] = useState('Hyderabad / Remote');

  const [skills, setSkills] = useState<string[]>(['AWS', 'Docker', 'Kubernetes', 'Linux', 'Terraform']);
  const [newSkill, setNewSkill] = useState('');

  const [interests, setInterests] = useState<string[]>(['Cloud Architecture', 'DevOps']);
  const [newInterest, setNewInterest] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName,
        email,
        password,
        accountType: 'professional',
        currentRole,
        company,
        experienceYears,
        industry,
        targetRole,
        preferredLocation,
        skills,
        interests,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200/80 bg-gradient-to-r from-sky-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Skill<span className="text-sky-600">2</span>Career
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-800">
                  Professional
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Professional Registration
              </h1>
              <p className="text-xs text-slate-500">
                Join Skill2Career and advance your career with upskilling roadmaps
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
        </div>

        {error && (
          <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password (min 6 characters)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Location
                </label>
                <input
                  type="text"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  placeholder="e.g. Hyderabad / Bangalore / Remote"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  placeholder="e.g. Software Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Enter current employer name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years of Experience *
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
                >
                  <option value="1-2 years">1-2 years</option>
                  <option value="3 years">3-5 years</option>
                  <option value="5-8 years">5-8 years</option>
                  <option value="8+ years">8+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Industry *
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Financial Services / Fintech">Financial Services / Fintech</option>
                  <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                  <option value="Telecommunications">Telecommunications</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role *
                </label>
                <input
                  type="text"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Cloud Architect / Staff Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Skills section */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Technical Skills (Select or type)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="e.g. AWS, Docker, Kubernetes, Terraform"
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="hover:text-rose-600 focus:outline-hidden"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all text-sm disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
