import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Users } from "lucide-react";

interface Task {
  id: string;
  description: string;
  correctPersonaId: string;
  explanation: string;
}

interface Persona {
  id: string;
  name: string;
  description: string;
}

interface PersonaTaskMatchProps {
  id: string;
  question: string;
  description?: string;
  tasks: Task[];
  personas: Persona[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const PersonaTaskMatch = ({
  id,
  question,
  description,
  tasks,
  personas,
  onAnswer,
  previousAnswer,
}: PersonaTaskMatchProps) => {
  const parseAnswer = (answer: string): Record<string, string> => {
    try {
      return JSON.parse(answer);
    } catch {
      return {};
    }
  };

  const [selections, setSelections] = useState<Record<string, string>>(
    previousAnswer?.selected ? parseAnswer(previousAnswer.selected) : {}
  );
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const handleSelect = (taskId: string, personaId: string) => {
    if (isSubmitted) return;
    setSelections(prev => ({ ...prev, [taskId]: personaId }));
  };

  const handleSubmit = () => {
    const correctCount = tasks.filter(
      task => selections[task.id] === task.correctPersonaId
    ).length;
    const isCorrect = correctCount >= Math.ceil(tasks.length * 0.7);
    
    setIsSubmitted(true);
    onAnswer(id, JSON.stringify(selections), isCorrect);
  };

  const allSelected = tasks.every(task => selections[task.id]);
  const allCorrect = isSubmitted && tasks.every(
    task => selections[task.id] === task.correctPersonaId
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => {
          const selectedPersonaId = selections[task.id];
          const isCorrectSelection = selectedPersonaId === task.correctPersonaId;
          const showResult = isSubmitted;

          return (
            <Card
              key={task.id}
              className={cn(
                "transition-all",
                showResult && isCorrectSelection && "border-green-500 bg-green-500/5",
                showResult && !isCorrectSelection && "border-destructive bg-destructive/5"
              )}
            >
              <CardContent className="pt-4 space-y-3">
                <p className="text-sm font-medium">{task.description}</p>
                
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedPersonaId || ""}
                    onValueChange={(value) => handleSelect(task.id, value)}
                    disabled={isSubmitted}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a persona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {personas.map((persona) => (
                        <SelectItem key={persona.id} value={persona.id}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{persona.name}</span>
                            <span className="text-xs text-muted-foreground">{persona.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {showResult && (
                    isCorrectSelection
                      ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      : <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  )}
                </div>

                {showResult && (
                  <p className={cn(
                    "text-sm pt-2 border-t border-border/50",
                    isCorrectSelection ? "text-green-700 dark:text-green-300" : "text-muted-foreground"
                  )}>
                    {isCorrectSelection 
                      ? task.explanation
                      : `Better match: ${personas.find(p => p.id === task.correctPersonaId)?.name}. ${task.explanation}`
                    }
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
          disabled={!allSelected}
          className="w-full"
        >
          Check Matches
        </Button>
      )}

      {isSubmitted && allCorrect && (
        <Card className="border-l-4 border-l-green-500 bg-green-500/5">
          <CardContent className="pt-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              Excellent! You correctly matched all personas to their optimal tasks.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
