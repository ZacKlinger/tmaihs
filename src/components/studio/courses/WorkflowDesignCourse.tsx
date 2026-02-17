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
            This is where your PBL unit gets built. You've stress-tested the concept and gathered
            perspectives on it. Now you'll use a backward design workflow — with your Constitution
            loaded — to produce the full unit: driving question, milestone map, assessment rubric,
            and scaffolds. Each step feeds the next. The deliverable is something you could
            actually teach next semester.
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
        title: "Build Your PBL Unit",
        description: "This is the build. Load your Constitution, paste your revised unit concept, and run the backward design workflow step by step. Each output feeds the next. By the end, you'll have a complete PBL unit you could actually teach.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Build Your PBL Unit (Backward Design Workflow)",
            prompt: `[PASTE YOUR AI CLASSROOM CONSTITUTION FIRST]

---

UNIT CONCEPT (revised from pre-mortem and perspective review):
[PASTE YOUR REVISED UNIT CONCEPT]

---

Run this workflow step by step. Paste each output into the next step.

STEP 1 - Public Product:
"Based on my Constitution and unit concept, define the public product. Who is the real audience? What will students create? What does success look like? Output: Product description, target audience, success criteria."

STEP 2 - Driving Question (use Step 1 output):
"Given this public product: [PASTE FROM STEP 1], craft a driving question that is open-ended, connects to my students' lives, and requires sustained inquiry. Output: 3 candidate driving questions with rationale."

STEP 3 - Assessment (use Steps 1-2 output):
"Given this product and driving question: [PASTE FROM STEPS 1-2], design an assessment rubric that matches my Quality Standards from the Constitution. Each criterion should connect to the driving question. Output: Full rubric in table format."

STEP 4 - Milestone Map (use Steps 1-3 output):
"Given the above, map milestone checkpoints across the full timeline. Each milestone should build toward the final product. Include formative assessment at each checkpoint. Output: Timeline with milestone descriptions and success criteria."

STEP 5 - Scaffold One Milestone (use Step 4 output):
"For milestone [X]: [PASTE DESCRIPTION], create differentiated activities based on the differentiation needs in my Constitution. All levels should meet the same learning objective. Output: Three activity versions with teacher notes."

---
SAVE THIS: Your complete PBL unit — product, driving question, rubric, milestone map, and at least one scaffolded activity. This is your Tier 2 deliverable.`,
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
            <p className="font-medium mb-2">Your PBL Unit Is Complete</p>
            <p className="text-muted-foreground">
              You now have a complete PBL unit: public product, driving question, assessment rubric,
              milestone map, and at least one scaffolded activity. This was built on your Constitution,
              stress-tested with a pre-mortem, and reviewed from multiple perspectives. It's something
              you could actually teach.
            </p>
            <p className="text-muted-foreground mt-3">
              Add your workflow template to your Constitution as a reusable tool. Next semester, you
              can swap in a new topic and run the same workflow to produce a new unit.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What's Next</p>
            <p className="text-muted-foreground">
              In Tier 3, the question shifts. You've built something real — now the work is about
              judgment. How do you evaluate AI outputs before they reach students? How do you design
              assignments where genuine work is the easier path? How do students use AI productively?
              The deliverable is a Classroom AI Policy you could hand to anyone who asks.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Before Tier 3:</strong> Review your PBL unit one more time. Would you actually
              teach this? If something doesn't sit right, iterate on it now. The unit should be
              something you're genuinely proud of before you move on.
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
