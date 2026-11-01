import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCareerMatch, rankCareersForUser, CareerDef } from './careerMatcher.ts';
import { analyzeSkillGaps } from './skillGap.ts';
import { gradeQuiz, QuizQuestion } from './quizGrader.ts';
import { calculateRoadmapProgress, RoadmapStage } from './progressCalc.ts';

test('career match gives high score when user has required skills', () => {
  const sampleCareer: CareerDef = {
    id: 'c1',
    title: 'AI/ML Engineer',
    slug: 'ai-ml-engineer',
    description: 'Build AI models',
    category: 'Data Science & AI',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    recommendedSkills: ['Deep Learning', 'MLOps'],
    published: true,
  };

  const userSkills = ['Python', 'Machine Learning', 'Statistics', 'SQL'];
  const res = calculateCareerMatch(sampleCareer, userSkills, ['Data Science & AI']);
  assert.ok(res.matchScore >= 80, `Expected score >= 80, got ${res.matchScore}`);
  assert.equal(res.matchLevel, 'High match');
  assert.equal(res.matchingSkills.length, 4);
  assert.equal(res.missingSkills.length, 0);
});

test('career match correctly identifies missing skills', () => {
  const sampleCareer: CareerDef = {
    id: 'c2',
    title: 'Cloud Engineer',
    slug: 'cloud-engineer',
    description: 'Manage cloud systems',
    category: 'Cloud Computing',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Linux'],
    recommendedSkills: ['Terraform'],
    published: true,
  };

  const userSkills = ['Linux'];
  const res = calculateCareerMatch(sampleCareer, userSkills);
  assert.ok(res.matchScore < 60);
  assert.ok(res.missingSkills.includes('AWS'));
  assert.ok(res.missingSkills.includes('Docker'));
  assert.ok(res.matchingSkills.includes('Linux'));
});

test('rankCareersForUser sorts best matches first', () => {
  const careers: CareerDef[] = [
    {
      id: 'c1',
      title: 'Frontend Developer',
      slug: 'frontend-dev',
      description: 'Web UI',
      category: 'Web',
      requiredSkills: ['React', 'TypeScript', 'CSS'],
      recommendedSkills: ['Tailwind'],
      published: true,
    },
    {
      id: 'c2',
      title: 'DevOps Engineer',
      slug: 'devops-engineer',
      description: 'CI/CD and infra',
      category: 'DevOps',
      requiredSkills: ['Kubernetes', 'Terraform', 'CI/CD'],
      recommendedSkills: [],
      published: true,
    },
  ];

  const ranked = rankCareersForUser(careers, ['React', 'TypeScript', 'CSS', 'Tailwind']);
  assert.equal(ranked[0].career.id, 'c1');
  assert.ok(ranked[0].matchScore > ranked[1].matchScore);
});

test('analyzeSkillGaps categorizes skills into have, improve, and learn', () => {
  const res = analyzeSkillGaps(
    'AI/ML Engineer',
    'c1',
    ['Python', 'Machine Learning', 'SQL'],
    ['Deep Learning', 'MLOps'],
    ['Python', 'SQL'],
    ['Machine Learning']
  );

  assert.equal(res.skillsHave.length, 2); // Python, SQL
  assert.equal(res.skillsImprove.length, 1); // Machine Learning
  assert.equal(res.skillsLearn.length, 2); // Deep Learning, MLOps
  assert.ok(res.overallReadiness > 0 && res.overallReadiness <= 100);
});

test('gradeQuiz calculates score accurately and provides breakdown', () => {
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'What is Python?',
      options: ['Snake', 'Language', 'Fruit', 'Car'],
      correctAnswer: 1,
      explanation: 'Python is a high-level programming language.',
    },
    {
      id: 'q2',
      question: 'Which keyword defines a function?',
      options: ['func', 'def', 'function', 'fn'],
      correctAnswer: 1,
      explanation: 'def is used in Python.',
    },
  ];

  const submission = { q1: 1, q2: 0 }; // q1 correct, q2 wrong
  const result = gradeQuiz(questions, submission, 'python-basics');
  assert.equal(result.score, 1);
  assert.equal(result.totalQuestions, 2);
  assert.equal(result.percentage, 50);
  assert.equal(result.passed, false);
  assert.equal(result.breakdown[0].isCorrect, true);
  assert.equal(result.breakdown[1].isCorrect, false);
});

test('calculateRoadmapProgress computes accurate percentage and stage metrics', () => {
  const stages: RoadmapStage[] = [
    {
      id: 's1',
      number: 1,
      title: 'Foundations',
      subtitle: 'Basics',
      tasks: [
        { id: 't1', title: 'Task 1', stageIndex: 0, status: 'completed' },
        { id: 't2', title: 'Task 2', stageIndex: 0, status: 'completed' },
      ],
    },
    {
      id: 's2',
      number: 2,
      title: 'Core Skills',
      subtitle: 'Intermediate',
      tasks: [
        { id: 't3', title: 'Task 3', stageIndex: 1, status: 'in_progress' },
        { id: 't4', title: 'Task 4', stageIndex: 1, status: 'not_started' },
      ],
    },
  ];

  const progress = calculateRoadmapProgress(stages);
  assert.equal(progress.totalTasksCount, 4);
  assert.equal(progress.completedTasksCount, 2);
  assert.equal(progress.inProgressTasksCount, 1);
  assert.equal(progress.roadmapProgress, 50);
  assert.equal(progress.stageProgress[0].percentage, 100);
  assert.equal(progress.stageProgress[1].percentage, 0);
});
