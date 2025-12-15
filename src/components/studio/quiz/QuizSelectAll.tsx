import { cn } from "@/lib/utils";
import { SelectAllQuestion } from "@/lib/bypassQuizData";
import { Check, X, Square, CheckSquare } from "lucide-react";

interface QuizSelectAllProps {
  question: SelectAllQuestion;
  selectedAnswers: number[];
  onToggle: (index: number) => void;
  showResults: boolean;
  questionNumber: number;
}

export const QuizSelectAll = ({
  question,
  selectedAnswers,
  onToggle,
  showResults,
  questionNumber,
}: QuizSelectAllProps) => {
  const isCorrect = 
    selectedAnswers.length === question.correctIndices.length &&
    selectedAnswers.every(idx => question.correctIndices.includes(idx));

  return (
    <div className="space-y-4">
      <p className="font-medium text-foreground">
        {questionNumber}. {question.question}
      </p>
      <p className="text-xs text-muted-foreground">Select all that apply</p>
      
      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswers.includes(index);
          const isCorrectOption = question.correctIndices.includes(index);
          const wasSelectedCorrectly = showResults && isSelected && isCorrectOption;
          const wasSelectedIncorrectly = showResults && isSelected && !isCorrectOption;
          const wasMissed = showResults && !isSelected && isCorrectOption;
          
          return (
            <button
              key={index}
              onClick={() => !showResults && onToggle(index)}
              disabled={showResults}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-all",
                !showResults && !isSelected && "hover:bg-muted/50 border-border",
                !showResults && isSelected && "border-primary bg-primary/10",
                wasSelectedCorrectly && "border-green-500 bg-green-500/10",
                wasSelectedIncorrectly && "border-destructive bg-destructive/10",
                wasMissed && "border-amber-500 bg-amber-500/10",
                showResults && "cursor-default"
              )}
            >
              <div className="flex items-center gap-3">
                {!showResults && (
                  isSelected 
                    ? <CheckSquare className="w-5 h-5 text-primary shrink-0" />
                    : <Square className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
                {showResults && wasSelectedCorrectly && <Check className="w-5 h-5 text-green-500 shrink-0" />}
                {showResults && wasSelectedIncorrectly && <X className="w-5 h-5 text-destructive shrink-0" />}
                {showResults && wasMissed && <Check className="w-5 h-5 text-amber-500 shrink-0" />}
                {showResults && !isSelected && !isCorrectOption && <X className="w-5 h-5 text-muted-foreground/30 shrink-0" />}
                <span className="text-sm">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

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
