import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, Filter, Send, User, Clock, BookOpen } from "lucide-react";

// Mock data - replace with actual API calls
const messages = [
    {
        id: 1,
        student: {
            name: "Emma Johnson",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        },
        course: "Introduction to Computer Science",
        message: "I have a question about the last lecture on recursion. Could you please explain the concept of tail recursion?",
        time: "2 hours ago",
        status: "unread",
    },
    {
        id: 2,
        student: {
            name: "Michael Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
        course: "Advanced Programming",
        message: "Regarding the project deadline, could I get an extension? I'm working on the final implementation.",
        time: "Yesterday",
        status: "read",
    },
    {
        id: 3,
        student: {
            name: "Sophia Williams",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
        },
        course: "Data Structures",
        message: "Having trouble with the linked list implementation. Could you review my code?",
        time: "2 days ago",
        status: "read",
    },
];

const TeacherMessages = () => {
    const role = "teacher";
    const userName = "Dr. Alan Turing";
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
    const [replyText, setReplyText] = useState("");

    return (
        <div className="min-h-screen flex">
            <Sidebar role={role} userName={userName} />

            <main className="flex-1">
                <Navbar />

                <PageTransition>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Messages</h1>
                                <p className="text-muted-foreground">Communicate with your students</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search messages..."
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

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Conversations</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`p-4 cursor-pointer hover:bg-muted/50 ${selectedMessage?.id === message.id ? "bg-muted" : ""
                                                        }`}
                                                    onClick={() => setSelectedMessage(message)}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <User className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium">{message.student.name}</p>
                                                                <span className="text-xs text-muted-foreground">{message.time}</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground line-clamp-1">{message.message}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <BookOpen className="h-3 w-3 text-muted-foreground" />
                                                                <span className="text-xs text-muted-foreground">{message.course}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="lg:col-span-2">
                                {selectedMessage ? (
                                    <Card>
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <User className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <CardTitle className="text-base">{selectedMessage.student.name}</CardTitle>
                                                        <CardDescription>{selectedMessage.course}</CardDescription>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-muted-foreground">{selectedMessage.time}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="bg-muted p-4 rounded-lg">
                                                    <p className="text-sm">{selectedMessage.message}</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <Textarea
                                                        placeholder="Type your reply..."
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                        className="min-h-[100px]"
                                                    />
                                                    <div className="flex justify-end">
                                                        <Button>
                                                            <Send className="h-4 w-4 mr-2" />
                                                            Send Reply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="text-center text-muted-foreground">
                                                <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                                                <p>Select a conversation to view messages</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
};

export default TeacherMessages; 