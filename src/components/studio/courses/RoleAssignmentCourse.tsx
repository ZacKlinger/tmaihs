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
            Your Constitution already tells AI who your students are and what they're working on. This course
            adds a new section: your <strong>Stakeholder & Perspective Map</strong>. By the end, AI won't
            just know your classroom — it'll know the people your students interact with and the
            perspectives that matter most to your project.
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
        title: "Build Your Constitution: Stakeholder & Perspective Map",
        description: "This adds the third section to your Constitution. Map the real people your students interact with — their concerns, their communication styles, their perspectives. When you load this into AI alongside your first two sections, you'll get outputs that reflect the actual relationships in your project.",
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
- Potential objection: [WHAT MIGHT MAKE THEM SKEPTICAL]
- Communication style: [DIRECT/FORMAL/SUPPORTIVE BUT QUESTIONING]

STAKEHOLDER 2: [NAME OR TYPE — e.g., "School board members at annual showcase"]
- Main concern: [WHAT THEY CARE ABOUT]
- Potential objection: [WHAT MIGHT MAKE THEM SKEPTICAL]
- Communication style: [DIRECT/FORMAL/SUPPORTIVE BUT QUESTIONING]

STAKEHOLDER 3: [NAME OR TYPE — e.g., "Parent volunteers who help in the garden"]
- Main concern: [WHAT THEY CARE ABOUT]
- Potential objection: [WHAT MIGHT MAKE THEM SKEPTICAL]
- Communication style: [DIRECT/FORMAL/SUPPORTIVE BUT QUESTIONING]

Perspectives to center: [WHOSE VOICES MATTER MOST — e.g., "longtime neighborhood residents, students with food insecurity experience"]
Community context: [RELEVANT LOCAL DETAILS — e.g., "neighborhood has limited grocery access, community fridge serves 40+ families weekly"]

---
TEST IT: Paste all three Constitution sections into an AI tool and ask it to simulate one of your stakeholders reviewing student work. Compare the output to what you'd get without the stakeholder context.`,
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
            <p className="font-medium mb-2">Your Constitution So Far</p>
            <p className="text-muted-foreground">
              Three sections down. Your Constitution now tells AI who your students are, what they're
              working on, and who the people around the project are — the stakeholders, their concerns,
              and the community context that shapes everything.
            </p>
            <p className="text-muted-foreground mt-3">
              Save what you wrote in the workshop alongside your first two sections. One more course
              and you'll have a complete Constitution.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Test It This Week</p>
            <p className="text-muted-foreground">
              Before students present or share work with external audiences, load your Constitution
              into an AI tool and ask it to simulate one of your stakeholders reviewing student work.
              Share the questions it generates with students as preparation.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Caution:</strong> Role assignment can inadvertently reinforce stereotypes.
              Be thoughtful about how you define roles in your Constitution — describe specific
              perspectives and experiences, not demographic categories.
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
