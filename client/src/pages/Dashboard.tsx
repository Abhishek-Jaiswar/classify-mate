<<<<<<< HEAD
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
  Users,
  MessageSquare,
  Bell,
  Award,
  FileText,
  CheckSquare,
  AlertCircle,
  Briefcase,
  Building,
  BarChart4,
  LucideIcon
} from "lucide-react";

type StatItem = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

const studentStats: StatItem[] = [
  { title: "Courses Enrolled", value: 6, icon: BookOpen },
  { title: "Assignments Due", value: 3, icon: ClipboardList },
  { title: "Attendance Rate", value: "92%", icon: Calendar },
  { title: "GPA", value: "3.8", icon: GraduationCap },
];

const teacherStats: StatItem[] = [
  { title: "Courses Teaching", value: 4, icon: BookOpen },
  { title: "Total Students", value: 120, icon: Users },
  { title: "Classes Today", value: 3, icon: Clock },
  { title: "Average Attendance", value: "88%", icon: Calendar },
];

const adminStats: StatItem[] = [
  { title: "Total Students", value: 1250, icon: GraduationCap },
  { title: "Total Teachers", value: 75, icon: Users },
  { title: "Active Courses", value: 48, icon: BookOpen },
  { title: "Departments", value: 6, icon: Briefcase },
];
=======

import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookOpenCheck, Calendar, Clock, GraduationCap, LineChart, Users, Infinity } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { UserRole } from "@/types";

