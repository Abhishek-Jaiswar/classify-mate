
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const Login = () => {
  const [role, setRole] = useState<"admin" | "teacher" | "student">("student");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, this would call the backend API
      console.log("Attempting login with:", { email: formData.email, password: formData.password, role });

      // Simulate API call - this would be replaced with a fetch to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, we're just checking some basic conditions
      // In a real app, we'd validate credentials against the database
      if (formData.email && formData.password) {
        toast.success(`Logged in successfully as ${role}`);
        
        // Redirect based on role
        switch (role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "teacher":
            navigate("/teacher/dashboard");
            break;
          case "student":
            navigate("/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        toast.error("Please enter valid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate form data
      if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      console.log("Attempting signup with:", { 
        email: formData.email, 
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role 
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Account created successfully! Please log in.");
      
      // Switch to login tab after successful signup
      document.getElementById("signin-trigger")?.click();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">EduSync</span>
            </Link>
            <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger id="signin-trigger" value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="#" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Login as</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["student", "teacher", "admin"] as const).map((r) => (
                          <Button
                            key={r}
                            type="button"
                            variant={role === r ? "default" : "outline"}
                            onClick={() => setRole(r)}
                            className="capitalize"
                          >
                            {r}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input 
                          id="firstName" 
                          required 
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input 
                          id="lastName" 
                          required 
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Register as</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["student", "teacher", "admin"] as const).map((r) => (
                          <Button
                            key={r}
                            type="button"
                            variant={role === r ? "default" : "outline"}
                            onClick={() => setRole(r)}
                            className="capitalize"
                          >
                            {r}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create account"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t pt-6">
                  <div className="text-sm text-muted-foreground">
                    By creating an account, you agree to our <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
