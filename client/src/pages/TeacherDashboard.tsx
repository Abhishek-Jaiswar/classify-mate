
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  FileText,
  MessageSquare,
  Bell,
  CheckSquare
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { Progress } from "@/components/ui/progress";

const teacherStats = [
  { title: "Courses Teaching", value: 4, icon: BookOpen },
  { title: "Total Students", value: 120, icon: Users },
  { title: "Classes Today", value: 3, icon: Clock },
  { title: "Average Attendance", value: "88%", icon: Calendar },
];

const myCourses = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    instructor: "You",
    description: "A comprehensive introduction to computer science principles, algorithms, and programming concepts.",
    credits: 3,
    students: 35,
  },
  {
    id: "2",
    title: "Advanced Programming",
    instructor: "You",
    description: "In-depth exploration of programming paradigms, design patterns, and advanced development techniques.",
    credits: 4,
    students: 28,
  },
  {
    id: "3",
    title: "Data Structures",
    instructor: "You",
    description: "Study of fundamental data structures, algorithms, and their applications in software development.",
    credits: 3,
    students: 22,
  },
  {
    id: "4",
    title: "Web Development",
    instructor: "You",
    description: "Comprehensive course covering modern web development technologies and frameworks.",
    credits: 3,
    students: 30,
  },
];

const upcomingClasses = [
  { course: "Introduction to Computer Science", time: "10:00 AM - 11:30 AM", room: "Hall 302", students: 35 },
  { course: "Advanced Programming", time: "1:00 PM - 2:30 PM", room: "Tech Building 101", students: 28 },
  { course: "Data Structures", time: "3:00 PM - 4:30 PM", room: "CS Lab 204", students: 22 },
];

const pendingAssignments = [
  { id: 1, title: "Algorithm Analysis", course: "Data Structures", submitted: 18, total: 22, dueDate: "Nov 20, 2023" },
  { id: 2, title: "Final Project Proposal", course: "Advanced Programming", submitted: 20, total: 28, dueDate: "Nov 25, 2023" },
  { id: 3, title: "Web Application Demo", course: "Web Development", submitted: 12, total: 30, dueDate: "Dec 5, 2023" },
];

const studentMessages = [
  { id: 1, name: "Emma Johnson", course: "Introduction to Computer Science", message: "I have a question about the last lecture...", time: "2 hours ago" },
  { id: 2, name: "Michael Smith", course: "Advanced Programming", message: "Regarding the project deadline, could I...", time: "Yesterday" },
  { id: 3, name: "Sophia Williams", course: "Data Structures", message: "Having trouble with the linked list implementation...", time: "2 days ago" },
];

const TeacherDashboard = () => {
  const role = "teacher";
  const userName = "Dr. Alan Turing";

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <div className="mt-3 sm:mt-0">
                <Tabs defaultValue="today" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {teacherStats.map((stat, i) => (
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
                    <CardTitle>Today's Schedule</CardTitle>
                    <CardDescription>Upcoming classes for today</CardDescription>
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
                            <Users className="h-4 w-4 mr-1" /> {cls.students}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/teacher/schedule">
                          <Calendar className="mr-2 h-4 w-4" />
                          View Full Schedule
                        </Link>
                      </Button>
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
                            <span>Submitted: {assignment.submitted}/{assignment.total}</span>
                            <span>{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
                          </div>
                          <Progress value={(assignment.submitted / assignment.total) * 100} className="h-1" />
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>My Courses</CardTitle>
                        <CardDescription>Courses you're currently teaching</CardDescription>
                      </div>
                      <Button size="sm" asChild>
                        <Link to="/teacher/courses">View All</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {myCourses.slice(0, 4).map((course) => (
                        <div key={course.id} className="p-4 border rounded-lg">
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2 mt-1">{course.description}</div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Users className="h-3 w-3 mr-1" />
                              {course.students} students
                            </div>
                            <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {course.credits} Credits
                            </div>
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
                        <CardTitle>Student Messages</CardTitle>
                        <CardDescription>Recent messages from students</CardDescription>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                        <Link to="/teacher/messages">
                          <Bell className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentMessages.map((message) => (
                        <div key={message.id} className="flex items-start space-x-3 pb-3 border-b last:pb-0 last:border-b-0">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{message.name}</p>
                            <p className="text-xs text-muted-foreground">{message.course}</p>
                            <p className="text-xs mt-1 line-clamp-1">{message.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/teacher/messages">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          View All Messages
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default TeacherDashboard;
