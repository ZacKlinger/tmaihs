import { cn } from "@/lib/utils";
import { TIERS, COURSE_NAMES, isTierUnlocked, isTierComplete, getTierProgress } from "@/lib/studioTiers";
import { Lock, CheckCircle2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface TierNavigationProps {
  selectedTier: number;
  onSelectTier: (tier: number) => void;
  completedCourseIds: string[];
}

export const TierNavigation = ({
  selectedTier,
  onSelectTier,
  completedCourseIds,
}: TierNavigationProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {TIERS.map((tier) => {
        const isUnlocked = isTierUnlocked(tier.id, completedCourseIds);
        const isComplete = isTierComplete(tier.id, completedCourseIds);
        const progress = getTierProgress(tier.id, completedCourseIds);
        const isSelected = selectedTier === tier.id;

        const button = (
          <button
            onClick={() => isUnlocked && onSelectTier(tier.id)}
            disabled={!isUnlocked}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              isSelected && isUnlocked && "bg-primary text-primary-foreground",
              !isSelected && isUnlocked && "bg-muted hover:bg-muted/80 text-foreground",
              !isUnlocked && "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-60"
            )}
          >
            {!isUnlocked && <Lock className="w-4 h-4" />}
            {isComplete && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            
            <span>Tier {tier.id}: {tier.name}</span>
            
            {isUnlocked && !isComplete && progress > 0 && (
              <span className="ml-2 text-xs opacity-70">
                {progress}%
              </span>
            )}

            {/* Progress bar underneath */}
            {isUnlocked && !isComplete && progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-background/20 rounded-b-lg overflow-hidden">
                <div 
                  className="h-full bg-primary-foreground/30 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </button>
        );

        return (
          <HoverCard key={tier.id} openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              {button}
            </HoverCardTrigger>
            <HoverCardContent className="w-72" align="start">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm">Tier {tier.id}: {tier.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{tier.description}</p>
                </div>
                
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Courses
                  </p>
                  <ul className="space-y-1">
                    {tier.courseIds.map((courseId) => {
                      const isCourseDone = completedCourseIds.includes(courseId);
                      return (
                        <li 
                          key={courseId}
                          className={cn(
                            "flex items-center gap-2 text-sm",
                            isCourseDone && "text-green-600 dark:text-green-400",
                            !isCourseDone && !isUnlocked && "text-muted-foreground"
                          )}
                        >
                          {isCourseDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <div className={cn(
                              "w-3.5 h-3.5 rounded-full border",
                              isUnlocked ? "border-border" : "border-muted-foreground/30"
                            )} />
                          )}
                          <span>{COURSE_NAMES[courseId] || courseId}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {!isUnlocked && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 pt-2 border-t border-border">
                    {tier.unlockCriteria}
                  </p>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
};
