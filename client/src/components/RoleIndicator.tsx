
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Role = "admin" | "teacher" | "student";

interface RoleIndicatorProps {
  role: Role;
  className?: string;
}

const roleStyles = {
  admin: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  teacher: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  student: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
};

const RoleIndicator = ({ role, className }: RoleIndicatorProps) => {
  return (
    <Badge variant="outline" className={cn("py-1 px-2 uppercase text-xs font-medium tracking-wider", roleStyles[role], className)}>
      {role}
    </Badge>
  );
};

export default RoleIndicator;
