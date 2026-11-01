import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, AlertCircle, ArrowUpRight, Sparkles, BookOpen, ChevronRight, Award } from 'lucide-react';
import { api } from '../services/api.ts';
import { Career } from '../types/index.ts';
import { SkillGapAnalysisResult } from '../utils/skillGap.ts';

export default function SkillGapPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState('career-aiml');
  const [analysis, setAnalysis] = useState<SkillGapAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitial() {
      try {
        const cList = await api.getCareers();
        setCareers(cList);
        if (cList.length > 0) {
          const res = await api.getSkillGap('career-aiml');
          setAnalysis(res);
        }
      } catch (err) {
        console.error('Failed to load skill gap data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInitial();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await api.getSkillGap(selectedCareerId);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Skill-Gap Analysis
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Compare your current skills with the skills required for your target career.
        </p>
      </div>

      {/* Target Career Selector matching Screen 19 */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 max-w-xl">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Career
            </label>
            <select
              value={selectedCareerId}
              onChange={(e) => setSelectedCareerId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
            >
              {careers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-all disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyse'}
          </button>
        </div>

        {/* Readiness Score banner */}
        {analysis && (
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Overall Skill Readiness for {analysis.targetCareerTitle}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                {analysis.nextPriorityAction}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-sky-600">
                {analysis.overallReadiness}%
              </span>
              <span className="text-xs font-semibold text-slate-400">Readiness Score</span>
            </div>
          </div>
        )}
      </div>

      {/* 3 Skill Buckets matching Screen 19 */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Skills You Have (Green) */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-emerald-50">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Skills You Have
                </h3>
                <p className="text-[11px] text-emerald-600 font-medium">
                  {analysis.skillsHave.length} Verified Proficiencies
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {analysis.skillsHave.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                    Mastered
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Skills to Improve (Yellow) */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-amber-50">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Skills to Improve
                </h3>
                <p className="text-[11px] text-amber-600 font-medium">
                  {analysis.skillsImprove.length} In Progress / Need Practice
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {analysis.skillsImprove.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200">
                    Level Up
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Skills to Learn (Coral / Red) */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-rose-50">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Skills to Learn
                </h3>
                <p className="text-[11px] text-rose-600 font-medium">
                  {analysis.skillsLearn.length} High Priority Missing Gaps
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {analysis.skillsLearn.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-200">
                    Priority Gap
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recommended Learning Resources card matching Screen 19 */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Recommended Learning Resources for Missing Skills
          </h2>
          <span className="text-xs font-semibold text-sky-600">Curated from Catalog</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-white border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Machine Learning Specialization
              </h3>
              <p className="text-xs text-slate-500">
                Coursera • DeepLearning.AI • 3 Months • Intermediate
              </p>
              <div className="flex gap-2 mt-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-sky-100 text-sky-700">
                  Covers: Machine Learning, Deep Learning, Statistics
                </span>
              </div>
            </div>
          </div>

          <a
            href="https://www.coursera.org/specializations/machine-learning-introduction"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 transition-colors shrink-0 text-center"
          >
            Start Learning
          </a>
        </div>
      </div>
    </div>
  );
}
