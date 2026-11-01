# Skill2Career — Complete Full-Stack AI Career Guidance Platform

> **"Your Career Starts with the Right Skills."**

Skill2Career is an AI-powered educational technology platform that helps students, recent graduates, and working professionals identify high-growth career paths, understand their current skills, discover missing skills, follow personalized 4-stage learning roadmaps, find verified courses and certifications, and discover matching jobs and internships.

---

## 🌟 Key Features

1. **AI Resume Analysis (Gemini 4 Argon High-Thinking Mode)**
   - Deep cognitive reasoning parsing candidate resumes.
   - Extracts technical skills, summarizes education/experience, computes ATS match score, and diagnoses missing skills with concrete improvement steps.
2. **Skill-Gap Analysis (Screen 19)**
   - Categorizes skills into 3 distinct visual buckets:
     - 🟢 *Skills You Have*
     - 🟡 *Skills to Improve*
     - 🔴 *Skills to Learn*
   - Real-time overall readiness score calculation.
3. **Personalized 4-Stage Learning Roadmaps (Screen 11)**
   - Stage 1: **Foundations** (basic concepts, syntax, version control)
   - Stage 2: **Core Skills** (frameworks, databases, algorithms)
   - Stage 3: **Advanced Topics** (model architectures, microservices, cloud scaling)
   - Stage 4: **Career Ready** (portfolio, ATS polish, interview prep)
   - Interactive milestone checklist with progress tracking.
4. **Course Catalog & Administrator Management (Screen 12 & Screen 15)**
   - Filter by Domain, Difficulty Level, Provider (Coursera, Udemy, freeCodeCamp), and Free/Paid.
   - Admin portal allowing authorized administrators to add courses, edit, toggle draft/published, mark featured, and delete.
5. **Jobs & Internships Matcher (Screen 13)**
   - Verified listings from Amazon, TCS, Accenture, Microsoft with filters for Location, Work Mode (Remote/Hybrid/Onsite), and Experience.
6. **Technical Quizzes & Assessments (Screen 14)**
   - Real-time testing with server-side score calculation, instant answer review, and attempt history tracking.
7. **Progress Tracking (Screen 15)**
   - Roadmap % calculation, milestone counts, 30-skill breakdown, and recent activity timeline.
8. **Student & Professional Personas (Screen 4 & 5, Screen 6 & 7)**
   - Custom registration and dashboard tailoring for College Students vs Industry Professionals.

---

## 🏗️ Technology Architecture

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router DOM.
- **Backend**: Express TypeScript Full-Stack Server (`server.ts`) with Vite middleware mounted in dev mode.
- **AI Engine**: Google Gen AI SDK (`@google/genai`) using `gemini-4-argon` with `ThinkingLevel.HIGH`.
- **Database & Security**: Cloud Firestore structure with `firestore.rules` and `storage.rules`.

---

## 🚀 Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your `GEMINI_API_KEY`.

### 3. Run Unit Tests (Node Test Runner)
```bash
npx --yes tsx --test src/utils/logic.test.ts
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Instant Demo Accounts

For fast review, use the one-click persona switcher in the top navigation bar or log in with:
- **Student Persona (Rahul Kumar)**: `rahul@example.com` / `Password123!`
- **Professional Persona (Priya Sharma)**: `priya@example.com` / `Password123!`
- **Administrator Persona**: `admin@skill2career.com` / `AdminPassword123!`

---

## 📖 Firebase Setup & Deployment Guide (20 Steps)

1. **Create Firebase Project**: Navigate to the [Firebase Console](https://console.firebase.google.com/) and create a new project named `Skill2Career`.
2. **Register Web App**: Under project settings, register a web application and obtain your client configuration snippet.
3. **Configure Frontend Keys**: Copy the web app configuration into your `.env` (prefixed with `VITE_FIREBASE_`).
4. **Enable Authentication**: In the Firebase Console, go to **Authentication > Sign-in method** and enable **Email/Password**.
5. **Create Cloud Firestore**: Enable Cloud Firestore in production mode.
6. **Enable Firebase Storage**: Enable Cloud Storage for private user resume uploads.
7. **Configure Cloud Functions**: Initialize Firebase Functions with TypeScript runtime (`firebase init functions`).
8. **Configure Gemini API Secret**: Add `GEMINI_API_KEY` to Google Secret Manager / Cloud Functions environment.
9. **Deploy Firestore Rules**: Run `firebase deploy --only firestore:rules` (uses `/firestore.rules`).
10. **Deploy Storage Rules**: Run `firebase deploy --only storage` (uses `/storage.rules`).
11. **Deploy Composite Indexes**: Run `firebase deploy --only firestore:indexes`.
12. **Bootstrap Initial Administrator**: Set `role: "admin"` on your designated administrative UID in Firestore.
13. **Import Seed Catalog**: Run `npx tsx scripts/seed.ts` to populate verified careers, courses, and jobs.
14. **Build Frontend**: Execute `npm run build` to generate the production bundle into `/dist`.
15. **Deploy to Firebase Hosting**: Run `firebase deploy --only hosting`.
16. **Verify Public Routes**: Test `/`, `/careers`, `/courses`, `/jobs`, `/about`.
17. **Verify Student Registration**: Register a student account and confirm profile persistence.
18. **Verify Professional Registration**: Register a professional account and check custom upskilling targets.
19. **Verify AI Resume Review**: Upload a sample resume and confirm Gemini 4 Argon high-thinking output.
20. **Verify Admin Security**: Attempt administrative operations as a standard user to verify that server-side authorization blocks unauthorized writes.
