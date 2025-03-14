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
import { Settings, Save, Database, Shield, Bell, Mail, Globe, Lock, Users, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const AdminSettings = () => {
    const role = "admin";
    const userName = "Admin User";
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">System Settings</h1>
                                <p className="text-muted-foreground">Manage system-wide configurations and preferences</p>
                            </div>
                            <Button>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>

                        <Tabs defaultValue="general" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="general">General</TabsTrigger>
                                <TabsTrigger value="security">Security</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                <TabsTrigger value="backup">Backup</TabsTrigger>
                            </TabsList>

                            <TabsContent value="general" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>General Settings</CardTitle>
                                        <CardDescription>Basic system configuration options</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Maintenance Mode</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Enable maintenance mode to restrict access to the system
                                                </p>
                                            </div>
                                            <Switch
                                                checked={maintenanceMode}
                                                onCheckedChange={setMaintenanceMode}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="systemName">System Name</Label>
                                            <Input placeholder="Enter system name" defaultValue="SCMS" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>System Description</Label>
                                            <Textarea
                                                placeholder="Enter system description"
                                                defaultValue="Educational Management System"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Time Zone</Label>
                                            <Input placeholder="Select time zone" defaultValue="UTC" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Security Settings</CardTitle>
                                        <CardDescription>Configure security-related options</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Two-Factor Authentication</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Require 2FA for all users
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Session Timeout</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Automatically log out inactive users
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Password Policy</Label>
                                            <Textarea
                                                placeholder="Enter password policy requirements"
                                                defaultValue="Minimum 8 characters, must include numbers and special characters"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Allowed IP Addresses</Label>
                                            <Textarea
                                                placeholder="Enter allowed IP addresses (one per line)"
                                                defaultValue="192.168.1.1\n10.0.0.1"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="notifications" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Settings</CardTitle>
                                        <CardDescription>Configure system notification preferences</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>System Notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Enable system-wide notifications
                                                </p>
                                            </div>
                                            <Switch
                                                checked={notificationsEnabled}
                                                onCheckedChange={setNotificationsEnabled}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Email Notifications</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Send notifications via email
                                                </p>
                                            </div>
                                            <Switch
                                                checked={emailNotifications}
                                                onCheckedChange={setEmailNotifications}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>SMTP Server</Label>
                                            <Input placeholder="Enter SMTP server address" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email Templates</Label>
                                            <Textarea
                                                placeholder="Enter email template configurations"
                                                defaultValue="Welcome Email: {name}, {role}\nPassword Reset: {reset_link}"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="backup" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Backup Settings</CardTitle>
                                        <CardDescription>Configure system backup options</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Automatic Backups</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Enable automatic system backups
                                                </p>
                                            </div>
                                            <Switch />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Backup Schedule</Label>
                                            <Input placeholder="Enter backup schedule (e.g., daily at 2 AM)" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Backup Location</Label>
                                            <Input placeholder="Enter backup storage location" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Retention Period</Label>
                                            <Input placeholder="Enter backup retention period (e.g., 30 days)" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Encrypt Backups</Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Enable encryption for backup files
                                                </p>
                                            </div>
                                            <Switch />
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

export default AdminSettings; 