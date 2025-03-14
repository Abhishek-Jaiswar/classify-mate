
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  footer,
  children,
  className,
  onClick
}: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 shadow-subtle hover:shadow-card", 
        onClick && "cursor-pointer hover-lift",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium tracking-tight">{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="pt-1 border-t">{footer}</CardFooter>}
    </Card>
  );
};

export default DashboardCard;
