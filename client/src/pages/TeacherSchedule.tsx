import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - replace with actual API calls
const weeklySchedule = [
    {
        day: "Monday",
        classes: [
            { time: "10:00 AM - 11:30 AM", course: "Introduction to Computer Science", room: "Hall 302", students: 35 },
            { time: "1:00 PM - 2:30 PM", course: "Advanced Programming", room: "Tech Building 101", students: 28 },
        ],
    },
    {
        day: "Tuesday",
        classes: [
            { time: "9:00 AM - 10:30 AM", course: "Data Structures", room: "CS Lab 204", students: 22 },
            { time: "2:00 PM - 3:30 PM", course: "Web Development", room: "Lab 105", students: 30 },
        ],
    },
    // Add more days as needed
];

const TeacherSchedule = () => {
    const role = "teacher";
    const userName = "Dr. Alan Turing";
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Teaching Schedule</h1>
                                <p className="text-muted-foreground">Manage and view your class schedule</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    Export Schedule
                                </Button>
                                <Button size="sm">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    Add New Class
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Weekly Schedule</CardTitle>
                                        <CardDescription>Your classes for the current week</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {weeklySchedule.map((day, index) => (
                                                <div key={index} className="border rounded-lg p-4">
                                                    <h3 className="font-semibold mb-3">{day.day}</h3>
                                                    <div className="space-y-3">
                                                        {day.classes.map((cls, clsIndex) => (
                                                            <div key={clsIndex} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                                        <Clock className="h-5 w-5 text-primary" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-medium">{cls.course}</div>
                                                                        <div className="text-sm text-muted-foreground">{cls.time} • {cls.room}</div>
                                                                    </div>
                                                                </div>
                                                                <Button variant="outline" size="sm">
                                                                    <Users className="h-4 w-4 mr-1" /> {cls.students}
                                                                </Button>
                                                            </div>
                                                        ))}
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
                                        <CardTitle>Calendar</CardTitle>
                                        <CardDescription>Select a date to view schedule</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={setSelectedDate}
                                            className="rounded-md border"
                                        />
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

export default TeacherSchedule; 