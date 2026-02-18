import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface RoleAssignmentCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const RoleAssignmentCourse = (props: RoleAssignmentCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Week 12, Getting Ready</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              Your students are four weeks from their community presentations. They'll be standing in front of the community fridge coordinator — someone who actually depends on reliable food donations. They'll face school board members who want evidence of learning, not just enthusiasm. They'll answer questions from parent volunteers who've been helping in the garden all semester.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              You want to prepare them for those conversations. But you can't predict what a fridge coordinator who manages 40 families' food access will actually ask. So you try AI — "Give feedback on this student presentation." What comes back is bland, encouraging, useless. It reads like a greeting card, not a stakeholder with real concerns.
            </p>
          </div>
          <p>
            In Course 1, you built a Constitution that tells AI who your students are and what they're working on. That's necessary context. But right now AI is responding as a generic helpful assistant — and no real stakeholder talks like a generic helpful assistant.
          </p>
          <p>
            When you assign AI a role, something shifts. You're not just changing tone — you're activating different patterns of expertise and concern. A fridge coordinator notices reliability and volume. A school board member notices evidence of learning standards. A parent volunteer notices student ownership. The same project, seen through different lenses.
          </p>
          <p>
            This course adds <strong>Section 3</strong> to your Constitution: a <strong>Stakeholder & Perspective Map</strong> that tells AI who the people around your project are and what they care about.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Perspective-taking research" /> (Galinsky et al.) shows this is the same cognitive skill we want students to develop — the ability to see their work through someone else's concerns.
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
          <h2 className="text-xl font-semibold text-foreground">Roles Change What AI Notices</h2>
          <p className="text-lg">
            A role isn't a costume. It's a lens. When you tell AI to respond as a specific person with specific concerns, you change what it pays attention to, what it pushes back on, and what it lets slide.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without Role:</p>
              <p className="text-sm">"Give feedback on this student presentation about their hydroponics project"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Polite, balanced, generic. Praises effort, suggests minor improvements. Sounds like a feedback template, not a person.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Role:</p>
              <p className="text-sm">
                "You are the coordinator of the Third Street community fridge, which serves 40+ families weekly. You've seen student projects come and go — some deliver, some don't. You're supportive of these students but you need to know: how much food will this actually produce? How reliable is the system? What happens when the semester ends? Review their presentation with those concerns in mind."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Specific, grounded critique that prepares students for the real conversation they'll have.
              </p>
            </div>
          </div>

          <p>Different phases of a project call for different voices. Here's how that looks across the hydroponics arc:</p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Project Phase</th>
                  <th className="text-left py-2">Useful Roles</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2">System Design (Weeks 1-3)</td>
                  <td>Environmental engineer, experienced hydroponic grower</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Data Collection (Weeks 4-8)</td>
                  <td>Lab scientist who cares about methodology, quality control inspector</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Optimization (Weeks 9-12)</td>
                  <td>Community fridge coordinator, school nutrition specialist</td>
                </tr>
                <tr>
                  <td className="py-2">Presentation Prep (Weeks 13-15)</td>
                  <td>Skeptical school board member, confused but supportive parent, local journalist</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            Each role brings different concerns to the same project. The engineer cares about whether the system works. The fridge coordinator cares about whether it produces enough food, reliably. The school board member wants evidence of learning. You're building a map of these perspectives so AI can simulate any of them when you need it.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This mirrors <ResearchLink text="Empathy Maps" /> from Stanford's d.school — you're defining what each stakeholder thinks, feels, and prioritizes. The more specific the role, the more useful the output.
          </p>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "role-cfu-1",
        type: "prompt-compare" as const,
        question: "Students are presenting their hydroponics data to the school board next week. Which prompt better prepares them?",
        context: "The annual showcase is coming up. School board members will be reviewing student projects for evidence of learning and standards alignment. Students need to practice fielding tough questions.",
        options: [
          {
            id: "A",
            prompt: "Give feedback on this student presentation about hydroponics. Be constructive and help them improve.",
            isCorrect: false,
            annotations: [
              { text: "Give feedback", label: "No specific perspective", color: "bg-amber-500/20" },
              { text: "Be constructive", label: "Vague — everyone's constructive", color: "bg-amber-500/20" },
            ],
            explanation: "Without a role, AI defaults to 'helpful assistant' — generic praise with gentle suggestions. A school board member doesn't give constructive feedback. They ask pointed questions about whether this project justifies the resources it used.",
          },
          {
            id: "B",
            prompt: "You are a school board member reviewing student projects at the annual showcase. You manage a tight district budget and need to justify expenditures to taxpayers. You believe in hands-on learning but need to see evidence of academic rigor — standards alignment, measurable outcomes, data-driven conclusions. Review this hydroponics presentation and ask the 3 questions you'd ask in a real board meeting.",
            isCorrect: true,
            annotations: [
              { text: "school board member", label: "Specific role", color: "bg-green-500/20" },
              { text: "tight district budget", label: "Real constraints", color: "bg-green-500/20" },
              { text: "justify expenditures to taxpayers", label: "Stakeholder priorities", color: "bg-green-500/20" },
              { text: "evidence of academic rigor", label: "What they actually care about", color: "bg-green-500/20" },
              { text: "3 questions you'd ask", label: "Concrete output", color: "bg-green-500/20" },
            ],
            explanation: "This role has specific constraints — budget pressure, accountability to taxpayers, need for evidence. The questions it generates will sound like what students actually hear at the showcase, not like feedback from a helpful robot.",
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
        title: "Build Your Constitution: Stakeholder & Perspective Map",
        description: "This is Section 3 of your Constitution. Map the real people your students interact with — who they are, what they care about, and what they'd push back on. When you paste this into AI alongside your first two sections, the feedback shifts from generic to specific.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Constitution Section 3: Stakeholder & Perspective Map",
            prompt: `STAKEHOLDER & PERSPECTIVE MAP — save this as the third section of your AI Classroom Constitution.

Key stakeholders for this project:

STAKEHOLDER 1: [NAME OR TYPE — e.g., "Community fridge coordinator on Third Street"]
- Main concern: [WHAT THEY CARE ABOUT — e.g., "reliability and volume of food donations"]
- Potential objection: [WHAT MIGHT MAKE THEM SKEPTICAL — e.g., "student projects rarely follow through after the semester ends"]
- Communication style: [HOW THEY TALK — e.g., "direct, practical, wants specifics not promises"]

STAKEHOLDER 2: [NAME OR TYPE — e.g., "School board members at annual showcase"]
- Main concern: [WHAT THEY CARE ABOUT — e.g., "evidence of standards-aligned learning, budget justification"]
- Potential objection: [WHAT MIGHT MAKE THEM SKEPTICAL]
- Communication style: [HOW THEY TALK — e.g., "formal, evidence-driven, asks about outcomes"]

STAKEHOLDER 3: [NAME OR TYPE — e.g., "Parent volunteers who help in the garden"]
- Main concern: [WHAT THEY CARE ABOUT — e.g., "student ownership, visible growth, their kid's engagement"]
- Potential objection: [WHAT MIGHT MAKE THEM SKEPTICAL]
- Communication style: [HOW THEY TALK]

Perspectives to center: [WHOSE VOICES MATTER MOST — e.g., "longtime neighborhood residents, students with food insecurity experience"]
Community context: [RELEVANT LOCAL DETAILS — e.g., "neighborhood has limited grocery access, community fridge serves 40+ families weekly"]

---
TEST IT: Paste all three Constitution sections into an AI tool and ask it to simulate one of your stakeholders reviewing a piece of student work. Compare the output to what you'd get without the stakeholder context.`,
          },
          {
            label: "Role Prompt Test",
            prompt: `[PASTE ALL THREE CONSTITUTION SECTIONS FIRST]

---

Now simulate a conversation between a student and [STAKEHOLDER FROM YOUR MAP].

The student is presenting their project progress so far. The stakeholder should:
- Ask questions based on their actual concerns (from the Perspective Map)
- Push back where they'd naturally push back
- Be authentic to their communication style
- End with one thing they'd want to see before the final presentation

I want to use these questions to help my students prepare.`,
          },
        ],
        iterationTips: [
          "Be specific about individual perspectives: 'a fridge coordinator who manages donations for 40 families' is sharper than 'community partner.'",
          "Match roles to your actual stakeholders. If students will present to the school board, simulate a school board member — not a generic evaluator.",
          "Use role assignment to anticipate student confusion: have AI take on the perspective of a student who's struggling with the current phase.",
          "Different project phases need different voices. A Week 3 design review calls for an engineer. A Week 14 presentation prep calls for the audience.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "role-cfu-2",
        type: "annotate-prompt" as const,
        question: "Identify the role elements in this prompt",
        description: "Click each highlighted segment and label what type of role element it represents.",
        segments: [
          { id: "1", text: "You are the coordinator of the Third Street community fridge", correctLabel: "Expertise" },
          { id: "2", text: "which serves 40+ families weekly and depends on consistent donations", correctLabel: "Context" },
          { id: "3", text: "You're practical and direct — you want numbers, not promises", correctLabel: "Style" },
          { id: "4", text: "You've seen student projects before and most don't follow through after the semester", correctLabel: "Perspective" },
        ],
        labels: ["Expertise", "Style", "Perspective", "Context"],
      },
    },
    {
      id: "reflection",
      type: "reflection" as const,
      title: "Reflection",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Three Sections Deep</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              Your Constitution now tells AI three things: who your students are, what they're building, and who the people around the project are — their concerns, their communication styles, the community context that shapes everything.
            </p>
            <p className="text-muted-foreground mt-3">
              Save what you wrote in the workshop alongside your first two sections. One more course and you'll have a complete Constitution.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Try This Before the Next Course</p>
            <p className="text-muted-foreground">
              Pick one of your stakeholders and have AI simulate their review of a piece of student work. Share the questions it generates with your students as preparation. See if they feel real.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              You have a rich Constitution now — classroom context, project architecture, stakeholder map. But you've been building it in draft mode. Course 3 teaches you how to iterate: test it with real AI, critique the output, refine what isn't working, and define what "good" actually means for your classroom. The Constitution isn't finished until it's been tested.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="role-assignment-101"
      title="Role Assignment: Teaching AI Who's in the Room"
      sections={sections}
      {...props}
    />
  );
};
