import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { QuizQuestion, QuizAnswer, createEmptyAnswer, isAnswerComplete, isAnswerCorrect } from "./quiz";
import { getQuestionsForModules, QuizQuestion as QuizQuestionType, getModulesFromQuestions } from "@/lib/bypassQuizData";
import { TIERS, COURSE_NAMES } from "@/lib/studioTiers";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TierBypassQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetTier: number;
  completedCourseIds: string[];
  onQuizComplete: (passedModuleIds: string[]) => void;
  onBypassAttempted: () => void;
}

export const TierBypassQuiz = ({
  open,
  onOpenChange,
  targetTier,
  completedCourseIds,
  onQuizComplete,
  onBypassAttempted,
}: TierBypassQuizProps) => {
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const [showResults, setShowResults] = useState(false);

  // Get the tier being tested (the one BEFORE the target tier)
  const testTier = targetTier - 1;
  const tier = TIERS.find(t => t.id === testTier);
  
  // Get uncompleted modules in this tier
  const uncompletedModules = useMemo(() => {
    if (!tier) return [];
    return tier.courseIds.filter(id => !completedCourseIds.includes(id));
  }, [tier, completedCourseIds]);

  // Get questions only for uncompleted modules
  const questions = useMemo(() => {
    return getQuestionsForModules(testTier, uncompletedModules);
  }, [testTier, uncompletedModules]);

  // Initialize answers when questions change
  useMemo(() => {
    if (questions.length > 0 && Object.keys(answers).length === 0) {
      const initialAnswers: Record<string, QuizAnswer> = {};
      questions.forEach(q => {
        initialAnswers[q.id] = createEmptyAnswer(q);
      });
      setAnswers(initialAnswers);
    }
  }, [questions]);

  const handleAnswer = (questionId: string, answer: QuizAnswer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const allAnswered = useMemo(() => {
    return questions.every(q => isAnswerComplete(q, answers[q.id]));
  }, [questions, answers]);

  const handleSubmit = () => {
    setShowResults(true);
    onBypassAttempted();
  };

  const results = useMemo(() => {
    if (!showResults) return null;

    // Group questions by module
    const moduleResults: Record<string, { total: number; correct: number }> = {};
    
    questions.forEach(q => {
      if (!moduleResults[q.moduleId]) {
        moduleResults[q.moduleId] = { total: 0, correct: 0 };
      }
      moduleResults[q.moduleId].total++;
      if (isAnswerCorrect(q, answers[q.id])) {
        moduleResults[q.moduleId].correct++;
      }
    });

    // Determine which modules passed (all questions correct)
    const passedModules = Object.entries(moduleResults)
      .filter(([_, result]) => result.correct === result.total)
      .map(([moduleId]) => moduleId);

    const allPassed = passedModules.length === uncompletedModules.length;

    return { moduleResults, passedModules, allPassed };
  }, [showResults, questions, answers, uncompletedModules]);

  const handleClose = () => {
    if (results) {
      onQuizComplete(results.passedModules);
    }
    // Reset state
    setAnswers({});
    setShowResults(false);
    onOpenChange(false);
  };

  if (!tier || uncompletedModules.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] !flex !flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {showResults 
              ? "Quiz Results" 
              : `Skip to Tier ${targetTier}: Test Your Knowledge`}
          </DialogTitle>
          <DialogDescription>
            {showResults 
              ? "See how you did on each module"
              : `Answer all questions correctly to skip Tier ${testTier} modules. You have one attempt.`}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[calc(90vh-180px)] overflow-y-auto pr-4">
          {!showResults ? (
            <div className="space-y-8 py-4">
              {questions.map((question, index) => (
                <div key={question.id} className="pb-6 border-b border-border last:border-0">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                    {COURSE_NAMES[question.moduleId] || question.moduleId}
                  </p>
                  <QuizQuestion
                    question={question}
                    answer={answers[question.id] || createEmptyAnswer(question)}
                    onAnswer={(answer) => handleAnswer(question.id, answer)}
                    showResults={false}
                    questionNumber={index + 1}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 py-4">
              {/* Summary */}
              <div className={cn(
                "p-4 rounded-lg",
                results?.allPassed 
                  ? "bg-green-500/10 border border-green-500/30" 
                  : "bg-amber-500/10 border border-amber-500/30"
              )}>
                {results?.allPassed ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-300">
                        Congratulations! You've unlocked Tier {targetTier}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        All modules passed. You can proceed to the next tier.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-amber-500" />
                    <div>
                      <p className="font-semibold text-amber-700 dark:text-amber-300">
                        Partial Credit Earned
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Complete the remaining modules to unlock Tier {targetTier}.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Module breakdown */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Module Results
                </h4>
                {Object.entries(results?.moduleResults || {}).map(([moduleId, result]) => {
                  const passed = result.correct === result.total;
                  return (
                    <div 
                      key={moduleId}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",
                        passed ? "border-green-500/30 bg-green-500/5" : "border-destructive/30 bg-destructive/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {passed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <span className="font-medium">
                          {COURSE_NAMES[moduleId] || moduleId}
                        </span>
                      </div>
                      <span className={cn(
                        "text-sm font-medium",
                        passed ? "text-green-600 dark:text-green-400" : "text-destructive"
                      )}>
                        {result.correct}/{result.total} correct
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Detailed answers */}
              <div className="space-y-6 pt-4 border-t border-border">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Detailed Answers
                </h4>
                {questions.map((question, index) => (
                  <div key={question.id} className="pb-6 border-b border-border last:border-0">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                      {COURSE_NAMES[question.moduleId] || question.moduleId}
                    </p>
                    <QuizQuestion
                      question={question}
                      answer={answers[question.id] || createEmptyAnswer(question)}
                      onAnswer={() => {}}
                      showResults={true}
                      questionNumber={index + 1}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          {!showResults ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={!allAnswered}
              >
                Submit Quiz
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>
              {results?.allPassed ? "Continue to Tier " + targetTier : "Close"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
