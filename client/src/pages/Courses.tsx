
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@/types";

// Sample course data
const courses = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    description: "A comprehensive introduction to computer science principles, algorithms, and programming concepts.",
    progress: 75,
    credits: 3,
    enrolled: true,
    department: "Computer Science",
  },
  {
    id: "2",
    title: "Calculus II",
    instructor: "Dr. Katherine Johnson",
    description: "An advanced course in calculus, covering integration, differential equations, and series.",
    progress: 60,
    credits: 4,
    enrolled: true,
    department: "Mathematics",
  },
  {
    id: "3",
    title: "Modern Literature",
    instructor: "Prof. Maya Angelou",
    description: "Exploration of 20th and 21st century literary works and critical analysis of themes and styles.",
    progress: 90,
    credits: 3,
    enrolled: true,
    department: "English",
  },
  {
    id: "4",
    title: "Physics 101",
    instructor: "Dr. Richard Feynman",
    description: "Introduction to fundamental physics concepts, classical mechanics, and problem-solving techniques.",
    progress: 45,
    credits: 4,
    enrolled: true,
    department: "Physics",
  },
  {
    id: "5",
    title: "Organic Chemistry",
    instructor: "Dr. Marie Curie",
    description: "Study of carbon compounds, their properties, reactions, and applications in modern chemistry.",
    progress: undefined,
    credits: 4,
    enrolled: false,
    department: "Chemistry",
  },
  {
    id: "6",
    title: "World History: Modern Era",
    instructor: "Prof. Howard Zinn",
    description: "Examination of global historical events and developments from the 18th century to present day.",
    progress: undefined,
    credits: 3,
    enrolled: false,
    department: "History",
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // For demo purposes, we'll use "admin" role
  const userRole: UserRole = "admin";
  const userName = "John Doe";
  
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Student View: My Courses vs Available Courses
  const enrolledCourses = filteredCourses.filter(course => course.enrolled);
  const availableCourses = filteredCourses.filter(course => !course.enrolled);

  return (
    <div className="min-h-screen flex">
      <Sidebar role={userRole} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h1 className="text-2xl font-bold">Courses</h1>
              
              <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-8 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {userRole === "admin" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Course</DialogTitle>
                        <DialogDescription>
                          Add a new course to the system. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Course Title</Label>
                          <Input id="title" placeholder="e.g., Introduction to Computer Science" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="instructor">Instructor</Label>
                          <Input id="instructor" placeholder="e.g., Dr. Alan Turing" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="department">Department</Label>
                          <Input id="department" placeholder="e.g., Computer Science" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="credits">Credits</Label>
                          <Input id="credits" type="number" placeholder="3" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Course description..." />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Course</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                
                {userRole === "teacher" && (
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                  </Button>
                )}
              </div>
            </div>

            {userRole === "student" ? (
              <Tabs defaultValue="enrolled" className="w-full mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                  <TabsTrigger value="available">Available Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="enrolled">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        description={course.description}
                        progress={course.progress}
                        credits={course.credits}
                        enrolled={course.enrolled}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="available">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        instructor={course.instructor}
                        description={course.description}
                        progress={course.progress}
                        credits={course.credits}
                        enrolled={course.enrolled}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    instructor={course.instructor}
                    description={course.description}
                    progress={userRole === "student" ? course.progress : undefined}
                    credits={course.credits}
                    enrolled={userRole === "student" && course.enrolled}
                  />
                ))}
              </div>
            )}
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Courses;
