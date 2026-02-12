import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface ConstraintsCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const ConstraintsCourse = (props: ConstraintsCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Work Context</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              "You're designing a semester-long immigration history project. Right now, you're in Week 4—primary source analysis. 
              You need differentiated materials for students at three reading levels, and you have 40 minutes before your next class."
            </p>
          </div>
          <p>
            This is exactly where AI can help—but only if you give it the right constraints. 
            Vague requests produce generic outputs. Specific constraints produce materials you can actually use.
          </p>
          <p>
            In this micro-course, you'll learn the <strong>Constraints mental model</strong>—the foundation 
            of getting useful, classroom-ready outputs from any AI tool.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This approach draws on <ResearchLink text="Cognitive Load Theory" /> (Sweller)—by constraining the task, 
            you reduce extraneous cognitive load for both you and the AI.
          </div>
        </div>
      ),
    },
    {
      id: "mental-model",
      type: "mental-model" as const,
      title: "Mental Model",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Constraints Mental Model</h2>
          <p className="text-lg">
            AI models default to <strong>average patterns</strong>—the most common way something is typically done.
            Constraints narrow the possibility space to exactly what you need.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without Constraints:</p>
              <p className="text-sm">"Create activities for my immigration project"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Generic, grade-agnostic, disconnected from your specific project phase
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Constraints:</p>
              <p className="text-sm">
                "Create a primary source analysis activity for 10th graders using this 1910 immigration interview transcript. 
                Include guiding questions at three reading levels. Students should be able to complete this in 25 minutes. 
                This is Week 4 of a 14-week documentary project."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Specific, scaffolded, aligned to your project arc
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Types of Constraints for PBL</h3>
          <ul>
            <li><strong>Project Phase:</strong> Where are students in the semester arc? (Research, prototyping, revision, presentation)</li>
            <li><strong>Prior Work:</strong> What have students already produced that this builds on?</li>
            <li><strong>Time Box:</strong> How long should this activity take?</li>
            <li><strong>Differentiation:</strong> What reading levels, scaffolds, or extensions are needed?</li>
            <li><strong>Final Product Connection:</strong> How does this connect to the public-facing deliverable?</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> In <ResearchLink text="Gold Standard PBL" />, every activity connects 
              to a driving question and public product. Your constraints should make those connections explicit.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "constraints-cfu-1",
        type: "prompt-compare" as const,
        question: "Which prompt would produce immediately usable materials for a semester-long project?",
        context: "A teacher is in Week 6 of a 14-week documentary project on local environmental issues. Students need to conduct community interviews.",
        options: [
          {
            id: "A",
            prompt: "Create interview questions for students doing a documentary project about the environment.",
            isCorrect: false,
            annotations: [
              { text: "documentary project", label: "No project phase specified", color: "bg-amber-500/20" },
              { text: "about the environment", label: "Too broad", color: "bg-amber-500/20" },
            ],
            explanation: "This prompt lacks constraints about where students are in the project arc, what they've already learned, and what their specific focus is. AI will produce generic journalism questions.",
          },
          {
            id: "B",
            prompt: "Create 8 interview questions for 10th graders interviewing local residents about water quality concerns. This is Week 6 of a 14-week documentary project. Students have already researched EPA data and identified 3 key pollution sources. Questions should help them gather personal stories that complement their data. Include 2 warm-up questions, 4 substantive questions, and 2 follow-up probes.",
            isCorrect: true,
            annotations: [
              { text: "Week 6 of a 14-week", label: "Project phase", color: "bg-green-500/20" },
              { text: "already researched EPA data", label: "Prior work", color: "bg-green-500/20" },
              { text: "complement their data", label: "Product connection", color: "bg-green-500/20" },
              { text: "2 warm-up, 4 substantive, 2 follow-up", label: "Structure", color: "bg-green-500/20" },
            ],
            explanation: "This prompt situates the task in the project arc, builds on prior student work, and specifies how outputs connect to the final documentary. The AI knows exactly what to produce.",
          },
        ] as [
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string },
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string }
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Constraints for PBL",
        description: "Apply constraints to your own project-based work. Use these templates, then iterate based on your actual classroom context.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Semester Project Checkpoint",
            prompt: `I'm designing Week [NUMBER] of a [TOTAL WEEKS]-week project on [TOPIC].

Project context:
- Driving question: [YOUR DRIVING QUESTION]
- Final product: [WHAT STUDENTS WILL CREATE]
- What students have completed so far: [PRIOR WORK]

Create a [TYPE OF ACTIVITY] that:
- Takes approximately [TIME] minutes
- Builds directly on their prior work
- Moves them toward the final product
- Includes differentiation for [DESCRIBE YOUR LEARNERS]`,
          },
          {
            label: "Primary Source Analysis (Differentiated)",
            prompt: `Create a primary source analysis activity for [GRADE] students using this source: [DESCRIBE OR PASTE SOURCE]

Project context: This is part of a semester-long [PROJECT TYPE] project. Students are in the [PHASE] phase.

Create guiding questions at three levels:
- Approaching: Focus on comprehension, include vocabulary support
- On-level: Focus on analysis and evidence
- Advanced: Focus on synthesis and connection to broader themes

Each version should take 20-25 minutes and prepare students for [NEXT STEP IN PROJECT].`,
          },
        ],
        iterationTips: [
          "Always include where students are in the project arc—Week 3 materials differ from Week 10 materials.",
          "Specify what students have already produced. AI can't build on prior work it doesn't know about.",
          "Connect activities to the final public product: 'This will become part of their documentary/exhibition/website.'",
          "If output is too generic, add constraints about your specific student population and school context.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "constraints-cfu-2",
        type: "identify-missing" as const,
        prompt: "Create a rubric for my students' history project presentations.",
        context: "A teacher wants a rubric for a semester-long PBL project but gets generic output. What constraints are missing?",
        elements: [
          { id: "project-specifics", label: "Specific project topic and driving question", isMissing: true, explanation: "The rubric should assess how well students addressed THEIR driving question, not generic 'research skills'" },
          { id: "prior-milestones", label: "Connection to prior project milestones", isMissing: true, explanation: "A good PBL rubric references the checkpoints students completed throughout the project" },
          { id: "audience-context", label: "Who the audience is for the presentation", isMissing: true, explanation: "A presentation to community partners requires different criteria than a classroom presentation" },
          { id: "point-scale", label: "Point scale (4-point, 6-point, etc.)", isMissing: true, explanation: "The rubric structure depends on your grading system" },
          { id: "ai-tool", label: "Which AI tool to use", isMissing: false, explanation: "Tool choice doesn't affect rubric quality—constraints do" },
          { id: "rubric-format", label: "Whether to use a table format", isMissing: false, explanation: "Format is secondary to content; AI will default to a sensible format" },
        ],
        minCorrect: 3,
      },
    },
    {
      id: "reflection",
      type: "reflection" as const,
      title: "Reflection",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Reflection & Transfer</h2>
          
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium mb-2">Metacognitive Check:</p>
            <p className="text-muted-foreground">
              Think about a project you're currently planning or running. What phase are students in right now? 
              What specific constraints would you need to include to get AI output that connects to both their 
              prior work AND their final product?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Transfer Challenge:</p>
            <p className="text-muted-foreground">
              Before your next AI prompt for project materials, write down at least 5 constraints first: 
              project phase, prior student work, time available, differentiation needs, and connection to final product. 
              Notice how this changes the usefulness of your first output.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Remember:</strong> In <ResearchLink text="Backward Design" />, you start with the end in mind. 
              The same principle applies to prompts—your constraints should reflect your learning goals.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="constraints-101"
      title="Constraints: The Foundation of Useful Prompts"
      sections={sections}
      {...props}
    />
  );
};
