import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Compass,
  Map,
  CheckSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  GraduationCap,
  Briefcase,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { api } from '../services/api.ts';
import { MatchResult } from '../utils/careerMatcher.ts';
import { UserRoadmap } from '../types/index.ts';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<MatchResult[]>([]);
  const [roadmap, setRoadmap] = useState<UserRoadmap | null>(null);
  const [savedCount, setSavedCount] = useState({ courses: 0, jobs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [recs, rMap, saved] = await Promise.all([
          api.getRecommendedCareers(),
          api.getCurrentRoadmap(),
          api.getSavedItems(),
        ]);
        setRecommendations(recs);
        setRoadmap(rMap);
        setSavedCount({
          courses: saved.savedCourses?.length || 0,
          jobs: saved.savedJobs?.length || 0,
        });
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [user]);

  if (!user) return null;

  const isStudent = user.accountType === 'student';
  const profilePercent = isStudent ? 72 : 85;

  return (
    <div className="space-y-6">
      {/* Top Banner & Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user.displayName}!
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isStudent
              ? 'Your personalized student career and learning dashboard'
              : 'Your professional career growth and upskilling dashboard'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/roadmap"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Map className="w-4 h-4" /> Continue Roadmap
          </Link>
        </div>
      </div>

      {/* Grid: Profile Card (Left) & Recommended Careers (Right) matching Screens 6 & 7 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Profile Completion
              </span>
              <span className="text-xs font-extrabold text-sky-600">
                {profilePercent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${profilePercent}%` }}
              ></div>
            </div>

            {/* User Details */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
                {user.displayName.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {user.displayName}
                </h2>
                {isStudent ? (
                  <>
                    <p className="text-xs font-semibold text-slate-600">
                      {user.details?.degree || 'B.Tech'} {user.details?.branch ? `(${user.details.graduationYear || '2026'})` : ''}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.details?.college || 'University Student'}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-slate-600">
                      {user.details?.currentRole || 'Software Developer'} • {user.details?.experienceYears || '3 years'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user.details?.company || 'Technology Sector'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Career Goal callout for professional */}
            {!isStudent && (
              <div className="mt-5 p-3.5 rounded-2xl bg-sky-50/80 border border-sky-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                    Career Target Goal
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    {user.details?.targetRole || 'Cloud Engineer'} (Upskill & Advance)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <Link
              to="/profile"
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors flex items-center justify-center gap-2"
            >
              Update Profile
            </Link>
          </div>
        </div>

        {/* Recommended Careers (Right) matching Screens 6 & 7 */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Recommended Career Paths
              </h2>
              <Link
                to="/career-recommendations"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                View Details <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((match, idx) => (
                <div
                  key={match.career.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-sky-300 transition-all flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">
                        {match.career.title}
                      </h3>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          match.matchScore >= 75
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {match.matchLevel} ({match.matchScore}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {match.reasons[0]}
                    </p>
                  </div>

                  <Link
                    to={`/careers/${match.career.id}`}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-sky-700 bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-colors shrink-0"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Calculated using your current skills and target preferences</span>
            <Link to="/skill-gap" className="text-sky-600 font-semibold hover:underline">
              Analyze Skill Gaps →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions matching Screens 6 & 7 */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/resume-analysis"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
              Analyze Resume
            </p>
          </Link>

          <Link
            to="/careers"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
              Explore Careers
            </p>
          </Link>

          <Link
            to="/roadmap"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center">
              <Map className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
              View Roadmap
            </p>
          </Link>

          <Link
            to="/assessments"
            className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2.5"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors flex items-center justify-center">
              <CheckSquare className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
              Take Quiz
            </p>
          </Link>
        </div>
      </div>

      {/* Current Roadmap & Saved Items summary strip */}
      {roadmap && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Active Roadmap
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-sky-100 text-sky-800">
                {roadmap.completionPercentage}% Completed
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Personalized Learning Path for {roadmap.targetCareerTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Stage 1 (Foundations) and Stage 2 (Core Skills) in active progress.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/skill-gap"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Skill Gaps
            </Link>
            <Link
              to="/roadmap"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-all flex items-center gap-1.5"
            >
              Open Roadmap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
