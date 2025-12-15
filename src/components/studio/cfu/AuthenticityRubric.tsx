import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Scale } from "lucide-react";

interface Dimension {
  id: string;
  name: string;
  description: string;
  correctRange: [number, number]; // min, max acceptable values
  explanation: string;
}

interface AuthenticityRubricProps {
  id: string;
  question: string;
  studentWork: string;
  dimensions: Dimension[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const AuthenticityRubric = ({
  id,
  question,
  studentWork,
  dimensions,
  onAnswer,
  previousAnswer,
}: AuthenticityRubricProps) => {
  const parseAnswer = (answer: string): Record<string, number> => {
    try {
      return JSON.parse(answer);
    } catch {
      return {};
    }
  };

  const [ratings, setRatings] = useState<Record<string, number>>(
    previousAnswer?.selected 
      ? parseAnswer(previousAnswer.selected) 
      : Object.fromEntries(dimensions.map(d => [d.id, 50]))
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const handleRatingChange = (dimensionId: string, value: number[]) => {
    if (isSubmitted) return;
    setRatings(prev => ({ ...prev, [dimensionId]: value[0] }));
  };

  const handleSubmit = () => {
    const correctCount = dimensions.filter(dim => {
      const rating = ratings[dim.id];
      return rating >= dim.correctRange[0] && rating <= dim.correctRange[1];
    }).length;
    const isCorrect = correctCount >= Math.ceil(dimensions.length * 0.7);
    
    setIsSubmitted(true);
    onAnswer(id, JSON.stringify(ratings), isCorrect);
  };

  const isInRange = (dimensionId: string) => {
    const dim = dimensions.find(d => d.id === dimensionId);
    if (!dim) return false;
    const rating = ratings[dimensionId];
    return rating >= dim.correctRange[0] && rating <= dim.correctRange[1];
  };

  const allCorrect = isSubmitted && dimensions.every(dim => isInRange(dim.id));

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Scale className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Student Submission
          </p>
          <div className="text-sm bg-muted/50 p-4 rounded font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
            {studentWork}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Rate each dimension (0 = Very Low, 100 = Very High)
        </p>

        {dimensions.map((dimension) => {
          const rating = ratings[dimension.id];
          const showResult = isSubmitted;
          const correct = isInRange(dimension.id);

          return (
            <Card
              key={dimension.id}
              className={cn(
                "transition-all",
                showResult && correct && "border-green-500 bg-green-500/5",
                showResult && !correct && "border-amber-500 bg-amber-500/5"
              )}
            >
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{dimension.name}</p>
                    <p className="text-xs text-muted-foreground">{dimension.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold w-12 text-right">{rating}</span>
                    {showResult && (
                      correct 
                        ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                        : <XCircle className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                </div>

                <Slider
                  value={[rating]}
                  onValueChange={(value) => handleRatingChange(dimension.id, value)}
                  max={100}
                  step={5}
                  disabled={isSubmitted}
                  className={cn(
                    isSubmitted && "opacity-70"
                  )}
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Very Low</span>
                  <span>Very High</span>
                </div>

                {showResult && (
                  <p className={cn(
                    "text-sm pt-2 border-t border-border/50",
                    correct ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"
                  )}>
                    {correct 
                      ? dimension.explanation
                      : `Expected range: ${dimension.correctRange[0]}-${dimension.correctRange[1]}. ${dimension.explanation}`
                    }
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button onClick={handleSubmit} className="w-full">
          Submit Assessment
        </Button>
      )}

      {isSubmitted && allCorrect && (
        <Card className="border-l-4 border-l-green-500 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              Your authenticity assessment aligns with expert evaluation.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
