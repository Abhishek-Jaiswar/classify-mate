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
import { BarChart4, Search, Download, Filter, Users, BookOpen, GraduationCap, Calendar, DollarSign, FileText } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock data - replace with actual API calls
const reports = [
    {
        id: 1,
        title: "Student Enrollment Report",
        type: "academic",
        description: "Detailed analysis of student enrollment trends and statistics",
        lastGenerated: "2024-02-15",
        size: "2.4 MB",
        status: "ready",
    },
    {
        id: 2,
        title: "Faculty Performance Report",
        type: "academic",
        description: "Evaluation of faculty performance and teaching metrics",
        lastGenerated: "2024-02-14",
        size: "1.8 MB",
        status: "ready",
    },
    {
        id: 3,
        title: "Financial Summary Report",
        type: "financial",
        description: "Comprehensive financial overview and budget analysis",
        lastGenerated: "2024-02-13",
        size: "3.2 MB",
        status: "ready",
    },
    {
        id: 4,
        title: "Course Completion Report",
        type: "academic",
        description: "Analysis of course completion rates and student performance",
        lastGenerated: "2024-02-12",
        size: "1.5 MB",
        status: "ready",
    },
];

const AdminReports = () => {
    const role = "admin";
    const userName = "Admin User";
    const [searchQuery, setSearchQuery] = useState("");
    const [reportType, setReportType] = useState<string>("all");

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Reports</h1>
                                <p className="text-muted-foreground">Generate and manage administrative reports</p>
                            </div>
                            <Button>
                                <FileText className="h-4 w-4 mr-2" />
                                Generate New Report
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search reports..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Report Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Reports</SelectItem>
                                    <SelectItem value="academic">Academic</SelectItem>
                                    <SelectItem value="financial">Financial</SelectItem>
                                    <SelectItem value="administrative">Administrative</SelectItem>
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
                                    <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">24</div>
                                    <p className="text-xs text-muted-foreground">Generated reports</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Academic Reports</CardTitle>
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Financial Reports</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">8</div>
                                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                                    <BarChart4 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2.4 GB</div>
                                    <p className="text-xs text-muted-foreground">Of 10 GB total</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Available Reports</CardTitle>
                                <CardDescription>View and download generated reports</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Last Generated</TableHead>
                                            <TableHead>Size</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {reports.map((report) => (
                                            <TableRow key={report.id}>
                                                <TableCell className="font-medium">{report.title}</TableCell>
                                                <TableCell className="capitalize">{report.type}</TableCell>
                                                <TableCell>{report.description}</TableCell>
                                                <TableCell>{report.lastGenerated}</TableCell>
                                                <TableCell>{report.size}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                                                        {report.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="sm">
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Download
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

export default AdminReports; 