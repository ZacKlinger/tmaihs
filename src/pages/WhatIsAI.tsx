import { Brain, AlertTriangle, Cpu, MessageCircle, Zap, Search, Image, Shield, BookOpen, Heart, Globe, Sparkles, GraduationCap, Languages, Lightbulb, Users, CheckCircle2, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";
import { CommunityRippleViz } from "@/components/shared/CommunityRippleViz";

const WhatIsAI = () => {
  return (
    <Layout>
      <PageHeader
        title="What Is AI?"
        description="An honest, grounded look at what AI is, how it's built, what it can do, and why your expertise as an educator has never mattered more."
        icon={<Brain className="h-8 w-8 text-primary" />}
      />

      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-4xl">

            {/* ========================================= */}
            {/* OPENING: The 30-Second Version (Reframed) */}
            {/* ========================================= */}
            <div className="mb-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
              <h2 className="mb-4 font-serif text-xl font-semibold text-charcoal text-center">
                The Short Version
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-4">
                AI systems like Claude learn from vast amounts of text&mdash;books, research papers,
                conversations, code&mdash;developing the ability to write, reason, analyze, and create.
                They are among the most capable tools humans have ever built, and they're improving rapidly.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
                They also make mistakes, reflect the biases in their training data, and lack the lived
                experience that makes a great teacher irreplaceable. Both of these things are true at the
                same time&mdash;and understanding both is the foundation of using AI well.
              </p>
            </div>

            {/* ============================= */}
            {/* HOW AI WORKS (Updated)        */}
            {/* ============================= */}
            <div className="mb-16">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-charcoal text-center">
                How AI Actually Works
              </h2>
              <p className="mb-8 text-center text-sm text-muted-foreground max-w-lg mx-auto">
                No jargon, no hype. Here's what's happening under the hood.
              </p>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">
                    Step 1: Learning
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI is trained on billions of texts&mdash;books, websites, research, conversations&mdash;learning
                    patterns in how language, knowledge, and reasoning connect.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <Zap className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">
                    Step 2: Generating
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    When you ask a question, AI draws on those learned patterns to compose a response&mdash;word
                    by word&mdash;that's relevant, coherent, and often surprisingly insightful.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <MessageCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-charcoal">
                    Step 3: Refining
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Modern AI isn't just predicting words&mdash;it's trained to be helpful, honest, and safe
                    through additional stages that shape its values and behavior.
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================ */}
            {/* HOW CLAUDE IS BUILT: Principles-First AI (NEW)   */}
            {/* ================================================ */}
            <div className="mb-16">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-charcoal text-center">
                How Claude Is Built: Principles-First AI
              </h2>
              <p className="mb-8 text-center text-sm text-muted-foreground max-w-xl mx-auto">
                Not all AI is built the same way. Here's what makes Claude's approach different&mdash;and why it matters for educators.
              </p>

              <div className="space-y-6">
                {/* Constitutional AI Explanation */}
                <ContentCard
                  title="Trained on a Constitution, Not Just Data"
                  citation="Bai, Y. et al. (2022). Constitutional AI: Harmlessness from AI Feedback. Anthropic."
                >
                  <div className="space-y-4">
                    <p>
                      Anthropic, the company behind Claude, pioneered an approach called{" "}
                      <strong>Constitutional AI</strong>. Instead of relying solely on human reviewers to rate
                      every response, Claude is trained against a set of written principles&mdash;a{" "}
                      <a
                        href="https://www.anthropic.com/constitution"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-2 inline-flex items-center gap-0.5"
                      >
                        constitution
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>&mdash;that
                      explains <em>why</em> it should behave in certain ways, not just <em>what</em> to do.
                    </p>
                    <p>
                      Think of it like the difference between giving a student a list of rules vs. helping
                      them understand the reasoning behind those rules. The second approach produces better
                      judgment in new situations&mdash;and that's exactly the idea behind Constitutional AI.
                    </p>
                  </div>
                </ContentCard>

                {/* Priority Hierarchy */}
                <ContentCard
                  title="A Clear Set of Priorities"
                  citation="Claude's Constitution (2026). Anthropic. Published under CC0 license."
                >
                  <p className="mb-4">
                    Claude's constitution establishes an explicit priority order. When values come into
                    tension, Claude follows this hierarchy:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary flex-shrink-0">
                        1
                      </div>
                      <div>
                        <span className="font-medium text-charcoal">Safety first.</span>{" "}
                        <span className="text-sm">Support human oversight; never undermine people's ability to supervise AI.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary flex-shrink-0">
                        2
                      </div>
                      <div>
                        <span className="font-medium text-charcoal">Ethics second.</span>{" "}
                        <span className="text-sm">Be a good, wise, and thoughtful actor&mdash;exercise judgment, not just obedience.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary flex-shrink-0">
                        3
                      </div>
                      <div>
                        <span className="font-medium text-charcoal">Guidelines third.</span>{" "}
                        <span className="text-sm">Follow Anthropic's specific guidance on sensitive topics like medical advice and safety.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary flex-shrink-0">
                        4
                      </div>
                      <div>
                        <span className="font-medium text-charcoal">Helpfulness fourth.</span>{" "}
                        <span className="text-sm">Be genuinely, substantively useful&mdash;like "a brilliant friend who also has the knowledge of a doctor, lawyer, and financial advisor."</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-secondary/50 p-4">
                    <p className="text-xs font-medium text-charcoal mb-1">Why this matters for educators:</p>
                    <p className="text-sm text-muted-foreground">
                      This hierarchy means Claude will refuse to help with harmful requests even if asked
                      nicely, and will flag uncertainty rather than confidently guessing. The full
                      constitution is{" "}
                      <a
                        href="https://www.anthropic.com/constitution"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-2 inline-flex items-center gap-0.5"
                      >
                        publicly available
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>{" "}
                      under a Creative Commons license&mdash;a level of transparency that's rare in this industry.
                    </p>
                  </div>
                </ContentCard>
              </div>
            </div>

            {/* ==================================== */}
            {/* WHAT AI CAN DO TODAY (NEW)           */}
            {/* ==================================== */}
            <div className="mb-16">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-charcoal text-center">
                What AI Can Do Today
              </h2>
              <p className="mb-8 text-center text-sm text-muted-foreground max-w-xl mx-auto">
                These aren't hypothetical&mdash;these are things educators are using AI for right now.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Draft & Iterate</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generate lesson plan drafts, rubrics, parent communications, and project descriptions
                    in minutes&mdash;then refine them with your expertise and school context.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Languages className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Bridge Languages</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    SFUSD students speak 60+ languages. AI can help translate materials, scaffold
                    multilingual learners, and create culturally relevant content across language barriers.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Differentiate at Scale</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Adapt reading levels, generate varied practice problems, create alternative
                    explanations, and design accommodations&mdash;the kind of personalization that's hard to
                    do for 30 students at once.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Lightbulb className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Think Through Problems</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use AI as a thought partner for curriculum design, discuss approaches to student
                    challenges, brainstorm project ideas, or stress-test an assessment before giving it
                    to students.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Research & Synthesize</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Summarize research papers, explain complex topics at different levels, find
                    connections between subjects, and prepare background material for new units.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <GraduationCap className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Prepare Students</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI literacy is becoming as fundamental as digital literacy. Teaching students to use
                    AI effectively and critically is preparing them for the world they're entering.
                  </p>
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* WHERE HUMAN EXPERTISE MATTERS (Reframed limits)    */}
            {/* ================================================= */}
            <div className="mb-16">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-charcoal text-center">
                Where Your Expertise Matters Most
              </h2>
              <p className="mb-8 text-center text-sm text-muted-foreground max-w-xl mx-auto">
                AI's limitations aren't just a warning label&mdash;they're exactly why your role is essential.
              </p>

              <div className="space-y-6">
                <ContentCard
                  title="AI Gets Things Wrong&mdash;Sometimes Confidently"
                  citation="Ji, Z. et al. (2023). Survey of Hallucination in Natural Language Generation. ACM."
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-destructive/10 p-3 flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="mb-3">
                        AI can produce plausible-sounding text that's factually wrong&mdash;a phenomenon researchers
                        call "hallucination." It can invent citations, misstate dates, or present made-up
                        information with complete confidence.
                      </p>
                      <p className="text-sm">
                        <strong>This is why you matter:</strong> AI doesn't know what it doesn't know. Your
                        subject-matter expertise, your ability to evaluate sources, and your judgment about
                        what's appropriate for your students&mdash;none of that can be automated.
                      </p>
                    </div>
                  </div>
                </ContentCard>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Relationships & Trust</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI doesn't know your students. It can't read the room, notice when someone's having
                      a hard day, or build the trust that makes learning possible. Relationships are the
                      foundation of teaching, and they're entirely human.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Context & Culture</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI doesn't understand what it means to teach at TMAHS, in the Bayview, in San
                      Francisco. You bring the cultural knowledge, community awareness, and local context
                      that makes learning meaningful for <em>your</em> students.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Judgment & Ethics</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI follows its training; you exercise moral judgment. Deciding what's developmentally
                      appropriate, navigating sensitive topics, and modeling critical thinking for young
                      people&mdash;these require wisdom, not algorithms.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-card p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Inspiration & Motivation</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The moment a student's eyes light up because a teacher believed in them when no one
                      else did? That's not replicable by technology. AI can assist your work, but the
                      spark comes from you.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================== */}
            {/* COMMUNITY RIPPLE VISUALIZATION (NEW) */}
            {/* ===================================== */}
            <div className="mb-16 rounded-2xl border border-border/50 bg-card p-6 lg:p-8 shadow-soft">
              <CommunityRippleViz />
            </div>

            {/* ============================= */}
            {/* THE BIGGER PICTURE (NEW)      */}
            {/* ============================= */}
            <div className="mb-12">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-charcoal text-center">
                The Bigger Picture
              </h2>
              <p className="mb-8 text-center text-sm text-muted-foreground max-w-xl mx-auto">
                What the people building this technology are actually saying about its future.
              </p>

              <div className="space-y-6">
                <ContentCard
                  title="What the Researchers Say"
                  citation="Amodei, D. (2024). Machines of Loving Grace. darioamodei.com."
                >
                  <div className="space-y-4">
                    <p>
                      Dario Amodei, CEO of Anthropic, published a widely-discussed essay in 2024 called{" "}
                      <a
                        href="https://www.darioamodei.com/essay/machines-of-loving-grace"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-2 inline-flex items-center gap-0.5"
                      >
                        <em>Machines of Loving Grace</em>
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                      . In it, he argues that AI could compress decades of progress in medicine, mental health,
                      education, and economic development into a much shorter timeframe&mdash;but only if the risks
                      are managed carefully and the benefits reach everyone.
                    </p>
                    <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
                      <p className="text-sm italic text-charcoal leading-relaxed">
                        "Most people are underestimating just how radical the upside of AI could be, just
                        as most people are underestimating how bad the risks could be."
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">&mdash; Dario Amodei, CEO of Anthropic</p>
                    </div>
                    <p>
                      His framing matters: the people building this technology take both the promise
                      and the danger seriously. Anthropic's entire business model is built around the
                      idea that safety research should lead, not follow, capability development.
                    </p>
                  </div>
                </ContentCard>

                <ContentCard
                  title="The Pace of Change"
                  citation="AI 2027. ai-2027.com. See also: Marcus, G. (2025). 'The AI 2027 Scenario.' garymarcus.substack.com."
                >
                  <div className="space-y-4">
                    <p>
                      A group of AI researchers and forecasters published the{" "}
                      <a
                        href="https://ai-2027.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline underline-offset-2 inline-flex items-center gap-0.5"
                      >
                        AI 2027
                        <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>{" "}
                      report, projecting that AI capabilities could advance dramatically within the next few
                      years&mdash;potentially reaching or exceeding expert-level performance in many fields.
                    </p>
                    <p>
                      Not everyone agrees with the timeline. Cognitive scientist Gary Marcus has called the
                      most aggressive predictions "a work of fiction, not a work of science," arguing that
                      general intelligence is likely further away than optimists suggest. The truth is
                      probably somewhere in between&mdash;but even conservative estimates suggest significant
                      change is coming.
                    </p>
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <p className="text-xs font-medium text-charcoal mb-1">What this means for educators:</p>
                      <p className="text-sm text-muted-foreground">
                        Whether the most transformative changes arrive in 3 years or 15, your students will
                        live and work in a world shaped by AI. Learning to use it thoughtfully, critically,
                        and ethically isn't optional&mdash;it's as fundamental as learning to evaluate a source
                        or construct an argument.
                      </p>
                    </div>
                  </div>
                </ContentCard>

                {/* Inspiration Close */}
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
                  <Sparkles className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                    You're Not Late. You're Right on Time.
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
                    The educators who learn to work with AI now won't just improve their own practice&mdash;they'll
                    shape how an entire generation understands and relates to this technology. At a school like
                    TMAHS, where 99% of students come from communities that are historically underrepresented
                    in tech, that's not just professional development. It's equity work.
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-sm">
                    Every lesson you design, every conversation you have with students about AI, every time
                    you model critical thinking about what a machine produces&mdash;you're doing something that
                    no AI can do for itself. You're teaching the next generation how to be human in an age
                    of intelligent machines.
                  </p>
                </div>
              </div>
            </div>

            {/* Types of AI (kept, updated) */}
            <div className="mb-12">
              <ContentCard
                title="Types of AI You'll Encounter"
                citation="NASEM (2023). Artificial Intelligence in Science. National Academies Press."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal">Text AI (Claude, Gemini, ChatGPT)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Generates, analyzes, and transforms written content&mdash;lesson plans, feedback, explanations, translations
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Image className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal">Image AI (DALL-E, Midjourney)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Creates images from text descriptions&mdash;illustrations, diagrams, visual aids for multilingual classrooms
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal">Specialized AI (Khanmigo)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Built for specific tasks with guardrails&mdash;educational tools with built-in safety features and pedagogical design
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal">Custom AI (Playlab)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI you can customize with your own documents and instructions&mdash;tailored for your class, your content, your students
                    </p>
                  </div>
                </div>
              </ContentCard>
            </div>

            {/* Research Note */}
            <ResearchNote>
              <strong>Sources & Further Reading:</strong> This page draws from Anthropic's publicly
              available{" "}
              <a
                href="https://www.anthropic.com/constitution"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground hover:underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                Claude Constitution
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              {" "}(2026), Dario Amodei's{" "}
              <a
                href="https://www.darioamodei.com/essay/machines-of-loving-grace"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground hover:underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                <em>Machines of Loving Grace</em>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              {" "}(2024), the{" "}
              <a
                href="https://ai-2027.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground hover:underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                AI 2027
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              {" "}research report, SFUSD{" "}
              <a
                href="https://www.sfusd.edu/about-sfusd/facts-about-sfusd-glance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground hover:underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                Facts at a Glance
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              {" "}(2024–25), the California Department of Education's 2024 Dashboard,
              Ji et al.'s survey of AI hallucination (ACM, 2023), and the National Academies' 2023
              consensus report on AI in science. TMAHS data from NCES Common Core of Data and
              ed-data.org.
            </ResearchNote>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhatIsAI;
