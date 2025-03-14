
import AttendanceCard from "@/components/AttendanceCard";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, CheckSquare, Circle, Clock, Download, Filter, HelpCircle, XSquare } from "lucide-react";
import { useState } from "react";

// Sample attendance data
const attendanceData = [
  { id: 1, courseName: "Introduction to Computer Science", date: "Nov 22, 2023", status: "present", percentage: 92 },
  { id: 2, courseName: "Calculus II", date: "Nov 21, 2023", status: "absent", percentage: 85 },
  { id: 3, courseName: "Modern Literature", date: "Nov 20, 2023", status: "present", percentage: 95 },
  { id: 4, courseName: "Physics 101", date: "Nov 20, 2023", status: "late", percentage: 90 },
  { id: 5, courseName: "Introduction to Computer Science", date: "Nov 15, 2023", status: "present", percentage: 92 },
  { id: 6, courseName: "Calculus II", date: "Nov 14, 2023", status: "present", percentage: 85 },
  { id: 7, courseName: "Modern Literature", date: "Nov 13, 2023", status: "late", percentage: 95 },
  { id: 8, courseName: "Physics 101", date: "Nov 13, 2023", status: "present", percentage: 90 },
];

// Sample attendance summary data
const attendanceSummary = [
  { courseName: "Introduction to Computer Science", present: 24, absent: 2, late: 1, total: 27 },
  { courseName: "Calculus II", present: 18, absent: 3, late: 2, total: 23 },
  { courseName: "Modern Literature", present: 20, absent: 1, late: 1, total: 22 },
  { courseName: "Physics 101", present: 19, absent: 2, late: 0, total: 21 },
];

const calculatePercentage = (value: number, total: number) => {
  return Math.round((value / total) * 100);
};

const Attendance = () => {
  // For demo purposes, we'll use "student" role
  const role: "admin" | "teacher" | "student" = "student";
  const userName = "John Doe";
  
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  
  // Get unique course names for filter
  const courseNames = Array.from(new Set(attendanceData.map(item => item.courseName)));
  
  // Filter attendance data
  const filteredData = attendanceData.filter(item => {
    const matchesCourse = !selectedCourse || item.courseName === selectedCourse;
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    return matchesCourse && matchesStatus;
  });

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Attendance</h1>
                <p className="text-muted-foreground">Track and manage attendance records</p>
              </div>
              
              {role === "teacher" && (
                <Button className="mt-3 sm:mt-0">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Take Attendance
                </Button>
              )}
              
              {role === "admin" && (
                <Button className="mt-3 sm:mt-0">
                  <Download className="mr-2 h-4 w-4" />
                  Export Records
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Overall Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {attendanceSummary.map((course, index) => {
                      const presentPercentage = calculatePercentage(course.present, course.total);
                      const absentPercentage = calculatePercentage(course.absent, course.total);
                      const latePercentage = calculatePercentage(course.late, course.total);
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-sm">{course.courseName}</div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="p-2">
                                  <div className="text-xs space-y-1">
                                    <div>Present: {course.present} days</div>
                                    <div>Absent: {course.absent} days</div>
                                    <div>Late: {course.late} days</div>
                                    <div>Total Classes: {course.total}</div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="flex h-2 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                            <div 
                              className="bg-green-500" 
                              style={{ width: `${presentPercentage}%` }} 
                            />
                            <div 
                              className="bg-yellow-500" 
                              style={{ width: `${latePercentage}%` }} 
                            />
                            <div 
                              className="bg-red-500" 
                              style={{ width: `${absentPercentage}%` }} 
                            />
                          </div>
                          <div className="flex text-xs">
                            <div className="flex items-center mr-4">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                              <span>Present ({presentPercentage}%)</span>
                            </div>
                            <div className="flex items-center mr-4">
                              <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1" />
                              <span>Late ({latePercentage}%)</span>
                            </div>
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
                              <span>Absent ({absentPercentage}%)</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Today's Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { course: "Introduction to Computer Science", time: "10:00 AM", status: "completed" },
                      { course: "Calculus II", time: "1:00 PM", status: "upcoming" },
                      { course: "Modern Literature", time: "3:00 PM", status: "upcoming" },
                    ].map((cls, index) => (
                      <div key={index} className="flex items-center p-3 rounded-md border bg-card">
                        <div className="mr-3">
                          {cls.status === "completed" ? (
                            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
                          ) : (
                            <Circle className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{cls.course}</div>
                          <div className="text-xs flex items-center text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {cls.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-lg">Attendance Records</CardTitle>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-0">
                    <Select
                      value={selectedCourse || ""}
                      onValueChange={(value) => setSelectedCourse(value || null)}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="All Courses" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Courses</SelectItem>
                        {courseNames.map(course => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={selectedStatus || ""}
                      onValueChange={(value) => setSelectedStatus(value || null)}
                    >
                      <SelectTrigger className="w-full sm:w-36">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="All Statuses" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="w-full max-w-xs grid grid-cols-2 mb-4">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="list">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredData.map((record) => (
                        <AttendanceCard
                          key={record.id}
                          courseName={record.courseName}
                          date={record.date}
                          status={record.status as "present" | "absent" | "late"}
                          percentage={record.percentage}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="calendar">
                    <div className="bg-card border rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Calendar view will be implemented in the next update.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Attendance;
