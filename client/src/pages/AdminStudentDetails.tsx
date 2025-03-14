import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, GraduationCap, Mail, Phone, Building, Calendar, BookOpen, Clock, Award } from "lucide-react";
import { toast } from "sonner";

// Mock data - replace with actual API call
const studentData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8901",
    department: "Computer Science",
    year: "Junior",
    gpa: 3.8,
    status: "active",
    enrollmentDate: "2022-09-01",
    courses: [
        {
            id: 1,
            name: "Data Structures",
            code: "CS201",
            grade: "A",
            credits: 3,
            semester: "Spring 2024",
        },
        {
            id: 2,
            name: "Database Systems",
            code: "CS301",
            grade: "A-",
            credits: 3,
            semester: "Spring 2024",
        },
        {
            id: 3,
            name: "Software Engineering",
            code: "CS401",
            grade: "B+",
            credits: 3,
            semester: "Spring 2024",
        },
    ],
    attendance: {
        totalClasses: 45,
        attended: 42,
        percentage: 93.3,
    },
    achievements: [
        {
            id: 1,
            title: "Dean's List",
            date: "2023-12-15",
            description: "Achieved academic excellence for Fall 2023 semester",
        },
        {
            id: 2,
            title: "Programming Competition Winner",
            date: "2023-11-20",
            description: "First place in the annual programming competition",
        },
    ],
};

const departments = [
    "Computer Science",
    "Engineering",
    "Business",
    "Arts and Humanities",
    "Science",
    "Mathematics",
];

const years = ["Freshman", "Sophomore", "Junior", "Senior"];

const AdminStudentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const role = "admin";
    const userName = "Admin User";
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(studentData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically make an API call to update the student
        toast.success("Student information updated successfully!");
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <Button variant="ghost" onClick={() => navigate("/admin/students")}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Students
                            </Button>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold">Student Details</h1>
                                <p className="text-muted-foreground">View and manage student information</p>
                            </div>
                            <Button onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? "Cancel" : "Edit Student"}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">GPA</CardTitle>
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{studentData.gpa}</div>
                                    <p className="text-xs text-muted-foreground">Current GPA</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{studentData.attendance.percentage}%</div>
                                    <p className="text-xs text-muted-foreground">
                                        {studentData.attendance.attended} of {studentData.attendance.totalClasses} classes
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Courses</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{studentData.courses.length}</div>
                                    <p className="text-xs text-muted-foreground">Current semester</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{studentData.achievements.length}</div>
                                    <p className="text-xs text-muted-foreground">Total achievements</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="profile" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Student Profile</CardTitle>
                                        <CardDescription>Basic information about the student</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {isEditing ? (
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                        <Label htmlFor="year">Year</Label>
                                                        <Select
                                                            value={formData.year}
                                                            onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select year" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {years.map((year) => (
                                                                    <SelectItem key={year} value={year}>
                                                                        {year}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="gpa">GPA</Label>
                                                        <Input
                                                            id="gpa"
                                                            name="gpa"
                                                            type="number"
                                                            step="0.1"
                                                            min="0"
                                                            max="4"
                                                            value={formData.gpa}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <Button type="submit">Save Changes</Button>
                                            </form>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Full Name</Label>
                                                    <div className="text-sm">{studentData.name}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Email</Label>
                                                    <div className="text-sm">{studentData.email}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Phone</Label>
                                                    <div className="text-sm">{studentData.phone}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Department</Label>
                                                    <div className="text-sm">{studentData.department}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Year</Label>
                                                    <div className="text-sm">{studentData.year}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>GPA</Label>
                                                    <div className="text-sm">{studentData.gpa}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Status</Label>
                                                    <div className="text-sm">
                                                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                                                            {studentData.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Enrollment Date</Label>
                                                    <div className="text-sm">{studentData.enrollmentDate}</div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="courses">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Courses</CardTitle>
                                        <CardDescription>Courses enrolled in the current semester</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {studentData.courses.map((course) => (
                                                <Card key={course.id}>
                                                    <CardContent className="pt-6">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h3 className="font-medium">{course.name}</h3>
                                                                <p className="text-sm text-muted-foreground">{course.code}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-medium">{course.grade}</div>
                                                                <p className="text-sm text-muted-foreground">{course.credits} credits</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mt-2">{course.semester}</p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="attendance">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Attendance Record</CardTitle>
                                        <CardDescription>Detailed attendance information</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium">Overall Attendance</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {studentData.attendance.attended} of {studentData.attendance.totalClasses} classes
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold">{studentData.attendance.percentage}%</div>
                                                    <p className="text-sm text-muted-foreground">Attendance Rate</p>
                                                </div>
                                            </div>
                                            {/* Add attendance chart or detailed records here */}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="achievements">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Student Achievements</CardTitle>
                                        <CardDescription>Academic and extracurricular achievements</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {studentData.achievements.map((achievement) => (
                                                <Card key={achievement.id}>
                                                    <CardContent className="pt-6">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h3 className="font-medium">{achievement.title}</h3>
                                                                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-sm text-muted-foreground">{achievement.date}</div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
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

export default AdminStudentDetails; 