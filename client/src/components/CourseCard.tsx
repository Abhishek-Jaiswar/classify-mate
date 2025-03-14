
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  progress?: number;
  credits: number;
  enrolled?: boolean;
  className?: string;
  onClick?: () => void;
}

const CourseCard = ({
  id,
  title,
  instructor,
  description,
  progress,
  credits,
  enrolled = false,
  className,
  onClick,
}: CourseCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 shadow-subtle hover:shadow-card", 
        onClick && "cursor-pointer hover-lift",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium tracking-tight">{title}</CardTitle>
            <CardDescription>Instructor: {instructor}</CardDescription>
          </div>
          <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {credits} Credits
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Button 
          variant={enrolled ? "outline" : "default"} 
          size="sm" 
          className="w-full" 
          onClick={onClick}
        >
          {enrolled ? "View Course" : "Enroll Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
