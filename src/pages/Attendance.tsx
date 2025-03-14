
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Define proper types for our data
type StudentAttendanceItem = {
  id: number;
  course: string;
  date: string;
  status: "present" | "absent" | "late";
};

type TeacherClassItem = {
  id: number;
  course: string;
  time: string;
  room: string;
  students: number;
  date: string;
};

type AdminClassItem = {
  id: number;
  course: string;
  instructor: string;
  time: string;
  room: string;
  students: number;
  date: string;
};

// Sample attendance data
const studentAttendance: StudentAttendanceItem[] = [
  { id: 1, course: "Introduction to Computer Science", date: "2023-11-15", status: "present" },
  { id: 2, course: "Calculus II", date: "2023-11-15", status: "present" },
  { id: 3, course: "Modern Literature", date: "2023-11-15", status: "absent" },
  { id: 4, course: "Introduction to Computer Science", date: "2023-11-14", status: "present" },
  { id: 5, course: "Calculus II", date: "2023-11-14", status: "late" },
  { id: 6, course: "Modern Literature", date: "2023-11-14", status: "present" },
];

// Sample class data for teachers
const teacherClasses: TeacherClassItem[] = [
  { id: 1, course: "Introduction to Computer Science", time: "10:00 AM - 11:30 AM", room: "Hall 302", students: 35, date: "2023-11-15" },
  { id: 2, course: "Advanced Programming", time: "1:00 PM - 2:30 PM", room: "Tech Building 101", students: 28, date: "2023-11-15" },
  { id: 3, course: "Data Structures", time: "3:00 PM - 4:30 PM", room: "CS Lab 204", students: 22, date: "2023-11-15" },
  { id: 4, course: "Introduction to Computer Science", time: "10:00 AM - 11:30 AM", room: "Hall 302", students: 35, date: "2023-11-14" },
  { id: 5, course: "Advanced Programming", time: "1:00 PM - 2:30 PM", room: "Tech Building 101", students: 28, date: "2023-11-14" },
];

