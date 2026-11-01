import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Sparkles,
  BookOpen,
  Briefcase,
  Layers,
  Award,
  Cpu,
  Code,
  Database,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Career, Course, Job } from '../types/index.ts';

export default function Home() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cList, coList, jList] = await Promise.all([
          api.getCareers(),
          api.getCourses(),
          api.getJobs(),
        ]);
        setCareers(cList);
        setFeaturedCourses(coList.filter((c) => c.featured).slice(0, 3));
        setFeaturedJobs(jList.filter((j) => j.featured).slice(0, 3));
      } catch (err) {
        console.error('Failed to load catalog data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getCareerIcon = (slug: string) => {
    switch (slug) {
      case 'aiml-engineer':
        return Cpu;
      case 'software-engineer':
        return Code;
      case 'data-scientist':
        return Database;
      case 'cybersecurity-analyst':
        return ShieldCheck;
      case 'cloud-engineer':
      case 'devops-engineer':
        return Cloud;
      default:
        return Compass;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section matching Screen 1 */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-sky-50/70 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                AI-Driven Career Pathways & Roadmap Guidance
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Career Starts with the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500 underline decoration-sky-300 decoration-wavy decoration-2">
                  Right Skills.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover your career path, identify the skills you need, and follow a personalized roadmap toward your professional goals.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/careers"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/25 transition-all text-center flex items-center justify-center gap-2"
                >
                  Explore Careers
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all text-center flex items-center justify-center gap-2"
                >
                  Get Started
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free Career Analysis
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Structured 4-Stage Roadmaps
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Powered by Gemini 4 Thinking
                </span>
              </div>
            </div>

            {/* Right Hero Graphic: Matching Screen 1 illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl shadow-sky-900/5 border border-sky-100 relative">
                {/* Floating Skill Badge 1 */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 animate-bounce duration-1000">
                  <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">Skill-Gap Detected</p>
                    <p className="text-[10px] text-sky-600 font-semibold">+3 In-Demand Skills</p>
                  </div>
                </div>

                {/* Floating Skill Badge 2 */}
                <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800">Target Match: 88%</p>
                    <p className="text-[10px] text-emerald-600 font-semibold">AI/ML Engineer</p>
                  </div>
                </div>

                {/* Main Illustration Card Visual */}
                <div className="aspect-4/3 rounded-2xl bg-gradient-to-tr from-sky-500 via-sky-400 to-cyan-300 p-6 flex flex-col justify-between text-white shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-white/20 backdrop-blur-xs rounded-full">
                      Personalized Learning Path
                    </span>
                    <Compass className="w-5 h-5 text-white/80" />
                  </div>

                  <div className="space-y-3">
                    <div className="h-2 w-3/4 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-2/3"></div>
                    </div>
                    <div className="p-3 bg-white/15 backdrop-blur-md rounded-xl text-xs space-y-1">
                      <p className="font-bold">Next Recommended Step:</p>
                      <p className="text-white/90">Master Pandas & Model Evaluation Techniques</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500">
                    Trusted by students & professionals across top engineering colleges & tech firms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Career Paths Section: Matching Screen 1 */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Trending Career Paths
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore in-demand industry domains with curated roadmaps, required skills, and job matches.
              </p>
            </div>
            <Link
              to="/careers"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {careers.slice(0, 5).map((career) => {
              const Icon = getCareerIcon(career.slug);
              return (
                <div
                  key={career.id}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/40 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {career.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {career.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60">
                    <Link
                      to={`/careers/${career.id}`}
                      className="text-xs font-semibold text-sky-600 group-hover:text-sky-700 flex items-center gap-1"
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Stage Learning Roadmap System Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/70 px-3 py-1 rounded-full">
              Systematic Progression
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
              How Skill2Career Guides You to Success
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Our 4-stage pedagogical framework bridges the gap between what colleges teach and what industry recruiters actually expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Stage 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Foundations</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Build basic concepts, syntax, version control with Git, and algorithmic logic.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Example: Python, Basic OOP, SQL, Git
              </div>
            </div>

            {/* Stage 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Core Skills</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Build essential technical competencies, frameworks, and practical data manipulations.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Example: Pandas, NumPy, Machine Learning
              </div>
            </div>

            {/* Stage 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Advanced Topics</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Deep dive into model architectures, system design, distributed scaling, and deployment.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Example: PyTorch, MLOps, Docker, FastAPI
              </div>
            </div>

            {/* Stage 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm shadow-sky-600/30">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900">Career Ready</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Polish your portfolio, practice technical coding rounds, prepare ATS resumes, and apply to roles.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                Example: Mock Interviews, Capstone Projects
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Recommended Courses & Certifications
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Learn from industry-recognized platforms and build verified skills.
              </p>
            </div>
            <Link
              to="/courses"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              All Courses <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/9 bg-slate-100 relative overflow-hidden">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-full text-xs font-bold text-sky-700 shadow-xs">
                      {course.priceDescription}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs font-semibold text-sky-600">{course.provider}</p>
                    <h3 className="font-bold text-slate-900 text-base">{course.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {course.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{course.duration}</span>
                  <a
                    href={course.courseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl"
                  >
                    View Course
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Latest Jobs & Internships
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Apply directly to opportunities that match your current skillset.
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
            >
              All Jobs <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-sky-300 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-sky-100 text-sky-700">
                      {job.employmentType}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
                      {job.workMode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{job.company}</span> • {job.location}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.requiredSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shrink-0"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
