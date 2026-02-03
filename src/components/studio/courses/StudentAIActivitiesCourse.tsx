import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface StudentAIActivitiesCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
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
              "Your students are in Week 8 of their documentary project. They've done interviews, collected data, 
              and drafted storyboards. Now they need feedback before the final production push—but you have 30 students 
              and can't give each one detailed critique. What if AI could serve as a thinking partner that strengthens 
              their work without doing it for them?"
            </p>
          </div>
          <p>
            Students will use AI whether you design for it or not. The question is: <strong>Will they use it 
            as a thinking tool or an answer machine?</strong> The activity structure determines the outcome.
          </p>
          <p>
            In this micro-course, you'll learn to design student-facing AI activities where AI amplifies 
            thinking rather than replacing it.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This approach draws on the <ResearchLink text="ICAP Framework" /> (Chi & Wylie)—designing for 
            Interactive and Constructive engagement, not Passive consumption.
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
          <h2 className="text-xl font-semibold text-foreground">AI as Thinking Tool, Not Answer Machine</h2>
          <p className="text-lg">
            The difference between productive and unproductive student AI use comes down to 
            <strong> who is doing the thinking</strong>.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">❌ AI as Answer Machine</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>"Write my project reflection"</li>
                <li>"What should my documentary be about?"</li>
                <li>"Summarize these interviews for me"</li>
              </ul>
              <p className="text-xs mt-2 italic">Student outsources thinking entirely</p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">✅ AI as Thinking Tool</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>"Here's my thesis. Argue against it."</li>
                <li>"I think my documentary should focus on X. What am I missing?"</li>
                <li>"Quiz me on what I learned from these interviews"</li>
              </ul>
              <p className="text-xs mt-2 italic">Student drives, AI responds</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">The PACE Framework for Student AI Activities</h3>
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <div className="space-y-2">
              <p><strong>P</strong>urpose first: Student must do something BEFORE AI (draft, attempt, hypothesize)</p>
              <p><strong>A</strong>I as responder: AI reacts to student input, not the reverse</p>
              <p><strong>C</strong>ritical layer: Student must evaluate, question, or build on AI response</p>
              <p><strong>E</strong>vidence of thinking: Require documentation of the student's intellectual work</p>
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The same tool produces opposite outcomes depending on activity design. 
              Your structure determines whether AI helps or harms learning.
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
        question: "Order these steps for a productive AI-assisted critique activity in a documentary project.",
        description: "Apply the PACE framework: Purpose first, AI as responder, Critical layer, Evidence.",
        steps: [
          { id: "draft", text: "Student completes their documentary storyboard draft independently", correctPosition: 1 },
          { id: "identify", text: "Student identifies their weakest section and why they think it's weak", correctPosition: 2 },
          { id: "ai-critique", text: "Student asks AI: 'Critique this section from the perspective of my target audience'", correctPosition: 3 },
          { id: "evaluate", text: "Student evaluates AI's critique: What's useful? What does AI misunderstand?", correctPosition: 4 },
          { id: "revise", text: "Student revises storyboard, documenting which feedback they used and why", correctPosition: 5 },
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
        scenario: "Students will use AI to get feedback on their documentary scripts before final production (Week 10 of 14-week project).",
        learningObjective: "Students can revise their scripts based on feedback to strengthen narrative coherence and audience impact.",
        guardrails: [
          { id: "g1", name: "Draft First", description: "Students must complete a full script draft before any AI interaction", isAppropriate: true, tradeoff: "Ensures students have genuine work for AI to respond to—AI strengthens their thinking, not replaces it" },
          { id: "g2", name: "Specific Asks Only", description: "Students must ask about specific sections/issues, not 'make this better'", isAppropriate: true, tradeoff: "Keeps students in the driver's seat; they identify problems, AI helps solve them" },
          { id: "g3", name: "Unlimited Revision Cycles", description: "Students can iterate with AI as many times as they want until satisfied", isAppropriate: false, tradeoff: "Risk: becomes trial-and-error with AI rather than genuine understanding. Limit to 2-3 focused interactions." },
          { id: "g4", name: "Revision Annotation", description: "Students must annotate their script showing what AI suggested vs. what they kept/changed", isAppropriate: true, tradeoff: "Creates evidence of critical evaluation; shows student judgment, not just AI following" },
          { id: "g5", name: "AI Rewrites Script", description: "AI provides improved version that students can adopt directly", isAppropriate: false, tradeoff: "This IS the answer machine pattern—students learn nothing about revision" },
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
        originalPrompt: "You are an expert documentary filmmaker. Help me make my script better.",
        originalContext: "A student using AI to improve their documentary script",
        newContext: "Redesign this so the student remains the thinker and AI serves as a thinking tool",
        constraints: [
          { id: "c1", text: "You are an expert documentary filmmaker", shouldChange: true, reason: "For students, AI should be a questioner or audience member, not an expert who fixes things" },
          { id: "c2", text: "Help me make my script better", shouldChange: true, reason: "Too open—invites AI to do the work. Student should identify the specific issue first." },
          { id: "c3", text: "documentary script", shouldChange: false, reason: "The subject stays the same—it's the interaction pattern that changes" },
          { id: "c4", text: "Ask questions that reveal weaknesses", shouldChange: false, reason: "This reframe works—AI surfaces issues through questions, student figures out solutions" },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Prompt Workshop: Design Student AI Activities",
        description: "Create AI activities for specific moments in your project where AI can strengthen student thinking.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Devil's Advocate Protocol (for argument/proposal projects)",
            prompt: `[STUDENT INSTRUCTIONS - Week X of Project]

STEP 1: Write your main argument/thesis/proposal first. Don't use AI yet.

STEP 2: Share your argument with AI using this prompt:
"I'm arguing that [YOUR THESIS]. You are a skeptical audience member who wants to support me but has doubts. Ask me the 3 toughest questions you'd want answered before agreeing with me."

STEP 3: Answer each question IN YOUR OWN WORDS. Don't ask AI to answer them.

STEP 4: Revise your argument to address the strongest objection.

TURN IN: Original thesis, AI's questions, your answers, revised thesis with annotation showing what changed and why.`,
          },
          {
            label: "Audience Simulator (for presentation/documentary projects)",
            prompt: `[STUDENT INSTRUCTIONS - Week X of Project]

STEP 1: Complete your [storyboard/script/outline] draft. This is YOUR work.

STEP 2: Share your draft with AI using this prompt:
"You are [TARGET AUDIENCE: e.g., 'a community member who doesn't know much about this issue' or 'a city council member deciding on funding']. Read my [script/storyboard] and tell me: (1) What's confusing? (2) What's not convincing? (3) What would make you care more about this issue?"

STEP 3: Review AI's feedback. For each point, decide: Is this valid for MY actual audience?

STEP 4: Make targeted revisions. Document what you changed and what you kept.

TURN IN: Draft, AI feedback, your evaluation of feedback, revised version with annotations.`,
          },
        ],
        iterationTips: [
          "Always require student work BEFORE AI interaction—PACE: Purpose first",
          "Frame AI as questioner, challenger, or audience—not answer provider",
          "Require evidence of student judgment: 'What did you keep? What did you reject? Why?'",
          "Build in a critical layer: students must evaluate, not just accept, AI responses",
          "Make AI's limitations visible: ask students to identify where AI misunderstood their context",
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
            <p className="font-medium mb-2">Metacognitive Check:</p>
            <p className="text-muted-foreground">
              Think about a skill you want students to develop in your project. How could AI interaction 
              actually strengthen that skill rather than bypass it? What would the activity structure look like?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Transfer Challenge:</p>
            <p className="text-muted-foreground">
              Design one student AI activity using the PACE framework. Test it with a small group first 
              and observe: Are students doing the thinking, or outsourcing it? Revise based on what you see.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Connection to earlier tiers:</strong> You're now applying constraints and role assignment 
              not to your own prompts, but to the prompts you give students. The same principles transfer—you're 
              just designing for a different user.
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
