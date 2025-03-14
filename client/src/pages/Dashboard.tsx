
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
];

const Dashboard = () => {
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
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
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
                        </div>
                      </div>
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
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Dashboard;
