import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  CheckCircle2,
  Clock,
  Layers,
  BookOpen,
  Calendar,
  Sparkles,
  Award,
} from 'lucide-react';
import { api } from '../services/api.ts';

export default function ProgressPage() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await api.getProgress();
        setData(res);
      } catch (err) {
        console.error('Failed to load progress:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProgress();
  }, []);

  if (loading || !data) {
    return <div className="p-8 text-center text-slate-500 text-sm">Loading progress metrics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Progress Tracking
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your learning journey, roadmap milestones, and technical achievements.
        </p>
      </div>

      {/* 4 Metric Cards matching Screen 15 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Roadmap Progress
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-sky-600">
              {data.roadmapProgress}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full"
              style={{ width: `${data.roadmapProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Completed Tasks
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-emerald-600">
              {data.completedTasksCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">milestones</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-3">
            +3 completed this week
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            In Progress
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-amber-500">
              {data.inProgressTasksCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">active</span>
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-3">
            Core skills modules
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Curriculum
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black text-slate-800">
              {data.totalTasksCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">tasks</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-3">
            4 Structured Stages
          </p>
        </div>
      </div>

      {/* Grid: Skills Overview (Left) & Recent Activity (Right) matching Screen 15 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skills Overview */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Skills Overview
          </h2>

          <div className="flex items-center justify-center p-4">
            <div className="w-36 h-36 rounded-full border-8 border-sky-400 border-t-emerald-500 border-r-amber-400 flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-2xl font-black text-slate-800">30</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Core Skills
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-700 font-semibold">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Completed
              </span>
              <span className="font-extrabold text-slate-900">8</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-700 font-semibold">
                <span className="w-3 h-3 rounded-full bg-sky-500"></span> In Learning
              </span>
              <span className="font-extrabold text-slate-900">12</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-700 font-semibold">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span> To Learn
              </span>
              <span className="font-extrabold text-slate-900">10</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline matching Screen 15 */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Recent Activity
            </h2>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Completed Python Basics Quiz</p>
                  <p className="text-[11px] text-slate-500">Scored 80% (Proficiency verified)</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400">2 days ago</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Started Machine Learning Specialization</p>
                  <p className="text-[11px] text-slate-500">Completed Week 1 Supervised Regression</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400">3 days ago</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Updated Profile & Technical Skills</p>
                  <p className="text-[11px] text-slate-500">Added SQL and Data Structures</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400">4 days ago</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Saved AWS Cloud Practitioner Course</p>
                  <p className="text-[11px] text-slate-500">Scheduled for Stage 2 Curriculum</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400">5 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
