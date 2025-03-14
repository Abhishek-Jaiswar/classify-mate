
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

const adminStats = [
  { title: "Total Students", value: 1250, icon: GraduationCap },
  { title: "Total Teachers", value: 75, icon: Users },
  { title: "Active Courses", value: 48, icon: BookOpen },
  { title: "Departments", value: 6, icon: Briefcase },
];

const AdminDashboard = () => {
  const role = "admin";
  const userName = "Admin User";

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Statistics</CardTitle>
                    <CardDescription>Student enrollment by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Computer Science</span>
                          <span className="font-medium">325 students</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Engineering</span>
                          <span className="font-medium">280 students</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Business</span>
                          <span className="font-medium">220 students</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Arts and Humanities</span>
                          <span className="font-medium">190 students</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sciences</span>
                          <span className="font-medium">165 students</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Medicine</span>
                          <span className="font-medium">70 students</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest administrative actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New faculty member added</p>
                        <p className="text-xs text-muted-foreground">Dr. James Wilson - Physics Department</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New course created</p>
                        <p className="text-xs text-muted-foreground">Advanced Machine Learning - CS Department</p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Academic calendar updated</p>
                        <p className="text-xs text-muted-foreground">Spring semester dates modified</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Student batch imported</p>
                        <p className="text-xs text-muted-foreground">125 new student records added</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
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
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Server Load</span>
                        <span className="text-sm text-muted-foreground">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Database Usage</span>
                        <span className="text-sm text-muted-foreground">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Storage</span>
                        <span className="text-sm text-muted-foreground">57%</span>
                      </div>
                      <Progress value={57} className="h-2" />
                    </div>
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Active Users</h4>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">158</div>
                          <div className="text-xs text-muted-foreground">Students</div>
                        </div>
                        <div className="p-2 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">32</div>
                          <div className="text-xs text-muted-foreground">Teachers</div>
                        </div>
                        <div className="p-2 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">7</div>
                          <div className="text-xs text-muted-foreground">Admin</div>
                        </div>
                      </div>
                    </div>
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
