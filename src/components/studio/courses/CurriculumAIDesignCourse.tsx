import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface CurriculumAIDesignCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const CurriculumAIDesignCourse = (props: CurriculumAIDesignCourseProps) => {
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
              "Beyond individual activities—how does AI fit into your course as a whole? 
              When does it add value? When does it get in the way of learning? 
              These are curriculum design questions, not just activity design questions."
            </p>
          </div>
          <p>
            <strong>Curriculum AI design</strong> is the meta-level practice of deciding where AI 
            integration makes sense across a unit or course—and where it doesn't. Not every lesson 
            needs AI. The goal is strategic integration that serves learning objectives.
          </p>
          <p>
            In this micro-course, you'll develop judgment about when, where, and how to integrate 
            AI across your curriculum.
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
          <h2 className="text-xl font-semibold text-foreground">Strategic Integration Points</h2>
          <p className="text-lg">
            AI integration should be <strong>purpose-driven</strong>, not technology-driven. 
            Ask: "Does AI help students meet this learning objective better than alternatives?"
          </p>
          
          <h3 className="text-lg font-semibold mt-6">When AI Integration Adds Value</h3>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">✅ High-Value Integration</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Personalized practice and feedback</li>
                <li>• Challenging student thinking (debate partner)</li>
                <li>• Generating examples for analysis</li>
                <li>• Scaffolding complex tasks</li>
                <li>• Supporting revision processes</li>
              </ul>
            </div>
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">❌ Low-Value or Harmful Integration</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Replacing foundational skill practice</li>
                <li>• Bypassing productive struggle</li>
                <li>• Substituting for peer collaboration</li>
                <li>• Generating content students should create</li>
                <li>• Adding technology for its own sake</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold">The Integration Decision Framework</h3>
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
            <p className="text-sm mb-3">For each learning objective, ask:</p>
            <ol className="text-sm text-muted-foreground space-y-2">
              <li><strong>1. What's the learning goal?</strong> Skill acquisition? Knowledge application? Creative expression?</li>
              <li><strong>2. Where is the cognitive work?</strong> Is the thinking in what AI does, or what students do with AI?</li>
              <li><strong>3. What's the alternative?</strong> Would peer feedback, teacher instruction, or independent practice work as well or better?</li>
              <li><strong>4. What are the risks?</strong> Could AI shortcut the learning or create dependency?</li>
            </ol>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The best AI integration often happens at transition points—between 
              drafts, after initial attempts, before peer review—not as the main learning activity.
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
        id: "curriculum-ai-cfu-1",
        type: "integration-mapper" as const,
        question: "Decide where AI integration adds value in this unit.",
        unitContext: "10th Grade English: Persuasive Writing Unit (3 weeks). Students learn to construct arguments, use evidence, and address counterarguments.",
        objectives: [
          {
            id: "o1",
            objective: "Students can identify and analyze persuasive techniques in mentor texts",
            shouldIntegrate: false,
            rationale: "This is foundational skill-building. Students need to do the analysis themselves to develop the skill. AI-generated analysis would bypass the learning.",
          },
          {
            id: "o2",
            objective: "Students can brainstorm potential arguments for their chosen topic",
            shouldIntegrate: false,
            rationale: "Brainstorming is where student voice and creativity emerge. AI-assisted brainstorming risks homogenizing student ideas and bypassing ownership.",
          },
          {
            id: "o3",
            objective: "Students can anticipate and address counterarguments",
            shouldIntegrate: true,
            rationale: "AI excels as a devil's advocate. After students draft arguments, AI can generate counterarguments for them to address—keeping student as thinker.",
          },
          {
            id: "o4",
            objective: "Students can revise for clarity and persuasive impact",
            shouldIntegrate: true,
            rationale: "AI feedback on specific aspects (unclear sentences, weak transitions) can support revision without replacing student judgment about what to change.",
          },
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "curriculum-ai-cfu-2",
        type: "identify-missing" as const,
        prompt: "Unit plan with AI integration points:",
        context: "Week 1: AI generates example essays for analysis. Week 2: Students write with AI assistance. Week 3: AI grades final drafts. What's missing?",
        elements: [
          { id: "student-analysis", label: "Students analyze texts themselves before seeing AI analysis", isMissing: true, explanation: "Foundational skills require student practice, not AI demonstration" },
          { id: "draft-first", label: "Students complete drafts before AI assistance", isMissing: true, explanation: "AI should respond to student work, not generate it" },
          { id: "human-feedback", label: "Peer or teacher feedback alongside AI feedback", isMissing: true, explanation: "Human judgment and relationship matter in writing development" },
          { id: "ai-examples", label: "AI-generated examples for analysis", isMissing: false, explanation: "This is already in Week 1" },
          { id: "ai-grading", label: "AI assessment of final work", isMissing: false, explanation: "This is already in Week 3 (though its pedagogical value is questionable)" },
        ],
        minCorrect: 2,
      },
    },
    {
      id: "cfu-3",
      type: "cfu" as const,
      title: "Check 3",
      advancedCfuData: {
        id: "curriculum-ai-cfu-3",
        type: "prompt-compare" as const,
        question: "Which integration approach better preserves student agency?",
        context: "Students are learning to write research questions for a history project.",
        options: [
          {
            id: "A",
            prompt: "Use AI to generate 10 possible research questions, then have students pick one.",
            isCorrect: false,
            annotations: [
              { text: "AI to generate", label: "AI does the thinking", color: "bg-amber-500/20" },
              { text: "students pick one", label: "Choosing ≠ Creating", color: "bg-amber-500/20" },
            ],
            explanation: "This outsources the intellectual work of question formation. Students become selectors, not creators. The skill is generating questions, not choosing them.",
          },
          {
            id: "B",
            prompt: "Have students draft 3 questions, then use AI to identify which is most researchable and why. Students revise based on feedback.",
            isCorrect: true,
            annotations: [
              { text: "students draft 3 questions", label: "Student creates first", color: "bg-green-500/20" },
              { text: "AI to identify", label: "AI responds to student work", color: "bg-green-500/20" },
              { text: "Students revise", label: "Student maintains ownership", color: "bg-green-500/20" },
            ],
            explanation: "Students do the generative thinking. AI provides feedback on their ideas, not ideas for them. The learning objective (formulating research questions) stays with the student.",
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
        title: "Prompt Workshop: Map Your Unit",
        description: "Apply the integration framework to a unit you're currently teaching or planning.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Unit Integration Audit",
            prompt: `Here are my learning objectives for an upcoming unit:
[LIST YOUR OBJECTIVES]

For each objective, help me decide:
1. Should AI be integrated? Why or why not?
2. If yes, at what point in the learning sequence?
3. What's the risk if AI integration goes wrong?
4. What alternative (non-AI) approach would also work?`,
          },
          {
            label: "Integration Point Design",
            prompt: `I've decided to integrate AI at this point in my unit: [DESCRIBE THE POINT]

The learning objective is: [YOUR OBJECTIVE]

Design the integration so that:
- Students do intellectual work before AI interaction
- AI responds to student thinking, not the reverse
- Students must evaluate or build on AI response
- There's evidence of student thinking in the final product`,
          },
        ],
        iterationTips: [
          "Map integration points AFTER designing learning objectives, not before.",
          "Ask: 'If I removed AI from this activity, would learning suffer?' If not, it's probably not essential.",
          "Consider the full unit arc—early skill-building often needs NO AI; later application may benefit from it.",
          "Use workflow design (Tier 2) to structure multi-step AI integration across a unit.",
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
              Think about your next unit. Where are students most likely to struggle productively? 
              That's probably where AI should NOT be—struggle is where learning happens. 
              Where is struggle unproductive? That might be where AI can help.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              Commit to one curriculum change: either adding AI at a strategic point where it 
              will enhance learning, OR removing AI from a point where it's bypassing learning.
            </p>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>You've completed all three tiers.</strong> You now have the mental models to use AI 
              as a thinking partner (Tier 1), combine strategies for complex tasks (Tier 2), and design 
              AI-integrated learning experiences with judgment (Tier 3). The real work—applying this in 
              your classroom—is where it all comes together.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="curriculum-ai-design-301"
      title="Curriculum AI Design: Strategic Integration"
      sections={sections}
      {...props}
    />
  );
};
