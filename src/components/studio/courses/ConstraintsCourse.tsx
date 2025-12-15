import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface ConstraintsCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const ConstraintsCourse = (props: ConstraintsCourseProps) => {
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
              "It's your prep period. You need tomorrow's lesson differentiated for three reading levels, 
              checked for clarity, and aligned to your learning objective—all before the bell rings in 45 minutes."
            </p>
          </div>
          <p>
            Sound familiar? This scenario is where AI can genuinely help—but only if you know how to 
            give it the right constraints. Vague requests lead to generic outputs. Specific constraints 
            lead to usable materials.
          </p>
          <p>
            In this micro-course, you'll learn the <strong>Constraints mental model</strong>—the single 
            most powerful technique for getting useful outputs from AI tools.
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
          <h2 className="text-xl font-semibold text-foreground">The Constraints Mental Model</h2>
          <p className="text-lg">
            AI models are trained on vast amounts of text. Without constraints, they default to 
            <strong> average patterns</strong>—the most common way something is typically written.
          </p>
          <p>
            Constraints narrow the possibility space. They tell the AI: "Don't give me everything. 
            Give me <em>this specific thing</em>."
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without Constraints:</p>
              <p className="text-sm">"Write a lesson about photosynthesis"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Generic, grade-agnostic, unfocused output
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Constraints:</p>
              <p className="text-sm">
                "Write a 10-minute mini-lesson on photosynthesis for 7th graders. 
                Include one hands-on demo using materials found in a typical classroom. 
                End with 3 discussion questions."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Specific, usable, grade-appropriate output
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Types of Constraints</h3>
          <ul>
            <li><strong>Format:</strong> bullet points, numbered steps, table, paragraph</li>
            <li><strong>Length:</strong> word count, time duration, number of items</li>
            <li><strong>Audience:</strong> grade level, reading level, prior knowledge</li>
            <li><strong>Purpose:</strong> assess, introduce, review, extend</li>
            <li><strong>Materials:</strong> available resources, technology access</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The more constraints you provide, the more useful the output becomes. 
              You're not limiting the AI—you're focusing it on exactly what you need.
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
        id: "constraints-cfu-1",
        type: "prompt-compare" as const,
        question: "Which prompt is more likely to produce immediately usable classroom materials?",
        context: "Consider what constraints each prompt provides to the AI.",
        options: [
          {
            id: "A",
            prompt: "Create a worksheet about fractions for my math class.",
            isCorrect: false,
            annotations: [
              { text: "worksheet about fractions", label: "Vague topic", color: "bg-amber-500/20" },
              { text: "my math class", label: "No grade level", color: "bg-amber-500/20" },
            ],
            explanation: "This prompt lacks constraints on grade level, specific fraction concepts, length, and format. The AI has to guess at nearly everything.",
          },
          {
            id: "B",
            prompt: "Create a 15-question worksheet on adding fractions with unlike denominators for 5th graders. Include 5 visual models, 5 word problems, and 5 computation problems. Answers should be on a separate page.",
            isCorrect: true,
            annotations: [
              { text: "15-question", label: "Length constraint", color: "bg-green-500/20" },
              { text: "adding fractions with unlike denominators", label: "Specific topic", color: "bg-green-500/20" },
              { text: "5th graders", label: "Grade level", color: "bg-green-500/20" },
              { text: "5 visual models, 5 word problems, and 5 computation", label: "Format structure", color: "bg-green-500/20" },
              { text: "Answers should be on a separate page", label: "Output format", color: "bg-green-500/20" },
            ],
            explanation: "This prompt includes specific constraints: grade level, topic focus, question count, variety of problem types, and format requirements. The AI knows exactly what to produce.",
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
        title: "Prompt Workshop: Applying Constraints",
        description: "Now it's your turn. Use the starter prompts below as templates, then modify them for your actual classroom needs. Open an AI tool and test your prompts.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Differentiated Reading Guide",
            prompt: `Create a reading guide for [ARTICLE/TEXT TITLE] at three reading levels:
- Approaching: 5th grade reading level, with vocabulary support and guided questions
- On-level: 7th grade reading level, with analysis questions
- Advanced: 9th grade reading level, with synthesis and evaluation questions

Each version should be 1 page and include the same core learning objective: [YOUR OBJECTIVE]`,
          },
          {
            label: "Exit Ticket Generator",
            prompt: `Design a 5-minute exit ticket for a lesson on [TOPIC] for [GRADE] students.

Include:
- 2 multiple choice questions checking factual understanding
- 1 short response question requiring application
- 1 self-assessment question ("Rate your confidence from 1-4")

Format for easy grading: all questions on one half-page.`,
          },
        ],
        iterationTips: [
          "If the output is too generic, add more constraints about your specific students or classroom context.",
          "If it's too complex, add a constraint like 'Use vocabulary appropriate for students reading 2 grades below level.'",
          "If format is wrong, be explicit: 'Use a table format with columns for...' or 'Number each step.'",
          "Try adding 'Do not include...' statements to remove unwanted elements.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "constraints-cfu-2",
        type: "identify-missing" as const,
        prompt: "Make a rubric for essays.",
        context: "A teacher wants to create a rubric but gets generic output. What constraints are missing?",
        elements: [
          { id: "essay-type", label: "Essay type (argumentative, narrative, expository)", isMissing: true, explanation: "Different essay types require different criteria" },
          { id: "grade-level", label: "Grade level", isMissing: true, explanation: "Expectations vary significantly by grade" },
          { id: "point-scale", label: "Point scale (4-point, 6-point, etc.)", isMissing: true, explanation: "The rubric structure depends on this" },
          { id: "key-criteria", label: "Specific criteria to evaluate", isMissing: true, explanation: "Thesis, evidence, organization—which matter most?" },
          { id: "ai-tool", label: "Which AI tool to use", isMissing: false, explanation: "This isn't a constraint—any tool can create rubrics with good prompts" },
          { id: "word-count", label: "Student essay word count", isMissing: false, explanation: "While helpful, the rubric itself doesn't depend heavily on this" },
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
          <h2 className="text-xl font-semibold text-foreground">Reflection & Transfer</h2>
          
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium mb-2">Reflection Question:</p>
            <p className="text-muted-foreground">
              Think about a task you regularly do during prep periods. What specific constraints 
              would you need to include in a prompt to get output that's actually usable without 
              significant editing?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              Tomorrow, before you use an AI tool for any task, pause and list at least 4 constraints 
              before you write your prompt. Notice how this changes the quality of your first output.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Remember:</strong> This micro-course was designed to save you time tomorrow, 
              not add effort. The few seconds spent adding constraints will save minutes of editing later.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="constraints-101"
      title="Constraints: The Foundation of Useful Prompts"
      sections={sections}
      {...props}
    />
  );
};
