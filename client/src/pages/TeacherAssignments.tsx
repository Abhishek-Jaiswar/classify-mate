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
import { FileText, CheckSquare, Search, Plus, Filter } from "lucide-react";

// Mock data - replace with actual API calls
const assignments = [
    {
        id: 1,
        title: "Algorithm Analysis",
        course: "Data Structures",
        submitted: 18,
        total: 22,
        dueDate: "Nov 20, 2023",
        status: "active",
    },
    {
        id: 2,
        title: "Final Project Proposal",
        course: "Advanced Programming",
        submitted: 20,
        total: 28,
        dueDate: "Nov 25, 2023",
        status: "active",
    },
    {
        id: 3,
        title: "Web Application Demo",
        course: "Web Development",
        submitted: 12,
        total: 30,
        dueDate: "Dec 5, 2023",
        status: "active",
    },
    {
        id: 4,
        title: "Midterm Exam",
        course: "Introduction to Computer Science",
        submitted: 35,
        total: 35,
        dueDate: "Oct 15, 2023",
        status: "completed",
    },
];

const TeacherAssignments = () => {
    const role = "teacher";
    const userName = "Dr. Alan Turing";
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Assignments</h1>
                                <p className="text-muted-foreground">Manage and grade student assignments</p>
                            </div>
                            <Button asChild>
                                <Link to="/teacher/assignments/new">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Assignment
                                </Link>
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search assignments..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </div>

                        <Tabs defaultValue="active" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                                <TabsTrigger value="drafts">Drafts</TabsTrigger>
                            </TabsList>

                            <TabsContent value="active" className="space-y-4">
                                {assignments
                                    .filter((assignment) => assignment.status === "active")
                                    .map((assignment) => (
                                        <Card key={assignment.id}>
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <FileText className="h-4 w-4 text-primary" />
                                                            <h3 className="font-medium">{assignment.title}</h3>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {assignment.course} • Due: {assignment.dueDate}
                                                        </p>
                                                    </div>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link to={`/teacher/assignments/${assignment.id}`}>
                                                            View Submissions
                                                        </Link>
                                                    </Button>
                                                </div>

                                                <div className="mt-4 space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Submission Progress</span>
                                                        <span>{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
                                                    </div>
                                                    <Progress value={(assignment.submitted / assignment.total) * 100} className="h-2" />
                                                    <p className="text-sm text-muted-foreground">
                                                        {assignment.submitted} of {assignment.total} students have submitted
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </TabsContent>

                            <TabsContent value="completed" className="space-y-4">
                                {assignments
                                    .filter((assignment) => assignment.status === "completed")
                                    .map((assignment) => (
                                        <Card key={assignment.id}>
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <CheckSquare className="h-4 w-4 text-green-500" />
                                                            <h3 className="font-medium">{assignment.title}</h3>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {assignment.course} • Completed on {assignment.dueDate}
                                                        </p>
                                                    </div>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link to={`/teacher/assignments/${assignment.id}`}>
                                                            View Results
                                                        </Link>
                                                    </Button>
                                                </div>

                                                <div className="mt-4 space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>Submission Rate</span>
                                                        <span>100%</span>
                                                    </div>
                                                    <Progress value={100} className="h-2" />
                                                    <p className="text-sm text-muted-foreground">
                                                        All {assignment.total} students have submitted
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </TabsContent>

                            <TabsContent value="drafts" className="space-y-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <p className="text-center text-muted-foreground">No draft assignments</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
};

export default TeacherAssignments; 