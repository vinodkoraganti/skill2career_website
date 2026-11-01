import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  TrendingUp,
  Cpu,
  Code,
  Database,
  ShieldCheck,
  Cloud,
  Search,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Career } from '../types/index.ts';

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const list = await api.getCareers();
        setCareers(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
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

  const filtered = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = category === 'All' || c.category.toLowerCase().includes(category.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Trending Careers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Discover high-growth technology disciplines, required industry skills, and step-by-step learning roadmaps.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search careers, skills (e.g. AI, Python, Cloud)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="sm:w-60">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Data Science & AI">Data Science & AI</option>
            <option value="Software Development">Software Development</option>
            <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((career) => {
          const Icon = getCareerIcon(career.slug);
          return (
            <div
              key={career.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  {career.featured && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Trending
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                    {career.category}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                    {career.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                    {career.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {career.requiredSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  {career.growthRate}
                </span>

                <Link
                  to={`/careers/${career.id}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-colors flex items-center gap-1"
                >
                  Explore Role <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
