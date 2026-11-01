import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Bookmark, BookmarkCheck, ExternalLink, Building2 } from 'lucide-react';
import { api } from '../services/api.ts';
import { Job } from '../types/index.ts';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [workMode, setWorkMode] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobList, saved] = await Promise.all([
          api.getJobs({
            search,
            location: location !== 'All Locations' ? location : undefined,
            workMode: workMode !== 'All' ? workMode : undefined,
          }),
          api.getSavedItems(),
        ]);
        setJobs(jobList);
        setSavedJobIds(new Set(saved.savedJobs.map((j) => j.id)));
      } catch (err) {
        console.error('Failed to load jobs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, location, workMode]);

  const handleToggleSave = async (jobId: string) => {
    const isSaved = savedJobIds.has(jobId);
    const updated = new Set(savedJobIds);
    if (isSaved) {
      updated.delete(jobId);
      setSavedJobIds(updated);
      await api.unsaveJob(jobId);
    } else {
      updated.add(jobId);
      setSavedJobIds(updated);
      await api.saveJob(jobId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Jobs & Internships
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Find the right opportunities to launch or grow your career with verified employers.
        </p>
      </div>

      {/* Filter Bar matching Screen 13 */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, internships, skills..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          {/* Location Dropdown */}
          <div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
            >
              <option value="All Locations">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore / Bengaluru</option>
              <option value="Gurugram">Gurugram / NCR</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Work Mode Dropdown */}
          <div>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 bg-white"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards matching Screen 13 */}
      {jobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No vacancies match your filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try broadening your search query or location.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => {
            const isSaved = savedJobIds.has(job.id);
            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-sky-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">
                      {job.title}
                    </h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                      {job.employmentType}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {job.workMode}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">Exp: {job.experienceLevel}</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Required Skill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side buttons */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleSave(job.id)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isSaved
                        ? 'bg-sky-50 border-sky-300 text-sky-600'
                        : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                    title={isSaved ? 'Unsave job' : 'Save job'}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-5 h-5 text-sky-600" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>

                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-all flex items-center gap-1.5"
                  >
                    Apply Now <ExternalLink className="w-3.5 h-3.5" />
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
