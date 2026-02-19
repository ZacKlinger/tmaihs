import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface EvaluatingOutputCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const EvaluatingOutputCourse = (props: EvaluatingOutputCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Grade That Almost Wasn't Yours</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You finished your PBL unit. Sixteen weeks of hydroponics, community fridge donations, student presentations to real stakeholders. You're proud of it. And you want to know: is it actually good? Not "does it feel right" good — is it rigorous? Does it hold up against what the research says quality PBL looks like?
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              So you paste your unit into Claude and ask it to evaluate against ICAP, culturally sustaining pedagogy, and UDL. The response comes back glowing. "Strong alignment with constructive and interactive engagement." "Authentic cultural connections through the community fridge partnership." "Multiple means of representation through hands-on lab work." It reads like a letter of recommendation you wrote for yourself.
            </p>
          </div>
          <p>
            Here's the question that separates a useful evaluation from a flattering one: did the AI tell you what's actually strong, or did it just find language to praise what was already there?
          </p>
          <p>
            There's a version of this work where AI evaluates your unit, generates your rubrics, and grades the output — and you become a bystander in your own professional judgment. There's another version where AI surfaces patterns you missed, stress-tests your rubric against edge cases, and hands the decision back to you with better information than you started with. Same tool. Entirely different relationship to your own expertise.
          </p>
          <p>
            That distinction — between AI-assisted evaluation and AI-delegated evaluation — is what this course is about. It's also, if you look closely enough, what the entire profession is negotiating right now.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="ICAP Framework" /> (Chi & Wylie) classifies student engagement into four modes: Interactive, Constructive, Active, Passive. The framework applies to your evaluation process too — are you interacting with AI's critique, or passively receiving it?
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
          <h2 className="text-xl font-semibold text-foreground">Assisted vs. Delegated</h2>
          <p className="text-lg">
            A chef tastes the sauce and adjusts the seasoning. A line cook follows the recipe exactly. Both produce food. Only one is cooking.
          </p>
          <p>
            When you ask AI to evaluate your work, you're standing at the same fork. The question isn't whether to use AI in evaluation — you should, it's genuinely useful — but whether you remain the person making the judgment call.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">AI-Delegated Evaluation:</p>
              <p className="text-sm">"Evaluate my PBL unit against ICAP, CSP, and UDL. Rate each dimension on a 4-point scale and give me an overall score."</p>
              <p className="text-xs text-muted-foreground mt-2">
                You receive a score. You didn't interrogate the criteria. You didn't push back on the rating. You didn't ask what AI couldn't see. The number feels authoritative, but it's a mirror reflecting your prompt back at you.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">AI-Assisted Evaluation:</p>
              <p className="text-sm">
                "Analyze my PBL unit against ICAP. For each engagement mode, show me specific evidence from my unit — what's there and what's missing. Then tell me: where is a student most likely to slip from constructive into passive engagement, and why?"
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                You receive analysis. You evaluate whether AI's reading of your unit matches your experience. You notice it missed the way your SDC students engage differently during lab work. You adjust. The judgment is yours.
              </p>
            </div>
          </div>

          <p>This same principle applies to rubric design. A rubric generated whole-cloth by AI is a rubric you don't fully own. A rubric you drafted, then stress-tested with AI against edge cases — what happens when a student nails the science but can't present? what if the community partner doesn't show up? — that rubric has your fingerprints on it. You know why every row is there.</p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Evaluation as a Skill, Not a Task</p>
                <p className="text-muted-foreground">Grading well is one of the hardest things teachers do. It requires holding a standard in one hand and a student's reality in the other. AI can help you see patterns in your rubric — inconsistencies, missing dimensions, unclear descriptors. What it cannot do is weigh whether Marcus's growth from Week 3 to Week 14 matters more than his final presentation score. That's judgment. That's the job.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Three Evaluation Lenses for Your Unit</p>
                <p className="text-muted-foreground">
                  <strong><ResearchLink text="ICAP Framework" />:</strong> Are students interacting and constructing knowledge, or passively receiving it? Where in your unit does engagement risk slipping downward?
                </p>
                <p className="text-muted-foreground mt-1">
                  <strong><ResearchLink text="Culturally Sustaining Pedagogy" />:</strong> Does the unit sustain students' cultural practices and ways of knowing, or just acknowledge them in passing? Is the community fridge project driven by student identity, or layered on top?
                </p>
                <p className="text-muted-foreground mt-1">
                  <strong>Universal Design for Learning:</strong> Are there multiple means of engagement, representation, and expression? Not as a compliance checklist — as a question about who can actually access the learning.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <p className="text-sm">
              <strong>The test:</strong> After AI evaluates your unit, can you explain — to a colleague, to your principal, to yourself — exactly where you agree with the evaluation and where you don't? If you can't articulate the disagreement, you've delegated. If you can, you've been assisted.
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
        id: "evaluating-output-cfu-1",
        type: "prompt-compare" as const,
        question: "Which approach to evaluating a PBL unit keeps the teacher in the professional judgment seat?",
        context: "You've completed a 16-week hydroponics PBL unit and want to evaluate it against research-backed criteria before teaching it again next year. You have your Constitution, your full unit plan, and your rubrics ready to paste into an AI tool.",
        options: [
          {
            id: "A",
            prompt: "Here's my complete PBL unit. Evaluate it against ICAP, culturally sustaining pedagogy, and UDL. Score each framework on a 1-5 scale. Identify strengths and weaknesses. Give me an overall quality rating and a list of recommended changes ranked by priority.",
            isCorrect: false,
            annotations: [
              { text: "Score each framework on a 1-5 scale", label: "Delegating the judgment", color: "bg-amber-500/20" },
              { text: "Give me an overall quality rating", label: "Who decided the criteria weights?", color: "bg-amber-500/20" },
              { text: "ranked by priority", label: "AI decides what matters most", color: "bg-amber-500/20" },
            ],
            explanation: "This prompt asks AI to do the evaluating, the scoring, and the prioritizing. You get a report card for your unit — but you never engaged with the criteria yourself. The score feels precise, but AI doesn't know which students struggled at Week 9, or why you chose that community partner, or what 'proficient' actually looks like in your room. The number is confident and hollow.",
          },
          {
            id: "B",
            prompt: "Here's my PBL unit. Analyze it through the ICAP lens: for each phase, identify what engagement mode students are most likely operating in and show me the specific evidence from my plan. Flag any phase where students might slip from constructive to passive engagement — and explain why that transition would happen. Then I'll tell you which flags match my classroom experience and which ones miss context you don't have.",
            isCorrect: true,
            annotations: [
              { text: "identify what engagement mode students are most likely operating in", label: "Analysis, not scoring", color: "bg-green-500/20" },
              { text: "show me the specific evidence from my plan", label: "Grounded in your actual unit", color: "bg-green-500/20" },
              { text: "explain why that transition would happen", label: "Reasoning you can evaluate", color: "bg-green-500/20" },
              { text: "Then I'll tell you which flags match", label: "Teacher retains judgment", color: "bg-green-500/20" },
            ],
            explanation: "This prompt asks AI to analyze, not judge. It surfaces specific evidence and reasoning you can evaluate against your own experience. The last line is the key — you're telling AI upfront that its analysis will be filtered through your professional knowledge. That's assistance, not delegation.",
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
        title: "Rubric Stress-Test",
        description: "Upload your PBL unit (or a section of it) along with your Constitution. Ask AI to evaluate it against a research-backed framework — then critique the critique. Where was it useful? Where was it blind to what matters most in your specific classroom? The goal isn't a score. The goal is to see your own work more clearly.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Evaluate Your PBL Unit",
            prompt: `[PASTE YOUR CONSTITUTION]

---

[PASTE YOUR PBL UNIT OR A KEY SECTION]

---

Evaluate this unit through three lenses, one at a time. For each lens, show me specific evidence from my unit — not general praise, not abstract critique. Point to particular phases, activities, or assessments.

LENS 1 — ICAP (Chi & Wylie): For each major phase, what engagement mode are students most likely in? Where might they slip from constructive/interactive to active/passive? What in my design causes that slip?

LENS 2 — Culturally Sustaining Pedagogy (Paris & Alim): Where does this unit sustain students' cultural practices and community knowledge? Where does it treat culture as decoration rather than foundation? Be specific about which activities and why.

LENS 3 — UDL: Where are there multiple means of engagement, representation, and expression? Where is there only one path, and who gets left out?

After each lens, pause. I'll tell you what you got right and what you're missing about my students and my context.`,
          },
          {
            label: "Stress-Test a Rubric",
            prompt: `[PASTE YOUR CONSTITUTION]

---

[PASTE YOUR RUBRIC]

---

Stress-test this rubric by running edge cases through it:

1. A student who demonstrates strong content knowledge but struggles to present — where does the rubric place them? Is that placement fair given the learning objectives?

2. A student who relied heavily on AI for their written analysis but shows genuine understanding in their lab work and team discussions — how does the rubric handle that?

3. A student who started weak but showed dramatic growth from Week 4 to Week 14 — does the rubric capture that trajectory, or only the endpoint?

4. The community partner doesn't show up for presentation day — which rubric criteria break?

For each edge case: what score would this student get, and does that score feel right? If not, what's the rubric missing?`,
          },
        ],
        iterationTips: [
          "When AI praises your unit, push back: 'What specific evidence from my plan supports that claim? If you can't point to a particular activity or assessment, withdraw the praise.'",
          "After AI critiques a section, ask yourself: does this critique land because AI sees something I missed, or does it miss something I know about my students?",
          "Run your rubric against a real student in your memory — someone specific, with a name. Does the rubric capture what you know about their learning?",
          "If AI's evaluation and your gut disagree, that disagreement is the most useful data in the conversation. Stay with it.",
        ],
      },
    },
    {
      id: "reflection",
      type: "reflection" as const,
      title: "Reflection",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Professional in the Room</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You've used AI to look at your own work through three research-backed lenses. Some of what it surfaced was useful — gaps you hadn't noticed, engagement dips you can redesign, rubric dimensions that crack under pressure. Some of it missed the point entirely, because AI doesn't sit in your fourth period class. Both responses taught you something. The useful critique improved your unit. The blind spots sharpened your sense of what only you can evaluate.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What This Means for Your Constitution</p>
            <p className="text-muted-foreground">
              Your Constitution already tells AI who your students are and what you're building. Now add a line about evaluation: "When I ask you to evaluate my work, provide analysis and evidence — not scores or rankings. I make the final judgment about quality, fit, and fairness. Your job is to surface what I might not see on my own." That sentence changes every evaluation conversation you have with AI going forward.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              The next course shifts the lens from your work to your students' work. The same principle holds: AI can help you see patterns in student output, but the question of what a student actually understands — that's yours to answer.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="evaluating-output-301"
      title="Evaluating AI Output & Your Own Work"
      sections={sections}
      {...props}
    />
  );
};
