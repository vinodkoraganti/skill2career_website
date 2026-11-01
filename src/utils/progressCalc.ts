/**
 * Pure progress and analytics calculation logic
 */

export interface RoadmapTask {
  id: string;
  title: string;
  description?: string;
  stageIndex: number; // 0: Foundations, 1: Core Skills, 2: Advanced Topics, 3: Career Ready
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface RoadmapStage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tasks: RoadmapTask[];
}

export interface ProgressSummary {
  roadmapProgress: number; // 0 to 100%
  completedTasksCount: number;
  inProgressTasksCount: number;
  totalTasksCount: number;
  stageProgress: {
    stageNumber: number;
    title: string;
    completed: number;
    total: number;
    percentage: number;
  }[];
}

export function calculateRoadmapProgress(stages: RoadmapStage[]): ProgressSummary {
  let completed = 0;
  let inProgress = 0;
  let total = 0;

  const stageProgress = stages.map((stage) => {
    let sCompleted = 0;
    const sTotal = stage.tasks.length;
    for (const t of stage.tasks) {
      if (t.status === 'completed') {
        completed++;
        sCompleted++;
      } else if (t.status === 'in_progress') {
        inProgress++;
      }
      total++;
    }
    const percentage = sTotal > 0 ? Math.round((sCompleted / sTotal) * 100) : 0;
    return {
      stageNumber: stage.number,
      title: stage.title,
      completed: sCompleted,
      total: sTotal,
      percentage,
    };
  });

  const roadmapProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    roadmapProgress,
    completedTasksCount: completed,
    inProgressTasksCount: inProgress,
    totalTasksCount: total,
    stageProgress,
  };
}
