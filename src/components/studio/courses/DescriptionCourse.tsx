import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface DescriptionCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const DescriptionCourse = (props: DescriptionCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Two Prompts, Same Teacher, Same Prep Period</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              It's Tuesday morning. You teach SDC science, grades 9-12. Your students are five weeks into a hydroponics project — they've built their systems, chosen their crops (butterhead lettuce and collard greens), and just finished their first round of pH baseline readings. Tomorrow they start designing nutrient delivery. You need something to bridge the chemistry they've been doing with the biology that's coming.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              You open Claude and type this:
            </p>
          </div>

          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
            <p className="font-medium text-destructive mb-2">Prompt A</p>
            <p className="text-sm">"Help me create a worksheet about hydroponics for my science class."</p>
          </div>

          <p className="mt-4">
            The output arrives in seconds. It covers the water cycle, photosynthesis basics, a labeling diagram of a generic hydroponic system. It's accurate. It's also something you could have pulled off the first page of a Google search. Nothing about pH. Nothing about the specific crops your students chose. Nothing about the community fridge on Third Street where half the class plans to donate their harvest.
          </p>

          <p>
            You delete it and try again:
          </p>

          <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
            <p className="font-medium text-green-700 dark:text-green-300 mb-2">Prompt B</p>
            <p className="text-sm">
              "I teach SDC science (grades 9-12) at a public high school in Los Angeles. My students are in Week 5 of a 16-week hydroponics PBL unit. They've just completed pH baseline readings for their systems and are growing butterhead lettuce and collard greens. Tomorrow they begin designing nutrient delivery systems. I need a 30-minute bridging worksheet that connects their pH chemistry work to the biology of nutrient absorption in plants. Reading level should be around 6th-7th grade with vocabulary supports. Half the class is donating their harvest to a neighborhood community fridge, so the final product has real stakes."
            </p>
          </div>

          <p className="mt-4">
            This output references their actual data. It builds on the pH work they already did. The vocabulary supports are at the right level. There's a section that asks students to consider how nutrient choices affect the people who will eat what they grow.
          </p>

          <p>
            Same tool, same teacher, same morning. The difference is description — telling the AI what you know, so it can work with what matters.
          </p>

          <p>
            That skill has a name. Anthropic's AI Fluency Framework identifies four competencies for working with AI: Delegation, Description, Discernment, and Diligence. Description is the one that changes your output the fastest. It's the act of articulating what you need with enough specificity that the model can meet you where your classroom actually is, not where a generic classroom might be.
          </p>

          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Anthropic's AI Fluency Framework" /> names Description as one of four core competencies — the ability to effectively communicate goals so the model produces useful output. This course teaches that competency through your own classroom materials.
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
          <h2 className="text-xl font-semibold text-foreground">Three Instruments, One Composition</h2>

          <p className="text-lg">
            A musician who only plays melody gives you a tune. Add harmony and rhythm and you get a song. Description works the same way — there are three distinct instruments, and the best prompts play all of them.
          </p>

          <h3 className="text-lg font-medium mt-6">Context: What the AI Doesn't Know</h3>
          <p>
            Every time you open a new AI session, the model knows nothing about you. Not your grade level, not your students, not what happened in class yesterday. Context fills that gap. It's the difference between handing someone a recipe and handing them a recipe plus telling them it's for a dinner party of eight, two of whom are vegetarian, and the oven runs hot.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-2">Context in the hydroponics project:</p>
            <p className="text-sm text-muted-foreground">
              "My SDC science students (grades 9-12) are in Week 5 of a 16-week PBL unit. They've completed pH baseline readings and built their hydroponic frames. They're growing butterhead lettuce and collard greens, and half the class is donating their harvest to a community fridge."
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Without this, the AI writes for an imagined classroom. With it, the AI writes for yours.
            </p>
          </div>

          <h3 className="text-lg font-medium mt-6">Constraints: What Makes It Usable</h3>
          <p>
            Context tells the AI where you are. Constraints tell it what the output needs to look like when it arrives. Reading level. Time limit. Format. Assessment criteria. These are the guardrails that turn a technically correct answer into something you can hand a student tomorrow.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-2">Constraints in the hydroponics project:</p>
            <p className="text-sm text-muted-foreground">
              "The worksheet should take 30 minutes. Reading level around 6th-7th grade. Include vocabulary supports for key science terms. Format as a data table, not a lab report — my students use tables. Connect the activity to their community presentation in Week 16."
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Each constraint narrows the output. Five constraints together produce something specific enough to be useful.
            </p>
          </div>

          <h3 className="text-lg font-medium mt-6">Persona: Who's Thinking With You</h3>
          <p>
            Sometimes you don't need AI to produce a worksheet. You need it to think alongside you as a particular kind of expert. A special education coordinator who understands SDC scaffolding. A PBL curriculum designer who knows how to sequence milestones. An urban agriculture specialist who can help your students understand what the community fridge coordinator actually needs from a harvest.
          </p>

          <div className="bg-muted/50 p-4 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-2">Persona in the hydroponics project:</p>
            <p className="text-sm text-muted-foreground">
              "Act as a special education science curriculum specialist who has designed PBL units for SDC classrooms. Help me think through how to scaffold the transition from pH chemistry to nutrient biology so that students with reading levels from 4th to 8th grade can all access the same driving question."
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Notice: this isn't asking AI to produce a thing. It's asking AI to think with you. That's a different kind of conversation, and it often produces better results than going straight to "make me a worksheet."
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Asking AI to Think With You vs. Asking AI to Do Work</p>
            <p className="text-muted-foreground">
              "Create a worksheet" is delegation. The AI does the work, you review it. "Help me think through how to scaffold this transition" is collaboration. The AI contributes expertise, you contribute judgment. Both are valid. But when you're planning something complex — like bridging two science disciplines for students with a wide range of reading levels — thinking together usually gets you further than a cold request for a finished product.
            </p>
          </div>

          <p>
            Here's where this connects to what you started building in the last course. Your AI Classroom Constitution is pre-loaded description. Sections 1 and 2 — Classroom Context and Project Architecture — contain the context and constraints that would otherwise eat the first hundred words of every prompt you write. When you paste your Constitution at the top of a session, the AI already knows your students, your project phase, your reading levels, your timeline. Your prompts get shorter because the foundation is already laid.
          </p>

          <p>
            Think of the Constitution as the infrastructure underneath a building. Nobody sees the plumbing and wiring, but every room works because they're there. Every subsequent prompt you write is shorter and more powerful because the Constitution handles what used to be boilerplate.
          </p>

          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Sweller's cognitive load research" /> explains the mechanism: when you front-load context into a reusable document, you reduce the processing demands on both yourself and the model for every interaction that follows.
          </div>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "description-cfu-1",
        type: "prompt-compare" as const,
        question: "You need a formative check-in for Week 8. Students have been collecting growth data for three weeks and are about to decide whether to adjust their nutrient mixes. Which prompt gets you something you'd actually use?",
        context: "It's Week 8 of the hydroponics project. Students have three weeks of growth measurement data for their butterhead lettuce and collard greens. Next week they'll make nutrient adjustment decisions based on their data. You need a formative check-in that reveals whether students can interpret their own growth data well enough to make evidence-based nutrient decisions.",
        options: [
          {
            id: "A",
            prompt: "Create a formative assessment for students in a hydroponics unit. They've been collecting growth data and need to analyze it. Make it appropriate for high school science students and include some scaffolding.",
            isCorrect: false,
            annotations: [
              { text: "a hydroponics unit", label: "Which week? What's next?", color: "bg-amber-500/20" },
              { text: "collecting growth data", label: "What data? Which plants?", color: "bg-amber-500/20" },
              { text: "high school science students", label: "SDC? Reading levels?", color: "bg-amber-500/20" },
              { text: "some scaffolding", label: "What kind? For whom?", color: "bg-amber-500/20" },
            ],
            explanation: "Every phrase here is half-described. The AI doesn't know these are SDC students reading at 6th-7th grade level, that they're growing specific crops, that they have three weeks of real data, or that the point of this check-in is to prepare them for nutrient adjustment decisions. 'Some scaffolding' could mean anything. The output will be a generic data analysis assessment.",
          },
          {
            id: "B",
            prompt: "I need a 25-minute formative check-in for my SDC science class (grades 9-12, reading level 6th-7th grade). We're in Week 8 of a 16-week hydroponics PBL unit. Students have collected three weeks of growth measurements for butterhead lettuce and collard greens. Next week, they'll decide whether to adjust their nutrient mixes. This check-in should reveal whether they can read their own data tables, identify growth trends, and connect those trends to possible nutrient causes. Include sentence frames for their explanations and a vocabulary reference for: pH, nutrient absorption, growth rate, variable. Their harvest goes to a community fridge, so their decisions have real consequences.",
            isCorrect: true,
            annotations: [
              { text: "SDC science class (grades 9-12, reading level 6th-7th grade)", label: "Context: who these students are", color: "bg-green-500/20" },
              { text: "Week 8 of a 16-week hydroponics PBL unit", label: "Context: project phase", color: "bg-green-500/20" },
              { text: "three weeks of growth measurements for butterhead lettuce and collard greens", label: "Context: their actual data", color: "bg-green-500/20" },
              { text: "25-minute", label: "Constraint: time", color: "bg-green-500/20" },
              { text: "sentence frames for their explanations and a vocabulary reference", label: "Constraint: specific scaffolds", color: "bg-green-500/20" },
              { text: "whether they can read their own data tables, identify growth trends, and connect those trends to possible nutrient causes", label: "Constraint: what you're assessing", color: "bg-green-500/20" },
            ],
            explanation: "Context, constraints, and purpose are all present. The AI knows who the students are, what data they have, what decision they're preparing for, what reading level to target, and exactly what the check-in should reveal. The output will be built around their real project, not a hypothetical one.",
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
        title: "Build Your Constitution: Pedagogical Values & Subject Content",
        description: "In the last course, you drafted Sections 1 and 2 of your Constitution — Classroom Context and Project Architecture. Now you're adding the layers that shape how AI approaches your teaching: your pedagogical commitments and the specific vocabulary and content your students are working with. These sections turn the Constitution from a fact sheet into a set of instructions the AI can follow.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Constitution Section 2: Pedagogical Values & Commitments",
            prompt: `PEDAGOGICAL VALUES & COMMITMENTS — save this as Section 2 of your AI Classroom Constitution.

My core teaching commitments:
- [VALUE 1 — e.g., "Student voice drives project direction; I don't pre-decide outcomes"]
- [VALUE 2 — e.g., "Every activity connects to a real audience and real consequences"]
- [VALUE 3 — e.g., "Scaffolding means access, not simplification — the thinking stays rigorous"]
- [VALUE 4 — e.g., "Assessment shows what students CAN do, not what they can't"]

When generating materials for my classroom, AI should:
- [GUIDELINE 1 — e.g., "Always connect activities to the driving question, never treat a lesson as standalone"]
- [GUIDELINE 2 — e.g., "Provide multiple entry points for the same rigorous task, not separate 'easy' and 'hard' versions"]
- [GUIDELINE 3 — e.g., "Frame student work as preparation for a real audience, not just a grade"]

AI should never:
- [BOUNDARY 1 — e.g., "Produce worksheets where students just fill in blanks without reasoning"]
- [BOUNDARY 2 — e.g., "Assume lower reading level means lower cognitive demand"]
- [BOUNDARY 3 — e.g., "Generate content disconnected from our current project phase"]

---
TEST IT: Paste your full Constitution (Sections 1 + 2) into an AI tool and ask it to create a warm-up activity. Then paste only Section 1 and ask for the same thing. The difference reveals what your pedagogical values add to the output.`,
          },
          {
            label: "Constitution Section 3: Subject/Grade Vocabulary & Content",
            prompt: `SUBJECT/GRADE VOCABULARY & CONTENT — save this as Section 3 of your AI Classroom Constitution.

Subject area: [e.g., "SDC Science — integrated biology, chemistry, and engineering design"]
Grade band: [e.g., "9-12, with reading levels ranging from 4th to 8th grade"]

Key vocabulary students should be using (not just seeing):
- [TERM 1 and student-friendly definition — e.g., "pH: how acidic or basic a solution is, measured on a scale of 0-14"]
- [TERM 2 — e.g., "nutrient absorption: how plants take in the minerals they need to grow"]
- [TERM 3 — e.g., "growth rate: how fast a plant grows over a set period of time"]
- [TERM 4 — e.g., "variable: something you change or measure in an experiment"]
- [Add 4-8 more terms central to your current unit]

Content standards driving this unit:
- [STANDARD 1 — e.g., "NGSS LS1-5: Photosynthesis and energy flow"]
- [STANDARD 2 — e.g., "NGSS PS1-2: Chemical reactions in nutrient solutions"]
- [STANDARD 3 — e.g., "NGSS ETS1-3: Iterative design and testing"]

Vocabulary scaffolds I use:
- [e.g., "Word walls with visuals, vocabulary notebooks, sentence frames that embed target terms"]

Content I've already covered this unit:
- [e.g., "pH scale and measurement, basic plant anatomy, hydroponic system components"]

Content coming next:
- [e.g., "Nutrient chemistry, plant growth factors, data-driven design decisions"]

---
TEST IT: Paste your full Constitution (all three sections) and ask AI to create a vocabulary-rich activity for your current unit. Check: does it use YOUR terms at YOUR level, or generic science vocabulary?`,
          },
        ],
        iterationTips: [
          "Your pedagogical values aren't decorative. If you believe assessment should show what students can do, and the AI generates a deficit-framed rubric, your Constitution should catch that. Test by deliberately asking for something that might violate your values.",
          "The vocabulary section isn't a glossary — it's a signal to the AI about what language your students should be producing. If you list 'growth rate' as a key term, the AI should build activities where students use that term in their own explanations, not just read it.",
          "If you teach across multiple subjects or grade levels, you might need different versions of Section 3. The vocabulary for a 9th grader in biology is different from a 12th grader in environmental science, even in the same project.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "description-cfu-2",
        type: "identify-missing" as const,
        prompt: "Create a lab activity where students test how different nutrient concentrations affect plant growth in their hydroponic systems. Make it hands-on and engaging.",
        context: "A teacher at TMAHS is in Week 9 of the hydroponics project. Students have built their systems, collected baseline data, and are ready to run controlled experiments with nutrient variables. The teacher writes the prompt above. What description is missing?",
        elements: [
          {
            id: "student-population",
            label: "Who the students are (SDC, reading levels, grade band)",
            isMissing: true,
            explanation: "Without knowing these are SDC students with reading levels from 4th to 8th grade, the AI will write for a general high school audience. The lab procedures, data recording sheets, and written analysis will all be pitched wrong.",
          },
          {
            id: "prior-data",
            label: "What data students have already collected (pH baselines, growth measurements)",
            isMissing: true,
            explanation: "Students have eight weeks of work behind them. If the AI doesn't know about their existing pH data and growth measurements, it will design an experiment that starts from zero instead of building on what they've done.",
          },
          {
            id: "project-phase",
            label: "Where this falls in the 16-week timeline and what comes after",
            isMissing: true,
            explanation: "Week 9 of 16 means students are past the halfway point. The experiment should connect forward to their community presentation. Without timeline context, the AI designs an isolated lab instead of a project milestone.",
          },
          {
            id: "scaffolding-needs",
            label: "Specific scaffolds needed (sentence frames, vocabulary supports, data tables)",
            isMissing: true,
            explanation: "'Hands-on and engaging' says nothing about accessibility. SDC students need specific scaffolds — pre-formatted data tables, sentence frames for analysis, vocabulary references. The AI won't include these unless asked.",
          },
          {
            id: "community-stakes",
            label: "That the harvest goes to real people at a community fridge",
            isMissing: true,
            explanation: "The nutrient decisions students make affect food that real people will eat. That stakes layer changes the entire framing of the experiment — it's not abstract science, it's responsible food production. The AI can't make that connection if it doesn't know about it.",
          },
          {
            id: "hands-on",
            label: "That the activity should be hands-on",
            isMissing: false,
            explanation: "The prompt does specify 'hands-on.' This is one of the few constraints actually present. The problem isn't what's here — it's everything that's not.",
          },
          {
            id: "topic-choice",
            label: "The topic of the experiment (nutrient concentrations and plant growth)",
            isMissing: false,
            explanation: "The prompt names the experiment topic clearly. This is present and sufficient — the AI knows what the experiment is about.",
          },
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
          <h2 className="text-xl font-semibold text-foreground">Description as Infrastructure</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You've now built three sections of your Constitution. Classroom Context tells the AI who your students are. Project Architecture tells it what they're building and where they are in the arc. Pedagogical Values and Subject Content tell it how you teach and what language your students should be using.
            </p>
            <p className="text-muted-foreground mt-3">
              Each section is a layer of description you no longer have to repeat. A prompt that would have taken 200 words now takes 40, because the Constitution carries the rest. That's what pre-loaded description does — it makes every subsequent interaction faster and more precise.
            </p>
          </div>

          <p>
            When you think about it, description is the skill underneath all the others. You can't delegate well if you can't describe what you're delegating. You can't evaluate AI output if you can't describe what good output looks like. You can't use AI responsibly if you can't describe the boundaries. Anthropic put Description alongside Delegation, Discernment, and Diligence for a reason — it's the connective tissue between the other three.
          </p>

          <p>
            The question worth sitting with: how much of what you know about your classroom have you actually written down? Not in lesson plans or IEPs — those exist for other purposes. Written down in a way that another intelligence, human or artificial, could use to produce something genuinely useful for your students?
          </p>

          <p>
            Most teachers carry an enormous amount of context in their heads. The reading levels, the social dynamics, the fact that third period is a different animal than fifth period, the way this particular group responds to sentence frames versus graphic organizers. That knowledge is real and valuable. But AI can't access it until you describe it. Your Constitution is the bridge between what you know and what AI can do with it.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Try This Before the Next Course</p>
            <p className="text-muted-foreground">
              Take your three-section Constitution and ask AI to generate something you need this week — a warm-up, a check-in, a discussion protocol. Then look at what comes back and ask yourself: what did the AI get right because my Constitution told it to? And what did it still miss? Whatever it missed is either something your Constitution needs to say, or something that belongs in a one-time prompt, not the permanent document. Learning to tell the difference is the skill you're building.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Next, you'll tackle the fourth D: knowing when to use AI and when not to. Not every task benefits from a model, and some tasks lose something essential when you hand them off. The Constitution you've built gives you the foundation. The next course gives you the judgment.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="description-101"
      title="Description: The Art of Being Specific"
      sections={sections}
      {...props}
    />
  );
};
