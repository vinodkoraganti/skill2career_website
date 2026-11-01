import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { api } from '../services/api.ts';
import { MatchResult } from '../utils/careerMatcher.ts';

export default function CareerRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const recs = await api.getRecommendedCareers();
        setRecommendations(recs);
      } catch (err) {
        console.error('Failed to load career recommendations:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Career Recommendations
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Algorithmic and AI-driven career matches based on your technical skills, education, and stated career interests.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500 text-sm">Evaluating matching scores...</div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((match) => (
            <div
              key={match.career.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-sky-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-lg font-bold text-slate-900">
                    {match.career.title}
                  </h2>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      match.matchScore >= 75
                        ? 'bg-emerald-100 text-emerald-800'
                        : match.matchScore >= 50
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {match.matchLevel} ({match.matchScore}%)
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {match.career.description}
                </p>

                {/* Match Reasons */}
                <div className="space-y-1 text-xs">
                  {match.reasons.map((reason, idx) => (
                    <p key={idx} className="text-slate-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      {reason}
                    </p>
                  ))}
                </div>

                {/* Matching Skills vs Missing */}
                <div className="flex flex-wrap gap-4 pt-1 text-xs">
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px] uppercase">
                      Skills You Have ({match.matchingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {match.matchingSkills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {match.missingSkills.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-400 block text-[10px] uppercase">
                        Skills to Acquire ({match.missingSkills.length})
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {match.missingSkills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                <Link
                  to={`/careers/${match.career.id}`}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-all text-center flex items-center justify-center gap-1.5"
                >
                  View Career Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to={`/skill-gap?careerId=${match.career.id}`}
                  className="px-4 py-2.5 rounded-xl font-semibold text-xs text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors text-center"
                >
                  Analyze Skill Gap
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
