
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Check, Calendar, Clock, Search, UserRound, Home, X, Building2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AttendanceCard from "@/components/AttendanceCard";
import { UserRole } from "@/types";

// Student attendance data
const studentAttendance = [
  {
    id: 1,
    course: "Introduction to Computer Science",
    date: "2023-09-10",
    status: "present",
  },
  {
    id: 2,
    course: "Calculus II",
    date: "2023-09-10",
    status: "absent",
  },
  {
    id: 3,
    course: "Modern Literature",
    date: "2023-09-09",
    status: "present",
  },
  {
    id: 4,
    course: "Physics 101",
    date: "2023-09-08",
    status: "late",
  },
  {
    id: 5,
    course: "Organic Chemistry",
    date: "2023-09-07",
    status: "present",
  },
];

// Teacher class schedule data
const teacherClasses = [
  {
    id: 1,
    course: "Introduction to Computer Science",
    time: "10:00 AM - 11:30 AM",
    room: "CS-101",
    students: 32,
    date: "2023-09-10",
  },
  {
    id: 2,
    course: "Advanced Programming",
    time: "1:00 PM - 2:30 PM",
    room: "CS-201",
    students: 24,
    date: "2023-09-10",
  },
  {
    id: 3,
    course: "Data Structures",
    time: "3:00 PM - 4:30 PM",
    room: "CS-301",
    students: 28,
    date: "2023-09-09",
  },
];

