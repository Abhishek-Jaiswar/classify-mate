import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GraduationCap,
  Users,
  ClipboardList,
  Briefcase,
  Building,
  BarChart4,
  Calendar,
  Settings
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import adminService, { DashboardStats, EnrollmentStat, Activity, SystemStatus } from "@/services/admin.service";

const AdminDashboard = () => {
  const role = "admin";
  const userName = "Admin User";
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enrollmentStats, setEnrollmentStats] = useState<EnrollmentStat[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, enrollmentData, activitiesData, statusData] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getEnrollmentStats(),
          adminService.getRecentActivities(),
          adminService.getSystemStatus()
        ]);

        setStats(statsData);
        setEnrollmentStats(enrollmentData);
        setRecentActivities(activitiesData);
        setSystemStatus(statusData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const adminStats = stats ? [
    { title: "Total Students", value: stats.totalStudents, icon: GraduationCap },
    { title: "Total Teachers", value: stats.totalTeachers, icon: Users },
    { title: "Active Courses", value: stats.activeCourses, icon: BookOpen },
    { title: "Departments", value: stats.departments, icon: Briefcase },
  ] : [];

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />

      <main className="flex-1">
        <Navbar />

        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <div className="mt-3 sm:mt-0">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="financial">Financial</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {adminStats.map((stat, i) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Statistics</CardTitle>
                    <CardDescription>Student enrollment by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {enrollmentStats.map((stat, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{stat.name}</span>
                            <span className="font-medium">{stat.students} students</span>
                          </div>
                          <Progress value={stat.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

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
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link to="/admin/schedule">
                        <Calendar className="mr-2 h-4 w-4" />
                        Academic Calendar
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link to="/admin/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        System Settings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest administrative actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          {activity.type === 'faculty_added' && <Users className="h-5 w-5 text-primary" />}
                          {activity.type === 'course_created' && <BookOpen className="h-5 w-5 text-primary" />}
                          {activity.type === 'calendar_updated' && <Calendar className="h-5 w-5 text-primary" />}
                          {activity.type === 'student_imported' && <GraduationCap className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.details}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemStatus && (
                      <>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Server Load</span>
                            <span className="text-sm text-muted-foreground">{systemStatus.serverLoad}%</span>
                          </div>
                          <Progress value={systemStatus.serverLoad} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Database Usage</span>
                            <span className="text-sm text-muted-foreground">{systemStatus.databaseUsage}%</span>
                          </div>
                          <Progress value={systemStatus.databaseUsage} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Storage</span>
                            <span className="text-sm text-muted-foreground">{systemStatus.storage}%</span>
                          </div>
                          <Progress value={systemStatus.storage} className="h-2" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Active Users</h4>
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-muted rounded-lg">
                              <div className="text-2xl font-bold">{systemStatus.activeUsers.students}</div>
                              <div className="text-xs text-muted-foreground">Students</div>
                            </div>
                            <div className="p-2 bg-muted rounded-lg">
                              <div className="text-2xl font-bold">{systemStatus.activeUsers.teachers}</div>
                              <div className="text-xs text-muted-foreground">Teachers</div>
                            </div>
                            <div className="p-2 bg-muted rounded-lg">
                              <div className="text-2xl font-bold">{systemStatus.activeUsers.admins}</div>
                              <div className="text-xs text-muted-foreground">Admin</div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default AdminDashboard;
