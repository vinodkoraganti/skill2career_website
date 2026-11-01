import React, { useState, useEffect } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api.ts';
import { UserRoadmap, RoadmapStageItem, RoadmapTaskItem } from '../types/index.ts';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<UserRoadmap | null>(null);
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({
    'stage-1': true,
    'stage-2': true,
    'stage-3': false,
    'stage-4': false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoadmap() {
      try {
        const res = await api.getCurrentRoadmap();
        setRoadmap(res);
      } catch (err) {
        console.error('Failed to load roadmap:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRoadmap();
  }, []);

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === 'completed'
        ? 'not_started'
        : currentStatus === 'not_started'
        ? 'in_progress'
        : 'completed';

    // Optimistic UI update
    if (roadmap) {
      const updatedStages = roadmap.stages.map((stage) => ({
        ...stage,
        tasks: stage.tasks.map((t) => (t.id === taskId ? { ...t, status: nextStatus as any } : t)),
      }));

      let completedCount = 0;
      let totalCount = 0;
      for (const s of updatedStages) {
        for (const t of s.tasks) {
          if (t.status === 'completed') completedCount++;
          totalCount++;
        }
      }
      const newPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      setRoadmap({
        ...roadmap,
        stages: updatedStages,
        completionPercentage: newPercentage,
      });
    }

    try {
      const res = await api.toggleRoadmapTask(taskId, nextStatus);
      setRoadmap(res.roadmap);
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  if (loading || !roadmap) {
    return (
      <div className="p-8 text-center text-slate-500 text-sm">
        Loading personalized roadmap...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Personalized Learning Roadmap
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Follow a structured path to achieve your career goals.
        </p>
      </div>

      {/* Target Career & Progress Header matching Screen 11 */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Target Career Path
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {roadmap.targetCareerTitle}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-sky-600">
              {roadmap.completionPercentage}% Completed
            </span>
          </div>
        </div>

        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full transition-all duration-300"
            style={{ width: `${roadmap.completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 4 Stages matching Screen 11 */}
      <div className="space-y-4">
        {roadmap.stages.map((stage) => {
          const isExpanded = expandedStages[stage.id];
          const completedCount = stage.tasks.filter((t) => t.status === 'completed').length;
          const totalCount = stage.tasks.length;

          return (
            <div
              key={stage.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden"
            >
              {/* Stage Header Accordion */}
              <button
                type="button"
                onClick={() => toggleStage(stage.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-slate-50/60 transition-colors focus:outline-hidden"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                      completedCount === totalCount && totalCount > 0
                        ? 'bg-emerald-500 text-white'
                        : completedCount > 0
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {stage.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {completedCount} / {totalCount}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Tasks List inside stage */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-3">
                  {stage.tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                        task.status === 'completed'
                          ? 'bg-emerald-50/40 border-emerald-200/70 text-slate-800'
                          : task.status === 'in_progress'
                          ? 'bg-sky-50/40 border-sky-200 text-slate-900'
                          : 'bg-slate-50/50 border-slate-200/80 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleTask(task.id, task.status)}
                          className="mt-0.5 shrink-0 focus:outline-hidden"
                          title="Click to toggle status (Not Started -> In Progress -> Completed)"
                        >
                          {task.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : task.status === 'in_progress' ? (
                            <Clock className="w-5 h-5 text-sky-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                          )}
                        </button>
                        <div className="space-y-0.5">
                          <p
                            className={`text-xs font-bold ${
                              task.status === 'completed'
                                ? 'line-through text-slate-500'
                                : 'text-slate-900'
                            }`}
                          >
                            {task.title}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {task.description}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            task.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : task.status === 'in_progress'
                              ? 'bg-sky-100 text-sky-800'
                              : 'bg-slate-200/70 text-slate-600'
                          }`}
                        >
                          {task.status === 'completed'
                            ? 'Completed'
                            : task.status === 'in_progress'
                            ? 'In Progress'
                            : 'To Do'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
