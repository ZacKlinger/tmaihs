import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface CriticalEvaluationCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const CriticalEvaluationCourse = (props: CriticalEvaluationCourseProps) => {
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
              "AI just generated your lesson materials. They look good—professional formatting, 
              clear structure, comprehensive content. But before you hand them to students... 
              how do you know they're actually accurate? Appropriate? Free from bias?"
            </p>
          </div>
          <p>
            AI outputs can be confidently wrong, subtly biased, or contextually inappropriate. 
            <strong> Critical evaluation</strong> is the skill of systematically reviewing AI outputs 
            across three lenses: accuracy, bias, and appropriateness.
          </p>
          <p>
            In this micro-course, you'll develop a personal evaluation framework that catches 
            problems before they reach students.
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
          <h2 className="text-xl font-semibold text-foreground">The Three-Lens Evaluation Model</h2>
          <p className="text-lg">
            Every AI output should pass through three evaluation lenses before use.
          </p>
          
          <div className="grid gap-4 my-6">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <p className="font-medium text-red-700 dark:text-red-300 mb-2">🔴 Lens 1: Accuracy</p>
              <p className="text-sm text-muted-foreground">Is this factually correct? AI can "hallucinate" citations, statistics, historical facts, and scientific claims with complete confidence.</p>
              <p className="text-xs mt-2 text-muted-foreground italic">Check: Dates, names, quotations, statistics, scientific claims</p>
            </div>
            
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <p className="font-medium text-amber-700 dark:text-amber-300 mb-2">🟡 Lens 2: Bias</p>
              <p className="text-sm text-muted-foreground">Does this reflect assumptions, stereotypes, or perspectives that exclude some students? AI training data contains societal biases.</p>
              <p className="text-xs mt-2 text-muted-foreground italic">Check: Representation, default assumptions, whose perspectives are centered</p>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">🔵 Lens 3: Appropriateness</p>
              <p className="text-sm text-muted-foreground">Is this appropriate for YOUR specific students, context, and learning goals? AI doesn't know your classroom.</p>
              <p className="text-xs mt-2 text-muted-foreground italic">Check: Reading level, cultural context, sensitivity, alignment to objectives</p>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <p className="text-sm">
              <strong>Key insight:</strong> The more confident AI sounds, the more carefully you should 
              verify. Hallucinations are delivered with the same tone as facts.
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
        id: "critical-evaluation-cfu-1",
        type: "bias-spotter" as const,
        question: "Identify potential bias in this AI-generated content.",
        context: "AI was asked to create a writing prompt about 'a typical American family'.",
        aiOutput: "Write about a typical American family.",
        segments: [
          { id: "s1", text: "Write a story about a typical American family.", hasBias: false, explanation: "" },
          { id: "s2", text: "The family lives in a suburban house with a white picket fence.", hasBias: true, biasType: "Socioeconomic assumption", explanation: "Assumes suburban homeownership as 'typical'—excludes urban, rural, and rental experiences." },
          { id: "s3", text: "Mom makes breakfast while Dad reads the newspaper before work.", hasBias: true, biasType: "Gender role stereotype", explanation: "Reinforces traditional gender roles that don't reflect many students' family structures." },
          { id: "s4", text: "The two children, a boy and a girl, get ready for school.", hasBias: true, biasType: "Family structure assumption", explanation: "Assumes two-parent, two-child, binary-gendered family as default." },
          { id: "s5", text: "Include sensory details and dialogue in your story.", hasBias: false, explanation: "" },
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "critical-evaluation-cfu-2",
        type: "prompt-compare" as const,
        question: "Which evaluation approach would better catch accuracy issues?",
        context: "You received AI-generated content about the causes of World War I.",
        options: [
          {
            id: "A",
            prompt: "Check if the writing sounds professional and well-organized.",
            isCorrect: false,
            annotations: [
              { text: "sounds professional", label: "Style ≠ accuracy", color: "bg-amber-500/20" },
            ],
            explanation: "AI excels at sounding professional. Hallucinated facts can be beautifully written. This checks style, not substance.",
          },
          {
            id: "B",
            prompt: "Verify specific claims: Check the assassination date, alliance names, and any statistics against a trusted source.",
            isCorrect: true,
            annotations: [
              { text: "assassination date", label: "Verifiable fact", color: "bg-green-500/20" },
              { text: "alliance names", label: "Proper nouns to check", color: "bg-green-500/20" },
              { text: "trusted source", label: "External verification", color: "bg-green-500/20" },
            ],
            explanation: "Accuracy evaluation requires checking specific, verifiable claims against trusted sources. Names, dates, and statistics are common hallucination points.",
          },
        ] as [
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string },
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string }
        ],
      },
    },
    {
      id: "cfu-3",
      type: "cfu" as const,
      title: "Check 3",
      advancedCfuData: {
        id: "critical-evaluation-cfu-3",
        type: "identify-missing" as const,
        prompt: "AI generated a reading passage about climate change for 8th graders. The teacher only checked that it was at an 8th-grade reading level.",
        context: "What evaluation steps are missing?",
        elements: [
          { id: "accuracy", label: "Verify scientific claims and statistics", isMissing: true, explanation: "Climate data and projections should be verified against scientific sources" },
          { id: "bias", label: "Check for political framing or one-sided perspective", isMissing: true, explanation: "Climate content can inadvertently lean toward political narratives" },
          { id: "sources", label: "Verify any cited sources actually exist", isMissing: true, explanation: "AI frequently hallucinates citations that sound real" },
          { id: "readability", label: "Confirm 8th-grade reading level", isMissing: false, explanation: "This was already checked by the teacher" },
          { id: "length", label: "Check word count", isMissing: false, explanation: "Length is a format issue, not an evaluation priority" },
        ],
        minCorrect: 2,
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Building Your Evaluation Checklist",
        description: "Create a personal evaluation checklist for the types of content you most often generate.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Generate Content to Evaluate",
            prompt: `Create a one-page reading passage about [TOPIC] for [GRADE LEVEL] students. Include 3 key facts with dates or statistics.

[After receiving output, apply the three-lens evaluation]`,
          },
          {
            label: "AI-Assisted Evaluation",
            prompt: `I'm going to share content AI generated for my classroom. Help me evaluate it:

1. ACCURACY: What specific claims should I verify? List any that seem potentially hallucinated.
2. BIAS: What perspectives or assumptions are embedded? Who might feel excluded?
3. APPROPRIATENESS: For [describe your students], what might need adjustment?

[PASTE YOUR AI-GENERATED CONTENT]`,
          },
        ],
        iterationTips: [
          "Never trust citations without checking—AI invents realistic-sounding sources.",
          "Ask yourself: 'Would any of my students feel invisible or stereotyped by this?'",
          "Remember your constraints (Tier 1)—appropriateness depends on what you asked for.",
          "When in doubt, verify. A 2-minute fact-check prevents a classroom correction.",
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
              Think about content you've generated recently. Which of the three lenses 
              (accuracy, bias, appropriateness) do you tend to skip or rush through?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              Create a 3-question checklist for yourself. Before using any AI output, ask:
              (1) Have I verified the facts? (2) Who might this exclude? (3) Is this right for MY students?
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to Tier 1 & 2:</strong> Better constraints produce outputs that need 
              less evaluation—but never skip evaluation entirely. Even good prompts can yield biased or inaccurate outputs.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="critical-evaluation-301"
      title="Critical Evaluation: Accuracy, Bias, and Appropriateness"
      sections={sections}
      {...props}
    />
  );
};
