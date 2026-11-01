/**
 * Server and client-side shared quiz grading logic
 */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, number>; // questionId -> selectedOption index
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean; // >= 70%
  breakdown: {
    questionId: string;
    question: string;
    selectedAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export function gradeQuiz(
  questions: QuizQuestion[],
  answers: Record<string, number>,
  quizId: string
): QuizResult {
  let score = 0;
  const breakdown = questions.map((q) => {
    const selected = answers[q.id] ?? -1;
    const isCorrect = selected === q.correctAnswer;
    if (isCorrect) {
      score += 1;
    }
    return {
      questionId: q.id,
      question: q.question,
      selectedAnswer: selected,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const passed = percentage >= 70;

  return {
    quizId,
    score,
    totalQuestions,
    percentage,
    passed,
    breakdown,
  };
}
