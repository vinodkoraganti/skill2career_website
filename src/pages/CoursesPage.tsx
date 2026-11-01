import React, { useState, useEffect } from 'react';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  GraduationCap,
  Clock,
  Award,
  Filter,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Course } from '../types/index.ts';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Domains');
  const [level, setLevel] = useState('All Difficulty');
  const [provider, setProvider] = useState('All Providers');
  const [freeOnly, setFreeOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [courseList, saved] = await Promise.all([
          api.getCourses({
            search,
            category: category !== 'All Domains' ? category : undefined,
            level: level !== 'All Difficulty' ? level : undefined,
            provider: provider !== 'All Providers' ? provider : undefined,
            freeOnly,
          }),
          api.getSavedItems(),
        ]);
        setCourses(courseList);
        setSavedCourseIds(new Set(saved.savedCourses.map((c) => c.id)));
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, category, level, provider, freeOnly]);

  const handleToggleSave = async (courseId: string) => {
    const isSaved = savedCourseIds.has(courseId);
    const updated = new Set(savedCourseIds);
    if (isSaved) {
      updated.delete(courseId);
      setSavedCourseIds(updated);
      await api.unsaveCourse(courseId);
    } else {
      updated.add(courseId);
      setSavedCourseIds(updated);
      await api.saveCourse(courseId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Courses & Certifications
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Learn from the best platforms and build your skills.
        </p>
      </div>

      {/* Filter Bar matching Screen 12 */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for courses..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Domain Dropdown */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
            >
              <option value="All Domains">All Domains</option>
              <option value="Data Science">Data Science</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Cloud">Cloud & Infra</option>
              <option value="Web Development">Web Development</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
            >
              <option value="All Difficulty">All Difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Provider Dropdown */}
          <div>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
            >
              <option value="All Providers">All Providers</option>
              <option value="Coursera">Coursera</option>
              <option value="Udemy">Udemy</option>
              <option value="freeCodeCamp">freeCodeCamp</option>
            </select>
          </div>
        </div>

        {/* Free Only Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
            />
            Free courses only (Audit / 100% Free)
          </label>
          <span className="text-slate-400">
            Showing {courses.length} verified courses
          </span>
        </div>
      </div>

      {/* Courses List matching Cards in Screen 12 */}
      {courses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No courses match your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting filters to view all courses.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => {
            const isSaved = savedCourseIds.has(course.id);
            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-sky-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Left side info matching Screen 12 */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white font-extrabold flex items-center justify-center shrink-0 shadow-xs">
                    <GraduationCap className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">
                        {course.title}
                      </h3>
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                        {course.provider}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                        {course.level}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" /> {course.duration}
                      </span>
                      <span>•</span>
                      <span className="font-bold text-emerald-700 text-xs">
                        {course.priceDescription}
                      </span>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side Actions */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleSave(course.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isSaved
                        ? 'bg-sky-50 border-sky-300 text-sky-600'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                    title={isSaved ? 'Unsave course' : 'Save course'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-sky-600" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>

                  <a
                    href={course.courseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    View Course <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