// Sample class data for admin view
const allClasses: AdminClassItem[] = [
  { id: 1, course: "Introduction to Computer Science", instructor: "Dr. Alan Turing", time: "10:00 AM - 11:30 AM", room: "Hall 302", students: 35, date: "2023-11-15" },
  { id: 2, course: "Calculus II", instructor: "Dr. Katherine Johnson", time: "1:00 PM - 2:30 PM", room: "Math Building 101", students: 28, date: "2023-11-15" },
  { id: 3, course: "Modern Literature", instructor: "Prof. Maya Angelou", time: "3:00 PM - 4:30 PM", room: "Arts 204", students: 22, date: "2023-11-15" },
  { id: 4, course: "Physics 101", instructor: "Dr. Richard Feynman", time: "10:00 AM - 11:30 AM", room: "Physics Lab 302", students: 30, date: "2023-11-15" },
  { id: 5, course: "Organic Chemistry", instructor: "Dr. Marie Curie", time: "1:00 PM - 2:30 PM", room: "Chemistry Building 101", students: 25, date: "2023-11-15" },
];

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  
  // For demo purposes, we'll use "admin" role
  const userRole = "admin" as const;
  type UserRole = "admin" | "teacher" | "student";
  const role: UserRole = userRole;
  const userName = "John Doe";

  // Filter data based on search query and role
  const getFilteredData = () => {
    if (role === "student") {
      return studentAttendance.filter(item => 
        item.course.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (role === "teacher") {
      return teacherClasses.filter(item => 
        item.course.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return allClasses.filter(item => 
        item.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  const filteredData = getFilteredData();

  // Status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Present</Badge>;
      case "absent":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Absent</Badge>;
      case "late":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Late</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />
      
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
                    placeholder="Search..."
                    className="w-full pl-8 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{role === "student" ? "My Attendance" : "Class Attendance"}</CardTitle>
                    <CardDescription>
                      {role === "student" ? "Track your class attendance" : "Manage attendance for your classes"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        {role === "student" && (
                          <>
                            <TabsTrigger value="present">Present</TabsTrigger>
                            <TabsTrigger value="absent">Absent</TabsTrigger>
                            <TabsTrigger value="late">Late</TabsTrigger>
                          </>
                        )}
                        {(role === "teacher" || role === "admin") && (
                          <TabsTrigger value="today">Today's Classes</TabsTrigger>
                        )}
                      </TabsList>
                      
                      <TabsContent value="all">
                        <div className="space-y-4">
                          {role === "student" ? (
                            (filteredData as StudentAttendanceItem[]).map(item => (
                              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                  <h3 className="font-medium">{item.course}</h3>
                                  <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                {getStatusBadge(item.status)}
                              </div>
                            ))
                          ) : role === "teacher" ? (
                            (filteredData as TeacherClassItem[]).map(item => (
                              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                  <h3 className="font-medium">{item.course}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.time} • {item.room} • {item.students} students
                                  </p>
                                </div>
                                <Button size="sm" variant="outline">Take Attendance</Button>
                              </div>
                            ))
                          ) : (
                            (filteredData as AdminClassItem[]).map(item => (
                              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                  <h3 className="font-medium">{item.course}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {item.instructor} • {item.time} • {item.room} • {item.students} students
                                  </p>
                                </div>
                                <Button size="sm" variant="outline">View Details</Button>
                              </div>
                            ))
                          )}
                        </div>
                      </TabsContent>
                      
                      {role === "student" && (
                        <>
                          <TabsContent value="present">
                            <div className="space-y-4">
                              {(filteredData as StudentAttendanceItem[])
                                .filter(item => item.status === "present")
                                .map(item => (
                                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                      <h3 className="font-medium">{item.course}</h3>
                                      <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <Check className="h-5 w-5 text-green-500" />
                                  </div>
                                ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="absent">
                            <div className="space-y-4">
                              {(filteredData as StudentAttendanceItem[])
                                .filter(item => item.status === "absent")
                                .map(item => (
                                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                      <h3 className="font-medium">{item.course}</h3>
                                      <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <X className="h-5 w-5 text-red-500" />
                                  </div>
                                ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="late">
                            <div className="space-y-4">
                              {(filteredData as StudentAttendanceItem[])
                                .filter(item => item.status === "late")
                                .map(item => (
                                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                      <h3 className="font-medium">{item.course}</h3>
                                      <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <Clock className="h-5 w-5 text-yellow-500" />
                                  </div>
                                ))}
                            </div>
                          </TabsContent>
                        </>
                      )}
                      
                      {(role === "teacher" || role === "admin") && (
                        <TabsContent value="today">
                          <div className="space-y-4">
                            {role === "teacher" ? 
                              (filteredData as TeacherClassItem[])
                                .filter(item => item.date === new Date().toISOString().split('T')[0])
                                .map(item => (
                                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                      <h3 className="font-medium">{item.course}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {item.time} • {item.room} • {item.students} students
                                      </p>
                                    </div>
                                    <Button size="sm">Take Attendance</Button>
                                  </div>
                                ))
                             : 
                              (filteredData as AdminClassItem[])
                                .filter(item => item.date === new Date().toISOString().split('T')[0])
                                .map(item => (
                                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                      <h3 className="font-medium">{item.course}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {item.instructor} • {item.time} • {item.room} • {item.students} students
                                      </p>
                                    </div>
                                    <Button size="sm">View Details</Button>
                                  </div>
                                ))
                            }
                          </div>
                        </TabsContent>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                    <CardDescription>View and select dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                    
                    {role === "student" && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Attendance Summary</h3>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-3 bg-green-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">85%</div>
                            <div className="text-xs text-green-800">Present</div>
                          </div>
                          <div className="p-3 bg-yellow-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-yellow-600">10%</div>
                            <div className="text-xs text-yellow-800">Late</div>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-red-600">5%</div>
                            <div className="text-xs text-red-800">Absent</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {role === "teacher" && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Classes Today</h3>
                        <div className="space-y-2">
                          {teacherClasses
                            .filter(item => item.date === new Date().toISOString().split('T')[0])
                            .map(item => (
                              <div key={item.id} className="p-2 border rounded-lg">
                                <div className="font-medium">{item.course}</div>
                                <div className="text-xs text-muted-foreground">{item.time} • {item.room}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {role === "admin" && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Attendance Overview</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Overall Attendance</span>
                            <span className="font-medium">88%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: "88%" }}></div>
                          </div>
                          <Button size="sm" className="w-full" variant="outline">Generate Report</Button>
                        </div>
                      </div>
                    )}
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

export default Attendance;
