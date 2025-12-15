import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, User, Bot } from "lucide-react";

interface WorkSample {
  id: string;
  content: string;
  isAI: boolean;
  indicators: string[];
  explanation: string;
}

interface PatternIdentifierProps {
  id: string;
  question: string;
  description?: string;
  samples: WorkSample[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const PatternIdentifier = ({
  id,
  question,
  description,
  samples,
  onAnswer,
  previousAnswer,
}: PatternIdentifierProps) => {
  const parseAnswer = (answer: string): Record<string, boolean> => {
    try {
      return JSON.parse(answer);
    } catch {
      return {};
    }
  };

  const [classifications, setClassifications] = useState<Record<string, boolean | null>>(
    previousAnswer?.selected ? parseAnswer(previousAnswer.selected) : {}
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const handleClassify = (sampleId: string, isAI: boolean) => {
    if (isSubmitted) return;
    setClassifications(prev => ({ ...prev, [sampleId]: isAI }));
  };

  const handleSubmit = () => {
    const correctCount = samples.filter(
      sample => classifications[sample.id] === sample.isAI
    ).length;
    const isCorrect = correctCount >= Math.ceil(samples.length * 0.7);
    
    setIsSubmitted(true);
    onAnswer(id, JSON.stringify(classifications), isCorrect);
  };

  const allClassified = samples.every(sample => classifications[sample.id] !== undefined && classifications[sample.id] !== null);
  const allCorrect = isSubmitted && samples.every(
    sample => classifications[sample.id] === sample.isAI
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Bot className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {samples.map((sample, index) => {
          const classification = classifications[sample.id];
          const showResult = isSubmitted;
          const isCorrectClassification = classification === sample.isAI;

          return (
            <Card
              key={sample.id}
              className={cn(
                "transition-all",
                showResult && isCorrectClassification && "border-green-500 bg-green-500/5",
                showResult && !isCorrectClassification && "border-destructive bg-destructive/5"
              )}
            >
              <CardContent className="pt-4 space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Sample {index + 1}
                </p>
                
                <div className="text-sm bg-muted/50 p-3 rounded font-mono whitespace-pre-wrap">
                  {sample.content}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={classification === false ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleClassify(sample.id, false)}
                    disabled={isSubmitted}
                    className={cn(
                      "flex-1 gap-2",
                      showResult && !sample.isAI && "ring-2 ring-green-500"
                    )}
                  >
                    <User className="w-4 h-4" />
                    Human Written
                  </Button>
                  <Button
                    variant={classification === true ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleClassify(sample.id, true)}
                    disabled={isSubmitted}
                    className={cn(
                      "flex-1 gap-2",
                      showResult && sample.isAI && "ring-2 ring-green-500"
                    )}
                  >
                    <Bot className="w-4 h-4" />
                    AI Generated
                  </Button>
                </div>

                {showResult && (
                  <div className={cn(
                    "pt-3 border-t border-border/50",
                    isCorrectClassification ? "text-green-700 dark:text-green-300" : "text-muted-foreground"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrectClassification ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-sm font-medium">
                        {sample.isAI ? "AI Generated" : "Human Written"}
                      </span>
                    </div>
                    
                    {sample.indicators.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {sample.indicators.map((indicator, i) => (
                          <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-sm">{sample.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button 
          onClick={handleSubmit} 
          disabled={!allClassified}
          className="w-full"
        >
          Check Classifications
        </Button>
      )}

      {isSubmitted && allCorrect && (
        <Card className="border-l-4 border-l-green-500 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              Excellent pattern recognition! You correctly identified all samples.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
