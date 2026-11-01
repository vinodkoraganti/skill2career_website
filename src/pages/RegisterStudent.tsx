import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, GraduationCap, ArrowLeft, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export default function RegisterStudent() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [graduationYear, setGraduationYear] = useState('2026');

  const [skills, setSkills] = useState<string[]>(['Python', 'Java', 'SQL']);
  const [newSkill, setNewSkill] = useState('');

  const [interests, setInterests] = useState<string[]>(['AI/ML', 'Data Science']);
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

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (itemToRemove: string) => {
    setInterests(interests.filter((i) => i !== itemToRemove));
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
        accountType: 'student',
        college,
        degree,
        branch,
        graduationYear,
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
                  Student
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                Student Registration
              </h1>
              <p className="text-xs text-slate-500">
                Join Skill2Career and start your personalized career journey
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
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
                  placeholder="Create a password (min 6 characters)"
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
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / Institution *
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Enter your college or university name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degree *
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
                >
                  <option value="B.Tech">B.Tech / B.E.</option>
                  <option value="BCA">BCA / B.Sc Computer Science</option>
                  <option value="MCA">MCA / M.Tech</option>
                  <option value="Diploma">Diploma in Engineering</option>
                  <option value="Other">Other Degree</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Branch / Specialization *
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                  <option value="Electronics & Communication">Electronics & Communication</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Mechanical / Civil">Mechanical / Civil Engineering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Graduation Year *
                </label>
                <select
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills & Interests Tags section */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Skills & Interests (Select or type)
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
                  placeholder="e.g. Python, Java, SQL, React"
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Career Domains
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddInterest();
                    }
                  }}
                  placeholder="e.g. AI/ML, Cloud Computing, Full Stack"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
                <button
                  type="button"
                  onClick={handleAddInterest}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2.5">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(item)}
                      className="hover:text-rose-600 focus:outline-hidden"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
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
