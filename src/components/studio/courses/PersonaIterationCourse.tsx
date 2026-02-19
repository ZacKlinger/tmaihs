import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface PersonaIterationCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const PersonaIterationCourse = (props: PersonaIterationCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Output That's Almost Right</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You finished Module 5 with a backwards-planned semester timeline and a Constitution that's been growing since Tier 1. You paste it all into Claude and ask for a project launch document — something students see on Day 1 that frames the driving question, explains the timeline, and tells them what they're building toward. What comes back reads like a syllabus from a school you've never worked at. The tone is wrong. The framing assumes students already care. The scaffolding is pitched at one level when you have four grade bands in the room.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              You could scrap it, rewrite the prompt, try again. But there's a faster move — and it teaches you something scrapping never does.
            </p>
          </div>
          <p>
            Two things make AI output sharper. The first is telling AI who it is — not "be helpful," but something like <em>you are a co-teacher for an SDC science class spanning grades 9-12 with a strong emphasis on culturally sustaining pedagogy</em>. That's a persona. It changes what AI pays attention to, the same way a session musician plays differently when you tell them the genre before they hear the chart.
          </p>
          <p>
            The second is treating the first output as a draft, not an answer. You read what came back, name what's working, name what isn't, and send it through again. Then again, if needed. Each pass gets closer to something you'd actually hand to students. This is iteration — and the skill is knowing when to stop.
          </p>
          <p>
            This course combines persona assignment, meta-prompting (asking AI to improve your prompt before executing it), and a structured iteration protocol. By the end, you'll have core project framing, student-facing launch materials, and differentiated scaffolds — built from your timeline and Constitution.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Design thinking" /> (Stanford d.school) treats every prototype as a question, not an answer. The same principle applies here: your first output is a hypothesis about what works.
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
          <h2 className="text-xl font-semibold text-foreground">Three Moves, One Workflow</h2>
          <p className="text-lg">
            Think of prompting like cooking. Your Constitution is the pantry — everything AI needs to know is stocked and ready. But a well-stocked pantry doesn't produce a meal on its own. You need technique.
          </p>

          <h3 className="text-lg font-semibold mt-6">Move 1: Persona</h3>
          <p>
            A persona tells AI who to be while it works. Not a vague instruction like "be encouraging" — a specific identity with specific concerns.
          </p>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Flat:</p>
              <p className="text-sm">"Help me create a project launch document for my science class."</p>
              <p className="text-xs text-muted-foreground mt-2">
                AI defaults to a generic curriculum designer. The output sounds institutional.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Persona:</p>
              <p className="text-sm">
                "You are a co-teacher in an SDC science classroom serving grades 9-12, with students reading between 4th and 10th grade level. You believe in culturally sustaining pedagogy and you know that every student in this room has relevant life experience to bring to the work. Help me create a project launch document."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                AI writes from inside the room, not above it.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Move 2: Meta-Prompting</h3>
          <p>
            Meta-prompting means asking AI to improve your prompt before it executes. You're handing someone the recipe and saying, <em>before you start cooking, what am I forgetting?</em>
          </p>
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-2">The meta-prompt pattern:</p>
            <p className="text-sm text-muted-foreground italic">
              "Here's what I want you to do: [your request]. Before you do it, review my prompt. What's ambiguous? What context am I assuming you have but haven't given you? Suggest an improved version of my prompt, then execute that version instead."
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              This catches blind spots before they become problems. The AI often identifies missing constraints you didn't realize were missing — reading level, format preferences, tone.
            </p>
          </div>

          <h3 className="text-lg font-semibold mt-6">Move 3: Iteration</h3>
          <p>
            The first output is raw material, not finished product. Iteration means reading what came back and giving targeted feedback — not starting over.
          </p>
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-2">Three rounds on the same task:</p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">Round 1 — Structure check:</p>
                <p className="text-muted-foreground">"The sections are right but the opening paragraph assumes students are already bought in. Rewrite the opening to start with a question students can answer from their own experience with food access in their neighborhood."</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Round 2 — Differentiation:</p>
                <p className="text-muted-foreground">"Good. Now create three versions of the key vocabulary section: one for students reading at 4th-5th grade, one for 6th-8th, one for 9th-10th. Keep the same terms but adjust definitions, add visual supports for the lower level, and add extension questions for the higher."</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Round 3 — Final pass:</p>
                <p className="text-muted-foreground">"Almost there. The timeline section needs one change: add a 'What you'll know by the end of each phase' row so students can self-assess progress. And make sure the community fridge is mentioned by Week 3 so students understand the real audience early."</p>
              </div>
            </div>
          </div>
          <p>
            Each round narrows the gap between what AI produced and what your students need. Notice the pattern: name what's working, name the specific problem, describe the fix. This is how an editor talks to a writer. It's how a producer talks to a musician mid-take. The whole song isn't wrong — just the bridge.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">When to stop iterating</p>
            <p className="text-muted-foreground text-sm">
              There's a point where additional passes produce diminishing returns — you're adjusting word choices, not substance. When the output is something you'd hand to students with only minor edits, stop. Perfectionism isn't the goal. Usability is.
            </p>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            <ResearchLink text="Cognitive load theory" /> (Sweller) applies to your own process here. Targeted iteration reduces cognitive load because you're evaluating one dimension at a time — structure, then differentiation, then details — instead of trying to assess everything at once.
          </p>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "persona-iteration-cfu-1",
        type: "prompt-compare" as const,
        question: "You need a student-facing launch document for a 16-week hydroponics PBL unit in an SDC classroom spanning grades 9-12. Which prompt produces a more usable first draft?",
        context: "Teachers have a completed Constitution and a backwards-planned semester timeline. The launch document is the first thing students see — it needs to frame the driving question, explain the arc, and make students feel like this project belongs to them.",
        options: [
          {
            id: "A",
            prompt: "Using my Constitution and semester timeline, create a student-facing launch document for my hydroponics PBL unit. It should introduce the project, explain the timeline, and get students excited. Make it engaging and accessible.",
            isCorrect: false,
            annotations: [
              { text: "create a student-facing launch document", label: "No persona — AI defaults to generic", color: "bg-amber-500/20" },
              { text: "get students excited", label: "Excitement is not a design spec", color: "bg-amber-500/20" },
              { text: "engaging and accessible", label: "Undefined — accessible to whom?", color: "bg-amber-500/20" },
            ],
            explanation: "Without a persona, AI writes as a curriculum designer who's never been in the room. 'Engaging' and 'accessible' mean different things for a 9th grader reading at 4th grade level than for a 12th grader reading at grade level. The prompt gives AI no identity and no specifics about what 'good' looks like.",
          },
          {
            id: "B",
            prompt: "You are a co-teacher in my SDC science classroom. You know these students — grades 9-12, reading levels from 4th to 10th grade, most from the neighborhood around Third Street. You believe every student here has something real to contribute to this project.\n\nBefore you write anything: review this prompt along with my Constitution and timeline. What context am I assuming you have? What's ambiguous? Suggest a better version of this prompt, then execute it.\n\nTask: Create a student-facing launch document for our 16-week hydroponics project. It should frame the driving question through students' own experience with food access in the neighborhood, show the semester arc in a visual-friendly format, and use language at no higher than 7th grade reading level with key terms defined.",
            isCorrect: true,
            annotations: [
              { text: "You are a co-teacher in my SDC science classroom", label: "Persona with specific identity", color: "bg-green-500/20" },
              { text: "review this prompt along with my Constitution and timeline. What context am I assuming you have?", label: "Meta-prompt catches blind spots", color: "bg-green-500/20" },
              { text: "frame the driving question through students' own experience with food access", label: "Culturally sustaining entry point", color: "bg-green-500/20" },
              { text: "no higher than 7th grade reading level with key terms defined", label: "Concrete accessibility standard", color: "bg-green-500/20" },
            ],
            explanation: "The persona grounds AI in the classroom. The meta-prompt catches missing context before the first draft. The task gives concrete specs — reading level, framing approach, format. The first output will still need iteration, but it starts much closer to usable.",
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
        title: "Live Iteration Exercise",
        description: "Take an AI output you generated in Module 5 — or start fresh with your Constitution and semester timeline — and run it through two rounds of refinement using the scaffolds below. The goal is not a perfect document. The goal is noticing what changes between rounds and developing a feel for when to stop.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Persona + Meta-Prompt Scaffold",
            prompt: `[PASTE YOUR FULL CONSTITUTION + SEMESTER TIMELINE FROM MODULE 5]

---

PERSONA: You are a co-teacher in my classroom. You know these students personally — their reading levels, their neighborhoods, what motivates them and what shuts them down. You practice culturally sustaining pedagogy. You don't talk down to students or over their heads.

META-PROMPT: Before you execute the task below, review my prompt and my Constitution together. Identify:
- What context I'm assuming you have but haven't stated
- What's ambiguous in my request
- What constraints are missing (reading level? format? tone?)

Suggest an improved version of my prompt. Then execute that improved version.

---

TASK: Create [CHOOSE ONE]:
- A student-facing project launch document (Day 1 handout)
- Differentiated scaffolds for the first project milestone
- A project framing narrative that connects the driving question to students' lives

Write it so I could hand it to students tomorrow.`,
          },
          {
            label: "Iteration Protocol",
            prompt: `Look at the output you just received. Before you ask AI to revise, answer these three questions yourself:

1. WHAT'S WORKING? (Name specific sections, phrases, or structural choices to keep)
2. WHAT'S NOT? (Name the specific problem — too complex? wrong tone? missing scaffolds? wrong audience?)
3. WHAT DO I WANT INSTEAD? (Describe the fix with enough detail that AI can act on it)

---

Then send your iteration prompt. Here's the frame:

ROUND 1 (Structure + Tone):
"Keep [what's working]. The problem is [specific issue]. Change it by [specific fix]. Also, [second issue and fix]."

ROUND 2 (Differentiation + Detail):
"This is closer. Now [differentiate / adjust for specific student needs]. Add [missing element]. Make sure [quality standard from your Constitution]."

---

After Round 2, ask yourself: Would I use this tomorrow? If yes, stop. If something still feels off, name it precisely and do one more round. If you can't name it, the issue might be in your Constitution, not the output.`,
          },
        ],
        iterationTips: [
          "Always name what's working before what isn't. This prevents AI from throwing out the good parts along with the problems.",
          "One round, one focus. Round 1 might be structure and tone. Round 2 might be differentiation. Trying to fix everything at once produces worse results than sequential passes.",
          "If the third iteration still misses, look at your Constitution. The problem is usually upstream — a missing constraint or an ambiguous standard that AI keeps guessing at.",
          "Develop your own stopping point. Some teachers stop after two rounds. Others need three. The question is always: would I hand this to students? Not: is it perfect?",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "persona-iteration-cfu-2",
        type: "identify-missing" as const,
        prompt: "The tone is off and the reading level is too high. Make it better and add some scaffolding for struggling readers.",
        context: "A teacher received an AI-generated project launch document. The structure and content are solid, but the language is too academic for their SDC students and there's no differentiation. The teacher writes the iteration critique above. What's missing from this feedback?",
        elements: [
          {
            id: "what-works",
            label: "Naming what to keep (structure, content, specific sections)",
            isMissing: true,
            explanation: "Without naming what works, AI may rewrite sections that were already good. 'The structure and section order are right — keep those' gives AI permission to preserve what's working while fixing what isn't.",
          },
          {
            id: "target-level",
            label: "Specific reading level target (not just 'too high')",
            isMissing: true,
            explanation: "'Too high' compared to what? 7th grade? 5th grade? AI needs a target, not just a direction. 'Lower the reading level to 6th grade and define any term over 8 letters' is actionable.",
          },
          {
            id: "tone-direction",
            label: "What the right tone sounds like (not just 'off')",
            isMissing: true,
            explanation: "'The tone is off' is a diagnosis without a prescription. Does the teacher want conversational? Encouraging but direct? Like an older student talking to a younger one? The replacement tone matters as much as identifying the problem.",
          },
          {
            id: "scaffold-type",
            label: "What kind of scaffolding (sentence frames, visuals, vocabulary boxes, chunked text)",
            isMissing: true,
            explanation: "'Add some scaffolding' is like saying 'add some seasoning.' Sentence frames? A vocabulary sidebar? Chunked paragraphs with headers? Visual supports? The type of scaffold determines whether it actually helps the students who need it.",
          },
          {
            id: "is-iteration",
            label: "Framing as iteration rather than restart",
            isMissing: false,
            explanation: "The teacher says 'make it better,' which implies revision rather than starting over. This framing is fine — the missing pieces are about specificity, not approach.",
          },
          {
            id: "tool-choice",
            label: "Which AI tool to use for the revision",
            isMissing: false,
            explanation: "The revision should happen in the same conversation where the original output was generated. Tool choice isn't what's missing here.",
          },
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
          <h2 className="text-xl font-semibold text-foreground">A Feel for the Work</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You now have three moves that work together: persona gives AI an identity grounded in your classroom, meta-prompting catches blind spots before the first draft, and iteration turns that draft into something you'd hand to students. The skill underneath all three is the same — specificity. Vague input produces vague output. Precise feedback produces precise revision.
            </p>
            <p className="text-muted-foreground mt-3">
              What you built in the workshop — the launch document, the scaffolds, the project framing — is real material for your unit. Save it alongside your Constitution and semester timeline.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What you're developing isn't prompting skill. It's editorial judgment.</p>
            <p className="text-muted-foreground">
              Think about the difference between what you noticed in Round 1 and Round 2 of the iteration exercise. Round 1 was probably about structure — sections in the wrong order, framing that didn't land. Round 2 was probably about fit — reading level, scaffolding, the gap between what AI assumed about your students and what's true. That progression from structure to fit is how experienced editors work. It's how musicians refine an arrangement. You're building that instinct for your own classroom materials.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Module 7 takes what you've built — Constitution, timeline, project framing, differentiated scaffolds — and turns it into an implementation-ready unit. The question shifts from <em>can AI produce what I need?</em> to <em>is this ready for Monday morning?</em> Everything you've practiced with persona, meta-prompting, and iteration carries forward.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="persona-iteration-201"
      title="Persona, Meta-Prompting & Iteration"
      sections={sections}
      {...props}
    />
  );
};
