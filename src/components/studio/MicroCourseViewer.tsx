import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudioProgressBar } from "./StudioProgressBar";
import { CFUQuestion } from "./CFUQuestion";
import { PromptWorkshop } from "./PromptWorkshop";
import { 
  PromptCompare, PromptRemix, SequenceOrder, IdentifyMissing, AnnotatePrompt, OutputMatch,
  SpotTheDifference, PersonaTaskMatch, WorkflowBuilder, BiasSpotter, PatternIdentifier,
  AuthenticityRubric, GuardrailDesigner, IntegrationMapper
} from "./cfu";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Wrench, CheckSquare, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface CFUData {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean; explanation?: string }[];
  type: "multiple-choice" | "spot-the-better-prompt" | "identify-mental-model";
}

interface PromptCompareData {
  id: string;
  type: "prompt-compare";
  question: string;
  context?: string;
  options: [
    { id: string; prompt: string; isCorrect: boolean; annotations?: { text: string; label: string; color: string }[]; explanation: string },
    { id: string; prompt: string; isCorrect: boolean; annotations?: { text: string; label: string; color: string }[]; explanation: string }
  ];
}

interface PromptRemixData {
  id: string;
  type: "prompt-remix";
  originalPrompt: string;
  originalContext: string;
  newContext: string;
  constraints: { id: string; text: string; shouldChange: boolean; reason: string }[];
}

interface SequenceOrderData {
  id: string;
  type: "sequence-order";
  question: string;
  description?: string;
  steps: { id: string; text: string; correctPosition: number }[];
}

interface IdentifyMissingData {
  id: string;
  type: "identify-missing";
  prompt: string;
  context?: string;
  elements: { id: string; label: string; isMissing: boolean; explanation: string }[];
  minCorrect?: number;
}

interface AnnotatePromptData {
  id: string;
  type: "annotate-prompt";
  question: string;
  description?: string;
  segments: { id: string; text: string; correctLabel: string }[];
  labels: string[];
}

interface OutputMatchData {
  id: string;
  type: "output-match";
  question: string;
  description?: string;
  pairs: { promptId: string; prompt: string; outputId: string; output: string; explanation: string }[];
}

interface SpotTheDifferenceData {
  id: string;
  type: "spot-the-difference";
  question: string;
  description?: string;
  promptA: string;
  promptB: string;
  segmentsB: { id: string; text: string; isDifferent: boolean; effect: string }[];
}

interface PersonaTaskMatchData {
  id: string;
  type: "persona-task-match";
  question: string;
  description?: string;
  tasks: { id: string; description: string; correctPersonaId: string; explanation: string }[];
  personas: { id: string; name: string; description: string }[];
}

interface WorkflowBuilderData {
  id: string;
  type: "workflow-builder";
  question: string;
  goal: string;
  prompts: { id: string; text: string; isCorrect: boolean; explanation: string }[];
}

interface BiasSpotterData {
  id: string;
  type: "bias-spotter";
  question: string;
  context: string;
  aiOutput: string;
  segments: { id: string; text: string; hasBias: boolean; biasType?: string; explanation: string }[];
}

interface PatternIdentifierData {
  id: string;
  type: "pattern-identifier";
  question: string;
  description?: string;
  samples: { id: string; content: string; isAI: boolean; indicators: string[]; explanation: string }[];
}

interface AuthenticityRubricData {
  id: string;
  type: "authenticity-rubric";
  question: string;
  studentWork: string;
  dimensions: { id: string; name: string; description: string; correctRange: [number, number]; explanation: string }[];
}

interface GuardrailDesignerData {
  id: string;
  type: "guardrail-designer";
  question: string;
  scenario: string;
  learningObjective: string;
  guardrails: { id: string; name: string; description: string; isAppropriate: boolean; tradeoff: string }[];
}

interface IntegrationMapperData {
  id: string;
  type: "integration-mapper";
  question: string;
  unitContext: string;
  objectives: { id: string; objective: string; shouldIntegrate: boolean; rationale: string }[];
}

type AdvancedCFUData = PromptCompareData | PromptRemixData | SequenceOrderData | IdentifyMissingData | AnnotatePromptData | OutputMatchData | SpotTheDifferenceData | PersonaTaskMatchData | WorkflowBuilderData | BiasSpotterData | PatternIdentifierData | AuthenticityRubricData | GuardrailDesignerData | IntegrationMapperData;

