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
import { ArrowLeft, GraduationCap, Mail, Phone, Building, Calendar, BookOpen, Clock, Award, Users } from "lucide-react";
import { toast } from "sonner";

// Mock data - replace with actual API call
const teacherData = {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234-567-8901",
    department: "Computer Science",
    specialization: "Machine Learning",
    courses: [
        {
            id: 1,
            name: "Data Structures",
            code: "CS201",
            students: 60,
            semester: "Spring 2024",
        },
        {
            id: 2,
            name: "AI Fundamentals",
            code: "CS301",
            students: 45,
            semester: "Spring 2024",
        },
    ],
    students: 120,
    status: "active",
    joinDate: "2020-09-01",
    schedule: [
        {
            id: 1,
            day: "Monday",
            time: "09:00 - 10:30",
            course: "Data Structures",
            room: "Room 101",
        },
        {
            id: 2,
            day: "Wednesday",
            time: "11:00 - 12:30",
            course: "AI Fundamentals",
            room: "Room 102",
        },
        {
            id: 3,
            day: "Friday",
            time: "14:00 - 15:30",
            course: "Data Structures",
            room: "Room 101",
        },
    ],
    achievements: [
        {
            id: 1,
            title: "Best Teacher Award",
            date: "2023-12-15",
            description: "Recognized for excellence in teaching and student engagement",
        },
        {
            id: 2,
            title: "Research Grant",
            date: "2023-11-20",
            description: "Received grant for AI research project",
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

const AdminTeacherDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const role = "admin";
    const userName = "Admin User";
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(teacherData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically make an API call to update the teacher
        toast.success("Teacher information updated successfully!");
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
                            <Button variant="ghost" onClick={() => navigate("/admin/teachers")}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Teachers
                            </Button>
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold">Teacher Details</h1>
                                <p className="text-muted-foreground">View and manage teacher information</p>
                            </div>
                            <Button onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? "Cancel" : "Edit Teacher"}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{teacherData.students}</div>
                                    <p className="text-xs text-muted-foreground">Current semester</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Courses</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{teacherData.courses.length}</div>
                                    <p className="text-xs text-muted-foreground">Current semester</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Department</CardTitle>
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{teacherData.department}</div>
                                    <p className="text-xs text-muted-foreground">Current department</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Join Date</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{teacherData.joinDate}</div>
                                    <p className="text-xs text-muted-foreground">Years of service</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Tabs defaultValue="profile" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="profile">Profile</TabsTrigger>
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Teacher Profile</CardTitle>
                                        <CardDescription>Basic information about the teacher</CardDescription>
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
                                                </div>
                                                <Button type="submit">Save Changes</Button>
                                            </form>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Full Name</Label>
                                                    <div className="text-sm">{teacherData.name}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Email</Label>
                                                    <div className="text-sm">{teacherData.email}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Phone</Label>
                                                    <div className="text-sm">{teacherData.phone}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Department</Label>
                                                    <div className="text-sm">{teacherData.department}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Specialization</Label>
                                                    <div className="text-sm">{teacherData.specialization}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Status</Label>
                                                    <div className="text-sm">
                                                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                                                            {teacherData.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Join Date</Label>
                                                    <div className="text-sm">{teacherData.joinDate}</div>
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
                                        <CardDescription>Courses being taught in the current semester</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {teacherData.courses.map((course) => (
                                                <Card key={course.id}>
                                                    <CardContent className="pt-6">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h3 className="font-medium">{course.name}</h3>
                                                                <p className="text-sm text-muted-foreground">{course.code}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-medium">{course.students} students</div>
                                                                <p className="text-sm text-muted-foreground">{course.semester}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="schedule">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Teaching Schedule</CardTitle>
                                        <CardDescription>Weekly teaching schedule</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {teacherData.schedule.map((slot) => (
                                                <Card key={slot.id}>
                                                    <CardContent className="pt-6">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h3 className="font-medium">{slot.course}</h3>
                                                                <p className="text-sm text-muted-foreground">{slot.room}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-medium">{slot.day}</div>
                                                                <p className="text-sm text-muted-foreground">{slot.time}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="achievements">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Teacher Achievements</CardTitle>
                                        <CardDescription>Academic and professional achievements</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {teacherData.achievements.map((achievement) => (
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

export default AdminTeacherDetails; 