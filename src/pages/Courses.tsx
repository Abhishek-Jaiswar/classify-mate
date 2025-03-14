
import CourseCard from "@/components/CourseCard";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Filter, Search } from "lucide-react";
import { useState } from "react";

// Sample course data
const sampleCourses = [
  {
    id: "1",
    title: "Introduction to Computer Science",
    instructor: "Dr. Jane Smith",
    description: "A foundational course covering fundamental concepts in computer science, programming principles, and problem-solving techniques.",
    credits: 3,
    progress: 75,
    enrolled: true,
    department: "Computer Science",
    year: "1st Year"
  },
  {
    id: "2",
    title: "Calculus II",
    instructor: "Prof. David Chen",
    description: "Advanced calculus concepts including integration techniques, differential equations, and applications to physics and engineering.",
    credits: 4,
    progress: 60,
    enrolled: true,
    department: "Mathematics",
    year: "1st Year"
  },
  {
    id: "3",
    title: "Modern Literature",
    instructor: "Dr. Emily Johnson",
    description: "Exploration of contemporary literature from around the world, focusing on themes, narrative techniques, and cultural contexts.",
    credits: 3,
    progress: 90,
    enrolled: true,
    department: "English",
    year: "2nd Year"
  },
  {
    id: "4",
    title: "Physics 101",
    instructor: "Prof. Michael Brown",
    description: "Introduction to classical mechanics, thermodynamics, and basic concepts in modern physics.",
    credits: 4,
    progress: 45,
    enrolled: true,
    department: "Physics",
    year: "1st Year"
  },
  {
    id: "5",
    title: "Introduction to Psychology",
    instructor: "Dr. Sarah Williams",
    description: "Overview of fundamental concepts in psychology, including cognition, development, social behavior, and mental health.",
    credits: 3,
    progress: undefined,
    enrolled: false,
    department: "Psychology",
    year: "1st Year"
  },
  {
    id: "6",
    title: "Data Structures and Algorithms",
    instructor: "Prof. Robert Lee",
    description: "Advanced course on data structures, algorithm design and analysis, and computational complexity.",
    credits: 4,
    progress: undefined,
    enrolled: false,
    department: "Computer Science",
    year: "2nd Year"
  },
  {
    id: "7",
    title: "World History: Modern Era",
    instructor: "Dr. Thomas Anderson",
    description: "Comprehensive study of world history from the industrial revolution to the present day, examining major historical events and their impacts.",
    credits: 3,
    progress: undefined,
    enrolled: false,
    department: "History",
    year: "1st Year"
  },
  {
    id: "8",
    title: "Organic Chemistry",
    instructor: "Prof. Jennifer Martinez",
    description: "Study of carbon compounds, reaction mechanisms, spectroscopy, and applications in materials science and medicine.",
    credits: 4,
    progress: undefined,
    enrolled: false,
    department: "Chemistry",
    year: "2nd Year"
  }
];

const Courses = () => {
  // For demo purposes, we'll use "student" role
  const role: "admin" | "teacher" | "student" = "student";
  const userName = "John Doe";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  
  // Filter courses based on search term and filters
  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || course.department === selectedDepartment;
    const matchesYear = !selectedYear || course.year === selectedYear;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });
  
  // Get unique departments and years for filters
  const departments = Array.from(new Set(sampleCourses.map(course => course.department)));
  const years = Array.from(new Set(sampleCourses.map(course => course.year)));

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Courses</h1>
                <p className="text-muted-foreground">Browse and manage your courses</p>
              </div>
              
              {role === "admin" && (
                <Button className="mt-3 sm:mt-0">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add New Course
                </Button>
              )}
            </div>

            <div className="mb-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full max-w-md grid grid-cols-3">
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="enrolled">
                    Enrolled
                    <Badge className="ml-2 bg-primary/20 text-primary border-0" variant="outline">
                      {sampleCourses.filter(c => c.enrolled).length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="available">Available</TabsTrigger>
                </TabsList>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search courses..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select
                      value={selectedDepartment || ""}
                      onValueChange={(value) => setSelectedDepartment(value || null)}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Department" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Departments</SelectItem>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={selectedYear || ""}
                      onValueChange={(value) => setSelectedYear(value || null)}
                    >
                      <SelectTrigger className="w-full sm:w-36">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Year" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Years</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
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
                
                <TabsContent value="enrolled" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses
                      .filter(course => course.enrolled)
                      .map(course => (
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
                
                <TabsContent value="available" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses
                      .filter(course => !course.enrolled)
                      .map(course => (
                        <CourseCard
                          key={course.id}
                          id={course.id}
                          title={course.title}
                          instructor={course.instructor}
                          description={course.description}
                          credits={course.credits}
                          enrolled={course.enrolled}
                        />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Courses;
