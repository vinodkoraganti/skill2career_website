import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/70 px-3 py-1 rounded-full">
          About Skill2Career
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Bridging the Gap Between College and Careers
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Skill2Career empowers students, recent graduates, and working professionals to identify suitable career paths, discover missing skills, and follow personalized 4-stage learning roadmaps.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Our Core Mission</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Modern technology changes rapidly. Traditional curriculum struggles to keep pace with industry demands. Skill2Career provides an intelligent, personalized career navigation platform that combines automated algorithmic matching with Gemini 4 Argon cognitive reasoning to deliver clear, practical, and actionable steps toward professional success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-2xl font-black text-sky-600">4-Stage</p>
          <p className="text-xs font-bold text-slate-800">Learning Framework</p>
          <p className="text-[11px] text-slate-500">From Foundations to Career Ready</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-2xl font-black text-emerald-600">100% Free</p>
          <p className="text-xs font-bold text-slate-800">Public Guidance</p>
          <p className="text-[11px] text-slate-500">Accessible for all college students</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <p className="text-2xl font-black text-purple-600">Gemini 4</p>
          <p className="text-xs font-bold text-slate-800">High-Thinking Mode</p>
          <p className="text-[11px] text-slate-500">Deep skill diagnostics</p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact Skill2Career Support
        </h1>
        <p className="text-xs text-slate-500">
          Have questions regarding career roadmaps or catalog partnerships? Reach out to our team.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        {submitted ? (
          <div className="text-center py-8 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900">Message Received</h2>
            <p className="text-xs text-slate-500">Thank you for reaching out. We will respond shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist your learning journey?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>
          Skill2Career respects candidate privacy. We do not sell user personal data. Resumes uploaded for AI analysis are processed exclusively for skill extraction and career matching, and are never made publicly accessible.
        </p>
        <p>
          Private profiles are restricted strictly to authenticated owners and authorized system processes as governed by Firestore security rules.
        </p>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>
          Skill2Career provides educational career guidance, roadmaps, and course recommendations for informational purposes. Recommendations do not represent an absolute guarantee of employment.
        </p>
        <p>
          External course providers (e.g. Coursera, Udemy) maintain their own enrollment policies and pricing.
        </p>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-md mx-auto py-16 px-4 space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Reset Your Password</h1>
        <p className="text-xs text-slate-500">
          Enter your registered email address to receive password reset instructions.
        </p>

        {sent ? (
          <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold space-y-2">
            <p>Password reset link dispatched to {email}.</p>
            <Link to="/login" className="text-sky-600 block underline">Back to Login</Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 text-left"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Send Reset Link
            </button>
            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-sky-600 font-semibold hover:underline">
                Return to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
