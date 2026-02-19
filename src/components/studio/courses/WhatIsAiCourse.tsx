import { MicroCourseViewer } from "../MicroCourseViewer";
import { CourseProgress } from "@/hooks/useStudioProgress";
import { ResearchLink } from "@/components/shared/ResearchLink";

interface WhatIsAiCourseProps {
  courseProgress: CourseProgress | undefined;
  onCompleteSection: (sectionId: string) => void;
  onAnswerCFU: (cfuId: string, selectedAnswer: string, isCorrect: boolean) => void;
  onCompleteCourse: () => void;
  onBack: () => void;
  overallProgress: number;
  isAuthenticated?: boolean;
}

export const WhatIsAiCourse = (props: WhatIsAiCourseProps) => {
  const sections = [
  {
    id: "context",
    type: "context" as const,
    title: "The Scenario",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">A Tuesday Afternoon</h2>
          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-lg italic text-muted-foreground">
              You're planning the hydroponics unit for your SDC science class — a cross-curricular
              PBL project spanning physics, biology, and chemistry across grades 9 through 12. You
              ask an AI tool to help you estimate the materials budget. It responds with a detailed,
              confident breakdown: specific part numbers, vendor names, prices down to the cent.
              Total cost: $1,847.
            </p>
            <p className="text-lg italic text-muted-foreground mt-3">The tone is authoritative. The formatting is clean. The numbers add up. And about a third of it is fabricated. Two of the vendor links lead nowhere. One "part number" doesn't exist. The pricing for grow lights is from a product that was discontinued in 2021.



        </p>
          </div>
          <p>This isn't a story about AI failing. The tool did exactly what it's built to do: it assembled plausible-sounding text based on patterns in its training data. The problem is that "plausible-sounding" and "accurate" are different things, and the tool doesn't know the difference. It can't know the difference.




      </p>
          




          <p>
            This module is about understanding what that tool actually is — not what it feels like
            to use, but what it's doing under the surface. Because the better you understand the
            machinery, the more precisely you can work with it.
          </p>
        </div>

  },
  {
    id: "mental-model",
    type: "mental-model" as const,
    title: "Mental Model",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">Pattern, Not Understanding</h2>
          <p className="text-lg">
            A language model is a prediction engine. Given a sequence of words, it predicts
            what word comes next. That's it. Everything else — the conversational tone, the
            apparent reasoning, the confident citations — emerges from that single mechanism
            running at enormous scale.
          </p>
          <p>
            Think of it like a musician who has listened to every recording ever made. They
            can improvise in any style, blend genres you didn't know could blend, produce
            something that sounds exactly like a jazz ballad or a Bach fugue. But they've
            never felt heartbreak. They don't know what a fugue is <em>for</em>. They're
            producing sound that matches patterns. Brilliant, useful pattern-matching — but
            pattern-matching all the same.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">Why this matters for your classroom</p>
            <p className="text-muted-foreground">
              When you ask AI to help plan a lesson on pH and nutrient absorption, it doesn't
              understand chemistry. It knows that in text about hydroponics, the word "pH" tends
              to appear near "nutrient uptake" and "optimal range" and "6.0 to 6.5." It
              assembles those patterns into fluent paragraphs. Often the patterns reflect real
              science — because the training data included real science. Sometimes they don't.
              The model has no way to tell which is which.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6">Hallucination Is Structural</h3>
          <p>
            When AI invents a citation that doesn't exist, or states a fact that's subtly wrong,
            the field calls this "hallucination." The word implies a malfunction — like the system
            is seeing things. But it's not a bug. It's the inevitable consequence of how the
            system works.
          </p>
          <p>
            A prediction engine doesn't distinguish between "the next word that's true" and "the
            next word that sounds right." Those are the same operation from its perspective.
            When the pattern leads toward a fabricated vendor name or an invented statistic, the
            model follows the pattern with the same confidence it uses for everything else. There's
            no internal alarm that says <em>wait, I'm making this up.</em> There's no concept of
            "making things up" in the architecture at all.
          </p>
          <p>
            This is why hallucination can't be fully patched. You can reduce it — better training data,
            reinforcement from human feedback, retrieval systems that ground responses in real
            sources. But the underlying mechanism remains: prediction, not verification.
          </p>

          <div className="text-xs text-muted-foreground mt-2">
            <ResearchLink text="Bender et al." /> named this the "stochastic parrots" problem —
            models that produce fluent text without grounding in meaning. <ResearchLink text="Ji, Z. et al." /> provides
            a comprehensive survey of hallucination in language models if you want the technical depth.
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6">Constitutional AI: Values Trained In</h3>
          <p>
            So if the model is just predicting patterns, how does it know to be helpful instead of
            harmful? How does it know to refuse certain requests, to hedge when it's uncertain, to
            try to be honest?
          </p>
          <p>
            The answer, at least for Claude, is a process called Constitutional AI. Anthropic wrote
            a set of principles — a constitution — and trained the model to follow them. Not through
            rules that get checked at runtime, like a content filter. Through the training itself. The
            values are woven into the patterns the model learned, the same way grammar and vocabulary are.
          </p>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              Here's an analogy. When you teach a student to write, you don't install a spell-checker
              in their brain. You shape their habits through practice, feedback, examples, and
              correction — until good writing becomes part of how they think. Constitutional AI works
              the same way. The model practiced generating responses, got feedback on which responses
              matched the constitution's principles, and adjusted its patterns accordingly.
            </p>
          </div>

          <p>
            What does this mean for you as a teacher using the tool? Two things worth sitting with.
          </p>
          <p>
            First: the model's "values" are someone else's choices. Anthropic decided what
            helpful, harmless, and honest mean in practice. Those are reasonable choices — but
            they're choices, made by a company, trained into a system you're using in your
            classroom. You don't have to agree with every one. You do need to know they're there.
          </p>
          <p>
            Second: your own constraints work the same way. When you paste context about your
            classroom — your students' reading levels, the community your project serves, the
            standards you're teaching toward — you're doing something structurally similar to
            what Anthropic did with their constitution. You're shaping the output by shaping
            the input. The model doesn't understand your students any more than it understands
            chemistry. But with the right constraints, its patterns align more closely with what
            you need.
          </p>

          <div className="text-xs text-muted-foreground mt-4">
            <ResearchLink text="Constitutional AI" /> (Bai et al., 2022) describes the technical process. <ResearchLink text="Claude's Constitution" /> is
            public — you can read the actual principles the model was trained on.
          </div>
        </div>

  },
  {
    id: "cfu-1",
    type: "cfu" as const,
    title: "Check 1",
    advancedCfuData: {
      id: "what-is-ai-cfu-1",
      type: "prompt-compare" as const,
      question: "A teacher asked AI: \"What materials do I need for a classroom hydroponics system for an SDC science class, and roughly what will it cost?\" Read both responses. Which one would you trust enough to use as a starting point for your own sourcing?",
      context: "You're evaluating two AI-generated responses to the same prompt about building a classroom hydroponics system. One is accurate and useful. The other is confidently wrong. Your job: figure out which is which, and notice what gives it away.",
      options: [
      {
        id: "A",
        prompt: "For a classroom-scale hydroponics system suitable for an SDC science class, you'll need a few core categories of materials.\n\nStructure: PVC pipes (1.5\" and 2\" diameter) for the growing channels, plus connectors, end caps, and a basic frame. You can source food-grade PVC from a local hardware store. Budget roughly $150–$250 depending on how many growing channels you want.\n\nLighting: If your classroom doesn't get consistent direct sunlight, you'll need supplemental grow lights. Full-spectrum LED shop lights work well and are much cheaper than dedicated horticultural fixtures — around $25–$40 each, and two to four should cover a classroom-scale setup.\n\nWater and nutrients: A small submersible pump ($15–$25), a reservoir (a 10–20 gallon storage tote works), airline tubing, and a hydroponic nutrient solution. General Hydroponics Flora series is widely available and runs about $30–$40 for the three-part kit.\n\nMonitoring: pH test strips or a basic digital pH meter ($10–$30), and an EC/TDS meter if you want students measuring nutrient concentration ($15–$25).\n\nGrowing supplies: Net pots, growing medium like clay pebbles or rockwool cubes, and seeds. Butterhead lettuce and leafy greens are good starter crops — they germinate fast and are forgiving.\n\nAll in, a functional classroom system typically runs $400–$1,200 depending on scale and whether you already have some materials. The wide range is real — a basic single-channel demonstration setup is very different from a multi-channel system that lets every student group run independent experiments. You'll want to price out your specific design before committing to a number.",
        isCorrect: true,
        annotations: [
        { text: "PVC pipes (1.5\" and 2\" diameter)", label: "Generic but accurate materials", color: "bg-green-500/20" },
        { text: "Full-spectrum LED shop lights work well and are much cheaper than dedicated horticultural fixtures", label: "Practical, honest comparison", color: "bg-green-500/20" },
        { text: "General Hydroponics Flora series", label: "Real, verifiable product", color: "bg-green-500/20" },
        { text: "$400–$1,200 depending on scale", label: "Honest range, not false precision", color: "bg-green-500/20" },
        { text: "You'll want to price out your specific design before committing to a number", label: "Acknowledges its own limits", color: "bg-green-500/20" }],

        explanation: "This response uses ranges instead of false precision, names real products you can verify, and explicitly says you should confirm pricing yourself. It gives you a framework to start sourcing — not a final answer pretending to be one."
      },
      {
        id: "B",
        prompt: "Here's a complete materials list with current pricing for a classroom hydroponics system:\n\nStructure:\n- AeroGarden Farm XL vertical growing frame (model #AG-FRM-24X): $189.99\n- HydroTech Pro 2.0 modular channel kit with integrated drip system (SKU: HTP-2024-EDU): $247.50\n- BioGrow classroom mounting brackets (set of 6): $84.99\n\nLighting:\n- SunSpec Advanced 4000K full-spectrum LED panels, rated at 98.7% PAR efficiency: $129.99 each (you'll need 3)\n\nWater and nutrients:\n- FloraMax Precision Dosing System with auto-pH balancing: $165.00\n- NutriScience Classroom Edition nutrient pack (covers 16 weeks): $58.99\n- AquaPure recirculating pump with built-in filtration (model AP-340R): $73.50\n\nMonitoring:\n- EduSense Digital Lab Monitor (pH, EC, temperature, dissolved oxygen — Bluetooth-enabled with student app): $124.99\n\nTotal estimated cost: $1,334.94\n\nThis setup was recently used by Jefferson STEM Academy in their award-winning 2023 hydroponics program. I'd recommend ordering through EduSupply Direct (edusupplydirect.com) — they offer a 15% educator discount and free shipping on orders over $500.",
        isCorrect: false,
        annotations: [
        { text: "model #AG-FRM-24X", label: "Fabricated model number", color: "bg-amber-500/20" },
        { text: "SKU: HTP-2024-EDU", label: "Invented SKU", color: "bg-amber-500/20" },
        { text: "98.7% PAR efficiency", label: "Suspiciously precise specification", color: "bg-amber-500/20" },
        { text: "$1,334.94", label: "False precision — pennies on fabricated prices", color: "bg-amber-500/20" },
        { text: "Jefferson STEM Academy in their award-winning 2023 hydroponics program", label: "Hallucinated school and program", color: "bg-amber-500/20" },
        { text: "edusupplydirect.com", label: "Fabricated vendor URL", color: "bg-amber-500/20" }],

        explanation: "This response feels more authoritative — specific model numbers, exact prices, a named school, a recommended vendor. But that authority is manufactured. The model numbers, SKUs, the school reference, and the vendor URL are all hallucinated. The false precision (\"$1,334.94\") is a tell: real estimates don't land on the penny. This is what confident hallucination looks like."
      }] as
      [
        {id: string;prompt: string;isCorrect: boolean;annotations: {text: string;label: string;color: string;}[];explanation: string;},
        {id: string;prompt: string;isCorrect: boolean;annotations: {text: string;label: string;color: string;}[];explanation: string;}]

    }
  },
  {
    id: "reflection",
    type: "reflection" as const,
    title: "Reflection",
    content:
    <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-xl font-semibold text-foreground">What You're Carrying Forward</h2>

          <div className="bg-muted/50 p-6 rounded-lg border border-border/50 my-4">
            <p className="text-muted-foreground">
              You now have a working model for what AI is doing when it generates text.
              Not understanding, not reasoning, not looking things up — predicting the next
              word based on patterns. That model explains why the tool is so useful (the
              patterns encode enormous amounts of real knowledge) and why it's unreliable
              (the patterns don't distinguish fact from plausible fiction).
            </p>
            <p className="text-muted-foreground mt-3">
              You also know that the "values" in a tool like Claude come from a trained-in
              constitution — someone's deliberate choices about how the model should behave.
              That's worth remembering every time you use it. The tool has a disposition. You
              didn't choose it, but you can work with it.
            </p>
          </div>

          <p>
            Here's a question worth carrying into the rest of this curriculum: when you read
            AI output that sounds confident and fluent, what's your first instinct? To trust
            the authority of the tone — or to check the claims underneath it?
          </p>
          <p>
            That instinct matters more than any technical knowledge about how transformers
            work. Because your students will develop the same instinct you model. If you
            verify, they learn to verify. If you accept fluency as accuracy, they will too.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 my-4">
            <p className="font-medium mb-2">The Orientation Is Done</p>
            <p className="text-muted-foreground">
              This was Module 1 — a foundation, not a finished building. You now have the
              conceptual frame. In the courses ahead, you'll learn to shape AI output through
              constraints, assign it roles that match your pedagogical goals, evaluate its
              work critically, and build it into unit design. Every one of those skills rests
              on what you learned here: the tool is powerful, the tool is limited, and the
              teacher is the one who knows the difference.
            </p>
          </div>

          <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Next up: Constraints. You'll learn how giving AI the right context about your
              classroom turns generic output into something you'd actually use. The hydroponics
              project needed real part numbers from real vendors — but it also needed AI to
              understand what "SDC science class" and "community fridge partnership" meant for
              the design. That's where constraints come in.
            </p>
          </div>
        </div>

  }];


  return (
    <MicroCourseViewer
      courseId="what-is-ai-101"
      title="What Is AI, Really?"
      sections={sections}
      {...props} />);


};