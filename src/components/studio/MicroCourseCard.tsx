import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Lock, Award } from "lucide-react";
import { StudioProgressBar } from "./StudioProgressBar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CourseStatus } from "@/lib/progressComputation";

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
  courseStatus?: CourseStatus;
  isPlaceholder?: boolean;
  isLocked?: boolean;
  lockReason?: string;
  tier?: number;
  icon: LucideIcon;
  onClick: () => void;
}

export const MicroCourseCard = ({
  title,
  description,
  duration,
  mentalModel,
  progress,
  isCompleted,
  courseStatus,
  isPlaceholder,
  isLocked,
  lockReason,
  tier,
  icon: Icon,
  onClick,
}: MicroCourseCardProps) => {
  const isCredited = courseStatus === 'credited';
  
  const cardContent = (
    <Card 
      className={cn(
        "transition-all group relative overflow-hidden",
        !isLocked && !isPlaceholder && "cursor-pointer hover:shadow-lg hover:border-primary/30",
        (isPlaceholder || isLocked) && "opacity-60 cursor-not-allowed"
      )}
      onClick={() => {
        if (!isLocked && !isPlaceholder) onClick();
      }}
    >
      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Lock className="w-8 h-8" />
            <span className="text-xs font-medium">Locked</span>
          </div>
        </div>
      )}

      {/* Status badges */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
        {tier && (
          <Badge variant="outline" className="text-xs bg-background/80">
            Tier {tier}
          </Badge>
        )}
        {/* Credited badge - special styling */}
        {isCredited && (
          <Badge variant="secondary" className="text-xs bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">
            <Award className="w-3 h-3 mr-1" />
            Credited
          </Badge>
        )}
        {isCompleted && !isCredited && (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        )}
        {isPlaceholder && !isLocked && (
          <Badge variant="secondary">Coming Soon</Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg transition-colors",
            isLocked 
              ? "bg-muted text-muted-foreground"
              : isCredited
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1 pr-16">
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

        {/* Progress bar - show 100% for credited courses */}
        {(progress > 0 || isCredited) && !isPlaceholder && !isLocked && (
          <StudioProgressBar 
            progress={isCredited ? 100 : progress} 
            className={cn(
              isCredited && "[&>div]:bg-amber-500"
            )}
          />
        )}
      </CardContent>
    </Card>
  );

  if (isLocked && lockReason) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>{lockReason}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
};
