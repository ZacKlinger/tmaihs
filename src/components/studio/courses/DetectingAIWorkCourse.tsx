import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface DetectingAIWorkCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
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
              "Students submitted their Week 6 project reflections—journals documenting their research process, 
              struggles, and insights. Most read like authentic student thinking. But a few are... perfect. 
              Smooth transitions, sophisticated vocabulary, no rough edges. Something feels off."
            </p>
          </div>
          <p>
            AI detection software is unreliable — it produces false positives and misses actual AI use.
            But the real question isn't "Did they use AI?" It's "Did they do the thinking?"
          </p>
          <p>
            This course builds the second section of your Classroom AI Policy: <strong>Authenticity
            by Design</strong>. Instead of a detection protocol, you'll write a design philosophy —
            how you structure assignments so genuine work is the easier path. This is what you'd
            share with a parent who asks "How do you handle AI cheating?"
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This approach draws on <ResearchLink text="Productive Failure" /> research (Kapur)—struggle is 
            where learning happens. We want to preserve productive struggle, not eliminate all friction.
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
          <h2 className="text-xl font-semibold text-foreground">Designing for Authenticity</h2>
          <p className="text-lg">
            Instead of detecting AI after the fact, design project checkpoints that make authentic work 
            <strong> easier and more rewarding</strong> than AI shortcuts.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">🎯 Detection Mindset (Reactive)</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Run submissions through detection software</li>
                <li>• Look for "tells" after submission</li>
                <li>• Confrontation-based when suspicious</li>
                <li>• Creates adversarial dynamic</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">🎯 Authenticity Mindset (Proactive)</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Design checkpoints that require genuine process</li>
                <li>• Build in oral components and in-class work</li>
                <li>• Make authentic work the efficient path</li>
                <li>• Creates partnership around learning</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Authenticity Structures for PBL</h3>
          <div className="bg-muted/50 p-4 rounded-lg border border-border/50">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><strong>Process Documentation:</strong> Students capture thinking as it happens (voice memos, photos of work, timestamped notes)</li>
              <li><strong>Iterative Checkpoints:</strong> Multiple drafts with visible evolution—AI produces polished first drafts</li>
              <li><strong>Oral Defense:</strong> Students explain their work verbally—can't explain what they didn't think through</li>
              <li><strong>Local/Personal Connection:</strong> Require specific details from their research, interviews, or community context</li>
              <li><strong>Visible Struggle:</strong> Reflection questions that ask "Where did you get stuck? What changed your thinking?"</li>
            </ul>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> The goal isn't to catch cheaters—it's to design experiences where 
              authentic engagement is the path to success. Make AI shortcuts harder than genuine work.
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
        question: "Classify each project reflection as likely showing authentic process or possible AI generation.",
        description: "Consider what these samples reveal about the student's actual thinking process.",
        samples: [
          {
            id: "s1",
            content: "My research process was highly systematic. I began by identifying key stakeholders, then developed a comprehensive interview protocol. The data analysis revealed several important themes. In conclusion, the project enhanced my understanding of community engagement methodologies.",
            isAI: true,
            indicators: ["Generic process description", "No specific struggles", "Academic jargon", "Conclusions without evidence of journey"],
            explanation: "This reads like a summary of what research SHOULD look like, not what it actually felt like. No specific details, no struggles, no surprises—just a polished process narrative.",
          },
          {
            id: "s2",
            content: "Week 3 was rough. I kept trying to get Ms. Rodriguez to do an interview but she didn't respond to my emails. Finally went to her bakery in person and she said yes but only had 10 minutes. My questions were too long so I had to improvise. Got way better stuff than I expected—she's been in the neighborhood 40 years.",
            isAI: false,
            indicators: ["Specific names and places", "Real obstacles described", "Adaptation/improvisation", "Unexpected outcomes"],
            explanation: "This reflects actual experience—specific struggles, real names, genuine surprises. You can't generate this without having done the work.",
          },
          {
            id: "s3",
            content: "The interview process taught me valuable lessons about community engagement. It's important to be flexible and adapt to interviewees' schedules. Building rapport is essential before asking substantive questions. These skills will serve me well in future research endeavors.",
            isAI: true,
            indicators: ["Generic lessons", "No specific examples", "Future-focused platitudes", "Could apply to any project"],
            explanation: "Abstract lessons without concrete grounding. Compare to the authentic example—this student talks ABOUT interviewing without evidence of having done it.",
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
        question: "Rate this project checkpoint submission on authenticity dimensions.",
        studentWork: `My documentary interview process went well. I interviewed three community members about the neighborhood changes. They shared important perspectives on development in the area.

The interviews taught me that community voices matter in urban planning decisions. Furthermore, it's essential to consider multiple stakeholder perspectives. The residents I spoke with had valuable insights about neighborhood history.

In conclusion, this experience enhanced my understanding of qualitative research methods and community engagement strategies.`,
        dimensions: [
          { id: "specificity", name: "Specificity", description: "Does this include specific names, places, dates, or details from actual research?", correctRange: [10, 30] as [number, number], explanation: "Vague references to 'community members' and 'the neighborhood' without specific details suggest this wasn't written from actual experience" },
          { id: "struggle", name: "Visible Struggle", description: "Does this describe real obstacles, confusion, or changes in thinking?", correctRange: [5, 25] as [number, number], explanation: "Everything 'went well'—no struggles, no surprises, no adaptation. Real research is messier." },
          { id: "voice", name: "Authentic Voice", description: "Does this sound like a student reflecting, or like a formal report?", correctRange: [15, 35] as [number, number], explanation: "'Furthermore,' 'In conclusion,' 'enhanced my understanding'—this reads like generated academic prose, not student reflection." },
          { id: "evolution", name: "Thinking Evolution", description: "Does this show how ideas changed through the process?", correctRange: [10, 30] as [number, number], explanation: "No evidence of thinking that evolved—just conclusions without journey. What surprised them? What changed?" },
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
        question: "Which checkpoint structure better encourages authentic student work in a semester project?",
        context: "Week 8 checkpoint: Students have completed interviews and are synthesizing findings for their documentary.",
        options: [
          {
            id: "A",
            prompt: "Submit a 2-page reflection on your interview process and key findings. Discuss what you learned and how it will shape your documentary.",
            isCorrect: false,
            annotations: [
              { text: "2-page reflection", label: "Easy to generate", color: "bg-amber-500/20" },
              { text: "Discuss what you learned", label: "Vague requirement", color: "bg-amber-500/20" },
            ],
            explanation: "Open-ended reflection with no specificity requirements is the easiest type of assignment to complete with AI. There's no need to have actually done the work.",
          },
          {
            id: "B",
            prompt: "Submit: (1) Audio clips from 2 interviews (2-3 min each) with timestamps for key moments. (2) Your interview notes with annotations showing what surprised you. (3) In class Friday, you'll explain one quote that changed your thinking and answer questions from peers.",
            isCorrect: true,
            annotations: [
              { text: "Audio clips", label: "Process evidence", color: "bg-green-500/20" },
              { text: "timestamps for key moments", label: "Shows engagement", color: "bg-green-500/20" },
              { text: "annotations showing what surprised you", label: "Requires genuine reaction", color: "bg-green-500/20" },
              { text: "explain one quote", label: "Oral accountability", color: "bg-green-500/20" },
            ],
            explanation: "Multiple evidence types (audio, notes, oral defense) require actual work. AI can't produce audio clips, and students must understand their material well enough to explain and defend it.",
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
        title: "Write Your Authenticity by Design Section",
        description: "Draft the second section of your Classroom AI Policy. Audit your PBL unit's checkpoints for authenticity, redesign any that are vulnerable, and write your design principles. This is your answer to 'How do you handle AI in student work?' — not detection, but design.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Authenticity Audit",
            prompt: `Here's my current project checkpoint: [PASTE YOUR CHECKPOINT]

Audit this for authenticity vulnerability:
1. Could a student complete this without doing the actual project work? How?
2. What evidence of PROCESS (not just product) does it require?
3. What makes AI-generated responses obvious or difficult?
4. What oral or in-class component could strengthen authenticity?

Suggest a redesigned version that makes genuine work the easier path.`,
          },
          {
            label: "Process Evidence Builder",
            prompt: `I'm designing Week [X] of a [LENGTH]-week project. Students have just completed [MILESTONE].

Design a checkpoint that requires:
- Evidence of actual process (not reconstructed narrative)
- Specific details only someone who did the work would have
- A component that can't be AI-generated (oral, visual, etc.)
- Reflection on struggle or surprise (not just success)

Keep the checkpoint realistic—students should be able to complete it in [TIME].`,
          },
        ],
        iterationTips: [
          "Add oral components—students explain their work and answer questions.",
          "Require process evidence: photos, audio clips, timestamped notes, visible drafts.",
          "Ask about specific surprises and struggles—AI generates smooth narratives, not messy reality.",
          "Make checkpoints reference specific details from earlier work—AI can't maintain that thread.",
          "Build in peer accountability: students share work and ask each other questions.",
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
            <p className="font-medium mb-2">Policy Section 2: Authenticity by Design</p>
            <p className="text-muted-foreground">
              You now have two sections of your Classroom AI Policy: Evaluation Standards and
              Authenticity by Design. Together they cover how you vet AI content (section 1) and
              how you structure assignments so students do the thinking (section 2). Save your
              design principles and any checkpoint redesigns you produced in the workshop.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Apply It to Your PBL Unit</p>
            <p className="text-muted-foreground">
              Go back to the PBL unit you built in Tier 2. Audit each checkpoint using what
              you learned here. Which ones are vulnerable? Redesign at least one before moving
              on. Your unit should model the design philosophy you just wrote into your policy.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Add to your Constitution:</strong> Your authenticity design principles belong
              there too. Something like: "My checkpoints require process evidence, oral components,
              and specificity that can only come from doing the work."
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="detecting-ai-work-301"
      title="Designing for Authenticity: Beyond AI Detection"
      sections={sections}
      {...props}
    />
  );
};
