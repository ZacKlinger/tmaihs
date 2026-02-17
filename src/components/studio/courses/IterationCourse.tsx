import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface IterationCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
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
              "You asked AI to generate a 14-week project arc for your documentary unit. The milestones look reasonable, 
              but the transition from Week 4 (research) to Week 5 (storyboarding) feels abrupt. Students won't be ready. 
              You could rewrite the whole prompt from scratch... or you could have a conversation."
            </p>
          </div>
          <p>
            Most people treat AI like a vending machine: input prompt, receive output, done. But AI becomes
            dramatically more useful when you treat it as a <strong>thinking partner</strong> you can iterate with.
          </p>
          <p>
            This is the final course in Tier 1, and it builds the last section of your AI Classroom
            Constitution: your <strong>Quality Standards</strong> — what "classroom-ready" means in
            your room, how you evaluate, and what bar you hold AI outputs to. You'll also use
            iteration to refine the Constitution itself, testing it against real outputs and
            tightening it based on what comes back.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            This mirrors the <ResearchLink text="Design Thinking" /> prototyping cycle: build, test, refine. 
            Your first prompt is a prototype, not a final product.
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
          <h2 className="text-xl font-semibold text-foreground">The Iteration Mental Model</h2>
          <p className="text-lg">
            AI conversations have memory within a session. Each follow-up builds on what came before. 
            This means you can <strong>steer</strong> outputs rather than hoping to get it perfect on try one.
          </p>
          
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-6">
            <h3 className="text-lg font-semibold mb-4">The Critique Protocol</h3>
            <p className="text-sm text-muted-foreground mb-4">
              In PBL, students learn through critique and revision cycles. Apply the same approach to AI output:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">1</span>
                <span><strong>Generate:</strong> Get a first draft with your key constraints</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">2</span>
                <span><strong>Critique:</strong> What's working? What's not? Be specific.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">3</span>
                <span><strong>Refine:</strong> Ask for targeted changes, not a complete redo</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">4</span>
                <span><strong>Repeat:</strong> Until the output is classroom-ready</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Powerful Iteration Prompts for Projects</h3>
          <ul>
            <li><strong>Adjust pacing:</strong> "The transition from Week 4 to Week 5 is too abrupt. Add a bridge activity."</li>
            <li><strong>Add scaffolding:</strong> "Students won't have the skills for Week 7 yet. What prerequisite activities are missing?"</li>
            <li><strong>Increase rigor:</strong> "The reflection prompts are surface-level. Rewrite them to require evidence from student work."</li>
            <li><strong>Improve coherence:</strong> "The milestones don't clearly build toward the final product. Show me how each connects."</li>
            <li><strong>Differentiate:</strong> "Keep everything else, but add scaffolds for students who struggled with the research phase."</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>Key insight:</strong> It's almost always faster to iterate than to craft a "perfect" initial prompt. 
              Start with 70% right, then refine to 95%. This reflects <ResearchLink text="Hattie" />'s finding that 
              feedback loops are among the highest-impact teaching practices.
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
        description: "A teacher's AI-generated project timeline has milestones that don't build coherently toward the final documentary. What's the best sequence for fixing this?",
        steps: [
          { id: "a", text: "Review the timeline to identify which specific transitions feel disconnected", correctPosition: 1 },
          { id: "b", text: "Ask AI to explain how each milestone builds toward the final product", correctPosition: 2 },
          { id: "c", text: "Request targeted adjustments to the weakest transition points", correctPosition: 3 },
          { id: "d", text: "Check if the revised timeline maintains realistic pacing for your students", correctPosition: 4 },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Build Your Constitution: Quality Standards & Refinement",
        description: "This workshop does two things. First, you'll write the final section of your Constitution — your Quality Standards. Then you'll use iteration to test and refine the full Constitution, feeding it into an AI tool and tightening it based on what comes back.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Constitution Section 4: Quality Standards",
            prompt: `QUALITY STANDARDS — save this as the fourth and final section of your AI Classroom Constitution.

What "classroom-ready" means to me:
- Activities should take [TIME RANGE — e.g., "30-50 minutes"] and build on prior work
- Materials must [KEY REQUIREMENT — e.g., "reference specific student data and project milestones"]
- Rubric style: [e.g., "4-point scale, assesses both content and process"]
- Scaffolds: [e.g., "visual supports and vocabulary pre-teaching for EL students in every assignment"]
- Everything should connect to [e.g., "the driving question and final product"]

My revision expectations:
- [e.g., "First output is a draft — I expect to iterate 2-3 times"]
- [e.g., "I'd rather have something specific and wrong than generic and safe"]

What I don't want:
- [e.g., "Generic worksheets that could apply to any classroom"]
- [e.g., "Activities that don't reference where students are in the project"]
- [e.g., "Overly formal language — my students respond to direct, clear instructions"]

---
YOUR CONSTITUTION IS NOW COMPLETE. Paste all four sections together into a single document and save it somewhere accessible. This is what you'll load into any AI tool from now on.`,
          },
          {
            label: "Test & Refine Your Full Constitution",
            prompt: `[PASTE YOUR COMPLETE CONSTITUTION — all four sections]

---

Now create a mid-project checkpoint activity for my students based on the context above.

---
ITERATION FOLLOW-UPS TO TRY:
"This doesn't reference [SPECIFIC MILESTONE] that students already completed. Revise to build on that work."
"The reading level is too high for my EL students. Simplify the instructions but keep the rigor."
"This is too generic — add specific references to [STUDENT DATA/PROJECT DETAIL] from my Constitution."
"Keep what's working, but the time estimate is off. This needs to fit in [X] minutes."`,
          },
        ],
        iterationTips: [
          "Be specific about WHAT to change and WHERE. 'Make it better' forces AI to guess.",
          "Use 'Keep X, change Y' framing to preserve what's working.",
          "If you're iterating more than 4-5 times on the same element, your initial constraints might need rethinking.",
          "Set a 'good enough' threshold—classroom materials don't need to be perfect, just usable.",
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
        question: "Match each iteration prompt to the change it would produce",
        description: "Given an AI-generated project timeline, predict what each follow-up prompt would fix.",
        pairs: [
          {
            promptId: "1",
            prompt: "The milestones don't clearly connect to the driving question. Revise each milestone to explicitly reference it.",
            outputId: "A",
            output: "Revised timeline where each weekly milestone begins with 'Students will explore [aspect of driving question] by...'",
            explanation: "This targets coherence—ensuring every activity connects to the central question students are investigating.",
          },
          {
            promptId: "2", 
            prompt: "Week 6 assumes students can storyboard, but we haven't taught that skill. Add a mini-lesson on storyboarding in Week 5.",
            outputId: "B",
            output: "Week 5 now includes a 30-minute storyboarding introduction with examples before students apply the skill in Week 6",
            explanation: "This addresses a skill gap by adding scaffolding before the point where students need to apply the skill.",
          },
          {
            promptId: "3",
            prompt: "The reflection prompts are too generic. Rewrite them to require students to cite specific evidence from their project work.",
            outputId: "C",
            output: "Revised prompts like 'Quote one piece of feedback you received and explain how you addressed it' instead of 'What did you learn?'",
            explanation: "This increases rigor by requiring concrete evidence rather than vague self-assessment.",
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
        originalPrompt: "The examples are too hard for my students. Make them easier.",
        originalContext: "Teacher has lesson materials where examples are too advanced.",
        newContext: "Teacher now has a project timeline where the pacing is too rushed—students won't have time to complete Week 8 tasks.",
        constraints: [
          { id: "c1", text: "The examples are too hard", shouldChange: true, reason: "The issue isn't difficulty, it's pacing and time allocation." },
          { id: "c2", text: "for my students", shouldChange: false, reason: "Student context is still relevant—changes should work for your specific class." },
          { id: "c3", text: "Make them easier", shouldChange: true, reason: "Need to address time, not difficulty: 'Redistribute Week 8 tasks across Weeks 7-9.'" },
          { id: "c4", text: "Keep the learning goals the same", shouldChange: false, reason: "Good practice—preserve objectives while adjusting pacing." },
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
            <p className="font-medium mb-2">Your Constitution Is Complete</p>
            <p className="text-muted-foreground">
              You now have a four-section AI Classroom Constitution: Classroom Context, Project Architecture,
              Stakeholder & Perspective Map, and Quality Standards. Together, they give AI everything it
              needs to produce work that's actually useful to you.
            </p>
            <p className="text-muted-foreground mt-3">
              This document is alive. Update the Project Architecture section when you start a new unit.
              Revise Quality Standards when you notice AI consistently missing something. The Constitution
              gets better the more you use it.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What's Next</p>
            <p className="text-muted-foreground">
              In Tier 2, you'll use your Constitution as the foundation for designing a complete PBL unit
              with AI. The Constitution tells AI who your classroom is. Tier 2 teaches you to build
              something with it.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Between now and Tier 2:</strong> Use your Constitution for every AI interaction
              this week. Paste it first, then ask for what you need. Notice what works and what
              needs refining — iterate on the Constitution itself the same way you'd iterate on
              any output.
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
