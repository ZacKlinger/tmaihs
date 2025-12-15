import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MatchingQuestion } from "@/lib/bypassQuizData";
import { Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  
  const usedRightIndices = Object.values(selectedMatches);

  return (
    <div className="space-y-4">
      <p className="font-medium text-foreground">
        {questionNumber}. {question.question}
      </p>
      
      <div className="space-y-3">
        {question.pairs.map((pair, leftIndex) => {
          const selectedRight = selectedMatches[leftIndex];
          const isThisCorrect = selectedRight === leftIndex;
          
          return (
            <div 
              key={leftIndex}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border",
                showResults && isThisCorrect && "border-green-500 bg-green-500/10",
                showResults && selectedRight !== undefined && !isThisCorrect && "border-destructive bg-destructive/10",
                !showResults && "border-border"
              )}
            >
              <div className="flex-1 text-sm font-medium">{pair.left}</div>
              
              <div className="w-8 text-center text-muted-foreground">→</div>
              
              <div className="flex-1">
                <Select
                  value={selectedRight !== undefined ? String(selectedRight) : ""}
                  onValueChange={(value) => !showResults && onMatch(leftIndex, parseInt(value))}
                  disabled={showResults}
                >
                  <SelectTrigger className={cn(
                    "w-full",
                    showResults && isThisCorrect && "border-green-500",
                    showResults && selectedRight !== undefined && !isThisCorrect && "border-destructive"
                  )}>
                    <SelectValue placeholder="Select match..." />
                  </SelectTrigger>
                  <SelectContent>
                    {shuffledRightIndices.map((rightIndex) => {
                      const isUsed = usedRightIndices.includes(rightIndex) && selectedRight !== rightIndex;
                      return (
                        <SelectItem 
                          key={rightIndex} 
                          value={String(rightIndex)}
                          disabled={isUsed}
                          className={cn(isUsed && "opacity-50")}
                        >
                          {question.pairs[rightIndex].right}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {showResults && (
                <div className="w-6">
                  {isThisCorrect ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-destructive" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

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
