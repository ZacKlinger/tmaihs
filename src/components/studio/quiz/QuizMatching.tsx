import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MatchingQuestion } from "@/lib/bypassQuizData";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizMatchingProps {
  question: MatchingQuestion;
  selectedMatches: Record<number, number>;
  onMatch: (leftIndex: number, rightIndex: number) => void;
  showResults: boolean;
  questionNumber: number;
}

export const QuizMatching = ({
  question,
  selectedMatches,
  onMatch,
  showResults,
  questionNumber,
}: QuizMatchingProps) => {
  // Track which left item is currently being matched
  const [activeLeftIndex, setActiveLeftIndex] = useState<number | null>(null);
  
  // Shuffle right options for display
  const [shuffledRightIndices, setShuffledRightIndices] = useState<number[]>([]);
  
  useEffect(() => {
    const indices = question.pairs.map((_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledRightIndices(indices);
  }, [question.pairs.length]);

  const isCorrect = question.pairs.every((_, idx) => selectedMatches[idx] === idx);
  
  // Get which right indices are already used
  const usedRightIndices = new Set(Object.values(selectedMatches));
  
  // Get which left index a right index is matched to (for display)
  const rightToLeftMap: Record<number, number> = {};
  Object.entries(selectedMatches).forEach(([leftIdx, rightIdx]) => {
    rightToLeftMap[rightIdx] = parseInt(leftIdx);
  });

  const handleLeftClick = (leftIndex: number) => {
    if (showResults) return;
    setActiveLeftIndex(activeLeftIndex === leftIndex ? null : leftIndex);
  };

  const handleRightClick = (rightIndex: number) => {
    if (showResults || activeLeftIndex === null) return;
    onMatch(activeLeftIndex, rightIndex);
    setActiveLeftIndex(null);
  };

  const clearMatch = (leftIndex: number) => {
    if (showResults) return;
    // Clear by setting to -1 (invalid), parent should handle this
    onMatch(leftIndex, -1);
  };

  return (
    <div className="space-y-4">
      <p className="font-medium text-foreground">
        {questionNumber}. {question.question}
      </p>
      
      <p className="text-sm text-muted-foreground">
        Click a term on the left, then click its match on the right.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Left column - terms to match */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Terms</p>
          {question.pairs.map((pair, leftIndex) => {
            const isActive = activeLeftIndex === leftIndex;
            const hasMatch = selectedMatches[leftIndex] !== undefined;
            const isThisCorrect = selectedMatches[leftIndex] === leftIndex;
            
            return (
              <div key={leftIndex} className="flex items-center gap-2">
                <Button
                  variant={isActive ? "default" : hasMatch ? "secondary" : "outline"}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-left h-auto py-2 px-3",
                    showResults && isThisCorrect && "border-green-500 bg-green-500/10",
                    showResults && hasMatch && !isThisCorrect && "border-destructive bg-destructive/10"
                  )}
                  onClick={() => handleLeftClick(leftIndex)}
                  disabled={showResults}
                >
                  <span className="truncate">{pair.left}</span>
                </Button>
                
                {showResults && (
                  <div className="w-5 flex-shrink-0">
                    {isThisCorrect ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : hasMatch ? (
                      <X className="w-4 h-4 text-destructive" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right column - options to match to */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Matches</p>
          {shuffledRightIndices.map((rightIndex) => {
            const isUsed = usedRightIndices.has(rightIndex);
            const matchedLeftIndex = rightToLeftMap[rightIndex];
            const isThisCorrect = matchedLeftIndex === rightIndex;
            
            return (
              <Button
                key={rightIndex}
                variant={isUsed ? "secondary" : "outline"}
                size="sm"
                className={cn(
                  "w-full justify-start text-left h-auto py-2 px-3",
                  activeLeftIndex !== null && !isUsed && "ring-2 ring-primary/50",
                  showResults && isUsed && isThisCorrect && "border-green-500 bg-green-500/10",
                  showResults && isUsed && !isThisCorrect && "border-destructive bg-destructive/10"
                )}
                onClick={() => handleRightClick(rightIndex)}
                disabled={showResults || (isUsed && activeLeftIndex === null)}
              >
                <span className="truncate">{question.pairs[rightIndex].right}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Current matches display */}
      {!showResults && Object.keys(selectedMatches).length > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-muted/50 space-y-1">
          <p className="text-xs font-medium text-muted-foreground mb-2">Your matches:</p>
          {Object.entries(selectedMatches).map(([leftIdx, rightIdx]) => {
            const leftIndex = parseInt(leftIdx);
            if (rightIdx === -1) return null;
            return (
              <div key={leftIdx} className="flex items-center justify-between text-sm">
                <span>
                  {question.pairs[leftIndex].left} → {question.pairs[rightIdx].right}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => clearMatch(leftIndex)}
                >
                  Clear
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {showResults && !isCorrect && (
        <div className="p-3 rounded-lg bg-muted text-sm">
          <p className="font-medium mb-1">Correct matches:</p>
          <ul className="space-y-1 text-muted-foreground">
            {question.pairs.map((pair, idx) => (
              <li key={idx}>{pair.left} → {pair.right}</li>
            ))}
          </ul>
        </div>
      )}

      {showResults && (
        <div className={cn(
          "p-3 rounded-lg text-sm",
          isCorrect ? "bg-green-500/10 text-green-700 dark:text-green-300" : "bg-destructive/10 text-destructive"
        )}>
          <p className="font-medium mb-1">{isCorrect ? "Correct!" : "Incorrect"}</p>
          <p className="text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
