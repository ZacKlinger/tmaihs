import { cn } from "@/lib/utils";
import { TIERS, isTierUnlocked, isTierComplete, getTierProgress } from "@/lib/studioTiers";
import { Lock, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <div className="flex gap-2 flex-wrap">
        {TIERS.map((tier) => {
          const isUnlocked = isTierUnlocked(tier.id, completedCourseIds);
          const isComplete = isTierComplete(tier.id, completedCourseIds);
          const progress = getTierProgress(tier.id, completedCourseIds);
          const isSelected = selectedTier === tier.id;

          const button = (
            <button
              key={tier.id}
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

          if (!isUnlocked) {
            return (
              <Tooltip key={tier.id}>
                <TooltipTrigger asChild>
                  {button}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tier.unlockCriteria}</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return button;
        })}
      </div>
    </TooltipProvider>
  );
};
