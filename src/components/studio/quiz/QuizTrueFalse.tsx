import { cn } from "@/lib/utils";
import { TrueFalseQuestion } from "@/lib/bypassQuizData";
import { Check, X } from "lucide-react";

interface QuizTrueFalseProps {
  question: TrueFalseQuestion;
  selectedAnswer: boolean | null;
  onSelect: (answer: boolean) => void;
  showResults: boolean;
  questionNumber: number;
}

export const QuizTrueFalse = ({
  question,
  selectedAnswer,
  onSelect,
  showResults,
  questionNumber,
}: QuizTrueFalseProps) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="space-y-4">
      <p className="font-medium text-foreground">
        {questionNumber}. {question.question}
      </p>
      
      <div className="flex gap-3">
        {[true, false].map((value) => {
          const isSelected = selectedAnswer === value;
          const isCorrectOption = value === question.correctAnswer;
          
          return (
            <button
              key={String(value)}
              onClick={() => !showResults && onSelect(value)}
              disabled={showResults}
              className={cn(
                "flex-1 p-3 rounded-lg border transition-all font-medium",
                !showResults && !isSelected && "hover:bg-muted/50 border-border",
                !showResults && isSelected && "border-primary bg-primary/10",
                showResults && isCorrectOption && "border-green-500 bg-green-500/10",
                showResults && isSelected && !isCorrectOption && "border-destructive bg-destructive/10",
                showResults && "cursor-default"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{value ? "True" : "False"}</span>
                {showResults && isCorrectOption && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
                {showResults && isSelected && !isCorrectOption && (
                  <X className="w-5 h-5 text-destructive" />
                )}
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
