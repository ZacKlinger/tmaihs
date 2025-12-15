import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Eye } from "lucide-react";

interface BiasSegment {
  id: string;
  text: string;
  hasBias: boolean;
  biasType?: string;
  explanation: string;
}

interface BiasSpotterProps {
  id: string;
  question: string;
  context: string;
  aiOutput: string;
  segments: BiasSegment[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const BiasSpotter = ({
  id,
  question,
  context,
  aiOutput,
  segments,
  onAnswer,
  previousAnswer,
}: BiasSpotterProps) => {
  const [selectedSegments, setSelectedSegments] = useState<string[]>(
    previousAnswer?.selected ? previousAnswer.selected.split(",").filter(Boolean) : []
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const biasedSegments = segments.filter(s => s.hasBias).map(s => s.id);

  const toggleSegment = (segmentId: string) => {
    if (isSubmitted) return;
    setSelectedSegments(prev =>
      prev.includes(segmentId)
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleSubmit = () => {
    const correctSelected = selectedSegments.filter(id => biasedSegments.includes(id)).length;
    const incorrectSelected = selectedSegments.filter(id => !biasedSegments.includes(id)).length;
    const isCorrect = correctSelected >= Math.ceil(biasedSegments.length * 0.7) && incorrectSelected <= 1;
    
    setIsSubmitted(true);
    onAnswer(id, selectedSegments.join(","), isCorrect);
  };

  const allCorrect = isSubmitted && 
    selectedSegments.every(id => biasedSegments.includes(id)) && 
    biasedSegments.every(id => selectedSegments.includes(id));

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
          <p className="text-sm text-muted-foreground mt-1">{context}</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            AI-Generated Content — Click to flag potential bias
          </p>
          
          <div className="text-sm bg-muted/50 p-4 rounded space-y-2">
            {segments.map((segment) => {
              const isSelected = selectedSegments.includes(segment.id);
              const showCorrect = isSubmitted && segment.hasBias;
              const showIncorrect = isSubmitted && isSelected && !segment.hasBias;
              
              return (
                <span
                  key={segment.id}
                  onClick={() => toggleSegment(segment.id)}
                  className={cn(
                    "cursor-pointer transition-all rounded px-1 py-0.5 inline",
                    !isSubmitted && isSelected && "bg-amber-500/30 ring-1 ring-amber-500",
                    !isSubmitted && !isSelected && "hover:bg-muted",
                    showCorrect && isSelected && "bg-green-500/30 ring-1 ring-green-500",
                    showCorrect && !isSelected && "bg-amber-500/30 ring-1 ring-amber-500 underline decoration-wavy decoration-amber-500",
                    showIncorrect && "bg-destructive/30 ring-1 ring-destructive",
                    isSubmitted && !segment.hasBias && !isSelected && "opacity-70"
                  )}
                >
                  {segment.text}{" "}
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {!isSubmitted && (
        <Button 
          onClick={handleSubmit} 
          disabled={selectedSegments.length === 0}
          className="w-full"
        >
          Check Flagged Content ({selectedSegments.length} flagged)
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
                    Excellent bias detection!
                  </p>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <p className="font-medium text-amber-700 dark:text-amber-300">
                    Here are the bias concerns:
                  </p>
                </>
              )}
            </div>
            
            <div className="space-y-2">
              {segments.filter(s => s.hasBias).map((segment) => (
                <div key={segment.id} className="text-sm border-l-2 border-amber-500 pl-3">
                  <p className="font-mono text-xs bg-amber-500/20 px-1 rounded inline">
                    "{segment.text}"
                  </p>
                  {segment.biasType && (
                    <span className="ml-2 text-xs font-medium text-amber-700 dark:text-amber-300">
                      ({segment.biasType})
                    </span>
                  )}
                  <p className="text-muted-foreground mt-1">{segment.explanation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
