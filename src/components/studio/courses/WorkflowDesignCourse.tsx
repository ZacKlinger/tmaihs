import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface WorkflowDesignCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const WorkflowDesignCourse = (props: WorkflowDesignCourseProps) => {
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
              "You need to design a complete 14-week documentary project: driving question, milestone sequence, 
              formative assessments, differentiated scaffolds, and public presentation criteria. No single prompt 
              can handle all of that well. But what if you chained prompts together—each output feeding the next?"
            </p>
          </div>
          <p>
            Complex project design can't be solved with one prompt. <strong>Workflow design</strong> is the 
            practice of chaining prompts in purposeful sequences, where each step builds on the previous.
          </p>
          <p>
            In this micro-course, you'll learn to design prompt chains that produce coherent, 
            interconnected project materials.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This mirrors <ResearchLink text="Backward Design" /> (Wiggins & McTighe)—start with the end in mind, 
            then design backward to ensure alignment.
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
          <h2 className="text-xl font-semibold text-foreground">The Workflow Design Mental Model</h2>
          <p className="text-lg">
            A prompt workflow is a <strong>sequence where outputs become inputs</strong>. Each step 
            produces exactly what the next step needs.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-6">
            <p className="font-medium text-foreground mb-3">Example: Semester Project Workflow (Backward Design)</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                <span><strong>Define the public product</strong> → <em>What will students create and for whom?</em></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                <span><strong>Craft the driving question</strong> → <em>What question drives the investigation?</em></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                <span><strong>Design the final assessment</strong> → <em>Rubric aligned to driving question + product</em></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</span>
                <span><strong>Map backward to milestones</strong> → <em>What checkpoints build to the final product?</em></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">5</span>
                <span><strong>Generate scaffolds</strong> → <em>What support do students need at each milestone?</em></span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Workflow Design Principles</h3>
          <ul>
            <li><strong>Each step has one job.</strong> Don't ask for too much at once.</li>
            <li><strong>Outputs are formatted for inputs.</strong> Ask for outputs you can paste into the next prompt.</li>
            <li><strong>Early steps constrain later steps.</strong> The driving question should appear in every subsequent step.</li>
            <li><strong>Include context carryover.</strong> Remind later prompts of decisions from earlier steps.</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> Workflows aren't just efficient—they produce more coherent outputs 
              because each step is aware of what came before. This mirrors <ResearchLink text="Gold Standard PBL" />: 
              every activity should connect to the driving question and final product.
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
        id: "workflow-design-cfu-1",
        type: "sequence-order" as const,
        question: "Put these prompt steps in the correct backward design order.",
        description: "Think about what information each step needs from the previous step.",
        steps: [
          { id: "product", text: "Define the public product and authentic audience", correctPosition: 1 },
          { id: "question", text: "Craft a driving question that guides the investigation", correctPosition: 2 },
          { id: "rubric", text: "Design the final assessment rubric aligned to both", correctPosition: 3 },
          { id: "milestones", text: "Map milestone checkpoints that build toward the product", correctPosition: 4 },
          { id: "scaffolds", text: "Generate differentiated scaffolds for each milestone", correctPosition: 5 },
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "workflow-design-cfu-2",
        type: "identify-missing" as const,
        prompt: "Workflow for designing a semester documentary project:",
        context: "Step 1: Generate weekly topics. Step 2: Create final presentation rubric. Step 3: Write lesson plans. What's missing?",
        elements: [
          { id: "driving-q", label: "Driving question before weekly topics", isMissing: true, explanation: "Weekly topics should emerge from the driving question, not precede it" },
          { id: "product-def", label: "Public product definition before rubric", isMissing: true, explanation: "The rubric should assess the product students will actually create" },
          { id: "milestones", label: "Milestone checkpoints before full lesson plans", isMissing: true, explanation: "Lesson plans should support milestone checkpoints, not exist independently" },
          { id: "topics", label: "Weekly topics", isMissing: false, explanation: "This is in Step 1 (though it's in the wrong sequence)" },
          { id: "rubric", label: "Presentation rubric", isMissing: false, explanation: "This is in Step 2 (though it needs product definition first)" },
        ],
        minCorrect: 2,
      },
    },
    {
      id: "cfu-3",
      type: "cfu" as const,
      title: "Check 3",
      advancedCfuData: {
        id: "workflow-design-cfu-3",
        type: "workflow-builder" as const,
        question: "Build a workflow for designing differentiated milestone activities.",
        goal: "Create scaffolded activities for students at three levels for a single project milestone.",
        prompts: [
          { id: "p1", text: "Start with the milestone's learning objective and success criteria", isCorrect: true, explanation: "Clear objectives ensure all levels aim for the same learning goal" },
          { id: "p2", text: "Generate all three levels in a single prompt for efficiency", isCorrect: false, explanation: "This violates 'one job per step'—quality suffers when combining complex tasks" },
          { id: "p3", text: "Create the on-level version as the baseline first", isCorrect: true, explanation: "On-level is the anchor; other versions adapt from there" },
          { id: "p4", text: "Adapt upward (advanced) and downward (approaching) in separate steps", isCorrect: true, explanation: "Systematic adaptation maintains coherence across all versions" },
          { id: "p5", text: "Start with the most advanced version and simplify down", isCorrect: false, explanation: "Starting advanced risks losing alignment to core objective—start at grade level" },
          { id: "p6", text: "Check that all versions still connect to the driving question", isCorrect: true, explanation: "Differentiation should change difficulty, not relevance to the project" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Design Your Project Workflow",
        description: "Create a multi-step prompt workflow for a semester-long project you're planning.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Complete Project Workflow Template",
            prompt: `STEP 1 - Public Product:
"Define a public product for a [LENGTH]-week [SUBJECT] project for [GRADE] students on [TOPIC]. The product should have a real audience and demonstrate [LEARNING GOALS]. Output: Product description, target audience, success criteria."

STEP 2 - Driving Question (use Step 1 output):
"Given this public product: [PASTE FROM STEP 1], craft a driving question that is open-ended, connects to students' lives, and requires sustained inquiry. Output: 3 candidate driving questions with rationale."

STEP 3 - Assessment (use Steps 1-2 output):
"Given this product and driving question: [PASTE FROM STEPS 1-2], design a rubric with 4 criteria. Each criterion should connect to the driving question. Output: Full rubric in table format."

STEP 4 - Milestone Map (use Steps 1-3 output):
"Given the above, map [NUMBER] milestone checkpoints across the [LENGTH] weeks. Each milestone should build toward the final product. Output: Timeline with milestone descriptions and success criteria."

STEP 5 - Scaffold One Milestone (use Step 4 output):
"For milestone [X]: [PASTE DESCRIPTION], create differentiated activities at three levels. All should meet the same learning objective. Output: Three activity versions with teacher notes."`,
          },
          {
            label: "Context Carryover Template",
            prompt: `CONTEXT FROM PRIOR STEPS:
- Driving question: [PASTE]
- Public product: [PASTE]
- Current milestone: Week [X] of [TOTAL]

Given this context, [YOUR NEXT TASK].

Ensure all outputs:
1. Explicitly reference the driving question
2. Build toward the public product
3. Are appropriate for students at this point in the project arc`,
          },
        ],
        iterationTips: [
          "Start workflows with high-level decisions (driving question, final product) before details.",
          "Format each output for pasting: 'Output as a numbered list I can paste into the next prompt.'",
          "Use context carryover prompts to maintain coherence across long conversations.",
          "If a step produces poor output, that step's constraints need work (revisit Tier 1).",
        ],
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
              Think about a complex planning task you repeat each semester—designing a unit, creating assessments, 
              building project materials. What steps do you currently do manually that could become a reusable workflow? 
              Which decisions early in the process constrain everything that follows?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Transfer Challenge:</p>
            <p className="text-muted-foreground">
              Design and save one reusable workflow template for a task you do regularly. A good workflow is 
              content-agnostic—you can swap in different topics while keeping the structure.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to Tier 1:</strong> Every step in a workflow should use strong constraints. 
              Weak prompts at any step break the chain's coherence.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="workflow-design-201"
      title="Workflow Design: Chaining Prompts for Complex Tasks"
      sections={sections}
      {...props}
    />
  );
};
