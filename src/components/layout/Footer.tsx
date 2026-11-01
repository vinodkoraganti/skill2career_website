import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-white">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Skill<span className="text-sky-400">2</span>Career
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your Career Starts with the Right Skills. An AI-powered ed-tech guidance platform helping students and professionals navigate upskilling, roadmaps, and career transitions.
            </p>
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Skill2Career. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">
              Explore Catalog
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/careers" className="hover:text-sky-400 transition-colors">
                  Trending Careers
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-sky-400 transition-colors">
                  Courses & Certifications
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-sky-400 transition-colors">
                  Jobs & Internships
                </Link>
              </li>
              <li>
                <Link to="/assessments" className="hover:text-sky-400 transition-colors">
                  Technical Quizzes
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">
              Career Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/resume-analysis" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" /> AI Resume Reviewer
                </Link>
              </li>
              <li>
                <Link to="/skill-gap" className="hover:text-sky-400 transition-colors">
                  Skill-Gap Analysis
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-sky-400 transition-colors">
                  4-Stage Learning Roadmap
                </Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-sky-400 transition-colors">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h3 className="text-xs font-semibold text-white tracking-wider uppercase mb-3">
              Platform & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors">
                  About Skill2Career
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-sky-400 transition-colors">
                  Backend Architecture
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-sky-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-sky-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
