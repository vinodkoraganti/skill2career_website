import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Clock,
  Award,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Quiz, QuizAttempt, QuizQuestionItem } from '../types/index.ts';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<QuizAttempt[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Active taking quiz state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionItem[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [qList, attList] = await Promise.all([
          api.getQuizzes(),
          api.getMyQuizAttempts(),
        ]);
        setQuizzes(qList);
        setRecentAttempts(attList);
      } catch (err) {
        console.error('Failed to load quiz data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStartQuiz = async (quiz: Quiz) => {
    setLoading(true);
    try {
      const data = await api.getQuiz(quiz.id);
      setActiveQuiz(data.quiz);
      setQuizQuestions(data.questions);
      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
      setQuizResult(null);
    } catch (err) {
      console.error('Failed to start quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;
    setSubmitting(true);
    try {
      const res = await api.submitQuiz(activeQuiz.id, selectedAnswers);
      setQuizResult(res.result);
      // reload recent attempts
      const attempts = await api.getMyQuizAttempts();
      setRecentAttempts(attempts);
    } catch (err) {
      console.error('Failed to submit quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (activeCategory === 'All') return true;
    return q.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Quizzes & Assessments
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Test your knowledge, identify technical skill gaps, and track your learning progress.
        </p>
      </div>

      {/* If taking a quiz right now: render Quiz Test Runner */}
      {activeQuiz && quizQuestions.length > 0 && !quizResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                {activeQuiz.category} Assessment
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                {activeQuiz.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Exit Quiz
            </button>
          </div>

          {/* Question Counter & Progress */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
            <span>
              {Object.keys(selectedAnswers).length} answered
            </span>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Current Question */}
          {quizQuestions[currentQuestionIndex] && (
            <div className="space-y-5 pt-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {quizQuestions[currentQuestionIndex].question}
              </h3>

              <div className="space-y-2.5">
                {quizQuestions[currentQuestionIndex].options.map((option, optIdx) => {
                  const isSelected =
                    selectedAnswers[quizQuestions[currentQuestionIndex].id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() =>
                        handleSelectOption(quizQuestions[currentQuestionIndex].id, optIdx)
                      }
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-50 border-sky-500 text-sky-900 shadow-xs ring-1 ring-sky-500'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                            isSelected
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>

            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-xs"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 disabled:opacity-50"
              >
                {submitting ? 'Submitting & Grading...' : 'Submit Assessment'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Results Screen */}
      {quizResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white font-extrabold text-2xl shadow-lg ${
                quizResult.passed ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-amber-500 shadow-amber-500/20'
              }`}
            >
              {quizResult.score} / {quizResult.totalQuestions}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {quizResult.passed ? 'Assessment Passed! 🎉' : 'Keep Practicing! 💪'}
            </h2>
            <p className="text-sm text-slate-500">
              You scored <span className="font-bold text-slate-900">{quizResult.percentage}%</span> on {activeQuiz?.title}.
            </p>
          </div>

          {/* Breakdown Review with Explanations */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Question Review & Explanations:</h3>
            {quizResult.breakdown?.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border ${
                  item.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {item.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900">
                      {idx + 1}. {item.question}
                    </p>
                    <p className="text-xs text-slate-600">
                      <span className="font-semibold">Explanation:</span> {item.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                setActiveQuiz(null);
                setQuizResult(null);
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs"
            >
              Return to Quizzes Catalog
            </button>
          </div>
        </div>
      )}

      {/* Main Quizzes Catalog matching Screen 14 */}
      {!activeQuiz && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Categories and Quiz Cards */}
          <div className="lg:col-span-8 space-y-4">
            {/* Category Filter Pills matching Screen 14 */}
            <div className="flex flex-wrap gap-2 pb-2">
              {['All', 'Python', 'DSA', 'Machine Learning', 'Cloud'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quiz Cards */}
            <div className="space-y-3.5">
              {filteredQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-sky-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                      <CheckSquare className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">
                          {quiz.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {quiz.difficulty}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 max-w-md">
                        {quiz.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                        <span>{quiz.questionsCount} Questions</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> ~{quiz.durationMinutes} min
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 shadow-xs transition-all shrink-0 self-start sm:self-center"
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: "Your Recent Results" matching Screen 14 */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs h-fit space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                Your Recent Results
              </h3>
              <Award className="w-4 h-4 text-sky-600" />
            </div>

            {recentAttempts.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No quizzes taken yet. Start a quiz to assess your baseline!
              </p>
            ) : (
              <div className="space-y-3">
                {recentAttempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{attempt.quizTitle}</p>
                      <p className="text-[10px] text-slate-400">
                        {new Date(attempt.submittedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-sm font-extrabold ${
                          attempt.percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {attempt.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
