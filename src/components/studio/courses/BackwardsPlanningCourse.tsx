import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface BackwardsPlanningCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const BackwardsPlanningCourse = (props: BackwardsPlanningCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">A Constitution Without a Plan</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You have a five-section Constitution now. It knows your classroom, your project architecture, your stakeholders, your quality standards, and your vision for how AI fits into your teaching. You paste it into Claude and ask: "Help me plan my hydroponics unit." What comes back is a week-by-week schedule that looks reasonable on paper. Twelve weeks of activities. Standards mentioned. A culminating presentation.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              But the schedule starts with "Introduction to Hydroponics" and builds forward, activity by activity, hoping it arrives somewhere meaningful by June. The community fridge on Third Street never comes up. The student presentations feel bolted on at the end. The unit has a beginning, but it doesn't have a destination.
            </p>
          </div>
          <p>
            Forward planning builds from what comes first. Backwards planning starts from what matters most and works back toward Monday. The difference sounds small. It changes everything about where a semester ends up.
          </p>
          <p>
            Think about the difference between planting seeds in a row and seeing what grows versus deciding you need tomatoes by August and counting backward to figure out when to start them indoors. One approach discovers its purpose along the way. The other knows its purpose and builds the path to get there.
          </p>
          <p>
            PBL demands the second approach. Your students aren't completing a series of activities — they're building toward a public product with real stakes. The community fridge coordinator needs data, not enthusiasm. The school board wants evidence. Parents want to see what their kids actually learned. Every week of the semester should be pulling toward that final moment. If it isn't, you have a schedule, not a plan.
          </p>
          <p>
            This course starts where good planning starts: with the end. You'll re-read Section 5 of your Constitution — your vision — and use it to anchor a backwards-planned semester timeline. AI does the heavy structural lifting. You hold the compass.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Wiggins & McTighe" /> formalized this as Understanding by Design: identify desired results first, determine acceptable evidence second, plan learning experiences third. PBL adds a public product and a real audience to that sequence.
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
          <h2 className="text-xl font-semibold text-foreground">Start from the Stage, Not the Seed</h2>
          <p className="text-lg">
            Before you touch a planning prompt, open your Constitution and read Section 5 — the vision you wrote about how AI should function in your classroom. That section is the anchor for everything in Tier 2. If it's vague, the plan will be vague. If it's specific, the plan has something to aim for.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">First Move: Sharpen the Vision</p>
            <p className="text-sm text-muted-foreground">
              Read Section 5 of your Constitution. Can you see the final day of the project? Not the logistics — the moment. Students standing in front of the community. What are they presenting? What evidence are they showing? Who in the audience is asking the hard questions? If you can't picture it, your plan will wander. Rewrite Section 5 until the destination is sharp enough to plan backward from.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Forward Planning:</p>
              <p className="text-sm">"Week 1: Intro to hydroponics. Week 2: pH basics. Week 3: Build systems. Week 4: Plant seeds..."</p>
              <p className="text-xs text-muted-foreground mt-2">
                Activities follow a logical sequence but don't point anywhere specific. By Week 10, you're improvising the ending because the beginning never defined one.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">Backwards Planning:</p>
              <p className="text-sm">
                "Week 16: Students present data-backed recommendations to community fridge coordinator. So by Week 14, drafts must be reviewed. By Week 10, students need reliable growth data. By Week 6, systems must be running. By Week 3, they need to understand pH and nutrients well enough to design their systems."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Every week exists because something later in the semester needs it. Nothing is filler.
              </p>
            </div>
          </div>

          <p>A PBL semester breaks into five phases. The names aren't sacred — the logic is.</p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Launch (Weeks 1-2)</p>
                <p className="text-muted-foreground">Students meet the driving question and the real-world context. In the hydroponics project: visit the community fridge, hear from the coordinator, understand the problem they're being asked to investigate. The end goal is visible from day one.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Inquiry (Weeks 3-6)</p>
                <p className="text-muted-foreground">Students build the knowledge they need. pH chemistry, plant biology, nutrient science — but always connected to why it matters for the fridge. This is where content lives, but content in service of the project, not content for its own sake.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Build (Weeks 7-10)</p>
                <p className="text-muted-foreground">Students construct, test, collect data. Systems go up. Plants go in. Data starts flowing. Problems surface — a pump fails, a nutrient mix doesn't work, the lettuce bolts. This is where the real learning happens, because real things are going wrong.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Present (Weeks 11-14)</p>
                <p className="text-muted-foreground">Students synthesize data into a recommendation. They draft, revise, rehearse. The audience shapes the work — what would the fridge coordinator need to see? What would a skeptical school board member ask? The final product takes shape.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Reflect (Weeks 15-16)</p>
                <p className="text-muted-foreground">Students present publicly and then look back. What did they learn? What would they change? Food goes to the community fridge. The project ends where it was always heading.</p>
              </div>
            </div>
          </div>

          <p>
            Here's where AI becomes genuinely useful. You know the destination, you know the phases, and you have a Constitution that tells AI exactly who your students are. Ask AI to draft the timeline — then stress-test it. Does the inquiry phase give students enough foundation for the build phase? Is there enough time between data collection and presentation for meaningful revision? Does the schedule account for the fact that half your class reads at sixth-grade level?
          </p>
          <p>
            AI is fast at generating structure. You're the one who knows whether the structure actually works for your students, in your room, with your constraints. That division of labor is the whole point.
          </p>

          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Gold Standard PBL" /> (PBLWorks) emphasizes that sustained inquiry, authenticity, and public product are non-negotiable. Backwards planning is how you protect those elements across a full semester.
          </div>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "backwards-planning-cfu-1",
        type: "prompt-compare" as const,
        question: "You're ready to plan a 16-week PBL unit on hydroponics with a community presentation at the end. Which planning prompt produces a timeline you could actually teach?",
        context: "You have a completed 5-section Constitution. You want AI to draft a semester timeline for the hydroponics project. The community fridge coordinator has agreed to attend the final presentations. Food will be donated to the Third Street fridge.",
        options: [
          {
            id: "A",
            prompt: "Help me plan a 16-week hydroponics unit for my science class. Students will learn about pH, biology, and chemistry through building hydroponic systems. Include activities for each week and a final presentation. Make it hands-on and engaging.",
            isCorrect: false,
            annotations: [
              { text: "Help me plan a 16-week hydroponics unit", label: "No Constitution loaded — AI is guessing your classroom", color: "bg-amber-500/20" },
              { text: "learn about pH, biology, and chemistry", label: "Content-first, not outcome-first", color: "bg-amber-500/20" },
              { text: "Include activities for each week", label: "Forward planning — filling weeks, not building toward something", color: "bg-amber-500/20" },
              { text: "a final presentation", label: "Presentation as afterthought, not anchor", color: "bg-amber-500/20" },
            ],
            explanation: "This prompt starts from content and works forward. No Constitution context means AI doesn't know the students, the community partner, the fridge, or the driving question. The presentation is mentioned last — as a thing that happens at the end, not as the destination that shapes everything before it.",
          },
          {
            id: "B",
            prompt: `[FULL CONSTITUTION PASTED — all 5 sections]

---

Using my Constitution as context, design a backwards-planned 16-week PBL timeline for the hydroponics project.

START FROM THE END: Week 16, students present data-backed recommendations to the community fridge coordinator and school community. Food is donated to the Third Street fridge.

Work backward through five phases:
- REFLECT (Weeks 15-16): Public presentation, community donation, student reflection
- PRESENT (Weeks 11-14): Data synthesis, draft recommendations, revision, rehearsal
- BUILD (Weeks 7-10): System construction, planting, data collection, troubleshooting
- INQUIRY (Weeks 3-6): pH chemistry, plant biology, nutrient science — in service of the driving question
- LAUNCH (Weeks 1-2): Meet the driving question, visit the community fridge, understand the real need

For each phase, include: key milestones, what students produce, how it connects to the final presentation, and where my students (from my Constitution) might need extra scaffolding.

Flag anything in this timeline that feels rushed or where the logic between phases breaks down.`,
            isCorrect: true,
            annotations: [
              { text: "FULL CONSTITUTION PASTED — all 5 sections", label: "AI has your full classroom context", color: "bg-green-500/20" },
              { text: "START FROM THE END: Week 16", label: "Backwards — destination first", color: "bg-green-500/20" },
              { text: "Work backward through five phases", label: "Structure with clear logic", color: "bg-green-500/20" },
              { text: "how it connects to the final presentation", label: "Every phase points to the end", color: "bg-green-500/20" },
              { text: "Flag anything in this timeline that feels rushed", label: "Built-in stress test", color: "bg-green-500/20" },
            ],
            explanation: "Constitution loaded. Destination defined first. Phases work backward from the public product. Each phase has clear expectations. And the prompt asks AI to flag its own weak spots — so you get a draft and a critique in one pass. This is what backwards planning looks like when you've already done the work of building a Constitution.",
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
        title: "Your Semester Timeline",
        description: "Load your full Constitution — all five sections. Re-read Section 5 (your vision) before you do anything else. Then use the backwards-planning scaffold below to generate a semester timeline for your project. Evaluate the output against your vision: does the timeline actually get students to the destination you described? Note where the model missed the mark and why.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Backwards Planning Scaffold",
            prompt: `[PASTE YOUR FULL CONSTITUTION — ALL 5 SECTIONS]

---

Using my Constitution as context, design a backwards-planned semester timeline for my PBL project.

START FROM THE END:
Final week — what do students present, to whom, and what is the real-world outcome?
[DESCRIBE YOUR FINAL PRODUCT, AUDIENCE, AND STAKES]

Work backward through these phases:
- REFLECT: Public product delivery, student reflection on learning and process
- PRESENT: Synthesis, drafting, revision, rehearsal — preparing the final product
- BUILD: Hands-on construction, data collection, testing, iteration
- INQUIRY: Content knowledge and skills — taught in service of the driving question
- LAUNCH: Meet the problem, understand the real-world context, establish the driving question

For each phase, specify:
1. Duration (number of weeks)
2. Key milestones and what students produce
3. How this phase connects to the final presentation
4. Scaffolding needs based on my student population (from my Constitution)
5. Where this phase could break down and what to watch for

After drafting the timeline, review it against Section 5 of my Constitution (my vision). Flag any place where the plan drifts from what I described as the purpose of AI and learning in my classroom.`,
          },
          {
            label: "Stress-Test Your Timeline",
            prompt: `[PASTE YOUR CONSTITUTION]

---

Here's the semester timeline I've drafted:
[PASTE YOUR TIMELINE]

Stress-test this plan:

1. PACING: Is there enough time between building/collecting data and presenting findings for students to actually synthesize and revise? Where is the schedule tightest?

2. SCAFFOLDING GAPS: Given my student population (from my Constitution), where will students get stuck? Which transitions between phases need more support?

3. LOGIC CHECK: Does each phase depend on the one before it? Is there any week where students are asked to do something they haven't been prepared for yet?

4. VISION ALIGNMENT: Read Section 5 of my Constitution. Does this timeline actually lead to the classroom I described? Where does it drift?

5. CONTINGENCY: What happens if the build phase takes longer than planned? Where is the flex in this schedule?

Be specific. Name the weeks where problems are likely and suggest concrete adjustments.`,
          },
        ],
        iterationTips: [
          "Read Section 5 of your Constitution out loud before prompting. If the vision sounds vague when you hear it, it will produce a vague plan. Sharpen it first.",
          "The most common problem: not enough time between data collection and presentation. Students need weeks to synthesize, not days. Check that transition carefully.",
          "If the AI-generated timeline front-loads content and back-loads the project, that's forward planning in disguise. Push back: every phase should connect to the final product.",
          "Your Constitution should do most of the work. If the output ignores your students' reading levels or your scaffolding needs, the Constitution might be missing something — go back and add it.",
        ],
      },
    },
    {
      id: "reflection",
      type: "reflection" as const,
      title: "Reflection",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Architecture Is Set</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You now have two things: a Constitution that tells AI who your students are, and a semester timeline that tells you where the semester is going. The timeline came from working backward — starting at the public product and mapping every phase in relation to that destination. Save both. The timeline is the first piece of your PBL unit, and the Constitution travels with you into every session from here.
            </p>
          </div>

          <p>
            Something probably happened during this exercise that's worth naming. When you asked AI to plan backward from your vision, the output likely exposed places where Section 5 wasn't specific enough. Maybe the description of your final product was clear but the evidence students should present was vague. Maybe you knew students were presenting to the community but hadn't defined what the community needed to hear. The plan revealed the gaps in the vision.
          </p>
          <p>
            That's the feedback loop working. Constitution informs the plan. The plan stress-tests the Constitution. Both get sharper.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What You Built</p>
            <p className="text-muted-foreground">
              A project overview and semester timeline — phased, backwards-planned, grounded in your Constitution. This is the skeleton that everything else in Tier 2 will hang on. The next course fills in who students are inside this project and how they interact with AI at specific moments in the timeline.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Before moving on, ask yourself one question: if you handed this timeline to a substitute teacher with no context, would they understand where the semester is heading and why each phase matters? If not, the plan needs one more pass. Clarity for someone else is clarity for you six weeks from now when you're deep in the build phase and can't remember why Week 4 matters.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="backwards-planning-201"
      title="Backwards Planning with AI"
      sections={sections}
      {...props}
    />
  );
};
