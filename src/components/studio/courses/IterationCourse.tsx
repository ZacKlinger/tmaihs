import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface IterationCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const IterationCourse = (props: IterationCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The First Draft Problem</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You paste your three-section Constitution into Claude and ask for a formative assessment for Week 8 of the hydroponics project. What comes back is... fine. It references the right phase and mentions pH data. But the reading level is too high for your SDC students. The format assumes a lab report structure your students haven't practiced. And the rubric criteria don't match how you actually grade.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              The instinct is to scrap it and start over with a better prompt. But starting over means losing everything the AI already got right — the structure, the content connection, the phase awareness. There's a better move.
            </p>
          </div>
          <p>
            In Courses 1 and 2, you built a Constitution with three sections: Classroom Context, Project Architecture, and Stakeholder Map. You tested it with AI and saw the output improve. But "improve" doesn't mean "done."
          </p>
          <p>
            Your first prompt is a prototype. Not a failure — a prototype. Like a first draft in any design process, it gets some things right and some things wrong. The skill isn't writing a perfect prompt on the first try. It's knowing how to look at what came back and say: <em>here's what's working, here's what isn't, here's what to change.</em>
          </p>
          <p>
            This course teaches the iteration protocol and adds <strong>Section 4</strong> to your Constitution: your <strong>Quality Standards</strong> — the definition of "good enough to use" for your specific classroom.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This is the same cycle that <ResearchLink text="design thinking" /> (Stanford d.school) uses: prototype, test, refine, repeat. The difference is you're prototyping prompts, not products.
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
          <h2 className="text-xl font-semibold text-foreground">Critique, Don't Restart</h2>
          <p className="text-lg">
            There are three responses to a mediocre AI output. Two of them waste your time.
          </p>

          <div className="space-y-3 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-1">Accept it as-is</p>
              <p className="text-sm text-muted-foreground">You settle for generic because fixing it feels like more work. The output sits in your classroom and doesn't quite fit.</p>
            </div>
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-1">Scrap it and start over</p>
              <p className="text-sm text-muted-foreground">You write a brand-new prompt from scratch, losing everything the first attempt got right. This takes longer and often produces similar issues.</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-1">Give targeted feedback</p>
              <p className="text-sm text-muted-foreground">You tell AI exactly what's working and what isn't. "The structure is good. But the reading level is too high — simplify the vocabulary and add sentence frames. Also, replace the lab report format with a data table my students are familiar with."</p>
            </div>
          </div>

          <p>
            That third response is the iteration protocol. It's what good editors do — they don't throw out a draft because the middle section is weak. They say: "Keep the opening. Rewrite paragraphs 3-5. The ending works."
          </p>

          <p>Here's what targeted feedback sounds like for the hydroponics project:</p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-2">First output: Week 8 formative assessment</p>
            <p className="text-sm text-muted-foreground mb-3">AI produced a solid structure with the right content focus, but the reading level is too high, the format doesn't match what students know, and the rubric uses criteria students haven't practiced.</p>
            <div className="space-y-2 text-sm">
              <p><strong>Iteration prompt:</strong> "This is close. Keep the overall structure and the connection to pH data. But make three changes: (1) Lower the reading level to 6th-7th grade and add vocabulary supports for key science terms. (2) Replace the lab report format with a data comparison table — my students use tables, not formal reports. (3) Align the rubric criteria to my 4-point scale where 'proficient' means students can explain their reasoning, not just report results."</p>
            </div>
          </div>

          <p>
            Notice: the critique is specific. It names what's working ("keep the structure"). It names what's wrong and how to fix it ("lower the reading level," "replace the format," "align the rubric"). This is faster than starting over, and the output is better because AI doesn't have to re-derive the things it already got right.
          </p>

          <p className="text-sm text-muted-foreground mt-4">
            <ResearchLink text="Cognitive load theory" /> (Sweller) applies here too — targeted feedback reduces the processing load for both you and the AI. You're narrowing the revision, not reopening the entire task.
          </p>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "iteration-cfu-1",
        type: "prompt-compare" as const,
        question: "AI produced a Week 10 checkpoint that's structurally good but too complex for your SDC students. What do you do?",
        context: "The checkpoint asks students to write a paragraph analyzing their growth data trends. The content is right — it references their actual plants and data. But the writing task is beyond most of your students' current level, and there's no scaffolding.",
        options: [
          {
            id: "A",
            prompt: "That didn't work. Create a simpler checkpoint for SDC students doing a hydroponics project in Week 10. Make it more accessible and include scaffolding.",
            isCorrect: false,
            annotations: [
              { text: "That didn't work", label: "Throws out what was right", color: "bg-amber-500/20" },
              { text: "simpler checkpoint", label: "Vague — simpler how?", color: "bg-amber-500/20" },
              { text: "more accessible", label: "Undefined standard", color: "bg-amber-500/20" },
            ],
            explanation: "This starts from scratch and loses the things the first output got right — the structure, the data references, the content alignment. 'Simpler' and 'more accessible' aren't specific enough for AI to know what you mean.",
          },
          {
            id: "B",
            prompt: "The structure and content are good — keep those. Make three changes: (1) Replace the paragraph analysis with a scaffolded data table where students circle trends and write one-sentence observations. (2) Add sentence frames for the observation: 'I notice that ___ because ___.' (3) Include a vocabulary box with 4-5 key terms (pH, nutrient, absorption, trend) with simple definitions.",
            isCorrect: true,
            annotations: [
              { text: "structure and content are good — keep those", label: "Names what works", color: "bg-green-500/20" },
              { text: "Replace the paragraph analysis with a scaffolded data table", label: "Specific swap", color: "bg-green-500/20" },
              { text: "sentence frames", label: "Concrete scaffold", color: "bg-green-500/20" },
              { text: "vocabulary box with 4-5 key terms", label: "Targeted support", color: "bg-green-500/20" },
            ],
            explanation: "This keeps what works, names exactly what to change, and describes the replacement with enough detail that AI can execute. The output will be a revision, not a restart.",
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
        title: "Test, Iterate, Define Quality",
        description: "This is where your Constitution gets real. Paste all three sections into an AI tool, ask for something you actually need, then iterate on the output until it's something you'd use tomorrow. Along the way, you'll discover what your quality standards are — what 'good enough' means in your classroom. That becomes Section 4.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Constitution Test + Iteration Cycle",
            prompt: `[PASTE YOUR FULL CONSTITUTION — ALL THREE SECTIONS]

---

Based on my Constitution, create a [CHOOSE ONE]:
- Formative assessment for Week [X]
- Scaffolded activity for the current project phase
- Discussion protocol connecting student data to the driving question

---

AFTER YOU GET THE OUTPUT, iterate:

Round 1: "Keep [what's working]. Change [what isn't]. Specifically: [1], [2], [3]."

Round 2: "Almost there. Adjust [remaining issue]. And make sure [quality standard]."

Round 3 (if needed): "This is usable. One final tweak: [detail]."

GOAL: Get to an output you would actually hand to students tomorrow.`,
          },
          {
            label: "Constitution Section 4: Quality Standards",
            prompt: `QUALITY STANDARDS — save this as the fourth section of your AI Classroom Constitution.

For my classroom, "ready to use" means:
- Reading level: [TARGET — e.g., "6th-7th grade with vocabulary support"]
- Activity length: [RANGE — e.g., "30-50 minutes"]
- Scaffolding: [ALWAYS INCLUDE — e.g., "sentence frames, visual supports, vocabulary boxes"]
- Assessment alignment: [YOUR SYSTEM — e.g., "4-point rubric, proficient = explains reasoning"]
- Connection requirement: [e.g., "every activity references the driving question and prior student work"]

I'll know an output is good when:
- [CRITERION 1 — e.g., "I wouldn't need to rewrite any section before using it"]
- [CRITERION 2 — e.g., "my lowest-performing student could start the activity without 1:1 help"]
- [CRITERION 3 — e.g., "it builds on what we did last week, not what a generic class did"]

When an output isn't working, here's how I critique it:
- Name what's right first
- Identify 1-3 specific problems
- Describe what I want instead, with enough detail to act on

---
TEST IT: Paste all four Constitution sections and ask for something. Is the first output closer to "ready" than before? Your quality standards are now part of the brief.`,
          },
        ],
        iterationTips: [
          "Always name what's working before you name what isn't. This preserves the good parts.",
          "Be specific about what 'too complex' or 'too simple' means. 'Lower the reading level to 6th grade' is actionable. 'Make it simpler' is not.",
          "If the third iteration still isn't right, the problem is usually in your Constitution, not your critique. Go back and add the missing constraint.",
          "Your quality standards aren't fixed. After a few iteration cycles, you'll notice patterns in what you always ask for. Add those to Section 4.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "iteration-cfu-2",
        type: "identify-missing" as const,
        prompt: "Keep the structure but make it simpler and more engaging. Add some scaffolding too.",
        context: "A teacher got a decent AI output for a Week 6 data collection protocol in the hydroponics project. The structure is solid but the language is too academic and there's no support for struggling readers. They write the iteration prompt above. What's missing from this critique?",
        elements: [
          { id: "what-works", label: "Naming what specifically to keep ('the structure' is vague)", isMissing: true, explanation: "'The structure' could mean anything. Which structure? The sequence of steps? The table format? The section headers? AI needs to know which parts to preserve." },
          { id: "reading-level", label: "Target reading level for the revision", isMissing: true, explanation: "'Simpler' is relative. 6th grade? 8th grade? With or without vocabulary support? AI doesn't know your students' levels unless you say." },
          { id: "scaffold-type", label: "What kind of scaffolding (sentence frames, visual cues, vocabulary boxes)", isMissing: true, explanation: "'Add some scaffolding' is like saying 'add some spice.' Sentence frames? Word banks? Graphic organizers? Visual step-by-step guides? The type of scaffold matters." },
          { id: "engaging-means", label: "What 'more engaging' means for these specific students", isMissing: true, explanation: "'Engaging' for SDC science students in Week 6 of a hydroponics project means something specific — maybe connecting to their actual plants, maybe adding a competitive element to data collection. AI can't guess." },
          { id: "iteration-style", label: "Whether this is a critique or a restart", isMissing: false, explanation: "The teacher says 'keep the structure' — that signals iteration, not restart. This part is right, even if vague." },
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
          <h2 className="text-xl font-semibold text-foreground">Your Constitution Is Complete</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              Four sections. Classroom Context. Project Architecture. Stakeholder Map. Quality Standards. This is a living document — it changes as your project changes, as your students grow, as you learn what works and what doesn't. But the foundation is solid.
            </p>
            <p className="text-muted-foreground mt-3">
              From now on, every AI interaction starts with your Constitution. It's not optional context — it's the operating document.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What Changes in Tier 2</p>
            <p className="text-muted-foreground">
              You've been building a document that teaches AI about your classroom. In the next three courses, you'll use that document to build something real — a complete PBL unit you can actually teach. Your Constitution is the input. The unit is the output. Everything you learned about constraints, roles, and iteration applies directly.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Before you start Tier 2, revisit your Constitution one more time. Read it as if you were the AI receiving it. Is anything ambiguous? Missing? Would a new AI session understand your classroom from this document alone? If not, refine it now. The better your Constitution, the better everything that follows.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="iteration-101"
      title="Iteration: Prototyping Prompts, Defining Quality"
      sections={sections}
      {...props}
    />
  );
};
