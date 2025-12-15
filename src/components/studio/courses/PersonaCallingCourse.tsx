import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface PersonaCallingCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const PersonaCallingCourse = (props: PersonaCallingCourseProps) => {
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
              "You need to design a semester-long project, but you want expert-level thinking—not generic 
              suggestions. What if you could consult a veteran PBL teacher, a curriculum specialist, 
              AND a student engagement researcher... all in one prep period?"
            </p>
          </div>
          <p>
            <strong>Persona calling</strong> is the technique of explicitly telling AI to respond 
            from a specific expert perspective. Different personas bring different expertise, 
            priorities, and blind spots.
          </p>
          <p>
            In this micro-course, you'll learn to strategically select personas that match your task type.
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
          <h2 className="text-xl font-semibold text-foreground">The Persona Calling Mental Model</h2>
          <p className="text-lg">
            AI defaults to a "helpful assistant" voice—balanced but generic. Personas shift the 
            <strong> lens</strong> through which AI approaches your task.
          </p>
          
          <h3 className="text-lg font-semibold mt-6">Persona Categories for Teachers</h3>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Practitioner Personas</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Veteran teacher (classroom-tested wisdom)</li>
                <li>• Department chair (alignment, coordination)</li>
                <li>• Special education specialist (accessibility)</li>
                <li>• Instructional coach (implementation strategies)</li>
              </ul>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Specialist Personas</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Curriculum designer (scope, sequence, objectives)</li>
                <li>• Assessment expert (validity, reliability)</li>
                <li>• Student engagement researcher (motivation)</li>
                <li>• Content expert in [subject] (depth, accuracy)</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Matching Personas to Tasks</h3>
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Task Type</th>
                  <th className="text-left py-2">Best Persona</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2">Lesson planning</td>
                  <td>Veteran teacher + content expert</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Assessment design</td>
                  <td>Assessment expert</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2">Differentiation</td>
                  <td>Special education specialist</td>
                </tr>
                <tr>
                  <td className="py-2">Project design</td>
                  <td>PBL researcher + veteran teacher</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "persona-calling-cfu-1",
        type: "output-match" as const,
        question: "Match each persona to the output style it would produce.",
        description: "Different personas prioritize different aspects of a response.",
        pairs: [
          {
            promptId: "p1",
            prompt: "Veteran high school teacher with 20 years of classroom experience",
            outputId: "o1",
            output: "Here's what actually works: Start with a hook that connects to their lives. I've found that 10th graders disengage after 15 minutes of direct instruction, so chunk it...",
            explanation: "Veteran teachers emphasize practical, tested strategies and realistic timing based on experience.",
          },
          {
            promptId: "p2",
            prompt: "Curriculum alignment specialist",
            outputId: "o2",
            output: "This lesson addresses Standard RL.9-10.2 (central theme analysis). The learning objective should be measurable. Consider: 'Students will identify and explain...'",
            explanation: "Curriculum specialists focus on standards alignment, measurable objectives, and formal structure.",
          },
          {
            promptId: "p3",
            prompt: "Student engagement researcher",
            outputId: "o3",
            output: "Research shows that student choice increases intrinsic motivation (Deci & Ryan, 2000). Consider offering three text options that all address the same skill...",
            explanation: "Researchers cite evidence and focus on underlying principles of motivation and learning.",
          },
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "persona-calling-cfu-2",
        type: "persona-task-match" as const,
        question: "Select the most effective persona for each task.",
        description: "Consider what expertise each task requires.",
        tasks: [
          {
            id: "t1",
            description: "You need to create accommodations for a unit assessment to support students with IEPs.",
            correctPersonaId: "sped",
            explanation: "Special education specialists understand legal requirements, specific accommodation strategies, and how to maintain rigor while providing access.",
          },
          {
            id: "t2",
            description: "You want to design a semester project that builds from simple skills to a complex final product.",
            correctPersonaId: "curriculum",
            explanation: "Curriculum designers excel at scope and sequence, scaffolding complexity, and backward design from final outcomes.",
          },
          {
            id: "t3",
            description: "Your students are disengaged during the research phase of projects. You need ideas to increase motivation.",
            correctPersonaId: "engagement",
            explanation: "Engagement researchers understand motivation theory and can suggest evidence-based strategies for increasing student investment.",
          },
        ],
        personas: [
          { id: "veteran", name: "Veteran Teacher", description: "20+ years classroom experience" },
          { id: "sped", name: "Special Education Specialist", description: "Expertise in accommodations and accessibility" },
          { id: "curriculum", name: "Curriculum Designer", description: "Scope, sequence, and backward design" },
          { id: "engagement", name: "Student Engagement Researcher", description: "Motivation and learning science" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Strategic Persona Selection",
        description: "Practice calling different personas for the same task and comparing outputs.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Compare Persona Outputs",
            prompt: `You are a [PERSONA 1]. I need help designing a [TASK]. 
Approach this from your specific expertise and priorities.

[Describe your task]

---
Now, respond as a [PERSONA 2] to the same task. 
How does your advice differ?`,
          },
          {
            label: "Build a Persona Library",
            prompt: `I often need help with these teaching tasks:
- [Task 1]
- [Task 2]  
- [Task 3]

For each task, recommend the single best persona I should call, and explain why that expertise matters for that specific task.`,
          },
        ],
        iterationTips: [
          "Combine personas: 'You are a veteran teacher WHO IS ALSO a curriculum designer.'",
          "Add context to personas: 'You are a veteran teacher at a Title I urban high school.'",
          "Use role assignment (Tier 1) within persona calls: 'As an assessment expert, your task is to...'",
          "Build a personal 'persona library' for your most common tasks.",
        ],
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
              What are your 3-4 most common prep tasks? For each, which persona would bring 
              the most useful perspective?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              Create a simple reference card with your top 5 personas and when to use each. 
              Keep it visible during prep periods.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to Tier 1:</strong> Persona calling builds on Role Assignment—you're 
              not just giving AI a task, you're defining WHO it should be while completing that task.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="persona-calling-201"
      title="Persona Calling: Strategic Expert Perspectives"
      sections={sections}
      {...props}
    />
  );
};
