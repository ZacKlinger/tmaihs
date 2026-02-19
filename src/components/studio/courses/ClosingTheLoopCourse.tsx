import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface ClosingTheLoopCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const ClosingTheLoopCourse = (props: ClosingTheLoopCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Constitution You Wrote Ten Weeks Ago</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              Pull up the Classroom Constitution you started in Module 2. Read the first section — Classroom Context. Then read the last thing you added. Somewhere between those two points, you designed a full PBL unit, built student workflows, evaluated AI outputs for bias and accuracy, and drafted a classroom AI policy. The person who wrote that first section didn't know any of that yet.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              Your Constitution still says what you knew then. It doesn't yet say what you know now.
            </p>
          </div>
          <p>
            A garden bed planted in March needs different attention in October. The soil composition has changed. Some plants didn't take. Others grew in directions you didn't expect. You wouldn't keep following the March plan without adjustment — you'd walk the rows, assess what's actually growing, and amend accordingly.
          </p>
          <p>
            The same is true for your Constitution. It was accurate when you wrote it. But you've since designed student personas, built evaluation checklists, written an AI policy, and tested workflows against real AI tools. Sections that felt complete in Module 2 now have gaps you can name. Phrases that seemed clear then might feel vague after ten weeks of hands-on practice.
          </p>
          <p>
            This module is about revision as practice — not a one-time fix, but a recurring ritual. You'll walk through every section of your Constitution with fresh eyes, update what no longer fits, and write a brief reflection on what changed and why. The goal isn't a perfect document. It's a living one.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Schön's reflective practitioner" /> research frames this as the distinction between reflection-on-action and reflection-in-action. Revision is where the two meet — you step back from the work to see what the work has taught you.
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
          <h2 className="text-xl font-semibold text-foreground">Three Documents, One Practice</h2>
          <p className="text-lg">
            You now have three artifacts: a Classroom Constitution, a PBL unit with AI-integrated workflows, and a classroom AI policy. Each was built in a different phase of this curriculum. They need to talk to each other.
          </p>

          <p>
            Think of a trio rehearsing. Each musician has their own part, but the piece only works when they listen across parts — when the bass line responds to the melody, when the rhythm adjusts to the phrasing. Your three documents are the same. The Constitution sets the values. The PBL unit applies them in practice. The policy communicates them to students, parents, and administrators. When one changes, the others should notice.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-3">How the documents connect:</p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">Constitution → PBL Unit</p>
                <p className="text-muted-foreground">Your Constitution says who your students are and what matters in your classroom. Your PBL unit should reflect those specifics — the reading levels, the community context, the scaffolds you named. If you updated your Constitution's student context after Module 3, does your unit still match?</p>
              </div>
              <div>
                <p className="font-medium text-foreground">PBL Unit → AI Policy</p>
                <p className="text-muted-foreground">Your unit includes student AI workflows — when students use AI, what they bring to the interaction, what they produce after. Your AI policy should describe these same expectations in language students and parents can read. If you refined a workflow in Module 6, does your policy reflect that refinement?</p>
              </div>
              <div>
                <p className="font-medium text-foreground">AI Policy → Constitution</p>
                <p className="text-muted-foreground">Your policy includes evaluation standards, authenticity principles, and student use guidelines. These are commitments. Your Constitution should contain the values behind those commitments. If your policy says "students draft before AI interaction," your Constitution should say why that matters in your classroom.</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6">The Quarterly Revision Ritual</h3>
          <p>
            Revision isn't something you do once at the end of a curriculum. It's a practice you return to — like tuning an instrument before each rehearsal. A quarterly cadence works well: once at the start of each grading period, sit with all three documents for thirty minutes and ask three questions.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">What's changed?</p>
                <p className="text-muted-foreground">New students, new projects, new tools, new school policies. What in your documents no longer matches reality?</p>
              </div>
              <div>
                <p className="font-medium text-foreground">What have I learned?</p>
                <p className="text-muted-foreground">Where did AI surprise you — positively or negatively? Where did students use it in ways you didn't anticipate? What do you understand now about your own practice that you didn't before?</p>
              </div>
              <div>
                <p className="font-medium text-foreground">What do the documents need to say to each other?</p>
                <p className="text-muted-foreground">If you changed something in one document, trace the ripple. Does the Constitution still support the unit? Does the policy still describe what actually happens?</p>
              </div>
            </div>
          </div>

          <p>
            Thirty minutes, three questions, three documents. That's the ritual. It keeps the work alive instead of letting it calcify into something you wrote once and filed away.
          </p>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "closing-the-loop-cfu-1",
        type: "identify-missing" as const,
        prompt: `CLASSROOM CONSTITUTION (written in Module 2)

Section 1 — Classroom Context:
I teach 10th grade SDC Science at TMAHS. Class size: 18 students. Reading levels range from 6th to 10th grade. 8 EL students at emerging/developing levels. I use visual supports and sentence frames as standard scaffolds. Period is 55 minutes, we meet daily.

Section 2 — Project Architecture:
Current project: Hydroponics. Driving question: "How can we grow food that feeds our community?" Timeline: 16 weeks, currently Week 3. Milestones completed: pH baseline readings. Coming next: system builds. Final product: community presentation. Audience: community fridge coordinator and school board.

Section 3 — Stakeholder Perspectives:
Community fridge coordinator cares about reliable weekly volume. School board wants data on student outcomes. Students want to see their work matter outside school.

Section 4 — Output Preferences:
Reading level: aim for 8th grade with vocabulary scaffolds. Format: structured worksheets with sentence frames. Length: activities should fit in one 55-minute period.

Section 5 — Values and Boundaries:
AI is a planning tool for the teacher. Students do not interact with AI directly. All AI-generated materials are reviewed before reaching students.`,
        context: "A teacher wrote this Constitution at the start of the curriculum. They've now completed a full PBL unit with student AI workflows, drafted evaluation standards, designed authenticity-by-design assignments, written student AI use guidelines, and built a complete classroom AI policy. What needs updating?",
        elements: [
          { id: "student-ai-use", label: "\"Students do not interact with AI directly\" — contradicts the student AI workflows designed in Modules 6 and 9", isMissing: true, explanation: "The teacher built entire student AI workflows (research conversations, feedback loops, prototype sprints) and wrote student use guidelines. The Constitution still bans student AI use entirely. This is the most critical mismatch — the values statement contradicts the actual practice." },
          { id: "project-phase", label: "\"Currently Week 3\" and \"Coming next: system builds\" — the project has progressed far beyond this point", isMissing: true, explanation: "The teacher has completed the full PBL unit design. The Constitution still reflects Week 3 status. The project architecture should reflect current milestones, completed phases, and what was learned during the build." },
          { id: "evaluation-standards", label: "No mention of the three-lens evaluation protocol (accuracy, bias, appropriateness) developed in Module 7", isMissing: true, explanation: "The teacher built a full evaluation checklist — accuracy verification, bias auditing, appropriateness review. The Constitution's 'Values and Boundaries' section says materials are 'reviewed' but doesn't describe how. The evaluation standards belong here." },
          { id: "pace-framework", label: "No reference to the PACE framework or student AI activity structures from Module 9", isMissing: true, explanation: "The teacher designed structured student AI activities — Purpose first, AI as responder, Critical layer, Evidence of thinking. None of this appears in the Constitution. If students are using AI, the Constitution should describe the principles governing that use." },
          { id: "classroom-context", label: "Classroom context details: grade level, class size, reading levels, scaffolds", isMissing: false, explanation: "These fundamentals haven't changed. The classroom context section is still accurate — same students, same school, same scaffolding approaches. This section holds up." },
          { id: "stakeholder-perspectives", label: "Stakeholder perspectives: fridge coordinator, school board, students", isMissing: false, explanation: "The stakeholder section captures the key audiences and what they care about. Unless new stakeholders emerged during the unit, this section remains sound." },
        ],
        minCorrect: 3,
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Revise Your Constitution",
        description: "Open your Constitution, your PBL unit, and your AI policy side by side. Walk through each section of the Constitution and ask: Does this still match what I actually do? Does it reflect what I've learned? Does it align with my policy and my unit? Update what needs updating. Then write a brief reflective statement on your evolving AI practice — what you built, what shifted in your thinking, and where you want to go next.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Constitution Revision Guide",
            prompt: `I'm revising my AI Classroom Constitution after completing a 10-module professional development curriculum on AI in education. I need you to help me do a structured revision.

Here is my CURRENT Constitution (written early in the curriculum):
[PASTE YOUR CONSTITUTION]

Here is my completed PBL UNIT with AI workflows:
[PASTE KEY SECTIONS OF YOUR PBL UNIT]

Here is my CLASSROOM AI POLICY:
[PASTE YOUR AI POLICY]

Walk me through each section of the Constitution and identify:
1. What is still accurate and should stay as-is
2. What is outdated or incomplete and needs revision
3. What is missing entirely — things I now know or practice that the Constitution doesn't reflect
4. Where the Constitution contradicts or doesn't align with my PBL unit or AI policy

For each change you recommend, explain WHY it matters — not just what's different, but what I learned that made it different.

Do NOT rewrite the Constitution for me. Flag what needs attention and let me make the decisions.`,
          },
          {
            label: "Reflective Statement",
            prompt: `I've just completed a 10-module curriculum on AI literacy for teachers. I need to write a reflective statement on my evolving AI practice. Help me think through this — don't write it for me, but ask me the right questions.

Here is my original Constitution (from the beginning):
[PASTE ORIGINAL VERSION]

Here is my revised Constitution (just updated):
[PASTE REVISED VERSION]

Based on the differences between these two versions, ask me questions that help me articulate:
- What shifted in my thinking about AI in education
- What I built that I'm most confident about using
- Where I still have uncertainty or want to learn more
- How my practice will continue to evolve beyond this curriculum

Ask me 3-4 questions, one at a time. Let me answer each before asking the next. Then help me shape my answers into a short reflective statement (one page or less).`,
          },
        ],
        iterationTips: [
          "Start by reading your original Constitution straight through without editing. Notice what jumps out as incomplete or wrong before you start fixing anything.",
          "Check for contradictions first. If your policy says students use AI but your Constitution says they don't, that's the most important fix.",
          "Your reflective statement is not a summary of the curriculum. It's a record of how your thinking changed — what you believed at the start, what you believe now, and what's still unresolved.",
          "After revising, paste your updated Constitution into a fresh AI session and ask it to generate something for your class. Does the output reflect your actual practice better than before? That's your test.",
        ],
      },
    },
    {
      id: "reflection",
      type: "reflection" as const,
      title: "Reflection",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">What You Built</h2>

          <p>
            Ten modules ago, you sat down with a blank document and a question about how AI fits in your classroom. What you've built since then is not a binder of worksheets or a folder of prompts. It's a practice.
          </p>

          <p>
            You have a Classroom Constitution that tells AI who your students are, what you're building together, and what matters in your room. You have a PBL unit — stress-tested, workflow-mapped, grounded in your actual teaching context — where AI serves the learning instead of replacing it. You have a classroom AI policy you could hand to a parent, a principal, or a new colleague and say: this is how we do it here, and this is why.
          </p>

          <p>
            These three documents are instruments. Like any instrument, they sound different depending on who plays them and how often they practice. The Constitution you wrote today is better than the one you wrote in Module 2 — not because you followed more rules, but because you've spent ten weeks thinking carefully about what AI can and can't do in a classroom where real students are growing real food for a real community.
          </p>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium mb-3">Your Tier 3 Exit Artifacts</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Revised Classroom Constitution</strong> — All five sections updated to reflect what you've learned and built. This is your working document for every AI interaction going forward.</p>
              <p><strong className="text-foreground">Classroom AI Policy</strong> — Evaluation standards, authenticity principles, student use guidelines, and integration framework. This is your public-facing document — the answer to every question about how you use AI in your teaching.</p>
              <p><strong className="text-foreground">Reflective Statement</strong> — A brief, honest record of what shifted in your thinking. Not a summary of the curriculum, but an account of your own growth as a practitioner.</p>
            </div>
          </div>

          <p>
            Here's what matters most: none of this is finished.
          </p>

          <p>
            The tools will change. New models will come out that do things current ones can't. Your students next semester will be different from the ones you were thinking about when you wrote your Constitution. The school will update its policies. A colleague will try something you haven't considered. You'll run a lesson that works beautifully, and another that falls apart, and both will teach you something the documents don't yet say.
          </p>

          <p>
            The quarterly revision ritual exists for exactly this reason. Every grading period, sit with your three documents for thirty minutes. Ask what's changed, what you've learned, what the documents need to say to each other now. Amend the soil. Tune the instrument. Adjust the recipe. Whatever metaphor fits the way you think about your own practice — the point is the same. The work continues because the classroom continues.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">A practice, not a project</p>
            <p className="text-sm text-muted-foreground">
              A project has a deadline and a deliverable. A practice has a rhythm and a direction. You've finished the curriculum, but you haven't finished the work — and that's the point. The ten modules gave you a structure for thinking about AI in your classroom. The quarterly revision gives you a way to keep thinking about it after the modules are done. The best version of your Constitution is always the next one.
            </p>
          </div>

          <p>
            What you'd do differently next time, what you want to learn next, where you still feel uncertain — these aren't loose ends. They're the seeds of the next revision. Write them down somewhere. Bring them to the next quarterly sit-down. Let them grow into the questions that shape your practice over the next year.
          </p>

          <p>
            You built something real. Now keep building.
          </p>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="closing-the-loop-301"
      title="Closing the Loop: Revising Your Constitution"
      sections={sections}
      {...props}
    />
  );
};
