import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface CriticalEvaluationCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
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
              "You used AI to generate mentor texts for your documentary project—sample interview transcripts 
              students can analyze before conducting their own interviews. The examples look professional: 
              good questions, natural flow, specific details. But then you notice a 'quote' from a local 
              official that doesn't sound right..."
            </p>
          </div>
          <p>
            AI outputs can be confidently wrong, subtly biased, or contextually inappropriate. 
            <strong> Critical evaluation</strong> is the skill of systematically reviewing AI outputs 
            before they reach students.
          </p>
          <p>
            In this micro-course, you'll develop a personal evaluation framework using the 
            <ResearchLink text="SIFT Method" />—a technique originally designed for evaluating online sources.
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
            Every AI output should pass through three evaluation lenses before use—especially materials 
            that will inform student work on semester-long projects.
          </p>
          
          <div className="grid gap-4 my-6">
            <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <p className="font-medium text-red-700 dark:text-red-300 mb-2">🔴 Lens 1: Accuracy</p>
              <p className="text-sm text-muted-foreground">
                Is this factually correct? AI "hallucinates" citations, statistics, historical facts, and quotes with complete confidence. 
                In PBL, inaccurate mentor texts can send students down wrong research paths.
              </p>
              <p className="text-xs mt-2 text-muted-foreground italic">
                Check: Dates, names, quotations, statistics, scientific claims, cited sources
              </p>
            </div>
            
            <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
              <p className="font-medium text-amber-700 dark:text-amber-300 mb-2">🟡 Lens 2: Bias</p>
              <p className="text-sm text-muted-foreground">
                Whose perspectives are centered? Whose are missing? AI training data reflects societal biases. 
                For projects involving community issues, check whether AI-generated materials represent all stakeholders fairly.
              </p>
              <p className="text-xs mt-2 text-muted-foreground italic">
                Check: Representation, default assumptions, whose voices are heard, framing of "problems"
              </p>
            </div>
            
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">🔵 Lens 3: Appropriateness</p>
              <p className="text-sm text-muted-foreground">
                Is this right for YOUR students, YOUR project, YOUR community? AI doesn't know your school's context, 
                your students' backgrounds, or local sensitivities. A generic "urban community" example may misrepresent your neighborhood.
              </p>
              <p className="text-xs mt-2 text-muted-foreground italic">
                Check: Local context fit, reading level, cultural sensitivity, alignment to project phase
              </p>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <p className="text-sm">
              <strong>Key insight:</strong> The more confident AI sounds, the more carefully you should verify. 
              This is why the <ResearchLink text="Stanford History Education Group" /> recommends lateral reading—checking 
              claims against outside sources rather than trusting internal consistency.
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
        question: "Identify potential bias issues in this AI-generated project scenario.",
        context: "AI was asked to create a sample community issue for students to investigate in their documentary project.",
        aiOutput: "Sample documentary topic about community development.",
        segments: [
          { id: "s1", text: "Students will investigate why their neighborhood needs revitalization.", hasBias: true, biasType: "Framing assumption", explanation: "'Needs revitalization' assumes deficiency. The neighborhood may have strengths being overlooked or 'revitalization' may mean displacement for current residents." },
          { id: "s2", text: "They will interview local business owners and city officials.", hasBias: true, biasType: "Perspective exclusion", explanation: "Missing: longtime residents, renters, youth, community organizers. Centering business owners and officials tells one story." },
          { id: "s3", text: "The project will explore how new development can bring economic opportunity.", hasBias: true, biasType: "Single narrative", explanation: "Assumes development = opportunity. Doesn't include perspectives of those who may be displaced or priced out." },
          { id: "s4", text: "Students will create a documentary presenting their findings.", hasBias: false, explanation: "The documentary format itself is neutral—the bias is in what's being documented." },
          { id: "s5", text: "They should include data about property values and business growth.", hasBias: true, biasType: "Metric choice bias", explanation: "These metrics favor development perspective. Missing: housing affordability, displacement rates, community sentiment, cultural impact." },
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
        question: "Which evaluation approach would better catch accuracy issues in project materials?",
        context: "You received AI-generated interview questions for students to use with community members about local water quality.",
        options: [
          {
            id: "A",
            prompt: "Check if the questions sound professional and are well-organized.",
            isCorrect: false,
            annotations: [
              { text: "sound professional", label: "Style ≠ accuracy", color: "bg-amber-500/20" },
            ],
            explanation: "AI excels at sounding professional. Questions can be beautifully written while containing factually wrong premises ('Since the EPA declared this area safe in 2019...' when that never happened).",
          },
          {
            id: "B",
            prompt: "Check each factual claim: verify EPA reports, water quality data, and named sources against official records. Flag any question that assumes facts not established.",
            isCorrect: true,
            annotations: [
              { text: "verify EPA reports", label: "External verification", color: "bg-green-500/20" },
              { text: "water quality data", label: "Check specific claims", color: "bg-green-500/20" },
              { text: "assumes facts not established", label: "Premise checking", color: "bg-green-500/20" },
            ],
            explanation: "Accuracy evaluation requires checking specific, verifiable claims against trusted sources. In PBL, students will build on these materials—errors compound.",
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
        prompt: "AI generated mentor texts (sample interview transcripts) for students to analyze before conducting their own community interviews.",
        context: "The teacher checked that the transcripts were at an appropriate reading level. What evaluation steps are missing?",
        elements: [
          { id: "accuracy", label: "Verify any 'quoted' facts, statistics, or references are real", isMissing: true, explanation: "AI may fabricate realistic-sounding data points that students would then treat as legitimate sources" },
          { id: "bias", label: "Check whose perspectives are represented and whose are absent", isMissing: true, explanation: "Mentor texts model what questions to ask and who to interview—bias here shapes student research" },
          { id: "local-fit", label: "Assess whether examples reflect YOUR community context", isMissing: true, explanation: "A generic 'urban neighborhood' example may not match your specific community's dynamics" },
          { id: "modeling", label: "Consider what interviewing behaviors these examples model", isMissing: true, explanation: "Students will imitate the interview style—check for leading questions, assumptions, or poor practices" },
          { id: "readability", label: "Confirm appropriate reading level", isMissing: false, explanation: "This was already checked by the teacher" },
        ],
        minCorrect: 3,
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Building Your Evaluation Practice",
        description: "Create evaluation checklists for the types of project materials you most often generate.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Generate + Self-Evaluate",
            prompt: `Create [TYPE OF PROJECT MATERIAL] for [YOUR PROJECT CONTEXT].

After generating, evaluate your own output:

ACCURACY: What specific claims did you make that should be verified? Flag anything you're uncertain about.

BIAS: Whose perspectives are centered? Whose might be missing or underrepresented?

APPROPRIATENESS: What assumptions does this make about the students, community, or context?

Provide the material, then provide the evaluation.`,
          },
          {
            label: "Bias Audit",
            prompt: `I'm going to share AI-generated project materials. Conduct a bias audit:

1. REPRESENTATION: Who is visible in this content? Who is invisible?
2. FRAMING: How are problems/issues framed? Whose perspective does the framing assume?
3. METRICS: What counts as success or evidence? What does this prioritize?
4. VOICE: Whose voices are quoted or centered? Whose are paraphrased or absent?

For each issue found, suggest a specific revision.

[PASTE YOUR AI-GENERATED CONTENT]`,
          },
        ],
        iterationTips: [
          "Never trust AI-generated 'quotes' without verification—they're often fabricated.",
          "Ask yourself: 'Would any of my students feel invisible or misrepresented by this content?'",
          "For community-based projects, check whether AI's framing matches how your community sees itself.",
          "When in doubt, verify. A 2-minute fact-check prevents students building on false foundations.",
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
              Think about project materials you've generated recently. Which of the three lenses 
              (accuracy, bias, appropriateness) do you tend to skip or rush through? What's one 
              thing you could do differently to catch issues earlier?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Transfer Challenge:</p>
            <p className="text-muted-foreground">
              Create a 3-question checklist for yourself. Before using any AI-generated project material, ask:
              (1) Have I verified the factual claims? (2) Whose perspectives are centered and whose are missing? 
              (3) Does this fit MY students and community?
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to Tier 1 & 2:</strong> Better constraints produce outputs that need less evaluation—but 
              never skip evaluation entirely. Even well-prompted AI can produce biased or inaccurate content, especially 
              for community-specific contexts.
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
