import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminStudentDetails from "./pages/AdminStudentDetails";
import AdminTeachers from "./pages/AdminTeachers";
import AdminTeacherDetails from "./pages/AdminTeacherDetails";
import AdminDepartments from "./pages/AdminDepartments";
import AdminReports from "./pages/AdminReports";
import AdminSchedule from "./pages/AdminSchedule";
import AdminSettings from "./pages/AdminSettings";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherSchedule from "./pages/TeacherSchedule";
import TeacherAssignments from "./pages/TeacherAssignments";
import TeacherCourses from "./pages/TeacherCourses";
import TeacherMessages from "./pages/TeacherMessages";
import { AnimatePresence } from "framer-motion";
import { UserProvider } from './contexts/UserContext';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Departments from './pages/Departments';
import Analytics from './pages/Analytics';
import PrivateRoute from './components/PrivateRoute';
import AuthDebugger from './components/AuthDebugger';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public routes without sidebar */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />

                {/* Protected routes with sidebar */}
                <Route path="/" element={
                  <div className="flex h-screen bg-gray-100">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto p-8 lg:ml-64">
                      <Outlet />
                    </main>
                  </div>
                }>
                  {/* Student routes */}
                  <Route path="dashboard" element={<PrivateRoute requiredRole="student"><Dashboard /></PrivateRoute>} />
                  <Route path="courses" element={<PrivateRoute requiredRole="student"><Courses /></PrivateRoute>} />
                  <Route path="attendance" element={<PrivateRoute requiredRole="student"><Attendance /></PrivateRoute>} />

                  {/* Common routes */}
                  <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                  {/* Legacy routes - redirect to appropriate dashboard */}
                  <Route path="settings" element={<Navigate to="/admin/settings" replace />} />
                  <Route path="users" element={<Navigate to="/admin/students" replace />} />
                  <Route path="departments" element={<Navigate to="/admin/departments" replace />} />
                  <Route path="analytics" element={<Navigate to="/admin/reports" replace />} />

                  {/* Admin routes */}
                  <Route path="admin" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="admin/dashboard" element={<PrivateRoute requiredRole="admin"><AdminDashboard /></PrivateRoute>} />
                  <Route path="admin/students" element={<PrivateRoute requiredRole="admin"><AdminStudents /></PrivateRoute>} />
                  <Route path="admin/students/:id" element={<PrivateRoute requiredRole="admin"><AdminStudentDetails /></PrivateRoute>} />
                  <Route path="admin/teachers" element={<PrivateRoute requiredRole="admin"><AdminTeachers /></PrivateRoute>} />
                  <Route path="admin/teachers/:id" element={<PrivateRoute requiredRole="admin"><AdminTeacherDetails /></PrivateRoute>} />
                  <Route path="admin/departments" element={<PrivateRoute requiredRole="admin"><AdminDepartments /></PrivateRoute>} />
                  <Route path="admin/reports" element={<PrivateRoute requiredRole="admin"><AdminReports /></PrivateRoute>} />
                  <Route path="admin/schedule" element={<PrivateRoute requiredRole="admin"><AdminSchedule /></PrivateRoute>} />
                  <Route path="admin/settings" element={<PrivateRoute requiredRole="admin"><AdminSettings /></PrivateRoute>} />

                  {/* Teacher routes */}
                  <Route path="teacher" element={<Navigate to="/teacher/dashboard" replace />} />
                  <Route path="teacher/dashboard" element={<PrivateRoute requiredRole="teacher"><TeacherDashboard /></PrivateRoute>} />
                  <Route path="teacher/schedule" element={<PrivateRoute requiredRole="teacher"><TeacherSchedule /></PrivateRoute>} />
                  <Route path="teacher/assignments" element={<PrivateRoute requiredRole="teacher"><TeacherAssignments /></PrivateRoute>} />
                  <Route path="teacher/courses" element={<PrivateRoute requiredRole="teacher"><TeacherCourses /></PrivateRoute>} />
                  <Route path="teacher/messages" element={<PrivateRoute requiredRole="teacher"><TeacherMessages /></PrivateRoute>} />
                </Route>

                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Router>
          <AuthDebugger />
        </TooltipProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
