import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface IterationCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const IterationCourse = (props: IterationCourseProps) => {
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
              "The AI gave you a lesson plan, but it's not quite right. The examples are too advanced. 
              The timing is off. The discussion questions are surface-level. You could rewrite your 
              entire prompt from scratch... or you could have a conversation."
            </p>
          </div>
          <p>
            Most people treat AI as a vending machine: put in a prompt, get an output, done. But AI 
            becomes dramatically more useful when you treat it as a <strong>thinking partner</strong> you 
            can iterate with.
          </p>
          <p>
            In this micro-course, you'll learn the <strong>Iteration mental model</strong>—how to 
            refine AI outputs through follow-up prompts rather than starting over.
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
          <h2 className="text-xl font-semibold text-foreground">The Iteration Mental Model</h2>
          <p className="text-lg">
            AI conversations have memory within a session. Each follow-up prompt builds on what came before. 
            This means you can <strong>steer</strong> outputs rather than hoping to get it perfect on the first try.
          </p>
          
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-6">
            <h3 className="text-lg font-semibold mb-4">The Iteration Loop</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">1</span>
                <span><strong>Initial prompt:</strong> Get a first draft with your key constraints</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">2</span>
                <span><strong>Evaluate:</strong> What's working? What's not?</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">3</span>
                <span><strong>Targeted refinement:</strong> Ask for specific changes, not a complete redo</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">4</span>
                <span><strong>Repeat:</strong> Until the output is usable</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Powerful Iteration Prompts</h3>
          <ul>
            <li><strong>Adjust scope:</strong> "Keep the structure, but simplify the vocabulary for struggling readers"</li>
            <li><strong>Target sections:</strong> "The introduction is good. Rewrite only the discussion questions to require evidence"</li>
            <li><strong>Add elements:</strong> "Add a visual model before step 3"</li>
            <li><strong>Remove elements:</strong> "Remove the extension activity—we won't have time"</li>
            <li><strong>Change perspective:</strong> "Reframe this for students who think they 'hate' writing"</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> It's almost always faster to iterate than to craft a "perfect" 
              initial prompt. Start with 70% right, then refine to 95%.
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
        id: "iteration-cfu-1",
        type: "sequence-order" as const,
        question: "Put these iteration steps in the most effective order",
        description: "A teacher got a lesson plan where the examples are too advanced. What's the best sequence?",
        steps: [
          { id: "a", text: "Ask AI to simplify examples while keeping the structure", correctPosition: 2 },
          { id: "b", text: "Review the output to identify what's working", correctPosition: 1 },
          { id: "c", text: "Request one more alternative example for diverse learners", correctPosition: 4 },
          { id: "d", text: "Check if the simplified version matches your grade level", correctPosition: 3 },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Iterative Refinement",
        description: "Practice the iteration loop. Start with a basic prompt, then use follow-ups to shape the output. Track how many iterations it takes to get something usable.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Initial Prompt",
            prompt: `Create a 20-minute lesson on [TOPIC] for [GRADE] students that includes:
- A hook/opening (2-3 min)
- Direct instruction (7-8 min)  
- Guided practice (5 min)
- Independent check (3-4 min)`,
          },
          {
            label: "Iteration Follow-ups",
            prompt: `After getting the initial output, try these follow-up prompts:

"The hook is too long—make it snappier, under 90 seconds."

"Change the guided practice to partner work instead of whole-class."

"The independent check is too easy. Add one question that requires synthesis."

"Keep everything else, but rewrite the direct instruction assuming students have no background."`,
          },
        ],
        iterationTips: [
          "Be specific about WHAT to change and WHERE. 'Make it better' forces the AI to guess.",
          "Use 'Keep X, change Y' framing to preserve what's working.",
          "If you're iterating more than 4-5 times on the same element, your initial constraints might need rethinking.",
          "Sometimes the best iteration is: 'Give me 3 alternative versions of just the [section].'",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "iteration-cfu-2",
        type: "output-match" as const,
        question: "Match each follow-up prompt to the output it would produce",
        description: "Given an initial lesson plan output, predict what each iteration prompt would change.",
        pairs: [
          {
            promptId: "1",
            prompt: "Keep the structure but simplify vocabulary to 5th grade reading level",
            outputId: "A",
            output: "Same lesson flow with shorter sentences, simpler word choices, and grade-appropriate examples",
            explanation: "This targets vocabulary specifically while preserving the overall structure the teacher liked.",
          },
          {
            promptId: "2", 
            prompt: "The discussion questions are surface-level. Rewrite them to require text evidence",
            outputId: "B",
            output: "Original lesson with new discussion questions like: 'What evidence from paragraph 3 supports...?'",
            explanation: "Targeted refinement of one specific section without affecting the rest of the lesson.",
          },
          {
            promptId: "3",
            prompt: "Add a 2-minute formative check after the direct instruction",
            outputId: "C",
            output: "Same lesson with a new quick-check activity inserted between instruction and guided practice",
            explanation: "Adding elements is a simple iteration—the AI knows exactly where and what to insert.",
          },
        ],
      },
    },
    {
      id: "cfu-3",
      type: "cfu" as const,
      title: "Check 3",
      advancedCfuData: {
        id: "iteration-cfu-3",
        type: "prompt-remix" as const,
        originalPrompt: "Make the examples easier for my students.",
        originalContext: "Teacher has a lesson plan where examples are too advanced.",
        newContext: "Teacher now has a different lesson where the pacing is off—too much content for the time available.",
        constraints: [
          { id: "c1", text: "Make the examples easier", shouldChange: true, reason: "The issue isn't examples, it's pacing/time." },
          { id: "c2", text: "for my students", shouldChange: false, reason: "Still relevant—changes should work for the same students." },
          { id: "c3", text: "Keep the structure", shouldChange: false, reason: "Preserving structure while adjusting scope is still good practice." },
          { id: "c4", text: "Identify what can be cut to fit 30 minutes", shouldChange: true, reason: "This addresses the actual pacing problem." },
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
              Think about the last time you used AI and weren't satisfied with the output. 
              What follow-up prompt could you have used instead of starting over or giving up?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              This week, when AI output isn't quite right, resist the urge to rewrite from scratch. 
              Instead, identify the ONE thing that's most wrong and ask for a targeted fix. 
              Notice how this changes your workflow.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Mindset shift:</strong> Your first prompt isn't a final request—it's the start of a conversation. 
              Plan to iterate. It's faster and produces better results.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="iteration-101"
      title="Iteration: Refining Through Dialogue"
      sections={sections}
      {...props}
    />
  );
};
