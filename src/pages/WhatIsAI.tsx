import { Brain, AlertTriangle, MessageCircle, Image, Cpu, Zap, Search, BookOpen, Heart, Globe, Shield, Sparkles, GraduationCap, Languages, Lightbulb, Users, ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContentCard } from "@/components/shared/ContentCard";
import { ResearchNote } from "@/components/shared/ResearchNote";

const WhatIsAI = () => {
  return (
    <Layout>
      <PageHeader
        title="What Is AI?"
        description="An honest, grounded look at what AI is, how it works, and what it means for you as a teacher."
        icon={<Brain className="h-8 w-8 text-primary" />} />


      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">

            {/* =============================== */}
            {/* OPENING ESSAY                  */}
            {/* =============================== */}
            <div className="mb-16 prose prose-slate max-w-none">
              <p className="text-xl text-charcoal leading-relaxed font-serif">
                Something significant is happening in technology right now&mdash;and for once, it's actually
                as big as the headlines suggest. But the way it gets talked about, in news articles,
                in corporate announcements, in staff meetings, rarely gives teachers what they actually
                need: a clear-eyed understanding of what this technology is, what it isn't, and what
                it means for their practice.
              </p>
              




            </div>

            {/* =============================== */}
            {/* HOW AI WORKS                   */}
            {/* =============================== */}
            <div className="mb-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal">
                How AI Actually Works
              </h2>
              <div className="prose prose-slate max-w-none space-y-4">
                <p className="text-base text-muted-foreground leading-relaxed">
                  At its core, today's AI systems are trained on enormous amounts of text&mdash;books,
                  websites, research papers, conversations, code&mdash;and they learn patterns in how
                  language and knowledge connect. When you type a question, the system generates a
                  response word by word, drawing on those patterns to produce something coherent and
                  relevant.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  This sounds simple, but the results can be surprising. Because these systems have
                  absorbed such vast amounts of human writing, they can explain a concept five different
                  ways, write a rubric in seconds, translate a parent letter into Spanish, or brainstorm
                  twenty project ideas before you finish your coffee.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Modern AI systems also go through additional training after that initial stage&mdash;shaped
                  by human feedback to be more helpful, more honest, and less likely to produce harmful
                  content. Different companies take different approaches to this, and it produces real
                  differences in how various tools behave. None of them are perfect. All of them
                  reflect choices their makers made.
                </p>
              </div>
            </div>

            {/* =============================== */}
            {/* WHAT AI CAN DO                 */}
            {/* =============================== */}
            <div className="mb-16">
              <h2 className="mb-3 font-serif text-2xl font-semibold text-charcoal">
                What AI Can Do for Educators
              </h2>
              



              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Draft &amp; Iterate</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generate lesson plan drafts, rubrics, parent communications, and project descriptions
                    in minutes&mdash;then refine them with your expertise and knowledge of your students.
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
                    multilingual learners, and create accessible content across language barriers.
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
                    explanations&mdash;the kind of personalization that's genuinely hard to do for
                    30 students at once.
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
                    Use AI as a thought partner for curriculum design, brainstorm approaches to a
                    student challenge, or stress-test an assessment before you give it to the class.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Search className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-charcoal">Research &amp; Synthesize</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Summarize research, explain complex topics at different levels, find connections
                    between subjects, and gather background material for a new unit quickly.
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
                    AI literacy is becoming as foundational as reading comprehension. Teaching students
                    to use these tools thoughtfully and critically is preparing them for the world
                    they're entering.
                  </p>
                </div>
              </div>
            </div>

            {/* =============================== */}
            {/* WHERE AI FALLS SHORT            */}
            {/* =============================== */}
            <div className="mb-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Where AI Falls Short... and Why It Matters

              </h2>

              <div className="prose prose-slate max-w-none space-y-4 mb-8">
                <p className="text-base text-muted-foreground leading-relaxed">
                  The most important thing to understand about AI is that it can be wrong&mdash;and it
                  can be wrong confidently. Researchers call this "hallucination": the model produces
                  plausible-sounding text that's factually incorrect. It can invent citations, misstate
                  dates, or present made-up information without any visible uncertainty.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  This isn't a bug that's about to be fixed. It's a fundamental feature of how these
                  systems work. Which means your judgment&mdash;your ability to evaluate what's accurate,
                  appropriate, and meaningful for your students&mdash;isn't a nice-to-have. It's essential.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="font-medium text-charcoal text-sm">Relationships &amp; Trust</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI doesn't know your students. It can't read the room, notice when someone's
                    having a hard day, or build the kind of trust that makes real learning possible.
                    That's yours alone.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span className="font-medium text-charcoal text-sm">Context &amp; Culture</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI doesn't understand what it means to teach at TMAHS, in the Bayview, in San
                    Francisco. You carry the cultural knowledge and community context that makes
                    learning meaningful for <em>these</em> students.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-medium text-charcoal text-sm">Judgment &amp; Ethics</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI follows patterns in its training. You exercise moral judgment. Deciding what's
                    developmentally appropriate, navigating sensitive topics, modeling critical
                    thinking&mdash;these require wisdom, not pattern-matching.
                  </p>
                </div>

                <div className="rounded-xl border border-border/50 bg-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="font-medium text-charcoal text-sm">Inspiration &amp; Belief</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The moment a student's eyes light up because a teacher believed in them when no
                    one else did? Technology can't replicate that. The spark comes from you.
                  </p>
                </div>
              </div>
            </div>

            {/* =============================== */}
            {/* TYPES OF AI                    */}
            {/* =============================== */}
            <div className="mb-16">
              <ContentCard
                title="Types of AI You'll Encounter"
                citation="NASEM (2023). Artificial Intelligence in Science. National Academies Press.">

                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  "AI" covers a range of different tools built in different ways for different purposes.
                  Here are the four categories most relevant to educators right now.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Text AI (Claude, Gemini, ChatGPT)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Generates, analyzes, and transforms written content&mdash;lesson plans, feedback, explanations, translations
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Image className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Image AI (DALL-E, Midjourney)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Creates images from text descriptions&mdash;illustrations, diagrams, visual aids for multilingual classrooms
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Specialized AI (Khanmigo)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Built for specific tasks with guardrails&mdash;educational tools with built-in safety features and pedagogical design
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <span className="font-medium text-charcoal text-sm">Custom AI (Playlab)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      AI you can configure with your own materials and instructions&mdash;tailored for your class, your content, your students
                    </p>
                  </div>
                </div>
              </ContentCard>
            </div>

            {/* =============================== */}
            {/* THE BIGGER PICTURE             */}
            {/* =============================== */}
            <div className="mb-16">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal">
                The Bigger Picture
              </h2>

              <div className="prose prose-slate max-w-none space-y-5 mb-8">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Researchers and technologists disagree about how quickly AI will continue to improve
                  and what the long-term implications are. Some predict transformative changes within
                  a few years. Others argue that the most dramatic forecasts are overstated and that
                  fundamental limitations remain. What most serious observers agree on is this:
                  something genuinely significant is happening, and its effects on work, learning,
                  and knowledge are already underway.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  For educators, that uncertainty isn't paralyzing&mdash;it's clarifying. Whether the
                  most dramatic changes arrive in three years or fifteen, your students will live
                  and work in a world shaped by these tools. Knowing how to use them thoughtfully,
                  evaluate their outputs critically, and understand their limitations isn't a
                  nice-to-have. It's as fundamental as knowing how to evaluate a source or construct
                  an argument.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  And at a school like TMAHS, where the majority of students come from communities
                  historically underrepresented in technology, that's not just professional
                  development. It's equity work.
                </p>
              </div>

              {/* Closing thought */}
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-4">
                  You're Not Late. You're Right on Time.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The teachers who engage with this technology now&mdash;with curiosity and healthy
                  skepticism&mdash;won't just improve their own practice. They'll help shape how an
                  entire generation of students understands and relates to one of the most consequential
                  technologies of their lifetimes.
                </p>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Every lesson you design with care, every time you help a student question what a
                  machine produces, every conversation you have about what these tools can and can't
                  do&mdash;you're doing something no AI can do for itself. You're teaching the next
                  generation how to be thoughtful humans in an age of intelligent machines.
                </p>
              </div>
            </div>

            {/* Research Note */}
            <ResearchNote>
              <strong>Sources &amp; Further Reading:</strong> This page draws from Ji et al.'s survey
              of hallucination in natural language generation (ACM, 2023); the National Academies'
              2023 consensus report on AI in science; SFUSD{" "}
              <a
                href="https://www.sfusd.edu/about-sfusd/facts-about-sfusd-glance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground hover:underline underline-offset-2 inline-flex items-center gap-0.5">

                Facts at a Glance
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>{" "}
              (2024–25); and the California Department of Education 2024 Dashboard. TMAHS demographic
              data from NCES Common Core of Data and ed-data.org.
            </ResearchNote>

          </div>
        </div>
      </section>
    </Layout>);

};

export default WhatIsAI;