interface CourseSection {
  id: string;
  type: "context" | "mental-model" | "workshop" | "cfu" | "reflection";
  title: string;
  content?: React.ReactNode;
  workshopData?: React.ComponentProps<typeof PromptWorkshop>;
  cfuData?: CFUData;
  advancedCfuData?: AdvancedCFUData;
}

interface MicroCourseViewerProps {
  courseId: string;
  title: string;
  sections: CourseSection[];
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

const sectionIcons = {
  context: BookOpen,
  "mental-model": Lightbulb,
  workshop: Wrench,
  cfu: CheckSquare,
  reflection: MessageSquare,
};

export const MicroCourseViewer = ({
  courseId,
  title,
  sections,
  courseProgress,
  onCompleteSection,
  onAnswerCFU,
  onCompleteCourse,
  onBack,
  overallProgress,
}: MicroCourseViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSection = sections[currentIndex];
  const Icon = sectionIcons[currentSection.type];
  const contentRef = useRef<HTMLDivElement>(null);

  const isCurrentCompleted = courseProgress?.completedSections.includes(currentSection.id) || false;
  const isLastSection = currentIndex === sections.length - 1;
  const allSectionsCompleted = sections.every(
    (s) => courseProgress?.completedSections.includes(s.id)
  );
  
  // Mastery gating: CFU sections must be answered correctly to proceed
  const isCFUSection = currentSection.type === "cfu";
  const cfuData = currentSection.cfuData || currentSection.advancedCfuData;
  const cfuAnswer = cfuData ? courseProgress?.cfuAnswers[cfuData.id] : undefined;
  const cfuPassed = cfuAnswer?.correct === true;
  
  // Can proceed if: not a CFU, or CFU is passed (100% correct)
  const canProceedFromCurrent = !isCFUSection || cfuPassed || isCurrentCompleted;

  // Scroll-based completion for content sections
  const handleScroll = useCallback(() => {
    if (currentSection.type === "cfu" || currentSection.type === "workshop") return;
    if (isCurrentCompleted) return;
    if (!contentRef.current) return;

    const container = contentRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // If content doesn't need scrolling, mark complete after viewing
    if (scrollHeight <= clientHeight + 10) {
      onCompleteSection(currentSection.id);
      return;
    }

    // Check if scrolled to bottom (90% threshold)
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
    if (scrollPercentage >= 0.9) {
      onCompleteSection(currentSection.id);
    }
  }, [currentSection, isCurrentCompleted, onCompleteSection]);

  // Check completion on mount and section change
  useEffect(() => {
    if (currentSection.type === "cfu" || currentSection.type === "workshop") return;
    
    // Small delay to let content render
    const timer = setTimeout(() => {
      handleScroll();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex, handleScroll, currentSection.type]);

  const handleNext = () => {
    if (!isLastSection) {
      setCurrentIndex((prev) => prev + 1);
    } else if (allSectionsCompleted) {
      onCompleteCourse();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleWorkshopComplete = () => {
    onCompleteSection(currentSection.id);
  };

  const renderAdvancedCFU = (data: AdvancedCFUData) => {
    const rawAnswer = courseProgress?.cfuAnswers[data.id];
    const previousAnswer = rawAnswer ? { selected: rawAnswer.selectedAnswer, isCorrect: rawAnswer.correct } : undefined;
    const handleAnswer = (cfuId: string, selected: string, correct: boolean) => {
      onAnswerCFU(cfuId, selected, correct);
      onCompleteSection(currentSection.id);
    };

    switch (data.type) {
      case "prompt-compare":
        return (
          <PromptCompare
            id={data.id}
            question={data.question}
            context={data.context}
            options={data.options}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "prompt-remix":
        return (
          <PromptRemix
            id={data.id}
            originalPrompt={data.originalPrompt}
            originalContext={data.originalContext}
            newContext={data.newContext}
            constraints={data.constraints}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "sequence-order":
        return (
          <SequenceOrder
            id={data.id}
            question={data.question}
            description={data.description}
            steps={data.steps}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "identify-missing":
        return (
          <IdentifyMissing
            id={data.id}
            prompt={data.prompt}
            context={data.context}
            elements={data.elements}
            minCorrect={data.minCorrect}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "annotate-prompt":
        return (
          <AnnotatePrompt
            id={data.id}
            question={data.question}
            description={data.description}
            segments={data.segments}
            labels={data.labels}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "output-match":
        return (
          <OutputMatch
            id={data.id}
            question={data.question}
            description={data.description}
            pairs={data.pairs}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "spot-the-difference":
        return (
          <SpotTheDifference
            id={data.id}
            question={data.question}
            description={data.description}
            promptA={data.promptA}
            promptB={data.promptB}
            segmentsB={data.segmentsB}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "persona-task-match":
        return (
          <PersonaTaskMatch
            id={data.id}
            question={data.question}
            description={data.description}
            tasks={data.tasks}
            personas={data.personas}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "workflow-builder":
        return (
          <WorkflowBuilder
            id={data.id}
            question={data.question}
            goal={data.goal}
            prompts={data.prompts}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "bias-spotter":
        return (
          <BiasSpotter
            id={data.id}
            question={data.question}
            context={data.context}
            aiOutput={data.aiOutput}
            segments={data.segments}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "pattern-identifier":
        return (
          <PatternIdentifier
            id={data.id}
            question={data.question}
            description={data.description}
            samples={data.samples}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "authenticity-rubric":
        return (
          <AuthenticityRubric
            id={data.id}
            question={data.question}
            studentWork={data.studentWork}
            dimensions={data.dimensions}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "guardrail-designer":
        return (
          <GuardrailDesigner
            id={data.id}
            question={data.question}
            scenario={data.scenario}
            learningObjective={data.learningObjective}
            guardrails={data.guardrails}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      case "integration-mapper":
        return (
          <IntegrationMapper
            id={data.id}
            question={data.question}
            unitContext={data.unitContext}
            objectives={data.objectives}
            onAnswer={handleAnswer}
            previousAnswer={previousAnswer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>
        <StudioProgressBar 
          progress={overallProgress} 
          label="Course Progress"
          className="w-48"
        />
      </div>

      {/* Course Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">
          Section {currentIndex + 1} of {sections.length}
        </p>
      </div>

      {/* Section Navigation Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map((section, index) => {
          const SectionIcon = sectionIcons[section.type];
          const isComplete = courseProgress?.completedSections.includes(section.id);
          const isCurrent = index === currentIndex;
          
          return (
            <button
              key={section.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                isCurrent && "bg-primary text-primary-foreground",
                !isCurrent && isComplete && "bg-green-500/20 text-green-700 dark:text-green-300",
                !isCurrent && !isComplete && "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <SectionIcon className="w-4 h-4" />
              {section.title}
            </button>
          );
        })}
      </div>

      {/* Section Content */}
      <Card className="min-h-[400px]">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Icon className="w-4 h-4" />
            <span className="capitalize">{currentSection.type.replace("-", " ")}</span>
          </div>

          {currentSection.type === "workshop" && currentSection.workshopData ? (
            <div className="space-y-6">
              <PromptWorkshop {...currentSection.workshopData} />
              {!isCurrentCompleted && (
                <Button onClick={handleWorkshopComplete} className="w-full">
                  I've practiced with these prompts
                </Button>
              )}
            </div>
          ) : currentSection.type === "cfu" && currentSection.advancedCfuData ? (
            renderAdvancedCFU(currentSection.advancedCfuData)
          ) : currentSection.type === "cfu" && currentSection.cfuData ? (
            <CFUQuestion
              {...currentSection.cfuData}
              onAnswer={(cfuId, selected, correct) => {
                onAnswerCFU(cfuId, selected, correct);
                onCompleteSection(currentSection.id);
              }}
              previousAnswer={courseProgress?.cfuAnswers[currentSection.cfuData.id]}
            />
          ) : currentSection.type === "reflection" ? (
            <div 
              ref={contentRef}
              onScroll={handleScroll}
              className="space-y-6 max-h-[60vh] overflow-y-auto"
            >
              {currentSection.content}
              <Card className="border-border/50 bg-muted/30">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Have questions or something to share? The community is here:
                  </p>
                  <Link 
                    to="/community" 
                    className="text-sm text-primary hover:underline"
                  >
                    Visit Community Discussion →
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div 
              ref={contentRef}
              onScroll={handleScroll}
              className="max-h-[60vh] overflow-y-auto"
            >
              {currentSection.content}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={(isLastSection && !allSectionsCompleted) || (!isLastSection && !canProceedFromCurrent)}
          className="gap-2"
          title={!canProceedFromCurrent ? "Complete the check with 100% to continue" : undefined}
        >
          {isLastSection ? "Complete Course" : "Next"}
          {!isLastSection && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
