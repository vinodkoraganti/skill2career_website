import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowRight,
  Trash2,
  TrendingUp,
  BrainCircuit,
  FileCheck,
} from 'lucide-react';
// @ts-ignore
import mammoth from 'mammoth';
import { api } from '../services/api.ts';
import { ResumeAnalysisRecord } from '../types/index.ts';

const SAMPLE_STUDENT_RESUME = `VINOD KUMAR
Email: vinod@example.com | Phone: +91 98765 43210 | LinkedIn: linkedin.com/in/vinodkumar
Education:
B.Tech in Computer Science and Engineering, Vignan University (2022 - 2026) | CGPA: 8.8/10

Technical Skills:
- Languages: Python, Java, C++, SQL, JavaScript
- Frameworks & Libraries: NumPy, Pandas, Scikit-Learn, React, FastAPI
- Tools & Platforms: Git, GitHub, Docker, Linux, VS Code

Projects:
1. Customer Churn Prediction System: Built a predictive model using Scikit-Learn (Random Forest, XGBoost) on 10,000+ subscriber records. Achieved 86% F1-score and deployed an interactive FastAPI inference service.
2. Skill2Career Web Platform: Developed a responsive web app using React, TypeScript, and Tailwind CSS with authenticated REST APIs.
3. DSA Algorithmic Toolkit: Implemented 50+ core data structures and graph algorithms with unit testing.

Certifications:
- Python for Applied Data Science (Coursera)
- Machine Learning Foundations`;

const SAMPLE_PROFESSIONAL_RESUME = `KUMAR
Email: kumar@example.com | Mobile: +91 99887 76655 | Location: Hyderabad, India
Senior Software Developer (3+ Years Experience)

Professional Summary:
Backend Software Engineer with 3 years experience building scalable cloud microservices, containerized deployments, and RESTful APIs using Python, AWS, Docker, and Kubernetes.

Work Experience:
Software Engineer | Tech Solutions Inc. (2023 - Present)
- Architected and deployed microservices on AWS EKS reducing server latency by 28%.
- Wrote Infrastructure-as-Code using Terraform to automate staging and production VPCs.
- Built automated CI/CD pipelines via GitHub Actions cutting release cycle times in half.

Technical Competencies:
- Cloud & DevOps: AWS (EC2, S3, RDS, EKS, CloudFront), Docker, Kubernetes, Terraform, Linux
- Languages & Frameworks: Python, TypeScript, Node.js, Express, PostgreSQL, Redis
- Monitoring: Prometheus, Grafana, Datadog

Education:
B.Tech in Computer Science & Engineering (2019 - 2023)`;

// Helper to extract text from various document formats (.docx, .doc, .txt, .md)
async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'docx') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || '';
  }

  if (ext === 'doc') {
    const arrayBuffer = await file.arrayBuffer();
    // Many modern .doc files are XML/docx format renamed
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      if (result.value && result.value.trim().length > 20) {
        return result.value;
      }
    } catch {
      // Fall through to binary extraction
    }

    // Binary .doc extraction: scan readable printable text sequences
    try {
      const bytes = new Uint8Array(arrayBuffer);
      let text = '';
      for (let i = 0; i < bytes.length; i++) {
        const code = bytes[i];
        if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
          text += String.fromCharCode(code);
        } else if (text.length > 0 && text[text.length - 1] !== ' ') {
          text += ' ';
        }
      }
      const cleaned = text
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();
      if (cleaned.length > 40) {
        return cleaned;
      }
    } catch {
      // Fallback to FileReader
    }
  }

  // Plain text, Markdown, or generic reader
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve((event.target?.result as string) || '');
    reader.onerror = (err) => reject(err);
    reader.readAsText(file);
  });
}

