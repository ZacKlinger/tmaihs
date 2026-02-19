import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface WhenToUseCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const WhenToUseCourse = (props: WhenToUseCourseProps) => {
  const sections = [
    {
      id: "context",
      type: "context" as const,
      title: "The Scenario",
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Week 11, After School</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              One of your SDC students stays after class. She's been quiet all semester, but today she pulled you aside to show you something — a hand-drawn diagram of her hydroponic system with annotations in two languages, Spanish labels for her grandmother who's coming to the community presentation, English labels for the school board. She wants to know if it's good enough.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">
              You could ask AI to generate presentation feedback for her. It would be fast, and it would probably be reasonable. But standing in that hallway, looking at a diagram that represents something no language model could have produced — a student bridging two worlds for two audiences she actually cares about — you know this isn't an AI moment. This is yours.
            </p>
          </div>
          <p>
            The previous three courses built your Constitution: who your students are, what they're building, who the stakeholders are, and what quality looks like. That document makes AI genuinely useful. But useful doesn't mean universal. Some moments in teaching belong to AI. Some belong to you. And the line between them isn't always obvious.
          </p>
          <p>
            This course is about drawing that line with intention rather than instinct. You'll build a working taxonomy — delegate, collaborate, protect — and then write the most important section of your Constitution: what you actually believe your students can achieve. Not the standard. Not the benchmark. Your vision. That vision becomes the mandate AI works from in everything that follows.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Nell Noddings' ethic of care" /> argues that the teacher-student relationship is itself the medium of education — not a supplement to it. Some of what makes teaching work can't be delegated without changing what teaching is.
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
          <h2 className="text-xl font-semibold text-foreground">Three Categories, Not Two</h2>
          <p className="text-lg">
            Most conversations about AI in classrooms collapse into yes or no. Use it or don't. But the real question has three answers, and each one requires a different kind of reasoning.
          </p>

          <div className="space-y-4 my-6">
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <p className="font-medium text-green-700 dark:text-green-300 mb-2">Delegate</p>
              <p className="text-sm text-muted-foreground">Tasks where AI does the bulk of the work and your role is quality control. These are high-volume, low-uniqueness tasks that don't require your specific knowledge of individual students.</p>
              <p className="text-sm mt-2"><strong>Examples:</strong> Generating quiz question banks from your content. Formatting data tables for student worksheets. Creating multiple reading-level versions of an informational text. Drafting parent communication templates.</p>
              <p className="text-xs text-muted-foreground mt-2 italic">The test: Could a competent substitute do this task with your lesson plan? Then AI probably can too, with your Constitution.</p>
            </div>

            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="font-medium text-primary mb-2">Collaborate</p>
              <p className="text-sm text-muted-foreground">Tasks where you and AI work together — you bring the judgment, AI brings the throughput. You're steering, editing, iterating. The output wouldn't exist without both of you.</p>
              <p className="text-sm mt-2"><strong>Examples:</strong> Designing scaffolded activities for a specific project phase. Drafting rubrics that reflect your actual grading philosophy. Creating differentiated versions of an assessment that match real student profiles. Simulating stakeholder feedback for presentation prep.</p>
              <p className="text-xs text-muted-foreground mt-2 italic">The test: Does this need your knowledge of these particular students and this particular moment? Then collaborate — don't hand it off.</p>
            </div>

            <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
              <p className="font-medium text-destructive mb-2">Protect</p>
              <p className="text-sm text-muted-foreground">Moments where AI involvement would diminish something essential. Relationship-building. Cultural responsiveness. The read you get from a student's face when they finally understand something. These aren't tasks — they're the substance of what you do.</p>
              <p className="text-sm mt-2"><strong>Examples:</strong> Responding to a student who just shared something personal. Noticing that a quiet student drew a bilingual diagram for her grandmother. Deciding in real-time that a group needs to slow down and talk instead of produce. Making a judgment call about when a student is ready for independence.</p>
              <p className="text-xs text-muted-foreground mt-2 italic">The test: Would a student know the difference between your response and an AI's? If yes — protect it.</p>
            </div>
          </div>

          <p>
            Think of it like running a kitchen. Some tasks you delegate to a prep cook — chopping, measuring, organizing mise en place. Some tasks you do together — adjusting seasoning, plating, timing the courses. But tasting the food and deciding when it's right? That's yours. The prep cook makes you faster. The prep cook doesn't make you unnecessary.
          </p>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="font-medium text-foreground mb-3">What Gets Lost When We Don't Draw the Line</p>
            <p className="text-sm text-muted-foreground">
              When AI replaces instead of augments, three things erode quietly. First, <strong>relationships</strong> — a student who gets AI-generated feedback instead of your feedback receives information but not recognition. Second, <strong>cultural knowledge</strong> — AI doesn't know that a bilingual diagram means something different in your classroom than it would in a generic one. Third, <strong>the moment a student's eyes change</strong> — that instant where confusion becomes understanding, where you see it happen and they see that you see it. No AI output replicates the experience of being witnessed by someone who knows you.
            </p>
          </div>

          <p>
            None of this means AI is wrong for teaching. It means the decision about where to use it is itself a teaching decision — one that reflects what you value, not just what's efficient.
          </p>

          <p className="text-sm text-muted-foreground mt-2">
            <ResearchLink text="Zaretta Hammond's culturally responsive teaching framework" /> makes the case that learning is fundamentally relational. The neural pathways for higher-order thinking are built through trust, belonging, and intellectual challenge from someone the student knows and trusts. AI can provide the challenge. It can't provide the trust.
          </p>
        </div>
      ),
    },
    {
      id: "cfu-1",
      type: "cfu" as const,
      title: "Check 1",
      advancedCfuData: {
        id: "when-to-use-it-cfu-1",
        type: "guardrail-designer" as const,
        question: "Sort these classroom AI use cases: which should you delegate to AI, which require collaboration, and which should you protect from AI entirely?",
        scenario: "You're in Week 12 of the hydroponics project. Students are preparing for community presentations in four weeks. You have SDC students at varying reading levels, stakeholders with different concerns, and a packed schedule. Your Constitution is complete. Here are five tasks on your plate this week.",
        learningObjective: "Distinguish between tasks appropriate for AI delegation, AI collaboration, and human-only judgment based on whether the task requires relational knowledge, cultural responsiveness, or high-volume production.",
        guardrails: [
          {
            id: "g1",
            name: "Generate three reading-level versions of the presentation rubric",
            description: "You need the same rubric at 6th, 8th, and 10th grade reading levels so every student can self-assess. The content stays the same — only the language complexity changes.",
            isAppropriate: true,
            tradeoff: "Delegate. This is high-volume formatting work. Your Constitution already defines the quality standards and reading levels. AI can produce all three versions in minutes. Your job is to check that the simplified versions don't lose essential meaning — but the generation itself doesn't require your knowledge of individual students.",
          },
          {
            id: "g2",
            name: "Decide whether Marcus is ready to present independently or needs a partner",
            description: "Marcus has been building confidence all semester. He volunteered to present alone last week but froze during practice. You're not sure if pairing him would feel supportive or like a step backward.",
            isAppropriate: false,
            tradeoff: "Protect. This is a judgment call built on twelve weeks of watching Marcus — his body language, his relationship with specific classmates, what 'freezing' means for him versus for another student. AI can't know that pairing Marcus with Daniela would feel safe but pairing him with Jaylen would feel like being rescued. This is yours.",
          },
          {
            id: "g3",
            name: "Draft practice questions from the community fridge coordinator's perspective",
            description: "Students need to rehearse fielding tough questions from stakeholders. You want questions that sound like what the actual fridge coordinator would ask — about reliability, volume, and what happens after the semester.",
            isAppropriate: true,
            tradeoff: "Collaborate. Your Stakeholder Map gives AI the coordinator's concerns, communication style, and likely objections. AI can generate realistic questions from that profile. But you'll need to review them — does this sound like the person your students will actually face? Are the questions calibrated to challenge without overwhelming? You steer, AI drafts.",
          },
          {
            id: "g4",
            name: "Respond to a parent email asking why their child's grade dropped",
            description: "A parent noticed their child's project grade went from a B to a C- after the data analysis phase. They want to understand what happened and how their child can improve before the final presentation.",
            isAppropriate: true,
            tradeoff: "Collaborate. AI can draft a professional, empathetic response using your Constitution's quality standards and the student's specific project context. But you need to add the details only you know — what you've observed about this student's effort, where they got stuck, what specific next steps make sense for them. AI handles structure and tone; you supply the substance that makes it personal.",
          },
          {
            id: "g5",
            name: "Notice that the group in the back corner has stopped working and start a conversation about why",
            description: "Three students have been off-task for fifteen minutes. Their hydroponic system had a nutrient burn last week and they seem discouraged. You need to figure out whether this is frustration, confusion, a group dynamic issue, or all three.",
            isAppropriate: false,
            tradeoff: "Protect. This moment requires reading the room — literally. Tone of voice, crossed arms, who's looking at whom, what they're not saying. It also requires a relationship: these students need to trust that you're approaching them to help, not to discipline. AI could suggest conversation starters after the fact, but the act of noticing, approaching, and responding in real time is irreplaceably human.",
          },
        ],
      },
    },
    {
      id: "workshop",
      type: "workshop" as const,
      title: "Practice",
      workshopData: {
        title: "Build Your Constitution: Section 5 — Teacher's Vision for Student Outcomes",
        description: "This is the final section of your Constitution — and arguably the most important one. Sections 1 through 4 told AI about your classroom, your project, your stakeholders, and your quality standards. Section 5 tells AI what you believe your students can actually become. Not the state standard. Not the district benchmark. Your vision. When AI has this, every output it generates aims at something real.",
        toolLinks: [
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
        ],
        starterPrompts: [
          {
            label: "Constitution Section 5: Teacher's Vision for Student Outcomes",
            prompt: `TEACHER'S VISION FOR STUDENT OUTCOMES — save this as the fifth and final section of your AI Classroom Constitution.

By the end of this project, I want my students to be able to:

INTELLECTUAL OUTCOMES:
- [WHAT SHOULD THEY UNDERSTAND? — e.g., "explain the relationship between pH, nutrients, and plant growth using their own data"]
- [WHAT SHOULD THEY BE ABLE TO DO? — e.g., "make evidence-based decisions when something isn't working, not just guess"]
- [HOW SHOULD THEY THINK? — e.g., "approach a system failure as a problem to diagnose, not a reason to quit"]

HUMAN OUTCOMES:
- [WHAT SHOULD THEY FEEL? — e.g., "ownership of something real that their community depends on"]
- [HOW SHOULD THEY RELATE? — e.g., "speak to adults with different concerns — a fridge coordinator, a board member — and hold their ground"]
- [WHO SHOULD THEY BECOME? — e.g., "someone who has fed real people with something they grew with their own hands"]

THE VISION IN ONE SENTENCE:
[Write one sentence that captures what success looks like for your students — not the grade, not the standard, the thing that matters. e.g., "My students will stand in front of their community and explain, with evidence, how they grew food that feeds families — and they'll know they did it themselves."]

WHAT AI SHOULD NEVER REPLACE IN THIS PROJECT:
- [e.g., "the moment a student realizes their data tells a story"]
- [e.g., "the conversation where a group decides to change their approach"]
- [e.g., "the pride of presenting something they built from scratch"]

---
TEST IT: Paste your complete five-section Constitution into an AI tool and ask it to design a Week 14 presentation preparation activity. Does the output aim at your vision — both the intellectual outcomes and the human ones? Does it protect the moments you listed? If not, revise until it does.`,
          },
          {
            label: "Test Your Complete Constitution",
            prompt: `[PASTE YOUR COMPLETE FIVE-SECTION CONSTITUTION]

---

I've just completed my AI Classroom Constitution. I want to stress-test it.

Please do three things:

1. Read through all five sections and identify any gaps — places where a new AI session might misunderstand my classroom, my project, or my students.

2. Generate a Week 14 activity that prepares students for their community presentations. The activity should reflect my vision for student outcomes (Section 5), use my quality standards (Section 4), and involve at least one stakeholder perspective from my map (Section 3).

3. After generating the activity, flag any places where the output doesn't match my stated vision or quality standards. Be specific about what's misaligned and why.

I want to see whether this Constitution is complete enough to guide useful AI output on its own.`,
          },
        ],
        iterationTips: [
          "Your vision statement should make you feel something. If it reads like a learning objective, it's too clinical. If it reads like a greeting card, it's too vague. Aim for the sentence you'd say to a colleague who asked what you're really trying to do with this project.",
          "The 'What AI Should Never Replace' list is your boundary document. When you're tempted to delegate something, check it against this list. If it's on there, protect it — even when you're short on time.",
          "Human outcomes are harder to write than intellectual ones because we don't usually put them in curriculum documents. But they're often the reason you teach the way you teach. Name them.",
          "Test the complete Constitution by asking AI for something ambitious — a full lesson plan, a differentiated assessment, a stakeholder simulation. If the output misses something, the Constitution is telling you where it needs another sentence.",
        ],
      },
    },
    {
      id: "cfu-2",
      type: "cfu" as const,
      title: "Check 2",
      advancedCfuData: {
        id: "when-to-use-it-cfu-2",
        type: "identify-missing" as const,
        prompt: "By the end of this project, my students will understand hydroponics, present their findings, and meet the NGSS performance expectations for LS1-5 and ESS3-3.",
        context: "A teacher wrote this as their vision statement for Constitution Section 5 — Teacher's Vision for Student Outcomes. It's the final section, the one that tells AI what success actually looks like. Read it carefully. What's missing?",
        elements: [
          {
            id: "human-outcomes",
            label: "Human outcomes — who students become, not just what they know",
            isMissing: true,
            explanation: "The statement is entirely cognitive. Where's the student who feeds her neighborhood? The one who learns to speak to adults with authority? The one who discovers she can diagnose a system failure and fix it? AI doesn't know to aim at these outcomes unless you name them.",
          },
          {
            id: "specificity",
            label: "Specificity about what 'understand hydroponics' actually means",
            isMissing: true,
            explanation: "'Understand hydroponics' could mean anything from memorizing vocabulary to diagnosing nutrient deficiencies from data patterns. AI needs to know which kind of understanding you're after. 'Explain the relationship between pH levels and nutrient absorption using their own growth data' gives AI something to design toward.",
          },
          {
            id: "protected-moments",
            label: "Moments or experiences that AI should not replace",
            isMissing: true,
            explanation: "Without a 'don't touch' list, AI will optimize for efficiency across everything — including the moments that matter most. The student presenting her bilingual diagram. The group conversation after a system failure. The pride of harvesting food they grew. These need to be named or they'll be optimized away.",
          },
          {
            id: "vision-sentence",
            label: "A single sentence that captures what success really looks like",
            isMissing: true,
            explanation: "Standards tell AI what to assess. A vision sentence tells AI what to aim at. 'My students will stand in front of their community and explain, with evidence, how they grew food that feeds families' is a different target than 'meet NGSS LS1-5.' Both matter, but the vision is what makes the Constitution yours.",
          },
          {
            id: "standards-listed",
            label: "NGSS standards alignment",
            isMissing: false,
            explanation: "The standards are there, and they belong in a Constitution. AI can reference them for assessment design and content alignment. This part is fine — it's just not sufficient on its own.",
          },
          {
            id: "presentation-mentioned",
            label: "Reference to presentations as a final product",
            isMissing: false,
            explanation: "Mentioning the presentation gives AI the endpoint. That's useful context. The issue isn't what's present — it's what's absent alongside it.",
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
          <h2 className="text-xl font-semibold text-foreground">Five Sections. One Document. Your Classroom.</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              Your AI Classroom Constitution is complete. Five sections, built across four courses, each one grounded in your actual classroom:
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p><strong>Section 1 — Classroom Context:</strong> Who your students are, how your room works, what they need.</p>
              <p><strong>Section 2 — Project Architecture:</strong> What they're building, where they are in the arc, what's coming next.</p>
              <p><strong>Section 3 — Stakeholder & Perspective Map:</strong> The real people around your project and what they care about.</p>
              <p><strong>Section 4 — Quality Standards:</strong> What "good enough to use" means for your students, your scaffolds, your grading.</p>
              <p><strong>Section 5 — Teacher's Vision for Student Outcomes:</strong> What you believe your students can achieve — the intellectual outcomes, the human ones, and the moments you'll protect.</p>
            </div>
            <p className="text-muted-foreground mt-4">
              This document is the seed of everything that follows. Not a prompt — a foundation. Paste it into any AI session and the outputs start from a place that knows your classroom, not a generic one.
            </p>
          </div>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">What Changes in Tier 2</p>
            <p className="text-muted-foreground">
              You've built a document that teaches AI about your classroom. In the next three courses, you'll use that document to build something with it — a complete PBL unit, backwards-planned from your vision, differentiated for your students, and ready to teach. Your Constitution is the input. The unit is the output. Everything you've practiced with constraints, roles, iteration, and boundary-setting applies directly. The work shifts from describing your classroom to designing what happens inside it.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Before you start Tier 2, read your complete Constitution one more time. Read it as if you were the AI receiving it for the first time. Is the vision clear enough that a model could aim at it? Are the protected moments specific enough that a model would know to leave them alone? Is there anything about your students that matters to you but isn't on the page yet? This is the last quiet moment before you start building. Make it count.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <MicroCourseViewer
      courseId="when-to-use-it-101"
      title="When to Use It. When Not To."
      sections={sections}
      {...props}
    />
  );
};
