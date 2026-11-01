import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  Briefcase,
  Award,
  Bell,
  User,
  LogOut,
  Shield,
  ChevronDown,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';

export default function Navbar() {
  const { user, logout, switchDemoUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display flex items-center gap-1">
              Skill<span className="text-sky-600">2</span>Career
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            </span>
          </div>
        </Link>

        {/* Public Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/careers"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/careers') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Explore Careers
          </Link>
          <Link
            to="/courses"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/courses') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Courses
          </Link>
          <Link
            to="/jobs"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/jobs') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Jobs & Internships
          </Link>
          <Link
            to="/assessments"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/assessments') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Quizzes
          </Link>
          <Link
            to="/about"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive('/about') ? 'text-sky-600 bg-sky-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Right Action / Auth & Quick Profile Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Persona Demo Switcher for fast review */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium border border-slate-200">
            <span className="px-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Demo:</span>
            {[
              { id: 'vinod', label: 'Vinod', icon: '🎓', desc: 'Vinod (Student)' },
              { id: 'kumar', label: 'Kumar', icon: '💼', desc: 'Kumar (Professional)' },
              { id: 'admin', label: 'Admin', icon: '⚡', desc: 'Admin' },
            ].map((p) => {
              const isSelected = p.id === 'admin'
                ? user?.role === 'admin'
                : (user?.uid === `demo-${p.id}` || user?.displayName?.toLowerCase().startsWith(p.id));
              return (
                <button
                  key={p.id}
                  onClick={() => switchDemoUser(p.id as any)}
                  title={`Switch to ${p.desc}`}
                  className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                    isSelected
                      ? p.id === 'admin'
                        ? 'bg-amber-600 text-white font-semibold shadow-xs'
                        : 'bg-white text-sky-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span className="text-xs">{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-full border border-slate-200 hover:border-slate-300 transition-colors bg-white shadow-xs focus:outline-hidden"
              >
                <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 font-semibold text-sm">
                  {user.displayName.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">
                    {user.displayName}
                  </p>
                  <p className="text-[10px] text-sky-600 capitalize">
                    {user.role === 'admin' ? 'Administrator' : user.accountType}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 pr-1" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setShowUserMenu(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">{user.displayName}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                  >
                    <Compass className="w-4 h-4" /> My Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                  >
                    <User className="w-4 h-4" /> Profile Management
                  </Link>

                  <Link
                    to="/roadmap"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                  >
                    <BookOpen className="w-4 h-4" /> Learning Roadmap
                  </Link>

                  <Link
                    to="/skill-gap"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                  >
                    <Award className="w-4 h-4" /> Skill-Gap Analysis
                  </Link>

                  <Link
                    to="/resume-analysis"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-sky-600"
                  >
                    <Sparkles className="w-4 h-4 text-sky-500" /> AI Resume Analysis
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50/50 hover:bg-amber-100"
                    >
                      <Shield className="w-4 h-4" /> Admin Portal
                    </Link>
                  )}

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-xs shadow-sky-600/30 transition-all hover:scale-[1.02]"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            to="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Explore Careers
          </Link>
          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Courses
          </Link>
          <Link
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Jobs & Internships
          </Link>
          <Link
            to="/assessments"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Quizzes & Assessments
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-sky-600 font-semibold hover:bg-sky-50"
          >
            Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
