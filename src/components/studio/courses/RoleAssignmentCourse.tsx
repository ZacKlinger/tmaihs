import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface RoleAssignmentCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
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
              "You're preparing a parent communication about a sensitive topic. You want the tone 
              to be professional yet warm, clear but not clinical. The generic AI output sounds... 
              robotic. How do you get writing that matches the voice you need?"
            </p>
          </div>
          <p>
            AI doesn't inherently know what voice or perspective to use. By default, it produces 
            neutral, middle-of-the-road content. But when you assign it a <strong>role or persona</strong>, 
            you fundamentally change how it approaches the task.
          </p>
          <p>
            In this micro-course, you'll learn the <strong>Role Assignment mental model</strong>—how 
            to shape AI output by defining who the AI should "be" when generating content.
          </p>
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
            When you assign a role to AI, you're activating patterns from that role's typical 
            communication style, expertise level, and perspective.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without Role:</p>
              <p className="text-sm">"Explain why homework matters"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Generic explanation, no particular voice
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Role:</p>
              <p className="text-sm">
                "You are a veteran middle school teacher known for building strong relationships 
                with reluctant learners. Explain to a 7th grader why homework matters, in a way 
                that acknowledges their frustration while being honest about the reality."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Empathetic, realistic, age-appropriate response
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Effective Role Elements</h3>
          <ul>
            <li><strong>Expertise:</strong> "veteran teacher," "curriculum specialist," "special education expert"</li>
            <li><strong>Style:</strong> "known for clarity," "uses humor," "straightforward"</li>
            <li><strong>Perspective:</strong> "who has worked with struggling students," "who prioritizes engagement"</li>
            <li><strong>Context:</strong> "at an under-resourced school," "with 25+ years experience"</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> Role assignment isn't about making AI "pretend"—it's about 
              activating relevant patterns in how it generates text. A "veteran teacher" role draws on 
              different language patterns than a "first-year teacher" role.
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
        question: "Which prompt will produce more effective parent communication?",
        context: "A teacher needs to write an email about a student's behavior concerns.",
        options: [
          {
            id: "A",
            prompt: "Write an email to parents about their child's disruptive behavior in class. Be professional.",
            isCorrect: false,
            annotations: [
              { text: "Write an email", label: "No role defined", color: "bg-amber-500/20" },
              { text: "Be professional", label: "Vague style", color: "bg-amber-500/20" },
            ],
            explanation: "Without a role, the AI defaults to generic professional language that may come across as cold or form-letter-like.",
          },
          {
            id: "B",
            prompt: "You are an experienced middle school teacher who is known for partnering with families rather than lecturing them. Write an email to parents about their child's recent behavior challenges. Your goal is to invite collaboration, not assign blame. Acknowledge that the student has strengths. Keep the tone warm but honest.",
            isCorrect: true,
            annotations: [
              { text: "experienced middle school teacher", label: "Expertise role", color: "bg-green-500/20" },
              { text: "known for partnering with families", label: "Style attribute", color: "bg-green-500/20" },
              { text: "invite collaboration, not assign blame", label: "Clear purpose", color: "bg-green-500/20" },
              { text: "warm but honest", label: "Tone guidance", color: "bg-green-500/20" },
            ],
            explanation: "The role creates a specific voice and perspective. The AI will draw on patterns of collaborative, strength-based communication.",
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
        title: "Prompt Workshop: Role Assignment",
        description: "Practice assigning roles to shape AI output. Try these starter prompts, then create your own for tasks you actually need to complete.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Expert Curriculum Designer",
            prompt: `You are a curriculum designer with 20 years of experience creating materials for diverse learners. You're known for making complex content accessible without dumbing it down.

Design a [UNIT/LESSON] on [TOPIC] for [GRADE] students. Include:
- Clear learning progressions
- Multiple entry points for different skill levels
- Formative checkpoints throughout`,
          },
          {
            label: "Student Perspective",
            prompt: `You are a [GRADE] student who is generally engaged in school but finds [SUBJECT] challenging. You want to do well but sometimes feel lost.

Read this [ASSIGNMENT/INSTRUCTIONS] and tell me:
- What parts are confusing?
- What would help you understand better?
- What questions would you be afraid to ask in class?`,
          },
        ],
        iterationTips: [
          "If the output feels too generic, add more specific attributes to the role: expertise area, years of experience, known strengths.",
          "Combine role with constraints: 'As a [role], create a [format] that is [length] and focuses on [specific element].'",
          "Try the same prompt with different roles to see how perspective changes the output.",
          "For student-facing materials, try having AI take on a student persona to predict confusion points.",
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
          { id: "1", text: "You are a special education coordinator", correctLabel: "Expertise" },
          { id: "2", text: "with 15 years of experience in inclusive classrooms", correctLabel: "Context" },
          { id: "3", text: "You're known for practical, immediately implementable strategies", correctLabel: "Style" },
          { id: "4", text: "who advocates for both students and teachers", correctLabel: "Perspective" },
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
            <p className="font-medium mb-2">Reflection Question:</p>
            <p className="text-muted-foreground">
              Think about a communication or document you regularly create. Whose voice or expertise 
              would make that content better? What specific attributes would you include in that role?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              This week, try using role assignment for one task: a parent email, a lesson explanation, 
              or feedback on student work. Notice how the voice changes when you define who is "speaking."
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Power move:</strong> Combine Role Assignment with Constraints. Start with "You are [role]" 
              then add "Create a [format] that is [length] and includes [specific elements]."
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
