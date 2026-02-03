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
          <h2 className="text-xl font-semibold text-foreground">The Work Context</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              "Your students are presenting their community problem-solving projects to local stakeholders next week. 
              You want to help them prepare for tough questions—but you can't predict what a city council member, 
              a skeptical business owner, or a concerned parent might ask. What if AI could simulate those perspectives?"
            </p>
          </div>
          <p>
            By default, AI produces neutral, middle-of-the-road responses. But when you assign it a 
            <strong> role or persona</strong>, you activate different patterns of expertise, priorities, and critique.
          </p>
          <p>
            In this micro-course, you'll learn the <strong>Role Assignment mental model</strong>—how to shape 
            AI output by defining whose perspective it should take.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This technique draws on <ResearchLink text="Perspective-Taking" /> research (Galinsky et al.)—the same 
            cognitive skill we want students to develop.
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
          <h2 className="text-xl font-semibold text-foreground">The Role Assignment Mental Model</h2>
          <p className="text-lg">
            When you assign a role, you're activating patterns from that role's typical communication style, 
            expertise, and concerns. Different roles bring different <strong>lenses</strong> to the same task.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without Role:</p>
              <p className="text-sm">"Give feedback on this student project proposal"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Generic, balanced feedback that misses specific stakeholder concerns
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Role:</p>
              <p className="text-sm">
                "You are a city council member who has seen many student presentations that promised more than 
                they delivered. You're supportive of youth voice but skeptical of feasibility. 
                Critique this proposal as you would in a real council meeting."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Specific, authentic critique that prepares students for real stakeholder interaction
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Roles for PBL Preparation</h3>
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">PBL Phase</th>
                  <th className="text-left py-2">Useful Roles</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2">Research & Investigation</td>
                  <td>Subject matter expert, skeptical journalist, community member with lived experience</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Prototype & Critique</td>
                  <td>End user, design critic, accessibility advocate</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Presentation Prep</td>
                  <td>Skeptical stakeholder, potential funder, confused audience member</td>
                </tr>
                <tr>
                  <td className="py-2">Reflection & Revision</td>
                  <td>Future student doing this project, teacher mentor, portfolio reviewer</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> Role assignment is like creating a <ResearchLink text="Empathy Maps" /> (d.school)—you're 
              defining what a persona thinks, feels, and prioritizes. The more specific the role, the more useful the output.
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
        id: "role-cfu-1",
        type: "prompt-compare" as const,
        question: "Which prompt will better prepare students for their community presentation?",
        context: "Students are presenting a proposal for a school garden to the school board next week.",
        options: [
          {
            id: "A",
            prompt: "Give feedback on this student proposal for a school garden. Be constructive.",
            isCorrect: false,
            annotations: [
              { text: "Give feedback", label: "No specific perspective", color: "bg-amber-500/20" },
              { text: "Be constructive", label: "Vague tone guidance", color: "bg-amber-500/20" },
            ],
            explanation: "Without a role, AI defaults to generic 'helpful assistant' feedback—not the specific concerns a school board member would raise about budget, liability, or maintenance.",
          },
          {
            id: "B",
            prompt: "You are a school board member who manages a tight district budget and has concerns about long-term maintenance costs. You support student initiatives but need to justify expenses to taxpayers. Review this garden proposal and ask the 3 questions you'd ask in a real board meeting. Be direct but fair.",
            isCorrect: true,
            annotations: [
              { text: "school board member", label: "Specific role", color: "bg-green-500/20" },
              { text: "tight district budget", label: "Role constraints", color: "bg-green-500/20" },
              { text: "justify expenses to taxpayers", label: "Stakeholder priorities", color: "bg-green-500/20" },
              { text: "3 questions you'd ask", label: "Actionable output", color: "bg-green-500/20" },
            ],
            explanation: "This role includes specific constraints (budget concerns, taxpayer accountability) that shape the critique. Students will get questions similar to what they'll actually face.",
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
        title: "Prompt Workshop: Role Assignment for PBL",
        description: "Practice assigning roles that match your project's stakeholders and critique needs.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Stakeholder Critique Simulator",
            prompt: `You are a [STAKEHOLDER TYPE] who will be in the audience when students present their [PROJECT TYPE].

Your perspective:
- Your main concern: [WHAT THIS STAKEHOLDER CARES ABOUT]
- Your potential objection: [WHAT MIGHT MAKE THEM SKEPTICAL]
- Your communication style: [DIRECT/FORMAL/SUPPORTIVE BUT QUESTIONING]

Review this student work and respond as you would in the real presentation:
[PASTE STUDENT WORK OR PROPOSAL]

Provide:
1. Your initial reaction (2-3 sentences)
2. Three questions you'd ask
3. What would make you say "yes" to this proposal`,
          },
          {
            label: "Student Perspective Check",
            prompt: `You are a [GRADE] student who has never done a project like this before. You're motivated but sometimes confused by instructions.

Read these project guidelines and tell me:
- What parts are clear?
- What parts would confuse you?
- What would you be afraid to ask the teacher?
- What would you wish you had an example of?

[PASTE YOUR PROJECT GUIDELINES]`,
          },
        ],
        iterationTips: [
          "Add specific constraints to roles: 'a community member who has lived in this neighborhood for 40 years' vs. just 'community member.'",
          "Match roles to your actual stakeholders—if students will present to the city council, simulate a city council member.",
          "Use role assignment to anticipate student confusion: have AI take on a struggling student's perspective.",
          "Combine with constraints (Tier 1): 'As a [role], create a [specific format] that addresses [specific need].'",
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
          { id: "1", text: "You are a documentary filmmaker", correctLabel: "Expertise" },
          { id: "2", text: "who has mentored high school students on three previous projects", correctLabel: "Context" },
          { id: "3", text: "You're known for honest but encouraging feedback", correctLabel: "Style" },
          { id: "4", text: "who believes students should struggle productively before getting answers", correctLabel: "Perspective" },
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
          <h2 className="text-xl font-semibold text-foreground">Reflection & Transfer</h2>
          
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium mb-2">Metacognitive Check:</p>
            <p className="text-muted-foreground">
              Think about your current or upcoming project. Who are the real stakeholders students will interact with? 
              What specific concerns, priorities, or communication styles do those stakeholders have? 
              How could AI simulate those perspectives to help students prepare?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Transfer Challenge:</p>
            <p className="text-muted-foreground">
              Before students present or share work with external audiences, create 2-3 stakeholder role prompts. 
              Use AI to generate the questions those stakeholders might ask. Share these with students as preparation.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Caution:</strong> Role assignment can inadvertently reinforce stereotypes. 
              Be thoughtful about how you define roles—avoid reducing complex identities to single characteristics.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="role-assignment-101"
      title="Role Assignment: Shaping AI Perspective"
      sections={sections}
      {...props}
    />
  );
};
