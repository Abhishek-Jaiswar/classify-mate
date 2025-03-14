
import { cn } from "@/lib/utils";
import { BookOpen, Calendar, GraduationCap, Home, LayoutDashboard, LogOut, Settings, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import RoleIndicator from "./RoleIndicator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

type Role = "admin" | "teacher" | "student";

interface SidebarProps {
  role: Role;
  userName: string;
}

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
};

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["admin", "teacher", "student"] },
  { name: "Courses", href: "/courses", icon: BookOpen, roles: ["admin", "teacher", "student"] },
  { name: "Attendance", href: "/attendance", icon: Calendar, roles: ["admin", "teacher", "student"] },
  { name: "Students", href: "/students", icon: GraduationCap, roles: ["admin", "teacher"] },
  { name: "Teachers", href: "/teachers", icon: Users, roles: ["admin"] },
  { name: "Profile", href: "/profile", icon: User, roles: ["admin", "teacher", "student"] },
  { name: "Settings", href: "/settings", icon: Settings, roles: ["admin", "teacher", "student"] },
];

const Sidebar = ({ role, userName }: SidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={cn(
        "h-screen sticky top-0 flex flex-col bg-card border-r transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center p-4 h-16">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">EduSync</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="flex items-center justify-center w-full">
            <GraduationCap className="h-6 w-6 text-primary" />
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "ml-auto",
            collapsed && "mx-auto"
          )} 
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
            </svg>
          )}
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex flex-col justify-between flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation
            .filter(item => item.roles.includes(role))
            .map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                    collapsed && "mr-0"
                  )} 
                  aria-hidden="true" 
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
        </nav>
        
        <div className="px-2 space-y-2">
          <Separator />
          {!collapsed && (
            <div className="px-2 py-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{userName}</p>
                  <RoleIndicator role={role} className="mt-1" />
                </div>
              </div>
            </div>
          )}
          <Link
            to="/login"
            className={cn(
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors text-foreground hover:bg-muted",
              collapsed && "justify-center"
            )}
          >
            <LogOut
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-foreground",
                collapsed && "mr-0"
              )}
              aria-hidden="true"
            />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