export default function ResumeAnalysisPage() {
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysisRecord | null>(null);
  const [previousAnalyses, setPreviousAnalyses] = useState<ResumeAnalysisRecord[]>([]);
  const [modelBadge, setModelBadge] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnalyses() {
      try {
        const list = await api.getResumeAnalyses();
        setPreviousAnalyses(list);
        if (list.length > 0) {
          setCurrentAnalysis(list[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadAnalyses();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');
    try {
      const extracted = await extractTextFromFile(file);
      if (!extracted.trim()) {
        setError('Could not extract text from this document. Please ensure it contains readable text or paste your resume directly.');
        return;
      }
      setResumeText(extracted);
    } catch (err: any) {
      console.error('File extraction error:', err);
      setError('Unable to read the uploaded document. Please upload a .doc, .docx, or .txt file, or paste your text.');
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setError('Please paste your resume text or upload a document.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await api.analyzeResume(resumeText, fileName || 'Uploaded_Resume.pdf');
      setCurrentAnalysis(res.analysis);
      setModelBadge(res.modelUsed || 'gemini-4-argon (ThinkingLevel.HIGH)');
      const updated = await api.getResumeAnalyses();
      setPreviousAnalyses(updated);
    } catch (err: any) {
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnalysis = async (id: string) => {
    await api.deleteResumeAnalysis(id);
    const updated = previousAnalyses.filter((a) => a.id !== id);
    setPreviousAnalyses(updated);
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(updated[0] || null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            AI Resume Analysis & Reviewer
          </h1>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
            <BrainCircuit className="w-3.5 h-3.5 text-sky-600" />
            Gemini 4 Argon High Thinking Mode
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-1">
          Deep cognitive evaluation powered by Gemini 4 Argon thinking mode to extract competencies, diagnose skill gaps, and optimize for recruiter ATS standards.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {/* Upload & Input Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Submit Your Resume
            </h2>
            <p className="text-xs text-slate-500">
              Paste your resume or upload a document (.doc, .docx, .txt) to test the high-thinking reasoning engine.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setResumeText(SAMPLE_STUDENT_RESUME);
                setFileName('Vinod_Kumar_Resume_Student.txt');
              }}
              className="px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors"
            >
              🎓 Sample: Vinod (Student)
            </button>
            <button
              type="button"
              onClick={() => {
                setResumeText(SAMPLE_PROFESSIONAL_RESUME);
                setFileName('Kumar_Resume_Pro.txt');
              }}
              className="px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-colors"
            >
              💼 Sample: Kumar (Professional)
            </button>
          </div>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="relative">
            <textarea
              rows={7}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste the raw text of your resume here or upload a .doc, .docx, or .txt file..."
              className="w-full p-4 rounded-2xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 leading-relaxed placeholder:font-sans placeholder:text-slate-400"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>{fileName ? `File: ${fileName}` : 'Upload Document (.doc, .docx, .txt)'}</span>
                <input
                  type="file"
                  accept=".doc,.docx,.txt,.md,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Running Gemini 4 Argon High-Thinking Analysis...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze with Gemini 4 Argon
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Results */}
      {currentAnalysis && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-8 animate-in fade-in duration-300">
          {/* Header & ATS Score Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Analysis Completed • {new Date(currentAnalysis.analyzedAt).toLocaleDateString()}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Candidate Evaluation: {currentAnalysis.fileName}
              </h2>
              {modelBadge && (
                <p className="text-xs text-sky-600 font-semibold mt-0.5 flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5" /> Engine: {modelBadge}
                </p>
              )}
            </div>

            {/* ATS Score Gauge */}
            <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white font-black text-xl flex items-center justify-center shadow-xs">
                {currentAnalysis.atsScore || 84}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">ATS Readiness Score</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Strong Keyword Density</p>
              </div>
            </div>
          </div>

          {/* Extracted Skills */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Extracted Technical Competencies:
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentAnalysis.extractedSkills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-sky-50 border border-sky-200 text-sky-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Experience Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Education Summary
              </p>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {currentAnalysis.educationSummary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Experience Overview
              </p>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                {currentAnalysis.experienceSummary}
              </p>
            </div>
          </div>

          {/* Recommended Careers from Resume */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-sky-600" /> Best Matching Career Trajectories:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentAnalysis.recommendedCareers?.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900">{rec.title}</p>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {rec.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Identified Skill Gaps & Concrete Recommendations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Identified Skill Gaps to Bridge:
            </h3>
            <div className="space-y-2">
              {currentAnalysis.skillGaps?.map((gap, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80 flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900">{gap.skill}</p>
                    <p className="text-xs text-slate-600">{gap.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable ATS Resume Improvements */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" /> Actionable Resume Enhancement Suggestions:
            </h3>
            <ul className="space-y-2">
              {currentAnalysis.improvementSuggestions?.map((tip, idx) => (
                <li
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
