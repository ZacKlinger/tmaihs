import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MicroCourseCard } from "@/components/studio/MicroCourseCard";
import { TierNavigation } from "@/components/studio/TierNavigation";
import { TierBypassQuiz } from "@/components/studio/TierBypassQuiz";
import { ConstraintsCourse } from "@/components/studio/courses/ConstraintsCourse";
import { RoleAssignmentCourse } from "@/components/studio/courses/RoleAssignmentCourse";
import { IterationCourse } from "@/components/studio/courses/IterationCourse";
import { MetaPromptingCourse } from "@/components/studio/courses/MetaPromptingCourse";
import { PersonaCallingCourse } from "@/components/studio/courses/PersonaCallingCourse";
import { WorkflowDesignCourse } from "@/components/studio/courses/WorkflowDesignCourse";
import { CriticalEvaluationCourse } from "@/components/studio/courses/CriticalEvaluationCourse";
import { DetectingAIWorkCourse } from "@/components/studio/courses/DetectingAIWorkCourse";
import { StudentAIActivitiesCourse } from "@/components/studio/courses/StudentAIActivitiesCourse";
import { CurriculumAIDesignCourse } from "@/components/studio/courses/CurriculumAIDesignCourse";
import { StudioProgressBar } from "@/components/studio/StudioProgressBar";
import { useStudioProgress } from "@/hooks/useStudioProgress";
import { TIERS, getTierForCourse } from "@/lib/studioTiers";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, RefreshCw, Sparkles, Brain, GitBranch, Search, FileSearch, Layers, Compass, GraduationCap } from "lucide-react";
import { LucideIcon } from "lucide-react";
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
// Tier 1: Foundations
{
  id: "constraints-101",
  title: "Constraints: The Foundation of Useful Prompts",
  description: "Learn how specific constraints transform vague AI outputs into immediately usable classroom materials.",
  duration: "15-20 min",
  mentalModel: "Constraints",
  icon: Target,
  tier: 1,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "role-assignment-101",
  title: "Role Assignment: Shaping AI Perspective",
  description: "Discover how assigning roles and personas to AI can dramatically improve response quality and relevance.",
  duration: "15-20 min",
  mentalModel: "Role Assignment",
  icon: Users,
  tier: 1,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "iteration-101",
  title: "Iteration: Refining Through Dialogue",
  description: "Master the art of iterative prompting—using follow-up prompts to refine and improve AI outputs.",
  duration: "20-25 min",
  mentalModel: "Iteration",
  icon: RefreshCw,
  tier: 1,
  isPlaceholder: false,
  totalSections: 7,
  totalCFUs: 3
},
// Tier 2: Integrated Application
{
  id: "meta-prompting-201",
  title: "Meta-Prompting: Using AI to Improve Your Prompts",
  description: "Learn to use AI as a prompt engineer—having it critique, improve, and expand your initial prompts.",
  duration: "20-25 min",
  mentalModel: "Meta-Prompting",
  icon: Brain,
  tier: 2,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "persona-calling-201",
  title: "Persona Calling: Expert Perspectives on Demand",
  description: "Summon specific expert perspectives—curriculum designers, veteran teachers, researchers—to solve complex problems.",
  duration: "15-20 min",
  mentalModel: "Persona Calling",
  icon: Sparkles,
  tier: 2,
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "workflow-design-201",
  title: "Workflow Design: Chaining Prompts for Complex Tasks",
  description: "Design multi-step prompt workflows where each output feeds the next for coherent, interconnected results.",
  duration: "25-30 min",
  mentalModel: "Workflow Design",
  icon: GitBranch,
  tier: 2,
  isPlaceholder: false,
  totalSections: 7,
  totalCFUs: 3
},
// Tier 3: Studio Practice
{
  id: "critical-evaluation-301",
  title: "Critical Evaluation: Accuracy, Bias, and Appropriateness",
  description: "Develop systematic approaches to evaluating AI-generated content across three critical lenses.",
  duration: "20-25 min",
  mentalModel: "Critical Evaluation",
  icon: Search,
  tier: 3,
  isPlaceholder: false,
  totalSections: 7,
  totalCFUs: 3
}, {
  id: "detecting-ai-work-301",
  title: "Detecting AI Work: Patterns and Pedagogical Design",
  description: "Recognize AI-generated student work through patterns and design assignments that encourage authenticity.",
  duration: "25-30 min",
  mentalModel: "Detection & Design",
  icon: FileSearch,
  tier: 3,
  isPlaceholder: false,
  totalSections: 7,
  totalCFUs: 4
}, {
  id: "student-ai-activities-301",
  title: "Student AI Activities: Designing for Productive Use",
  description: "Design student-facing AI activities where AI becomes a thinking tool rather than an answer machine.",
  duration: "20-25 min",
  mentalModel: "Student AI Design",
  icon: GraduationCap,
  tier: 3,
  isPlaceholder: false,
  totalSections: 7,
  totalCFUs: 3
}, {
  id: "curriculum-ai-design-301",
  title: "Curriculum AI Design: Strategic Integration",
  description: "Develop judgment about when, where, and how to integrate AI across your curriculum.",
  duration: "25-30 min",
  mentalModel: "Curriculum Integration",
  icon: Layers,
  tier: 3,
  isPlaceholder: false,
  totalSections: 7,
  totalCFUs: 3
}];
const LearningStudio = () => {
  const [selectedTier, setSelectedTier] = useState(1);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [showBypassQuiz, setShowBypassQuiz] = useState(false);
  const [bypassTargetTier, setBypassTargetTier] = useState<number>(2);
  const {
    progress,
    initCourse,
    completeSection,
    answerCFU,
    completeCourse,
    getCourseProgress,
    getCompletedCourseIds,
    isTierUnlocked,
    markModuleCompleteViaQuiz,
    recordBypassAttempt,
    hasAttemptedBypass
  } = useStudioProgress();
  const completedCourseIds = getCompletedCourseIds();
  const filteredCourses = useMemo(() => {
    return microCourses.filter(course => course.tier === selectedTier);
  }, [selectedTier]);
  const overallProgress = useMemo(() => {
    const completedCourses = Object.values(progress.courses).filter(c => c.isCompleted).length;
    const totalCourses = microCourses.filter(c => !c.isPlaceholder).length;
    return totalCourses > 0 ? Math.round(completedCourses / totalCourses * 100) : 0;
  }, [progress]);
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
      onCompleteCourse: () => completeCourse(activeCourse!),
      onBack: handleBack,
      overallProgress: getCourseProgress(activeCourse!, course.totalSections, course.totalCFUs)
    };
    switch (activeCourse) {
      case "constraints-101":
        return <ConstraintsCourse {...courseProps} />;
      case "role-assignment-101":
        return <RoleAssignmentCourse {...courseProps} />;
      case "iteration-101":
        return <IterationCourse {...courseProps} />;
      case "meta-prompting-201":
        return <MetaPromptingCourse {...courseProps} />;
      case "persona-calling-201":
        return <PersonaCallingCourse {...courseProps} />;
      case "workflow-design-201":
        return <WorkflowDesignCourse {...courseProps} />;
      case "critical-evaluation-301":
        return <CriticalEvaluationCourse {...courseProps} />;
      case "detecting-ai-work-301":
        return <DetectingAIWorkCourse {...courseProps} />;
      case "student-ai-activities-301":
        return <StudentAIActivitiesCourse {...courseProps} />;
      case "curriculum-ai-design-301":
        return <CurriculumAIDesignCourse {...courseProps} />;
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
      <PageHeader title="Learning Studio" description="A focused workspace for developing AI fluency through real prep-period work" icon={<Compass className="w-12 h-12 text-primary" />} />

      <section className="container mx-auto px-4 pb-16">
        {/* Introduction Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold text-foreground mb-3">Add one more tool to your pedagogical toolbox.</h2>
              <p className="text-muted-foreground mb-4">
                Each micro-course (15-25 minutes) teaches one powerful mental model for working with AI, 
                then has you immediately apply it. Progress through three tiers as your design capacity grows.
              </p>
              <p className="text-sm text-muted-foreground">
                You'll leave each session with usable work product—not just new knowledge.
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
          return <MicroCourseCard key={course.id} id={course.id} title={course.title} description={course.description} duration={course.duration} mentalModel={course.mentalModel} tags={{
            tasks: [],
            subjects: []
          }} icon={course.icon} tier={course.tier} progress={getCourseProgress(course.id, course.totalSections, course.totalCFUs)} isCompleted={progress.courses[course.id]?.isCompleted || false} isPlaceholder={course.isPlaceholder} isLocked={isLocked} lockReason={isLocked ? `Complete all Tier ${courseTier - 1} courses to unlock` : undefined} onClick={() => handleCourseClick(course.id, course.isPlaceholder, courseTier)} />;
        })}
        </div>
      </section>

      {/* Bypass Quiz Modal */}
      <TierBypassQuiz open={showBypassQuiz} onOpenChange={setShowBypassQuiz} targetTier={bypassTargetTier} completedCourseIds={completedCourseIds} onQuizComplete={handleQuizComplete} onBypassAttempted={handleBypassAttempted} />
    </Layout>;
};
export default LearningStudio;