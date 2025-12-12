import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";
import { StudioProgressBar } from "./StudioProgressBar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MicroCourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  mentalModel: string;
  tags: {
    tasks: string[];
    subjects: string[];
  };
  progress: number;
  isCompleted: boolean;
  isPlaceholder?: boolean;
  icon: LucideIcon;
  onClick: () => void;
}

export const MicroCourseCard = ({
  title,
  description,
  duration,
  mentalModel,
  tags,
  progress,
  isCompleted,
  isPlaceholder,
  icon: Icon,
  onClick,
}: MicroCourseCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg hover:border-primary/30",
        "group relative overflow-hidden",
        isPlaceholder && "opacity-60"
      )}
      onClick={onClick}
    >
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
      )}
      
      {isPlaceholder && (
        <Badge variant="secondary" className="absolute top-3 right-3">
          Coming Soon
        </Badge>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {mentalModel}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1">
          {tags.tasks.slice(0, 2).map((task) => (
            <Badge key={task} variant="secondary" className="text-xs">
              {task}
            </Badge>
          ))}
        </div>

        {progress > 0 && !isPlaceholder && (
          <StudioProgressBar progress={progress} />
        )}
      </CardContent>
    </Card>
  );
};
