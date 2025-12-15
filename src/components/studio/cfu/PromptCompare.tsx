import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";

interface PromptOption {
  id: string;
  prompt: string;
  isCorrect: boolean;
  annotations?: { text: string; label: string; color: string }[];
  explanation: string;
}

interface PromptCompareProps {
  id: string;
  question: string;
  context?: string;
  options: [PromptOption, PromptOption];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const PromptCompare = ({
  id,
  question,
  context,
  options,
  onAnswer,
  previousAnswer,
}: PromptCompareProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(previousAnswer?.selected || null);
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);
  const [showAnnotations, setShowAnnotations] = useState(false);

  const handleSelect = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedId) return;
    const selectedOption = options.find(o => o.id === selectedId);
    const isCorrect = selectedOption?.isCorrect || false;
    setIsSubmitted(true);
    onAnswer(id, selectedId, isCorrect);
  };

  const selectedOption = options.find(o => o.id === selectedId);
  const correctOption = options.find(o => o.isCorrect);

  const renderPromptWithAnnotations = (option: PromptOption, showHighlights: boolean) => {
    if (!showHighlights || !option.annotations) {
      return <span className="whitespace-pre-wrap">{option.prompt}</span>;
    }

    let result = option.prompt;
    const highlights: JSX.Element[] = [];
    
    option.annotations.forEach((annotation, index) => {
      const parts = result.split(annotation.text);
      if (parts.length > 1) {
        highlights.push(
          <span key={index} className="relative group">
            <span className={cn("px-1 rounded", annotation.color)}>
              {annotation.text}
            </span>
            <span className="absolute bottom-full left-0 mb-1 px-2 py-1 text-xs bg-popover text-popover-foreground rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {annotation.label}
            </span>
          </span>
        );
      }
    });

    // Simple rendering - just show the prompt with explanation below
    return (
      <div className="space-y-2">
        <span className="whitespace-pre-wrap">{option.prompt}</span>
        {option.annotations && option.annotations.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
            {option.annotations.map((annotation, i) => (
              <span key={i} className={cn("px-2 py-1 text-xs rounded", annotation.color)}>
                {annotation.label}: "{annotation.text}"
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
          {context && (
            <p className="text-sm text-muted-foreground mt-1">{context}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const showResult = isSubmitted && isSelected;
          
          return (
            <Card
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "cursor-pointer transition-all",
                !isSubmitted && isSelected && "ring-2 ring-primary",
                !isSubmitted && !isSelected && "hover:border-primary/50",
                isSubmitted && option.isCorrect && "ring-2 ring-green-500 bg-green-500/5",
                isSubmitted && isSelected && !option.isCorrect && "ring-2 ring-destructive bg-destructive/5",
                isSubmitted && "cursor-default"
              )}
            >
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Option {option.id}
                  </span>
                  {isSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {showResult && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
                
                <div className="text-sm font-mono bg-muted/50 p-3 rounded">
                  {renderPromptWithAnnotations(option, isSubmitted && showAnnotations)}
                </div>

                {isSubmitted && (isSelected || option.isCorrect) && (
                  <p className={cn(
                    "text-sm mt-3 pt-3 border-t",
                    option.isCorrect ? "text-green-700 dark:text-green-300" : "text-muted-foreground"
                  )}>
                    {option.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button 
          onClick={handleSubmit} 
          disabled={!selectedId}
          className="w-full"
        >
          Submit Choice
        </Button>
      )}

      {isSubmitted && correctOption?.annotations && (
        <Button
          variant="outline"
          onClick={() => setShowAnnotations(!showAnnotations)}
          className="w-full"
        >
          {showAnnotations ? "Hide" : "Show"} Detailed Analysis
        </Button>
      )}
    </div>
  );
};
