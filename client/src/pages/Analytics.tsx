import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { API_URL } from '../config';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';

interface AnalyticsData {
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
    totalDepartments: number;
    departmentStats: Array<{
        name: string;
        students: number;
        teachers: number;
    }>;
    courseEnrollment: Array<{
        name: string;
        students: number;
    }>;
}

const Analytics = () => {
    const { user: currentUser } = useUser();
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/admin/analytics`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setData(response.data);
        } catch (err) {
            setError('Failed to fetch analytics data');
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser?.permissions.canViewAnalytics) {
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

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Analytics Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Students</h3>
                    <p className="text-3xl font-bold">{data?.totalStudents}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Teachers</h3>
                    <p className="text-3xl font-bold">{data?.totalTeachers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Courses</h3>
                    <p className="text-3xl font-bold">{data?.totalCourses}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500 text-sm">Total Departments</h3>
                    <p className="text-3xl font-bold">{data?.totalDepartments}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Department Statistics */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Department Statistics</h2>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data?.departmentStats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="students" fill="#3B82F6" name="Students" />
                                <Bar dataKey="teachers" fill="#10B981" name="Teachers" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Course Enrollment */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Course Enrollment</h2>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data?.courseEnrollment}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="students" stroke="#3B82F6" name="Students" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;