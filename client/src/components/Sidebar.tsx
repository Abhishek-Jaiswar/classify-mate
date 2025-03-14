import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import {
  BookOpen,
  Building2,
  Calendar,
  ChevronDown,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  PieChart,
  Settings,
  User,
  Users,
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  const isActive = (path: string) => {
    // Check if the current path starts with the given path
    // This handles nested routes like /admin/dashboard
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
  };

  // Determine dashboard base path based on user role
  const getDashboardPath = () => {
    if (!user) return '/dashboard';

    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'teacher':
        return '/teacher/dashboard';
      case 'student':
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
      <div className="flex h-16 items-center justify-center border-b">
        <Link to={getDashboardPath()} className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-blue-600">SCMS</h1>
        </Link>
      </div>

      <div className="p-4">

        <nav className="space-y-1">
          {/* Student Navigation */}
          {user?.role === 'student' && (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/dashboard')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/courses"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/courses')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <BookOpen className="h-5 w-5" />
                <span>Courses</span>
              </Link>

              <Link
                to="/attendance"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/attendance')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Attendance</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/profile')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </>
          )}

          {/* Teacher Navigation */}
          {user?.role === 'teacher' && (
            <>
              <Link
                to="/teacher/dashboard"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/teacher/dashboard')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/teacher/schedule"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/teacher/schedule')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule</span>
              </Link>

              <Link
                to="/teacher/assignments"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/teacher/assignments')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <FileText className="h-5 w-5" />
                <span>Assignments</span>
              </Link>

              <Link
                to="/teacher/courses"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/teacher/courses')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <BookOpen className="h-5 w-5" />
                <span>Courses</span>
              </Link>

              <Link
                to="/teacher/messages"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/teacher/messages')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/profile')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </>
          )}

          {/* Admin Navigation */}
          {user?.role === 'admin' && (
            <>
              <Link
                to="/admin/dashboard"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/admin/dashboard')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/admin/students"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/admin/students')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Users className="h-5 w-5" />
                <span>Students</span>
              </Link>

              <Link
                to="/admin/teachers"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/admin/teachers')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Users className="h-5 w-5" />
                <span>Teachers</span>
              </Link>

              <Link
                to="/admin/departments"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/admin/departments')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Building2 className="h-5 w-5" />
                <span>Departments</span>
              </Link>

              <Link
                to="/admin/schedule"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/admin/schedule')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule</span>
              </Link>

              <Link
                to="/admin/reports"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/admin/reports')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <PieChart className="h-5 w-5" />
                <span>Reports</span>
              </Link>

              <Link
                to="/admin/settings"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/admin/settings')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </>
          )}

          {/* Common links for all users */}
          <Link
            to="/profile"
            className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${isActive('/profile')
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>

          <div className='absolute bottom-0 left-0 right-0'>
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
            <div className="mb-6">
              <div className="flex items-center space-x-3 rounded-lg bg-gray-100 p-3">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
            
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
