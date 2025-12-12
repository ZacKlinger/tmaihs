import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StudioProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export const StudioProgressBar = ({ progress, label, className }: StudioProgressBarProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
      )}
      <Progress value={progress} className="h-2" />
    </div>
  );
};
