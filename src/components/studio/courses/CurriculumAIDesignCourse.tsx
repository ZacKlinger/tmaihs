import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

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
              "You're planning your next semester-long project. You know AI can help with planning, 
              and you know students can use AI as a thinking tool. But when you zoom out to the full 
              14-week arc, the question becomes: Where does AI actually add value, and where does it 
              get in the way of the learning you're trying to create?"
            </p>
          </div>
          <p>
            <strong>Curriculum AI design</strong> is the meta-level practice of mapping where AI 
            belongs across a project arc—and where it doesn't. Not every moment needs AI. The goal 
            is strategic integration that serves learning.
          </p>
          <p>
            In this micro-course, you'll develop judgment about when, where, and how to integrate 
            AI across your curriculum.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This draws on <ResearchLink term="Stanford HAI" /> principles for human-centered AI: technology 
            should augment human capability, not replace human judgment.
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
          <h2 className="text-xl font-semibold text-foreground">Strategic Integration Mapping</h2>
          <p className="text-lg">
            AI integration should be <strong>learning-driven</strong>, not technology-driven. 
            For each potential integration point, ask: "Does AI help students meet this learning 
            objective better than alternatives?"
          </p>
          
          <h3 className="text-lg font-semibold mt-6">The AI Choreography Framework</h3>
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="text-sm mb-3">Across a semester project, map three types of AI moments:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-24 font-medium text-green-600 dark:text-green-400">PRESENT</span>
                <span>AI actively used—for feedback, challenge, scaffolding. Students interact with AI.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-24 font-medium text-blue-600 dark:text-blue-400">BACKGROUND</span>
                <span>Teacher uses AI to prep materials, but students don't interact directly with AI.</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-24 font-medium text-amber-600 dark:text-amber-400">ABSENT</span>
                <span>AI deliberately excluded—productive struggle, authentic assessment, peer collaboration.</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Integration Decision Framework</h3>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">✅ AI Adds Value When...</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Students need immediate feedback (AI as thinking partner)</li>
                <li>• Challenge strengthens learning (AI as devil's advocate)</li>
                <li>• Scaffolding accelerates skill development (AI as tutor)</li>
                <li>• Iteration improves final product (AI as revision tool)</li>
              </ul>
            </div>
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">❌ AI Undermines Learning When...</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Productive struggle IS the learning (early skill building)</li>
                <li>• Authentic assessment requires unassisted performance</li>
                <li>• Peer collaboration builds community and communication</li>
                <li>• Voice and identity development require human expression</li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The best AI integration often happens at transition points—between 
              drafts, after initial attempts, before peer review—not as the main learning activity. 
              AI is a <ResearchLink term="Scaffolding" /> tool, not a replacement for the learning itself.
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
        question: "Decide where AI integration adds value across this documentary project arc.",
        unitContext: "10th Grade Documentary Project (14 weeks): Students investigate a local community issue, conduct interviews, and produce a 5-minute documentary for public screening.",
        objectives: [
          {
            id: "o1",
            objective: "Weeks 2-3: Students develop interview skills through practice and peer feedback",
            shouldIntegrate: false,
            rationale: "This is foundational skill-building through productive struggle. Peer feedback develops communication skills and community. AI would bypass the learning.",
          },
          {
            id: "o2",
            objective: "Week 5: Students analyze their interview data to identify emerging themes",
            shouldIntegrate: false,
            rationale: "Theme identification IS the intellectual work of this project phase. Students need to grapple with their data themselves to develop analytical skills.",
          },
          {
            id: "o3",
            objective: "Week 8: Students revise their storyboards based on feedback",
            shouldIntegrate: true,
            rationale: "AI as audience simulator can help students identify weaknesses before the final push. Students still do the revision work—AI surfaces issues they might miss.",
          },
          {
            id: "o4",
            objective: "Week 11: Students prepare for Q&A at the public screening",
            shouldIntegrate: true,
            rationale: "AI as skeptical audience member can help students anticipate tough questions. This strengthens preparation without replacing the actual presentation.",
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
        prompt: "14-week documentary project with AI integration:",
        context: "Week 1: AI generates topic ideas. Week 4: AI writes interview questions. Week 8: AI provides storyboard feedback. Week 12: AI prepares students for Q&A. What's missing or problematic?",
        elements: [
          { id: "topic-ownership", label: "Student-driven topic selection (Week 1 has AI generating topics)", isMissing: true, explanation: "Students should identify what matters to THEM. AI-generated topics bypass ownership and authentic inquiry." },
          { id: "interview-skills", label: "Student-crafted interview questions (Week 4 has AI writing questions)", isMissing: true, explanation: "Question design is a core skill. AI-written questions mean students don't learn to ask good questions themselves." },
          { id: "peer-feedback", label: "Peer feedback moments throughout the project", isMissing: true, explanation: "No peer collaboration is mapped. Community and communication skills develop through human interaction, not AI." },
          { id: "productive-struggle", label: "Early weeks with NO AI—space for productive struggle", isMissing: true, explanation: "Every mapped point has AI. Where do students struggle productively? Early skill-building needs friction." },
          { id: "storyboard-feedback", label: "AI-assisted storyboard feedback at Week 8", isMissing: false, explanation: "This is appropriate—revision benefits from additional perspective after students have done the initial work." },
        ],
        minCorrect: 3,
      },
    },
    {
      id: "cfu-3",
      type: "cfu" as const,
      title: "Check 3",
      advancedCfuData: {
        id: "curriculum-ai-cfu-3",
        type: "prompt-compare" as const,
        question: "Which integration approach better preserves productive struggle while leveraging AI value?",
        context: "Week 4 of a documentary project: Students are learning to craft interview questions.",
        options: [
          {
            id: "A",
            prompt: "Have AI generate 10 possible interview questions for each student's topic, then students select the best ones.",
            isCorrect: false,
            annotations: [
              { text: "AI generate", label: "AI does the intellectual work", color: "bg-amber-500/20" },
              { text: "students select", label: "Choosing ≠ Creating", color: "bg-amber-500/20" },
            ],
            explanation: "This outsources the skill we're trying to develop. Students become selectors, not question-crafters. The learning objective is creating questions, not choosing them.",
          },
          {
            id: "B",
            prompt: "Students draft 5 interview questions independently. Then AI role-plays as the interviewee and responds to each question—revealing which questions produce useful answers. Students revise based on what they learn.",
            isCorrect: true,
            annotations: [
              { text: "draft 5 interview questions independently", label: "Students create first", color: "bg-green-500/20" },
              { text: "AI role-plays as the interviewee", label: "AI as simulation, not author", color: "bg-green-500/20" },
              { text: "Students revise based on what they learn", label: "Student retains ownership", color: "bg-green-500/20" },
            ],
            explanation: "Students do the generative work. AI provides feedback through simulation. Students learn from seeing their questions 'answered'—then improve them. The struggle and the learning stay with the student.",
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
        title: "Prompt Workshop: Map Your Project's AI Choreography",
        description: "Create an AI integration map for your semester project.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "AI Choreography Mapper",
            prompt: `Here's my [LENGTH]-week project plan:
[PASTE YOUR PROJECT OUTLINE OR MILESTONE LIST]

For each week/milestone, help me decide:
- PRESENT: Should students interact with AI here? For what purpose?
- BACKGROUND: Should I (teacher) use AI to prep materials without student interaction?
- ABSENT: Should AI be deliberately excluded? Why?

Consider:
1. Where is productive struggle essential?
2. Where would AI feedback strengthen revision?
3. Where is peer collaboration more valuable than AI?
4. Where do students need to develop unassisted skills?

Output a week-by-week integration map with rationale.`,
          },
          {
            label: "Integration Point Audit",
            prompt: `I'm considering using AI at this point in my project:

WEEK: [NUMBER]
LEARNING OBJECTIVE: [WHAT STUDENTS SHOULD LEARN/DO]
PROPOSED AI USE: [HOW I WANT TO USE AI]

Audit this integration:
1. Does AI help students meet this objective, or bypass it?
2. What would students miss if AI does this for them?
3. What's the non-AI alternative? Is it actually worse?
4. If AI should be here, how do I structure it so students remain the thinkers?

Recommend: INTEGRATE, MODIFY, or REMOVE—with specific rationale.`,
          },
        ],
        iterationTips: [
          "Map integration points AFTER designing learning objectives, not before.",
          "Ask: 'If I removed AI from this moment, would learning suffer?' If not, it might not be essential.",
          "Early skill-building often needs NO AI. Later application and revision may benefit from it.",
          "Preserve productive struggle—the moments students find hard are often where learning happens.",
          "Use workflow design (Tier 2) to structure multi-step AI integration within specific checkpoints.",
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
              Think about your next project. Where are students most likely to struggle productively? 
              That's probably where AI should be ABSENT—struggle is where learning happens. 
              Where is struggle unproductive or frustrating? That might be where AI can help.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Transfer Challenge:</p>
            <p className="text-muted-foreground">
              Create a simple AI choreography map for your next project: mark each week/milestone as 
              PRESENT, BACKGROUND, or ABSENT. Share your reasoning with a colleague and get their perspective.
            </p>
          </div>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <p className="text-sm text-green-700 dark:text-green-300">
              <strong>You've completed all three tiers.</strong> You now have the mental models to prompt 
              AI effectively (Tier 1), combine strategies for complex tasks (Tier 2), and design AI-integrated 
              learning with judgment (Tier 3). The real work—applying this in your projects—starts now.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="curriculum-ai-design-301"
      title="Curriculum AI Design: Strategic Integration Across Projects"
      sections={sections}
      {...props}
    />
  );
};
