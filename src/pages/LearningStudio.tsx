import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MicroCourseCard } from "@/components/studio/MicroCourseCard";
import { TierNavigation } from "@/components/studio/TierNavigation";
import { TierBypassQuiz } from "@/components/studio/TierBypassQuiz";
import { SaveProgressBanner } from "@/components/studio/SaveProgressBanner";
import { CompletionBadge } from "@/components/studio/CompletionBadge";
import { WhatIsAiCourse } from "@/components/studio/courses/WhatIsAiCourse";
import { YourClassroomCourse } from "@/components/studio/courses/YourClassroomCourse";
import { DescriptionCourse } from "@/components/studio/courses/DescriptionCourse";
import { WhenToUseCourse } from "@/components/studio/courses/WhenToUseCourse";
import { BackwardsPlanningCourse } from "@/components/studio/courses/BackwardsPlanningCourse";
import { PersonaIterationCourse } from "@/components/studio/courses/PersonaIterationCourse";
import { DraftToImplementationCourse } from "@/components/studio/courses/DraftToImplementationCourse";
import { EvaluatingOutputCourse } from "@/components/studio/courses/EvaluatingOutputCourse";
import { AiStudentWorkCourse } from "@/components/studio/courses/AiStudentWorkCourse";
import { ClosingTheLoopCourse } from "@/components/studio/courses/ClosingTheLoopCourse";
import { StudioProgressBar } from "@/components/studio/StudioProgressBar";
import { usePersistentProgress } from "@/hooks/usePersistentProgress";
import { TIERS, getTierForCourse } from "@/lib/studioTiers";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, School, PenTool, Scale, Map, RefreshCw, Hammer, Search, FileSearch, RotateCcw, Compass } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { isTierUnlocked as checkTierUnlocked } from "@/lib/studioTiers";
import { useEasterEgg } from "@/contexts/EasterEggContext";
interface MicroCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  mentalModel: string;
  icon: LucideIcon;
  tier: number;
  isPlaceholder: boolean;
  totalSections: number;
  totalCFUs: number;
}
const microCourses: MicroCourse[] = [
// Tier 1: The Constitution
{
  id: "what-is-ai-101",
  title: "What Is AI, Really?",
  description: "How language models work, why hallucination is structural, and what Constitutional AI implies for your own relationship to the tool.",
  duration: "15-20 min",
  mentalModel: "Calibrated Expectations",
  icon: Brain,
  tier: 1,
  isPlaceholder: false,
  totalSections: 4,
  totalCFUs: 1
}, {
  id: "your-classroom-101",
  title: "Your Classroom, Not a Generic One",
  description: "Why generic AI outputs fail specific classrooms, and how to begin building a Classroom Constitution grounded in who is actually in the room.",
  duration: "20-25 min",
  mentalModel: "Demographic Specificity",
  icon: School,
  tier: 1,
  isPlaceholder: false,
  totalSections: 5,
  totalCFUs: 1
}, {
  id: "description-101",
  title: "Description: The Art of Being Specific",
  description: "The difference between asking AI to do work and asking it to think with you. Constraints, personas, context — demonstrated before named.",
  duration: "20-25 min",
  mentalModel: "Description as Infrastructure",
  icon: PenTool,
  tier: 1,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "when-to-use-it-101",
  title: "When to Use It. When Not To.",
  description: "A taxonomy of appropriate and inappropriate AI use — and the constitution's most important section: what you actually believe your students can achieve.",
  duration: "20-25 min",
  mentalModel: "Professional Judgment",
  icon: Scale,
  tier: 1,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
},
// Tier 2: The Unit
{
  id: "backwards-planning-201",
  title: "Backwards Planning with AI",
  description: "Design a semester from the outcome back. Upload your Constitution, break a semester into phases, and stress-test the sequence.",
  duration: "20-25 min",
  mentalModel: "Outcome-First Design",
  icon: Map,
  tier: 2,
  isPlaceholder: false,
  totalSections: 5,
  totalCFUs: 1
}, {
  id: "persona-iteration-201",
  title: "Persona, Meta-Prompting & Iteration",
  description: "Steering, not just asking. Advanced personas, meta-prompting, and the iteration mindset that turns first drafts into usable work.",
  duration: "25-30 min",
  mentalModel: "Iterative Refinement",
  icon: RefreshCw,
  tier: 2,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "draft-to-implementation-201",
  title: "From Draft to Implementation",
  description: "What separates a theoretically sound unit from one a real teacher can pick up and use on Monday morning.",
  duration: "20-25 min",
  mentalModel: "Implementation Readiness",
  icon: Hammer,
  tier: 2,
  isPlaceholder: false,
  totalSections: 5,
  totalCFUs: 1
},
// Tier 3: The Practice
{
  id: "evaluating-output-301",
  title: "Evaluating AI Output & Your Own Work",
  description: "Use AI to evaluate your PBL unit against research-backed criteria — then own the final judgment as the professional in the room.",
  duration: "20-25 min",
  mentalModel: "Professional Evaluation",
  icon: Search,
  tier: 3,
  isPlaceholder: false,
  totalSections: 5,
  totalCFUs: 1
}, {
  id: "ai-student-work-301",
  title: "AI in Student Work: Detection, Policy & Honest Conversation",
  description: "What detection tools can and cannot tell you, and how to write a classroom AI policy that's honest about tradeoffs.",
  duration: "25-30 min",
  mentalModel: "Policy Before Accusation",
  icon: FileSearch,
  tier: 3,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "closing-the-loop-301",
  title: "Closing the Loop: Revising Your Constitution",
  description: "What has changed since Module 2? The quarterly revision ritual that makes everything a practice rather than a project.",
  duration: "20-25 min",
  mentalModel: "Living Practice",
  icon: RotateCcw,
  tier: 3,
  isPlaceholder: false,
  totalSections: 5,
  totalCFUs: 1
}];
const LearningStudio = () => {
  const [selectedTier, setSelectedTier] = useState(1);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [showBypassQuiz, setShowBypassQuiz] = useState(false);
  const [bypassTargetTier, setBypassTargetTier] = useState<number>(2);
  const { setIsCourseActive } = useEasterEgg();

  // Disable fish easter egg when viewing a micro-course
  useEffect(() => {
    setIsCourseActive(!!activeCourse);
    return () => setIsCourseActive(false);
  }, [activeCourse, setIsCourseActive]);
  const {
    progress,
    initCourse,
    completeSection,
    answerCFU,
    completeCourse,
    getCourseProgress,
    getProgramProgress,
    getCompletedCourseIds,
    getCourseStatus,
    markModuleCompleteViaQuiz,
    recordBypassAttempt,
    hasAttemptedBypass,
    isAuthenticated,
    allCoursesCompleted,
  } = usePersistentProgress();
  const completedCourseIds = getCompletedCourseIds();
  const isTierUnlocked = (tierNumber: number) => checkTierUnlocked(tierNumber, completedCourseIds);
  const filteredCourses = useMemo(() => {
    return microCourses.filter(course => course.tier === selectedTier);
  }, [selectedTier]);
  // Use the new program progress computation
  const overallProgress = useMemo(() => {
    return getProgramProgress();
  }, [getProgramProgress]);
  const handleCourseClick = (courseId: string, isPlaceholder: boolean, tier: number) => {
    if (isPlaceholder) return;
    if (!isTierUnlocked(tier)) return;
    initCourse(courseId);
    setActiveCourse(courseId);
  };
  const handleBack = () => {
    setActiveCourse(null);
  };
  const handleSkipTier = (targetTier: number) => {
    setBypassTargetTier(targetTier);
    setShowBypassQuiz(true);
  };
  const handleQuizComplete = (passedModuleIds: string[]) => {
    // Mark each passed module as complete
    passedModuleIds.forEach(moduleId => {
      markModuleCompleteViaQuiz(moduleId);
    });
  };
  const handleBypassAttempted = () => {
    recordBypassAttempt(bypassTargetTier);
  };

  // Render active course
  const renderActiveCourse = () => {
    const course = microCourses.find(c => c.id === activeCourse);
    if (!course) return null;
    const courseProps = {
      courseProgress: progress.courses[activeCourse!],
      onCompleteSection: (sectionId: string) => completeSection(activeCourse!, sectionId),
      onAnswerCFU: (cfuId: string, selected: string, correct: boolean) => answerCFU(activeCourse!, cfuId, selected, correct),
      onCompleteCourse: () => {
        completeCourse(activeCourse!);
        setActiveCourse(null);
      },
      onBack: handleBack,
      overallProgress: getCourseProgress(activeCourse!, course.totalSections, course.totalCFUs),
      isAuthenticated,
    };
    switch (activeCourse) {
      case "what-is-ai-101":
        return <WhatIsAiCourse {...courseProps} />;
      case "your-classroom-101":
        return <YourClassroomCourse {...courseProps} />;
      case "description-101":
        return <DescriptionCourse {...courseProps} />;
      case "when-to-use-it-101":
        return <WhenToUseCourse {...courseProps} />;
      case "backwards-planning-201":
        return <BackwardsPlanningCourse {...courseProps} />;
      case "persona-iteration-201":
        return <PersonaIterationCourse {...courseProps} />;
      case "draft-to-implementation-201":
        return <DraftToImplementationCourse {...courseProps} />;
      case "evaluating-output-301":
        return <EvaluatingOutputCourse {...courseProps} />;
      case "ai-student-work-301":
        return <AiStudentWorkCourse {...courseProps} />;
      case "closing-the-loop-301":
        return <ClosingTheLoopCourse {...courseProps} />;
      default:
        return null;
    }
  };
  if (activeCourse) {
    return <Layout>
        <div className="container mx-auto px-4 py-8">
          {renderActiveCourse()}
        </div>
      </Layout>;
  }
  return <Layout>
      <PageHeader title="Learning Studio" description="Build a Classroom Constitution. Design a PBL unit. Develop the judgment to govern both." icon={<Compass className="w-12 h-12 text-primary" />} />

      <section className="container mx-auto px-4 pb-16">
        {/* Save Progress Banner for guests */}
        {!isAuthenticated && <SaveProgressBanner />}

        {/* Completion Badge */}
        {allCoursesCompleted && (
          <div className="mb-6 flex justify-center">
            <CompletionBadge />
          </div>
        )}

        {/* Introduction Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold text-foreground mb-3">Ten modules. Three tiers. One living document.</h2>
              <p className="text-muted-foreground mb-4">
                Tier 1 builds a Classroom Constitution — a working document you upload at the start of every AI session.
                Tier 2 uses that constitution to design a semester-long PBL unit.
                Tier 3 develops the discernment to evaluate, refine, and govern both.
              </p>
              <p className="text-sm text-muted-foreground">
                Every module produces something you'll actually use. No tier is optional. No module is decorative.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <div className="mb-8">
          <StudioProgressBar progress={overallProgress} label="Overall Studio Progress" className="max-w-md" />
        </div>

        {/* Tier Navigation */}
        <div className="mb-8">
          <label className="text-sm text-muted-foreground mb-2 block">Select Tier</label>
          <TierNavigation selectedTier={selectedTier} onSelectTier={setSelectedTier} completedCourseIds={completedCourseIds} onSkipTier={handleSkipTier} hasAttemptedBypass={hasAttemptedBypass} />

          {/* Tier Description */}
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {TIERS.find(t => t.id === selectedTier)?.description}
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
          const courseTier = getTierForCourse(course.id);
          const isLocked = !isTierUnlocked(courseTier);
          const courseStatus = getCourseStatus(course.id);
          return <MicroCourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            duration={course.duration}
            mentalModel={course.mentalModel}
            tags={{ tasks: [], subjects: [] }}
            icon={course.icon}
            tier={course.tier}
            progress={getCourseProgress(course.id, course.totalSections, course.totalCFUs)}
            isCompleted={progress.courses[course.id]?.isCompleted || courseStatus === 'credited'}
            courseStatus={courseStatus}
            isPlaceholder={course.isPlaceholder}
            isLocked={isLocked}
            lockReason={isLocked ? `Complete all Tier ${courseTier - 1} courses to unlock` : undefined}
            onClick={() => handleCourseClick(course.id, course.isPlaceholder, courseTier)}
          />;
        })}
        </div>
      </section>

      {/* Bypass Quiz Modal */}
      <TierBypassQuiz open={showBypassQuiz} onOpenChange={setShowBypassQuiz} targetTier={bypassTargetTier} completedCourseIds={completedCourseIds} onQuizComplete={handleQuizComplete} onBypassAttempted={handleBypassAttempted} />
    </Layout>;
};
export default LearningStudio;
