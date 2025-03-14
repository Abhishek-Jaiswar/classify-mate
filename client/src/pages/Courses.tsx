import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { useUser } from '../contexts/UserContext';

<<<<<<< HEAD
interface Course {
  _id: string;
  name: string;
  code: string;
  description: string;
  department: {
    _id: string;
    name: string;
  };
  teacher: {
    _id: string;
    name: string;
  };
  students: Array<{
    _id: string;
    name: string;
  }>;
  createdAt: string;
}
=======
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@/types";
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a

interface Department {
  _id: string;
  name: string;
}

const Courses = () => {
<<<<<<< HEAD
  const { user: currentUser } = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    departmentId: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [coursesResponse, departmentsResponse] = await Promise.all([
        axios.get(`${API_URL}/admin/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/admin/departments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setCourses(coursesResponse.data);
      setDepartments(departmentsResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/admin/courses`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: '', code: '', description: '', departmentId: '' });
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/admin/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(courses.filter(course => course._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course');
    }
  };

  if (!currentUser?.permissions.canManageCourses) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">You don't have permission to view this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add Course'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select a department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
=======
  const [searchQuery, setSearchQuery] = useState("");
  // For demo purposes, we'll use "admin" role
  const userRole: UserRole = "admin";
  const userName = "John Doe";
  
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Student View: My Courses vs Available Courses
  const enrolledCourses = filteredCourses.filter(course => course.enrolled);
  const availableCourses = filteredCourses.filter(course => !course.enrolled);

  return (
    <div className="min-h-screen flex">
      <Sidebar role={userRole} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold">Courses</h1>
              
              <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-8 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {userRole === "admin" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Course</DialogTitle>
                        <DialogDescription>
                          Add a new course to the system. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Course Title</Label>
                          <Input id="title" placeholder="e.g., Introduction to Computer Science" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="instructor">Instructor</Label>
                          <Input id="instructor" placeholder="e.g., Dr. Alan Turing" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="department">Department</Label>
                          <Input id="department" placeholder="e.g., Computer Science" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="credits">Credits</Label>
                          <Input id="credits" type="number" placeholder="3" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Course description..." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Course</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                
                {userRole === "teacher" && (
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                  </Button>
                )}
              </div>
            </div>

            {userRole === "student" ? (
              <Tabs defaultValue="enrolled" className="w-full mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                  <TabsTrigger value="available">Available Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="enrolled">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        description={course.description}
                        progress={course.progress}
                        credits={course.credits}
                        enrolled={course.enrolled}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="available">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        description={course.description}
                        progress={course.progress}
                        credits={course.credits}
                        enrolled={course.enrolled}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    instructor={course.instructor}
                    description={course.description}
                    progress={userRole === "student" ? course.progress : undefined}
                    credits={course.credits}
                    enrolled={userRole === "student" && course.enrolled}
                  />
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create Course
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{course.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{course.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{course.department.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {course.teacher?.name || 'Not assigned'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {course.students.length} students
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
