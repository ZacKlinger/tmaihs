import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";

interface DetectingAIWorkCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
}

export const DetectingAIWorkCourse = (props: DetectingAIWorkCourseProps) => {
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
              "A student submits an essay. It's well-structured, uses sophisticated vocabulary, 
              and makes compelling arguments. But something feels... off. The rhythm is too uniform. 
              The voice doesn't match what you've seen from this student before."
            </p>
          </div>
          <p>
            AI detection software is unreliable—it produces false positives and misses actual AI use. 
            But <strong>pattern recognition</strong> combined with <strong>pedagogical knowledge</strong> 
            gives you a more accurate sense of authenticity.
          </p>
          <p>
            In this micro-course, you'll learn to identify AI-generated student work through linguistic 
            patterns and pedagogical red flags—and design assignments that encourage authentic work.
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
          <h2 className="text-xl font-semibold text-foreground">Two Detection Lenses</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
              <p className="font-medium text-foreground mb-3">🔍 Linguistic Patterns</p>
              <p className="text-sm text-muted-foreground mb-3">AI text has detectable stylistic signatures:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><strong>Uniform rhythm:</strong> Sentences follow predictable length patterns</li>
                <li><strong>Hedge phrases:</strong> "It's important to note," "One might argue"</li>
                <li><strong>Unusual transitions:</strong> "Furthermore," "Moreover" overused</li>
                <li><strong>Perfect structure:</strong> Every paragraph follows the same formula</li>
                <li><strong>Vocabulary jumps:</strong> Suddenly sophisticated word choices</li>
              </ul>
            </div>
            
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="font-medium text-primary mb-3">🎓 Pedagogical Red Flags</p>
              <p className="text-sm text-muted-foreground mb-3">Misalignment with what you know about the student:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><strong>Voice mismatch:</strong> Doesn't sound like their class discussions</li>
                <li><strong>Knowledge gaps:</strong> Uses concepts not covered in class</li>
                <li><strong>Missing errors:</strong> No grammar mistakes when they usually have some</li>
                <li><strong>Generic specifics:</strong> Examples that don't connect to your class content</li>
                <li><strong>Process evidence:</strong> No drafts, no struggle, instant polish</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm">
              <strong>Critical note:</strong> Detection should inform conversation, not accusation. 
              These patterns suggest investigation, not proof. Many students write formally. 
              Some students improve dramatically. Use patterns as starting points for dialogue.
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
        id: "detecting-ai-cfu-1",
        type: "pattern-identifier" as const,
        question: "Classify each sample as likely human-written or AI-generated.",
        description: "Consider linguistic patterns and authenticity markers.",
        samples: [
          {
            id: "s1",
            content: "The Great Gatsby is a book about the American Dream. It's important to note that Fitzgerald uses symbolism throughout the novel. Furthermore, the green light represents hope. Moreover, the eyes of Doctor T.J. Eckleburg symbolize moral decay. In conclusion, symbolism is a key element of this work.",
            isAI: true,
            indicators: ["Uniform paragraph structure", "Overused transitions (Furthermore, Moreover)", "Generic analysis", "Formulaic intro/conclusion"],
            explanation: "Classic AI pattern: hedge phrases, predictable transitions, surface-level analysis that hits expected points without original insight.",
          },
          {
            id: "s2",
            content: "ok so gatsby is lowkey obsessed w/ daisy and the green light thing is kinda creepy when u think about it?? like he just stares at it for years. also nick is unreliable af as a narrator but we're supposed to trust him which is weird",
            isAI: false,
            indicators: ["Informal voice", "Original observation", "Personal reaction", "Authentic punctuation"],
            explanation: "Human markers: casual register, genuine insight (unreliable narrator), emotional reaction, unconventional structure that reflects thinking process.",
          },
          {
            id: "s3",
            content: "Fitzgerald crafts a nuanced critique of the American Dream through his portrayal of Jay Gatsby. The protagonist's relentless pursuit of wealth and status ultimately proves hollow, as evidenced by his inability to recapture the past. This theme resonates with contemporary discussions of materialism and social mobility.",
            isAI: true,
            indicators: ["Perfect structure", "Academic vocabulary", "No personal voice", "Generic contemporary connection"],
            explanation: "AI pattern: technically competent but impersonal, uses expected academic vocabulary, makes vague 'contemporary' connection without specifics.",
          },
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "detecting-ai-cfu-2",
        type: "authenticity-rubric" as const,
        question: "Rate this student submission on authenticity dimensions.",
        studentWork: `The theme of isolation in "Of Mice and Men" is very important. Steinbeck shows how loneliness affects different characters. For example, Crooks is isolated because of racism. Curley's wife is isolated because she is the only woman. George and Lennie are different because they have each other.

It's important to note that the setting contributes to the theme. The ranch is isolated, which mirrors the characters' emotional isolation. Furthermore, the Great Depression made people more isolated as they competed for jobs.

In conclusion, isolation is a central theme that Steinbeck develops through character, setting, and historical context.`,
        dimensions: [
          { id: "voice", name: "Voice Consistency", description: "Does this sound like a real student?", correctRange: [20, 45] as [number, number], explanation: "Mixed signals: informal moments ('very important') alongside formulaic AI phrases ('It's important to note')" },
          { id: "structure", name: "Structural Naturalness", description: "Is the organization authentic?", correctRange: [15, 35] as [number, number], explanation: "Suspiciously perfect 5-paragraph structure with uniform paragraph lengths" },
          { id: "insight", name: "Original Thinking", description: "Are there genuine insights?", correctRange: [30, 55] as [number, number], explanation: "Content is accurate but generic—hits expected points without original analysis" },
          { id: "errors", name: "Natural Imperfection", description: "Are there human-like variations?", correctRange: [10, 30] as [number, number], explanation: "Too clean—no grammar variations, no crossed-out thinking, no rough edges" },
        ],
      },
    },
    {
      id: "cfu-3",
      type: "cfu" as const,
      title: "Check 3",
      advancedCfuData: {
        id: "detecting-ai-cfu-3",
        type: "prompt-compare" as const,
        question: "Which assignment design better encourages authentic student work?",
        context: "You want students to analyze a poem without simply using AI to generate analysis.",
        options: [
          {
            id: "A",
            prompt: "Write a 500-word analysis of the poem's use of imagery and symbolism.",
            isCorrect: false,
            annotations: [
              { text: "500-word analysis", label: "Easy to outsource to AI", color: "bg-amber-500/20" },
              { text: "imagery and symbolism", label: "Generic focus AI handles well", color: "bg-amber-500/20" },
            ],
            explanation: "This is exactly what AI excels at—generic literary analysis at a specified length. No personal connection, no process evidence.",
          },
          {
            id: "B",
            prompt: "Choose one image from the poem that confused or surprised you. In class, you'll share your choice and explain your reaction in a 2-minute talk. Bring notes.",
            isCorrect: true,
            annotations: [
              { text: "confused or surprised you", label: "Requires personal reaction", color: "bg-green-500/20" },
              { text: "In class, you'll share", label: "Oral component deters copying", color: "bg-green-500/20" },
              { text: "2-minute talk", label: "Oral delivery requires understanding", color: "bg-green-500/20" },
            ],
            explanation: "Personal reaction + oral presentation + brief format makes AI assistance less useful and more detectable. Students must own their ideas.",
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
        title: "Prompt Workshop: Designing Authentic Assignments",
        description: "Redesign an existing assignment to encourage authentic work while still meeting learning objectives.",
        toolLinks: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Test Your Assignment",
            prompt: `I'm going to give you a student assignment. Complete it as a student would, using AI assistance.

[PASTE YOUR ASSIGNMENT]

After completing it, tell me: How easy was this to complete with AI? What would make it harder to outsource?`,
          },
          {
            label: "Redesign for Authenticity",
            prompt: `Here's my current assignment: [YOUR ASSIGNMENT]

Redesign it to:
1. Require personal connection or reaction
2. Include process evidence (drafts, annotations, or oral component)
3. Make AI-generated responses detectable or less useful
4. Still meet this learning objective: [YOUR OBJECTIVE]`,
          },
        ],
        iterationTips: [
          "Add an oral component—students must explain their written work verbally.",
          "Require process evidence: annotations, drafts, or in-class components.",
          "Ask for personal reactions, not just analysis ('What surprised you?').",
          "Make assignments specific to your class content that AI wouldn't know.",
          "Use constraints (Tier 1) that AI would struggle with: 'Use only examples from our class discussions.'",
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
              Think about your current assignments. Which ones would be easiest for students 
              to complete with AI? What one change could you make to encourage more authentic work?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Classroom Transfer:</p>
            <p className="text-muted-foreground">
              Pick one upcoming assignment. Add one of these elements: oral explanation, 
              personal reaction requirement, or process evidence. Notice how submissions change.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Remember:</strong> The goal isn't to catch cheaters—it's to design learning 
              experiences where AI assistance is either transparent, productive, or unnecessary.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="detecting-ai-work-301"
      title="Detecting AI Work: Patterns and Pedagogical Design"
      sections={sections}
      {...props}
    />
  );
};
