import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface MetaPromptingCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const MetaPromptingCourse = (props: MetaPromptingCourseProps) => {
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
              "You've written a prompt for differentiated reading questions, but the output is... generic. 
              Too formal. Missing the voice your students respond to. You could rewrite it yourself, 
              but what if AI could tell you exactly what's wrong?"
            </p>
          </div>
          <p>
            This is where <strong>meta-prompting</strong> becomes powerful. Instead of guessing what 
            went wrong, you ask AI to analyze your prompt before—or after—you use it.
          </p>
          <p>
            In this micro-course, you'll learn to use AI as a prompt critic, identifying specific 
            improvements that lead to better outputs.
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
          <h2 className="text-xl font-semibold text-foreground">The Meta-Prompting Mental Model</h2>
          <p className="text-lg">
            Meta-prompting means <strong>using AI to improve your prompts</strong> rather than just 
            using AI to complete tasks. It's prompt engineering with a feedback loop.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-2">Standard Approach:</p>
              <p className="text-sm text-muted-foreground">Write prompt → Get output → Edit output manually</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="font-medium text-primary mb-2">Meta-Prompting Approach:</p>
              <p className="text-sm text-muted-foreground">Write prompt → Ask AI to critique → Improve prompt → Get better output</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Key Meta-Prompts</h3>
          <ul>
            <li><strong>"What's missing from this prompt?"</strong> — Identifies gaps in constraints</li>
            <li><strong>"How would you improve this prompt for [goal]?"</strong> — Gets specific suggestions</li>
            <li><strong>"What assumptions does this prompt make?"</strong> — Reveals hidden biases</li>
            <li><strong>"Rate this prompt 1-10 and explain."</strong> — Forces structured feedback</li>
          </ul>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The same AI that generates mediocre output from a weak prompt 
              can often identify exactly why that prompt is weak. Use that capability.
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
        id: "meta-prompting-cfu-1",
        type: "prompt-compare" as const,
        question: "Which approach is more likely to produce a useful prompt critique?",
        context: "You want AI to help you improve a prompt that's getting generic outputs.",
        options: [
          {
            id: "A",
            prompt: "Is this prompt good? 'Create a lesson plan about the Civil War.'",
            isCorrect: false,
            annotations: [
              { text: "Is this prompt good?", label: "Yes/no question limits feedback", color: "bg-amber-500/20" },
            ],
            explanation: "Yes/no questions get yes/no answers. This prompt doesn't ask for specific improvements or identify what 'good' means.",
          },
          {
            id: "B",
            prompt: "Rate this prompt 1-10 for specificity, then list 3 missing constraints that would make the output more classroom-ready: 'Create a lesson plan about the Civil War.'",
            isCorrect: true,
            annotations: [
              { text: "Rate this prompt 1-10 for specificity", label: "Structured evaluation", color: "bg-green-500/20" },
              { text: "list 3 missing constraints", label: "Specific actionable output", color: "bg-green-500/20" },
              { text: "classroom-ready", label: "Clear success criteria", color: "bg-green-500/20" },
            ],
            explanation: "This meta-prompt uses constraints (from Tier 1!) to structure the critique. It asks for a rating, a specific number of improvements, and defines the goal.",
          },
        ] as [
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string },
          { id: string; prompt: string; isCorrect: boolean; annotations: { text: string; label: string; color: string }[]; explanation: string }
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "meta-prompting-cfu-2",
        type: "spot-the-difference" as const,
        question: "Identify the changes that improved this prompt's effectiveness.",
        description: "Click on the parts of the improved prompt that are different from the original.",
        promptA: "Create discussion questions for my English class about symbolism in The Great Gatsby.",
        promptB: "Create 5 discussion questions about symbolism in The Great Gatsby for 11th grade AP English students. Include questions at three depth levels: recall, analysis, and synthesis.",
        segmentsB: [
          { id: "s1", text: "Create", isDifferent: false, effect: "" },
          { id: "s2", text: " 5 ", isDifferent: true, effect: "Specifies quantity—prevents under/over-generation" },
          { id: "s3", text: "discussion questions about symbolism in The Great Gatsby for", isDifferent: false, effect: "" },
          { id: "s4", text: " 11th grade AP English students", isDifferent: true, effect: "Defines audience level and rigor expectations" },
          { id: "s5", text: ". Include questions at", isDifferent: false, effect: "" },
          { id: "s6", text: " three depth levels: recall, analysis, and synthesis", isDifferent: true, effect: "Structures cognitive complexity using Bloom's taxonomy" },
          { id: "s7", text: ".", isDifferent: false, effect: "" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Meta-Prompting in Action",
        description: "Practice using AI to critique and improve prompts. Start with a weak prompt, get feedback, then iterate.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Step 1: Submit for Critique",
            prompt: `Here's my prompt: "[YOUR PROMPT HERE]"

Before using this prompt, analyze it:
1. Rate it 1-10 for specificity
2. What constraints are missing?
3. What assumptions does it make about my context?
4. Suggest a revised version.`,
          },
          {
            label: "Step 2: Iterate with Feedback",
            prompt: `Based on your feedback, here's my revised prompt: "[REVISED PROMPT]"

Compare this to my original. What's better? What could still improve?`,
          },
        ],
        iterationTips: [
          "Always ask for a rating—it forces the AI to evaluate systematically.",
          "Request a specific number of improvements (e.g., '3 missing constraints').",
          "Define your success criteria ('classroom-ready', 'appropriate for struggling readers').",
          "Use meta-prompting BEFORE spending time editing output manually.",
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
              Think about a recent AI interaction that produced disappointing output. 
              What meta-prompt could you have used to improve your original prompt before running it?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              This week, before you finalize any AI prompt, add one step: paste your prompt and 
              ask "Rate this 1-10 and suggest 2 improvements." Notice how this changes your first output quality.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to Tier 1:</strong> Meta-prompting works because you're applying 
              the Constraints mental model to the critique itself—constraining what kind of feedback you want.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="meta-prompting-201"
      title="Meta-Prompting: Using AI to Improve Your Prompts"
      sections={sections}
      {...props}
    />
  );
};
