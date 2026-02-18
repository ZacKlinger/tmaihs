import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface PersonaCallingCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const PersonaCallingCourse = (props: PersonaCallingCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Who Are Students in This Project?</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              Your unit outline is solid. The driving question is clear, the phases are sequenced, the assessment aligns. But there's a difference between a project students do and a project students own. Right now, students are "doing a hydroponics project." That's an assignment. What if they were food systems consultants investigating whether hydroponics can actually supplement their neighborhood's food supply? That's a role with real stakes.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              The students who speak with conviction at the community showcase aren't performing. They're reporting from a position they've held all semester. The role changed how they thought about the work.
            </p>
          </div>
          <p>
            In Course 4, you stress-tested your unit and built a solid outline. Now you're adding the layer that turns structure into ownership.
          </p>
          <p>
            Persona calling isn't about costumes or pretending. It's about giving students a specific position — with real constraints, a real audience, and a reason their work matters to someone outside the classroom. When students are "food systems consultants for the Third Street community fridge," every decision they make is grounded. Why does pH matter? Because the fridge coordinator needs reliable produce. Why does data accuracy matter? Because they're reporting to real stakeholders.
          </p>
          <p>
            This course adds the <strong>Persona Section</strong> to your PBL unit — who students are in this project, what they know and don't know, and who they're accountable to.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Culturally Sustaining Pedagogy" /> (Paris & Alim) reminds us that roles should connect to students' communities and identities — not distance them from who they already are.
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
          <h2 className="text-xl font-semibold text-foreground">Roles Give Thinking a Direction</h2>
          <p className="text-lg">
            A persona isn't a label. It's a set of constraints that shape how students approach every decision in the project.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without a Persona:</p>
              <p className="text-sm">"Students will complete a hydroponics project and present their findings."</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Students do the work because it's assigned. Decisions feel arbitrary. "Why does this matter?" has no good answer beyond "it's the project."
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With a Persona:</p>
              <p className="text-sm">
                "Students are food systems consultants investigating whether hydroponics can supplement the Third Street community fridge's food supply. They don't know yet whether the systems will produce enough. Their audience is the fridge coordinator, who needs data — not enthusiasm."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Every decision is grounded. Data collection has a purpose. Precision matters because someone depends on it.
              </p>
            </div>
          </div>

          <p>A strong student persona has four elements:</p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">Role: What position do they hold?</p>
                <p className="text-muted-foreground">Food systems consultant, community nutrition researcher, environmental analyst. Something someone actually does in the world.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Constraints: What don't they know yet?</p>
                <p className="text-muted-foreground">Whether hydroponics is viable here. What plants grow best. If the system can sustain itself past the semester. These unknowns drive the inquiry.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Audience: Who are they accountable to?</p>
                <p className="text-muted-foreground">The fridge coordinator who needs reliable volume. The school board that wants evidence. Parents who invested time. Real people with real expectations.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Connection: How does this map to the driving question?</p>
                <p className="text-muted-foreground">"How can we grow food that feeds our neighborhood?" isn't abstract when you're a consultant whose client is waiting for your recommendation.</p>
              </div>
            </div>
          </div>

          <p>
            Clear constraints don't limit students — they focus them. A consultant who knows their client needs reliable data collects better data than a student told to "make a chart." The persona provides the reason.
          </p>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "persona-calling-cfu-1",
        type: "prompt-compare" as const,
        question: "Which student persona design gives students more agency and clearer direction?",
        context: "You're defining who students are in the hydroponics project. You want the persona to shape how they approach every phase — from system design to data collection to community presentation.",
        options: [
          {
            id: "A",
            prompt: "Students will pretend to be scientists working in a lab. They should use scientific language in their reports and present their findings formally.",
            isCorrect: false,
            annotations: [
              { text: "pretend to be scientists", label: "Performance, not position", color: "bg-amber-500/20" },
              { text: "use scientific language", label: "Surface behavior, not thinking", color: "bg-amber-500/20" },
              { text: "present their findings formally", label: "Format, not agency", color: "bg-amber-500/20" },
            ],
            explanation: "This is a costume, not a role. It tells students how to act (use scientific language, be formal) but doesn't give them a position that shapes their thinking. A student in a lab coat makes the same decisions as a student without one.",
          },
          {
            id: "B",
            prompt: "Students are food systems consultants investigating whether hydroponics can supplement the Third Street community fridge's food supply. They don't yet know if the systems will produce enough volume or be reliable enough for weekly donations. Their client — the fridge coordinator — needs data, not promises. Students must deliver a recommendation backed by evidence from their 16-week investigation.",
            isCorrect: true,
            annotations: [
              { text: "food systems consultants", label: "Real-world role", color: "bg-green-500/20" },
              { text: "don't yet know if the systems will produce enough", label: "Genuine uncertainty drives inquiry", color: "bg-green-500/20" },
              { text: "the fridge coordinator — needs data, not promises", label: "Accountability to real person", color: "bg-green-500/20" },
              { text: "recommendation backed by evidence", label: "Clear deliverable with stakes", color: "bg-green-500/20" },
            ],
            explanation: "This persona has real constraints (they don't know the answer yet), a real audience (the fridge coordinator), and a clear deliverable (a recommendation backed by evidence). Every decision in the project flows from this position.",
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
        title: "Design Your Student Personas",
        description: "Load your Constitution and your unit outline from Course 4. Design 1-2 student personas for your actual project — roles that connect to the driving question, have real constraints, and are accountable to someone specific. Test them: does the output feel different when AI knows who students are in the project?",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Student Persona Designer",
            prompt: `[PASTE YOUR FULL AI CLASSROOM CONSTITUTION]

---

Here's my PBL unit outline (from Course 4):
[PASTE YOUR UNIT OUTLINE]

---

Help me design a student persona for this project:

1. ROLE: What real-world position do students hold? (Something specific — "food systems consultant," not just "scientist")

2. CONSTRAINTS: What don't students know at the start? What genuine uncertainty drives the inquiry?

3. AUDIENCE: Who are students accountable to? Use the stakeholders from my Constitution.

4. DRIVING QUESTION CONNECTION: How does this role make the driving question personal?

Design 2 persona options. For each, show how the persona changes what students do at each phase of the unit.`,
          },
          {
            label: "Persona Test: Does It Change the Work?",
            prompt: `[PASTE YOUR CONSTITUTION + UNIT OUTLINE + CHOSEN PERSONA]

---

Test this persona by generating two versions of the same Week 6 activity:

VERSION 1: Students without a persona — "analyze your growth data and present findings."

VERSION 2: Students in their persona — "prepare a data briefing for your client that addresses whether the system is producing enough to be worth continuing."

Show me both versions so I can see how the persona changes the quality and direction of student work.`,
          },
        ],
        iterationTips: [
          "The persona should create genuine uncertainty. If students already know the answer, the role is decorative.",
          "Connect the persona to real stakeholders from your Constitution. 'Your client is the fridge coordinator' is stronger than 'your audience is the community.'",
          "Test whether the persona changes what students DO, not just what they SAY. If the activities look the same with or without the role, it's not working.",
          "Different students can hold different roles — one team as consultants, another as community researchers. Different roles surface different questions about the same project.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "persona-calling-cfu-2",
        type: "identify-missing" as const,
        prompt: "Students will be environmental scientists for the hydroponics project.",
        context: "A teacher is defining the student persona for their project. The statement above is their full persona description. What elements are missing?",
        elements: [
          { id: "constraints", label: "What students don't know yet (genuine uncertainty)", isMissing: true, explanation: "Without constraints, there's no investigation. What question are these 'environmental scientists' trying to answer? The unknowns are what make the role meaningful." },
          { id: "audience", label: "Who students are accountable to (specific stakeholder)", isMissing: true, explanation: "'Environmental scientists' report to whom? A client? A community? A funder? The audience shapes the work." },
          { id: "driving-q-connection", label: "How the persona connects to the driving question", isMissing: true, explanation: "Why does an environmental scientist need to answer 'How can we grow food that feeds our neighborhood?' The connection should feel natural, not forced." },
          { id: "deliverable", label: "What specific product the persona delivers", isMissing: true, explanation: "A feasibility report? A recommendation? A presentation to stakeholders? The deliverable shapes every phase of the work." },
          { id: "title", label: "A job title for the role", isMissing: false, explanation: "'Environmental scientists' is a title. It could be more specific, but the title itself isn't what's missing — it's the constraints, audience, and connection." },
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
          <h2 className="text-xl font-semibold text-foreground">Students Have a Position Now</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              Your unit has architecture (from Course 4) and now it has identity. Students aren't just "doing a hydroponics project" — they hold a specific position with constraints, an audience, and a reason to care. Save the persona. It shows up in every workflow you build next.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Next: When and How Do Students Use AI?</p>
            <p className="text-muted-foreground">
              The unit has structure and personas. Course 6 asks the practical question: at which moments do students interact with AI, and what does that look like? You'll design specific workflows — reusable templates students can follow — so AI use in the project is intentional, not accidental.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="persona-calling-201"
      title="Persona Calling: Designing Student Roles That Drive Inquiry"
      sections={sections}
      {...props}
    />
  );
};
