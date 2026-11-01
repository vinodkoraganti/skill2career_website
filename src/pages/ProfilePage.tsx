import React, { useState, useEffect } from 'react';
import { Plus, X, Check, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'student' | 'professional'>('student');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [branch, setBranch] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  // Professional fields
  const [currentRole, setCurrentRole] = useState('');
  const [company, setCompany] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetRole, setTargetRole] = useState('');

  // Skills & Interests
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setActiveTab(user.accountType);
      setDisplayName(user.displayName);
      setEmail(user.email);
      setCollege(user.details?.college || 'Vignan University');
      setDegree(user.details?.degree || 'B.Tech');
      setBranch(user.details?.branch || 'Computer Science & Engineering');
      setGraduationYear(user.details?.graduationYear || '2026');

      setCurrentRole(user.details?.currentRole || 'Software Developer');
      setCompany(user.details?.company || 'Tech Solutions');
      setExperienceYears(user.details?.experienceYears || '3 years');
      setIndustry(user.details?.industry || 'Information Technology');
      setTargetRole(user.details?.targetRole || 'Cloud Engineer');

      setSkills(user.details?.skills || ['Python', 'Java', 'SQL', 'DSA']);
      setInterests(user.details?.interests || ['AI/ML', 'Data Science', 'Web Development']);
    }
  }, [user]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    try {
      await updateProfile(displayName, {
        college,
        degree,
        branch,
        graduationYear,
        currentRole,
        company,
        experienceYears,
        industry,
        targetRole,
        skills,
        interests,
      });
      setSuccessMessage('Profile details updated successfully!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Profile Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Keep your information up to date for better recommendations
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          {successMessage}
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        {/* Profile Tabs matching Screen 8 */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'student'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Student Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('professional')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'professional'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Professional Profile
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Main User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Conditional Profile Fields */}
          {activeTab === 'student' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / Institution
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Branch / Specialization
                </label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Graduation Year
                </label>
                <input
                  type="text"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Current Role
                </label>
                <input
                  type="text"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Career Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>
          )}

          {/* Skills & Interests matching Screen 8 */}
          <div className="pt-4 border-t border-slate-100 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Skills & Technical Competencies
                </label>
                <span className="text-[11px] text-slate-400">Add key technologies you know</span>
              </div>
              <div className="flex gap-2 mb-3">
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
                  placeholder="e.g. Python, SQL, React, AWS"
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

              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-sky-50 border border-sky-200 text-sky-800"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(s)}
                      className="hover:text-rose-600 focus:outline-hidden"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Career Interests
                </label>
                <span className="text-[11px] text-slate-400">Domains you want to pursue</span>
              </div>
              <div className="flex gap-2 mb-3">
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
                  placeholder="e.g. Machine Learning, Cloud Architecture"
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

              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-50 border border-cyan-200 text-cyan-800"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(item)}
                      className="hover:text-rose-600 focus:outline-hidden"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all text-xs flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
