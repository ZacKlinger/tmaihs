import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface WorkflowDesignCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
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
              "You need to create a complete unit: learning objectives, lesson sequence, assessments, 
              and differentiated materials. No single prompt can handle all of that well. 
              But what if you chained prompts together—each output feeding the next?"
            </p>
          </div>
          <p>
            Complex instructional design tasks can't be solved with one prompt. <strong>Workflow 
            design</strong> is the practice of chaining prompts in purposeful sequences, where each 
            step builds on the previous.
          </p>
          <p>
            In this micro-course, you'll learn to design prompt chains that produce coherent, 
            interconnected outputs.
          </p>
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
            is designed to produce exactly what the next step needs.
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-6">
            <p className="font-medium text-foreground mb-3">Example: Unit Planning Workflow</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                <span>Define learning objectives → <em>Output: 3-5 measurable objectives</em></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                <span>Design summative assessment aligned to objectives → <em>Output: Assessment + rubric</em></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                <span>Create lesson sequence that builds to assessment → <em>Output: 5-lesson arc</em></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</span>
                <span>Generate differentiated materials for one lesson → <em>Output: Tiered resources</em></span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Workflow Design Principles</h3>
          <ul>
            <li><strong>Each step has one job.</strong> Don't ask for too much at once.</li>
            <li><strong>Outputs are formatted for inputs.</strong> Ask for outputs in the format you'll paste into the next prompt.</li>
            <li><strong>Early steps constrain later steps.</strong> Objectives set in step 1 should appear in step 3.</li>
            <li><strong>Include context carryover.</strong> Remind later prompts of decisions from earlier steps.</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> Workflows aren't just efficient—they produce more 
              <em>coherent</em> outputs because each step is aware of what came before.
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
        question: "Put these prompt steps in the correct order for designing a project-based unit.",
        description: "Think about what information each step needs from the previous step.",
        steps: [
          { id: "objectives", text: "Define 3 learning objectives for the unit", correctPosition: 1 },
          { id: "summative", text: "Design the final project/assessment aligned to objectives", correctPosition: 2 },
          { id: "scaffolds", text: "Break the project into checkpoints with success criteria", correctPosition: 3 },
          { id: "lessons", text: "Create lessons that teach skills needed for each checkpoint", correctPosition: 4 },
          { id: "resources", text: "Generate differentiated resources for struggling learners", correctPosition: 5 },
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
        prompt: "Workflow for creating a formative assessment sequence:",
        context: "Step 1: List unit objectives. Step 2: Create final test. Step 3: Create study guide. What's missing?",
        elements: [
          { id: "diagnostic", label: "Pre-assessment to identify starting points", isMissing: true, explanation: "Understanding where students begin helps target instruction" },
          { id: "checkpoints", label: "Mid-unit check-ins aligned to objectives", isMissing: true, explanation: "Formative assessment means checking throughout, not just at the end" },
          { id: "feedback", label: "Feedback mechanisms between assessments", isMissing: true, explanation: "Assessments need to inform instruction, not just measure" },
          { id: "objectives", label: "Clear learning objectives", isMissing: false, explanation: "This is already in Step 1" },
          { id: "final", label: "Summative assessment", isMissing: false, explanation: "This is already in Step 2" },
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
        question: "Build a workflow for differentiating a lesson.",
        goal: "Take an existing lesson and create three versions: approaching, on-level, and advanced.",
        prompts: [
          { id: "p1", text: "Analyze the original lesson and identify the core skill being taught", isCorrect: true, explanation: "You need to know what to preserve across all versions" },
          { id: "p2", text: "Create the advanced version with extension activities", isCorrect: false, explanation: "Starting with advanced risks losing alignment to core skill; start with on-level" },
          { id: "p3", text: "Define what success looks like at each level", isCorrect: true, explanation: "Clear criteria ensure differentiation is meaningful, not just harder/easier" },
          { id: "p4", text: "Generate all three versions in one prompt", isCorrect: false, explanation: "This violates 'one job per step'—quality suffers when combining" },
          { id: "p5", text: "Create the on-level version as the baseline", isCorrect: true, explanation: "On-level is the anchor; other versions modify from there" },
          { id: "p6", text: "Adapt the on-level version down (approaching) and up (advanced)", isCorrect: true, explanation: "Systematic adaptation maintains coherence across versions" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Design Your Own Workflow",
        description: "Create a multi-step prompt workflow for a task you actually need to complete.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Workflow Planning Template",
            prompt: `I need to complete this instructional design task: [YOUR TASK]

Help me design a prompt workflow:
1. What are the 3-4 key steps?
2. What output format should each step produce?
3. What information carries forward from each step to the next?
4. Write the actual prompts for each step.`,
          },
          {
            label: "Context Carryover Template",
            prompt: `Context from previous steps:
- Learning objectives: [PASTE FROM STEP 1]
- Assessment design: [PASTE FROM STEP 2]

Given this context, now [YOUR NEXT TASK]. Make sure all outputs align with the objectives and assessment above.`,
          },
        ],
        iterationTips: [
          "Start workflows with high-level decisions (objectives, outcomes) before details.",
          "Format each output explicitly: 'Output as a numbered list I can paste into the next prompt.'",
          "Use 'context carryover' prompts to maintain coherence across a long conversation.",
          "If a step produces poor output, that step's prompt needs better constraints (Tier 1).",
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
            <p className="font-medium mb-2">Reflection Question:</p>
            <p className="text-muted-foreground">
              What complex task do you repeat each semester (unit planning, assessment design, 
              report writing)? Sketch a 3-4 step workflow that could streamline it.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              Save your best workflows as templates. A good workflow is reusable—swap in new 
              content while keeping the structure.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to Tier 1:</strong> Every step in a workflow should use strong 
              constraints. Weak prompts in any step break the chain.
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
