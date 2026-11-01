import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Cpu,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  DollarSign,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Career, Course, Job } from '../types/index.ts';

export default function CareerDetailsPage() {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const [career, setCareer] = useState<Career | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const id = careerId || 'career-aiml';
        const [cData, coList, jList] = await Promise.all([
          api.getCareer(id),
          api.getCourses(),
          api.getJobs(),
        ]);
        setCareer(cData);
        setRelatedCourses(coList.slice(0, 2));
        setRelatedJobs(jList.slice(0, 2));
      } catch (err) {
        console.error('Failed to load career details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [careerId]);

  if (loading || !career) {
    return <div className="p-8 text-center text-slate-500 text-sm">Loading career profile...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>
      </div>

      {/* Hero Banner matching Screen 13 top-left */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                {career.category}
              </span>
              {career.featured && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Trending
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {career.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              {career.description}
            </p>

            {/* Required Skills tags */}
            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Required Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {career.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <p className="font-semibold text-slate-400">Demand & Growth</p>
                <p className="font-bold text-emerald-600 mt-0.5">{career.growthRate || 'High Growth'}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-400">Average Salary Range</p>
                <p className="font-bold text-slate-900 mt-0.5">{career.averageSalary || 'Competitive'}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-400">Recommended Next Step</p>
                <p className="font-bold text-sky-600 mt-0.5">Foundational Roadmap</p>
              </div>
            </div>
          </div>

          {/* Right Icon Illustration Visual */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-36 h-36 rounded-3xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-sky-600/20">
              <Cpu className="w-16 h-16 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/roadmap"
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all flex items-center gap-2"
          >
            Explore Learning Path <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/skill-gap"
            className="px-5 py-3 rounded-xl font-bold text-xs text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all"
          >
            Analyze Your Skill Gap for this Role
          </Link>
        </div>
      </div>

      {/* Responsibilities & Advanced Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Key Responsibilities & Day-to-Day
          </h2>
          <ul className="space-y-2.5">
            {career.responsibilities?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Recommended Advanced Competencies
          </h2>
          <div className="space-y-2">
            {career.recommendedSkills?.map((skill, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-slate-800">{skill}</span>
                <span className="text-[10px] text-sky-600 font-bold bg-white px-2 py-0.5 rounded-full border border-sky-100">
                  Competitive Advantage
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
