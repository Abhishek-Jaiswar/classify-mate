
import DashboardCard from "@/components/DashboardCard";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, ClipboardList, Clock, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

type StatItemNumber = {
  title: string;
  value: number;
  icon: React.ForwardRefExoticComponent<any>;
};

type StatItemString = {
  title: string;
  value: string;
  icon: React.ForwardRefExoticComponent<any>;
};

type StatItem = StatItemNumber | StatItemString;

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
  { title: "Departments", value: 6, icon: ClipboardList },
];

const upcomingClasses = [
  { course: "Introduction to Computer Science", time: "10:00 AM - 11:30 AM", room: "Hall 302" },
  { course: "Calculus II", time: "1:00 PM - 2:30 PM", room: "Math Building 101" },
  { course: "Modern Literature", time: "3:00 PM - 4:30 PM", room: "Arts 204" },
];

const recentAnnouncements = [
  { title: "Campus Closed for Holiday", date: "Nov 24, 2023", description: "The campus will be closed for the Thanksgiving holiday from November 24-26." },
  { title: "Winter Registration Open", date: "Nov 15, 2023", description: "Registration for Winter semester courses is now open until December 15." },
  { title: "Library Extended Hours", date: "Nov 10, 2023", description: "The main library will have extended hours during finals week." },
];

const Dashboard = () => {
  // For demo purposes, we'll use "admin" role
  const userRole = "admin" as const;
  type UserRole = "admin" | "teacher" | "student";
  const role: UserRole = userRole;
  const userName = "John Doe";

  // Select the appropriate stats based on role
  let stats: StatItem[] = adminStats;
  if (role === "student") {
    stats = studentStats;
  } else if (role === "teacher") {
    stats = teacherStats;
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
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
              {stats.map((stat, i) => (
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
                <DashboardCard
                  title="Performance Overview"
                  description="Course completion progress for this semester"
                >
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Introduction to Computer Science</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Calculus II</span>
                        <span className="font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Modern Literature</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Physics 101</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </DashboardCard>
              </div>

              <div>
                <DashboardCard
                  title="Upcoming Classes"
                  description="Today's schedule"
                  footer={
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <Link to="/calendar">View Full Schedule</Link>
                    </Button>
                  }
                >
                  <div className="space-y-3 mt-2">
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
                </DashboardCard>
              </div>
            </div>

            <DashboardCard 
              title="Recent Announcements" 
              description="Latest updates from the administration"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {recentAnnouncements.map((announcement, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-card hover:shadow-subtle transition-shadow">
                    <div className="text-sm font-medium mb-1">{announcement.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">{announcement.date}</div>
                    <p className="text-sm">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Dashboard;
