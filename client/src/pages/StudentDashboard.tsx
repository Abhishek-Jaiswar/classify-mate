import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BookOpen,
    Calendar,
    ClipboardList,
    Clock,
    GraduationCap,
    MessageSquare,
    Bell,
    Award,
    FileText,
    CheckSquare,
    AlertCircle
} from "lucide-react";

const studentStats = [
    { title: "Courses Enrolled", value: 6, icon: BookOpen },
    { title: "Assignments Due", value: 3, icon: ClipboardList },
    { title: "Attendance Rate", value: "92%", icon: Calendar },
    { title: "GPA", value: "3.8", icon: GraduationCap },
];

const upcomingClasses = [
    { course: "Introduction to Computer Science", time: "10:00 AM - 11:30 AM", room: "Hall 302" },
    { course: "Calculus II", time: "1:00 PM - 2:30 PM", room: "Math Building 101" },
    { course: "Modern Literature", time: "3:00 PM - 4:30 PM", room: "Arts 204" },
];

const pendingAssignments = [
    { id: 1, title: "Algorithm Analysis", course: "Data Structures", dueDate: "Nov 20, 2023", status: "pending" },
    { id: 2, title: "Final Project Proposal", course: "Advanced Programming", dueDate: "Nov 25, 2023", status: "pending" },
    { id: 3, title: "Web Application Demo", course: "Web Development", dueDate: "Dec 5, 2023", status: "pending" },
];

const recentAnnouncements = [
    { title: "Campus Closed for Holiday", date: "Nov 24, 2023", description: "The campus will be closed for the Thanksgiving holiday from November 24-26." },
    { title: "Winter Registration Open", date: "Nov 15, 2023", description: "Registration for Winter semester courses is now open until December 15." },
    { title: "Library Extended Hours", date: "Nov 10, 2023", description: "The main library will have extended hours during finals week." },
];

const courseProgress = [
    { course: "Introduction to Computer Science", progress: 75, grade: "A-" },
    { course: "Calculus II", progress: 60, grade: "B+" },
    { course: "Modern Literature", progress: 90, grade: "A" },
    { course: "Physics 101", progress: 45, grade: "C+" },
];

const achievements = [
    { title: "Dean's List", date: "Fall 2023", description: "Achieved a GPA of 3.8 or higher" },
    { title: "Perfect Attendance", date: "October 2023", description: "Attended all classes in October" },
    { title: "Project Excellence", date: "September 2023", description: "Outstanding performance in Web Development project" },
];

const StudentDashboard = () => {
    const role = "student";
    const userName = "John Doe";

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            <h1 className="text-2xl font-bold">Student Dashboard</h1>
                            <div className="mt-3 sm:mt-0">
                                <Tabs defaultValue="daily" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="daily">Daily</TabsTrigger>
                                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {studentStats.map((stat, i) => (
                                <DashboardCard
                                    key={i}
                                    title={stat.title}
                                    icon={stat.icon}
                                >
                                    <div className="mt-2">
                                        <div className="text-3xl font-bold">{stat.value}</div>
                                    </div>
                                </DashboardCard>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>Course Progress</CardTitle>
                                                <CardDescription>Your current semester performance</CardDescription>
                                            </div>
                                            <Button size="sm" asChild>
                                                <Link to="/courses">View All Courses</Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {courseProgress.map((course) => (
                                                <div key={course.course} className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <div>
                                                            <span className="font-medium">{course.course}</span>
                                                            <span className="ml-2 text-muted-foreground">({course.grade})</span>
                                                        </div>
                                                        <span className="font-medium">{course.progress}%</span>
                                                    </div>
                                                    <Progress value={course.progress} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>Upcoming Classes</CardTitle>
                                                <CardDescription>Today's schedule</CardDescription>
                                            </div>
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link to="/schedule">View Full Schedule</Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {upcomingClasses.map((cls, i) => (
                                                <div key={i} className="flex items-start py-2 border-b last:border-0">
                                                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                                        <Clock className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm">{cls.course}</div>
                                                        <div className="text-xs text-muted-foreground mt-1">{cls.time} • {cls.room}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>Pending Assignments</CardTitle>
                                                <CardDescription>Upcoming submission deadlines</CardDescription>
                                            </div>
                                            <Button size="sm" asChild>
                                                <Link to="/assignments">View All</Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {pendingAssignments.map((assignment) => (
                                                <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div>
                                                        <div className="font-medium">{assignment.title}</div>
                                                        <div className="text-sm text-muted-foreground">{assignment.course}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-medium text-red-500">Due: {assignment.dueDate}</div>
                                                        <Button size="sm" variant="outline" className="mt-1" asChild>
                                                            <Link to={`/assignments/${assignment.id}`}>Submit</Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <CardTitle>Recent Achievements</CardTitle>
                                                <CardDescription>Your academic milestones</CardDescription>
                                            </div>
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link to="/achievements">View All</Link>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {achievements.map((achievement, i) => (
                                                <div key={i} className="flex items-start space-x-3">
                                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <Award className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm">{achievement.title}</div>
                                                        <div className="text-xs text-muted-foreground">{achievement.date}</div>
                                                        <p className="text-xs mt-1">{achievement.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>Announcements</CardTitle>
                                        <CardDescription>Latest updates from the administration</CardDescription>
                                    </div>
                                    <Button size="sm" variant="ghost" asChild>
                                        <Link to="/announcements">View All</Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {recentAnnouncements.map((announcement, i) => (
                                        <div key={i} className="p-4 border rounded-lg bg-card hover:shadow-subtle transition-shadow">
                                            <div className="text-sm font-medium mb-1">{announcement.title}</div>
                                            <div className="text-xs text-muted-foreground mb-2">{announcement.date}</div>
                                            <p className="text-sm">{announcement.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
};

export default StudentDashboard; 