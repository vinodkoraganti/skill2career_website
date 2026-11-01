import {
  Career,
  Course,
  Job,
  Quiz,
  QuizQuestionItem,
  QuizAttempt,
  UserProfile,
  UserRoadmap,
  ResumeAnalysisRecord
} from '../types/index.ts';
import { MatchResult } from '../utils/careerMatcher.ts';
import { SkillGapAnalysisResult } from '../utils/skillGap.ts';

const TOKEN_KEY = 'skill2career_token';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`;
    try {
      const errData = await response.json();
      if (errData.error) errorMsg = errData.error;
    } catch {
      // ignore JSON parse fail
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export const api = {
  // Auth
  async login(email: string, password?: string): Promise<{ user: UserProfile; token: string }> {
    const res = await request<{ user: UserProfile; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setStoredToken(res.token);
    return res;
  },

  async register(data: any): Promise<{ user: UserProfile; token: string }> {
    const res = await request<{ user: UserProfile; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setStoredToken(res.token);
    return res;
  },

  async getCurrentUser(): Promise<UserProfile> {
    const res = await request<{ user: UserProfile }>('/api/auth/me');
    return res.user;
  },

  async updateProfile(displayName: string, details: any): Promise<{ user: UserProfile }> {
    return request<{ user: UserProfile }>('/api/profile/update', {
      method: 'PUT',
      body: JSON.stringify({ displayName, details }),
    });
  },

  // Careers
  async getCareers(): Promise<Career[]> {
    return request<Career[]>('/api/careers');
  },

  async getCareer(id: string): Promise<Career> {
    return request<Career>(`/api/careers/${id}`);
  },

  async getRecommendedCareers(): Promise<MatchResult[]> {
    return request<MatchResult[]>('/api/careers/recommend');
  },

  // Courses
  async getCourses(filters: { category?: string; level?: string; provider?: string; freeOnly?: boolean; search?: string } = {}): Promise<Course[]> {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.level) params.append('level', filters.level);
    if (filters.provider) params.append('provider', filters.provider);
    if (filters.freeOnly) params.append('freeOnly', 'true');
    if (filters.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return request<Course[]>(`/api/courses${query}`);
  },

  async getCourse(id: string): Promise<Course> {
    return request<Course>(`/api/courses/${id}`);
  },

  async saveCourse(courseId: string): Promise<{ success: boolean; saved: string[] }> {
    return request<{ success: boolean; saved: string[] }>('/api/courses/save', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  },

  async unsaveCourse(courseId: string): Promise<{ success: boolean; saved: string[] }> {
    return request<{ success: boolean; saved: string[] }>('/api/courses/unsave', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  },

  async getSavedItems(): Promise<{ savedCourses: Course[]; savedJobs: Job[] }> {
    return request<{ savedCourses: Course[]; savedJobs: Job[] }>('/api/saved-items');
  },

  // Jobs
  async getJobs(filters: { location?: string; workMode?: string; search?: string } = {}): Promise<Job[]> {
    const params = new URLSearchParams();
    if (filters.location) params.append('location', filters.location);
    if (filters.workMode) params.append('workMode', filters.workMode);
    if (filters.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return request<Job[]>(`/api/jobs${query}`);
  },

  async saveJob(jobId: string): Promise<{ success: boolean; saved: string[] }> {
    return request<{ success: boolean; saved: string[] }>('/api/jobs/save', {
      method: 'POST',
      body: JSON.stringify({ jobId }),
    });
  },

  async unsaveJob(jobId: string): Promise<{ success: boolean; saved: string[] }> {
    return request<{ success: boolean; saved: string[] }>('/api/jobs/unsave', {
      method: 'POST',
      body: JSON.stringify({ jobId }),
    });
  },

  // Skill Gap
  async getSkillGap(careerId?: string): Promise<SkillGapAnalysisResult> {
    const q = careerId ? `?careerId=${careerId}` : '';
    return request<SkillGapAnalysisResult>(`/api/skill-gap${q}`);
  },

  // Roadmap
  async getCurrentRoadmap(): Promise<UserRoadmap> {
    return request<UserRoadmap>('/api/roadmaps/current');
  },

  async toggleRoadmapTask(taskId: string, newStatus?: string): Promise<{ success: boolean; roadmap: UserRoadmap }> {
    return request<{ success: boolean; roadmap: UserRoadmap }>('/api/roadmaps/task-toggle', {
      method: 'POST',
      body: JSON.stringify({ taskId, newStatus }),
    });
  },

  // Quizzes
  async getQuizzes(): Promise<Quiz[]> {
    return request<Quiz[]>('/api/quizzes');
  },

  async getQuiz(id: string): Promise<{ quiz: Quiz; questions: QuizQuestionItem[] }> {
    return request<{ quiz: Quiz; questions: QuizQuestionItem[] }>(`/api/quizzes/${id}`);
  },

  async submitQuiz(id: string, answers: Record<string, number>): Promise<{ result: any; attempt: QuizAttempt }> {
    return request<{ result: any; attempt: QuizAttempt }>(`/api/quizzes/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },

  async getMyQuizAttempts(): Promise<QuizAttempt[]> {
    return request<QuizAttempt[]>('/api/quizzes/my-attempts');
  },

  // Progress
  async getProgress(): Promise<any> {
    return request<any>('/api/progress');
  },

  // Resume Analysis (AI)
  async analyzeResume(resumeText: string, fileName?: string): Promise<{ success: boolean; analysis: ResumeAnalysisRecord; modelUsed?: string }> {
    return request<{ success: boolean; analysis: ResumeAnalysisRecord; modelUsed?: string }>('/api/ai/resume-analysis', {
      method: 'POST',
      body: JSON.stringify({ resumeText, fileName }),
    });
  },

  async getResumeAnalyses(): Promise<ResumeAnalysisRecord[]> {
    return request<ResumeAnalysisRecord[]>('/api/ai/resume-analyses');
  },

  async deleteResumeAnalysis(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/ai/resume-analyses/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin
  async getAdminStats(): Promise<any> {
    return request<any>('/api/admin/stats');
  },

  async createCourse(data: any): Promise<Course> {
    const res = await request<{ success: boolean; course: Course }>('/api/admin/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.course;
  },

  async updateCourse(id: string, data: any): Promise<Course> {
    const res = await request<{ success: boolean; course: Course }>(`/api/admin/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.course;
  },

  async deleteCourse(id: string): Promise<boolean> {
    await request(`/api/admin/courses/${id}`, { method: 'DELETE' });
    return true;
  },

  async createJob(data: any): Promise<Job> {
    const res = await request<{ success: boolean; job: Job }>('/api/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.job;
  },

  async updateJob(id: string, data: any): Promise<Job> {
    const res = await request<{ success: boolean; job: Job }>(`/api/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.job;
  },

  async deleteJob(id: string): Promise<boolean> {
    await request(`/api/admin/jobs/${id}`, { method: 'DELETE' });
    return true;
  },
};
