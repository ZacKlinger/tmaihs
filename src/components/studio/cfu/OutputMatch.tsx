import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Link2 } from "lucide-react";

interface PromptOutputPair {
  promptId: string;
  prompt: string;
  outputId: string;
  output: string;
  explanation: string;
}

interface OutputMatchProps {
  id: string;
  question: string;
  description?: string;
  pairs: PromptOutputPair[];
  onAnswer: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  previousAnswer?: { selected: string; isCorrect: boolean };
}

export const OutputMatch = ({
  id,
  question,
  description,
  pairs,
  onAnswer,
  previousAnswer,
}: OutputMatchProps) => {
  const parseInitialMatches = () => {
    if (!previousAnswer?.selected) return {};
    try {
      return JSON.parse(previousAnswer.selected) as Record<string, string>;
    } catch {
      return {};
    }
  };

  const [matches, setMatches] = useState<Record<string, string>>(parseInitialMatches);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(!!previousAnswer);

  // Shuffle outputs for display
  const [shuffledOutputs] = useState(() => 
    [...pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.outputId, output: p.output }))
  );

  const handlePromptClick = (promptId: string) => {
    if (isSubmitted) return;
    setSelectedPrompt(selectedPrompt === promptId ? null : promptId);
  };

  const handleOutputClick = (outputId: string) => {
    if (!selectedPrompt || isSubmitted) return;
    
    // Remove any existing match for this output
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach(key => {
      if (newMatches[key] === outputId) {
        delete newMatches[key];
      }
    });
    
    // Add new match
    newMatches[selectedPrompt] = outputId;
    setMatches(newMatches);
    setSelectedPrompt(null);
  };

  const handleSubmit = () => {
    const correctCount = pairs.filter(
      pair => matches[pair.promptId] === pair.outputId
    ).length;
    const isCorrect = correctCount === pairs.length;
    
    setIsSubmitted(true);
    onAnswer(id, JSON.stringify(matches), isCorrect);
  };

  const getMatchedOutput = (promptId: string) => matches[promptId];
  const isOutputMatched = (outputId: string) => Object.values(matches).includes(outputId);
  
  const correctCount = pairs.filter(
    pair => matches[pair.promptId] === pair.outputId
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <Link2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-foreground">{question}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Prompts Column */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Prompts
          </p>
          {pairs.map((pair) => {
            const matchedOutputId = getMatchedOutput(pair.promptId);
            const isSelected = selectedPrompt === pair.promptId;
            const showResult = isSubmitted;
            const isCorrect = matchedOutputId === pair.outputId;
            
            return (
              <Card
                key={pair.promptId}
                onClick={() => handlePromptClick(pair.promptId)}
                className={cn(
                  "cursor-pointer transition-all",
                  !isSubmitted && isSelected && "ring-2 ring-primary",
                  !isSubmitted && !isSelected && "hover:border-primary/50",
                  showResult && isCorrect && "ring-2 ring-green-500",
                  showResult && !isCorrect && matchedOutputId && "ring-2 ring-destructive",
                  isSubmitted && "cursor-default"
                )}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-primary">
                      Prompt {pair.promptId}
                    </span>
                    {matchedOutputId && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded",
                        showResult && isCorrect && "bg-green-500/20 text-green-700 dark:text-green-300",
                        showResult && !isCorrect && "bg-destructive/20 text-destructive",
                        !showResult && "bg-secondary text-secondary-foreground"
                      )}>
                        → Output {matchedOutputId}
                        {showResult && (isCorrect ? (
                          <CheckCircle2 className="w-3 h-3 inline ml-1" />
                        ) : (
                          <XCircle className="w-3 h-3 inline ml-1" />
                        ))}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-mono bg-muted/50 p-2 rounded">
                    {pair.prompt}
                  </p>
                  {showResult && (
                    <p className={cn(
                      "text-xs mt-2 pt-2 border-t",
                      isCorrect ? "text-green-700 dark:text-green-300" : "text-muted-foreground"
                    )}>
                      {pair.explanation}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Outputs Column */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Outputs
          </p>
          {shuffledOutputs.map((item) => {
            const isMatched = isOutputMatched(item.id);
            const canSelect = selectedPrompt && !isSubmitted;
            
            return (
              <Card
                key={item.id}
                onClick={() => canSelect && handleOutputClick(item.id)}
                className={cn(
                  "transition-all",
                  canSelect && "cursor-pointer hover:border-primary/50",
                  canSelect && isMatched && "opacity-50",
                  !canSelect && "cursor-default",
                  isMatched && !isSubmitted && "border-secondary bg-secondary/10"
                )}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Output {item.id}
                    </span>
                    {isMatched && !isSubmitted && (
                      <span className="text-xs text-muted-foreground">matched</span>
                    )}
                  </div>
                  <p className="text-sm bg-muted/50 p-2 rounded">
                    {item.output}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {selectedPrompt && !isSubmitted && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="py-3">
            <p className="text-sm text-center">
              Now click an output to match with Prompt {selectedPrompt}
            </p>
          </CardContent>
        </Card>
      )}

      {!isSubmitted && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            {Object.keys(matches).length} of {pairs.length} prompts matched
          </p>
          <Button
            onClick={handleSubmit}
            disabled={Object.keys(matches).length < pairs.length}
            className="w-full"
          >
            Check Matches
          </Button>
        </div>
      )}

      {isSubmitted && (
        <Card className={cn(
          "border-l-4",
          correctCount === pairs.length ? "border-l-green-500 bg-green-500/5" : "border-l-amber-500 bg-amber-500/5"
        )}>
          <CardContent className="pt-4">
            <p className="text-sm">
              {correctCount === pairs.length
                ? "Excellent! You correctly matched all prompts to their outputs."
                : `You matched ${correctCount} of ${pairs.length} correctly. Review the explanations to understand how prompt structure shapes output.`
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
