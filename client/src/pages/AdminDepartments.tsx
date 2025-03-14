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
import { Building, Search, Plus, Filter, Users, BookOpen, GraduationCap, Calendar } from "lucide-react";
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

// Mock data - replace with actual API calls
const departments = [
    {
        id: 1,
        name: "Computer Science",
        code: "CS",
        head: "Dr. Alan Turing",
        students: 325,
        teachers: 15,
        courses: 24,
        budget: "$2.5M",
        status: "active",
        established: "2010",
    },
    {
        id: 2,
        name: "Engineering",
        code: "ENG",
        head: "Dr. Marie Curie",
        students: 280,
        teachers: 12,
        courses: 20,
        budget: "$2.2M",
        status: "active",
        established: "2012",
    },
    {
        id: 3,
        name: "Business",
        code: "BUS",
        head: "Dr. Adam Smith",
        students: 220,
        teachers: 10,
        courses: 18,
        budget: "$1.8M",
        status: "active",
        established: "2015",
    },
    {
        id: 4,
        name: "Arts and Humanities",
        code: "AH",
        head: "Dr. William Shakespeare",
        students: 190,
        teachers: 8,
        courses: 15,
        budget: "$1.5M",
        status: "active",
        established: "2018",
    },
];

const AdminDepartments = () => {
    const role = "admin";
    const userName = "Admin User";
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
                                <h1 className="text-2xl font-bold">Department Management</h1>
                                <p className="text-muted-foreground">Manage academic departments and programs</p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add New Department
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Department</DialogTitle>
                                        <DialogDescription>
                                            Fill in the department's information to add it to the system.
                                        </DialogDescription>
                                    </DialogHeader>
                                    {/* Add department form will go here */}
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search departments..."
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">6</div>
                                    <p className="text-xs text-muted-foreground">Active departments</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">1,015</div>
                                    <p className="text-xs text-muted-foreground">Across all departments</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">45</div>
                                    <p className="text-xs text-muted-foreground">Department faculty</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">77</div>
                                    <p className="text-xs text-muted-foreground">Department courses</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Department List</CardTitle>
                                <CardDescription>View and manage all academic departments</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Head</TableHead>
                                            <TableHead>Students</TableHead>
                                            <TableHead>Teachers</TableHead>
                                            <TableHead>Budget</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {departments.map((department) => (
                                            <TableRow key={department.id}>
                                                <TableCell className="font-medium">{department.name}</TableCell>
                                                <TableCell>{department.code}</TableCell>
                                                <TableCell>{department.head}</TableCell>
                                                <TableCell>{department.students}</TableCell>
                                                <TableCell>{department.teachers}</TableCell>
                                                <TableCell>{department.budget}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                                                        {department.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link to={`/admin/departments/${department.id}`}>View Details</Link>
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

export default AdminDepartments; 