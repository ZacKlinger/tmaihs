import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CFUOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface CFUQuestionProps {
  id: string;
  question: string;
  options: CFUOption[];
  type: "multiple-choice" | "spot-the-better-prompt" | "identify-mental-model";
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { correct: boolean; selectedAnswer: string };
}

export const CFUQuestion = ({
  id,
  question,
  options,
  type,
  onAnswer,
  previousAnswer,
}: CFUQuestionProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(previousAnswer?.selectedAnswer || null);
  const [hasSubmitted, setHasSubmitted] = useState(!!previousAnswer);
  const [showExplanation, setShowExplanation] = useState(!!previousAnswer);

  const handleSelect = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedId || hasSubmitted) return;
    const selected = options.find((o) => o.id === selectedId);
    if (!selected) return;
    setHasSubmitted(true);
    setShowExplanation(true);
    onAnswer(id, selectedId, selected.isCorrect);
  };

  const getTypeLabel = () => {
    switch (type) {
      case "spot-the-better-prompt":
        return "Spot the Better Prompt";
      case "identify-mental-model":
        return "Identify the Mental Model";
      default:
        return "Check Your Understanding";
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle className="w-4 h-4" />
          <span>{getTypeLabel()}</span>
        </div>
        
        <p className="font-medium text-foreground">{question}</p>
        
        <div className="space-y-2">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const showResult = hasSubmitted && isSelected;
            
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={hasSubmitted}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all",
                  "hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20",
                  isSelected && !hasSubmitted && "border-primary bg-primary/5",
                  showResult && option.isCorrect && "border-green-500 bg-green-500/10",
                  showResult && !option.isCorrect && "border-destructive bg-destructive/10",
                  hasSubmitted && !isSelected && option.isCorrect && "border-green-500/50 bg-green-500/5",
                  hasSubmitted && "cursor-default"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm">{option.text}</p>
                  </div>
                  {showResult && (
                    option.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive shrink-0" />
                    )
                  )}
                  {hasSubmitted && !isSelected && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-500/70 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {!hasSubmitted && (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedId}
            className="w-full"
          >
            Check Answer
          </Button>
        )}

        {showExplanation && selectedId && (
          <div className={cn(
            "p-4 rounded-lg text-sm",
            options.find(o => o.id === selectedId)?.isCorrect 
              ? "bg-green-500/10 text-green-700 dark:text-green-300"
              : "bg-amber-500/10 text-amber-700 dark:text-amber-300"
          )}>
            {options.find(o => o.id === selectedId)?.isCorrect ? (
              <p><strong>Correct!</strong> {options.find(o => o.id === selectedId)?.explanation}</p>
            ) : (
              <p><strong>Not quite.</strong> {options.find(o => o.isCorrect)?.explanation}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
