import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Workflow } from "lucide-react";

interface PromptStep {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface WorkflowBuilderProps {
  id: string;
  question: string;
  goal: string;
  prompts: PromptStep[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const WorkflowBuilder = ({
  id,
  question,
  goal,
  prompts,
  onAnswer,
  previousAnswer,
}: WorkflowBuilderProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    previousAnswer?.selected ? previousAnswer.selected.split(",").filter(Boolean) : []
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const correctIds = prompts.filter(p => p.isCorrect).map(p => p.id);

  const togglePrompt = (promptId: string) => {
    if (isSubmitted) return;
    setSelectedIds(prev =>
      prev.includes(promptId)
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    );
  };

  const handleSubmit = () => {
    const correctSelected = selectedIds.filter(id => correctIds.includes(id)).length;
    const incorrectSelected = selectedIds.filter(id => !correctIds.includes(id)).length;
    const isCorrect = correctSelected >= Math.ceil(correctIds.length * 0.8) && incorrectSelected === 0;
    
    setIsSubmitted(true);
    onAnswer(id, selectedIds.join(","), isCorrect);
  };

  const allCorrect = isSubmitted && 
    selectedIds.length === correctIds.length && 
    selectedIds.every(id => correctIds.includes(id));

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Workflow className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <p className="text-sm font-medium">Goal:</p>
          <p className="text-sm text-muted-foreground">{goal}</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Select prompts that belong in this workflow:
        </p>
        
        {prompts.map((prompt) => {
          const isSelected = selectedIds.includes(prompt.id);
          const showResult = isSubmitted;
          const isCorrectPrompt = prompt.isCorrect;

          return (
            <Card
              key={prompt.id}
              onClick={() => togglePrompt(prompt.id)}
              className={cn(
                "cursor-pointer transition-all",
                !isSubmitted && isSelected && "ring-2 ring-primary",
                !isSubmitted && !isSelected && "hover:border-primary/50",
                showResult && isCorrectPrompt && isSelected && "ring-2 ring-green-500 bg-green-500/5",
                showResult && isCorrectPrompt && !isSelected && "ring-2 ring-amber-500 bg-amber-500/5",
                showResult && !isCorrectPrompt && isSelected && "ring-2 ring-destructive bg-destructive/5",
                showResult && !isCorrectPrompt && !isSelected && "opacity-50",
                isSubmitted && "cursor-default"
              )}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => togglePrompt(prompt.id)}
                    disabled={isSubmitted}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-mono">{prompt.text}</p>
                    
                    {showResult && (isSelected || isCorrectPrompt) && (
                      <p className={cn(
                        "text-xs mt-2 pt-2 border-t border-border/50",
                        isCorrectPrompt ? "text-green-700 dark:text-green-300" : "text-destructive"
                      )}>
                        {prompt.explanation}
                      </p>
                    )}
                  </div>
                  
                  {showResult && (
                    isCorrectPrompt && isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : isSelected && !isCorrectPrompt ? (
                      <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    ) : isCorrectPrompt && !isSelected ? (
                      <span className="text-xs text-amber-600">Missed</span>
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
          Build Workflow ({selectedIds.length} selected)
        </Button>
      )}

      {isSubmitted && allCorrect && (
        <Card className="border-l-4 border-l-green-500 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              Perfect! You selected exactly the right prompts for this workflow.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
