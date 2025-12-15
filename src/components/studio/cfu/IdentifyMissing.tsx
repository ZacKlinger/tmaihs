import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Search } from "lucide-react";

interface MissingElement {
  id: string;
  label: string;
  isMissing: boolean;
  explanation: string;
}

interface IdentifyMissingProps {
  id: string;
  prompt: string;
  context?: string;
  elements: MissingElement[];
  minCorrect?: number; // Minimum correct selections needed to pass
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const IdentifyMissing = ({
  id,
  prompt,
  context,
  elements,
  minCorrect = 3,
  onAnswer,
  previousAnswer,
}: IdentifyMissingProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    previousAnswer?.selected ? previousAnswer.selected.split(",").filter(Boolean) : []
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const handleToggle = (elementId: string) => {
    if (isSubmitted) return;
    setSelectedIds(prev =>
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const handleSubmit = () => {
    const missingIds = elements.filter(e => e.isMissing).map(e => e.id);
    const correctSelections = selectedIds.filter(id => missingIds.includes(id));
    const incorrectSelections = selectedIds.filter(id => !missingIds.includes(id));
    
    // Pass if got enough correct and no incorrect
    const isCorrect = correctSelections.length >= minCorrect && incorrectSelections.length === 0;
    
    setIsSubmitted(true);
    onAnswer(id, selectedIds.join(","), isCorrect);
  };

  const missingCount = elements.filter(e => e.isMissing).length;
  const correctSelections = selectedIds.filter(id => 
    elements.find(e => e.id === id)?.isMissing
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Search className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">What's missing from this prompt?</h3>
          {context && (
            <p className="text-sm text-muted-foreground mt-1">{context}</p>
          )}
        </div>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            The Prompt
          </p>
          <div className="font-mono text-sm bg-background p-3 rounded border whitespace-pre-wrap">
            {prompt}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <p className="text-sm font-medium mb-3">
            Select all elements that are missing or underspecified:
          </p>
          
          <div className="grid sm:grid-cols-2 gap-2">
            {elements.map((element) => {
              const isSelected = selectedIds.includes(element.id);
              const showResult = isSubmitted;
              const isCorrectChoice = element.isMissing === isSelected;
              
              return (
                <div
                  key={element.id}
                  onClick={() => handleToggle(element.id)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    !isSubmitted && isSelected && "border-primary bg-primary/5",
                    !isSubmitted && !isSelected && "hover:border-primary/50",
                    showResult && isSelected && element.isMissing && "border-green-500 bg-green-500/5",
                    showResult && isSelected && !element.isMissing && "border-destructive bg-destructive/5",
                    showResult && !isSelected && element.isMissing && "border-amber-500 bg-amber-500/5",
                    showResult && !isSelected && !element.isMissing && "border-green-500/50",
                    isSubmitted && "cursor-default"
                  )}
                >
                  <Checkbox
                    checked={isSelected}
                    disabled={isSubmitted}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{element.label}</span>
                      {showResult && (
                        isCorrectChoice
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          : <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                      )}
                    </div>
                    {showResult && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {element.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          className="w-full"
        >
          Check My Analysis
        </Button>
      )}

      {isSubmitted && (
        <Card className={cn(
          "border-l-4",
          correctSelections >= minCorrect ? "border-l-green-500 bg-green-500/5" : "border-l-amber-500 bg-amber-500/5"
        )}>
          <CardContent className="pt-4">
            <p className="text-sm">
              {correctSelections >= minCorrect
                ? `Excellent analysis! You identified ${correctSelections} of ${missingCount} missing elements.`
                : `You identified ${correctSelections} of ${missingCount} missing elements. Review the feedback to strengthen your prompt analysis skills.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