interface DashboardCardData {
  title: string;
  value: number | string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a

// Mock data for upcoming classes
const upcomingClasses = [
  {
    id: 1,
    course: "Introduction to Computer Science",
    time: "10:00 AM - 11:30 AM",
    room: "CS-101",
  },
  {
    id: 2,
    course: "Calculus II",
    time: "01:00 PM - 02:30 PM",
    room: "MA-201",
  },
  {
    id: 3,
    course: "Physics 101",
    time: "03:00 PM - 04:30 PM",
    room: "PH-101",
  },
];

<<<<<<< HEAD
const pendingAssignments = [
  { id: 1, title: "Algorithm Analysis", course: "Data Structures", dueDate: "Nov 20, 2023", status: "pending" },
  { id: 2, title: "Final Project Proposal", course: "Advanced Programming", dueDate: "Nov 25, 2023", status: "pending" },
  { id: 3, title: "Web Application Demo", course: "Web Development", dueDate: "Dec 5, 2023", status: "pending" },
];

const recentAnnouncements = [
  { title: "Campus Closed for Holiday", date: "Nov 24, 2023", description: "The campus will be closed for the Thanksgiving holiday from November 24-26." },
  { title: "Winter Registration Open", date: "Nov 15, 2023", description: "Registration for Winter semester courses is now open until December 15." },
  { title: "Library Extended Hours", date: "Nov 10, 2023", description: "The main library will have extended hours during finals week." },
=======
// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    action: "Completed Assignment",
    course: "Introduction to Computer Science",
    date: "2 hours ago",
  },
  {
    id: 2,
    action: "Submitted Quiz",
    course: "Calculus II",
    date: "Yesterday",
  },
  {
    id: 3,
    action: "Joined Discussion",
    course: "Modern Literature",
    date: "2 days ago",
  },
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a
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

const Dashboard = () => {
<<<<<<< HEAD
  // For demo purposes, we'll use "student" role
  const userRole = "student" as const;
  type UserRole = "admin" | "teacher" | "student";
  const role: UserRole = userRole;
  const userName = "John Doe";

  // Type guard functions
  const isRole = (r: UserRole, target: UserRole): r is typeof target => r === target;

  // Select the appropriate stats based on role
  let stats: StatItem[] = adminStats;
  if (isRole(role, "student")) {
    stats = studentStats;
  } else if (isRole(role, "teacher")) {
    stats = teacherStats;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />

=======
  // For demo purposes, we'll use "admin" role
  const userRole: UserRole = "admin";
  const userName = "John Doe";
  
  // Define dashboard cards based on role
  const getDashboardCards = (): DashboardCardData[] => {
    if (userRole === "student") {
      return [
        { title: "Courses", value: 5, icon: BookOpen },
        { title: "Credits", value: 15, icon: Infinity },
        { title: "Attendance", value: "95%", icon: Calendar },
        { title: "Average Grade", value: "B+", icon: LineChart },
      ];
    } else if (userRole === "teacher") {
      return [
        { title: "Classes", value: 4, icon: BookOpenCheck },
        { title: "Students", value: 120, icon: Users },
        { title: "Attendance Rate", value: "92%", icon: Calendar },
        { title: "Average Grade", value: "B", icon: LineChart },
      ];
    } else {
      return [
        { title: "Students", value: 1250, icon: GraduationCap },
        { title: "Teachers", value: 75, icon: Users },
        { title: "Courses", value: 120, icon: BookOpen },
        { title: "Departments", value: 8, icon: BookOpenCheck },
      ];
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar role={userRole} userName={userName} />
      
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a
      <main className="flex-1">
        <Navbar />

        <PageTransition>
          <div className="p-6">
<<<<<<< HEAD
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold">{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h1>
              <div className="mt-3 sm:mt-0">
                <Tabs defaultValue="daily" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
=======
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {getDashboardCards().map((card, index) => (
                <DashboardCard 
                  key={index}
                  title={card.title} 
                  value={card.value.toString()}
                  icon={card.icon}
                />
              ))}
            </div>
<<<<<<< HEAD

            {isRole(role, "student") && (
              <>
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
              </>
            )}

            {isRole(role, "teacher") && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Today's Schedule</CardTitle>
                          <CardDescription>Upcoming classes for today</CardDescription>
=======
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                    Today's Schedule
                  </CardTitle>
                  <CardDescription>Your upcoming classes for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingClasses.map((item) => (
                      <div key={item.id} className="flex justify-between items-start border-b pb-3">
                        <div>
                          <h4 className="font-medium">{item.course}</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="mr-1 h-3 w-3" /> {item.time}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Room {item.room}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {/* Calculate time left */}
                          {Math.floor(Math.random() * 120)} min
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to="/teacher/schedule">View Full Schedule</Link>
                        </Button>
                      </div>
<<<<<<< HEAD
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingClasses.map((cls, i) => (
                          <div key={i} className="flex items-start py-3 border-b last:border-0">
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{cls.course}</div>
                              <div className="text-sm text-muted-foreground mt-1">{cls.time} • {cls.room}</div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Users className="h-4 w-4 mr-1" /> 35
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Assignments</CardTitle>
                      <CardDescription>Pending student submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingAssignments.map((assignment) => (
                          <div key={assignment.id} className="space-y-2">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium text-sm">{assignment.title}</div>
                                <div className="text-xs text-muted-foreground">{assignment.course} • Due: {assignment.dueDate}</div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8" asChild>
                                <Link to={`/teacher/assignments/${assignment.id}`}>
                                  <FileText className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span>Submitted: 25/35</span>
                              <span>71%</span>
                            </div>
                            <Progress value={71} className="h-1" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/teacher/assignments">
                            <CheckSquare className="mr-2 h-4 w-4" />
                            Manage All Assignments
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {isRole(role, "admin") && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Administrative tools</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link to="/admin/students">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Manage Students
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link to="/admin/teachers">
                            <Users className="mr-2 h-4 w-4" />
                            Manage Faculty
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link to="/admin/courses">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Manage Courses
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link to="/admin/departments">
                            <Building className="mr-2 h-4 w-4" />
                            Departments
                          </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                          <Link to="/admin/reports">
                            <BarChart4 className="mr-2 h-4 w-4" />
                            Reports
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Announcements</CardTitle>
                      <CardDescription>Latest updates from the administration</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
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
              </div>
            )}

            <Card className="mt-6">
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
=======
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5 text-muted-foreground" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Your latest academic activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((item) => (
                      <div key={item.id} className="flex justify-between items-start border-b pb-3">
                        <div>
                          <h4 className="font-medium">{item.action}</h4>
                          <div className="text-sm text-muted-foreground">{item.course}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {userRole === "admin" && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Overview</CardTitle>
                      <CardDescription>Summary of the college management system</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>View detailed statistics and metrics about your educational institution.</p>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Academic Performance</h3>
                          <p className="text-sm text-muted-foreground">Average GPA: 3.2</p>
                          <p className="text-sm text-muted-foreground">Highest GPA: 4.0</p>
                          <p className="text-sm text-muted-foreground">Graduation Rate: 92%</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Campus Statistics</h3>
                          <p className="text-sm text-muted-foreground">Buildings: 12</p>
                          <p className="text-sm text-muted-foreground">Classrooms: 86</p>
                          <p className="text-sm text-muted-foreground">Labs: 24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Analytics</CardTitle>
                      <CardDescription>Advanced data analysis for your institution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Detailed analytics would be displayed here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reports">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reports</CardTitle>
                      <CardDescription>Generated reports and documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Reports would be displayed here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
>>>>>>> c81ff8dbb8ae1fe1c3770fc3442c00e540f4346a
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Dashboard;
