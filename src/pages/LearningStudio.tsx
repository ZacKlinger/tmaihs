import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { MicroCourseCard } from "@/components/studio/MicroCourseCard";
import { ConstraintsCourse } from "@/components/studio/courses/ConstraintsCourse";
import { StudioProgressBar } from "@/components/studio/StudioProgressBar";
import { useStudioProgress } from "@/hooks/useStudioProgress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, RefreshCw, Sparkles, ListChecks, MessageSquareText, Compass } from "lucide-react";
interface MicroCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  mentalModel: string;
  icon: typeof Target;
  tags: {
    tasks: string[];
    subjects: string[];
  };
  isPlaceholder: boolean;
  totalSections: number;
  totalCFUs: number;
}
const microCourses: MicroCourse[] = [{
  id: "constraints-101",
  title: "Constraints: The Foundation of Useful Prompts",
  description: "Learn how specific constraints transform vague AI outputs into immediately usable classroom materials.",
  duration: "15-20 min",
  mentalModel: "Constraints",
  icon: Target,
  tags: {
    tasks: ["Lesson Planning", "Differentiation"],
    subjects: ["Universal"]
  },
  isPlaceholder: false,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "role-assignment",
  title: "Role Assignment: Shaping AI Perspective",
  description: "Discover how assigning roles and personas to AI can dramatically improve response quality and relevance.",
  duration: "15-20 min",
  mentalModel: "Role Assignment",
  icon: Users,
  tags: {
    tasks: ["Student Engagement", "Assessment"],
    subjects: ["Universal"]
  },
  isPlaceholder: true,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "iteration",
  title: "Iteration: Refining Through Dialogue",
  description: "Master the art of iterative prompting—using follow-up prompts to refine and improve AI outputs.",
  duration: "20-25 min",
  mentalModel: "Iteration",
  icon: RefreshCw,
  tags: {
    tasks: ["Lesson Planning", "Assessment"],
    subjects: ["Universal"]
  },
  isPlaceholder: true,
  totalSections: 7,
  totalCFUs: 3
}, {
  id: "audience-awareness",
  title: "Audience Awareness: Writing for Your Students",
  description: "Learn to calibrate AI outputs for specific student populations, reading levels, and learning needs.",
  duration: "15-20 min",
  mentalModel: "Audience",
  icon: Sparkles,
  tags: {
    tasks: ["Differentiation", "Student Engagement"],
    subjects: ["Universal"]
  },
  isPlaceholder: true,
  totalSections: 6,
  totalCFUs: 2
}, {
  id: "chunking",
  title: "Chunking Complex Tasks",
  description: "Break down large curriculum projects into manageable AI-assisted steps for better results.",
  duration: "20-25 min",
  mentalModel: "Chunking",
  icon: ListChecks,
  tags: {
    tasks: ["Lesson Planning", "Administrative"],
    subjects: ["Universal"]
  },
  isPlaceholder: true,
  totalSections: 7,
  totalCFUs: 2
}, {
  id: "feedback-loops",
  title: "Feedback Loops: AI as Thought Partner",
  description: "Use AI to get feedback on your own ideas before finalizing lesson plans and materials.",
  duration: "15-20 min",
  mentalModel: "Feedback",
  icon: MessageSquareText,
  tags: {
    tasks: ["Assessment", "Lesson Planning"],
    subjects: ["Universal"]
  },
  isPlaceholder: true,
  totalSections: 6,
  totalCFUs: 2
}];
const taskFilters = ["All Tasks", "Lesson Planning", "Assessment & Feedback", "Differentiation & Accessibility", "Student Engagement", "Administrative & Prep Tasks"];
const subjectFilters = ["All Subjects", "Universal", "Math", "Science", "English / Humanities", "Social Studies", "Special Education", "Electives / CTE"];
const LearningStudio = () => {
  const [selectedTask, setSelectedTask] = useState("All Tasks");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const {
    progress,
    initCourse,
    completeSection,
    answerCFU,
    completeCourse,
    getCourseProgress
  } = useStudioProgress();
  const filteredCourses = useMemo(() => {
    return microCourses.filter(course => {
      const taskMatch = selectedTask === "All Tasks" || course.tags.tasks.some(t => t.includes(selectedTask.split(" ")[0]));
      const subjectMatch = selectedSubject === "All Subjects" || course.tags.subjects.includes(selectedSubject) || course.tags.subjects.includes("Universal");
      return taskMatch && subjectMatch;
    });
  }, [selectedTask, selectedSubject]);
  const overallProgress = useMemo(() => {
    const completedCourses = Object.values(progress.courses).filter(c => c.isCompleted).length;
    return Math.round(completedCourses / microCourses.length * 100);
  }, [progress]);
  const handleCourseClick = (courseId: string, isPlaceholder: boolean) => {
    if (isPlaceholder) return;
    initCourse(courseId);
    setActiveCourse(courseId);
  };
  const handleBack = () => {
    setActiveCourse(null);
  };

  // Render active course
  if (activeCourse === "constraints-101") {
    const course = microCourses.find(c => c.id === activeCourse)!;
    return <Layout>
        <div className="container mx-auto px-4 py-8">
          <ConstraintsCourse courseProgress={progress.courses[activeCourse]} onCompleteSection={sectionId => completeSection(activeCourse, sectionId)} onAnswerCFU={(cfuId, selected, correct) => answerCFU(activeCourse, cfuId, selected, correct)} onCompleteCourse={() => completeCourse(activeCourse)} onBack={handleBack} overallProgress={getCourseProgress(activeCourse, course.totalSections, course.totalCFUs)} />
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
              <h2 className="text-xl font-semibold text-foreground mb-3">A playground to explore all topics AI</h2>
              <p className="text-muted-foreground mb-4">
                The Learning Studio helps you do your work better and faster. Each micro-course 
                (15-25 minutes) teaches one powerful mental model for working with AI, then has you 
                immediately apply it to real materials you'll use tomorrow.
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

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="w-full sm:w-auto">
            <label className="text-sm text-muted-foreground mb-1 block">Filter by Task</label>
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                {taskFilters.map(task => <SelectItem key={task} value={task}>
                    {task}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <label className="text-sm text-muted-foreground mb-1 block">Filter by Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectFilters.map(subject => <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => <MicroCourseCard key={course.id} id={course.id} title={course.title} description={course.description} duration={course.duration} mentalModel={course.mentalModel} tags={course.tags} icon={course.icon} progress={getCourseProgress(course.id, course.totalSections, course.totalCFUs)} isCompleted={progress.courses[course.id]?.isCompleted || false} isPlaceholder={course.isPlaceholder} onClick={() => handleCourseClick(course.id, course.isPlaceholder)} />)}
        </div>
      </section>
    </Layout>;
};
export default LearningStudio;