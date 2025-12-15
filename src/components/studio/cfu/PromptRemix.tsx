import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface Constraint {
  id: string;
  text: string;
  shouldChange: boolean;
  reason: string;
}

interface PromptRemixProps {
  id: string;
  originalPrompt: string;
  originalContext: string;
  newContext: string;
  constraints: Constraint[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const PromptRemix = ({
  id,
  originalPrompt,
  originalContext,
  newContext,
  constraints,
  onAnswer,
  previousAnswer,
}: PromptRemixProps) => {
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>(
    previousAnswer?.selected ? previousAnswer.selected.split(",") : []
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const handleToggle = (constraintId: string) => {
    if (isSubmitted) return;
    setSelectedConstraints(prev => 
      prev.includes(constraintId)
        ? prev.filter(id => id !== constraintId)
        : [...prev, constraintId]
    );
  };

  const handleSubmit = () => {
    const correctIds = constraints.filter(c => c.shouldChange).map(c => c.id).sort();
    const selectedIds = [...selectedConstraints].sort();
    const isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
    
    setIsSubmitted(true);
    onAnswer(id, selectedConstraints.join(","), isCorrect);
  };

  const correctCount = constraints.filter(c => c.shouldChange).length;
  const selectedCorrectCount = selectedConstraints.filter(id => 
    constraints.find(c => c.id === id)?.shouldChange
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <RefreshCw className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">Remix this prompt for a new context</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Select which constraints need to change when adapting this prompt.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-muted/30">
          <CardContent className="pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Original Context
            </p>
            <p className="text-sm mb-3">{originalContext}</p>
            <div className="font-mono text-sm bg-background p-3 rounded border">
              {originalPrompt}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-4">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-2">
              New Context
            </p>
            <p className="text-sm">{newContext}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-4">
          <p className="text-sm font-medium mb-3">
            Which constraints should be modified for the new context?
          </p>
          
          <div className="space-y-3">
            {constraints.map((constraint) => {
              const isSelected = selectedConstraints.includes(constraint.id);
              const showResult = isSubmitted;
              const isCorrectChoice = constraint.shouldChange === isSelected;
              
              return (
                <div
                  key={constraint.id}
                  onClick={() => handleToggle(constraint.id)}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                    !isSubmitted && isSelected && "border-primary bg-primary/5",
                    !isSubmitted && !isSelected && "hover:border-primary/50",
                    showResult && isCorrectChoice && "border-green-500 bg-green-500/5",
                    showResult && !isCorrectChoice && "border-destructive bg-destructive/5",
                    isSubmitted && "cursor-default"
                  )}
                >
                  <Checkbox 
                    checked={isSelected}
                    disabled={isSubmitted}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{constraint.text}</span>
                      {showResult && (
                        isCorrectChoice 
                          ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                          : <XCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    {showResult && (
                      <p className={cn(
                        "text-xs mt-1",
                        isCorrectChoice ? "text-green-700 dark:text-green-300" : "text-destructive"
                      )}>
                        {constraint.reason}
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
          Check My Selections
        </Button>
      )}

      {isSubmitted && (
        <Card className={cn(
          "border-l-4",
          selectedCorrectCount === correctCount ? "border-l-green-500 bg-green-500/5" : "border-l-amber-500 bg-amber-500/5"
        )}>
          <CardContent className="pt-4">
            <p className="text-sm">
              {selectedCorrectCount === correctCount 
                ? "You correctly identified all the constraints that need modification!"
                : `You identified ${selectedCorrectCount} of ${correctCount} constraints that need to change. Review the feedback above to understand which constraints are context-dependent.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
