import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface DraftToImplementationCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const DraftToImplementationCourse = (props: DraftToImplementationCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Monday Morning Test</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You've built something real. A backwards-planned timeline. Differentiated scaffolds. Core project framing grounded in your Constitution. The unit reads well on screen. The phases connect. The assessments align. You hand it to a colleague down the hall and say, "Could you teach this?"
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              She reads for five minutes. "Where do students get the materials list? What happens when the group that's behind reaches the data collection phase and the others are already analyzing? And this part where it says 'students use AI to refine their hypothesis' — what does that actually look like? What do I hand them?"
            </p>
          </div>
          <p>
            Every question she asked is the gap between a unit that sounds right and one that works. The difference isn't quality — you've built a strong unit. The difference is a kind of specificity that only shows up when someone who wasn't in your head tries to use what you made.
          </p>
          <p>
            Think about the difference between a recipe that says "season to taste" and one that says "1/2 teaspoon kosher salt, then taste and adjust." Both are correct. One assumes you already know. The other assumes you're cooking this for the first time.
          </p>
          <p>
            This module closes the gap. You'll take the unit you've been building across Modules 5 and 6 — the timeline, the scaffolds, the project framing — and pressure-test it for implementation. Student-facing language. Logistical specificity. Anticipating where students struggle before they struggle. Preparing them to encounter AI within the project itself. The result is a PBL unit that's ready for Monday morning, not just ready for review.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Backward Design" /> (Wiggins & McTighe) gets you to alignment. Implementation readiness is the next step — what practitioners call "the last mile" between design and delivery.
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
          <h2 className="text-xl font-semibold text-foreground">Three Things That Separate a Draft from a Deliverable</h2>
          <p className="text-lg">
            A theoretically sound unit and an implementable one often share the same content. What separates them is teacher clarity, student-facing language, and logistical specificity.
          </p>

          <div className="space-y-4 my-6">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Teacher Clarity</p>
              <p className="text-sm text-muted-foreground">
                The unit should be readable by a teacher who wasn't part of the design process. Not because you're handing it off — though you might — but because the act of writing for someone else exposes the assumptions you've baked in without noticing. When you write "students analyze their data," you know what that means. A substitute doesn't. A first-year teacher doesn't. Your future self in February doesn't.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Student-Facing Language</p>
              <p className="text-sm text-muted-foreground">
                The instructions students actually read need to be in their language, at their reading level, with enough structure that a student who missed yesterday can still find their footing. "Conduct a comparative analysis of nutrient absorption rates" is accurate. "Compare your plant data from Week 6 and Week 8. What changed? Write two sentences explaining why" is usable.
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Logistical Specificity</p>
              <p className="text-sm text-muted-foreground">
                Materials lists. Time estimates that account for transitions. What happens when one group finishes early. What happens when one group finishes late. Where the printed handouts live. How students access the digital tools. These aren't afterthoughts — they're the difference between a lesson that flows and one that stalls at minute twelve.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Designing for the Struggle You Can See Coming</h3>
          <p>
            You've taught long enough to know where students get stuck. The transition from data collection to data analysis — that's a wall. The moment they need to synthesize findings into a presentation — that's another one. The first time they open an AI tool for a project task and aren't sure what to type — that's a third.
          </p>
          <p>
            AI is good at anticipating these moments if you ask it to. Not because it knows your students, but because your Constitution does, and you can ask AI to walk through the unit as a specific student — the one who missed three days, the one who reads two grades below level, the one who finishes everything early and gets bored. Each walkthrough reveals a different set of friction points you can design for now, instead of improvising through later.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Improvising in the Moment</p>
              <p className="text-sm text-muted-foreground">"Oh, they're confused about the data table. Let me explain it again differently." Happens every day. Works sometimes. But when it happens at every transition, the unit has a design problem, not a teaching problem.</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">Designing for It in Advance</p>
              <p className="text-sm text-muted-foreground">"Students moving from data collection to analysis will need a bridge activity. Include a structured data comparison template with sentence starters and a worked example from the previous cohort." The confusion still happens — but the response is already built.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">Preparing Students to Encounter AI</h3>
          <p>
            Your unit now has moments where students interact with AI. You designed those workflows in Module 6. But students arriving at those moments for the first time need more than instructions — they need transparency about what AI is, what it can and can't do in this context, and what their role becomes when they're the one prompting.
          </p>
          <p>
            What does that transparency look like in practice? It looks like a half-page orientation students read before their first AI interaction. It tells them: this tool generates text based on patterns, not understanding. It doesn't know your project, your data, or your reasoning — you do. Your job is to bring your thinking to the conversation and evaluate what comes back. The teacher's role shifts too — from directing every step to circulating, reading over shoulders, asking "What did the AI say? Do you agree? Why?"
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="text-sm">
              <strong>The standard:</strong> Could a teacher who has never seen this unit pick it up Friday afternoon and teach it Monday morning? If the answer is yes — if the materials are there, the language is clear, the logistics are specified, and the AI interactions are scaffolded — the unit is implementation-ready. That's the bar.
            </p>
          </div>

          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="PBLWorks" /> Gold Standard design emphasizes that teacher facilitation is itself a design element — not separate from the unit, but built into it.
          </div>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "draft-to-implementation-cfu-1",
        type: "prompt-compare" as const,
        question: "A teacher is finalizing their PBL unit for the hydroponics project. Which unit description is closer to implementation-ready?",
        context: "Both descriptions cover the same Week 8 transition — students moving from data collection into data analysis and optimization. The unit has SDC students, grades 9-12, reading levels ranging from 5th to 9th grade.",
        options: [
          {
            id: "A",
            prompt: "Week 8: Data Analysis & Optimization\n\nStudents analyze their collected growth data to identify patterns and make evidence-based decisions about nutrient adjustments. They should use their data tables from previous weeks and work in their project teams. AI can be used as a thinking tool during this phase. Assessment: Data analysis worksheet and team recommendation.",
            isCorrect: false,
            annotations: [
              { text: "analyze their collected growth data to identify patterns", label: "Teacher language, not student language", color: "bg-amber-500/20" },
              { text: "AI can be used as a thinking tool", label: "No structure for how", color: "bg-amber-500/20" },
              { text: "Data analysis worksheet and team recommendation", label: "What worksheet? Where?", color: "bg-amber-500/20" },
            ],
            explanation: "This reads like a plan for the teacher's eyes — it describes what should happen but doesn't specify how. 'Analyze data to identify patterns' is the objective, not the instruction. 'AI can be used as a thinking tool' gives no workflow. A colleague picking this up wouldn't know what to hand students or how to facilitate the AI interaction.",
          },
          {
            id: "B",
            prompt: "Week 8: What's Working? What Needs to Change?\n\nMaterials: Data comparison template (printed, in Week 8 folder), sentence starter cards, vocabulary reference sheet (pH, nutrient, absorption, trend), team recommendation form.\n\nDay 1 (50 min): Students pull their growth logs from Weeks 5-7. Using the data comparison template, they fill in measurements side by side and circle any week where growth changed noticeably. Sentence starters: 'Between Week ___ and Week ___, I notice ___ because ___.'\n\nDay 2 (50 min): Teams draft a nutrient adjustment recommendation. Before submitting, each student opens AI and types: 'I'm recommending [their adjustment]. As a skeptical scientist, what's the biggest flaw in my reasoning based on this data: [paste 3 data points].' Students revise their recommendation and turn in both versions — original and revised — with a one-sentence explanation of what changed.\n\nDifferentiation: Emerging readers use the visual data template (pictures + numbers, no paragraph writing). Advanced students write a full rationale paragraph.\n\nIf a group finishes early: They peer-review another team's recommendation using the feedback checklist on the back of the recommendation form.\n\nAssessment: Completed comparison template + both versions of recommendation (original and AI-revised) + change explanation.",
            isCorrect: true,
            annotations: [
              { text: "Data comparison template (printed, in Week 8 folder)", label: "Materials located", color: "bg-green-500/20" },
              { text: "circle any week where growth changed noticeably", label: "Student-level instruction", color: "bg-green-500/20" },
              { text: "As a skeptical scientist, what's the biggest flaw", label: "Structured AI workflow", color: "bg-green-500/20" },
              { text: "Emerging readers use the visual data template", label: "Differentiation specified", color: "bg-green-500/20" },
              { text: "If a group finishes early", label: "Logistics anticipated", color: "bg-green-500/20" },
            ],
            explanation: "Every question a substitute teacher would ask is answered. Where are the materials? What do students actually do? How is AI used, specifically? What about students at different levels? What if timing is off? This is the same content as Option A — but it's teachable.",
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
        title: "Finalize Your PBL Unit",
        description: "This is the assembly. You have a backwards-planned timeline from Module 5, core project framing with differentiated scaffolds from Module 6, and your Constitution grounding all of it. Now you're turning that into a complete, teacher-ready document — every week specified, every material located, every AI interaction scaffolded, every differentiation built in. When you're done, this unit should pass the Monday morning test: a colleague who wasn't in your head could pick it up and teach it.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Implementation Readiness Audit",
            prompt: `[PASTE YOUR FULL AI CLASSROOM CONSTITUTION]

---

Here is my PBL unit as it currently stands:
[PASTE YOUR FULL UNIT — timeline, scaffolds, project framing, workflows from Modules 5-6]

---

Audit this unit for implementation readiness. For each week or phase, check:

1. TEACHER CLARITY: Could a colleague who wasn't part of the design process teach this section? What's assumed but not stated?
2. STUDENT-FACING LANGUAGE: Are instructions written at the student reading level (see Constitution)? Would a student who missed yesterday know what to do?
3. MATERIALS & LOGISTICS: Are all materials named and located? Are time estimates realistic with transitions? What happens if a group is ahead or behind?
4. AI INTERACTIONS: Is every AI moment structured with a specific workflow? Do students know exactly what to type, what to do with the response, and what to turn in?
5. DIFFERENTIATION: Are scaffolds and extensions specified for each activity, not just mentioned?
6. STRUGGLE POINTS: Walk through this unit as my most struggling student (see Constitution for student profiles). Where do they get lost? Where do they need something I haven't built yet?

For each gap you find, suggest the specific fix — not "add more detail" but exactly what the detail should say.`,
          },
          {
            label: "Student-Facing Materials Generator",
            prompt: `[PASTE YOUR CONSTITUTION]

---

I need student-facing materials for Week [NUMBER] of my PBL unit:
[PASTE THAT WEEK'S PLAN]

Generate the following at the reading level specified in my Constitution:

1. STUDENT INSTRUCTIONS: Step-by-step directions a student reads independently. Include sentence starters where students write or respond. No teacher jargon.

2. AI INTERACTION GUIDE: A half-page handout for the first time students use AI in this unit. Include:
   - What AI is and isn't (one paragraph, their reading level)
   - What they should bring to the AI conversation (their draft, data, question)
   - The exact prompt template they'll use, with blanks to fill in
   - What to do with the response (evaluate, revise, document)
   - What to turn in as evidence of their thinking

3. DIFFERENTIATION MATERIALS: A version of the main activity for emerging readers (visual supports, simplified language, fewer written responses) and an extension version for students who finish early.

4. MATERIALS CHECKLIST: Everything a teacher needs to have printed, projected, or available before class starts.

Write all of this as if a student is reading it for the first time without the teacher standing over their shoulder.`,
          },
        ],
        iterationTips: [
          "Run the audit on your full unit first, then generate materials week by week. Fixing structural gaps before producing handouts saves you from rebuilding.",
          "Read every student instruction out loud. If you stumble over the language, a student will too. Rewrite anything that sounds like a standards document.",
          "For each AI interaction in the unit, test the student prompt template yourself. If the AI output isn't useful when you try it, add more structure to the template.",
          "Have AI walk through the unit as three different students — one who's behind, one who's on track, one who's ahead. Each walkthrough reveals different gaps in your differentiation.",
        ],
      },
    },
    {
      id: "reflection",
      type: "reflection" as const,
      title: "Reflection",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Unit Is Built</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You started Tier 2 with an idea and a Constitution. Across three modules, that idea became a backwards-planned timeline, then a differentiated project framework with AI workflows, and now a complete, implementation-ready PBL unit. The kind of document you could hand to a colleague on Friday and they could teach on Monday. The kind of document that specifies not just what students do, but what they read, what they type into AI, what they turn in, and what happens when the plan doesn't go as planned.
            </p>
            <p className="text-muted-foreground mt-3">
              This is the Tier 2 exit artifact: a complete, differentiated, semester-long PBL unit, grounded in your Classroom Constitution, implementable as written.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What Comes Next</p>
            <p className="text-muted-foreground">
              You've built a Constitution and a unit. Tier 3 shifts the focus from building to discernment — the judgment calls that come after the materials are made. How do you evaluate AI output before it reaches students? How do you read student work when AI was part of the process? How does your Constitution evolve as your practice does? You've been using AI as a design partner. Now you learn to be its editor, its critic, and its governor.
            </p>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>Before you move on:</strong> Do the peer audit. Take a sample PBL unit — not your own — and evaluate it using the implementation readiness criteria from this module. What's missing? What assumptions are baked in? Then turn that same lens on your own unit. The gaps you spotted in someone else's work are usually the same ones hiding in yours.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 mt-4">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Save your completed unit somewhere permanent. You'll return to it in Tier 3 — not to rebuild it, but to stress-test it with the evaluative tools you'll develop there. A unit that survives its own audit is one you can trust.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="draft-to-implementation-201"
      title="From Draft to Implementation"
      sections={sections}
      {...props}
    />
  );
};
