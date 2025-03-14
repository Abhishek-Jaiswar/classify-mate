
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import RoleIndicator from "@/components/RoleIndicator";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Calendar, Clock, Edit, GraduationCap, Mail, MapPin, Phone, User } from "lucide-react";

const Profile = () => {
  // For demo purposes, we'll use "student" role
  const role: "admin" | "teacher" | "student" = "student";
  const userName = "John Doe";

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} userName={userName} />
      
      <main className="flex-1">
        <Navbar />
        
        <PageTransition>
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">Manage your personal information and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-1">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    <Button size="icon" variant="outline" className="absolute right-0 bottom-0 rounded-full h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold">{userName}</h2>
                  <div className="mt-1">
                    <RoleIndicator role={role} />
                  </div>
                  <p className="text-muted-foreground mt-2">Student ID: ST20231124</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">john.doe@university.edu</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">123 University Ave, College Town</p>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 text-muted-foreground mr-2" />
                      <p className="text-sm">Computer Science, Year 2</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <Button className="w-full" variant="outline">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="academic">Academic</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal">
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" defaultValue="Doe" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john.doe@university.edu" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" defaultValue="+1 (555) 123-4567" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue="123 University Ave" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" defaultValue="College Town" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" defaultValue="CA" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip">Zip Code</Label>
                            <Input id="zip" defaultValue="90210" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            rows={4}
                            defaultValue="Second-year Computer Science student with a passion for software development and artificial intelligence."
                          />
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="academic">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Academic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Student ID</Label>
                              <Input defaultValue="ST20231124" readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Department</Label>
                              <Input defaultValue="Computer Science" readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Current Year</Label>
                              <Input defaultValue="2nd Year" readOnly />
                            </div>
                            <div className="space-y-2">
                              <Label>Admission Date</Label>
                              <Input defaultValue="September 2022" readOnly />
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Current Semester</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-md border">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                  <div className="font-medium">Introduction to Computer Science</div>
                                  <div className="text-sm text-muted-foreground">Dr. Jane Smith</div>
                                </div>
                              </div>
                              <div className="text-sm font-medium">Grade: A-</div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-md border">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                  <div className="font-medium">Calculus II</div>
                                  <div className="text-sm text-muted-foreground">Prof. David Chen</div>
                                </div>
                              </div>
                              <div className="text-sm font-medium">Grade: B+</div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-md border">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                  <div className="font-medium">Modern Literature</div>
                                  <div className="text-sm text-muted-foreground">Dr. Emily Johnson</div>
                                </div>
                              </div>
                              <div className="text-sm font-medium">Grade: A</div>
                            </div>
                            
                            <div className="flex items-center justify-between p-3 rounded-md border">
                              <div className="flex items-center">
                                <BookOpen className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                  <div className="font-medium">Physics 101</div>
                                  <div className="text-sm text-muted-foreground">Prof. Michael Brown</div>
                                </div>
                              </div>
                              <div className="text-sm font-medium">Grade: B</div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Academic Performance</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="text-sm">Current GPA</div>
                              <div className="font-medium">3.8/4.0</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-sm">Credits Completed</div>
                              <div className="font-medium">45/120</div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-sm">Graduation Progress</div>
                              <div className="font-medium">38%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Account Settings</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-md border">
                              <div>
                                <div className="font-medium">Change Password</div>
                                <div className="text-sm text-muted-foreground">Update your account password</div>
                              </div>
                              <Button variant="outline" size="sm">Change</Button>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 rounded-md border">
                              <div>
                                <div className="font-medium">Two-Factor Authentication</div>
                                <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                              </div>
                              <Button variant="outline" size="sm">Enable</Button>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 rounded-md border">
                              <div>
                                <div className="font-medium">Notification Preferences</div>
                                <div className="text-sm text-muted-foreground">Manage your notification settings</div>
                              </div>
                              <Button variant="outline" size="sm">Manage</Button>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Privacy Settings</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-md border">
                              <div>
                                <div className="font-medium">Profile Visibility</div>
                                <div className="text-sm text-muted-foreground">Control who can see your profile information</div>
                              </div>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 rounded-md border">
                              <div>
                                <div className="font-medium">Data Sharing</div>
                                <div className="text-sm text-muted-foreground">Manage how your data is shared with third parties</div>
                              </div>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 pt-0">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent interactions with the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { description: "Submitted assignment for Modern Literature", time: "Today, 2:30 PM", icon: BookOpen },
                    { description: "Viewed course materials for Introduction to Computer Science", time: "Yesterday, 4:15 PM", icon: BookOpen },
                    { description: "Attendance marked for Calculus II", time: "Nov 21, 10:15 AM", icon: Calendar },
                    { description: "Changed profile picture", time: "Nov 20, 3:45 PM", icon: User },
                    { description: "Enrolled in Data Structures and Algorithms", time: "Nov 18, 11:20 AM", icon: BookOpen },
                  ].map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <activity.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </PageTransition>
      </main>
    </div>
  );
};

export default Profile;
