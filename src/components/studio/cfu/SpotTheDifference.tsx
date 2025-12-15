import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Eye } from "lucide-react";

interface DifferenceSegment {
  id: string;
  text: string;
  isDifferent: boolean;
  effect: string;
}

interface SpotTheDifferenceProps {
  id: string;
  question: string;
  description?: string;
  promptA: string;
  promptB: string;
  segmentsB: DifferenceSegment[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const SpotTheDifference = ({
  id,
  question,
  description,
  promptA,
  promptB,
  segmentsB,
  onAnswer,
  previousAnswer,
}: SpotTheDifferenceProps) => {
  const [selectedSegments, setSelectedSegments] = useState<string[]>(
    previousAnswer?.selected ? previousAnswer.selected.split(",") : []
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const correctSegments = segmentsB.filter(s => s.isDifferent).map(s => s.id);
  const minRequired = Math.ceil(correctSegments.length * 0.7);

  const toggleSegment = (segmentId: string) => {
    if (isSubmitted) return;
    setSelectedSegments(prev =>
      prev.includes(segmentId)
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleSubmit = () => {
    const correctSelected = selectedSegments.filter(id => correctSegments.includes(id)).length;
    const incorrectSelected = selectedSegments.filter(id => !correctSegments.includes(id)).length;
    const isCorrect = correctSelected >= minRequired && incorrectSelected <= 1;
    
    setIsSubmitted(true);
    onAnswer(id, selectedSegments.join(","), isCorrect);
  };

  const allCorrect = isSubmitted && selectedSegments.every(id => correctSegments.includes(id)) && 
    correctSegments.every(id => selectedSegments.includes(id));

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Original Prompt
            </p>
            <div className="text-sm font-mono bg-muted/50 p-3 rounded whitespace-pre-wrap">
              {promptA}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Improved Prompt — Click differences
            </p>
            <div className="text-sm font-mono bg-muted/50 p-3 rounded">
              {segmentsB.map((segment) => {
                const isSelected = selectedSegments.includes(segment.id);
                const showCorrect = isSubmitted && segment.isDifferent;
                const showIncorrect = isSubmitted && isSelected && !segment.isDifferent;
                
                return (
                  <span
                    key={segment.id}
                    onClick={() => toggleSegment(segment.id)}
                    className={cn(
                      "cursor-pointer transition-all rounded px-0.5",
                      !isSubmitted && isSelected && "bg-primary/30 ring-1 ring-primary",
                      !isSubmitted && !isSelected && "hover:bg-muted",
                      showCorrect && isSelected && "bg-green-500/30 ring-1 ring-green-500",
                      showCorrect && !isSelected && "bg-amber-500/30 ring-1 ring-amber-500",
                      showIncorrect && "bg-destructive/30 ring-1 ring-destructive",
                      isSubmitted && !segment.isDifferent && !isSelected && "opacity-70"
                    )}
                  >
                    {segment.text}
                  </span>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {!isSubmitted && (
        <Button 
          onClick={handleSubmit} 
          disabled={selectedSegments.length === 0}
          className="w-full"
        >
          Check Selection ({selectedSegments.length} selected)
        </Button>
      )}

      {isSubmitted && (
        <Card className={cn(
          "border-l-4",
          allCorrect ? "border-l-green-500 bg-green-500/5" : "border-l-amber-500 bg-amber-500/5"
        )}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center gap-2">
              {allCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <p className="font-medium text-green-700 dark:text-green-300">
                    You identified all the key differences!
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-amber-500" />
                  <p className="font-medium text-amber-700 dark:text-amber-300">
                    Here's what changed and why:
                  </p>
                </>
              )}
            </div>
            
            <div className="space-y-2">
              {segmentsB.filter(s => s.isDifferent).map((segment) => (
                <div key={segment.id} className="text-sm">
                  <span className="font-mono bg-green-500/20 px-1 rounded">{segment.text}</span>
                  <span className="text-muted-foreground ml-2">→ {segment.effect}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
