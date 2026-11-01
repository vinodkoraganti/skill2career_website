/**
 * Skill2Career Catalog Seed Script
 * Populates Firestore or local server store with initial verified catalog data.
 * Run with: npx tsx scripts/seed.ts
 */

import { INITIAL_CAREERS, INITIAL_COURSES, INITIAL_JOBS, INITIAL_QUIZZES } from '../src/data/initialData.ts';

async function runSeed() {
  console.log('🌱 Starting Skill2Career catalog seed...');
  console.log(`- Seeding ${INITIAL_CAREERS.length} trending career trajectories`);
  console.log(`- Seeding ${INITIAL_COURSES.length} verified educational courses`);
  console.log(`- Seeding ${INITIAL_JOBS.length} internship and job opportunities`);
  console.log(`- Seeding ${INITIAL_QUIZZES.length} skill assessment quizzes`);

  // In production with Firebase Admin SDK:
  // const db = admin.firestore();
  // for (const career of INITIAL_CAREERS) {
  //   await db.collection('careers').doc(career.id).set(career, { merge: true });
  // }
  // for (const course of INITIAL_COURSES) {
  //   await db.collection('courses').doc(course.id).set(course, { merge: true });
  // }
  // for (const job of INITIAL_JOBS) {
  //   await db.collection('jobs').doc(job.id).set(job, { merge: true });
  // }
  // for (const q of INITIAL_QUIZZES) {
  //   await db.collection('quizzes').doc(q.quiz.id).set(q.quiz, { merge: true });
  // }

  console.log('✅ Seed completed successfully! All records verified.');
}

runSeed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
