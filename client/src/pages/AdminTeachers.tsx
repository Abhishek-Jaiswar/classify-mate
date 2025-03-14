import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    DialogFooter,
} from "@/components/ui/dialog";
import { GraduationCap, Search, Plus, Filter, Users, BookOpen, Calendar, Building, Mail, Phone, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";

// Mock data - replace with actual API calls
const teachers = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+1 234-567-8901",
        department: "Computer Science",
        specialization: "Machine Learning",
        courses: ["Data Structures", "AI Fundamentals"],
        students: 120,
        status: "active",
        joinDate: "2020-09-01",
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        email: "michael.c@example.com",
        phone: "+1 234-567-8902",
        department: "Engineering",
        specialization: "Robotics",
        courses: ["Robotics 101", "Control Systems"],
        students: 95,
        status: "active",
        joinDate: "2019-09-01",
    },
    {
        id: 3,
        name: "Dr. Emily Brown",
        email: "emily.b@example.com",
        phone: "+1 234-567-8903",
        department: "Business",
        specialization: "Finance",
        courses: ["Financial Management", "Investment Analysis"],
        students: 150,
        status: "active",
        joinDate: "2021-09-01",
    },
    {
        id: 4,
        name: "Prof. David Wilson",
        email: "david.w@example.com",
        phone: "+1 234-567-8904",
        department: "Arts and Humanities",
        specialization: "Literature",
        courses: ["Modern Literature", "Creative Writing"],
        students: 80,
        status: "active",
        joinDate: "2022-09-01",
    },
];

const departments = [
    "Computer Science",
    "Engineering",
    "Business",
    "Arts and Humanities",
    "Science",
    "Mathematics",
];

const specializations = [
    "Machine Learning",
    "Robotics",
    "Finance",
    "Literature",
    "Physics",
    "Chemistry",
    "Mathematics",
    "History",
];

const AdminTeachers = () => {
    const role = "admin";
    const userName = "Admin User";
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        specialization: "",
        courses: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically make an API call to add the teacher
        toast.success("Teacher added successfully!");
        setIsAddDialogOpen(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            department: "",
            specialization: "",
            courses: "",
        });
    };

    const handleDelete = () => {
        if (selectedTeacher) {
            // Here you would typically make an API call to delete the teacher
            toast.success("Teacher deleted successfully!");
            setIsDeleteDialogOpen(false);
            setSelectedTeacher(null);
        }
    };

    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment;
        const matchesSpecialization = selectedSpecialization === "all" || teacher.specialization === selectedSpecialization;
        return matchesSearch && matchesDepartment && matchesSpecialization;
    });

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Teacher Management</h1>
                                <p className="text-muted-foreground">Manage teacher records and information</p>
                            </div>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add New Teacher
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Teacher</DialogTitle>
                                        <DialogDescription>
                                            Fill in the teacher's information to add them to the system.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="department">Department</Label>
                                            <Select
                                                value={formData.department}
                                                onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments.map((dept) => (
                                                        <SelectItem key={dept} value={dept}>
                                                            {dept}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="specialization">Specialization</Label>
                                            <Select
                                                value={formData.specialization}
                                                onValueChange={(value) => setFormData(prev => ({ ...prev, specialization: value }))}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select specialization" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {specializations.map((spec) => (
                                                        <SelectItem key={spec} value={spec}>
                                                            {spec}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="courses">Courses</Label>
                                            <Input
                                                id="courses"
                                                name="courses"
                                                value={formData.courses}
                                                onChange={handleInputChange}
                                                placeholder="Enter courses separated by commas"
                                                required
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Add Teacher</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search teachers..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept} value={dept}>
                                            {dept}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Specialization" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Specializations</SelectItem>
                                    {specializations.map((spec) => (
                                        <SelectItem key={spec} value={spec}>
                                            {spec}
                                        </SelectItem>
                                    ))}
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
                                    <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">75</div>
                                    <p className="text-xs text-muted-foreground">+5% from last year</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">72</div>
                                    <p className="text-xs text-muted-foreground">96% of total teachers</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Average Students</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">111</div>
                                    <p className="text-xs text-muted-foreground">Per teacher</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Departments</CardTitle>
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">6</div>
                                    <p className="text-xs text-muted-foreground">Active departments</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Teacher List</CardTitle>
                                <CardDescription>View and manage all teacher records</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Specialization</TableHead>
                                            <TableHead>Courses</TableHead>
                                            <TableHead>Students</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Join Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredTeachers.map((teacher) => (
                                            <TableRow key={teacher.id}>
                                                <TableCell className="font-medium">{teacher.name}</TableCell>
                                                <TableCell>{teacher.department}</TableCell>
                                                <TableCell>{teacher.specialization}</TableCell>
                                                <TableCell>{teacher.courses.join(", ")}</TableCell>
                                                <TableCell>{teacher.students}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                                                        {teacher.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{teacher.joinDate}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link to={`/admin/teachers/${teacher.id}`}>
                                                                <Edit2 className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedTeacher(teacher.id);
                                                                setIsDeleteDialogOpen(true);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
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

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Teacher</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this teacher? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminTeachers; 