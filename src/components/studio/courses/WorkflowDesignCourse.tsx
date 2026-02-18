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
          <h2 className="text-xl font-semibold text-foreground">The Moment Students Open the AI Tab</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              It's Week 9. Your food systems consultants are deep into optimization — adjusting nutrient mixes, tracking growth rates, preparing their interim briefing for the fridge coordinator. You've told them AI is available as a thinking tool. Three students open Claude and type: "What nutrients do lettuce need?" One types: "Write my data analysis for me." Another stares at the screen, unsure what to even ask.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              The tool is the same. The outcomes are completely different. The difference isn't the students — it's that nobody designed the moment.
            </p>
          </div>
          <p>
            In Courses 4 and 5, you built a unit outline and designed student personas. The structure is solid and students have a role. But "students can use AI" is not a workflow. It's an invitation to chaos.
          </p>
          <p>
            Workflow design means mapping the specific moments in your unit when students interact with AI — and designing exactly what that interaction looks like. Not "use AI for research" but "use AI to challenge your hypothesis before you present it to your team." The template is reusable. The expectations are clear. The student knows what to bring to the conversation and what to do with what comes back.
          </p>
          <p>
            This course adds the <strong>Workflow Section</strong> to your PBL unit — when students use AI, how they use it, and how you know it's working.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="ICAP Framework" /> (Chi & Wylie) shows that interactive and constructive engagement produces deeper learning than passive consumption. Workflow design is how you ensure AI interactions stay constructive.
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
          <h2 className="text-xl font-semibold text-foreground">Design the Interaction, Not Just the Access</h2>
          <p className="text-lg">
            There's a difference between giving students a tool and designing how they use it. A workshop with power tools has protocols. A lab with chemicals has procedures. AI in a project needs the same thing.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Ad-Hoc AI Use:</p>
              <p className="text-sm">"You can use AI to help with your research this week."</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Students either ask AI to do the work for them, or don't know what to ask. No consistency, no accountability, no way to know if the interaction helped.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">Designed Workflow:</p>
              <p className="text-sm">
                "Before your team meeting on Wednesday: (1) Draft your nutrient adjustment recommendation. (2) Ask AI to argue against it — 'Here's my recommendation. As a skeptical scientist, what am I getting wrong?' (3) Revise your recommendation based on the pushback. (4) Bring both versions to the team meeting and explain what changed."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Student does the thinking first. AI challenges, not replaces. Student makes the final call. Evidence of thinking is built in.
              </p>
            </div>
          </div>

          <p>Three workflow templates cover most project moments:</p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-foreground">The Research Conversation</p>
                <p className="text-muted-foreground">Student has a question about their project. Instead of "tell me about nutrient absorption," the workflow is: "I think [X] because [Y]. Is my reasoning right? What am I missing?" AI responds to student thinking, not to a blank request.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">The Feedback Loop</p>
                <p className="text-muted-foreground">Student has a draft — a data analysis, a presentation section, a recommendation. The workflow: share the draft, ask AI to critique it from a specific perspective (the fridge coordinator, a skeptical scientist), then revise based on feedback and document what changed.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">The Prototype Sprint</p>
                <p className="text-muted-foreground">Student needs to generate options before choosing one. The workflow: describe the constraint ("We need a nutrient mix that works for both lettuce and collard greens within our budget"), ask AI for 3 approaches, evaluate each against their data, and defend their choice to their team.</p>
              </div>
            </div>
          </div>

          <p>
            Every workflow follows the same principle: student brings something first (a draft, a hypothesis, a question), AI responds to it, student evaluates the response. The student drives. AI is the thinking partner, not the driver.
          </p>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "workflow-design-cfu-1",
        type: "prompt-compare" as const,
        question: "It's Week 10 of the hydroponics project. Students need to prepare their interim data briefing for the fridge coordinator. Which approach produces better student work?",
        context: "Students have 10 weeks of growth data and need to synthesize it into a briefing that answers: Is the system producing enough to be worth continuing? They're using their food systems consultant persona.",
        options: [
          {
            id: "A",
            prompt: "Use AI to help you write your data briefing for the fridge coordinator. Make sure it includes all your growth data and a recommendation.",
            isCorrect: false,
            annotations: [
              { text: "Use AI to help you write", label: "Who's doing the thinking?", color: "bg-amber-500/20" },
              { text: "includes all your growth data", label: "Data dump, not analysis", color: "bg-amber-500/20" },
            ],
            explanation: "This invites AI to write the briefing. Students paste data and get a polished document they didn't think through. The fridge coordinator gets a report — but the student didn't develop the analytical skill the assignment is supposed to build.",
          },
          {
            id: "B",
            prompt: "STEP 1: Draft your briefing independently — your recommendation and the 3 strongest data points that support it. STEP 2: Ask AI: 'As the fridge coordinator who needs reliable weekly volume, what questions would you have about this briefing? What's unconvincing?' STEP 3: Revise your briefing to address the strongest critique. STEP 4: Bring both versions to class — original and revised — and explain what changed and why.",
            isCorrect: true,
            annotations: [
              { text: "Draft your briefing independently", label: "Student work comes first", color: "bg-green-500/20" },
              { text: "As the fridge coordinator", label: "AI in stakeholder role", color: "bg-green-500/20" },
              { text: "what questions would you have", label: "AI challenges, doesn't replace", color: "bg-green-500/20" },
              { text: "both versions — original and revised", label: "Evidence of thinking", color: "bg-green-500/20" },
            ],
            explanation: "Student drafts first (owns the thinking). AI critiques from a real stakeholder perspective (uses the persona). Student revises and documents the change (evidence of growth). Both versions come to class (accountability).",
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
        title: "Design Your Student AI Workflows",
        description: "Load your Constitution, unit outline, and student personas. Map 2-3 specific moments in your unit where students should interact with AI — and design the workflow for each. Test one with actual AI to make sure it produces useful outputs. These workflows become part of your PBL unit.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Workflow Mapper",
            prompt: `[PASTE YOUR CONSTITUTION + UNIT OUTLINE + STUDENT PERSONA]

---

Map the AI interaction points for my unit. For each phase in the unit outline, answer:

1. Should students use AI here? (Yes/No — and why)
2. If yes, which workflow template fits?
   - RESEARCH CONVERSATION: Student has a question, brings their thinking, AI responds
   - FEEDBACK LOOP: Student has a draft, AI critiques from a perspective, student revises
   - PROTOTYPE SPRINT: Student needs options, AI generates them, student evaluates and chooses
3. What does the student bring to the AI interaction? (Their draft, their hypothesis, their question)
4. What role should AI play? (Skeptical stakeholder, subject expert, confused audience member)
5. What does the student produce after the interaction? (Revised draft, decision rationale, annotated feedback)

Map this for every phase. Identify 2-3 key AI moments and write the student-facing instructions.`,
          },
          {
            label: "Student-Facing Workflow Template",
            prompt: `[PASTE CONSTITUTION + PERSONA]

---

Write a student-facing instruction sheet for this workflow:

WORKFLOW: [FEEDBACK LOOP / RESEARCH CONVERSATION / PROTOTYPE SPRINT]
PHASE: Week [X] — [WHAT STUDENTS ARE DOING]
PERSONA: Students are [THEIR ROLE]

The instruction sheet should include:
- What to do BEFORE opening AI (draft, hypothesis, question)
- Exactly what to type (with sentence frames if needed)
- What to do WITH the AI response (evaluate, revise, document)
- What to turn in (evidence of thinking, not just final product)
- What success looks like ("You'll know this worked when...")

Write it at the reading level from my Constitution. Keep it to one page.`,
          },
        ],
        iterationTips: [
          "Not every phase needs AI. Some moments benefit from productive struggle without it. Map the 'no AI' moments too, with reasoning.",
          "Always require student work BEFORE the AI interaction. If students open AI with nothing to say, they'll let AI lead.",
          "Use the student persona in the workflow. 'As a food systems consultant, ask AI to challenge your recommendation' is sharper than 'get feedback from AI.'",
          "Test the workflow yourself first. If the output isn't useful when you try it, students won't get anything better.",
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
        prompt: "Students can use AI to get feedback on their data analysis this week.",
        context: "It's Week 8 of the hydroponics project. Students have collected growth data and need to analyze it before presenting to their teams. The teacher's AI workflow instruction above is all students receive.",
        elements: [
          { id: "student-first", label: "What students should do BEFORE opening AI", isMissing: true, explanation: "Without a 'draft first' step, students will paste raw data and ask AI to analyze it for them. The workflow needs to require student thinking before AI interaction." },
          { id: "specific-ask", label: "What specifically to ask AI (not just 'get feedback')", isMissing: true, explanation: "'Get feedback' invites AI to do anything. A specific ask — 'critique my interpretation from the fridge coordinator's perspective' — keeps the student in control." },
          { id: "role-context", label: "Which perspective AI should take when giving feedback", isMissing: true, explanation: "Feedback from a generic AI assistant is different from feedback from the fridge coordinator or a skeptical scientist. The perspective shapes what AI notices." },
          { id: "evidence", label: "What students should produce after the interaction (revised work, annotations)", isMissing: true, explanation: "Without a deliverable, there's no accountability. Students should turn in something that shows their thinking — the revision, the annotation, the decision rationale." },
          { id: "ai-access", label: "Which AI tool to use", isMissing: false, explanation: "Tool choice is a logistics detail, not a workflow design element. The workflow works the same in Claude, Gemini, or ChatGPT." },
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
          <h2 className="text-xl font-semibold text-foreground">Your PBL Unit Is Complete</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You now have a complete, AI-integrated PBL unit: a stress-tested outline (Course 4), student personas that drive inquiry (Course 5), and designed workflows that make AI use intentional (Course 6). This was built on your Constitution, vetted against real AI, and grounded in your actual classroom.
            </p>
            <p className="text-muted-foreground mt-3">
              This is something you could teach next semester. Save it. You'll reference it throughout Tier 3.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What Changes in Tier 3</p>
            <p className="text-muted-foreground">
              You've built something real. Now the question shifts to judgment. How do you evaluate AI outputs before they reach students? How do you read student work to understand when and how AI was used? How do students use AI to learn, not to shortcut learning? Every example in Tier 3 uses your Constitution or your unit — no new hypotheticals.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Before Tier 3, review your unit one more time. Would you actually teach this? If something doesn't sit right, iterate now. The unit should be something you're genuinely ready to use.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="workflow-design-201"
      title="Workflow Design: When and How Students Use AI"
      sections={sections}
      {...props}
    />
  );
};
