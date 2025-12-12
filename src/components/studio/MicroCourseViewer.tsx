import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudioProgressBar } from "./StudioProgressBar";
import { CFUQuestion } from "./CFUQuestion";
import { PromptWorkshop } from "./PromptWorkshop";
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

interface CourseSection {
  id: string;
  type: "context" | "mental-model" | "workshop" | "cfu" | "reflection";
  title: string;
  content?: React.ReactNode;
  workshopData?: React.ComponentProps<typeof PromptWorkshop>;
  cfuData?: CFUData;
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

  const isCurrentCompleted = courseProgress?.completedSections.includes(currentSection.id) || false;
  const isLastSection = currentIndex === sections.length - 1;
  const allSectionsCompleted = sections.every(
    (s) => courseProgress?.completedSections.includes(s.id)
  );

  useEffect(() => {
    // Auto-mark non-interactive sections as complete when viewed
    if (currentSection.type !== "cfu" && currentSection.type !== "workshop") {
      const timer = setTimeout(() => {
        onCompleteSection(currentSection.id);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentSection, onCompleteSection]);

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
            <div className="space-y-6">
              {currentSection.content}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your experience with the community:
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/community">Visit Community Discussion</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            currentSection.content
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
          disabled={isLastSection && !allSectionsCompleted}
          className="gap-2"
        >
          {isLastSection ? "Complete Course" : "Next"}
          {!isLastSection && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
