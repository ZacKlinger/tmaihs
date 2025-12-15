import { cn } from "@/lib/utils";
import { MultipleChoiceQuestion } from "@/lib/bypassQuizData";
import { Check, X } from "lucide-react";

interface QuizMultipleChoiceProps {
  question: MultipleChoiceQuestion;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  showResults: boolean;
  questionNumber: number;
}

export const QuizMultipleChoice = ({
  question,
  selectedAnswer,
  onSelect,
  showResults,
  questionNumber,
}: QuizMultipleChoiceProps) => {
  const isCorrect = selectedAnswer === question.correctIndex;

  return (
    <div className="space-y-4">
      <p className="font-medium text-foreground">
        {questionNumber}. {question.question}
      </p>
      
      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctIndex;
          
          return (
            <button
              key={index}
              onClick={() => !showResults && onSelect(index)}
              disabled={showResults}
              className={cn(
                "w-full text-left p-3 rounded-lg border transition-all",
                !showResults && !isSelected && "hover:bg-muted/50 border-border",
                !showResults && isSelected && "border-primary bg-primary/10",
                showResults && isCorrectOption && "border-green-500 bg-green-500/10",
                showResults && isSelected && !isCorrectOption && "border-destructive bg-destructive/10",
                showResults && "cursor-default"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm">{option}</span>
                {showResults && isCorrectOption && (
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                )}
                {showResults && isSelected && !isCorrectOption && (
                  <X className="w-5 h-5 text-destructive shrink-0" />
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
