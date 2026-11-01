import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import Navbar from './components/layout/Navbar.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import Footer from './components/layout/Footer.tsx';

// Public Pages
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import RegisterSelect from './pages/RegisterSelect.tsx';
import RegisterStudent from './pages/RegisterStudent.tsx';
import RegisterProfessional from './pages/RegisterProfessional.tsx';
import CareersPage from './pages/CareersPage.tsx';
import CareerDetailsPage from './pages/CareerDetailsPage.tsx';
import CoursesPage from './pages/CoursesPage.tsx';
import JobsPage from './pages/JobsPage.tsx';
import { AboutPage, ContactPage, PrivacyPage, TermsPage, ForgotPasswordPage } from './pages/StaticPages.tsx';

// Authenticated Pages
import Dashboard from './pages/Dashboard.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import SkillGapPage from './pages/SkillGapPage.tsx';
import RoadmapPage from './pages/RoadmapPage.tsx';
import QuizzesPage from './pages/QuizzesPage.tsx';
import ProgressPage from './pages/ProgressPage.tsx';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage.tsx';
import CareerRecommendationsPage from './pages/CareerRecommendationsPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import ArchitecturePage from './pages/ArchitecturePage.tsx';

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();

  const isAuthPage =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/forgot-password');

  const isDashboardRoute =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/skill-gap') ||
    location.pathname.startsWith('/roadmap') ||
    location.pathname.startsWith('/assessments') ||
    location.pathname.startsWith('/progress') ||
    location.pathname.startsWith('/resume-analysis') ||
    location.pathname.startsWith('/career-recommendations') ||
    location.pathname.startsWith('/settings') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/my-courses') ||
    location.pathname.startsWith('/saved-jobs') ||
    location.pathname.startsWith('/saved-courses');

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  if (isDashboardRoute) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <Navbar />
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="p-12 text-center text-slate-400 text-xs">
        Verifying session...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers/:careerId" element={<CareerDetailsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CoursesPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:jobId" element={<JobsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterSelect />} />
            <Route path="/register/student" element={<RegisterStudent />} />
            <Route path="/register/professional" element={<RegisterProfessional />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Authenticated User Routes */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/skill-gap"
              element={
                <RequireAuth>
                  <SkillGapPage />
                </RequireAuth>
              }
            />
            <Route
              path="/roadmap"
              element={
                <RequireAuth>
                  <RoadmapPage />
                </RequireAuth>
              }
            />
            <Route
              path="/resume-analysis"
              element={
                <RequireAuth>
                  <ResumeAnalysisPage />
                </RequireAuth>
              }
            />
            <Route
              path="/career-recommendations"
              element={
                <RequireAuth>
                  <CareerRecommendationsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/assessments"
              element={
                <RequireAuth>
                  <QuizzesPage />
                </RequireAuth>
              }
            />
            <Route
              path="/progress"
              element={
                <RequireAuth>
                  <ProgressPage />
                </RequireAuth>
              }
            />
            <Route
              path="/settings"
              element={
                <RequireAuth>
                  <SettingsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/my-courses"
              element={
                <RequireAuth>
                  <CoursesPage />
                </RequireAuth>
              }
            />
            <Route
              path="/saved-courses"
              element={
                <RequireAuth>
                  <CoursesPage />
                </RequireAuth>
              }
            />
            <Route
              path="/jobs-and-internships"
              element={
                <RequireAuth>
                  <JobsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/saved-jobs"
              element={
                <RequireAuth>
                  <JobsPage />
                </RequireAuth>
              }
            />

            {/* Admin Portal Routes */}
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminPage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/*"
              element={
                <RequireAuth>
                  <AdminPage />
                </RequireAuth>
              }
            />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}
