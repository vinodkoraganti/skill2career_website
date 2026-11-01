import React, { useState } from 'react';
import { Settings, Shield, Bell, Lock, Globe, Moon, Sun, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export default function SettingsPage() {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState('English');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [recommendationAlerts, setRecommendationAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account preferences, notification settings, and display appearance.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Account Settings matching Screen 16 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-600" /> Account Security & Notifications
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">Email Notifications</p>
                <p className="text-[11px] text-slate-500">Receive career matches and roadmap reminders</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="rounded text-sky-600 h-4 w-4"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <p className="text-xs font-bold text-slate-900">AI Job Recommendation Alerts</p>
                <p className="text-[11px] text-slate-500">Alerts when new internships align with your skills</p>
              </div>
              <input
                type="checkbox"
                checked={recommendationAlerts}
                onChange={(e) => setRecommendationAlerts(e.target.checked)}
                className="rounded text-sky-600 h-4 w-4"
              />
            </div>
          </div>
        </div>

        {/* Appearance matching Screen 16 */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Sun className="w-4 h-4 text-sky-600" /> Appearance & Language
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Display Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    theme === 'light'
                      ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-500" /> Light Theme
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Moon className="w-4 h-4 text-slate-400" /> Dark (Preview)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Preferred Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
              >
                <option value="English">English (Default)</option>
                <option value="Hindi">Hindi / हिन्दी</option>
                <option value="Telugu">Telugu / తెలుగు</option>
                <option value="Spanish">Spanish / Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save button matching Screen 16 */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
