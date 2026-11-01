export type UserRole = 'user' | 'admin';
export type AccountType = 'student' | 'professional';

export interface UserProfileDetails {
  // Common
  skills: string[];
  interests: string[];
  preferredCareerPaths: string[];
  learningGoals?: string;
  updatedAt: string;

  // Student specific
  college?: string;
  degree?: string;
  branch?: string;
  academicYear?: string;
  graduationYear?: string;

  // Professional specific
  currentRole?: string;
  company?: string;
  industry?: string;
  experienceYears?: string;
  targetRole?: string;
  preferredLocation?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  accountType: AccountType;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
  profileCompleted: boolean;
  accountStatus: 'active' | 'suspended';
  details: UserProfileDetails;
}

export interface Career {
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
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  courseUrl: string;
  thumbnailUrl: string;
  category: string;
  skills: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  language: string;
  priceType: 'Free' | 'Paid';
  priceDescription: string;
  certificateAvailable: boolean;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  workMode: 'Remote' | 'Onsite' | 'Hybrid';
  employmentType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  requiredSkills: string[];
  experienceLevel: string;
  applicationUrl: string;
  source: string;
  applicationDeadline: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: number; // hidden on public reads before submission
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
}

export interface RoadmapTaskItem {
  id: string;
  title: string;
  description: string;
  stageIndex: number;
  status: 'not_started' | 'in_progress' | 'completed';
  estimatedHours?: number;
  recommendedCourseId?: string;
}

export interface RoadmapStageItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  tasks: RoadmapTaskItem[];
}

export interface UserRoadmap {
  id: string;
  userId: string;
  targetCareerId: string;
  targetCareerTitle: string;
  stages: RoadmapStageItem[];
  completionPercentage: number;
  status: 'active' | 'completed';
  updatedAt: string;
}

export interface ResumeAnalysisRecord {
  id: string;
  userId: string;
  fileName: string;
  analyzedAt: string;
  extractedSkills: string[];
  educationSummary: string;
  experienceSummary: string;
  relevantProjectHighlights: string[];
  recommendedCareers: {
    title: string;
    matchScore: number;
    reason: string;
  }[];
  skillGaps: {
    skill: string;
    recommendation: string;
  }[];
  improvementSuggestions: string[];
  atsScore?: number;
}
