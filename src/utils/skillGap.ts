/**
 * Pure logic for Skill Gap Analysis matching screen 19 of UI showcase
 */

export interface SkillGapItem {
  name: string;
  category: 'have' | 'improve' | 'learn';
  priority: 'High' | 'Medium' | 'Low';
  proficiency?: number; // 0 - 100
}

export interface SkillGapAnalysisResult {
  targetCareerId: string;
  targetCareerTitle: string;
  skillsHave: SkillGapItem[];
  skillsImprove: SkillGapItem[];
  skillsLearn: SkillGapItem[];
  overallReadiness: number; // 0 to 100
  nextPriorityAction: string;
}

export function analyzeSkillGaps(
  targetCareerTitle: string,
  targetCareerId: string,
  requiredSkills: string[],
  recommendedSkills: string[] = [],
  userSkills: string[],
  inProgressSkills: string[] = []
): SkillGapAnalysisResult {
  const normUser = new Set(userSkills.map((s) => s.toLowerCase().trim()));
  const normInProgress = new Set(inProgressSkills.map((s) => s.toLowerCase().trim()));

  const skillsHave: SkillGapItem[] = [];
  const skillsImprove: SkillGapItem[] = [];
  const skillsLearn: SkillGapItem[] = [];

  // Check required skills
  for (const skill of requiredSkills) {
    const norm = skill.toLowerCase().trim();
    if (normUser.has(norm)) {
      skillsHave.push({
        name: skill,
        category: 'have',
        priority: 'High',
        proficiency: 85,
      });
    } else if (normInProgress.has(norm)) {
      skillsImprove.push({
        name: skill,
        category: 'improve',
        priority: 'High',
        proficiency: 45,
      });
    } else {
      skillsLearn.push({
        name: skill,
        category: 'learn',
        priority: 'High',
      });
    }
  }

  // Check recommended skills
  for (const skill of recommendedSkills) {
    const norm = skill.toLowerCase().trim();
    // Don't duplicate if already listed in required
    if (requiredSkills.some((s) => s.toLowerCase().trim() === norm)) continue;

    if (normUser.has(norm)) {
      skillsHave.push({
        name: skill,
        category: 'have',
        priority: 'Medium',
        proficiency: 75,
      });
    } else if (normInProgress.has(norm)) {
      skillsImprove.push({
        name: skill,
        category: 'improve',
        priority: 'Medium',
        proficiency: 40,
      });
    } else {
      skillsLearn.push({
        name: skill,
        category: 'learn',
        priority: 'Medium',
      });
    }
  }

  const total = skillsHave.length + skillsImprove.length + skillsLearn.length || 1;
  const weightedScore = (skillsHave.length * 1.0 + skillsImprove.length * 0.5) / total;
  const overallReadiness = Math.round(weightedScore * 100);

  let nextPriorityAction = 'Focus on foundational required skills first.';
  if (skillsImprove.length > 0) {
    nextPriorityAction = `Continue active practice in ${skillsImprove[0].name} to bring it to mastery level.`;
  } else if (skillsLearn.length > 0) {
    nextPriorityAction = `Begin learning ${skillsLearn[0].name} through recommended guided courses.`;
  } else {
    nextPriorityAction = 'You have strong readiness for this career path! Start building capstone portfolio projects.';
  }

  return {
    targetCareerId,
    targetCareerTitle,
    skillsHave,
    skillsImprove,
    skillsLearn,
    overallReadiness,
    nextPriorityAction,
  };
}
