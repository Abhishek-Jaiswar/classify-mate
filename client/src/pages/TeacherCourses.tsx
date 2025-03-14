import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Search, Plus, Filter, Calendar, FileText, MessageSquare } from "lucide-react";

// Mock data - replace with actual API calls
const courses = [
    {
        id: "1",
        title: "Introduction to Computer Science",
        description: "A comprehensive introduction to computer science principles, algorithms, and programming concepts.",
        instructor: "Dr. Alan Turing",
        credits: 3,
        students: 35,
        totalStudents: 40,
        status: "active",
        schedule: "Mon, Wed 10:00 AM - 11:30 AM",
        room: "Hall 302",
    },
    {
        id: "2",
        title: "Advanced Programming",
        description: "In-depth exploration of programming paradigms, design patterns, and advanced development techniques.",
        instructor: "Dr. Alan Turing",
        credits: 4,
        students: 28,
        totalStudents: 30,
        status: "active",
        schedule: "Tue, Thu 1:00 PM - 2:30 PM",
        room: "Tech Building 101",
    },
    {
        id: "3",
        title: "Data Structures",
        description: "Study of fundamental data structures, algorithms, and their applications in software development.",
        instructor: "Dr. Alan Turing",
        credits: 3,
        students: 22,
        totalStudents: 25,
        status: "active",
        schedule: "Mon, Wed 3:00 PM - 4:30 PM",
        room: "CS Lab 204",
    },
    {
        id: "4",
        title: "Web Development",
        description: "Comprehensive course covering modern web development technologies and frameworks.",
        instructor: "Dr. Alan Turing",
        credits: 3,
        students: 30,
        totalStudents: 35,
        status: "active",
        schedule: "Tue, Thu 9:00 AM - 10:30 AM",
        room: "Lab 105",
    },
];

const TeacherCourses = () => {
    const role = "teacher";
    const userName = "Dr. Alan Turing";
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">My Courses</h1>
                                <p className="text-muted-foreground">Manage and view your teaching courses</p>
                            </div>
                            <Button asChild>
                                <Link to="/teacher/courses/new">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Course
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search courses..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {courses.map((course) => (
                                <Card key={course.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                    {course.title}
                                                </CardTitle>
                                                <CardDescription>{course.description}</CardDescription>
                                            </div>
                                            <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                {course.credits} Credits
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <span>Enrollment</span>
                                                </div>
                                                <span>{course.students}/{course.totalStudents} students</span>
                                            </div>
                                            <Progress value={(course.students / course.totalStudents) * 100} className="h-2" />

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span>{course.schedule}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    <span>{course.room}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" className="flex-1" asChild>
                                                    <Link to={`/teacher/courses/${course.id}`}>
                                                        <MessageSquare className="h-4 w-4 mr-2" />
                                                        View Details
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" className="flex-1" asChild>
                                                    <Link to={`/teacher/courses/${course.id}/students`}>
                                                        <Users className="h-4 w-4 mr-2" />
                                                        Students
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
};

export default TeacherCourses; 