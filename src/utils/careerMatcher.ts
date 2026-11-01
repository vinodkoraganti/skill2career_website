/**
 * Pure calculation logic for career matching, scoring, and skill analysis
 */

export interface CareerDef {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  requiredSkills: string[];
  recommendedSkills: string[];
  beginnerSkills?: string[];
  advancedSkills?: string[];
  averageSalary?: string;
  growthRate?: string;
  responsibilities?: string[];
  featured?: boolean;
  published?: boolean;
}

export interface MatchResult {
  career: CareerDef;
  matchScore: number; // 0 to 100
  matchLevel: 'High match' | 'Good match' | 'Moderate match';
  matchingSkills: string[];
  missingSkills: string[];
  reasons: string[];
}

export function normalizeSkill(skill: string): string {
  return skill.toLowerCase().trim().replace(/[-_./]/g, ' ');
}

export function calculateCareerMatch(
  career: CareerDef,
  userSkills: string[],
  interests: string[] = []
): MatchResult {
  const normalizedUserSkills = new Set(userSkills.map(normalizeSkill));
  const normalizedInterests = new Set(interests.map(normalizeSkill));

  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of career.requiredSkills) {
    const norm = normalizeSkill(skill);
    // check direct match or substring
    const hasMatch = Array.from(normalizedUserSkills).some(
      (u) => u === norm || u.includes(norm) || norm.includes(u)
    );
    if (hasMatch) {
      matchingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  // Weight required skills 80%, interests & recommended skills 20%
  const totalRequired = career.requiredSkills.length || 1;
  const skillRatio = matchingSkills.length / totalRequired;

  let bonus = 0;
  // Interest bonus
  const normCategory = normalizeSkill(career.category);
  const normTitle = normalizeSkill(career.title);
  for (const interest of normalizedInterests) {
    if (normCategory.includes(interest) || normTitle.includes(interest) || interest.includes(normCategory)) {
      bonus += 15;
      break;
    }
  }

  // Recommended skills bonus
  for (const skill of career.recommendedSkills || []) {
    const norm = normalizeSkill(skill);
    if (Array.from(normalizedUserSkills).some((u) => u === norm || norm.includes(u))) {
      bonus += 5;
    }
  }

  const rawScore = Math.round(skillRatio * 80 + bonus);
  const matchScore = Math.min(100, Math.max(10, rawScore));

  let matchLevel: 'High match' | 'Good match' | 'Moderate match' = 'Moderate match';
  if (matchScore >= 75) {
    matchLevel = 'High match';
  } else if (matchScore >= 50) {
    matchLevel = 'Good match';
  }

  const reasons: string[] = [];
  if (matchingSkills.length > 0) {
    reasons.push(`You already possess ${matchingSkills.length} of ${career.requiredSkills.length} core skills (${matchingSkills.slice(0, 3).join(', ')}).`);
  } else {
    reasons.push(`Great foundational starting point to build in-demand ${career.category} competencies.`);
  }

  if (bonus > 0) {
    reasons.push(`Aligns closely with your specified career interests in ${career.category}.`);
  }

  return {
    career,
    matchScore,
    matchLevel,
    matchingSkills,
    missingSkills,
    reasons,
  };
}

export function rankCareersForUser(
  careers: CareerDef[],
  userSkills: string[],
  interests: string[] = []
): MatchResult[] {
  return careers
    .filter((c) => c.published !== false)
    .map((career) => calculateCareerMatch(career, userSkills, interests))
    .sort((a, b) => b.matchScore - a.matchScore);
}
