import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface StudentAIActivitiesCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const StudentAIActivitiesCourse = (props: StudentAIActivitiesCourseProps) => {
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
              "Students will use AI whether you design for it or not. But there's a difference 
              between students using AI to avoid thinking and students using AI as a thinking tool. 
              What if you could design the activity that shapes which one happens?"
            </p>
          </div>
          <p>
            <strong>Student AI activities</strong> are structured interactions where AI becomes a 
            learning tool rather than an answer machine. The key is scaffolding that keeps students 
            in the driver's seat.
          </p>
          <p>
            In this micro-course, you'll learn to design activities where AI amplifies student 
            thinking rather than replacing it.
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
          <h2 className="text-xl font-semibold text-foreground">AI as Thinking Tool, Not Answer Machine</h2>
          <p className="text-lg">
            The difference between productive and unproductive student AI use comes down to 
            <strong> who is doing the thinking</strong>.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">❌ AI as Answer Machine</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>"Write my essay about..."</li>
                <li>"Solve this math problem"</li>
                <li>"Explain photosynthesis"</li>
              </ul>
              <p className="text-xs mt-2 italic">Student outsources thinking entirely</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">✅ AI as Thinking Tool</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>"Here's my thesis. Argue against it."</li>
                <li>"I got 47. Is my approach correct?"</li>
                <li>"Quiz me on what I just learned"</li>
              </ul>
              <p className="text-xs mt-2 italic">Student drives, AI supports</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Activity Design Framework: PACE</h3>
          <div className="space-y-2">
            <p><strong>P</strong>urpose first: Student must do something BEFORE AI (brainstorm, attempt, hypothesize)</p>
            <p><strong>A</strong>I as responder: AI reacts to student input, not the reverse</p>
            <p><strong>C</strong>ritical layer: Student must evaluate, question, or build on AI response</p>
            <p><strong>E</strong>vidence of thinking: Require documentation of the student's intellectual work</p>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The activity structure determines whether AI helps or harms learning. 
              Same tool, different design, opposite outcomes.
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
        id: "student-ai-cfu-1",
        type: "sequence-order" as const,
        question: "Order these steps for a productive AI-assisted writing activity.",
        description: "Apply the PACE framework: Purpose first, AI as responder, Critical layer, Evidence.",
        steps: [
          { id: "brainstorm", text: "Student brainstorms and selects their own thesis", correctPosition: 1 },
          { id: "outline", text: "Student creates rough outline with key arguments", correctPosition: 2 },
          { id: "ai-counter", text: "Student asks AI: 'Argue against my thesis'", correctPosition: 3 },
          { id: "strengthen", text: "Student revises to address AI's counterarguments", correctPosition: 4 },
          { id: "annotate", text: "Student annotates final draft showing what they changed and why", correctPosition: 5 },
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "student-ai-cfu-2",
        type: "guardrail-designer" as const,
        question: "Select appropriate guardrails for this student AI activity.",
        scenario: "Students will use AI to get feedback on their science lab reports before submission.",
        learningObjective: "Students can identify and correct errors in scientific reasoning and data interpretation.",
        guardrails: [
          { id: "g1", name: "Attempt First", description: "Students must complete a full draft before any AI interaction", isAppropriate: true, tradeoff: "Ensures students have genuine work for AI to respond to, not AI-generated content to submit" },
          { id: "g2", name: "Question-Only Mode", description: "AI can only ask clarifying questions, not provide corrections", isAppropriate: true, tradeoff: "Keeps intellectual work with student; they must figure out what's wrong themselves" },
          { id: "g3", name: "Unlimited Revision", description: "Students can iterate with AI as many times as they want", isAppropriate: false, tradeoff: "Risk: becomes trial-and-error with AI rather than genuine understanding" },
          { id: "g4", name: "Reflection Log", description: "Students must document what AI feedback they received and what they changed", isAppropriate: true, tradeoff: "Creates evidence of thinking; makes copy-paste obvious" },
          { id: "g5", name: "AI Writes Corrections", description: "AI provides corrected versions that students can adopt", isAppropriate: false, tradeoff: "This IS the answer machine pattern—students learn nothing" },
        ],
      },
    },
    {
      id: "cfu-3",
      type: "cfu" as const,
      title: "Check 3",
      advancedCfuData: {
        id: "student-ai-cfu-3",
        type: "prompt-remix" as const,
        originalPrompt: "You are an expert tutor. Explain the causes of the French Revolution clearly and comprehensively.",
        originalContext: "Teacher prompt for generating content",
        newContext: "Student-facing AI activity where student must do the thinking",
        constraints: [
          { id: "c1", text: "You are an expert tutor", shouldChange: true, reason: "For student use, AI should be a questioner or challenger, not an expert who provides answers" },
          { id: "c2", text: "Explain the causes", shouldChange: true, reason: "Student should explain first; AI should respond to their understanding" },
          { id: "c3", text: "clearly and comprehensively", shouldChange: true, reason: "Comprehensive answers bypass student thinking; AI should reveal gaps, not fill them" },
          { id: "c4", text: "French Revolution", shouldChange: false, reason: "Topic stays the same—it's the interaction pattern that changes" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Design a Student AI Activity",
        description: "Create an AI activity for students that keeps them in the thinking seat.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Devil's Advocate Activity",
            prompt: `[STUDENT INSTRUCTIONS]

1. Write your thesis/argument/hypothesis first (before using AI)
2. Then paste your thesis and ask: "Argue against this position with 3 specific counterarguments."
3. Read the counterarguments carefully.
4. Revise your original work to address at least 2 of them.
5. Turn in: Original thesis, AI counterarguments, revised thesis with annotations showing changes.`,
          },
          {
            label: "Socratic Questioner Activity",
            prompt: `[STUDENT INSTRUCTIONS]

1. Read/study the material on your own first.
2. Write a 2-3 sentence explanation of the main concept.
3. Ask AI: "I think [your explanation]. Ask me 5 questions that would reveal if I truly understand this."
4. Answer AI's questions WITHOUT looking up answers.
5. Turn in: Your initial explanation, AI's questions, your answers, and a reflection on what you learned.`,
          },
        ],
        iterationTips: [
          "Always require student work BEFORE AI interaction (PACE: Purpose first).",
          "Frame AI as questioner, challenger, or feedback-giver—not answer provider.",
          "Require evidence of the student's thinking process, not just final product.",
          "Build in a critical layer: students must evaluate, not just accept, AI responses.",
          "Use role assignment (Tier 1) to shape AI behavior for students.",
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
              Think about a skill you want students to develop. How could AI interaction actually 
              strengthen that skill rather than bypass it?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              Design one AI activity using the PACE framework. Test it with a small group first 
              and observe: Are students doing the thinking, or outsourcing it?
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to earlier tiers:</strong> You're now applying constraints and role 
              assignment not to your own prompts, but to the prompts you give students.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="student-ai-activities-301"
      title="Student AI Activities: Designing for Productive Use"
      sections={sections}
      {...props}
    />
  );
};
