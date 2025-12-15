import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Tag } from "lucide-react";

interface PromptSegment {
  id: string;
  text: string;
  correctLabel: string;
}

interface AnnotatePromptProps {
  id: string;
  question: string;
  description?: string;
  segments: PromptSegment[];
  labels: string[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const AnnotatePrompt = ({
  id,
  question,
  description,
  segments,
  labels,
  onAnswer,
  previousAnswer,
}: AnnotatePromptProps) => {
  const parseInitialAnnotations = () => {
    if (!previousAnswer?.selected) return {};
    try {
      return JSON.parse(previousAnswer.selected) as Record<string, string>;
    } catch {
      return {};
    }
  };

  const [annotations, setAnnotations] = useState<Record<string, string>>(parseInitialAnnotations);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  const handleSegmentClick = (segmentId: string) => {
    if (isSubmitted) return;
    setSelectedSegment(selectedSegment === segmentId ? null : segmentId);
  };

  const handleLabelSelect = (label: string) => {
    if (!selectedSegment || isSubmitted) return;
    setAnnotations(prev => ({
      ...prev,
      [selectedSegment]: label,
    }));
    setSelectedSegment(null);
  };

  const handleSubmit = () => {
    const correctCount = segments.filter(
      seg => annotations[seg.id] === seg.correctLabel
    ).length;
    const isCorrect = correctCount === segments.length;
    
    setIsSubmitted(true);
    onAnswer(id, JSON.stringify(annotations), isCorrect);
  };

  const annotatedCount = Object.keys(annotations).length;
  const correctCount = segments.filter(
    seg => annotations[seg.id] === seg.correctLabel
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Tag className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
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
            Click each highlighted segment, then select the appropriate label
          </p>
          
          <div className="font-mono text-sm bg-muted/50 p-4 rounded space-y-2">
            {segments.map((segment) => {
              const annotation = annotations[segment.id];
              const isSelected = selectedSegment === segment.id;
              const showResult = isSubmitted;
              const isCorrect = annotation === segment.correctLabel;
              
              return (
                <span
                  key={segment.id}
                  onClick={() => handleSegmentClick(segment.id)}
                  className={cn(
                    "inline-block px-2 py-1 rounded cursor-pointer transition-all mr-1 mb-1",
                    !isSubmitted && !annotation && "bg-primary/20 hover:bg-primary/30",
                    !isSubmitted && annotation && "bg-secondary text-secondary-foreground",
                    isSelected && "ring-2 ring-primary",
                    showResult && isCorrect && "bg-green-500/20 text-green-700 dark:text-green-300",
                    showResult && !isCorrect && annotation && "bg-destructive/20 text-destructive",
                    showResult && !isCorrect && !annotation && "bg-amber-500/20 text-amber-700 dark:text-amber-300",
                    isSubmitted && "cursor-default"
                  )}
                >
                  {segment.text}
                  {annotation && !isSubmitted && (
                    <span className="ml-2 text-xs opacity-70">({annotation})</span>
                  )}
                  {showResult && (
                    <span className="ml-2 inline-flex items-center gap-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-destructive" />
                          <span className="text-xs">→ {segment.correctLabel}</span>
                        </>
                      )}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedSegment && !isSubmitted && (
        <Card className="border-primary">
          <CardContent className="pt-4">
            <p className="text-sm font-medium mb-3">
              Label this segment: "{segments.find(s => s.id === selectedSegment)?.text}"
            </p>
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <Button
                  key={label}
                  variant={annotations[selectedSegment] === label ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLabelSelect(label)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isSubmitted && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            {annotatedCount} of {segments.length} segments labeled
          </p>
          <Button
            onClick={handleSubmit}
            disabled={annotatedCount < segments.length}
            className="w-full"
          >
            Check Annotations
          </Button>
        </div>
      )}

      {isSubmitted && (
        <Card className={cn(
          "border-l-4",
          correctCount === segments.length ? "border-l-green-500 bg-green-500/5" : "border-l-amber-500 bg-amber-500/5"
        )}>
          <CardContent className="pt-4">
            <p className="text-sm">
              {correctCount === segments.length
                ? "Perfect! You correctly identified all the prompt elements."
                : `You correctly labeled ${correctCount} of ${segments.length} segments. Understanding these elements helps you construct more effective prompts.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
