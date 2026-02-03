import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface MetaPromptingCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const MetaPromptingCourse = (props: MetaPromptingCourseProps) => {
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
              "You're designing a cross-curricular project that combines science and humanities—students will investigate 
              local water quality and create a public awareness campaign. But you keep getting outputs that feel 
              siloed—the science part doesn't connect to the communication part. You suspect your prompt is missing something, 
              but you can't see what."
            </p>
          </div>
          <p>
            This is where <strong>meta-prompting</strong> becomes powerful. Instead of guessing what's wrong, 
            you ask AI to analyze your prompt before—or after—you use it.
          </p>
          <p>
            In this micro-course, you'll learn to use AI as a prompt critic, identifying gaps and improvements 
            that lead to better project materials.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This approach mirrors <ResearchLink text="Self-Regulated Learning" /> (Zimmerman)—monitoring and adjusting 
            your own thinking process rather than just executing it.
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
          <h2 className="text-xl font-semibold text-foreground">The Meta-Prompting Mental Model</h2>
          <p className="text-lg">
            Meta-prompting means <strong>using AI to improve your prompts</strong> rather than just 
            using AI to complete tasks. It's prompt engineering with a feedback loop.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Standard Approach:</p>
              <p className="text-sm text-muted-foreground">Write prompt → Get output → Edit output manually</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="font-medium text-primary mb-2">Meta-Prompting Approach:</p>
              <p className="text-sm text-muted-foreground">Write prompt → Ask AI to critique → Improve prompt → Get better output</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Key Meta-Prompts for PBL Design</h3>
          <ul>
            <li><strong>"What's missing from this prompt?"</strong> — Identifies gaps in constraints or context</li>
            <li><strong>"What assumptions does this prompt make about my students?"</strong> — Reveals hidden prerequisites</li>
            <li><strong>"How would this project fail?"</strong> — Surfaces design weaknesses before students encounter them</li>
            <li><strong>"What scaffolds am I forgetting?"</strong> — Catches missing support structures</li>
            <li><strong>"Rate this prompt 1-10 for [specific criterion] and explain."</strong> — Forces structured evaluation</li>
          </ul>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The same AI that produces mediocre output from a weak prompt 
              can often identify exactly why that prompt is weak. It's like having a thought partner 
              who can see your blind spots.
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
        id: "meta-prompting-cfu-1",
        type: "prompt-compare" as const,
        question: "Which approach is more likely to surface gaps in a project design?",
        context: "You've drafted a prompt for a semester-long project but aren't sure if it's complete.",
        options: [
          {
            id: "A",
            prompt: "Is this project plan good? 'Students will research local environmental issues and create presentations.'",
            isCorrect: false,
            annotations: [
              { text: "Is this project plan good?", label: "Yes/no question limits feedback", color: "bg-amber-500/20" },
            ],
            explanation: "Yes/no questions get yes/no answers. This doesn't ask for specific improvements or define what 'good' means for your context.",
          },
          {
            id: "B",
            prompt: "Before I finalize this project plan, help me stress-test it. Identify: (1) What skills does this assume students already have? (2) Where might students get stuck without additional scaffolding? (3) What's the weakest connection between activities and the final product? (4) What would make this project fail?",
            isCorrect: true,
            annotations: [
              { text: "stress-test it", label: "Explicit critique request", color: "bg-green-500/20" },
              { text: "What skills does this assume", label: "Surfaces prerequisites", color: "bg-green-500/20" },
              { text: "Where might students get stuck", label: "Anticipates problems", color: "bg-green-500/20" },
              { text: "What would make this project fail", label: "Pre-mortem approach", color: "bg-green-500/20" },
            ],
            explanation: "This meta-prompt uses specific questions to surface different types of weaknesses. It treats AI as a design critic, not a validator.",
          },
        ] as [
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string },
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string }
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "meta-prompting-cfu-2",
        type: "spot-the-difference" as const,
        question: "Identify the improvements made to this project prompt after meta-prompting critique.",
        description: "Click on the parts of the improved prompt that address gaps identified in the original.",
        promptA: "Create a 12-week project where students investigate a local issue and present their findings to the community.",
        promptB: "Create a 12-week project where 10th graders investigate a local water quality issue and present findings to city council members. Students should have checkpoints at Weeks 4, 8, and 11. Include scaffolds for students who struggle with data interpretation. The final presentation should include both scientific data and personal stories from community interviews.",
        segmentsB: [
          { id: "s1", text: "Create a 12-week project where", isDifferent: false, effect: "" },
          { id: "s2", text: " 10th graders ", isDifferent: true, effect: "Specifies grade level—AI can calibrate complexity appropriately" },
          { id: "s3", text: "investigate a local", isDifferent: false, effect: "" },
          { id: "s4", text: " water quality ", isDifferent: true, effect: "Specific topic focus instead of vague 'local issue'" },
          { id: "s5", text: "issue and present findings to", isDifferent: false, effect: "" },
          { id: "s6", text: " city council members", isDifferent: true, effect: "Defined authentic audience shapes presentation requirements" },
          { id: "s7", text: ".", isDifferent: false, effect: "" },
          { id: "s8", text: " Students should have checkpoints at Weeks 4, 8, and 11.", isDifferent: true, effect: "Formative structure prevents end-of-project scramble" },
          { id: "s9", text: " Include scaffolds for students who struggle with data interpretation.", isDifferent: true, effect: "Addresses likely skill gap proactively" },
          { id: "s10", text: " The final presentation should include both scientific data and personal stories from community interviews.", isDifferent: true, effect: "Connects cross-curricular elements that were previously siloed" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Meta-Prompting for Project Design",
        description: "Practice using AI to critique and improve your project prompts before generating materials.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Project Pre-Mortem",
            prompt: `Here's my project plan: [PASTE YOUR PROJECT OUTLINE]

Before I build out the details, conduct a pre-mortem:

1. SKILL GAPS: What skills does this assume students already have? Which might they lack?
2. PACING RISKS: Where is the timeline most likely to fall apart?
3. ENGAGEMENT DROPS: At what point might students lose motivation? Why?
4. SCAFFOLDING HOLES: What support structures am I forgetting?
5. ASSESSMENT BLIND SPOTS: How might students "complete" this without actually learning?

For each issue, suggest a specific fix.`,
          },
          {
            label: "Cross-Curricular Connection Check",
            prompt: `I'm designing a project that combines [SUBJECT 1] and [SUBJECT 2]:
[PASTE YOUR PROJECT OUTLINE]

Analyze the integration:
1. Are the disciplines genuinely connected, or just adjacent?
2. Where do students use [SUBJECT 1] skills to advance [SUBJECT 2] understanding (and vice versa)?
3. What's missing that would make the connection feel authentic rather than forced?
4. How could the final product require genuine synthesis rather than parallel tracks?`,
          },
        ],
        iterationTips: [
          "Use meta-prompting BEFORE spending time generating materials—it's cheaper to fix a prompt than to redo outputs.",
          "Ask AI to identify your prompt's assumptions: 'What does this prompt assume about my students that might not be true?'",
          "Request a specific number of critiques: '5 weaknesses in this project design' produces better output than 'any feedback.'",
          "Combine meta-prompting with iteration: get critique, revise prompt, then generate materials.",
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
              Think about a project you've designed recently. What assumptions did you make about student skills 
              or prior knowledge that might not have been accurate? How could meta-prompting have surfaced those 
              assumptions before students encountered problems?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Transfer Challenge:</p>
            <p className="text-muted-foreground">
              Before your next project planning session, add a meta-prompting step: paste your draft plan and 
              ask for a "pre-mortem"—what could go wrong? Use the critique to strengthen your design before 
              building out materials.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to Tier 1:</strong> Meta-prompting works because you're applying the 
              Constraints mental model to the critique itself—constraining what kind of feedback you want.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="meta-prompting-201"
      title="Meta-Prompting: Using AI to Improve Your Prompts"
      sections={sections}
      {...props}
    />
  );
};
