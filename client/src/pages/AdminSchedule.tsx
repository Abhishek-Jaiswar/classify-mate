import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, Plus, Filter, Users, BookOpen, GraduationCap, Clock, FileText } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock data - replace with actual API calls
const events = [
    {
        id: 1,
        title: "Spring Semester Start",
        type: "semester",
        date: "2024-01-15",
        description: "First day of Spring semester classes",
        status: "upcoming",
        affectedGroups: ["All Students", "All Faculty"],
    },
    {
        id: 2,
        title: "Course Registration Opens",
        type: "registration",
        date: "2024-02-01",
        description: "Students can begin registering for Fall 2024 courses",
        status: "upcoming",
        affectedGroups: ["All Students"],
    },
    {
        id: 3,
        title: "Spring Break",
        type: "holiday",
        date: "2024-03-15",
        description: "Spring break - no classes",
        status: "upcoming",
        affectedGroups: ["All Students", "All Faculty"],
    },
    {
        id: 4,
        title: "Final Exams Week",
        type: "academic",
        date: "2024-05-01",
        description: "Spring semester final examinations",
        status: "upcoming",
        affectedGroups: ["All Students", "All Faculty"],
    },
];

const AdminSchedule = () => {
    const role = "admin";
    const userName = "Admin User";
    const [searchQuery, setSearchQuery] = useState("");
    const [eventType, setEventType] = useState<string>("all");

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Academic Calendar</h1>
                                <p className="text-muted-foreground">Manage academic events and important dates</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add New Event
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Event</DialogTitle>
                                        <DialogDescription>
                                            Fill in the event details to add it to the academic calendar.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* Add event form will go here */}
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search events..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={eventType} onValueChange={setEventType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Event Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Events</SelectItem>
                                    <SelectItem value="semester">Semester</SelectItem>
                                    <SelectItem value="registration">Registration</SelectItem>
                                    <SelectItem value="holiday">Holiday</SelectItem>
                                    <SelectItem value="academic">Academic</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">24</div>
                                    <p className="text-xs text-muted-foreground">This semester</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">8</div>
                                    <p className="text-xs text-muted-foreground">Next 30 days</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Holidays</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">4</div>
                                    <p className="text-xs text-muted-foreground">This semester</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Registration Periods</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2</div>
                                    <p className="text-xs text-muted-foreground">This semester</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Academic Events</CardTitle>
                                <CardDescription>View and manage all academic calendar events</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Affected Groups</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {events.map((event) => (
                                            <TableRow key={event.id}>
                                                <TableCell className="font-medium">{event.title}</TableCell>
                                                <TableCell className="capitalize">{event.type}</TableCell>
                                                <TableCell>{event.date}</TableCell>
                                                <TableCell>{event.description}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {event.affectedGroups.map((group, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary"
                                                            >
                                                                {group}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                                                        {event.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="sm">
                                                        Edit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
};

export default AdminSchedule; 