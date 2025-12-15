import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Shield } from "lucide-react";

interface Guardrail {
  id: string;
  name: string;
  description: string;
  isAppropriate: boolean;
  tradeoff: string;
}

interface GuardrailDesignerProps {
  id: string;
  question: string;
  scenario: string;
  learningObjective: string;
  guardrails: Guardrail[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const GuardrailDesigner = ({
  id,
  question,
  scenario,
  learningObjective,
  guardrails,
  onAnswer,
  previousAnswer,
}: GuardrailDesignerProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    previousAnswer?.selected ? previousAnswer.selected.split(",").filter(Boolean) : []
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const appropriateIds = guardrails.filter(g => g.isAppropriate).map(g => g.id);

  const toggleGuardrail = (guardrailId: string) => {
    if (isSubmitted) return;
    setSelectedIds(prev =>
      prev.includes(guardrailId)
        ? prev.filter(id => id !== guardrailId)
        : [...prev, guardrailId]
    );
  };

  const handleSubmit = () => {
    const correctSelected = selectedIds.filter(id => appropriateIds.includes(id)).length;
    const incorrectSelected = selectedIds.filter(id => !appropriateIds.includes(id)).length;
    const isCorrect = correctSelected >= Math.ceil(appropriateIds.length * 0.7) && incorrectSelected <= 1;
    
    setIsSubmitted(true);
    onAnswer(id, selectedIds.join(","), isCorrect);
  };

  const allCorrect = isSubmitted && 
    selectedIds.length === appropriateIds.length && 
    selectedIds.every(id => appropriateIds.includes(id));

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
        </div>
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-4 space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Scenario</p>
            <p className="text-sm mt-1">{scenario}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Learning Objective</p>
            <p className="text-sm mt-1 font-medium">{learningObjective}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Select appropriate guardrails for this activity:
        </p>

        {guardrails.map((guardrail) => {
          const isSelected = selectedIds.includes(guardrail.id);
          const showResult = isSubmitted;
          const isAppropriate = guardrail.isAppropriate;

          return (
            <Card
              key={guardrail.id}
              onClick={() => toggleGuardrail(guardrail.id)}
              className={cn(
                "cursor-pointer transition-all",
                !isSubmitted && isSelected && "ring-2 ring-primary",
                !isSubmitted && !isSelected && "hover:border-primary/50",
                showResult && isAppropriate && isSelected && "ring-2 ring-green-500 bg-green-500/5",
                showResult && isAppropriate && !isSelected && "ring-2 ring-amber-500 bg-amber-500/5",
                showResult && !isAppropriate && isSelected && "ring-2 ring-destructive bg-destructive/5",
                showResult && !isAppropriate && !isSelected && "opacity-50",
                isSubmitted && "cursor-default"
              )}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleGuardrail(guardrail.id)}
                    disabled={isSubmitted}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{guardrail.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{guardrail.description}</p>
                    
                    {showResult && (isSelected || isAppropriate) && (
                      <p className={cn(
                        "text-xs mt-2 pt-2 border-t border-border/50",
                        isAppropriate ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"
                      )}>
                        <span className="font-medium">Trade-off: </span>
                        {guardrail.tradeoff}
                      </p>
                    )}
                  </div>
                  
                  {showResult && (
                    isAppropriate && isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : isSelected && !isAppropriate ? (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    ) : isAppropriate && !isSelected ? (
                      <span className="text-xs text-amber-600">Recommended</span>
                    ) : null
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button 
          onClick={handleSubmit} 
          disabled={selectedIds.length === 0}
          className="w-full"
        >
          Apply Guardrails ({selectedIds.length} selected)
        </Button>
      )}

      {isSubmitted && allCorrect && (
        <Card className="border-l-4 border-l-green-500 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              You selected the optimal guardrails for this learning context.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
