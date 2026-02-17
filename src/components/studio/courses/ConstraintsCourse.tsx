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
          <h2 className="text-xl font-semibold text-foreground">The Scenario</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">It's Week 5 a hydroponics project in your SDC science classroom. Your students just finished their pH baseline readings and they're about to design their nutrient delivery systems. You need a worksheet that bridges the chemistry they've done with the biology they're starting — and you need it by fourth period.



        </p>
            <p className="text-lg italic text-muted-foreground mt-3">So you ask AI for help. What comes back is a generic hydroponics worksheet you could've found on Teachers Pay Teachers. Nothing about pH. Nothing about the butterhead lettuce and collard greens your students chose. Nothing about the fact that half the class is planning to donate their harvest to the travel club on campus.




        </p>
          </div>
          <p>
            The worksheet isn't wrong. It's just useless to you.
          </p>
          <p>
            That gap — between what AI gives you by default and what you actually need — is what
            this course is about. The fix is simpler than you think, and it starts with one idea:
            AI doesn't know what you know. You have to tell it.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Cognitive Load Theory" /> (Sweller) explains why this matters —
            the more you narrow the task, the less noise both you and the AI have to wade through.
          </div>
        </div>

  },
  {
    id: "mental-model",
    type: "mental-model" as const,
    title: "Mental Model",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Constraints Mental Model</h2>
          <p className="text-lg">
            Left to its own devices, AI writes for the average classroom. Average grade level,
            average project, average week. It pattern-matches to the most common version of whatever
            you asked for.
          </p>
          <p>
            Your classroom isn't average. Constraints are how you tell AI what makes yours specific.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Without Constraints:</p>
              <p className="text-sm">"Create a worksheet for my hydroponics project"</p>
              <p className="text-xs text-muted-foreground mt-2">
                → Generic. Could be for any grade, any week, any plant. AI doesn't know your students
                just spent two weeks on pH, so it starts from scratch.
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">With Constraints:</p>
              <p className="text-sm">
                "Create a nutrient delivery planning worksheet for 10th grade SDC science. Students
                just completed pH baseline readings for their hydroponic systems and are designing
                nutrient mixes this week. They're growing basil, peppers, and lettuce. The worksheet
                should take 30 minutes and connect their pH data to nutrient absorption. This is
                Week 5 of a 12-week project ending in community presentations."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                → Specific. Builds on what students already know. Tied to where they're headed.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Five Constraints That Change Everything</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Think of these like mise en place — everything laid out before you start cooking.
          </p>
          <ul>
            <li><strong>Project Phase:</strong> Where are your students in the arc? Week 3 looks nothing like Week 10.</li>
            <li><strong>Prior Work:</strong> What have they already done that this builds on? AI can't reference work it doesn't know about.</li>
            <li><strong>Time Box:</strong> Is this a 15-minute warm-up or a 50-minute deep dive?</li>
            <li><strong>Differentiation:</strong> What scaffolds, reading levels, or extensions does this group need?</li>
            <li><strong>Final Product Connection:</strong> How does today's work connect to what they're building toward?</li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mt-6">
            <p className="text-sm">
              <strong>The through-line:</strong> <ResearchLink text="PBLWorks" /> calls it "Gold Standard"
              design — every activity connects back to a driving question and a public product. If your students
              are presenting to community stakeholders in Week 12, your Week 5 prompt should know that.
            </p>
          </div>
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
      context: "It's Week 7 of a 12-week hydroponics project. Students have built their systems and collected two weeks of growth data. Now they need to analyze what's working and what isn't before adjusting their nutrient mixes.",
      options: [
      {
        id: "A",
        prompt: "Create a data analysis worksheet for students doing a hydroponics project. They need to look at their plant growth data and figure out what's working.",
        isCorrect: false,
        annotations: [
        { text: "a hydroponics project", label: "Which week? What phase?", color: "bg-amber-500/20" },
        { text: "their plant growth data", label: "What data specifically?", color: "bg-amber-500/20" },
        { text: "figure out what's working", label: "No structure for analysis", color: "bg-amber-500/20" }],

        explanation: "This sounds reasonable, but notice — AI doesn't know what data students have, what plants they're growing, or that they're about to adjust nutrient mixes. The output will be a generic data analysis template that could apply to any science class."
      },
      {
        id: "B",
        prompt: "Create a data analysis worksheet for 10th grade SDC science students in Week 7 of a 12-week hydroponics project. Students have been tracking pH levels, nutrient concentration, and stem height for basil, peppers, and lettuce over 2 weeks. They need to identify which variables correlate with growth and prepare recommendations for adjusting their nutrient mixes next week. Include: a data summary table, a guided analysis section connecting pH to nutrient absorption, and a recommendation section where they propose one change with evidence. 30 minutes. Their final presentations to community partners are in Week 12.",
        isCorrect: true,
        annotations: [
        { text: "Week 7 of a 12-week", label: "Project phase", color: "bg-green-500/20" },
        { text: "tracking pH levels, nutrient concentration, and stem height", label: "Prior work", color: "bg-green-500/20" },
        { text: "adjusting their nutrient mixes next week", label: "What comes next", color: "bg-green-500/20" },
        { text: "presentations to community partners are in Week 12", label: "Final product", color: "bg-green-500/20" },
        { text: "30 minutes", label: "Time box", color: "bg-green-500/20" }],

        explanation: "This prompt gives AI everything it needs: where students are, what they've done, what they're doing next, and what they're building toward. The output will be specific enough to use tomorrow with minimal editing."
      }] as
      [
        {id: string;prompt: string;isCorrect: boolean;annotations: {text: string;label: string;color: string;}[];explanation: string;},
        {id: string;prompt: string;isCorrect: boolean;annotations: {text: string;label: string;color: string;}[];explanation: string;}]

    }
  },
  {
    id: "workshop",
    type: "workshop" as const,
    title: "Practice",
    workshopData: {
      title: "Prompt Workshop: Constraints in Practice",
      description: "These templates are starting points — fill in the blanks with your actual project, then see what comes back. The first output is never the final one. That's fine. You're having a conversation.",
      toolLinks: [
      { name: "Claude", url: "https://claude.ai" },
      { name: "Gemini", url: "https://gemini.google.com" }],

      starterPrompts: [
      {
        label: "Mid-Project Checkpoint Activity",
        prompt: `I teach [GRADE/COURSE] and we're in Week [NUMBER] of a [TOTAL]-week project on [TOPIC].

What students have done so far:
- [KEY MILESTONE 1 — e.g., "completed pH baseline readings"]
- [KEY MILESTONE 2 — e.g., "built their hydroponic frames"]
- [KEY MILESTONE 3 — e.g., "selected plants and researched growing conditions"]

What's coming next: [NEXT PHASE — e.g., "designing nutrient delivery systems"]

Create a [TYPE OF ACTIVITY] that:
- Takes about [TIME] minutes
- Connects what they've already done to what's coming next
- Includes [DIFFERENTIATION NEED — e.g., "a visual scaffold for EL students"]

Their final product is [DESCRIBE — e.g., "a community presentation with live plant data"] in Week [NUMBER].`
      },
      {
        label: "Rubric for Interdisciplinary Project",
        prompt: `Create a rubric for a [GRADE] [SUBJECT AREA] project where students [DESCRIBE WHAT THEY'RE DOING].

Project specifics:
- Driving question: [YOUR DRIVING QUESTION]
- Disciplines involved: [LIST — e.g., "biology, chemistry, engineering design"]
- Final product: [WHAT STUDENTS PRESENT/BUILD]
- Audience: [WHO SEES IT — e.g., "community partners and school board members"]

Key milestones students completed:
- [MILESTONE 1]
- [MILESTONE 2]
- [MILESTONE 3]

Use a [NUMBER]-point scale. The rubric should assess both the science content AND the [OTHER DISCIPLINE — e.g., "engineering design process"]. Students chose their own [VARIABLE — e.g., "plants and end-use: donate, cook, or take home"] so account for variation in final products.`
      }],

      iterationTips: [
      "Week number matters. A Week 3 activity and a Week 10 activity for the same project should look completely different. Always say where students are.",
      "Name what students have already produced — data sets, prototypes, research notes. AI can't build on work it doesn't know exists.",
      "If students are presenting to real people at the end, say so. 'Community stakeholders' changes the output more than you'd expect.",
      "First output too generic? Add one constraint about your specific students — their reading levels, their plant choices, what they struggled with last week. That's usually enough."]

    }
  },
  {
    id: "cfu-2",
    type: "cfu" as const,
    title: "Check 2",
    advancedCfuData: {
      id: "constraints-cfu-2",
      type: "identify-missing" as const,
      prompt: "Create a rubric for my students' hydroponics project presentations.",
      context: "A teacher wants AI to generate a rubric for the end-of-project community presentations, but the prompt is thin. What's missing?",
      elements: [
      { id: "project-specifics", label: "What the project actually involves (plants, systems, data)", isMissing: true, explanation: "The rubric should assess what students actually did — pH analysis, system design, nutrient management. Without specifics, AI will generate a generic presentation rubric." },
      { id: "prior-milestones", label: "Milestones students completed during the project", isMissing: true, explanation: "A strong rubric references the journey, not just the destination. If students built systems, collected data, and iterated on designs, the rubric should reflect that work." },
      { id: "audience-context", label: "Who the audience is for the presentations", isMissing: true, explanation: "Presenting to community partners is different from presenting to classmates. The audience shapes what 'proficient' looks like — clarity for non-experts, real-world relevance, poise." },
      { id: "point-scale", label: "Point scale and grading structure", isMissing: true, explanation: "A 4-point rubric and a 100-point rubric produce very different outputs. AI needs to know your system." },
      { id: "ai-tool", label: "Which AI tool to use", isMissing: false, explanation: "Tool choice doesn't affect rubric quality. A well-constrained prompt works in Claude, Gemini, or ChatGPT." },
      { id: "rubric-format", label: "Whether to use a table or list format", isMissing: false, explanation: "Format is a preference, not a constraint. AI will default to a table, which is usually fine. Spend your constraint budget on content, not formatting." }],

      minCorrect: 3
    }
  },
  {
    id: "reflection",
    type: "reflection" as const,
    title: "Reflection",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Reflection</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium mb-2">The Gap</p>
            <p className="text-muted-foreground">
              You already carry an enormous amount of context about your students, your project,
              and where things stand this week. AI carries none of it. Every constraint you add
              is a bridge across that gap.
            </p>
            <p className="text-muted-foreground mt-3">
              Think about what you're teaching right now. What do you know about your students'
              work that AI would need to hear before it could help you?
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Try This Before Your Next Class</p>
            <p className="text-muted-foreground">
              Before your next AI prompt, write down five things first: what week you're in,
              what students just finished, how much time you have, what your students need
              differently from each other, and what they're building toward.
            </p>
            <p className="text-muted-foreground mt-2">
              Then prompt. Notice the difference.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <ResearchLink text="Backward Design" /> (Wiggins & McTighe) says start with the
              end in mind. Same principle here — your constraints should carry your learning
              goals. If AI doesn't know where you're headed, it can't help you get there.
            </p>
          </div>
        </div>

  }];


  return (
    <MicroCourseViewer
      courseId="constraints-101"
      title="Constraints: The Foundation of Useful Prompts"
      sections={sections}
      {...props} />);


};