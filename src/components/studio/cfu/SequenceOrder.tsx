import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, GripVertical, ArrowUpDown } from "lucide-react";

interface Step {
  id: string;
  text: string;
  correctPosition: number;
}

interface SequenceOrderProps {
  id: string;
  question: string;
  description?: string;
  steps: Step[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const SequenceOrder = ({
  id,
  question,
  description,
  steps,
  onAnswer,
  previousAnswer,
}: SequenceOrderProps) => {
  // Shuffle steps for initial display, but use previous answer if exists
  const getInitialOrder = () => {
    if (previousAnswer?.selected) {
      return previousAnswer.selected.split(",");
    }
    // Shuffle: sort by a random key
    return [...steps]
      .sort(() => Math.random() - 0.5)
      .map(s => s.id);
  };

  const [orderedIds, setOrderedIds] = useState<string[]>(getInitialOrder);
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, stepId: string) => {
    if (isSubmitted) return;
    setDraggedId(stepId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (isSubmitted || !draggedId || draggedId === targetId) return;

    const newOrder = [...orderedIds];
    const draggedIndex = newOrder.indexOf(draggedId);
    const targetIndex = newOrder.indexOf(targetId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedId);

    setOrderedIds(newOrder);
    setDraggedId(null);
  };

  const handleMoveUp = (stepId: string) => {
    if (isSubmitted) return;
    const index = orderedIds.indexOf(stepId);
    if (index <= 0) return;
    
    const newOrder = [...orderedIds];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setOrderedIds(newOrder);
  };

  const handleMoveDown = (stepId: string) => {
    if (isSubmitted) return;
    const index = orderedIds.indexOf(stepId);
    if (index >= orderedIds.length - 1) return;
    
    const newOrder = [...orderedIds];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setOrderedIds(newOrder);
  };

  const handleSubmit = () => {
    const correctOrder = [...steps]
      .sort((a, b) => a.correctPosition - b.correctPosition)
      .map(s => s.id);
    
    const isCorrect = JSON.stringify(orderedIds) === JSON.stringify(correctOrder);
    setIsSubmitted(true);
    onAnswer(id, orderedIds.join(","), isCorrect);
  };

  const getStepById = (stepId: string) => steps.find(s => s.id === stepId)!;

  const correctOrder = [...steps].sort((a, b) => a.correctPosition - b.correctPosition);
  const allCorrect = isSubmitted && orderedIds.every((stepId, index) => {
    const step = getStepById(stepId);
    return step.correctPosition === index + 1;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <ArrowUpDown className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          <p className="text-xs text-muted-foreground mb-3">
            Drag steps to reorder, or use the arrows on mobile
          </p>
          
          <div className="space-y-2">
            {orderedIds.map((stepId, index) => {
              const step = getStepById(stepId);
              const isCorrectPosition = step.correctPosition === index + 1;
              const showResult = isSubmitted;
              
              return (
                <div
                  key={stepId}
                  draggable={!isSubmitted}
                  onDragStart={(e) => handleDragStart(e, stepId)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stepId)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all",
                    !isSubmitted && "cursor-grab active:cursor-grabbing hover:border-primary/50",
                    draggedId === stepId && "opacity-50",
                    showResult && isCorrectPosition && "border-green-500 bg-green-500/5",
                    showResult && !isCorrectPosition && "border-destructive bg-destructive/5",
                    isSubmitted && "cursor-default"
                  )}
                >
                  {!isSubmitted && (
                    <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                  
                  <span className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                    showResult && isCorrectPosition && "bg-green-500 text-white",
                    showResult && !isCorrectPosition && "bg-destructive text-white",
                    !showResult && "bg-muted text-muted-foreground"
                  )}>
                    {index + 1}
                  </span>
                  
                  <span className="flex-1 text-sm">{step.text}</span>
                  
                  {showResult && (
                    isCorrectPosition 
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      : <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  )}
                  
                  {!isSubmitted && (
                    <div className="flex flex-col gap-1 md:hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleMoveUp(stepId)}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleMoveDown(stepId)}
                        disabled={index === orderedIds.length - 1}
                      >
                        ↓
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {!isSubmitted && (
        <Button onClick={handleSubmit} className="w-full">
          Check Order
        </Button>
      )}

      {isSubmitted && (
        <Card className={cn(
          "border-l-4",
          allCorrect ? "border-l-green-500 bg-green-500/5" : "border-l-amber-500 bg-amber-500/5"
        )}>
          <CardContent className="pt-4">
            {allCorrect ? (
              <p className="text-sm text-green-700 dark:text-green-300">
                Perfect! You've identified the correct sequence.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium">Correct order:</p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                  {correctOrder.map((step) => (
                    <li key={step.id}>{step.text}</li>
                  ))}
                </ol>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
