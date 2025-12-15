import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Map } from "lucide-react";

interface LearningObjective {
  id: string;
  objective: string;
  shouldIntegrate: boolean;
  rationale: string;
}

interface IntegrationMapperProps {
  id: string;
  question: string;
  unitContext: string;
  objectives: LearningObjective[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const IntegrationMapper = ({
  id,
  question,
  unitContext,
  objectives,
  onAnswer,
  previousAnswer,
}: IntegrationMapperProps) => {
  const parseAnswer = (answer: string): Record<string, boolean> => {
    try {
      return JSON.parse(answer);
    } catch {
      return {};
    }
  };

  const [integrations, setIntegrations] = useState<Record<string, boolean>>(
    previousAnswer?.selected ? parseAnswer(previousAnswer.selected) : {}
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const handleToggle = (objectiveId: string) => {
    if (isSubmitted) return;
    setIntegrations(prev => ({ 
      ...prev, 
      [objectiveId]: !prev[objectiveId] 
    }));
  };

  const handleSubmit = () => {
    const correctCount = objectives.filter(
      obj => (integrations[obj.id] ?? false) === obj.shouldIntegrate
    ).length;
    const isCorrect = correctCount >= Math.ceil(objectives.length * 0.7);
    
    setIsSubmitted(true);
    onAnswer(id, JSON.stringify(integrations), isCorrect);
  };

  const allCorrect = isSubmitted && objectives.every(
    obj => (integrations[obj.id] ?? false) === obj.shouldIntegrate
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Map className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Unit Context</p>
          <p className="text-sm mt-1">{unitContext}</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Toggle AI integration for each learning objective:
        </p>

        {objectives.map((objective) => {
          const isIntegrated = integrations[objective.id] ?? false;
          const showResult = isSubmitted;
          const isCorrectChoice = isIntegrated === objective.shouldIntegrate;

          return (
            <Card
              key={objective.id}
              className={cn(
                "transition-all",
                showResult && isCorrectChoice && "border-green-500 bg-green-500/5",
                showResult && !isCorrectChoice && "border-amber-500 bg-amber-500/5"
              )}
            >
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm flex-1">{objective.objective}</p>
                  
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-xs font-medium",
                      isIntegrated ? "text-primary" : "text-muted-foreground"
                    )}>
                      {isIntegrated ? "AI-Integrated" : "No AI"}
                    </span>
                    <Switch
                      checked={isIntegrated}
                      onCheckedChange={() => handleToggle(objective.id)}
                      disabled={isSubmitted}
                    />
                    {showResult && (
                      isCorrectChoice 
                        ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        : <XCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    )}
                  </div>
                </div>

                {showResult && (
                  <p className={cn(
                    "text-sm pt-2 border-t border-border/50",
                    isCorrectChoice ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"
                  )}>
                    {objective.rationale}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!isSubmitted && (
        <Button onClick={handleSubmit} className="w-full">
          Submit Integration Map
        </Button>
      )}

      {isSubmitted && allCorrect && (
        <Card className="border-l-4 border-l-green-500 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              Your integration mapping shows strong judgment about where AI adds value.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
