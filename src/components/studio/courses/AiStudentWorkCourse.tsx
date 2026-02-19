import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface AiStudentWorkCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const AiStudentWorkCourse = (props: AiStudentWorkCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">The Conversation You've Been Avoiding</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              "A student turns in a hydroponics lab report that reads like a peer-reviewed journal article.
              Perfect structure, flawless citations, nuanced analysis of nutrient absorption rates across
              the lettuce and collard greens beds. The student is a sophomore who last week asked you
              what 'pH' stands for. You run the report through an AI detection tool. It comes back:
              '38% probability of AI generation.' What do you do now?"
            </p>
          </div>
          <p>
            That 38% number tells you almost nothing. Detection tools guess based on patterns in word
            choice and sentence structure. They flag non-native English speakers at higher rates. They
            miss AI-generated text that's been lightly edited. They produce different scores when you
            run the same text twice.
          </p>
          <p>
            The anxiety around this is real. You can feel it in faculty meetings, in hallway conversations,
            in the quiet dread of opening a stack of submissions. But the problem isn't that students
            have access to AI. The problem is that most schools have no coherent framework for thinking
            about it — just a patchwork of prohibition and hope.
          </p>
          <p>
            You've already built a Constitution, designed a PBL unit, and practiced evaluating AI outputs.
            This module pulls all of that together into the thing your school actually needs: a
            <strong> classroom AI policy</strong> that's honest about what these tools can and can't do,
            specific enough to guide real decisions, and written so it can evolve as the ground shifts
            beneath it.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            Research on AI detection accuracy from the <ResearchLink text="Stanford Internet Observatory" /> and
            others consistently finds false positive rates between 1-14%, with disproportionate impact on
            multilingual writers.
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
          <h2 className="text-xl font-semibold text-foreground">The Spectrum, Not the Binary</h2>
          <p className="text-lg">
            Most conversations about AI in student work collapse into two positions: ban it or allow
            it. Both are wrong. What you need is a way to think about the space between.
          </p>

          <p>
            Think of it like seasoning in cooking. Salt isn't good or bad — it depends on
            when you add it, how much, and what you're making. A pinch in the bread dough
            changes the chemistry of the rise. A handful dumped on the finished plate ruins
            the meal. The ingredient is the same. The judgment is everything.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">AI Use That Undermines Learning</p>
              <p className="text-sm text-muted-foreground mb-2">
                The student bypasses the thinking the assignment was designed to develop.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Student pastes the prompt and submits whatever comes back</li>
                <li>AI does the analysis the student was supposed to struggle through</li>
                <li>The student can't explain or defend the work</li>
                <li>No evidence the student's understanding changed</li>
              </ul>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">AI Use That Extends Learning</p>
              <p className="text-sm text-muted-foreground mb-2">
                The student uses AI to push their own thinking further than they could alone.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Student drafts first, then uses AI to stress-test their reasoning</li>
                <li>AI raises objections the student must address in their own voice</li>
                <li>The student can explain every choice and defend it</li>
                <li>Evidence of thinking that evolved through the interaction</li>
              </ul>
            </div>
          </div>

          <p>
            The line between these two isn't always obvious. A student who asks AI to explain
            a concept they don't understand — is that undermining or extending? It depends.
            Did they try first? Do they engage with the explanation or just copy it? Can they
            apply it to a new problem afterward? The answer lives in the context, not in the
            act of opening the tool.
          </p>

          <h3 className="text-lg font-semibold">Three Questions That Replace Detection</h3>
          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">1. Can the student explain the work?</p>
                <p className="text-muted-foreground">
                  Not recite it — explain the reasoning, the choices, the trade-offs. A student
                  who did the thinking can answer "Why did you choose this approach over that
                  one?" with specifics. A student who didn't will give you generalities.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">2. Is there evidence of process?</p>
                <p className="text-muted-foreground">
                  Drafts, notes, dead ends, revisions. Thinking leaves traces. AI-generated work
                  arrives fully formed, like Athena from Zeus's forehead — no gestation, no mess.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">3. Does the work connect to what happened in the room?</p>
                <p className="text-muted-foreground">
                  References to class discussions, specific lab observations, peer feedback, the
                  time the pH sensor malfunctioned. These details anchor work in lived experience.
                  AI doesn't have access to what happened fourth period on Tuesday.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20 mt-6">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>Notice the shift:</strong> These questions don't require any detection software.
              They're the same questions good teachers have always asked about student work. AI
              didn't change what authentic learning looks like — it just made the counterfeit
              easier to produce.
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
        id: "ai-student-work-cfu-1",
        type: "guardrail-designer" as const,
        question: "Which student AI uses extend learning, and which undermine it?",
        scenario: "Students in your SDC science class are working on the hydroponics project. These are real situations that will come up.",
        learningObjective: "Distinguish between AI use that develops student thinking and AI use that bypasses it.",
        guardrails: [
          {
            id: "g1",
            name: "Hypothesis Stress-Test",
            description: "A student drafts a hypothesis about why the lettuce bed is underperforming, then asks AI: 'Here's my hypothesis. As a plant scientist, what's wrong with my reasoning?'",
            isAppropriate: true,
            tradeoff: "The student did the thinking first. AI is challenging their reasoning, not providing it. They still have to decide what to do with the critique — and they can explain why they made those choices.",
          },
          {
            id: "g2",
            name: "Lab Report Generator",
            description: "A student pastes the assignment rubric and their raw data into AI and asks it to write the lab report.",
            isAppropriate: false,
            tradeoff: "The lab report exists to make the student organize, analyze, and interpret their data. If AI does that work, the student has data they collected but never thought about. The product looks right; the learning didn't happen.",
          },
          {
            id: "g3",
            name: "Concept Clarifier",
            description: "A student can't remember what 'electrical conductivity' measures in the nutrient solution. They ask AI to explain it, then write a summary in their own words in their lab notebook.",
            isAppropriate: true,
            tradeoff: "This is a reference use — like looking something up in a textbook, but faster. The student processes and restates the information. The risk is low as long as they're not using AI to bypass the analytical work that follows.",
          },
          {
            id: "g4",
            name: "Reflection Ghost-Writer",
            description: "A student asks AI to write their weekly project reflection based on bullet points about what happened.",
            isAppropriate: false,
            tradeoff: "The reflection is where students make sense of their experience — connecting what happened to what they're learning. Outsourcing this to AI produces a polished summary but no actual sense-making. The student described events; AI did the reflecting.",
          },
          {
            id: "g5",
            name: "Data Interpretation Challenger",
            description: "A student writes their interpretation of the growth data, then asks AI: 'I concluded X based on this data. A skeptical peer would say I'm wrong because ___. Fill in the blank and explain why.'",
            isAppropriate: true,
            tradeoff: "The student formed their own conclusion first. AI plays devil's advocate — surfacing weaknesses the student then has to address. The final interpretation is stronger because it survived a challenge, and the student can explain how.",
          },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Draft Your Classroom AI Policy",
        description: "You've built a Constitution, a PBL unit, evaluation standards, and authenticity structures. Now write the policy that ties it all together — one document you could hand to a student, a parent, or your principal. Use AI to draft it, then stress-test it against the hardest questions you can imagine. A policy that can't survive scrutiny isn't ready for your classroom.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "AI Policy Draft Generator",
            prompt: `I'm a teacher at a public high school in Los Angeles. I need to write a classroom AI policy for my students. Here's my context:

[PASTE YOUR CONSTITUTION]

My policy needs to address:
1. WHEN students may use AI (which assignments, which phases of project work)
2. HOW students should use AI (what productive use looks like — student drafts first, AI as thinking partner, evidence of the student's own reasoning)
3. WHAT counts as misuse (submitting AI output as your own thinking, using AI to bypass the struggle the assignment is designed to create)
4. HOW we handle concerns (conversation first, not accusation — what happens when I have questions about a student's work)
5. WHAT students must document (how they used AI, what they changed, what they rejected and why)

Write this in language a 10th grader at my school would understand. Be specific — no vague "use AI responsibly" statements. Every guideline should be concrete enough that a student knows exactly what it means in practice.

Include a section on what I commit to as the teacher: how I'll design assignments that make authentic work worthwhile, how I'll have honest conversations when questions arise, and how this policy will evolve as we learn together.`,
          },
          {
            label: "Policy Stress-Test",
            prompt: `Here is my draft classroom AI policy:

[PASTE YOUR DRAFT POLICY]

Stress-test this policy against these scenarios. For each one, tell me whether my policy gives clear guidance or leaves a gap:

1. A student uses AI to brainstorm ideas, then writes the entire project independently. Is this allowed? Is it clear?
2. A student asks AI to explain a concept they don't understand, then uses that understanding in their work without citing AI. Does my policy address this?
3. A student's work suddenly improves dramatically. I suspect AI but have no proof. What does my policy tell me to do?
4. A parent asks why their child is "allowed to cheat with AI." Does my policy give me a clear answer?
5. A student with an IEP uses AI as an accommodation tool in ways that go beyond my stated guidelines. Does my policy account for this?
6. Two students collaborate — one drafts, the other uses AI to critique the draft, and they revise together. Is this covered?
7. A student uses AI for one assignment where it's prohibited, then argues "but I learned from it." What happens?

For each gap you find, suggest specific language I could add.`,
          },
        ],
        iterationTips: [
          "Run your draft past the hardest scenario you can imagine — the angry parent email, the student who found a loophole, the administrator who wants a zero-tolerance rule.",
          "Include what YOU commit to, not just what students must do. A policy that only restricts students without holding the teacher accountable won't earn trust.",
          "Build in a revision date. Write it into the policy: 'This policy will be revisited in [month]. Student input will shape the revision.'",
          "Test the reading level. If a 10th grader at your school couldn't read it cold and explain the main rules, it's not ready.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "ai-student-work-cfu-2",
        type: "identify-missing" as const,
        prompt: "Students may use AI as a research and thinking tool during project work time. AI should not be used to generate final deliverables.",
        context: "A teacher's draft classroom AI policy. What critical elements are missing?",
        elements: [
          {
            id: "specificity",
            label: "Concrete examples of what 'thinking tool' vs. 'generating final deliverables' looks like in practice",
            isMissing: true,
            explanation: "A student reading this policy can't tell whether asking AI to critique their draft counts as a 'thinking tool' or 'generating a deliverable.' Without examples tied to actual assignments, the policy is open to interpretation — and every interpretation will be different.",
          },
          {
            id: "process",
            label: "What students should do BEFORE using AI (draft first, attempt first)",
            isMissing: true,
            explanation: "The policy allows AI 'during project work time' but doesn't specify that students must bring their own thinking to the interaction first. Without this, students open AI with a blank page and let it lead.",
          },
          {
            id: "documentation",
            label: "How students should document their AI use (what they asked, what they kept, what they changed)",
            isMissing: true,
            explanation: "No documentation requirement means no accountability and no visibility into how students actually used the tool. You can't coach productive AI use if you can't see the interaction.",
          },
          {
            id: "conversation",
            label: "What happens when a teacher has concerns about a student's work (conversation protocol, not accusation)",
            isMissing: true,
            explanation: "The policy says what's allowed and what isn't, but doesn't address the inevitable gray areas. Without a clear 'what happens next' — starting with conversation, not confrontation — teachers default to accusation and students default to defensiveness.",
          },
          {
            id: "revision",
            label: "A date or process for revising the policy as practice evolves",
            isMissing: true,
            explanation: "AI tools change every few months. Student behavior shifts. Teacher understanding deepens. A policy without a built-in revision mechanism becomes outdated the moment it's published and rigid when it should be learning.",
          },
          {
            id: "ai-allowed",
            label: "Statement that AI is permitted for use",
            isMissing: false,
            explanation: "The policy does state that students may use AI as a research and thinking tool. This element is present.",
          },
          {
            id: "scope",
            label: "When AI use applies (during project work time)",
            isMissing: false,
            explanation: "The policy specifies 'during project work time' as the window for AI use. This time-bound scope is present, though it could be more specific about which assignments.",
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
          <h2 className="text-xl font-semibold text-foreground">What You Built and What Comes Next</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium mb-2">Your Classroom AI Policy</p>
            <p className="text-muted-foreground">
              You have a draft policy grounded in your Constitution, tested against real scenarios, and
              written in language your students can follow. This isn't a final document — it's a first
              version you can actually use. The stress-test revealed gaps; some you patched, some you'll
              discover in practice. That's the design.
            </p>
          </div>

          <p>
            A policy is a living score, not a carved tablet. The best ones change shape as you play
            them — a phrase gets rewritten after a student conversation you didn't anticipate, a
            section gets sharper after a parent asks a question you hadn't considered. The revision
            date you built in isn't a formality. Use it.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">The Honest Conversation</p>
            <p className="text-muted-foreground">
              When you share this policy with students, read it with them. Don't just distribute it.
              Ask them where they think the gray areas are. Ask what they'd add. Their input doesn't
              weaken the policy — it makes it something they helped build, which means they're more
              likely to follow it because they understand the reasoning, not because they fear the
              consequence. The conversation about the policy IS the policy working.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Add to Your Constitution</p>
            <p className="text-muted-foreground">
              Your policy now lives alongside your Constitution. Add a reference to it: "My classroom
              AI policy is a living document. It reflects my values about learning, my commitment to
              honest conversation, and my belief that students can use these tools thoughtfully when
              the structures support them."
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              <strong>What you can do tomorrow:</strong> Pick one class. Share the policy draft. Read
              it together. Ask your students what they think is fair and what seems unclear. Take notes.
              Revise. That's the work.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="ai-student-work-301"
      title="AI in Student Work: Detection, Policy & Honest Conversation"
      sections={sections}
      {...props}
    />
  );
};
