import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface ConstraintsCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const ConstraintsCourse = (props: ConstraintsCourseProps) => {
  const sections = [
  {
    id: "context",
    type: "context" as const,
    title: "The Scenario",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Week 5, Fourth Period</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">It's Week 5 of a hydroponics project in your SDC science classroom. Your students just finished their pH baseline readings and they're about to design their nutrient delivery systems. You need a worksheet that bridges the chemistry they've done with the biology they're starting — and you need it by fourth period.</p>
            <p className="text-lg italic text-muted-foreground mt-3">So you ask AI for help. What comes back is a generic hydroponics worksheet you could've found on Teachers Pay Teachers. Nothing about pH. Nothing about the butterhead lettuce and collard greens your students chose. Nothing about the fact that half the class is donating their harvest to the community fridge on Third Street.</p>
          </div>
          <p>
            The worksheet isn't wrong. It's just useless to you.
          </p>
          <p>
            That gap — between what AI gives you by default and what you actually need — is what this course is about. The fix is simpler than you think, and it starts with one idea: AI doesn't know what you know. You have to tell it.
          </p>
          <p>
            Across this tier, you're going to build something called your <strong>AI Classroom Constitution</strong> — a living document that captures everything AI needs to know about your classroom to be useful. The idea comes from how Anthropic trains Claude: give AI a set of values and constraints to refer back to, and it produces better work every time. Your Constitution does the same thing. Paste it into any AI tool, and the outputs get specific without you rethinking your approach each session.
          </p>
          <p>
            This course builds the first two sections: your <strong>Classroom Context</strong> and your <strong>Project Architecture</strong>.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Sweller's cognitive load research" /> explains why this works — the more you narrow the task, the less noise both you and the AI have to wade through.
          </div>
        </div>

  },
  {
    id: "mental-model",
    type: "mental-model" as const,
    title: "Mental Model",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">What Constraints Actually Do</h2>
          <p className="text-lg">
            Left to its own devices, AI writes for the average classroom. Average grade level, average project, average week. It pattern-matches to the most common version of whatever you asked for.
          </p>
          <p>
            Your classroom isn't average. Constraints are how you tell AI what makes yours specific.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without Constraints:</p>
              <p className="text-sm">"Create a worksheet for my hydroponics project"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Generic. Could be for any grade, any week, any plant. AI doesn't know your students just spent two weeks on pH, so it starts from scratch.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Constraints:</p>
              <p className="text-sm">
                "Create a nutrient delivery planning worksheet for 10th grade SDC science. Students just completed pH baseline readings for their hydroponic systems and are designing nutrient mixes this week. They're growing butterhead lettuce and collard greens. The worksheet should take 30 minutes and connect their pH data to nutrient absorption. This is Week 5 of a 16-week project ending in community presentations."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Specific. Builds on what students already know. Tied to where they're headed.
              </p>
            </div>
          </div>

          <p>Think of it like mise en place — everything laid out before you start cooking. Five constraints change everything:</p>

          <ul>
            <li><strong>Project Phase:</strong> Where are your students in the arc? Week 3 looks nothing like Week 10.</li>
            <li><strong>Prior Work:</strong> What have they already done that this builds on? AI can't reference work it doesn't know about.</li>
            <li><strong>Time Box:</strong> Is this a 15-minute warm-up or a 50-minute deep dive?</li>
            <li><strong>Differentiation:</strong> What scaffolds, reading levels, or extensions does this group need?</li>
            <li><strong>Final Product Connection:</strong> How does today's work connect to what they're building toward?</li>
          </ul>

          <p>
            <ResearchLink text="PBLWorks" /> calls it "Gold Standard" design — every activity connects back to a driving question and a public product. If your students are growing food for a real community, for real people, your prompts should know about it. The AI can't connect the dots you haven't drawn.
          </p>
        </div>

  },
  {
    id: "cfu-1",
    type: "cfu" as const,
    title: "Check 1",
    advancedCfuData: {
      id: "constraints-cfu-1",
      type: "prompt-compare" as const,
      question: "You're prepping for tomorrow. Which prompt gets you something you'd actually hand out?",
      context: "It's Week 7 of the hydroponics project. Students have built their systems and collected two weeks of growth data. Now they need to analyze what's working and what isn't before adjusting their nutrient mixes.",
      options: [
        {
          id: "A",
          prompt: "Create a data analysis worksheet for students doing a hydroponics project. They need to look at their plant growth data and figure out what's working.",
          isCorrect: false,
          annotations: [
            { text: "a hydroponics project", label: "Which week? What phase?", color: "bg-amber-500/20" },
            { text: "their plant growth data", label: "What data specifically?", color: "bg-amber-500/20" },
            { text: "figure out what's working", label: "No structure for analysis", color: "bg-amber-500/20" }
          ],
          explanation: "This sounds reasonable, but notice — AI doesn't know what data students have, what plants they're growing, or that they're about to adjust nutrient mixes. The output will be a generic data analysis template that could apply to any science class."
        },
        {
          id: "B",
          prompt: "It's Week 7 of our 16-week hydroponics project. Students have collected two weeks of growth data on butterhead lettuce and collard greens and are now analyzing what's working. Create a structured worksheet that helps them compare data week-to-week, identify patterns, and make evidence-based decisions about nutrient adjustments. They've already completed pH baseline readings and system builds. The worksheet should take 30 minutes and connect to their community presentation in Week 16.",
          isCorrect: true,
          annotations: [
            { text: "Week 7 of 16-week", label: "Project phase", color: "bg-green-500/20" },
            { text: "two weeks of growth data", label: "Concrete prior work", color: "bg-green-500/20" },
            { text: "butterhead lettuce and collard greens", label: "Their actual plants", color: "bg-green-500/20" },
            { text: "pH baseline readings and system builds", label: "What they've done", color: "bg-green-500/20" },
            { text: "community presentation in Week 16", label: "Final product connection", color: "bg-green-500/20" }
          ],
          explanation: "All five constraints are here. AI now knows the project phase, the prior work, the specific plants, the time box, and the final product. The output will be a worksheet built on their actual progress."
        }
      ]
    },
  },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Build Your Constitution: Classroom Context & Project Architecture",
        description: "This is where your Constitution starts. Fill in the sections below with your actual classroom and project — not the hydroponics example, yours. Then test it: paste what you write into an AI tool and see how the output changes. What you produce here becomes the first two sections of your Constitution.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Constitution Section 1: Classroom Context",
            prompt: `CLASSROOM CONTEXT — save this as the first section of your AI Classroom Constitution.

I teach [GRADE/COURSE] at [SCHOOL NAME].
Class size: [NUMBER] students
Reading levels: [RANGE — e.g., "6th-10th grade"]
EL students: [NUMBER and LEVEL — e.g., "8 students, emerging/developing"]
IEP/504 considerations: [BRIEF DESCRIPTION]
Standard scaffolds I use: [e.g., "visual supports, vocabulary pre-teaching, sentence frames"]
Period length: [MINUTES], we meet [FREQUENCY]
District requirements: [e.g., "NGSS-aligned, quarterly benchmarks"]

---
TEST IT: Paste this section into an AI tool and ask it to create a warm-up activity for your class. Notice how much more specific the output is compared to prompting without it.`,
          },
          {
            label: "Constitution Section 2: Project Architecture",
            prompt: `PROJECT ARCHITECTURE — save this as the second section of your AI Classroom Constitution.

Current project: [TOPIC]
Driving question: [YOUR DRIVING QUESTION]
Timeline: [TOTAL] weeks, currently Week [NUMBER]

Milestones completed:
- [KEY MILESTONE 1 — e.g., "completed pH baseline readings"]
- [KEY MILESTONE 2 — e.g., "built hydroponic frames"]
- [KEY MILESTONE 3 — e.g., "selected plants and researched growing conditions"]

What's coming next: [NEXT PHASE — e.g., "designing nutrient delivery systems"]

Final product: [WHAT STUDENTS CREATE — e.g., "community presentation with live plant data"]
Audience: [WHO SEES IT — e.g., "community partners and school board members"]
Disciplines involved: [LIST — e.g., "biology, chemistry, engineering design"]

---
TEST IT: Now paste BOTH sections into an AI tool and ask for a mid-project checkpoint activity. Compare this output to what you'd get from a prompt that just says "create an activity for my science project."`,
          },
        ],
        iterationTips: [
          "Week number matters. A Week 3 activity and a Week 10 activity for the same project should look completely different. Always say where students are.",
          "Name what students have already produced — data sets, prototypes, research notes. AI can't build on work it doesn't know exists.",
          "If students are presenting to real people at the end, say so. 'Community stakeholders' changes the output more than you'd expect.",
          "First output too generic? Add one constraint about your specific students — their reading levels, their plant choices, what they struggled with last week. That's usually enough.",
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
        prompt: "Create a rubric for my students' hydroponics project presentations.",
        context: "A teacher wants AI to generate a rubric for the end-of-project community presentations. The prompt above is all they wrote. What's missing?",
        elements: [
          { id: "project-specifics", label: "What the project actually involves (plants, systems, data)", isMissing: true, explanation: "The rubric should assess what students actually did — pH analysis, system design, nutrient management. Without specifics, AI will generate a generic presentation rubric." },
          { id: "prior-milestones", label: "Milestones students completed during the project", isMissing: true, explanation: "A strong rubric references the journey, not just the destination. If students built systems, collected data, and iterated on designs, the rubric should reflect that work." },
          { id: "audience-context", label: "Who the audience is for the presentations", isMissing: true, explanation: "Presenting to the community fridge coordinator is different from presenting to classmates. The audience shapes what 'proficient' looks like — clarity for non-experts, real-world relevance, evidence of impact." },
          { id: "point-scale", label: "Point scale and grading structure", isMissing: true, explanation: "A 4-point rubric and a 100-point rubric produce very different outputs. AI needs to know your system." },
          { id: "ai-tool", label: "Which AI tool to use", isMissing: false, explanation: "Tool choice doesn't affect rubric quality. A well-constrained prompt works in Claude, Gemini, or ChatGPT." },
          { id: "rubric-format", label: "Whether to use a table or list format", isMissing: false, explanation: "Format is a preference, not a constraint. Spend your constraint budget on content, not formatting." },
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
          <h2 className="text-xl font-semibold text-foreground">Your Constitution So Far</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You now have the first two sections of your AI Classroom Constitution: your Classroom Context and your Project Architecture. Together, they give AI the baseline it needs — who your students are and what they're working on.
            </p>
            <p className="text-muted-foreground mt-3">
              Save what you wrote somewhere you can find it. You'll keep building on it in the next two courses, and the finished Constitution travels with you through everything that follows.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Try This Before the Next Course</p>
            <p className="text-muted-foreground">
              Before your next AI prompt — for anything — paste your two Constitution sections first. Then ask for whatever you need. Notice how different the output is compared to prompting cold. That difference is what your Constitution is for.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              The Constitution now knows your classroom and your project. Next, you'll add who else should be in the room — the stakeholders whose perspectives matter most. The community fridge coordinator doesn't think about your project the way the school board does, and AI should know the difference.
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
      {...props} />);


};
