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
          <h2 className="text-xl font-semibold text-foreground">Before You Build</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You've got a 16-week hydroponics project in your head. Students build systems, collect data, optimize nutrient delivery, and present to the community. You know the driving question, you know the final product, you know where students tend to struggle. You're ready to start building the unit.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              But there's a gap between what's in your head and what's on paper. And the things you haven't thought of yet — the transitions between phases, the assessment blind spots, the scaffolding gaps — those don't show up until Week 6 when a student stares at you blankly and you realize you skipped a step.
            </p>
          </div>
          <p>
            In Tier 1, you built a Constitution — a living document that teaches AI about your classroom. Now you're going to use it. Not to build the unit yet, but to stress-test the idea before you invest the time.
          </p>
          <p>
            Meta-prompting means asking AI to think about your thinking. Instead of "design a unit," you ask: "What's missing from this unit? Where will students get stuck? What am I not seeing?" It's like asking a colleague to poke holes in your plan before you commit to it — except the colleague has your entire classroom context loaded.
          </p>
          <p>
            This course produces your <strong>PBL unit outline</strong> — stress-tested and ready to build on.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Backward Design" /> (Wiggins & McTighe) starts with the end in mind. Meta-prompting adds a step before that: start with what might go wrong.
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
          <h2 className="text-xl font-semibold text-foreground">Ask AI What You Haven't Thought Of</h2>
          <p className="text-lg">
            Most teachers use AI to complete tasks: "Write a rubric." "Create an activity." That works, and your Constitution makes it work better. But AI can do something else — it can interrogate your plan before you execute it.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Task Prompt:</p>
              <p className="text-sm">"Design a 16-week hydroponics unit for my SDC science class"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → AI designs the unit. You evaluate the result. Problems surface after you've invested time in the full build.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">Meta-Prompt:</p>
              <p className="text-sm">
                "Here's my unit concept. Before I build it out, tell me: What's missing? Where will students get stuck between phases? What assumptions am I making that might not hold?"
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → AI interrogates the plan. Problems surface before you've invested the time. You fix them in the outline stage.
              </p>
            </div>
          </div>

          <p>Meta-prompts come in three flavors, and each one catches different gaps:</p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">"What's missing?"</p>
                <p className="text-muted-foreground">Surfaces gaps in content, scaffolding, or assessment that you've overlooked because you know the material too well.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">"How would this fail?"</p>
                <p className="text-muted-foreground">Identifies the moments where students disengage, get confused, or fall behind — the pre-mortem. Every experienced teacher has a list of "things that went wrong last time." This prompt generates that list before the first time.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">"What would a [specific person] say about this?"</p>
                <p className="text-muted-foreground">Uses the stakeholder map from your Constitution to get perspective — what would the fridge coordinator think about your timeline? What would a struggling student think about Week 4's complexity?</p>
              </div>
            </div>
          </div>

          <p>
            The unit you'll build across Tier 2 isn't hypothetical — it's your actual unit. AI doesn't design it for you. You design it, using AI as a thinking partner that catches what you miss. The Constitution from Tier 1 is submitted at the start of every session.
          </p>

          <p className="text-sm text-muted-foreground mt-4">
            <ResearchLink text="PBLWorks Gold Standard" /> design says every activity connects to the driving question and final product. Meta-prompting helps you check that connection at the planning stage, not the teaching stage.
          </p>
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
        question: "You have a unit concept and want AI to help you improve it before building. Which approach surfaces more useful gaps?",
        context: "You've outlined a 16-week hydroponics project: 6 phases, a community presentation, NGSS standards alignment. You want to know if the plan is solid before you start building materials.",
        options: [
          {
            id: "A",
            prompt: "Here's my unit outline. Create a detailed lesson plan for each phase with activities, assessments, and differentiation.",
            isCorrect: false,
            annotations: [
              { text: "Create a detailed lesson plan", label: "Jumps to building — skips testing", color: "bg-amber-500/20" },
              { text: "for each phase", label: "Assumes phases are right", color: "bg-amber-500/20" },
            ],
            explanation: "This goes straight to execution. If the phases are poorly sequenced, if there's a scaffolding gap between Week 6 and Week 7, or if the assessment doesn't match the driving question — you'll discover those problems after you've built the whole unit.",
          },
          {
            id: "B",
            prompt: "Here's my unit outline. Before I build it, do three things: (1) Identify the 3 biggest gaps — transitions, scaffolding, assessment alignment. (2) Run a pre-mortem: assume this unit fails at Week 8. What went wrong? (3) Tell me what a struggling SDC student would experience at each phase transition.",
            isCorrect: true,
            annotations: [
              { text: "Identify the 3 biggest gaps", label: "Targeted gap analysis", color: "bg-green-500/20" },
              { text: "Run a pre-mortem: assume this unit fails", label: "Forces failure thinking", color: "bg-green-500/20" },
              { text: "what a struggling SDC student would experience", label: "Student perspective check", color: "bg-green-500/20" },
            ],
            explanation: "This finds problems at the outline stage, where they're cheap to fix. The pre-mortem forces AI to imagine failure. The student perspective check catches scaffolding gaps. You fix the plan before you build the materials.",
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
        title: "Stress-Test Your Unit Concept",
        description: "Load your Constitution. Share your unit concept — the project you're actually planning. Then use meta-prompts to find the gaps, the failure points, and the student experience issues before you build anything. What you produce here is a vetted unit outline ready for the next two courses.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Unit Concept Stress Test",
            prompt: `[PASTE YOUR FULL AI CLASSROOM CONSTITUTION]

---

Here's my PBL unit concept:

DRIVING QUESTION: [YOUR DRIVING QUESTION]
TIMELINE: [NUMBER] weeks
FINAL PRODUCT: [WHAT STUDENTS CREATE AND FOR WHOM]
PHASES: [LIST YOUR PLANNED PHASES/MILESTONES]
STANDARDS: [KEY STANDARDS ADDRESSED]

---

Before I build this unit, stress-test it:

1. GAP ANALYSIS: What's missing? Look at transitions between phases, scaffolding for my specific students (see Constitution), and alignment between the driving question and final product.

2. PRE-MORTEM: Assume this unit fails at the halfway point. What went wrong? What did I underestimate?

3. STUDENT EXPERIENCE: Walk through this unit as one of my struggling students (use the differentiation needs from my Constitution). Where do they get lost? Where do they disengage? Where do they need something I haven't planned for?

Give me specific, actionable feedback I can use to revise the outline before I start building.`,
          },
          {
            label: "Unit Outline Builder",
            prompt: `[PASTE YOUR FULL AI CLASSROOM CONSTITUTION]

---

Based on the stress-test feedback, here's my revised unit concept:
[PASTE YOUR REVISED CONCEPT]

Now help me structure it into a complete outline:

- Driving question (clear, open-ended, connects to students' lives)
- Phase-by-phase arc with milestones
- Assessment approach at each milestone (what shows mastery?)
- Scaffolds for each phase (where students might struggle, what supports are built in)
- Connection points (how each phase builds to the next — no orphan activities)

Format this as an outline I can reference throughout the build. This is the blueprint for everything that follows.`,
          },
        ],
        iterationTips: [
          "AI's critique is a thinking partner, not a verdict. If AI identifies a gap you disagree with, that disagreement is worth noting — but at least you've thought about it.",
          "The pre-mortem is the most powerful meta-prompt. Asking 'how would this fail?' forces AI out of its default helpful mode and into critical mode.",
          "Run the student experience check for your most struggling student. If the unit works for them, it works for everyone.",
          "Save the stress-test output. You'll reference it when you build the unit in the next two courses.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "meta-prompting-cfu-2",
        type: "identify-missing" as const,
        prompt: "Here's my hydroponics unit. It looks good to me — create the materials.",
        context: "A teacher has a unit outline they're happy with: 16 weeks, 6 phases, community presentation. They want to skip stress-testing and go straight to building materials. Their prompt is above. What's missing?",
        elements: [
          { id: "gap-check", label: "Gap analysis (transitions, scaffolding, assessment alignment)", isMissing: true, explanation: "Without asking AI to look for gaps, you'll discover them at Week 6 when it's too late. A five-minute meta-prompt now saves hours of redesign later." },
          { id: "failure-mode", label: "Pre-mortem (how would this unit fail?)", isMissing: true, explanation: "Every unit has failure points. Experienced teachers know them from experience. Meta-prompting generates that experience in advance." },
          { id: "student-lens", label: "Student experience check (how does this feel for a struggling learner?)", isMissing: true, explanation: "The teacher designed this unit knowing the content. Their students don't have that advantage. Walking through the arc as a struggling student reveals scaffolding gaps." },
          { id: "constitution", label: "Constitution submitted as context", isMissing: true, explanation: "Without the Constitution, AI doesn't know the classroom — student levels, differentiation needs, quality standards. The stress test needs that context to be specific." },
          { id: "timeline", label: "Whether the timeline is 14 or 16 weeks", isMissing: false, explanation: "The teacher mentioned 16 weeks. That's enough context for the timeline. The missing pieces are about testing the plan, not specifying its details." },
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
          <h2 className="text-xl font-semibold text-foreground">The Architecture Is Set</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You have a unit outline that's been stress-tested — gaps identified, failure points surfaced, student experience considered. This is the architecture your unit will be built on. Save it.
            </p>
            <p className="text-muted-foreground mt-3">
              The outline has a driving question, a phase-by-phase arc, assessment approach, and scaffolding notes. It's solid because you tested it before you built it.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Next: Who Are Students in This Unit?</p>
            <p className="text-muted-foreground">
              The unit has structure. Course 5 adds the human element. When students take on a role in a project — environmental consultant, community researcher, food systems analyst — the work becomes theirs, not yours. You'll design authentic student personas that connect directly to the driving question and final product.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="meta-prompting-201"
      title="Meta-Prompting: Stress-Testing Your Unit Before You Build"
      sections={sections}
      {...props}
    />
  );
};
