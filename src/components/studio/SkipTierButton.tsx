import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FastForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkipTierButtonProps {
  targetTier: number;
  onClick: () => void;
  disabled: boolean;
  disabledReason?: string;
}

export const SkipTierButton = ({
  targetTier,
  onClick,
  disabled,
  disabledReason,
}: SkipTierButtonProps) => {
  const button = (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "gap-2",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <FastForward className="w-4 h-4" />
      Skip to Tier {targetTier}
    </Button>
  );

  if (disabled && disabledReason) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>{disabledReason}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};
