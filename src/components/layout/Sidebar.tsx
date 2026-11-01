import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FileText,
  Compass,
  Layers,
  Map,
  GraduationCap,
  Briefcase,
  CheckSquare,
  BarChart2,
  Settings,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';

export default function Sidebar() {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/resume-analysis', label: 'Resume Analysis', icon: FileText, highlight: true },
    { to: '/career-recommendations', label: 'Career Recommendations', icon: Compass },
    { to: '/skill-gap', label: 'Skill-Gap Analysis', icon: Layers },
    { to: '/roadmap', label: 'Roadmap', icon: Map },
    { to: '/courses', label: 'Courses & Certifications', icon: GraduationCap },
    { to: '/jobs', label: 'Jobs & Internships', icon: Briefcase },
    { to: '/assessments', label: 'Quizzes', icon: CheckSquare },
    { to: '/progress', label: 'Progress Tracking', icon: BarChart2 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-1">
        <div className="px-3 py-2 mb-2">
          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Navigation Menu
          </p>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-semibold border-l-4 border-sky-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.highlight && (
                <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 bg-sky-100/80 px-1.5 py-0.5 rounded-md">
                  <Sparkles className="w-2.5 h-2.5" /> AI
                </span>
              )}
            </NavLink>
          );
        })}

        {user?.role === 'admin' && (
          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="px-3 text-[11px] font-bold text-amber-600 tracking-wider uppercase mb-1">
              Administration
            </p>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-100/70 text-amber-900 font-semibold border-l-4 border-amber-600'
                    : 'text-amber-800 hover:bg-amber-50'
                }`
              }
            >
              <Shield className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Admin Portal</span>
            </NavLink>
          </div>
        )}
      </div>

      {/* Mini Profile Summary in Footer */}
      {user && (
        <div className="pt-4 border-t border-slate-100 mt-6">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              {user.displayName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-800 truncate">{user.displayName}</p>
              <p className="text-[11px] text-slate-500 capitalize">{user.accountType}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
