import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

export default function RegisterSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 text-center">
        {/* Brand Header */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center text-white">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Skill2Career</span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Your Account
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Choose how you want to use Skill2Career to get customized career guidance and roadmap recommendations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {/* Student Card */}
          <div className="bg-slate-50 border-2 border-slate-200 hover:border-sky-500 rounded-2xl p-6 flex flex-col justify-between text-left transition-all group hover:shadow-lg">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Register as a Student
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Explore careers, build skills, prepare for internships, and plan your future college-to-corporate journey.
              </p>
            </div>

            <div className="pt-6 mt-4">
              <button
                onClick={() => navigate('/register/student')}
                className="w-full py-3 rounded-xl font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
              >
                Continue as Student <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Professional Card */}
          <div className="bg-slate-50 border-2 border-slate-200 hover:border-sky-500 rounded-2xl p-6 flex flex-col justify-between text-left transition-all group hover:shadow-lg">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Briefcase className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Register as a Professional
              </h2>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Upgrade your skills, explore new opportunities, pivot specializations, and advance your career.
              </p>
            </div>

            <div className="pt-6 mt-4">
              <button
                onClick={() => navigate('/register/professional')}
                className="w-full py-3 rounded-xl font-bold text-sky-700 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 shadow-xs transition-all flex items-center justify-center gap-2 text-sm"
              >
                Continue as Professional <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