// Type for attendance data
type AttendanceItem = typeof studentAttendance[0] | typeof teacherClasses[0];

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const userRole: UserRole = "admin"; // For demo purposes, we'll use "admin" role
  const userName = "John Doe";

  // Filter attendance based on search query
  const filteredStudentAttendance = studentAttendance.filter(item =>
    item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.includes(searchQuery)
  );

  const filteredTeacherClasses = teacherClasses.filter(item =>
    item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.date.includes(searchQuery)
  );

  // Define getTodayAttendance based on role
  const getTodayAttendance = () => {
    if (userRole === "student") {
      return studentAttendance.filter(item => item.date === "2023-09-10");
    } else if (userRole === "teacher") {
      return teacherClasses.filter(item => item.date === "2023-09-10");
    } else {
      // Admin sees both
      return [
        ...studentAttendance.filter(item => item.date === "2023-09-10"),
        ...teacherClasses.filter(item => item.date === "2023-09-10")
      ] as AttendanceItem[];
    }
  };

  // Get attendance stats for display
  const getAttendanceStats = () => {
    if (userRole === "student") {
      const total = studentAttendance.length;
      const present = studentAttendance.filter(item => item.status === "present").length;
      const absent = studentAttendance.filter(item => item.status === "absent").length;
      const late = studentAttendance.filter(item => item.status === "late").length;
      
      return { total, present, absent, late };
    } else if (userRole === "teacher") {
      const totalClasses = teacherClasses.length;
      const totalStudents = teacherClasses.reduce((sum, item) => sum + item.students, 0);
      
      return { totalClasses, totalStudents };
    } else {
      // Admin stats
      const totalStudents = 567; // Mock data
      const totalTeachers = 42; // Mock data
      const totalCourses = 78; // Mock data
      
      return { totalStudents, totalTeachers, totalCourses };
    }
  };

  const stats = getAttendanceStats();
  const todayAttendance = getTodayAttendance();

  return (
    <div className="min-h-screen flex">
      <Sidebar role={userRole} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold">Attendance</h1>
              
              <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search attendance..."
                    className="w-full pl-8 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {userRole === "student" && (
                  <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    My Attendance
                  </Button>
                )}
                
                {userRole === "teacher" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <UserRound className="mr-2 h-4 w-4" />
                        Take Attendance
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Take Attendance</DialogTitle>
                        <DialogDescription>
                          Record attendance for today's class.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="course">Select Course</Label>
                          <Select>
                            <SelectTrigger id="course">
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cs101">Introduction to Computer Science</SelectItem>
                              <SelectItem value="cs201">Advanced Programming</SelectItem>
                              <SelectItem value="cs301">Data Structures</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="date">Date</Label>
                          <Input id="date" type="date" defaultValue="2023-09-10" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Start</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {userRole === "student" && (
                <>
                  <AttendanceCard
                    title="Total Classes"
                    value={(stats as any).total}
                    icon={Calendar}
                    color="bg-blue-500"
                  />
                  <AttendanceCard
                    title="Present"
                    value={(stats as any).present}
                    icon={Check}
                    color="bg-green-500"
                  />
                  <AttendanceCard
                    title="Absent"
                    value={(stats as any).absent}
                    icon={X}
                    color="bg-red-500"
                  />
                  <AttendanceCard
                    title="Late"
                    value={(stats as any).late}
                    icon={Clock}
                    color="bg-yellow-500"
                  />
                </>
              )}
              
              {userRole === "teacher" && (
                <>
                  <AttendanceCard
                    title="Total Classes"
                    value={(stats as any).totalClasses}
                    icon={Calendar}
                    color="bg-blue-500"
                  />
                  <AttendanceCard
                    title="Total Students"
                    value={(stats as any).totalStudents}
                    icon={UserRound}
                    color="bg-purple-500"
                  />
                </>
              )}
              
              {userRole === "admin" && (
                <>
                  <AttendanceCard
                    title="Total Students"
                    value={(stats as any).totalStudents}
                    icon={UserRound}
                    color="bg-blue-500"
                  />
                  <AttendanceCard
                    title="Total Teachers"
                    value={(stats as any).totalTeachers}
                    icon={UserRound}
                    color="bg-green-500"
                  />
                  <AttendanceCard
                    title="Total Courses"
                    value={(stats as any).totalCourses}
                    icon={Home}
                    color="bg-purple-500"
                  />
                </>
              )}
            </div>

            {/* Today's Attendance */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {todayAttendance.map((item) => {
                  // For student view
                  if ("status" in item) {
                    return (
                      <div key={item.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{item.course}</h3>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        <div>
                          {item.status === "present" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><Check className="mr-1 h-3 w-3" /> Present</span>}
                          {item.status === "absent" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><X className="mr-1 h-3 w-3" /> Absent</span>}
                          {item.status === "late" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" /> Late</span>}
                        </div>
                      </div>
                    );
                  }
                  
                  // For teacher/admin view
                  return (
                    <div key={item.id} className="bg-card border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{item.course}</h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" /> {item.time}
                            <Building2 className="ml-3 mr-1 h-3 w-3" /> {item.room}
                            <UserRound className="ml-3 mr-1 h-3 w-3" /> {item.students} students
                          </div>
                        </div>
                        {userRole === "teacher" && (
                          <Button size="sm">Take Attendance</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Attendance Records */}
            <div>
              <h2 className="text-xl font-semibold mb-4">All Records</h2>
              
              {userRole === "student" ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredStudentAttendance.map((item) => (
                    <div key={item.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.course}</h3>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <div>
                        {item.status === "present" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><Check className="mr-1 h-3 w-3" /> Present</span>}
                        {item.status === "absent" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><X className="mr-1 h-3 w-3" /> Absent</span>}
                        {item.status === "late" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" /> Late</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : userRole === "teacher" ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredTeacherClasses.map((item) => (
                    <div key={item.id} className="bg-card border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{item.course}</h3>
                          <div className="flex items-center mt-1 text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" /> {item.date}
                            <Clock className="ml-3 mr-1 h-3 w-3" /> {item.time}
                            <Building2 className="ml-3 mr-1 h-3 w-3" /> {item.room}
                            <UserRound className="ml-3 mr-1 h-3 w-3" /> {item.students} students
                          </div>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Tabs defaultValue="students" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="students">Student Records</TabsTrigger>
                    <TabsTrigger value="teachers">Teacher Records</TabsTrigger>
                  </TabsList>
                  <TabsContent value="students">
                    <div className="grid grid-cols-1 gap-4">
                      {filteredStudentAttendance.map((item) => (
                        <div key={item.id} className="bg-card border rounded-lg p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{item.course}</h3>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                          <div>
                            {item.status === "present" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><Check className="mr-1 h-3 w-3" /> Present</span>}
                            {item.status === "absent" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><X className="mr-1 h-3 w-3" /> Absent</span>}
                            {item.status === "late" && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="mr-1 h-3 w-3" /> Late</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="teachers">
                    <div className="grid grid-cols-1 gap-4">
                      {filteredTeacherClasses.map((item) => (
                        <div key={item.id} className="bg-card border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{item.course}</h3>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" /> {item.date}
                                <Clock className="ml-3 mr-1 h-3 w-3" /> {item.time}
                                <Building2 className="ml-3 mr-1 h-3 w-3" /> {item.room}
                                <UserRound className="ml-3 mr-1 h-3 w-3" /> {item.students} students
                              </div>
                            </div>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Attendance;
