import React, { useState, useEffect } from 'react';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  BookOpen,
  Briefcase,
  Users,
  Search,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Course, Job } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';

export default function AdminPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'jobs' | 'stats'>('courses');
  const [loading, setLoading] = useState(true);

  // Course Modal state
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    provider: 'Coursera',
    courseUrl: '',
    category: 'Data Science',
    skills: 'Python, SQL',
    level: 'Intermediate',
    duration: '4 weeks',
    language: 'English',
    priceType: 'Free',
    priceDescription: '₹0 (Free)',
    certificateAvailable: true,
    featured: false,
    published: true,
  });

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotify = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadAll = async () => {
    try {
      const [coList, jList, st] = await Promise.all([
        api.getCourses(),
        api.getJobs(),
        api.getAdminStats(),
      ]);
      setCourses(coList);
      setJobs(jList);
      setStats(st);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleOpenAddCourse = () => {
    setEditingCourseId(null);
    setCourseForm({
      title: '',
      description: '',
      provider: 'Coursera',
      courseUrl: '',
      category: 'Data Science',
      skills: 'Python, Machine Learning',
      level: 'Intermediate',
      duration: '6 weeks',
      language: 'English',
      priceType: 'Free',
      priceDescription: '₹0 (Free Audit)',
      certificateAvailable: true,
      featured: false,
      published: true,
    });
    setShowCourseModal(true);
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      description: course.description,
      provider: course.provider,
      courseUrl: course.courseUrl,
      category: course.category,
      skills: course.skills.join(', '),
      level: course.level,
      duration: course.duration,
      language: course.language,
      priceType: course.priceType,
      priceDescription: course.priceDescription,
      certificateAvailable: course.certificateAvailable,
      featured: course.featured,
      published: course.published,
    });
    setShowCourseModal(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title || !courseForm.courseUrl) {
      showNotify('error', 'Title and Course URL are required');
      return;
    }

    try {
      if (editingCourseId) {
        await api.updateCourse(editingCourseId, courseForm);
        showNotify('success', 'Course updated successfully!');
      } else {
        await api.createCourse(courseForm);
        showNotify('success', 'New course created and published successfully!');
      }
      setShowCourseModal(false);
      loadAll();
    } catch (err: any) {
      showNotify('error', err.message || 'Operation failed');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course from the catalog?')) {
      try {
        await api.deleteCourse(id);
        showNotify('success', 'Course deleted successfully');
        loadAll();
      } catch (err: any) {
        showNotify('error', err.message || 'Failed to delete course');
      }
    }
  };

  const handleTogglePublishCourse = async (course: Course) => {
    try {
      await api.updateCourse(course.id, { published: !course.published });
      showNotify('success', `Course marked as ${!course.published ? 'Published' : 'Draft'}`);
      loadAll();
    } catch (err: any) {
      showNotify('error', err.message);
    }
  };

  const handleToggleFeaturedCourse = async (course: Course) => {
    try {
      await api.updateCourse(course.id, { featured: !course.featured });
      showNotify('success', `Course featured status toggled`);
      loadAll();
    } catch (err: any) {
      showNotify('error', err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Administrator Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
              Admin Privileged
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage course catalog, job postings, career trajectories, and platform metrics.
          </p>
        </div>

        <button
          onClick={handleOpenAddCourse}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <XCircle className="w-4 h-4 text-rose-600" />
          )}
          {notification.message}
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'courses'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Manage Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'jobs'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Manage Jobs ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'stats'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Platform Analytics
        </button>
      </div>

      {/* Tab: Courses Management matching Section 15 */}
      {activeTab === 'courses' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm">
              Course Catalog Database (Firestore `courses` Collection)
            </h2>
            <span className="text-xs text-slate-400">
              Changes reflect immediately on public and dashboard views
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Course Title & Provider</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{course.title}</p>
                      <p className="text-[11px] text-sky-600">{course.provider}</p>
                    </td>
                    <td className="p-4 text-slate-600">{course.category}</td>
                    <td className="p-4 text-slate-600">{course.level}</td>
                    <td className="p-4 font-bold text-slate-800">{course.priceDescription}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleTogglePublishCourse(course)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            course.published
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {course.published ? 'Published' : 'Draft'}
                        </button>
                        <button
                          onClick={() => handleToggleFeaturedCourse(course)}
                          className={`p-1 rounded-md ${
                            course.featured ? 'text-amber-500' : 'text-slate-300 hover:text-slate-400'
                          }`}
                          title="Toggle Featured on Homepage"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditCourse(course)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="Edit Course"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                        title="Delete Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Jobs Management */}
      {activeTab === 'jobs' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm">
              Jobs & Internships Database (Firestore `jobs` Collection)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Title & Company</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70">
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{job.title}</p>
                      <p className="text-[11px] text-slate-500">{job.company}</p>
                    </td>
                    <td className="p-4 text-slate-600">{job.location}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                        {job.employmentType}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{job.applicationDeadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Stats */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <Users className="w-8 h-8 text-sky-600 mb-2" />
            <span className="text-xs font-semibold text-slate-400">Total Users</span>
            <p className="text-2xl font-black text-slate-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <BookOpen className="w-8 h-8 text-emerald-600 mb-2" />
            <span className="text-xs font-semibold text-slate-400">Active Courses</span>
            <p className="text-2xl font-black text-slate-900">{stats.totalCourses}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <Briefcase className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-xs font-semibold text-slate-400">Job Opportunities</span>
            <p className="text-2xl font-black text-slate-900">{stats.totalJobs}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <Shield className="w-8 h-8 text-amber-600 mb-2" />
            <span className="text-xs font-semibold text-slate-400">Total Quizzes</span>
            <p className="text-2xl font-black text-slate-900">{stats.totalQuizzes}</p>
          </div>
        </div>
      )}

      {/* Add / Edit Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {editingCourseId ? 'Edit Course Record' : 'Add Course to Catalog'}
              </h2>
              <button
                onClick={() => setShowCourseModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="e.g. Deep Learning Specialization"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Provider *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.provider}
                    onChange={(e) => setCourseForm({ ...courseForm, provider: e.target.value })}
                    placeholder="e.g. Coursera, Udemy"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Web Development">Web Development</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  External Course URL * (Must be valid link)
                </label>
                <input
                  type="url"
                  required
                  value={courseForm.courseUrl}
                  onChange={(e) => setCourseForm({ ...courseForm, courseUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Skills Taught (comma-separated)
                </label>
                <input
                  type="text"
                  value={courseForm.skills}
                  onChange={(e) => setCourseForm({ ...courseForm, skills: e.target.value })}
                  placeholder="Python, PyTorch, Neural Networks"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    placeholder="e.g. 6 weeks"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price Description
                  </label>
                  <input
                    type="text"
                    value={courseForm.priceDescription}
                    onChange={(e) => setCourseForm({ ...courseForm, priceDescription: e.target.value })}
                    placeholder="e.g. ₹0 (Free Audit)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={courseForm.published}
                      onChange={(e) => setCourseForm({ ...courseForm, published: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    Published
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={courseForm.featured}
                      onChange={(e) => setCourseForm({ ...courseForm, featured: e.target.checked })}
                      className="rounded text-sky-600"
                    />
                    Featured
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  placeholder="Comprehensive description of curriculum..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs"
                >
                  {editingCourseId ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
