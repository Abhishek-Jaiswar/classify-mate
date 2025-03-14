
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AttendanceCardProps {
  courseName: string;
  date: string;
  status: "present" | "absent" | "late";
  percentage?: number;
  className?: string;
}

const statusStyles = {
  present: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  absent: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  late: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
};

const AttendanceCard = ({
  courseName,
  date,
  status,
  percentage,
  className,
}: AttendanceCardProps) => {
  return (
    <Card className={cn("shadow-subtle hover:shadow-card transition-all duration-200", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">{courseName}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </div>
          <div className={cn("px-2 py-1 rounded-md text-xs font-medium capitalize", statusStyles[status])}>
            {status}
          </div>
        </div>
      </CardHeader>
      {percentage !== undefined && (
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">Total Attendance:</div>
            <div className="font-medium">{percentage}%</div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default AttendanceCard;
