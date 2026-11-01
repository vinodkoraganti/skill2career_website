import assert from 'node:assert';

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🧪 Starting Skill2Career Backend & Database Verification...\n');
  let passCount = 0;
  let failCount = 0;

  async function test(name: string, fn: () => Promise<void>) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passCount++;
    } catch (err: any) {
      console.error(`  ❌ FAIL: ${name} ->`, err.message);
      failCount++;
    }
  }

  // 1. Careers
  await test('GET /api/careers returns list of careers', async () => {
    const res = await fetch(`${BASE_URL}/api/careers`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert(Array.isArray(data));
    assert(data.length >= 5);
    assert(data.some((c: any) => c.id === 'career-aiml'));
  });

  await test('GET /api/careers/:id returns career detail', async () => {
    const res = await fetch(`${BASE_URL}/api/careers/career-aiml`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.id, 'career-aiml');
    assert.strictEqual(data.title, 'AI/ML Engineer');
  });

  // 2. Auth: Login with Vinod, Kumar, Admin
  let vinodToken = '';
  await test('POST /api/auth/login for Vinod (Student)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'vinod@example.com' }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.email, 'vinod@example.com');
    assert.strictEqual(data.user.accountType, 'student');
    vinodToken = data.token;
  });

  let kumarToken = '';
  await test('POST /api/auth/login for Kumar (Professional)', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'kumar@example.com' }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.email, 'kumar@example.com');
    assert.strictEqual(data.user.accountType, 'professional');
    kumarToken = data.token;
  });

  let adminToken = '';
  await test('POST /api/auth/login for Admin', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@skill2career.com' }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.role, 'admin');
    adminToken = data.token;
  });

  await test('POST /api/auth/login rejects non-existent user', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nonexistent@example.com' }),
    });
    assert.strictEqual(res.status, 401);
  });

  // 3. User Me & Update Profile
  await test('GET /api/auth/me returns authenticated user', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.uid, vinodToken);
  });

  await test('PUT /api/profile/update updates user details', async () => {
    const res = await fetch(`${BASE_URL}/api/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({
        displayName: 'Vinod Kumar Updated',
        details: { college: 'Vignan University Tech Campus' },
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.user.displayName, 'Vinod Kumar Updated');
    assert.strictEqual(data.user.details.college, 'Vignan University Tech Campus');
  });

  // 4. Registration flow
  const testRegEmail = `testuser_${Date.now()}@example.com`;
  await test('POST /api/auth/register registers new user and prevents duplicate', async () => {
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Candidate',
        email: testRegEmail,
        password: 'password123',
        accountType: 'student',
        college: 'IIT Madras',
        degree: 'B.Tech',
        branch: 'CSE',
        skills: 'Python, SQL, React',
      }),
    });
    assert.strictEqual(regRes.status, 201);
    const regData = await regRes.json();
    assert.strictEqual(regData.user.email, testRegEmail);

    // Duplicate test
    const dupRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Duplicate',
        email: testRegEmail,
        password: 'password123',
        accountType: 'student',
      }),
    });
    assert.strictEqual(dupRes.status, 400);
  });

  // 5. Recommended Careers
  await test('GET /api/careers/recommend generates matching scores', async () => {
    const res = await fetch(`${BASE_URL}/api/careers/recommend`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert(Array.isArray(data));
    assert(data.length > 0);
    assert(typeof data[0].matchScore === 'number');
  });

  // 6. Courses & Course Saving
  await test('GET /api/courses supports filtering & search', async () => {
    const res = await fetch(`${BASE_URL}/api/courses?search=Python`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert(Array.isArray(data));
    assert(data.length > 0);
    assert(data.every((c: any) => c.title.toLowerCase().includes('python') || c.description.toLowerCase().includes('python') || c.skills.some((s: string) => s.toLowerCase().includes('python'))));
  });

  await test('POST /api/courses/save and unsave', async () => {
    const saveRes = await fetch(`${BASE_URL}/api/courses/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({ courseId: 'course-python-ds' }),
    });
    assert.strictEqual(saveRes.status, 200);
    const saveData = await saveRes.json();
    assert(saveData.saved.includes('course-python-ds'));

    const unsaveRes = await fetch(`${BASE_URL}/api/courses/unsave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({ courseId: 'course-python-ds' }),
    });
    assert.strictEqual(unsaveRes.status, 200);
    const unsaveData = await unsaveRes.json();
    assert(!unsaveData.saved.includes('course-python-ds'));
  });

  // 7. Jobs & Job Saving
  await test('GET /api/jobs supports location and workMode filtering', async () => {
    const res = await fetch(`${BASE_URL}/api/jobs?location=Bangalore`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert(Array.isArray(data));
  });

  await test('POST /api/jobs/save and unsave', async () => {
    const saveRes = await fetch(`${BASE_URL}/api/jobs/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({ jobId: 'job-microsoft-cloud' }),
    });
    assert.strictEqual(saveRes.status, 200);

    const savedItemsRes = await fetch(`${BASE_URL}/api/saved-items`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(savedItemsRes.status, 200);
    const savedData = await savedItemsRes.json();
    assert(savedData.savedJobs.some((j: any) => j.id === 'job-microsoft-cloud'));

    const unsaveRes = await fetch(`${BASE_URL}/api/jobs/unsave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({ jobId: 'job-microsoft-cloud' }),
    });
    assert.strictEqual(unsaveRes.status, 200);
  });

  // 8. Skill Gap Analysis
  await test('GET /api/skill-gap returns structured skill gap breakdown', async () => {
    const res = await fetch(`${BASE_URL}/api/skill-gap?careerId=career-aiml`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.targetCareerId, 'career-aiml');
    assert(Array.isArray(data.skillsHave));
    assert(Array.isArray(data.skillsLearn));
  });

  // 9. Roadmaps & Task Toggling
  await test('GET /api/roadmaps/current and POST /api/roadmaps/task-toggle', async () => {
    const res = await fetch(`${BASE_URL}/api/roadmaps/current`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(res.status, 200);
    const roadmap = await res.json();
    assert(roadmap.stages.length > 0);
    const firstTaskId = roadmap.stages[0].tasks[0].id;

    // Toggle task
    const toggleRes = await fetch(`${BASE_URL}/api/roadmaps/task-toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({ taskId: firstTaskId }),
    });
    assert.strictEqual(toggleRes.status, 200);
    const toggleData = await toggleRes.json();
    assert.strictEqual(toggleData.success, true);
  });

  // 10. Quizzes, Question Masking & Pure Server-side Grading
  await test('GET /api/quizzes/:id masks correct answers to avoid client cheating', async () => {
    const res = await fetch(`${BASE_URL}/api/quizzes/quiz-python-basics`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.quiz.id, 'quiz-python-basics');
    assert(data.questions.length > 0);
    // Ensure correctAnswer is NOT exposed
    assert.strictEqual(data.questions[0].correctAnswer, undefined);
  });

  await test('POST /api/quizzes/:id/submit grades and records attempt', async () => {
    const res = await fetch(`${BASE_URL}/api/quizzes/quiz-python-basics/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({
        answers: {
          'py-1': 1,
          'py-2': 1,
          'py-3': 1,
          'py-4': 1,
          'py-5': 2,
        },
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(typeof data.result.score, 'number');
    assert.strictEqual(data.attempt.quizId, 'quiz-python-basics');
  });

  await test('GET /api/quizzes/my-attempts returns user attempts', async () => {
    const res = await fetch(`${BASE_URL}/api/quizzes/my-attempts`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(res.status, 200);
    const attempts = await res.json();
    assert(Array.isArray(attempts));
    assert(attempts.length > 0);
  });

  // 11. Progress Tracking
  await test('GET /api/progress aggregates completion & task metrics', async () => {
    const res = await fetch(`${BASE_URL}/api/progress`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(res.status, 200);
    const progress = await res.json();
    assert(typeof progress.roadmapProgress === 'number');
    assert(typeof progress.completedTasksCount === 'number');
  });

  // 12. AI Resume Analysis
  await test('POST /api/ai/resume-analysis evaluates resume text and persists result', async () => {
    const sampleResume = `
      Vinod Kumar
      B.Tech Computer Science and Engineering, Vignan University
      Skills: Python, Machine Learning, SQL, Docker, React, Deep Learning
      Built AI churn predictor and web apps.
    `;
    const res = await fetch(`${BASE_URL}/api/ai/resume-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vinodToken}`,
      },
      body: JSON.stringify({
        resumeText: sampleResume,
        fileName: 'Vinod_Resume_Test.txt',
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert(data.analysis.atsScore >= 70);
    assert(data.analysis.extractedSkills.length > 0);

    const getRes = await fetch(`${BASE_URL}/api/ai/resume-analyses`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(getRes.status, 200);
    const analyses = await getRes.json();
    assert(analyses.some((a: any) => a.id === data.analysis.id));

    // Delete analysis test
    const delRes = await fetch(`${BASE_URL}/api/ai/resume-analyses/${data.analysis.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(delRes.status, 200);
  });

  // 13. Admin Operations & RBAC
  await test('GET /api/admin/stats is forbidden for non-admin user', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${vinodToken}` },
    });
    assert.strictEqual(res.status, 403);
  });

  await test('GET /api/admin/stats succeeds for Admin', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert.strictEqual(res.status, 200);
    const stats = await res.json();
    assert(typeof stats.totalUsers === 'number');
    assert(typeof stats.totalCourses === 'number');
  });

  await test('Admin course CRUD operations', async () => {
    // Create course
    const createRes = await fetch(`${BASE_URL}/api/admin/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Advanced PyTorch Systems',
        provider: 'Skill2Career Academy',
        courseUrl: 'https://example.com/pytorch',
        category: 'AI/ML',
        skills: ['PyTorch', 'Distributed Training'],
      }),
    });
    assert.strictEqual(createRes.status, 201);
    const created = await createRes.json();
    const courseId = created.course.id;

    // Update course
    const updateRes = await fetch(`${BASE_URL}/api/admin/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ level: 'Advanced' }),
    });
    assert.strictEqual(updateRes.status, 200);

    // Delete course
    const delRes = await fetch(`${BASE_URL}/api/admin/courses/${courseId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    assert.strictEqual(delRes.status, 200);
  });

  console.log(`\n========================================`);
  console.log(`Total tests: ${passCount + failCount}`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`========================================\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
